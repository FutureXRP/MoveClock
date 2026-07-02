import Link from "next/link";

export function Nav() {
  return (
    <header className="print-hide sticky top-0 z-40 border-b-4 border-caution bg-sign">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 44" className="h-9 w-9" aria-hidden="true">
            <path
              d="M20 2 37 8.5c0 15-5.5 27-17 33.5C8.5 35.5 3 23.5 3 8.5L20 2Z"
              fill="#fff"
            />
            <path
              d="M20 5 34 10.4c-.2 12.6-4.8 22.6-14 28.3C10.8 33 6.2 23 6 10.4L20 5Z"
              fill="#0b5a3c"
            />
            <path
              d="M20 12v10m0 0-4.5-4.5M20 22l4.5-4.5"
              stroke="#ffc72c"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="rotate(180 20 17)"
            />
            <circle cx="20" cy="29" r="2.6" fill="#ffc72c" />
          </svg>
          <span className="font-sign text-xl font-black tracking-tight text-white">
            Move<span className="text-caution">Clock</span>
          </span>
        </Link>
        <div className="flex items-center gap-1 font-sign text-[13px] font-bold uppercase tracking-[0.08em] sm:gap-4">
          <Link href="/deadlines" className="px-2 py-2 text-white/85 transition hover:text-caution">
            All 50 deadlines
          </Link>
          <Link
            href="/#plan"
            className="rounded-lg bg-caution px-4 py-2 text-ink shadow-[inset_0_0_0_2px_rgba(22,33,27,0.8)] transition-transform hover:-translate-y-0.5"
          >
            Plan my move
          </Link>
        </div>
      </nav>
    </header>
  );
}
