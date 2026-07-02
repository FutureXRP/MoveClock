# MoveClock 🛣️

**Your new state started counting the day you arrived.**

Around 8 million Americans move between states every year, and almost none of them know
that the destination state starts several *legal* clocks the day they establish
residency:

- **Driver's license conversion** — 10 days in California; *zero grace period* in
  Arizona, Massachusetts, and Michigan; up to 90 elsewhere. Driving past the deadline is
  citable.
- **Vehicle title & registration** — usually a *different* window than the license
  (Texas: 90 days for the license, 30 for the truck), with late fees that stack.
- **Insurance, voter registration, payroll withholding** — each with its own trap.

MoveClock turns that scattered mess into one product:

- **Route planner** — origin + destination + arrival date → a dated countdown with
  day-badges, what to bring, and the counter-by-counter gotchas.
- **📅 Calendar export** — one click downloads an `.ics` file; every deadline lands in
  Google/Apple/Outlook with a 3-day-early alarm. No account, no email.
- **2,550 route pages** (`/moving/[from]/[to]`) + **51 state hubs** (`/state/[slug]`) +
  a **master deadline table** (`/deadlines`) — programmatic SEO for "moving from X to Y"
  and "how long to get a license after moving to X", with FAQ structured data.
- **Origin-state exit notes** — the stuff people forget (New York/California residency
  tax audits, returning NJ plates, closing Texas toll tags).

## Why this is a passive-income asset

| Engine | How |
|---|---|
| **Programmatic SEO** | 2,600+ indexed pages targeting evergreen, high-intent move queries. The data answer ("30 days, here's the date") is exactly what searchers want and what generic moving-blog content doesn't compute. |
| **Affiliate slots** | Moving quotes, car shipping, and insurance re-quotes are among the highest-CPA affiliate verticals on the web. Slots render only when `NEXT_PUBLIC_AFFILIATE_*` env vars are set — revenue turns on with a config change, no deploy. |
| **Zero ops** | No database, no accounts, no server state. One data file to skim once a year. |

**Novelty check (July 2026):** state DMV pages, moving-company blogs, and tax-prep
articles each cover fragments; personalized *packing checklist* generators exist. No
product was found that computes dated legal deadlines per state pair with calendar
export. Searches: "new resident deadline calculator", "state to state moving checklist
app", "days after moving license countdown".

## Stack

- **Next.js 14** (App Router, TypeScript). Core pages + 240 busiest corridors are
  prebuilt; the long tail of route pages renders on demand and caches for a day
  (`revalidate = 86400`).
- **Tailwind CSS** with a highway-signage design system — interstate green panels,
  caution yellow, Overpass (the Highway-Gothic-derived typeface), mile-marker timeline.
- `.ics` generation is pure client-side — nothing the user enters leaves the browser.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Fully functional with zero environment variables.

## Deployment (~3 minutes)

1. Import the repo at [vercel.com/new](https://vercel.com/new) — auto-detected, no
   settings.
2. Set `NEXT_PUBLIC_SITE_URL` to the deployed URL (sitemap + canonical tags).
3. Submit `/sitemap.xml` (2,603 URLs) in Google Search Console.
4. When ready to monetize: join moving/insurance/auto-transport affiliate programs and
   set the three `NEXT_PUBLIC_AFFILIATE_*` env vars from [`.env.example`](.env.example).

## Content maintenance

All state data lives in [`src/lib/moveData.ts`](src/lib/moveData.ts) — deadlines,
agency names, inspection rules, tax flags, exit notes — with a `LAST_REVIEWED` date
rendered site-wide. Deadlines were compiled from state agency guidance; a fact-check
pass against each DMV site before heavy promotion is recommended (it's 51 rows — an
afternoon). Every page carries a verify-with-the-agency disclaimer.

## Roadmap ideas

- Per-state DMV document checklists ("what counts as proof of residency in X")
- City-level pages (NYC 90-day plate rule, Chicago city sticker, DC RPP)
- Email-capture "moving in 30 days" drip checklist as a lead magnet
- International → US and military-move variants
