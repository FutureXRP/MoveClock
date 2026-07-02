import Link from "next/link";
import { DeadlineCalculator } from "@/components/DeadlineCalculator";
import { Stamp } from "@/components/Stamp";
import { STATES, PENALTY_STATE_COUNT, multiplierLabel } from "@/lib/states";

const SPOTLIGHT = ["texas", "massachusetts", "california", "new-york", "wisconsin", "georgia"];

export default function HomePage() {
  const spotlight = SPOTLIGHT.map((slug) => STATES.find((s) => s.slug === slug)!);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="grid items-start gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="pt-2">
          <div className="kicker">For renters who moved out and heard nothing</div>
          <h1 className="mt-4 font-display text-[2.7rem] font-black leading-[1.04] tracking-tight sm:text-[3.6rem]">
            Your landlord has a<br />
            deadline. It may have
            <br />
            <span className="relative inline-block">
              already passed.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8 C 60 2, 150 11, 298 5"
                  fill="none"
                  stroke="#a8271b"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-[19px] leading-relaxed text-soot">
            Every state gives landlords a hard legal deadline — 14 to 60 days — to return
            your security deposit or itemize every deduction. Miss it, and in{" "}
            {PENALTY_STATE_COUNT} states the landlord owes you{" "}
            <strong className="text-ink">two to three times the deposit</strong>. Most
            renters never find out. Landlords count on that.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/demand-letter" className="btn-primary">
              Write my demand letter
            </Link>
            <Link href="/law" className="btn-outline">
              Look up my state
            </Link>
          </div>
          <p className="mt-5 font-ui text-[13px] text-soot/80">
            The letter is free. No account, no email address, nothing to install.
          </p>
        </div>
        <DeadlineCalculator />
      </section>

      {/* ── The facts strip ──────────────────────────────────────────────── */}
      <section className="double-rule grid gap-8 py-10 sm:grid-cols-3">
        {[
          {
            n: "$45 billion",
            d: "held in security deposits across the U.S. at any given time.",
          },
          {
            n: "1 in 4",
            d: "renters report losing deposit money they believe was wrongfully withheld.",
          },
          {
            n: `${PENALTY_STATE_COUNT} states`,
            d: "impose double or triple statutory penalties on landlords who miss the deadline.",
          },
        ].map((f) => (
          <div key={f.n} className="border-l-2 border-ink/80 pl-5">
            <div className="font-display text-4xl font-black text-seal">{f.n}</div>
            <p className="mt-2 text-[15px] leading-relaxed text-soot">{f.d}</p>
          </div>
        ))}
      </section>

      {/* ── How it works (statute-style) ─────────────────────────────────── */}
      <section className="py-16">
        <div className="kicker">Procedure</div>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-black leading-tight">
          Three steps. Most cases never reach step three.
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border-2 border-ink bg-ink md:grid-cols-3">
          {[
            {
              s: "§ 1",
              t: "Know your deadline",
              d: "Pick your state, enter your move-out date. We compute the exact day the law required your money back — and what the penalty is for missing it.",
            },
            {
              s: "§ 2",
              t: "Send the letter",
              d: "Generate a demand letter that cites your state's statute, computes the dates, and states the penalty. Certified mail. Most landlords pay at this point — arguing costs them more.",
            },
            {
              s: "§ 3",
              t: "Escalate if ignored",
              d: "Small claims court exists for exactly this, no lawyer needed — and you walk in asking for 2–3× while they explain why they broke a statute. Our kit preps you.",
            },
          ].map((step) => (
            <div key={step.s} className="bg-cream p-7">
              <div className="font-display text-3xl font-black text-seal">{step.s}</div>
              <h3 className="mt-3 font-display text-xl font-bold">{step.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-soot">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Letter teaser ────────────────────────────────────────────────── */}
      <section className="grid items-center gap-10 py-14 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md">
          <div className="letter-paper rotate-[-1.2deg] !p-7 text-[12px]">
            <p className="font-bold">VIA CERTIFIED MAIL — RETURN RECEIPT REQUESTED</p>
            <br />
            <p>RE: Demand for return of security deposit — 214 Elm St., Apt 3</p>
            <br />
            <p>
              Under Tex. Prop. Code §92.103, you were required to return my $1,800
              security deposit by <strong>April 14</strong>. As of today, 32 days have
              passed since I vacated and provided my forwarding address; I have received
              neither a refund nor an itemized statement…
            </p>
            <br />
            <p>
              …a landlord who retains a deposit in bad faith owes{" "}
              <strong>$100 plus three times the amount wrongfully withheld</strong>, plus
              attorney&apos;s fees (Tex. Prop. Code §92.109). I therefore demand payment of
              $1,800 within 10 days…
            </p>
          </div>
          <Stamp className="absolute -right-3 top-6 rotate-[8deg] text-lg">
            3× penalty
          </Stamp>
        </div>
        <div>
          <div className="kicker">Exhibit A · The letter</div>
          <h2 className="mt-3 font-display text-4xl font-black leading-tight">
            A letter that shows you know the statute.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-soot">
            A landlord ignoring a tenant is routine. A landlord ignoring a certified
            letter that cites the exact statute, computes the exact deadline they missed,
            and states the exact penalty a judge can award — that&apos;s a different
            decision, with their own money on the line.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-soot">
            Yours is generated from your state&apos;s law and your dates. Print it, or copy
            it anywhere. <strong className="text-ink">Free — every state, forever.</strong>
          </p>
          <Link href="/demand-letter" className="btn-primary mt-7">
            Generate mine now
          </Link>
        </div>
      </section>

      {/* ── State spotlight ──────────────────────────────────────────────── */}
      <section className="py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="kicker">The law, state by state</div>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight">
              Some states really don&apos;t mess around.
            </h2>
          </div>
          <Link href="/law" className="font-ui text-[13px] font-bold uppercase tracking-[0.1em] text-seal hover:underline">
            All 50 states + DC →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {spotlight.map((s) => (
            <Link
              key={s.slug}
              href={`/law/${s.slug}`}
              className="doc-card group relative p-5 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-bold group-hover:text-seal">
                  {s.name}
                </h3>
                {multiplierLabel(s) && (
                  <span className="rounded-sm border-2 border-seal px-1.5 py-0.5 font-ui text-xs font-black text-seal">
                    {multiplierLabel(s)}
                  </span>
                )}
              </div>
              <div className="mt-1 font-ui text-[11px] uppercase tracking-[0.14em] text-soot/70">
                {s.statute}
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-soot">
                <strong className="text-ink">{s.deadlineDays}{s.businessDays ? " business" : ""} days</strong>{" "}
                — then a landlord who misses it {s.penaltyText}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="plate relative overflow-hidden p-10 text-center sm:p-14">
          <Stamp className="absolute left-6 top-6 hidden text-base sm:inline-block">
            Past due
          </Stamp>
          <Stamp className="absolute bottom-8 right-8 hidden rotate-[5deg] text-base sm:inline-block">
            Certified
          </Stamp>
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-black leading-tight">
            It was never their money.
            <br />
            Go get it back.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[17px] text-soot">
            Ten minutes tonight. A certified stamp tomorrow. The law does the rest of the
            talking.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/demand-letter" className="btn-primary">
              Write my demand letter
            </Link>
            <Link href="/law" className="btn-outline">
              Read my state&apos;s law
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
