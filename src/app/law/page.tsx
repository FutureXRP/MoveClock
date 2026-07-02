import type { Metadata } from "next";
import Link from "next/link";
import { STATES, LAST_REVIEWED, multiplierLabel } from "@/lib/states";

export const metadata: Metadata = {
  title: "Security deposit return laws — all 50 states + DC",
  description:
    "How many days your landlord has to return your security deposit in every state, the statute that says so, and the penalty for missing the deadline — 2× to 3× in most states.",
};

export default function LawDirectoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="kicker">The index</div>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-black leading-[1.05]">
        Deposit-return law, state by state.
      </h1>
      <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-soot">
        The deadline for your landlord to return your deposit (or itemize deductions),
        the statute that sets it, and what missing it costs them. Statutes last reviewed{" "}
        {LAST_REVIEWED}.
      </p>

      <div className="mt-10 overflow-hidden rounded-sm border-2 border-ink">
        <div className="hidden grid-cols-[1.2fr_0.9fr_2fr_0.5fr] gap-4 border-b-2 border-ink bg-ink px-5 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.16em] text-cream sm:grid">
          <div>State</div>
          <div>Deadline</div>
          <div>If they miss it</div>
          <div className="text-right">Penalty</div>
        </div>
        <ul className="divide-y divide-rule bg-cream">
          {STATES.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/law/${s.slug}`}
                className="group grid grid-cols-1 gap-2 px-5 py-4 transition hover:bg-paper sm:grid-cols-[1.2fr_0.9fr_2fr_0.5fr] sm:items-baseline sm:gap-4"
              >
                <div className="font-display text-lg font-bold group-hover:text-seal">
                  {s.name}
                  <span className="ml-2 font-ui text-[10px] font-semibold uppercase tracking-[0.14em] text-soot/60">
                    {s.statute}
                  </span>
                </div>
                <div className="font-ui text-[14px] font-semibold">
                  {s.deadlineDays} {s.businessDays ? "business " : ""}days
                </div>
                <div className="text-[14.5px] leading-snug text-soot">
                  A landlord who misses it {s.penaltyText}
                </div>
                <div className="text-left sm:text-right">
                  {multiplierLabel(s) ? (
                    <span className="inline-block rounded-sm border-2 border-seal px-1.5 py-0.5 font-ui text-xs font-black text-seal">
                      {multiplierLabel(s)}
                    </span>
                  ) : (
                    <span className="font-ui text-xs text-soot/50">—</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-[13px] leading-relaxed text-soot/80">
        Deadlines shown are the standard residential case; several states have shorter
        clocks when no deductions are claimed, or conditions around notice and forwarding
        addresses — each state page has the details. This is general information, not
        legal advice.
      </p>
    </div>
  );
}
