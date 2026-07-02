import Link from "next/link";
import { STATES, TOP_STATES, LAST_REVIEWED } from "@/lib/moveData";

export function Footer() {
  const popular = TOP_STATES.slice(0, 12).map((slug) => STATES.find((s) => s.slug === slug)!);
  return (
    <footer className="print-hide mt-24 bg-sign text-white">
      <div className="center-line-h" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="font-sign text-xl font-black">
            Move<span className="text-caution">Clock</span>
          </div>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/80">
            Your new state started counting the day you arrived — license, registration,
            insurance, and voter deadlines, computed for your exact move date.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
            State rules last reviewed {LAST_REVIEWED}
          </p>
        </div>
        <div>
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-caution">
            Moving to…
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[15px]">
            {popular.map((s) => (
              <li key={s.slug}>
                <Link href={`/state/${s.slug}`} className="text-white/85 underline decoration-white/30 underline-offset-4 transition hover:text-caution">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/deadlines" className="mt-3 inline-block font-sign text-[13px] font-bold uppercase tracking-[0.08em] text-caution hover:underline">
            All 50 states + DC →
          </Link>
        </div>
        <div>
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-caution">
            Tools
          </div>
          <ul className="mt-3 space-y-1.5 text-[15px]">
            <li>
              <Link href="/#plan" className="text-white/85 underline decoration-white/30 underline-offset-4 transition hover:text-caution">
                Move countdown planner
              </Link>
            </li>
            <li>
              <Link href="/deadlines" className="text-white/85 underline decoration-white/30 underline-offset-4 transition hover:text-caution">
                License deadlines, all states
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-6 text-[13px] leading-relaxed text-white/60 sm:px-6">
          MoveClock provides general information compiled from state agency guidance — not
          legal, tax, or insurance advice. Rules and windows change; confirm current
          requirements with the destination state&apos;s licensing agency. Some links on this
          site may be affiliate links that support the project at no cost to you. ©{" "}
          {new Date().getFullYear()} MoveClock.
        </p>
      </div>
    </footer>
  );
}
