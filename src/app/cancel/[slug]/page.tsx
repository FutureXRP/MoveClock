import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, GUIDES, DIFFICULTY_META } from "@/lib/guides";
import { fmtMoney } from "@/lib/types";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return {
    title: `How to cancel ${guide.name} (${new Date().getFullYear()} guide)`,
    description: guide.summary,
    alternates: { canonical: `/cancel/${guide.slug}` },
  };
}

export default function GuidePage({ params }: Props) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const meta = DIFFICULTY_META[guide.difficulty];
  const related = GUIDES.filter(
    (g) => g.slug !== guide.slug && g.category === guide.category
  ).slice(0, 3);
  const fallbackRelated =
    related.length > 0 ? related : GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to cancel ${guide.name}`,
    description: guide.summary,
    step: guide.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: s,
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-sm text-slate-500">
        <Link href="/cancel" className="hover:text-emerald-300">
          Cancel guides
        </Link>{" "}
        / {guide.name}
      </nav>

      <h1 className="mt-4 text-4xl font-bold text-white">How to cancel {guide.name}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className={`chip ${meta.className}`}>{meta.label}</span>
        <span className="chip border-white/10 bg-ink-800 text-slate-300">
          Save ~{fmtMoney(guide.typicalMonthly * 12)}/yr
        </span>
        {guide.phone && (
          <span className="chip border-white/10 bg-ink-800 text-slate-300">
            ☎ {guide.phone}
          </span>
        )}
      </div>
      <p className="mt-5 text-lg leading-relaxed text-slate-300">{guide.summary}</p>

      <section className="card mt-8 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-white">Steps</h2>
        <ol className="mt-5 space-y-4">
          {guide.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400">
                {i + 1}
              </span>
              <span className="leading-relaxed text-slate-300">{step}</span>
            </li>
          ))}
        </ol>
        {guide.cancelUrl && (
          <a
            href={guide.cancelUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-primary mt-7"
          >
            Open the cancellation page ↗
          </a>
        )}
      </section>

      {guide.altMethod && (
        <section className="card mt-6 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white">{guide.altMethod.title}</h2>
          <ol className="mt-5 space-y-4">
            {guide.altMethod.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sm font-bold text-sky-400">
                  {i + 1}
                </span>
                <span className="leading-relaxed text-slate-300">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {guide.retentionTraps && guide.retentionTraps.length > 0 && (
        <section className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-amber-300">
            ⚠️ Retention traps to expect
          </h2>
          <ul className="mt-4 space-y-3">
            {guide.retentionTraps.map((t, i) => (
              <li key={i} className="flex gap-3 text-slate-300">
                <span className="text-amber-400">→</span>
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      {guide.notes && guide.notes.length > 0 && (
        <section className="mt-6 rounded-2xl border border-white/[0.08] bg-ink-900/50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">Good to know</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {guide.notes.map((n, i) => (
              <li key={i} className="flex gap-3 text-slate-400">
                <span className="text-emerald-400">•</span>
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="card mt-10 flex flex-col items-center gap-4 p-8 text-center shadow-glow">
        <h2 className="text-xl font-bold text-white">
          {guide.name} was probably not your only leak.
        </h2>
        <p className="max-w-md text-sm text-slate-400">
          The average person finds 2–3 forgotten subscriptions the first time they list
          everything out. Takes about five minutes.
        </p>
        <Link href="/dashboard" className="btn-primary">
          Find my other leaks →
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Related guides
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {fallbackRelated.map((g) => (
            <Link
              key={g.slug}
              href={`/cancel/${g.slug}`}
              className="card p-4 text-sm font-medium text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-300"
            >
              How to cancel {g.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
