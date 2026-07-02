import Link from "next/link";
import { BleedCalculator } from "@/components/BleedCalculator";
import { GUIDES, DIFFICULTY_META } from "@/lib/guides";

export default function HomePage() {
  const featuredGuides = GUIDES.filter((g) =>
    ["planet-fitness", "adobe-creative-cloud", "amazon-prime", "siriusxm", "new-york-times", "audible"].includes(g.slug)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <div className="chip border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            The average person wastes $2,400/year on forgotten subscriptions
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Stop paying for things you{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              forgot you had
            </span>
            .
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-400">
            SubSentry tracks every subscription in one place, warns you{" "}
            <strong className="text-slate-200">before</strong> renewals hit your card, and
            walks you through cancelling the ones that fight back — Planet Fitness, Adobe,
            SiriusXM and all.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard" className="btn-primary">
              Start tracking free — no signup
            </Link>
            <Link href="/cancel" className="btn-ghost">
              Browse cancel guides
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Works instantly in your browser. Create an account only when you want cloud
            sync and renewal email alerts.
          </p>
        </div>
        <BleedCalculator />
      </section>

      {/* How it works */}
      <section className="py-12">
        <h2 className="text-center text-3xl font-bold text-white">Plug the leaks in 3 steps</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "List everything you pay for",
              body: "Quick-add from 50+ common services with typical prices pre-filled, or add anything custom. See your true monthly bleed in seconds.",
            },
            {
              step: "2",
              title: "Get warned before renewals",
              body: "Renewal dates roll forward automatically and email alerts land 3 days before a charge — right when you can still do something about it.",
            },
            {
              step: "3",
              title: "Cancel the zombies",
              body: "Every subscription links to a step-by-step cancellation guide, including the retention traps they'll use to keep billing you.",
            },
          ].map((f) => (
            <div key={f.step} className="card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-lg font-bold text-emerald-400">
                {f.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guides teaser */}
      <section className="py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">The ones that fight back</h2>
            <p className="mt-2 text-slate-400">
              Some companies make cancelling deliberately painful. We mapped the mazes.
            </p>
          </div>
          <Link href="/cancel" className="hidden shrink-0 text-sm font-semibold text-emerald-400 hover:text-emerald-300 sm:block">
            All {GUIDES.length} guides →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGuides.map((g) => {
            const meta = DIFFICULTY_META[g.difficulty];
            return (
              <Link
                key={g.slug}
                href={`/cancel/${g.slug}`}
                className="card group p-5 transition hover:border-emerald-500/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-white group-hover:text-emerald-300">
                    How to cancel {g.name}
                  </h3>
                </div>
                <span className={`chip mt-3 ${meta.className}`}>{meta.label}</span>
                <p className="mt-3 line-clamp-2 text-sm text-slate-400">{g.summary}</p>
              </Link>
            );
          })}
        </div>
        <Link href="/cancel" className="mt-6 block text-center text-sm font-semibold text-emerald-400 hover:text-emerald-300 sm:hidden">
          All {GUIDES.length} guides →
        </Link>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="card flex flex-col items-center gap-6 p-10 text-center shadow-glow">
          <h2 className="max-w-2xl text-3xl font-bold text-white">
            Five minutes now, hundreds of dollars back every year.
          </h2>
          <p className="max-w-xl text-slate-400">
            No bank login required. No credit card to start. Just list your subscriptions
            and watch how fast the &ldquo;small&rdquo; charges add up.
          </p>
          <Link href="/dashboard" className="btn-primary">
            Find my leaks →
          </Link>
        </div>
      </section>
    </div>
  );
}
