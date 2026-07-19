import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_URL, NOINDEX } from "@/lib/site";
import { breadcrumbNode, graph } from "@/lib/schema";
import {
  getPublishedCourses,
  coursePath,
  stateName,
  ACCESS_LABEL,
} from "@/lib/courses";
import "./course.css";

export const metadata: Metadata = {
  title: "Golf Course Directory: Scores, Difficulty & Leaderboards | SimplyStroke",
  description:
    "Real amateur scoring data, hole-by-hole difficulty, full scorecards, and leaderboards for the courses golfers search. Built from rounds posted to SimplyStroke.",
  alternates: { canonical: `${SITE_URL}/courses/` },
  ...(NOINDEX ? { robots: { index: false, follow: false } } : {}),
};

export default async function CoursesIndex() {
  const courses = await getPublishedCourses();
  const jsonLd = graph(breadcrumbNode([{ name: "Golf Courses", path: "/courses/" }]));

  return (
    <main className="course-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="cd-crumbs">
        <div className="cd-crumbs-inner">
          <Breadcrumbs crumbs={[{ name: "Golf Courses", path: "/courses/" }]} />
        </div>
      </div>

      <header className="page-hero">
        <div className="hero-inner" style={{ gridTemplateColumns: "1fr" }}>
          <div className="hero-copy">
            <div className="hero-eyebrow">SimplyStroke course directory</div>
            <h1>
              Golf courses, by the <span className="accent">numbers</span>
            </h1>
            <p className="hero-sub">
              What real amateurs shoot, hole-by-hole difficulty, full scorecards, and a live
              leaderboard on every page. Built from rounds posted to SimplyStroke.
            </p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">Featured courses</span>
          <h2 className="h2-display" style={{ margin: "8px 0 6px" }}>
            The first ten
          </h2>
          <p className="section-lede" style={{ marginBottom: 8 }}>
            Ten of the most-searched public and resort courses in America, with more on the way.
          </p>
          <div className="near-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {courses.map((c) => (
              <Link key={c.slug} className="near" href={coursePath(c)}>
                <div className="nm">{c.name}</div>
                <div className="meta">
                  {c.city}, {stateName(c.state)} · Par {c.par_total} ·{" "}
                  {ACCESS_LABEL[c.access_type] ?? "Public"}
                </div>
                <div className="rr">
                  Rating <b>{c.course_rating}</b> · slope {c.slope_rating}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
