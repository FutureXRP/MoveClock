"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { CATALOG, CATEGORIES } from "@/lib/catalog";
import {
  deleteCloud,
  fetchCloud,
  getSupabase,
  importLocalToCloud,
  insertCloud,
  loadLocal,
  makeLocalSub,
  rollPastRenewals,
  saveLocal,
  updateCloud,
  type NewSubscription,
} from "@/lib/store";
import {
  CYCLE_LABELS,
  daysUntil,
  fmtMoney,
  monthlyCost,
  type Cycle,
  type Subscription,
} from "@/lib/types";

const FREE_LIMIT = 15;

type Mode = "loading" | "local" | "cloud";

function todayISO(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function SubscriptionManager() {
  const [mode, setMode] = useState<Mode>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // add form state
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const [nextRenewal, setNextRenewal] = useState("");
  const [category, setCategory] = useState("");
  const [showForm, setShowForm] = useState(false);

  const sb = getSupabase();

  const persistLocal = useCallback((next: Subscription[]) => {
    setSubs(next);
    saveLocal(next);
  }, []);

  // ── boot: figure out mode, load data ────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function boot() {
      if (!sb) {
        const { subs: rolled } = rollPastRenewals(loadLocal());
        if (!cancelled) {
          setSubs(rolled);
          saveLocal(rolled);
          setMode("local");
        }
        return;
      }
      const {
        data: { session },
      } = await sb.auth.getSession();
      if (cancelled) return;

      if (!session?.user) {
        const { subs: rolled } = rollPastRenewals(loadLocal());
        setSubs(rolled);
        saveLocal(rolled);
        setMode("local");
        return;
      }

      setUser(session.user);
      try {
        const imported = await importLocalToCloud(sb, session.user);
        if (imported > 0) {
          setNotice(`Imported ${imported} subscription${imported === 1 ? "" : "s"} from this browser into your account.`);
        }
        const cloud = await fetchCloud(sb);
        const { subs: rolled, changed } = rollPastRenewals(cloud);
        await Promise.all(
          changed.map((c) => updateCloud(sb, c.id, { next_renewal: c.next_renewal }))
        );
        if (cancelled) return;
        setSubs(rolled);
        setMode("cloud");

        const { data: profile } = await sb
          .from("profiles")
          .select("is_pro")
          .eq("id", session.user.id)
          .maybeSingle();
        if (!cancelled) setIsPro(Boolean(profile?.is_pro));
      } catch (e) {
        if (!cancelled) {
          setError(
            "Couldn't load your cloud data. Check that the Supabase schema has been applied (see README)."
          );
          setMode("cloud");
        }
      }
    }

    boot();
    return () => {
      cancelled = true;
    };
  }, [sb]);

  // ── derived stats ───────────────────────────────────────────────────────────
  const active = useMemo(() => subs.filter((s) => s.status === "active"), [subs]);
  const cancelled = useMemo(() => subs.filter((s) => s.status === "cancelled"), [subs]);

  const monthlyTotal = useMemo(
    () => active.reduce((sum, s) => sum + monthlyCost(s.price, s.cycle), 0),
    [active]
  );
  const savedYearly = useMemo(
    () => cancelled.reduce((sum, s) => sum + monthlyCost(s.price, s.cycle) * 12, 0),
    [cancelled]
  );
  const dueSoon = useMemo(
    () =>
      active.filter((s) => s.next_renewal && daysUntil(s.next_renewal) <= 7).length,
    [active]
  );

  const sortedActive = useMemo(
    () =>
      [...active].sort((a, b) => {
        const da = a.next_renewal ? daysUntil(a.next_renewal) : Infinity;
        const db = b.next_renewal ? daysUntil(b.next_renewal) : Infinity;
        return da - db;
      }),
    [active]
  );

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return CATALOG.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const atFreeLimit = !isPro && active.length >= FREE_LIMIT;

  // ── mutations ───────────────────────────────────────────────────────────────
  async function addSub(input: NewSubscription) {
    setError(null);
    if (atFreeLimit) return;
    try {
      if (mode === "cloud" && sb && user) {
        const created = await insertCloud(sb, user.id, input);
        setSubs((prev) => [...prev, created]);
      } else {
        persistLocal([...subs, makeLocalSub(input)]);
      }
    } catch {
      setError("Couldn't save that subscription — is the database schema applied?");
    }
  }

  async function patchSub(id: string, patch: Partial<Subscription>) {
    setError(null);
    const next = subs.map((s) => (s.id === id ? { ...s, ...patch } : s));
    try {
      if (mode === "cloud" && sb) {
        await updateCloud(sb, id, patch);
        setSubs(next);
      } else {
        persistLocal(next);
      }
    } catch {
      setError("Couldn't update that subscription.");
    }
  }

  async function removeSub(id: string) {
    setError(null);
    try {
      if (mode === "cloud" && sb) {
        await deleteCloud(sb, id);
        setSubs((prev) => prev.filter((s) => s.id !== id));
      } else {
        persistLocal(subs.filter((s) => s.id !== id));
      }
    } catch {
      setError("Couldn't delete that subscription.");
    }
  }

  function quickAdd(catalogName: string) {
    const item = CATALOG.find((c) => c.name === catalogName);
    if (!item) return;
    addSub({
      name: item.name,
      price: item.price,
      cycle: item.cycle,
      next_renewal: null,
      category: item.category,
      guide_slug: item.guideSlug ?? null,
    });
    setQuery("");
  }

  function submitCustom(e: React.FormEvent) {
    e.preventDefault();
    const p = parseFloat(price);
    if (!name.trim() || !Number.isFinite(p) || p < 0) return;
    addSub({
      name: name.trim(),
      price: Math.round(p * 100) / 100,
      cycle,
      next_renewal: nextRenewal || null,
      category: category || null,
      guide_slug: null,
    });
    setName("");
    setPrice("");
    setNextRenewal("");
    setCategory("");
    setShowForm(false);
  }

  function exportCSV() {
    const header = "name,price,cycle,monthly_cost,next_renewal,category,status\n";
    const rows = subs
      .map((s) =>
        [
          `"${s.name.replace(/"/g, '""')}"`,
          s.price.toFixed(2),
          s.cycle,
          monthlyCost(s.price, s.cycle).toFixed(2),
          s.next_renewal ?? "",
          s.category ?? "",
          s.status,
        ].join(",")
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subsentry-subscriptions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function signOut() {
    if (sb) await sb.auth.signOut();
    window.location.reload();
  }

  // ── render ──────────────────────────────────────────────────────────────────
  if (mode === "loading") {
    return (
      <div className="flex items-center justify-center py-32 text-slate-400">
        Loading your subscriptions…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Your subscriptions</h1>
          <p className="mt-1 text-sm text-slate-400">
            {mode === "cloud" && user ? (
              <>
                Synced to <span className="text-slate-300">{user.email}</span> ·{" "}
                {isPro ? (
                  <span className="text-emerald-400">Pro</span>
                ) : (
                  <span>Free plan</span>
                )}{" "}
                ·{" "}
                <button onClick={signOut} className="underline hover:text-emerald-300">
                  sign out
                </button>
              </>
            ) : (
              <>
                Stored in this browser only.{" "}
                <Link href="/login" className="text-emerald-400 underline hover:text-emerald-300">
                  Sign in
                </Link>{" "}
                for cloud sync + renewal email alerts.
              </>
            )}
          </p>
        </div>
        <button
          onClick={exportCSV}
          disabled={!isPro}
          className={`text-sm font-medium ${
            isPro
              ? "text-emerald-400 hover:text-emerald-300"
              : "cursor-not-allowed text-slate-600"
          }`}
          title={isPro ? "Download CSV" : "CSV export is a Pro feature"}
        >
          {isPro ? "Export CSV ↓" : "Export CSV (Pro)"}
        </button>
      </div>

      {notice && (
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {notice}
        </div>
      )}
      {error && (
        <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wide text-slate-500">Monthly bleed</div>
          <div className="mt-1 text-2xl font-bold text-white">{fmtMoney(monthlyTotal)}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wide text-slate-500">Per year</div>
          <div className="mt-1 text-2xl font-bold text-white">{fmtMoney(monthlyTotal * 12)}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wide text-slate-500">Renewing ≤ 7 days</div>
          <div className={`mt-1 text-2xl font-bold ${dueSoon > 0 ? "text-amber-400" : "text-white"}`}>
            {dueSoon}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wide text-slate-500">Saved by cancelling</div>
          <div className="mt-1 text-2xl font-bold text-emerald-400">
            {fmtMoney(savedYearly)}
            <span className="text-sm font-medium text-slate-400">/yr</span>
          </div>
        </div>
      </div>

      {/* Add */}
      <div className="card mt-8 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-64 flex-1">
            <input
              className="input"
              placeholder="Quick add — try “Netflix”, “gym”, “Spotify”…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {suggestions.length > 0 && (
              <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-ink-800 shadow-xl">
                {suggestions.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => quickAdd(s.name)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-ink-700"
                  >
                    <span className="font-medium text-slate-200">{s.name}</span>
                    <span className="text-slate-400">
                      {fmtMoney(s.price)}/{CYCLE_LABELS[s.cycle]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="button" onClick={() => setShowForm((v) => !v)} className="btn-ghost !py-2.5">
            {showForm ? "Close" : "+ Add custom"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={submitCustom} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <input
              className="input lg:col-span-2"
              placeholder="Name (e.g. Local newspaper)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="input"
              placeholder="Price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <select className="input" value={cycle} onChange={(e) => setCycle(e.target.value as Cycle)}>
              <option value="weekly">per week</option>
              <option value="monthly">per month</option>
              <option value="quarterly">per quarter</option>
              <option value="yearly">per year</option>
            </select>
            <input
              className="input"
              type="date"
              min={todayISO()}
              value={nextRenewal}
              onChange={(e) => setNextRenewal(e.target.value)}
              title="Next renewal date (optional)"
            />
            <select
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Category…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button type="submit" className="btn-primary !py-2.5 lg:col-span-2">
              Add subscription
            </button>
          </form>
        )}

        {atFreeLimit && (
          <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
            Free plan tracks up to {FREE_LIMIT} active subscriptions.{" "}
            <Link href="/pricing" className="font-semibold underline">
              Go Pro
            </Link>{" "}
            for unlimited tracking + CSV export.
          </div>
        )}
      </div>

      {/* Active list */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white">
          Active <span className="text-slate-500">({active.length})</span>
        </h2>
        {sortedActive.length === 0 ? (
          <div className="card mt-4 p-10 text-center text-slate-400">
            Nothing tracked yet. Use quick add above — most people are shocked by minute
            three.
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {sortedActive.map((s) => {
              const days = s.next_renewal ? daysUntil(s.next_renewal) : null;
              return (
                <li key={s.id} className="card flex flex-wrap items-center gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-white">{s.name}</span>
                      {s.category && (
                        <span className="chip border-white/10 bg-ink-800 text-slate-400">
                          {s.category}
                        </span>
                      )}
                      {days !== null && days <= 7 && (
                        <span className="chip border-amber-500/30 bg-amber-500/10 text-amber-300">
                          renews in {days === 0 ? "today" : `${days}d`}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-slate-400">
                      {fmtMoney(s.price)}/{CYCLE_LABELS[s.cycle]}
                      <span className="text-slate-600"> · </span>
                      {fmtMoney(monthlyCost(s.price, s.cycle))}/mo
                      {s.next_renewal && (
                        <>
                          <span className="text-slate-600"> · </span>
                          next: {s.next_renewal}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.guide_slug && (
                      <Link
                        href={`/cancel/${s.guide_slug}`}
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-emerald-500/50 hover:text-emerald-300"
                      >
                        How to cancel
                      </Link>
                    )}
                    <button
                      onClick={() => patchSub(s.id, { status: "cancelled" })}
                      className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
                      title="Mark as cancelled and count the savings"
                    >
                      I cancelled it 🎉
                    </button>
                    <button
                      onClick={() => removeSub(s.id)}
                      className="rounded-lg px-2 py-1.5 text-xs text-slate-500 transition hover:text-rose-400"
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Cancelled list */}
      {cancelled.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-white">
            Cancelled — {fmtMoney(savedYearly)}/yr back in your pocket
          </h2>
          <ul className="mt-4 space-y-2">
            {cancelled.map((s) => (
              <li
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-ink-900/40 px-4 py-3"
              >
                <span className="text-sm text-slate-400 line-through">{s.name}</span>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-emerald-400">
                    +{fmtMoney(monthlyCost(s.price, s.cycle) * 12)}/yr
                  </span>
                  <button
                    onClick={() => patchSub(s.id, { status: "active" })}
                    className="text-xs text-slate-500 hover:text-slate-300"
                  >
                    undo
                  </button>
                  <button
                    onClick={() => removeSub(s.id)}
                    className="text-xs text-slate-600 hover:text-rose-400"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
