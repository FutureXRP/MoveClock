import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES, DIFFICULTY_META } from "@/lib/guides";

export const metadata: Metadata = {
  title: "How to cancel any subscription — step-by-step guides",
  description:
    "Step-by-step cancellation guides for Netflix, Planet Fitness, Adobe, Amazon Prime, SiriusXM and more — including the retention traps they'll use to keep billing you.",
};

export default function CancelDirectoryPage() {
  const byCategory = new Map<string, typeof GUIDES>();
  for (const g of GUIDES) {
    const list = byCategory.get(g.category) ?? [];
    list.push(g);
    byCategory.set(g.category, list);
  }
  const categories = Array.from(byCategory.keys()).sort();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold text-white">Cancellation guides</h1>
      <p className="mt-3 max-w-2xl text-slate-400">
        Exact steps to cancel {GUIDES.length} common subscriptions — plus the retention
        offers and dark patterns each one will throw at you on the way out. No fluff,
        just the path.
      </p>

      {categories.map((cat) => (
        <section key={cat} className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{cat}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {byCategory.get(cat)!.map((g) => {
              const meta = DIFFICULTY_META[g.difficulty];
              return (
                <Link
                  key={g.slug}
                  href={`/cancel/${g.slug}`}
                  className="card group p-5 transition hover:border-emerald-500/40"
                >
                  <h3 className="font-semibold text-white group-hover:text-emerald-300">
                    How to cancel {g.name}
                  </h3>
                  <span className={`chip mt-3 ${meta.className}`}>{meta.label}</span>
                  <p className="mt-3 line-clamp-2 text-sm text-slate-400">{g.summary}</p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <div className="card mt-14 flex flex-col items-center gap-4 p-8 text-center">
        <h2 className="text-xl font-bold text-white">
          Cancelling one thing is good. Seeing everything you pay for is better.
        </h2>
        <Link href="/dashboard" className="btn-primary">
          Track all my subscriptions free →
        </Link>
      </div>
    </div>
  );
}
