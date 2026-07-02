import Link from "next/link";
import { GUIDES } from "@/lib/guides";

export function Footer() {
  const popular = GUIDES.slice(0, 8);
  return (
    <footer className="mt-24 border-t border-white/[0.06]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <div className="text-lg font-bold text-white">
            Sub<span className="text-emerald-400">Sentry</span>
          </div>
          <p className="mt-2 max-w-xs text-sm text-slate-400">
            Find the subscriptions leaking money from your account, get warned before
            renewals, and cancel the ones you don&apos;t use.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-300">Popular cancel guides</div>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {popular.map((g) => (
              <li key={g.slug}>
                <Link href={`/cancel/${g.slug}`} className="text-slate-400 transition hover:text-emerald-300">
                  Cancel {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-300">Product</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/dashboard" className="text-slate-400 transition hover:text-emerald-300">
                Subscription tracker
              </Link>
            </li>
            <li>
              <Link href="/cancel" className="text-slate-400 transition hover:text-emerald-300">
                All cancellation guides
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-slate-400 transition hover:text-emerald-300">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.06] py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SubSentry. Guides are provided for convenience — services
        change their flows; always confirm cancellation in writing.
      </div>
    </footer>
  );
}
