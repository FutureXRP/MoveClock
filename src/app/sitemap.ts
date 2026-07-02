import type { MetadataRoute } from "next";
import { STATES } from "@/lib/moveData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://moveclock.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/deadlines`, changeFrequency: "monthly", priority: 0.9 },
  ];
  const stateHubs: MetadataRoute.Sitemap = STATES.map((s) => ({
    url: `${siteUrl}/state/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const pairs: MetadataRoute.Sitemap = [];
  for (const from of STATES) {
    for (const to of STATES) {
      if (from.slug === to.slug) continue;
      pairs.push({
        url: `${siteUrl}/moving/${from.slug}/${to.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return [...core, ...stateHubs, ...pairs];
}
