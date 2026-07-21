import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPublishedCourses, coursePath } from "@/lib/courses";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-07-11");
  const courseModified = new Date("2026-07-19");

  const core: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, priority: 1 },
    // Pillars
    { url: `${SITE_URL}/golf-stroke-counter/`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/adhd-golf/`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/compare/`, lastModified, priority: 0.85 },
    { url: `${SITE_URL}/compare/simplystroke-vs-18birdies/`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/compare/simplystroke-vs-arccos/`, lastModified, priority: 0.8 },
    // Product
    { url: `${SITE_URL}/features/`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/download/`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/about/`, lastModified, priority: 0.6 },
    // Guides
    { url: `${SITE_URL}/guides/`, lastModified, priority: 0.6 },
    { url: `${SITE_URL}/guides/lost-count-of-strokes-what-to-do/`, lastModified, priority: 0.75 },
    { url: `${SITE_URL}/guides/adhd-and-golf-losing-count/`, lastModified, priority: 0.7 },
    // Reddit research
    { url: `${SITE_URL}/reddit/`, lastModified, priority: 0.8 },
  ];

  // Course directory: the index hub + one entry per published course.
  const courses = await getPublishedCourses();
  const courseUrls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/courses/`, lastModified: courseModified, priority: 0.8 },
    ...courses.map((c) => ({
      url: `${SITE_URL}${coursePath(c)}`,
      lastModified: courseModified,
      priority: 0.75,
    })),
  ];

  return [...core, ...courseUrls];
}
