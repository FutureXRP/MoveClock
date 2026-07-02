import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getState, STATES, LAST_REVIEWED, multiplierLabel } from "@/lib/states";
import { Stamp } from "@/components/Stamp";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return STATES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = getState(params.slug);
  if (!s) return {};
  const penalty = multiplierLabel(s)
    ? ` and owe ${multiplierLabel(s)} penalties`
    : "";
  return {
    title: `${s.name} security deposit law: the ${s.deadlineDays}-day deadline (${s.statute})`,
    description: `In ${s.name}, your landlord has ${s.deadlineDays}${s.businessDays ? " business" : ""} days to return your security deposit under ${s.statute} — miss it${penalty}. Deadlines, penalties, and a free demand letter.`,
    alternates: { canonical: `/law/${s.slug}` },
  };
}

export default function StateLawPage({ params }: Props) {
  const s = getState(params.slug);
  if (!s) notFound();

  const pool = STATES.filter((x) => x.slug !== s.slug && (x.multiplier ?? 0) >= 2);
  const idx = Math.max(STATES.findIndex((x) => x.slug === s.slug), 0);
  const neighbors = [0, 1, 2].map((i) => pool[(idx * 3 + i) % pool.length]);

  const faqs = [
    {
      q: `How long does a landlord have to return a security deposit in ${s.name}?`,
      a: `${s.deadlineText} The governing statute is ${s.statute}.`,
    },
    {
      q: `What happens if a ${s.name} landlord misses the deadline?`,
      a: `Under ${s.statute}, a landlord who misses the deadline ${s.penaltyText}`,
    },
    {
      q: "Can my landlord deduct for normal wear and tear?",
      a: `No. In every state, including ${s.name}, deposits can only be used for damage beyond normal wear and tear, unpaid rent, or other lease breaches — faded paint, worn carpet paths, and small nail holes are the landlord's cost of doing business.`,
    },
    {
      q: "Do I need a lawyer to get my deposit back?",
      a: "Usually not. Most deposits are recovered with a certified demand letter citing the statute, and small claims court — designed for people without lawyers — handles the rest.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="font-ui text-[12px] uppercase tracking-[0.14em] text-soot/70">
        <Link href="/law" className="hover:text-seal">
          State laws
        </Link>{" "}
        / {s.name}
      </nav>

      <h1 className="mt-4 font-display text-[2.6rem] font-black leading-[1.05] sm:text-5xl">
        {s.name} security
        <br />
        deposit law
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-3 font-ui text-[12px] font-semibold uppercase tracking-[0.14em] text-soot">
        <span className="rounded-sm border border-ink/40 bg-cream px-2 py-1">{s.statute}</span>
        <span>Reviewed {LAST_REVIEWED}</span>
      </div>

      {/* The two numbers that matter */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="plate relative p-6">
          <div className="overline-label">The deadline</div>
          <div className="mt-2 font-display text-6xl font-black leading-none">
            {s.deadlineDays}
            <span className="ml-2 align-middle font-display text-xl font-bold text-soot">
              {s.businessDays ? "business days" : "days"}
            </span>
          </div>
          <p className="mt-3 text-[14.5px] leading-relaxed text-soot">{s.deadlineText}</p>
        </div>
        <div className="plate relative p-6">
          {multiplierLabel(s) && (
            <Stamp className="absolute -top-3 right-4 text-base">
              {multiplierLabel(s)} penalty
            </Stamp>
          )}
          <div className="overline-label">If they miss it</div>
          <p className="mt-3 text-[16px] leading-relaxed">
            A landlord who misses the deadline <strong>{s.penaltyText}</strong>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="prose-drop mt-12 space-y-5 text-[17.5px] leading-[1.75] text-ink/90">
        <p>
          {s.name} law does not treat your security deposit as your landlord&apos;s money.
          It is your money, held in trust, and {s.statute} sets a hard clock on giving it
          back: {s.deadlineText.charAt(0).toLowerCase() + s.deadlineText.slice(1)} If the
          landlord claims deductions, they generally must be itemized in writing — vague
          "cleaning and repairs" line items don&apos;t satisfy the statute.
        </p>
        <p>
          The part landlords hope you never read: a landlord who misses the deadline{" "}
          {s.penaltyText} That penalty exists because legislatures know exactly how this
          game is played — hold the money, ignore the calls, wait for the tenant to give
          up. The statute is designed to make giving up unnecessary.
        </p>
      </div>

      {(s.forwardingNote || s.interest || s.depositCap || (s.notes && s.notes.length > 0)) && (
        <section className="mt-10 rounded-sm border-l-4 border-seal bg-cream p-6 shadow-paper">
          <h2 className="font-display text-xl font-bold">Details that win cases</h2>
          <ul className="mt-4 space-y-3 text-[15.5px] leading-relaxed text-soot">
            {s.forwardingNote && (
              <li className="flex gap-3">
                <span className="font-black text-seal">→</span>
                {s.forwardingNote}
              </li>
            )}
            {s.interest && (
              <li className="flex gap-3">
                <span className="font-black text-seal">→</span>
                {s.interest}
              </li>
            )}
            {s.depositCap && (
              <li className="flex gap-3">
                <span className="font-black text-seal">→</span>
                Deposits are capped at {s.depositCap.charAt(0).toLowerCase() + s.depositCap.slice(1)}{" "}
                If you paid more, that&apos;s a second violation to raise.
              </li>
            )}
            {(s.notes ?? []).map((n) => (
              <li key={n} className="flex gap-3">
                <span className="font-black text-seal">→</span>
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Wear and tear */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-black">
          What they can — and can&apos;t — deduct
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="doc-card p-5">
            <div className="overline-label text-moss">Fair game (actual damage)</div>
            <ul className="mt-3 space-y-1.5 text-[15px] text-soot">
              <li>Holes in walls or doors</li>
              <li>Burns, stains, or pet damage</li>
              <li>Broken fixtures or appliances you caused</li>
              <li>Unpaid rent or utilities under the lease</li>
            </ul>
          </div>
          <div className="doc-card p-5">
            <div className="overline-label">Not your problem (normal wear)</div>
            <ul className="mt-3 space-y-1.5 text-[15px] text-soot">
              <li>Faded or scuffed paint, minor nail holes</li>
              <li>Carpet worn from ordinary walking</li>
              <li>Loose grout, aging caulk, sun-bleached blinds</li>
              <li>Routine turnover cleaning &amp; repainting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-black">Your playbook</h2>
        <ol className="mt-6 space-y-0">
          {[
            {
              t: "Confirm your dates",
              d: `Move-out day starts the clock. ${s.forwardingNote ?? "Send your forwarding address in writing (text or email counts, but certified mail is proof) — several deadlines run from it."}`,
            },
            {
              t: "Send the demand letter",
              d: `Generate it below — it cites ${s.statute}, computes your deadline, and states the penalty. Send it certified mail, return receipt requested. Keep the receipt.`,
            },
            {
              t: "Give it 10 days",
              d: "Most landlords pay when they realize you know the statute. A partial offer? You can accept it and still pursue the rest.",
            },
            {
              t: "File in small claims",
              d: `No lawyer needed. Bring the lease, photos, your certified-mail receipt, and the statute. You're asking for the penalty${multiplierLabel(s) ? ` — up to ${multiplierLabel(s)} the amount withheld` : ""}; they're explaining why they ignored the law.`,
            },
          ].map((step, i) => (
            <li key={step.t} className="relative flex gap-5 pb-8 last:pb-0">
              {i < 3 && (
                <span className="absolute left-[15px] top-9 h-full w-px bg-ink/25" aria-hidden="true" />
              )}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-cream font-display text-sm font-black">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{step.t}</h3>
                <p className="mt-1 text-[15.5px] leading-relaxed text-soot">{step.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="plate relative mt-12 p-8 text-center">
        <h2 className="font-display text-3xl font-black leading-tight">
          Put {s.statute} in writing.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15.5px] text-soot">
          Your demand letter, generated with {s.name}&apos;s deadline and penalty already
          cited. Free, no account.
        </p>
        <Link href={`/demand-letter?state=${s.slug}`} className="btn-primary mt-6">
          Write my {s.abbr} demand letter
        </Link>
      </section>

      {/* FAQ */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-black">Questions renters ask</h2>
        <dl className="mt-6 divide-y divide-rule border-y border-rule">
          {faqs.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-display text-[17px] font-bold">{f.q}</dt>
              <dd className="mt-2 text-[15.5px] leading-relaxed text-soot">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Related */}
      <section className="mt-12">
        <div className="overline-label">Strong-penalty states</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {neighbors.map((n) => (
            <Link
              key={n.slug}
              href={`/law/${n.slug}`}
              className="doc-card p-4 font-display text-[16px] font-bold transition hover:-translate-y-0.5 hover:text-seal"
            >
              {n.name}{" "}
              <span className="font-ui text-xs font-black text-seal">{multiplierLabel(n)}</span>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-12 border-t border-rule pt-6 text-[13px] leading-relaxed text-soot/80">
        General legal information, not legal advice; DepositBack is not a law firm.
        Statutes summarized as of {LAST_REVIEWED} — legislatures amend these regularly, so
        verify {s.statute} before relying on it, and talk to a local tenant-rights
        organization or attorney about your specific situation.
      </p>
    </div>
  );
}
