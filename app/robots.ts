import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
  const base = raw
    ? raw.startsWith("http://") || raw.startsWith("https://")
      ? raw.replace(/\/$/, "")
      : `https://${raw.replace(/\/$/, "")}`
    : "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}


