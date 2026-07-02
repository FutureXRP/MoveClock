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
  LAST_REVIEWED,
} from "@/lib/moveData";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return STATES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = getStateMove(params.slug);
  if (!s) return {};
  return {
    title: `Moving to ${s.name}: new resident deadlines (license, registration, taxes)`,
    description: `New ${s.name} residents get ${licenseLabel(s).toLowerCase()} to convert a driver's license and ${vehicleLabel(s).toLowerCase()} to register a vehicle. The full dated countdown, free.`,
    alternates: { canonical: `/state/${s.slug}` },
  };
}

export default function StatePage({ params }: Props) {
  const s = getStateMove(params.slug);
  if (!s) notFound();

  const commonOrigins = ["california", "texas", "florida", "new-york", "illinois", "washington"]
    .filter((o) => o !== s.slug)
    .slice(0, 5)
    .map((o) => STATES.find((x) => x.slug === o)!);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav className="print-hide font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-gravel">
        <Link href="/" className="hover:text-sign">MoveClock</Link> /{" "}
        <Link href="/deadlines" className="hover:text-sign">States</Link> / {s.name}
      </nav>

      <h1 className="mt-4 font-sign text-4xl font-black leading-[1.06] sm:text-5xl">
        Moving to {s.name}
      </h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-gravel">
        What {s.name} expects from new residents, and when. Day 0 is the day you
        establish residency.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="sign-panel p-5 text-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-caution">License</div>
          <div className="mt-1 font-sign text-3xl font-black text-white">{licenseLabel(s)}</div>
          <div className="mt-1 text-[12px] text-white/75">
            {s.licenseUrl ? (
              <a href={s.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 underline-offset-2 hover:text-caution">
                {s.agency} ↗
              </a>
            ) : (
              s.agency
            )}
          </div>
        </div>
        <div className="sign-panel p-5 text-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-caution">Vehicle</div>
          <div className="mt-1 font-sign text-3xl font-black text-white">{vehicleLabel(s)}</div>
          <div className="mt-1 text-[12px] text-white/75">title + registration</div>
        </div>
        <div className="sign-panel p-5 text-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-caution">Income tax</div>
          <div className="mt-1 font-sign text-3xl font-black text-white">{s.noIncomeTax ? "None" : "Yes"}</div>
          <div className="mt-1 text-[12px] text-white/75">{s.noIncomeTax ? "on wages" : "part-year return applies"}</div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-6 font-sign text-2xl font-black">Your first weeks, in order</h2>
        <RouteCountdown toSlug={s.slug} />
      </section>

      {(s.notes ?? []).length > 0 && (
        <section className="card mt-8 border-l-4 border-l-sign p-6">
          <div className="overline-label">Local knowledge</div>
          <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-gravel">
            {(s.notes ?? []).map((n) => (
              <li key={n} className="flex gap-2.5">
                <span className="font-bold text-sign">→</span>
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="print-hide mt-8">
        <AffiliateSlot />
      </div>

      <section className="print-hide mt-12">
        <div className="overline-label">Popular routes into {s.name}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {commonOrigins.map((o) => (
            <Link
              key={o.slug}
              href={`/moving/${o.slug}/${s.slug}`}
              className="card p-4 font-sign text-[15px] font-extrabold transition hover:-translate-y-0.5 hover:text-sign"
            >
              {o.name} → {s.name}
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-12 border-t border-rule pt-6 text-[13px] leading-relaxed text-gravel/80">
        General information compiled from state agency guidance, last reviewed {LAST_REVIEWED} —
        not legal, tax, or insurance advice. Confirm current requirements with the {s.name}{" "}
        {s.agency}.
      </p>
    </div>
  );
}
