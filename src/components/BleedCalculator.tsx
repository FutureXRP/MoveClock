"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATALOG } from "@/lib/catalog";
import { fmtMoney, monthlyCost } from "@/lib/types";

const FEATURED = [
  "Netflix",
  "Spotify Premium",
  "Amazon Prime",
  "Disney+",
  "Hulu",
  "Max (HBO)",
  "YouTube Premium",
  "Apple One",
  "Audible",
  "Planet Fitness",
  "ChatGPT Plus",
  "Adobe Creative Cloud",
  "DoorDash DashPass",
  "Xbox Game Pass Ultimate",
  "iCloud+",
  "LinkedIn Premium",
];

export function BleedCalculator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const items = useMemo(
    () => FEATURED.map((name) => CATALOG.find((c) => c.name === name)!).filter(Boolean),
    []
  );

  const monthly = useMemo(
    () =>
      items
        .filter((i) => selected.has(i.name))
        .reduce((sum, i) => sum + monthlyCost(i.price, i.cycle), 0),
    [items, selected]
  );

  function toggle(name: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <div className="card p-6 shadow-glow sm:p-8">
      <h3 className="text-lg font-semibold text-white">
        Tap what you&apos;re paying for right now
      </h3>
      <p className="mt-1 text-sm text-slate-400">
        Most people find 2–3 they forgot about before this list ends.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => {
          const on = selected.has(item.name);
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => toggle(item.name)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                on
                  ? "border-emerald-400 bg-emerald-500/15 text-emerald-300"
                  : "border-white/10 bg-ink-800 text-slate-300 hover:border-white/25"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-white/[0.08] bg-ink-950/60 p-5 sm:flex-row sm:items-center">
        <div>
          <div className="text-sm text-slate-400">Your subscription bleed</div>
          <div className="mt-1 text-3xl font-bold text-white">
            {fmtMoney(monthly)}
            <span className="text-base font-medium text-slate-400">/month</span>
          </div>
          <div className="text-sm font-medium text-emerald-400">
            {fmtMoney(monthly * 12)} every year
          </div>
        </div>
        <Link href="/dashboard" className="btn-primary">
          Track these & plug the leaks →
        </Link>
      </div>
    </div>
  );
}
