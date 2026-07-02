import Link from "next/link";

export function Nav() {
  return (
    <header className="print-hide sticky top-0 z-40 border-b-4 border-double border-ink/70 bg-paper/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-0.5">
          <span className="font-display text-[22px] font-black tracking-tight text-ink">
            DepositBack
          </span>
          <span className="font-display text-[26px] font-black leading-none text-seal">.</span>
        </Link>
        <div className="flex items-center gap-2 font-ui text-[13px] font-semibold sm:gap-5">
          <Link href="/law" className="px-1 py-2 uppercase tracking-[0.1em] text-soot transition hover:text-seal">
            State laws
          </Link>
          <Link href="/kit" className="hidden px-1 py-2 uppercase tracking-[0.1em] text-soot transition hover:text-seal sm:block">
            Escalation kit
          </Link>
          <Link
            href="/demand-letter"
            className="rounded-sm border-2 border-ink bg-seal px-3.5 py-2 uppercase tracking-[0.08em] text-cream shadow-liftsm transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
          >
            Write my letter
          </Link>
        </div>
      </nav>
    </header>
  );
}
