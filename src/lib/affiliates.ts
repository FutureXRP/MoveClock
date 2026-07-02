/**
 * Affiliate slot resolution. Each slot uses its real tracking URL when the
 * env var is set; otherwise it falls back to the /partners page so the
 * placement is visible (and honest) before programs are wired up.
 */

export interface AffiliateLink {
  url: string;
  /** True when showing the placeholder that links to /partners. */
  demo: boolean;
}

function resolve(envUrl: string | undefined, anchor: string): AffiliateLink {
  if (envUrl) return { url: envUrl, demo: false };
  return { url: `/partners#${anchor}`, demo: true };
}

export const AFFILIATES = {
  movers: resolve(process.env.NEXT_PUBLIC_AFFILIATE_MOVERS_URL, "movers"),
  insurance: resolve(process.env.NEXT_PUBLIC_AFFILIATE_INSURANCE_URL, "insurance"),
  carship: resolve(process.env.NEXT_PUBLIC_AFFILIATE_CARSHIP_URL, "car-shipping"),
};
