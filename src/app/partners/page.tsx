import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partner placements",
  description:
    "MoveClock is free for movers and supported by clearly-labeled sponsored placements at the exact moments people make moving decisions.",
  robots: { index: false },
};

const SLOTS = [
  {
    id: "insurance",
    name: "Car insurance re-quote",
    where: "The Day-0 step on every route, state, and planner timeline",
    why: "Every interstate mover must switch policies — it's the first legally-driven task on the checklist, and rates genuinely change across state lines.",
  },
  {
    id: "car-shipping",
    name: "Auto transport quotes",
    where: "The vehicle title & registration step on every timeline",
    why: "Shown at the moment people are thinking about the car — including the ones deciding whether to drive or ship it.",
  },
  {
    id: "movers",
    name: "Moving company quotes",
    where: "The 'Helpful for this move' card on all 2,600+ route and state pages",
    why: "Route pages catch people while they're still planning — the highest-intent moment in the entire move.",
  },
];

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="kicker">About this placement</div>
      <h1 className="mt-3 font-sign text-4xl font-black leading-[1.08]">
        You clicked a preview slot.
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-gravel">
        MoveClock is free — the deadlines, the calendar export, all of it. The site is
        supported by a small number of clearly-labeled sponsored placements, positioned
        at the exact moments movers make commercial decisions. The slot you clicked
        isn&apos;t filled yet, so it brought you here instead.
      </p>

      <div className="mt-10 space-y-4">
        {SLOTS.map((s) => (
          <section key={s.id} id={s.id} className="card scroll-mt-24 p-6">
            <h2 className="font-sign text-xl font-extrabold">{s.name}</h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-gravel">
              <strong className="text-ink">Placement:</strong> {s.where}
            </p>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-gravel">
              <strong className="text-ink">Why it works:</strong> {s.why}
            </p>
          </section>
        ))}
      </div>

      <div className="sign-panel mt-10 p-8 text-center">
        <h2 className="font-sign text-2xl font-black text-white">
          Interested in one of these slots?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-white/85">
          If you run a moving, insurance, or auto-transport service and want to be the
          answer at these moments, get in touch.
        </p>
        <p className="mt-4 font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-caution">
          partners@moveclock.example — update this address in src/app/partners/page.tsx
        </p>
      </div>

      <p className="mt-8 text-center">
        <Link href="/" className="font-sign text-[14px] font-bold text-sign underline underline-offset-4">
          ← Back to your move countdown
        </Link>
      </p>
    </div>
  );
}
