"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { STATES, getStateMove } from "@/lib/moveData";
import { buildICS, buildTimeline } from "@/lib/timeline";
import { TimelineView } from "./TimelineView";

export function MovePlanner({
  initialFrom = "",
  initialTo = "",
  compact = false,
}: {
  initialFrom?: string;
  initialTo?: string;
  compact?: boolean;
}) {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [arrival, setArrival] = useState("");

  const toState = getStateMove(to);
  const fromState = getStateMove(from);
  const items = useMemo(() => (toState ? buildTimeline(toState) : []), [toState]);
  const ready = Boolean(toState && arrival);

  function downloadICS() {
    if (!toState || !arrival) return;
    const ics = buildICS(toState, arrival, items);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moveclock-${toState.slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div id="plan">
      <div className="sign-panel p-6 sm:p-8">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-caution">
          Route planner
        </div>
        <h2 className="mt-2 font-sign text-2xl font-black leading-tight text-white">
          {compact ? "Set your date — get your countdown" : "Where are you headed?"}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="field-label !text-white/75" htmlFor="mp-from">Moving from</label>
            <select id="mp-from" className="field" value={from} onChange={(e) => setFrom(e.target.value)}>
              <option value="">State…</option>
              {STATES.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label !text-white/75" htmlFor="mp-to">Moving to</label>
            <select id="mp-to" className="field" value={to} onChange={(e) => setTo(e.target.value)}>
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
              onChange={(e) => setArrival(e.target.value)}
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
            for your vehicle. Pick your arrival date to get exact dates.
          </p>
        )}
      </div>

      {ready && toState && (
        <div className="mt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-sign text-xl font-black">
              Your {toState.name} countdown
            </h3>
            <div className="flex gap-2">
              <button onClick={downloadICS} className="btn-caution !px-4 !py-2 !text-[13px]">
                ⤓ Add to calendar (.ics)
              </button>
              <button onClick={() => window.print()} className="btn-ghost !px-4 !py-2 !text-[13px]">
                Print
              </button>
            </div>
          </div>
          <TimelineView items={items} arrivalISO={arrival} />
          {fromState && fromState.exitNotes && fromState.exitNotes.length > 0 && (
            <div className="card mt-6 border-l-4 border-l-caution p-5">
              <div className="overline-label">Don&apos;t forget — leaving {fromState.name}</div>
              <ul className="mt-2 space-y-2 text-[14.5px] leading-relaxed text-gravel">
                {fromState.exitNotes.map((n) => (
                  <li key={n} className="flex gap-2.5">
                    <span className="font-bold text-sign">←</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {fromState && !compact && (
            <p className="print-hide mt-6 text-center text-[14px] text-gravel">
              Bookmark your route page:{" "}
              <Link
                href={`/moving/${fromState.slug}/${toState.slug}`}
                className="font-bold text-sign underline underline-offset-4"
              >
                Moving from {fromState.name} to {toState.name} →
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
