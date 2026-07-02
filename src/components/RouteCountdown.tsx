"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getStateMove } from "@/lib/moveData";
import { buildICS, buildTimeline } from "@/lib/timeline";
import { loadPlan, savePlan } from "@/lib/plan";
import { TimelineView } from "./TimelineView";

/**
 * The single countdown shown on route and state pages: a slim date bar plus
 * ONE timeline that switches from day-offsets to real dates when the arrival
 * date is set. The date persists via the saved plan, so it's already filled
 * for anyone who used the planner elsewhere.
 */
export function RouteCountdown({ toSlug, fromSlug }: { toSlug: string; fromSlug?: string }) {
  const to = getStateMove(toSlug);
  const [arrival, setArrival] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const dirty = useRef(false);

  useEffect(() => {
    const saved = loadPlan();
    if (saved?.arrival) setArrival(saved.arrival);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !dirty.current) return;
    const saved = loadPlan();
    savePlan({ from: fromSlug ?? saved?.from ?? "", to: toSlug, arrival });
  }, [arrival, hydrated, fromSlug, toSlug]);

  const items = useMemo(() => (to ? buildTimeline(to) : []), [to]);
  if (!to) return null;

  function downloadICS() {
    if (!to || !arrival) return;
    const blob = new Blob([buildICS(to, arrival, items)], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moveclock-${to.slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div id="plan">
      <div className="print-hide sign-panel mb-8 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-6">
        <div className="min-w-56">
          <label className="field-label !text-white/75" htmlFor="rc-date">
            When do you arrive in {to.name}?
          </label>
          <input
            id="rc-date"
            type="date"
            className="field"
            value={arrival}
            onChange={(e) => {
              dirty.current = true;
              setArrival(e.target.value);
            }}
          />
        </div>
        {arrival ? (
          <div className="flex gap-2">
            <button onClick={downloadICS} className="btn-caution !px-4 !py-2.5 !text-[13px]">
              ⤓ Add to calendar (.ics)
            </button>
            <button onClick={() => window.print()} className="btn-ghost !border-white/70 !bg-transparent !px-4 !py-2.5 !text-[13px] !text-white">
              Print
            </button>
          </div>
        ) : (
          <p className="max-w-xs text-[13.5px] leading-snug text-white/80">
            Set your date to turn day-counts into real deadlines — and send them to your
            calendar.
          </p>
        )}
      </div>
      <TimelineView items={items} arrivalISO={arrival || undefined} />
    </div>
  );
}
