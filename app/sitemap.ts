import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
  const base = raw
    ? raw.startsWith("http://") || raw.startsWith("https://")
      ? raw.replace(/\/$/, "")
      : `https://${raw.replace(/\/$/, "")}`
    : "http://localhost:3000";

  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/library`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/store`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/library/arcade`, changeFrequency: "monthly", priority: 0.5 },
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/resume`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
