import Link from "next/link";
import { AFFILIATES } from "@/lib/affiliates";

/**
 * Monetization card shown on route and state pages. Slots use real tracking
 * URLs when NEXT_PUBLIC_AFFILIATE_* env vars are set; until then each links
 * to /partners so the placement is visible and honestly explained.
 */

const SLOTS = [
  {
    ...AFFILIATES.movers,
    label: "Compare moving company quotes",
    sub: "Licensed interstate movers, free quotes",
  },
  {
    ...AFFILIATES.insurance,
    label: "Re-quote your car insurance for the new state",
    sub: "Rates change more than you'd think when you cross a border",
  },
  {
    ...AFFILIATES.carship,
    label: "Get car shipping quotes",
    sub: "Door-to-door interstate auto transport",
  },
  {
    ...AFFILIATES.internet,
    label: "Set up internet at the new address",
    sub: "See which providers serve your new place before you arrive",
  },
];

export function AffiliateSlot() {
  const allDemo = SLOTS.every((s) => s.demo);
  return (
    <aside className="card border-l-4 border-l-sign p-5">
      <div className="overline-label">Helpful for this move</div>
      <ul className="mt-3 space-y-3">
        {SLOTS.map((s) => (
          <li key={s.label}>
            {s.demo ? (
              <Link href={s.url} className="group block">
                <span className="font-sign text-[15px] font-extrabold text-sign group-hover:underline">
                  {s.label} →
                </span>
                <span className="block text-[13px] text-gravel">{s.sub}</span>
              </Link>
            ) : (
              <a href={s.url} target="_blank" rel="noopener noreferrer sponsored" className="group block">
                <span className="font-sign text-[15px] font-extrabold text-sign group-hover:underline">
                  {s.label} →
                </span>
                <span className="block text-[13px] text-gravel">{s.sub}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-gravel/70">
        {allDemo ? (
          <>
            Preview placements — <Link href="/partners" className="underline">how sponsorship works</Link>. They keep MoveClock free.
          </>
        ) : (
          "Sponsored links — they keep MoveClock free."
        )}
      </p>
    </aside>
  );
}
