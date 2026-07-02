/**
 * Monetization slots. Each renders only when its env var is configured, so the
 * site ships clean and turns revenue on with a config change (e.g. moving-quote
 * networks, car shipping, insurance comparison — the classic high-CPA verticals
 * for this audience).
 */

const SLOTS = [
  {
    href: process.env.NEXT_PUBLIC_AFFILIATE_MOVERS_URL,
    label: "Compare moving company quotes",
    sub: "Licensed interstate movers, free quotes",
  },
  {
    href: process.env.NEXT_PUBLIC_AFFILIATE_INSURANCE_URL,
    label: "Re-quote your car insurance for the new state",
    sub: "Rates change more than you'd think when you cross a border",
  },
  {
    href: process.env.NEXT_PUBLIC_AFFILIATE_CARSHIP_URL,
    label: "Get car shipping quotes",
    sub: "Door-to-door interstate auto transport",
  },
].filter((s) => Boolean(s.href));

export function AffiliateSlot() {
  if (SLOTS.length === 0) return null;
  return (
    <aside className="card border-l-4 border-l-sign p-5">
      <div className="overline-label">Helpful for this move</div>
      <ul className="mt-3 space-y-3">
        {SLOTS.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group block"
            >
              <span className="font-sign text-[15px] font-extrabold text-sign group-hover:underline">
                {s.label} →
              </span>
              <span className="block text-[13px] text-gravel">{s.sub}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-gravel/70">
        Sponsored links — they keep MoveClock free.
      </p>
    </aside>
  );
}
