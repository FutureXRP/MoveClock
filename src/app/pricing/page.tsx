import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "SubSentry is free for up to 15 subscriptions. Pro unlocks unlimited tracking, CSV export, and priority features for less than one forgotten renewal.",
};

const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

const FREE = [
  "Track up to 15 active subscriptions",
  "Monthly & yearly bleed totals",
  "Renewal dates that roll forward automatically",
  "Renewal email alerts (with a free account)",
  "All cancellation guides",
  "Cancelled-savings tally",
];

const PRO = [
  "Everything in Free",
  "Unlimited subscriptions",
  "CSV export of all your data",
  "Early access to new features (price-hike alerts, shared household tracking)",
  "Support an indie tool that helps people cancel things",
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-center text-4xl font-bold text-white">
        One forgotten renewal costs more than a year of Pro.
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
        SubSentry is free to use. Pro exists for power users — and to keep the lights on
        without ever selling your data.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="card p-8">
          <h2 className="text-lg font-semibold text-white">Free</h2>
          <div className="mt-2 text-4xl font-bold text-white">
            $0<span className="text-base font-medium text-slate-400"> forever</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            {FREE.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-emerald-400">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <Link href="/dashboard" className="btn-ghost mt-8 w-full">
            Start free
          </Link>
        </div>

        <div className="card relative border-emerald-500/40 p-8 shadow-glow">
          <div className="absolute -top-3 left-8 rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-bold text-ink-950">
            PRO
          </div>
          <h2 className="text-lg font-semibold text-white">Pro</h2>
          <div className="mt-2 text-4xl font-bold text-white">
            $24<span className="text-base font-medium text-slate-400">/year</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">That&apos;s $2/month — one coffee, once.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            {PRO.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-emerald-400">✓</span>
                {f}
              </li>
            ))}
          </ul>
          {paymentLink ? (
            <a href={paymentLink} className="btn-primary mt-8 w-full" target="_blank" rel="noopener noreferrer">
              Upgrade to Pro →
            </a>
          ) : (
            <div className="btn-ghost mt-8 w-full cursor-not-allowed opacity-60" title="Payments not configured yet">
              Pro launching soon
            </div>
          )}
          <p className="mt-3 text-center text-xs text-slate-500">
            Ironically, yes, this is a subscription. We&apos;ll email you before it renews.
          </p>
        </div>
      </div>
    </div>
  );
}
