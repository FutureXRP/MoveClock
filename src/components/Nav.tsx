import Link from "next/link";
import { Logo } from "./Logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-white">
          <Logo />
          <span className="text-lg">
            Sub<span className="text-emerald-400">Sentry</span>
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/cancel"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-emerald-300"
          >
            Cancel Guides
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-emerald-300"
          >
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="ml-1 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-emerald-400"
          >
            My Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
}
