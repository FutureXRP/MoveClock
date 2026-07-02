import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://subsentry.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/cancel`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/pricing`, changeFrequency: "monthly", priority: 0.6 },
  ];
  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${siteUrl}/cancel/${g.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...staticPages, ...guidePages];
}
