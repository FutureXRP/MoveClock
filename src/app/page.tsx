import Link from "next/link";
import { MovePlanner } from "@/components/MovePlanner";
import { STATES, licenseLabel, vehicleLabel } from "@/lib/moveData";

const POPULAR_ROUTES: Array<[string, string]> = [
  ["california", "texas"],
  ["new-york", "florida"],
  ["california", "arizona"],
  ["illinois", "texas"],
  ["new-york", "new-jersey"],
  ["california", "washington"],
  ["texas", "colorado"],
  ["massachusetts", "florida"],
  ["washington", "texas"],
];

export default function HomePage() {
  const shortest = [...STATES].sort((a, b) => a.licenseDays - b.licenseDays).slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="grid items-start gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1fr]">
        <div className="pt-2">
          <div className="kicker">For the 8 million Americans who cross a state line every year</div>
          <h1 className="mt-4 font-sign text-[2.6rem] font-black leading-[1.05] tracking-tight sm:text-[3.4rem]">
            Your new state started counting{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">the day you arrived.</span>
              <span className="absolute inset-x-0 bottom-1 h-4 bg-caution/70" aria-hidden="true" />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-gravel">
            Driver&apos;s license, vehicle registration, insurance, voter registration —
            every state gives new residents <strong className="text-ink">legal deadlines,
            some as short as 10 days</strong>. Miss them and it&apos;s tickets, stacked
            late fees, even denied insurance claims. Nobody tells you the clock is
            running. We do — with the exact dates.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#plan" className="btn-sign">Get my countdown</a>
            <Link href="/deadlines" className="btn-ghost">See every state&apos;s deadline</Link>
          </div>
          <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.12em] text-gravel/80">
            Free · no account · deadlines export straight to your calendar
          </p>
        </div>
        <MovePlanner />
      </section>

      {/* ── The shock table ──────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="center-line-h mb-10 rounded" />
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="kicker">The part nobody mentions</div>
            <h2 className="mt-3 font-sign text-3xl font-black leading-tight">
              Some states give you 90 days.
              <br />
              Some give you <span className="text-red-700">zero</span>.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-gravel">
              Arizona, Massachusetts, and Michigan expect a license conversion{" "}
              <em>immediately</em> upon residency. California gives you 10 days — then
              vehicle penalties start stacking with back fees. And the license clock and
              the vehicle clock are usually <strong className="text-ink">different
              lengths</strong> (Texas: 90 days for the license, 30 for the truck).
            </p>
            <Link href="/deadlines" className="btn-sign mt-6">
              The full 51-row table
            </Link>
          </div>
          <div className="card overflow-hidden">
            <div className="bg-sign px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Shortest license windows in America
            </div>
            <ul className="divide-y divide-rule">
              {shortest.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/state/${s.slug}`}
                    className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-road"
                  >
                    <span className="font-sign text-[16px] font-extrabold">{s.name}</span>
                    <span className={`font-mono text-[14px] font-bold ${s.licenseDays <= 10 ? "text-red-700" : "text-sign"}`}>
                      {licenseLabel(s)}
                      <span className="ml-3 text-gravel/70">· vehicle {vehicleLabel(s).toLowerCase()}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="py-14">
        <div className="kicker">How it works</div>
        <h2 className="mt-3 font-sign text-3xl font-black">Three exits to done.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              n: "1",
              t: "Pick your route & date",
              d: "Origin state, destination state, arrival day. That's all the clock needs.",
            },
            {
              n: "2",
              t: "Get dated deadlines",
              d: "Not \"soon\" — actual dates: license by March 12, registration by March 22, with what to bring and the traps at each counter.",
            },
            {
              n: "3",
              t: "Send it to your calendar",
              d: "One click downloads an .ics file — every deadline lands in Google/Apple/Outlook with a 3-day-early reminder.",
            },
          ].map((step) => (
            <div key={step.n} className="card p-6">
              <span className="mile-marker">
                <span className="text-[9px] uppercase tracking-wider text-white/80">Step</span>
                <span className="text-lg">{step.n}</span>
              </span>
              <h3 className="mt-4 font-sign text-lg font-extrabold">{step.t}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-gravel">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Popular routes ───────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="kicker">Busy corridors</div>
            <h2 className="mt-3 font-sign text-3xl font-black">America&apos;s big moves</h2>
          </div>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_ROUTES.map(([f, t]) => {
            const from = STATES.find((s) => s.slug === f)!;
            const to = STATES.find((s) => s.slug === t)!;
            return (
              <Link
                key={`${f}-${t}`}
                href={`/moving/${f}/${t}`}
                className="card group flex items-center justify-between gap-3 p-5 transition hover:-translate-y-0.5 hover:shadow-sign"
              >
                <span className="font-sign text-[16px] font-extrabold">
                  {from.name} <span className="text-sign">→</span> {to.name}
                </span>
                <span className="font-mono text-[12px] font-bold text-gravel group-hover:text-sign">
                  {licenseLabel(to)}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="sign-panel relative overflow-hidden p-10 text-center sm:p-14">
          <h2 className="mx-auto max-w-2xl font-sign text-3xl font-black leading-tight text-white sm:text-4xl">
            Two minutes now beats a ticket, a late fee, and a denied claim later.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] text-white/85">
            Free, no account, nothing to install. Your deadlines, your dates, your
            calendar.
          </p>
          <a href="#plan" className="btn-caution mt-8">Start my countdown</a>
        </div>
      </section>
    </div>
  );
}
