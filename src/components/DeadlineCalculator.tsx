"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { STATES } from "@/lib/states";
import { addBusinessDays, addDays, daysFromToday, fmtLongDate, fmtMoney, todayISO } from "@/lib/dates";
import { Stamp } from "./Stamp";

export function DeadlineCalculator() {
  const [stateSlug, setStateSlug] = useState("");
  const [moveOut, setMoveOut] = useState("");
  const [deposit, setDeposit] = useState("");

  const law = STATES.find((s) => s.slug === stateSlug);
  const depositNum = parseFloat(deposit);

  const result = useMemo(() => {
    if (!law || !moveOut) return null;
    const deadline = law.businessDays
      ? addBusinessDays(moveOut, law.deadlineDays)
      : addDays(moveOut, law.deadlineDays);
    const delta = daysFromToday(deadline);
    const passed = delta < 0;
    const potential =
      Number.isFinite(depositNum) && depositNum > 0 && law.multiplier
        ? depositNum * law.multiplier + (law.flatBonus ?? 0)
        : null;
    return { deadline, delta, passed, potential };
  }, [law, moveOut, depositNum]);

  return (
    <div id="deadline" className="plate relative p-6 sm:p-8">
      <div className="absolute -top-4 right-6 rotate-2 rounded-sm border border-rule bg-cream px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-soot shadow-paper">
        Form DB-1 · Deadline check
      </div>

      <h3 className="font-display text-2xl font-black leading-tight">
        Has your landlord already broken the law?
      </h3>
      <p className="mt-1.5 text-[15px] text-soot">
        Thirty seconds. No email. No account.
      </p>

      <div className="mt-6 grid gap-4">
        <div>
          <label className="field-label" htmlFor="calc-state">
            Where was the rental?
          </label>
          <select
            id="calc-state"
            className="field"
            value={stateSlug}
            onChange={(e) => setStateSlug(e.target.value)}
          >
            <option value="">Choose a state…</option>
            {STATES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="field-label" htmlFor="calc-date">
              When did you move out?
            </label>
            <input
              id="calc-date"
              type="date"
              max={todayISO()}
              className="field"
              value={moveOut}
              onChange={(e) => setMoveOut(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label" htmlFor="calc-deposit">
              Deposit amount
            </label>
            <input
              id="calc-deposit"
              type="number"
              min="0"
              step="1"
              placeholder="$1,800"
              className="field"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
          </div>
        </div>
      </div>

      {law && result && (
        <div className="relative mt-6 border-t-2 border-dashed border-ink/30 pt-6">
          {result.passed && (
            <Stamp className="absolute -top-10 right-0 text-base">Deadline passed</Stamp>
          )}
          <div className="font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-soot">
            {law.name} · {law.statute}
          </div>
          <p className="mt-2 text-[17px] leading-snug">
            The legal deadline was{" "}
            <strong className="font-bold">{fmtLongDate(result.deadline)}</strong>
            {result.passed ? (
              <>
                {" "}
                — <span className="font-bold text-seal">{Math.abs(result.delta)} days ago</span>.
              </>
            ) : (
              <>
                {" "}
                — <strong>{result.delta} day{result.delta === 1 ? "" : "s"}</strong> from now.
              </>
            )}
          </p>
          {result.passed ? (
            <p className="mt-2 text-[15px] leading-relaxed text-soot">
              A {law.name} landlord who misses the deadline {law.penaltyText}
              {result.potential && (
                <>
                  {" "}
                  On a {fmtMoney(depositNum)} deposit, your claim could reach{" "}
                  <strong className="text-seal">{fmtMoney(result.potential)}</strong>.
                </>
              )}
            </p>
          ) : (
            <p className="mt-2 text-[15px] leading-relaxed text-soot">
              Not late yet — but the clock is running. Send your forwarding address in
              writing now, and have the demand letter ready for day one.
            </p>
          )}
          <Link
            href={`/demand-letter?state=${law.slug}${moveOut ? `&moveout=${moveOut}` : ""}${
              Number.isFinite(depositNum) && depositNum > 0 ? `&deposit=${depositNum}` : ""
            }`}
            className="btn-primary mt-5 w-full"
          >
            Write my demand letter — free
          </Link>
        </div>
      )}
    </div>
  );
}
