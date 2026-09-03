import type { MetadataRoute } from "next";
import { SITE_URL, slugs } from "@/lib/madapath";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [];

  for (const lang of ["fr", "en"] as const) {
    routes.push({
      url: `${SITE_URL}/${lang}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    });
    routes.push({
      url: `${SITE_URL}/${lang}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    for (const slug of slugs) {
      routes.push({
        url: `${SITE_URL}/${lang}/services/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  return routes;
}