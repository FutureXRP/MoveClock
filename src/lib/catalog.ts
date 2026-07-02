import type { Cycle } from "./types";

export interface CatalogItem {
  name: string;
  /** Typical US price for the most common plan, per cycle. */
  price: number;
  cycle: Cycle;
  category: string;
  /** Matching cancellation-guide slug, when one exists. */
  guideSlug?: string;
}

/**
 * Common subscriptions with typical US prices (mid-2026). Prices are
 * editable after quick-add — they're a starting point, not gospel.
 */
export const CATALOG: CatalogItem[] = [
  { name: "Netflix", price: 17.99, cycle: "monthly", category: "Streaming", guideSlug: "netflix" },
  { name: "Spotify Premium", price: 11.99, cycle: "monthly", category: "Music", guideSlug: "spotify" },
  { name: "Amazon Prime", price: 139, cycle: "yearly", category: "Shopping", guideSlug: "amazon-prime" },
  { name: "Disney+", price: 9.99, cycle: "monthly", category: "Streaming", guideSlug: "disney-plus" },
  { name: "Hulu", price: 9.99, cycle: "monthly", category: "Streaming", guideSlug: "hulu" },
  { name: "Max (HBO)", price: 16.99, cycle: "monthly", category: "Streaming", guideSlug: "max" },
  { name: "YouTube Premium", price: 13.99, cycle: "monthly", category: "Streaming", guideSlug: "youtube-premium" },
  { name: "Apple One", price: 19.95, cycle: "monthly", category: "Bundle", guideSlug: "apple-subscriptions" },
  { name: "Apple TV+", price: 9.99, cycle: "monthly", category: "Streaming", guideSlug: "apple-subscriptions" },
  { name: "iCloud+", price: 2.99, cycle: "monthly", category: "Storage", guideSlug: "apple-subscriptions" },
  { name: "Paramount+", price: 7.99, cycle: "monthly", category: "Streaming", guideSlug: "paramount-plus" },
  { name: "Peacock", price: 7.99, cycle: "monthly", category: "Streaming", guideSlug: "peacock" },
  { name: "Audible", price: 14.95, cycle: "monthly", category: "Books", guideSlug: "audible" },
  { name: "Kindle Unlimited", price: 11.99, cycle: "monthly", category: "Books" },
  { name: "Planet Fitness", price: 15, cycle: "monthly", category: "Fitness", guideSlug: "planet-fitness" },
  { name: "LA Fitness", price: 39.99, cycle: "monthly", category: "Fitness" },
  { name: "Peloton App", price: 12.99, cycle: "monthly", category: "Fitness" },
  { name: "Adobe Creative Cloud", price: 59.99, cycle: "monthly", category: "Software", guideSlug: "adobe-creative-cloud" },
  { name: "Canva Pro", price: 15, cycle: "monthly", category: "Software", guideSlug: "canva" },
  { name: "Dropbox Plus", price: 11.99, cycle: "monthly", category: "Storage", guideSlug: "dropbox" },
  { name: "Google One", price: 1.99, cycle: "monthly", category: "Storage" },
  { name: "Microsoft 365", price: 99.99, cycle: "yearly", category: "Software" },
  { name: "ChatGPT Plus", price: 20, cycle: "monthly", category: "Software" },
  { name: "Claude Pro", price: 20, cycle: "monthly", category: "Software" },
  { name: "Grammarly Premium", price: 12, cycle: "monthly", category: "Software", guideSlug: "grammarly" },
  { name: "LinkedIn Premium", price: 39.99, cycle: "monthly", category: "Career", guideSlug: "linkedin-premium" },
  { name: "NYT Digital", price: 25, cycle: "monthly", category: "News", guideSlug: "new-york-times" },
  { name: "Wall Street Journal", price: 38.99, cycle: "monthly", category: "News" },
  { name: "Xbox Game Pass Ultimate", price: 19.99, cycle: "monthly", category: "Gaming", guideSlug: "xbox-game-pass" },
  { name: "PlayStation Plus", price: 79.99, cycle: "yearly", category: "Gaming", guideSlug: "playstation-plus" },
  { name: "Nintendo Switch Online", price: 19.99, cycle: "yearly", category: "Gaming" },
  { name: "DoorDash DashPass", price: 9.99, cycle: "monthly", category: "Food", guideSlug: "dashpass" },
  { name: "Uber One", price: 9.99, cycle: "monthly", category: "Food" },
  { name: "Instacart+", price: 99, cycle: "yearly", category: "Food" },
  { name: "HelloFresh", price: 60, cycle: "weekly", category: "Food" },
  { name: "SiriusXM", price: 9.99, cycle: "monthly", category: "Music", guideSlug: "siriusxm" },
  { name: "Tinder Gold", price: 24.99, cycle: "monthly", category: "Dating", guideSlug: "tinder" },
  { name: "Hinge+", price: 32.99, cycle: "monthly", category: "Dating" },
  { name: "Duolingo Super", price: 12.99, cycle: "monthly", category: "Education" },
  { name: "MasterClass", price: 120, cycle: "yearly", category: "Education" },
  { name: "Skillshare", price: 168, cycle: "yearly", category: "Education" },
  { name: "Ring Protect", price: 4.99, cycle: "monthly", category: "Home" },
  { name: "Nest Aware", price: 8, cycle: "monthly", category: "Home" },
  { name: "NordVPN", price: 12.99, cycle: "monthly", category: "Software" },
  { name: "PlayStation Now", price: 9.99, cycle: "monthly", category: "Gaming" },
  { name: "Twitch Turbo", price: 11.99, cycle: "monthly", category: "Gaming" },
  { name: "Patreon (creator support)", price: 5, cycle: "monthly", category: "Creator" },
  { name: "OnlyFans", price: 9.99, cycle: "monthly", category: "Creator" },
  { name: "Costco Membership", price: 65, cycle: "yearly", category: "Shopping" },
  { name: "Walmart+", price: 98, cycle: "yearly", category: "Shopping" },
];

export const CATEGORIES = Array.from(new Set(CATALOG.map((c) => c.category))).sort();
