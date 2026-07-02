import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateSlot } from "@/components/AffiliateSlot";
import { RouteCountdown } from "@/components/RouteCountdown";
import {
  getStateMove,
  licenseLabel,
  vehicleLabel,
  STATES,
  TOP_STATES,
  LAST_REVIEWED,
} from "@/lib/moveData";

interface Props {
  params: { from: string; to: string };
}

/** Prebuild the busiest corridors; everything else renders on demand. */
export function generateStaticParams() {
  const params: Array<{ from: string; to: string }> = [];
  for (const f of TOP_STATES) {
    for (const t of TOP_STATES) {
      if (f !== t) params.push({ from: f, to: t });
    }
  }
  return params;
}

export const dynamicParams = true;
export const revalidate = 86400;

export function generateMetadata({ params }: Props): Metadata {
  const from = getStateMove(params.from);
  const to = getStateMove(params.to);
  if (!from || !to || from.slug === to.slug) return {};
  return {
    title: `Moving from ${from.name} to ${to.name}: deadlines that start the day you arrive`,
    description: `${to.name} gives new residents ${licenseLabel(to).toLowerCase()} to convert a driver's license and ${vehicleLabel(to).toLowerCase()} to register a vehicle. Get the full dated countdown for your ${from.name} → ${to.name} move, free.`,
    alternates: { canonical: `/moving/${from.slug}/${to.slug}` },
  };
}

export default function RoutePage({ params }: Props) {
  const from = getStateMove(params.from);
  const to = getStateMove(params.to);
  if (!from || !to || from.slug === to.slug) notFound();

  const taxSwing =
    from.noIncomeTax && !to.noIncomeTax
      ? `Heads up: you're moving from a no-income-tax state into one that taxes wages — update your withholding with payroll early.`
      : !from.noIncomeTax && to.noIncomeTax
        ? `Good news: ${to.name} has no state income tax. File a part-year return in ${from.name} for the months before your move, then you're done.`
        : null;

  const faqs = [
    {
      q: `How long do I have to get a ${to.name} driver's license after moving from ${from.name}?`,
      a: `${to.licenseNote ?? `${to.name} gives new residents ${licenseLabel(to).toLowerCase()} after establishing residency to convert an out-of-state license.`} Deadlines run from establishing residency (a job, a lease, enrolling kids), not from when you feel settled.`,
    },
    {
      q: `How long do I have to register my car in ${to.name}?`,
      a: `${vehicleLabel(to)} after establishing residency, and you'll need in-state insurance first. ${to.vehicleNote ?? ""}${to.inspection ? ` ${to.inspection}` : ""}`.trim(),
    },
    {
      q: `Do I need to do anything back in ${from.name}?`,
      a: (from.exitNotes && from.exitNotes.length > 0
        ? from.exitNotes.join(" ")
        : `Cancel or transfer your ${from.name} vehicle registration once the new one is issued, keep proof of your move date, and file a part-year tax return there next spring if ${from.name} taxes income.`),
    },
    {
      q: "What happens if I miss a deadline?",
      a: `Driving on an out-of-state license past the deadline is citable in most states, and late vehicle registration typically stacks penalty fees on top of the regular ones. Insurers can also raise issues with claims when your policy still shows a ${from.name} address months after you've left.`,
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

  const related = TOP_STATES.filter((s) => s !== to.slug && s !== from.slug)
    .slice(0, 6)
    .map((s) => STATES.find((x) => x.slug === s)!);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="print-hide font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-gravel">
        <Link href="/" className="hover:text-sign">MoveClock</Link> / {from.name} → {to.name}
      </nav>

      <h1 className="mt-4 font-sign text-4xl font-black leading-[1.06] sm:text-5xl">
        Moving from {from.name} to {to.name}
      </h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-gravel">
        The moment you establish residency, {to.name} starts several legal clocks at
        once — and they&apos;re different lengths. Here&apos;s the whole countdown, in
        order.
      </p>

      {/* Headline numbers */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="sign-panel p-5 text-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-caution">
            License
          </div>
          <div className="mt-1 font-sign text-3xl font-black text-white">{licenseLabel(to)}</div>
          <div className="mt-1 text-[12px] text-white/75">
            {to.licenseUrl ? (
              <a href={to.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 underline-offset-2 hover:text-caution">
                {to.agency} ↗
              </a>
            ) : (
              to.agency
            )}
          </div>
        </div>
        <div className="sign-panel p-5 text-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-caution">
            Vehicle
          </div>
          <div className="mt-1 font-sign text-3xl font-black text-white">{vehicleLabel(to)}</div>
          <div className="mt-1 text-[12px] text-white/75">title + registration</div>
        </div>
        <div className="sign-panel p-5 text-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-caution">
            Income tax
          </div>
          <div className="mt-1 font-sign text-3xl font-black text-white">
            {to.noIncomeTax ? "None" : "Yes"}
          </div>
          <div className="mt-1 text-[12px] text-white/75">
            {to.noIncomeTax ? "on wages" : "part-year return applies"}
          </div>
        </div>
      </div>

      {taxSwing && (
        <div className="card mt-6 border-l-4 border-l-caution p-5 text-[15px] leading-relaxed text-gravel">
          {taxSwing}
        </div>
      )}

      {/* The countdown, undated */}
      <section className="mt-12">
        <h2 className="font-sign text-2xl font-black">The countdown, day by day</h2>
        <p className="mb-6 mt-2 text-[15px] text-gravel">
          Day 0 is the day you establish residency in {to.name}. Yellow markers are prep
          work before you arrive; check things off as you go — we&apos;ll remember.
        </p>
        <RouteCountdown toSlug={to.slug} fromSlug={from.slug} />
      </section>

      {(to.notes ?? []).length > 0 && (
        <section className="card mt-8 border-l-4 border-l-sign p-6">
          <div className="overline-label">Local knowledge — {to.name}</div>
          <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-gravel">
            {(to.notes ?? []).map((n) => (
              <li key={n} className="flex gap-2.5">
                <span className="font-bold text-sign">→</span>
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(from.exitNotes ?? []).length > 0 && (
        <section className="card mt-6 border-l-4 border-l-caution p-6">
          <div className="overline-label">Closing out {from.name}</div>
          <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-gravel">
            {(from.exitNotes ?? []).map((n) => (
              <li key={n} className="flex gap-2.5">
                <span className="font-bold text-sign">←</span>
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="print-hide mt-8">
        <AffiliateSlot />
      </div>

      {/* FAQ */}
      <section className="print-hide mt-14">
        <h2 className="font-sign text-2xl font-black">Questions people ask on this route</h2>
        <dl className="mt-5 divide-y divide-rule border-y border-rule">
          {faqs.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-sign text-[16px] font-extrabold">{f.q}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-gravel">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Related */}
      <section className="print-hide mt-12">
        <div className="overline-label">Also moving to…</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/moving/${from.slug}/${r.slug}`}
              className="card p-4 font-sign text-[15px] font-extrabold transition hover:-translate-y-0.5 hover:text-sign"
            >
              {from.name} → {r.name}
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-12 border-t border-rule pt-6 text-[13px] leading-relaxed text-gravel/80">
        General information compiled from state agency guidance, last reviewed{" "}
        {LAST_REVIEWED} — not legal, tax, or insurance advice. Residency triggers and
        windows vary with circumstances; confirm current requirements with the{" "}
        {to.name} {to.agency} before relying on a date.
      </p>
    </div>
  );
}
