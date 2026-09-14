import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.contentLastUpdated);

  const entries: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((service) => ({ path: `/services/${service.slug}`, priority: 0.8 })),
    { path: "/about", priority: 0.7 },
    { path: "/sectors", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  return entries.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
