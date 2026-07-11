import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-11");
  return [
    { url: `${SITE_URL}/`, lastModified, priority: 1 },
    { url: `${SITE_URL}/adhd-golf/`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/features/`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/download/`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/blog/`, lastModified, priority: 0.6 },
    {
      url: `${SITE_URL}/blog/adhd-and-golf-losing-count/`,
      lastModified,
      priority: 0.7,
    },
  ];
}
