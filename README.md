# DepositBack 🏛️

**Your landlord has a deadline. It may have already passed.**

Renters hand over roughly **$45 billion** in security deposits, and about 1 in 4 report
losing deposit money they believe was wrongfully withheld. Almost none of them know the
two facts that change the outcome:

1. **Every state gives landlords a hard statutory deadline** (14–60 days) to return the
   deposit or itemize deductions.
2. **Most states impose 2×–3× penalties** for missing it — Texas is 3× + $100 +
   attorney's fees; Massachusetts is treble damages plus interest.

DepositBack turns that law into action:

- **Deadline calculator** — state + move-out date → the exact day the law required the
  money back, and the size of the potential claim.
- **51 state-law guides** (`/law/[state]`) — deadline, statute citation, penalty,
  wear-and-tear rules, and a step-by-step playbook. FAQ structured data on every page.
- **Free demand-letter generator** (`/demand-letter`) — a certified-mail-ready letter
  that cites the exact statute, computes the exact dates, and states the exact penalty.
  Runs entirely in the browser; nothing the user types ever leaves their machine.
- **The Escalation Kit** (`/kit`, $29 one-time) — final-notice letter, small-claims
  filing walkthrough, exhibit-binder checklist, and a 90-second hearing script for
  landlords who stonewall.

## Why it earns passively

| Engine | How |
|---|---|
| **Programmatic SEO** | 51 statically-generated state pages targeting "security deposit law [state]" / "how long does a landlord have to return a deposit" — evergreen, high-intent queries with weak product competition (mostly law-blog content). |
| **One-time purchases** | Stripe Payment Link for the $29 kit — no payment code, no subscriptions to support, no refund ops. |
| **Zero maintenance** | No database, no accounts, no cron jobs, no user data. The only recurring task is an annual statute review (edit one data file). |

## Stack

- **Next.js 14** (App Router, TypeScript) — static-first; the only server code is one
  optional Stripe verification route
- **Tailwind CSS** with a custom editorial design system — paper texture, Fraunces &
  Newsreader type, letterpress buttons, rubber-stamp accents
- **Stripe Payment Link** (optional) for kit purchases

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # builds all 61 pages (51 state guides + core pages)
```

The site is fully functional with **zero environment variables** — the kit simply runs
in free "beta mode" until Stripe is configured.

## Deployment (~5 minutes)

1. Import the repo at [vercel.com/new](https://vercel.com/new) — Next.js is detected
   automatically; no settings needed.
2. Set `NEXT_PUBLIC_SITE_URL` to your deployed URL (used by the sitemap and metadata).
3. **To monetize the kit** (optional, do this whenever):
   - In Stripe, create a **Payment Link** for a one-time $29 product ("Escalation Kit").
   - Under the link's confirmation settings, redirect to
     `https://YOUR-DOMAIN/kit?session_id={CHECKOUT_SESSION_ID}`.
   - Set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` (the link) and `STRIPE_SECRET_KEY` (for
     server-side purchase verification) in Vercel env vars, then redeploy.
4. Submit `https://YOUR-DOMAIN/sitemap.xml` in Google Search Console to start the SEO
   clock.

## Content maintenance

All legal data lives in one file: [`src/lib/states.ts`](src/lib/states.ts) — statute
citations, deadlines, penalties, and notes for all 50 states + DC, with a
`LAST_REVIEWED` date rendered site-wide. Statutes change; skim the file against current
law once a year and bump the date. Every page carries a not-legal-advice disclaimer.

## Honest positioning

Adjacent things exist — law-firm blogs, NOLO articles, DoNotPay's generic letter bot —
but there is no polished, dedicated, self-serve product for deposit recovery with
per-state statute math. The moat is content quality + product experience, and the
"passive" part is real: static pages, one-time payments, no ops.

## Roadmap ideas

- Per-city pages (Chicago RLTO, SF, NYC) — stricter local ordinances, more SEO surface
- Spanish-language versions of the guides and letter
- "Deposit protection" checklist for move-IN (photos, condition report) as an email-capture lead magnet
- Affiliate: certified-mail-online services (send the letter without a post-office trip)
