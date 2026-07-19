import { SITE_URL } from "@/lib/site";
import {
  getPublishedCourses,
  getCourse,
  getCourseStats,
  coursePath,
  slugify,
  stateName,
} from "@/lib/courses";

// Per-course machine-readable endpoint: an AI agent can read the stats and
// facts without rendering the page. Statically generated at build time (one
// data.json per course), so it costs nothing at runtime.
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const courses = await getPublishedCourses();
  return courses.map((c) => ({
    state: slugify(stateName(c.state)),
    city: slugify(c.city),
    slug: c.slug,
  }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) {
    return new Response(JSON.stringify({ error: "not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  const stats = await getCourseStats(course);

  return Response.json({
    name: course.name,
    url: `${SITE_URL}${coursePath(course)}`,
    location: {
      address: course.address,
      city: course.city,
      state: course.state,
      zip: course.zip,
      lat: course.lat,
      lng: course.lng,
    },
    par: course.par_total,
    holes: course.holes_count,
    designer: course.designer,
    year_opened: course.year_opened,
    course_rating: course.course_rating,
    slope_rating: course.slope_rating,
    access_type: course.access_type,
    green_fee_tier: course.green_fee_tier,
    tees: course.tees,
    scoring: stats
      ? {
          rounds_posted: stats.rounds_count,
          average_score: stats.avg_score,
          average_to_par: stats.avg_to_par,
          low_round: stats.low_round,
          hardest_holes: stats.hardest_holes,
          updated: stats.updated_at,
        }
      : { rounds_posted: 0, note: "No rounds posted yet." },
    attribution:
      "Course facts curated by SimplyStroke. Map imagery © OpenStreetMap contributors (ODbL).",
  });
}
