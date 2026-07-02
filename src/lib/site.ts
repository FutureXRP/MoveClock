/** Site-wide constants, env-overridable per deployment. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://moveclock.vercel.app";

/**
 * Public contact address shown on /contact, /partners, and legal pages.
 * Set NEXT_PUBLIC_CONTACT_EMAIL in Vercel (a Gmail works fine until
 * domain email exists).
 */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@moveclock.app";

export const SITE_NAME = "MoveClock";

export const EFFECTIVE_DATE = "July 2, 2026";
