# SubSentry 🛡️💸

**Stop paying for things you forgot you had.**

The average person wastes **$200+/month** on forgotten subscriptions. SubSentry is a
subscription-leak tracker that:

1. **Tracks every subscription** in one place — quick-add from 50+ common services with
   typical prices pre-filled, or add anything custom. No bank login required.
2. **Warns you before renewals hit** — renewal dates roll forward automatically and a
   daily cron emails users 3 days before a charge.
3. **Shows exactly how to cancel** — 24 step-by-step cancellation guides (Planet
   Fitness, Adobe, SiriusXM, Amazon Prime…) including the retention traps each service
   uses to keep billing you. These pages are the SEO engine: "how to cancel X" is
   massive, evergreen, high-intent search traffic.

## Why this makes money while you sleep

| Engine | How |
|---|---|
| **SEO traffic** | 24 statically-generated `/cancel/[service]` guides with `HowTo` structured data, sitemap, and internal linking. Every guide funnels readers into the free tracker. |
| **Pro tier** | $24/year via a Stripe Payment Link (zero payment code to maintain). Free plan caps at 15 subscriptions; Pro unlocks unlimited + CSV export. |
| **Retention loop** | Renewal-alert emails bring users back weekly at the exact moment the product is most valuable — right before money leaves their account. |

The tracker works **instantly with zero setup** (localStorage), so visitors get value
before ever creating an account — accounts exist for cloud sync + email alerts.

## Stack

- **Next.js 14** (App Router, TypeScript) — deploys to Vercel in one click
- **Tailwind CSS** — dark, modern UI
- **Supabase** — magic-link auth + Postgres with row-level security
- **Resend** — renewal reminder emails (sent by a Vercel Cron job)
- **Stripe Payment Link** — Pro upgrades with no server-side payment code

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

The app runs fully in **local mode** with no environment variables — subscriptions save
to the browser. Configure Supabase to enable accounts.

## Production setup (~15 minutes)

### 1. Supabase (accounts + cloud sync)

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and **Run**.
3. In **Authentication → URL Configuration**, set *Site URL* to your production domain
   and add `https://YOUR-DOMAIN/dashboard` to *Redirect URLs*.
4. Copy from **Project Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only, powers the reminder cron)

### 2. Vercel (hosting + cron)

1. Import this repo at [vercel.com/new](https://vercel.com/new) — Next.js is
   auto-detected, no build settings needed.
2. Add the environment variables from [`.env.example`](.env.example)
   (Project → Settings → Environment Variables).
3. Set `CRON_SECRET` to a long random string — Vercel automatically sends it as a
   Bearer token when invoking the cron defined in [`vercel.json`](vercel.json)
   (daily at 14:00 UTC).
4. Set `NEXT_PUBLIC_SITE_URL` to your deployed URL (for sitemap + emails).

### 3. Resend (renewal alert emails)

1. Create an API key at [resend.com](https://resend.com) → `RESEND_API_KEY`.
2. Verify a sending domain and set `REMINDER_FROM_EMAIL`
   (e.g. `SubSentry <alerts@yourdomain.com>`). Until then it falls back to Resend's
   onboarding sender, which only delivers to your own account's email.

### 4. Stripe (Pro upgrades)

1. In Stripe, create a **Payment Link** for a $24/year "SubSentry Pro" product.
2. Set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` to that URL — the Pricing page picks it up.
3. When a payment lands, flip the customer's `is_pro` flag in the `profiles` table
   (Supabase → Table Editor). Automating this with a Stripe webhook is the natural next
   step, but manual works fine at MVP volume.

If a step is skipped, the app degrades gracefully: no Supabase → local-only mode with a
friendly notice; no Resend → cron reports "not configured"; no Stripe link → Pricing
shows "Pro launching soon".

## Testing

```bash
npm run build      # type-checks and builds all 34 pages
npm start          # serve the production build
```

Smoke-test routes: `/`, `/dashboard`, `/cancel`, `/cancel/planet-fitness`, `/pricing`,
`/login`, `/sitemap.xml`. The cron endpoint (`/api/cron/reminders`) returns 401 without
the `CRON_SECRET` bearer token — that means it's protected and working.

## Roadmap ideas

- Stripe webhook → automatic `is_pro` flag
- Price-hike alerts (notify when a tracked service raises its typical price)
- More guides — each new `src/lib/guides.ts` entry is a new SEO landing page
- Shared household tracking
- "Cancel for me" concierge as a paid add-on
