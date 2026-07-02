"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { STATES, getStateMove } from "@/lib/moveData";
import { clearPlan, loadPlan, savePlan } from "@/lib/plan";

/**
 * Homepage route planner. Once origin, destination, and date are all set by
 * the user, it saves the plan and sends them to their route page — the
 * canonical home of the countdown (better layout, printable, shareable URL).
 */
export function MovePlanner() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [arrival, setArrival] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const dirty = useRef(false);

  useEffect(() => {
    const saved = loadPlan();
    if (saved) {
      if (saved.from) setFrom(saved.from);
      if (saved.to) setTo(saved.to);
      if (saved.arrival) setArrival(saved.arrival);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !dirty.current) return;
    savePlan({ from, to, arrival });
  }, [from, to, arrival, hydrated]);

  function go(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) return;
    savePlan({ from, to, arrival });
    router.push(`/moving/${from}/${to}`);
  }

  function touch<T>(setter: (v: T) => void) {
    return (v: T) => {
      dirty.current = true;
      setter(v);
    };
  }
  const updateFrom = touch(setFrom);
  const updateTo = touch(setTo);
  const updateArrival = touch(setArrival);

  function startOver() {
    dirty.current = false;
    clearPlan();
    setFrom("");
    setTo("");
    setArrival("");
  }

  const toState = getStateMove(to);
  const hasSavedRoute = Boolean(from && to);

  return (
    <div id="plan" className="sign-panel p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-3">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-caution">
          Route planner
        </div>
        {hydrated && (from || to || arrival) && (
          <button
            onClick={startOver}
            className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/60 underline underline-offset-2 hover:text-caution"
          >
            Start over
          </button>
        )}
      </div>
      <h2 className="mt-2 font-sign text-2xl font-black leading-tight text-white">
        Where are you headed?
      </h2>
      <form onSubmit={go}>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <label className="field-label !text-white/75" htmlFor="mp-from">Moving from</label>
          <select id="mp-from" className="field" value={from} onChange={(e) => updateFrom(e.target.value)}>
            <option value="">State…</option>
            {STATES.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label !text-white/75" htmlFor="mp-to">Moving to</label>
          <select id="mp-to" className="field" value={to} onChange={(e) => updateTo(e.target.value)}>
            <option value="">State…</option>
            {STATES.filter((s) => s.slug !== from).map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label !text-white/75" htmlFor="mp-date">Arrival date</label>
          <input
            id="mp-date"
            type="date"
            className="field"
            value={arrival}
            onChange={(e) => updateArrival(e.target.value)}
          />
        </div>
      </div>

      {toState && !arrival && (
        <p className="mt-4 text-[14px] text-white/80">
          {toState.name} gives you{" "}
          <strong className="text-caution">
            {toState.licenseDays === 0 ? "no grace period" : `${toState.licenseDays} days`}
          </strong>{" "}
          for your license and{" "}
          <strong className="text-caution">
            {toState.vehicleDays === 0 ? "no grace period" : `${toState.vehicleDays} days`}
          </strong>{" "}
          for your vehicle.
        </p>
      )}

      <button
        type="submit"
        disabled={!hasSavedRoute}
        className="btn-caution mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
      >
        {arrival ? "Get my countdown →" : "See my deadlines →"}
      </button>
      </form>
    </div>
  );
}
