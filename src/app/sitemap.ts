import type { MetadataRoute } from "next";
import { STATES } from "@/lib/states";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://depositback.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/law`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/demand-letter`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/kit`, changeFrequency: "monthly", priority: 0.7 },
  ];
  const statePages: MetadataRoute.Sitemap = STATES.map((s) => ({
    url: `${siteUrl}/law/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...staticPages, ...statePages];
}
