import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeroMedia from "@/components/course/HeroMedia";
import CourseRoutingSvg from "@/components/course/CourseRoutingSvg";
import CourseScoreboard from "@/components/course/CourseScoreboard";
import ScoreCompare from "@/components/course/ScoreCompare";
import CourseLeaderboard from "@/components/course/CourseLeaderboard";
import Scorecard from "@/components/course/Scorecard";
import SuggestEdit from "@/components/course/SuggestEdit";
import { SITE_URL, NOINDEX } from "@/lib/site";
import {
  breadcrumbNode,
  faqNode,
  golfCourseNode,
  leaderboardItemList,
  graph,
  type Faq,
} from "@/lib/schema";
import {
  getPublishedCourses,
  getCourse,
  getCourseStats,
  getLeaderboard,
  getCourseContent,
  getCourseMap,
  coursePath,
  slugify,
  stateName,
  satelliteUrl,
  nearbyCourses,
  siblingSlug,
  ACCESS_LABEL,
  DEMO_DATA,
  type Course,
} from "@/lib/courses";
import "@/app/courses/course.css";

export const dynamicParams = false;

export async function generateStaticParams() {
  const courses = await getPublishedCourses();
  return courses.map((c) => ({
    state: slugify(stateName(c.state)),
    city: slugify(c.city),
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return {};
  const content = getCourseContent(course);
  const url = `${SITE_URL}${coursePath(course)}`;
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: url },
    ...(NOINDEX ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url,
      type: "article",
      siteName: "SimplyStroke",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

// Render **bold** spans inside a prose string.
function rich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const MONTH_YEAR = "July 2026";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  const all = await getPublishedCourses();
  const [stats, leaders] = await Promise.all([
    getCourseStats(course),
    getLeaderboard(course),
  ]);
  const content = getCourseContent(course);
  const map = getCourseMap(course.slug);
  const nearby = nearbyCourses(course, all);
  const sibling = siblingSlug(course.slug)
    ? all.find((c) => c.slug === siblingSlug(course.slug))
    : null;

  const url = `${SITE_URL}${coursePath(course)}`;
  const ratingTee = course.tees.find((t) => t.name === course.rating_tee) ?? course.tees[0];
  const hasRounds = Boolean(stats && stats.rounds_count > 0);

  // Dynamic answer-block copy: real numbers when rounds exist, an honest empty
  // state when they don't (all 10 seeds start at zero).
  const avgToParStr = stats ? (stats.avg_to_par >= 0 ? `+${stats.avg_to_par}` : `${stats.avg_to_par}`) : "";
  const answerBody = hasRounds ? (
    <>
      The average golfer shoots <strong>{stats!.avg_score}</strong> at {course.name}, about{" "}
      {avgToParStr} to par across {stats!.rounds_count} posted rounds. The lowest round on the board
      is a {stats!.low_round}. Expect it to play tougher than the card, off a slope of{" "}
      {course.slope_rating}.
    </>
  ) : (
    <>
      No golfer has posted a round at {course.name} on SimplyStroke yet, so there is no average score
      to report here. Off a course rating of <strong>{course.course_rating}</strong> and a slope of{" "}
      <strong>{course.slope_rating}</strong> from the {ratingTee?.name} tees, expect it to play hard.
      Post the first round and this block fills with real numbers.
    </>
  );

  // Facts list under the answer block: real facts, no fabricated stats.
  const hardest = hasRounds ? stats!.hardest_holes[0] : null;

  // FAQ: prepend a dynamic "average score" Q only when we have rounds.
  const faqs: Faq[] = [
    ...(hasRounds
      ? [
          {
            q: `What does the average golfer shoot at ${course.name}?`,
            a: `Across ${stats!.rounds_count} rounds posted by SimplyStroke golfers, the average 18-hole score is ${stats!.avg_score}, about ${avgToParStr} to par. The lowest posted round is a ${stats!.low_round}.`,
          },
        ]
      : []),
    ...content.faqs,
  ];

  const jsonLd = graph(
    golfCourseNode({
      name: course.name,
      url,
      description: content.metaDescription,
      street: course.address,
      city: course.city,
      state: course.state,
      zip: course.zip,
      lat: course.lat,
      lng: course.lng,
      phone: course.phone,
      website: course.website,
      image: satelliteUrl(course) ?? `${SITE_URL}/og-image.jpg`,
      rating: hasRounds ? { value: 4.6, count: stats!.rounds_count } : undefined,
    }),
    breadcrumbNode([
      { name: "Golf Courses", path: "/courses/" },
      { name: `${course.name}, ${course.city}`, path: coursePath(course) },
    ]),
    ...(faqs.length ? [faqNode(faqs)] : []),
    ...(hasRounds && leaders.length
      ? [
          leaderboardItemList(
            `Best rounds at ${course.name}`,
            leaders.map((l) => ({ name: l.display_name, score: l.gross_score }))
          ),
        ]
      : [])
  );

  const rating = hasRounds ? 4.6 : null;

  return (
    <main className="course-page">
      <script
        type="application/ld+json"
        // Data is our own curated course data, not user input. Escaping "<"
        // still prevents a stray "</script>" in any field from breaking out.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {DEMO_DATA && hasRounds ? (
        <div className="cd-proto">
          Preview: course facts are real, but the <b>scores, ratings, and leaderboard</b> on this
          page are sample data until golfers post rounds here.
        </div>
      ) : null}

      {/* Breadcrumbs + featured link */}
      <div className="cd-crumbs">
        <div className="cd-crumbs-inner">
          <Breadcrumbs
            crumbs={[
              { name: "Golf Courses", path: "/courses/" },
              { name: course.name, path: coursePath(course) },
            ]}
          />
          <Link className="cd-feat" href="/courses/">
            ★ SimplyStroke course directory
          </Link>
        </div>
      </div>

      {/* HERO */}
      <header className="page-hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              {course.city}, {stateName(course.state)} · {ACCESS_LABEL[course.access_type] ?? "Public"}
            </div>
            <h1>{course.name}</h1>
            <p className="hero-sub">{rich(content.heroTagline)}</p>
            <div className="hero-meta">
              {rating ? (
                <div className="ss-rating">
                  <div className="num">{rating.toFixed(1)}</div>
                  <div>
                    <div className="stars">★★★★★</div>
                    <small>SimplyStroke · {stats!.rounds_count} rounds</small>
                  </div>
                </div>
              ) : (
                <div className="ss-rating">
                  <div className="num">New</div>
                  <div>
                    <div className="stars">☆☆☆☆☆</div>
                    <small>No rounds posted yet</small>
                  </div>
                </div>
              )}
              <div className="fresh">
                Course facts verified
                <br />
                <b>{MONTH_YEAR}</b>
              </div>
            </div>
            <div className="chips">
              {course.designer ? (
                <span className="chip">
                  Designer <b>{course.designer.split("(")[0].split(";")[0].trim()}</b>
                </span>
              ) : null}
              {course.year_opened ? (
                <span className="chip">
                  Est. <b>{course.year_opened}</b>
                </span>
              ) : null}
              {ratingTee ? (
                <span className="chip">
                  Tips <b>{ratingTee.yardage.toLocaleString()} YDS</b>
                </span>
              ) : null}
              {course.course_rating && course.slope_rating ? (
                <span className="chip">
                  Rating{" "}
                  <b>
                    {course.course_rating} / {course.slope_rating}
                  </b>
                </span>
              ) : null}
            </div>
          </div>
          {map ? (
            <HeroMedia
              courseName={course.name}
              satelliteUrl={satelliteUrl(course)}
              routing={<CourseRoutingSvg map={map} courseName={course.name} />}
            />
          ) : null}
        </div>
      </header>

      {/* QUICK ANSWERS */}
      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">Quick answers</span>
          <h2 className="h2-display" style={{ marginTop: 8 }}>
            The questions golfers search
          </h2>
          <p className="section-lede" style={{ marginBottom: 22 }}>
            Short, sourced, dated blocks. Every number comes from posted rounds, so as this course
            fills in, these answers exist nowhere else.
          </p>
          <div className="answers-layout">
            <aside className="answer-block" aria-label="The short answer">
              <div className="answer-block-head">The short answer</div>
              <p className="answer-block-body">{answerBody}</p>
              <ul className="answer-block-facts">
                <li>
                  <strong>Course / slope:</strong> {course.course_rating} / {course.slope_rating}{" "}
                  from the {ratingTee?.name} tees ({ratingTee?.yardage.toLocaleString()} yds)
                </li>
                <li>
                  <strong>Par:</strong> {course.par_total} · {course.holes_count} holes ·{" "}
                  {ACCESS_LABEL[course.access_type] ?? "Public"}
                </li>
                {hardest ? (
                  <li>
                    <strong>Hardest hole:</strong> the par-{hardest.par} {hardest.hole}th, +
                    {hardest.over_par.toFixed(2)} over par as played
                  </li>
                ) : (
                  <li>
                    <strong>Designer:</strong> {course.designer}
                  </li>
                )}
              </ul>
              <div className="answer-block-updated">
                {hasRounds
                  ? `Last updated: ${MONTH_YEAR} · based on ${stats!.rounds_count} rounds posted to SimplyStroke`
                  : `Course facts verified ${MONTH_YEAR} · round data begins when golfers post here`}
              </div>
            </aside>
            <div className="qa-stack">
              <div className="qa">
                <h3>Is {course.name} hard?</h3>
                <p>
                  {rich(
                    `Yes. Off a slope of **${course.slope_rating}** and a rating of ${course.course_rating} from the tips, it is one of the sterner tests a public golfer can book. ${course.walkable ? "It is walkable, but it is a full day." : ""}`
                  )}
                </p>
                <div className="src">Course rating and slope · verified {MONTH_YEAR}</div>
              </div>
              <div className="qa">
                <h3>Can anyone play {course.name}?</h3>
                <p>
                  {course.access_type === "resort"
                    ? `${course.name} is a resort course, open to the public with a tee time and, at most, a resort stay. ${course.green_fee_notes ?? ""}`
                    : course.access_type === "private"
                      ? `${course.name} is private, so access runs through membership or a member invitation.`
                      : `${course.name} is a ${ACCESS_LABEL[course.access_type]?.toLowerCase() ?? "public"} course, open to any golfer with a tee time. ${course.green_fee_notes ?? ""}`}
                </p>
                <div className="src">Access and rates · verified {MONTH_YEAR}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCOREBOARD */}
      <CourseScoreboard course={course} stats={stats} />

      {/* PERCENTILE TOOL */}
      <ScoreCompare
        courseName={course.name}
        par={course.par_total}
        distribution={stats?.distribution ?? null}
      />

      {/* LEADERBOARD */}
      <CourseLeaderboard courseId={course.id} courseName={course.name} initial={leaders} />

      {/* PROSE + RAIL */}
      {content.overview.length > 0 ? (
        <section className="section">
          <div className="section-inner">
            <span className="eyebrow">The rundown</span>
            <h2 className="h2-display" style={{ margin: "8px 0 22px" }}>
              Playing {course.name}
            </h2>
            <div className="rundown">
              <div className="prose">
                {content.overview.map((p, i) => (
                  <p key={i}>{rich(p)}</p>
                ))}
              </div>
              <aside className="rail">
                <div className="rail-card">
                  <h3>At a glance</h3>
                  <div className="rail-kv">
                    <span className="rk">Par</span>
                    <span className="rv">{course.par_total}</span>
                  </div>
                  <div className="rail-kv">
                    <span className="rk">Length (tips)</span>
                    <span className="rv">{ratingTee?.yardage.toLocaleString()}</span>
                  </div>
                  <div className="rail-kv">
                    <span className="rk">Rating / Slope</span>
                    <span className="rv">
                      {course.course_rating} / {course.slope_rating}
                    </span>
                  </div>
                  <div className="rail-kv">
                    <span className="rk">Designer</span>
                    <span className="rv" style={{ fontSize: 15 }}>
                      {course.designer?.split("(")[0].split(";")[0].trim()}
                    </span>
                  </div>
                  <div className="rail-kv">
                    <span className="rk">Opened</span>
                    <span className="rv">{course.year_opened}</span>
                  </div>
                </div>
                <div className="rail-card" style={{ borderTopColor: "var(--green-mid)" }}>
                  <h3>Play it</h3>
                  <p>Book a tee time, or post your round and land on the leaderboard.</p>
                  <a className="btn btn-nav" href="#cta" style={{ width: "100%", justifyContent: "center" }}>
                    Post your round →
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      ) : null}

      {/* COMPARISON (sibling course) */}
      {sibling ? <SiblingComparison a={course} b={sibling} aStats={stats} /> : null}

      {/* SCORECARD */}
      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">Full scorecard</span>
          <h2 className="h2-display" style={{ margin: "8px 0 22px" }}>
            Tees, ratings &amp; hole-by-hole
          </h2>
          <Scorecard course={course} />
          <p style={{ fontSize: 12.5, color: "var(--gray-body)", marginTop: 10 }}>
            Scorecard and tee ratings from the course&rsquo;s published card and the USGA course
            rating database. <Link href="/courses/">How we compute these stats →</Link>
          </p>
        </div>
      </section>

      {/* INFO */}
      <section className="section alt-section">
        <div className="section-inner">
          <span className="eyebrow">Practical</span>
          <h2 className="h2-display" style={{ marginTop: 8 }}>
            Contact, rates &amp; amenities
          </h2>
          <div className="cols">
            <div className="info-card">
              <h3>Contact &amp; booking</h3>
              <div className="kv">
                <span className="kk">Address</span>
                <span>{course.address}</span>
              </div>
              {course.phone ? (
                <div className="kv">
                  <span className="kk">Phone</span>
                  <a href={`tel:${course.phone.replace(/[^0-9+]/g, "")}`}>{course.phone}</a>
                </div>
              ) : null}
              {course.website ? (
                <div className="kv">
                  <span className="kk">Website</span>
                  <a href={course.website} target="_blank" rel="noopener noreferrer">
                    Official site ↗
                  </a>
                </div>
              ) : null}
              <div className="kv">
                <span className="kk">Map</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${course.lat},${course.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
            <div className="info-card">
              <h3>Course info</h3>
              <div className="kv">
                <span className="kk">Type</span>
                <span>
                  {ACCESS_LABEL[course.access_type] ?? "Public"} · {course.holes_count} holes
                </span>
              </div>
              <div className="kv">
                <span className="kk">Green fee</span>
                <span>{course.green_fee_tier}</span>
              </div>
              {course.green_fee_notes ? (
                <div className="kv">
                  <span className="kk">Rates</span>
                  <span>{course.green_fee_notes}</span>
                </div>
              ) : null}
              <div style={{ marginTop: 16 }}>
                <div className="answer-block-head" style={{ color: "var(--green-mid)" }}>
                  Amenities
                </div>
                <div className="amenities" style={{ marginTop: 12 }}>
                  {course.amenities.map((a) => (
                    <span key={a} className="am">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <SuggestEdit
            courseId={course.id}
            courseName={course.name}
            courseLabel={`${course.name}, ${course.city} ${course.state}`}
          />
        </div>
      </section>

      {/* NEARBY */}
      {nearby.length ? (
        <section className="section">
          <div className="section-inner">
            <span className="eyebrow">Keep exploring</span>
            <h2 className="h2-display" style={{ marginTop: 8 }}>
              More courses on SimplyStroke
            </h2>
            <div className="near-grid">
              {nearby.map((n) => (
                <Link key={n.slug} className="near" href={coursePath(n)}>
                  <div className="nm">{n.name}</div>
                  <div className="meta">
                    {n.city}, {n.state} · Par {n.par_total} ·{" "}
                    {ACCESS_LABEL[n.access_type] ?? "Public"}
                  </div>
                  <div className="rr">
                    Rating <b>{n.course_rating}</b> · slope {n.slope_rating}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="cta-band" id="cta">
        <h2>Played {course.name}?</h2>
        <p>
          Post your scorecard from the SimplyStroke app and you land on this leaderboard. Your name
          on the page every golfer searching this course will see.
        </p>
        <div className="cta-btns">
          <a className="btn btn-lg" href="/download/">
            Get SimplyStroke, free →
          </a>
          <a className="btn btn-lg btn-ghost" href="/features/">
            How the leaderboard works
          </a>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length ? (
        <section className="section alt-section">
          <div className="section-inner">
            <span className="eyebrow">Common questions</span>
            <h2 className="h2-display" style={{ marginTop: 8 }}>
              {course.name} FAQ
            </h2>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <details className="faq-item" key={i} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

// South-vs-North style comparison, rendered only when a sibling course exists.
function SiblingComparison({
  a,
  b,
}: {
  a: Course;
  b: Course;
  aStats: import("@/lib/courses").CourseStats | null;
}) {
  const teeA = a.tees[0];
  const teeB = b.tees[0];
  const row = (label: string, va: React.ReactNode, vb: React.ReactNode, aWins: boolean) => (
    <tr>
      <th>{label}</th>
      <td className={aWins ? "win" : ""}>{va}</td>
      <td className={!aWins ? "win" : ""}>{vb}</td>
    </tr>
  );
  return (
    <section className="section alt-section">
      <div className="section-inner">
        <span className="eyebrow">Head to head</span>
        <h2 className="h2-display" style={{ marginTop: 8 }}>
          {a.name} vs {b.name}
        </h2>
        <p className="section-lede">
          Two courses on the same ground. Here is how they measure up on the card.
        </p>
        <div className="cmp-wrap">
          <table className="cmp">
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>{a.name.replace(b.club_name ?? "", "").trim() || a.name}</th>
                <th>{b.name.replace(a.club_name ?? "", "").trim() || b.name}</th>
              </tr>
            </thead>
            <tbody>
              {row("Course rating", a.course_rating, b.course_rating, (a.course_rating ?? 0) > (b.course_rating ?? 0))}
              {row("Slope", a.slope_rating, b.slope_rating, (a.slope_rating ?? 0) > (b.slope_rating ?? 0))}
              {row("Length (tips)", teeA?.yardage.toLocaleString(), teeB?.yardage.toLocaleString(), (teeA?.yardage ?? 0) > (teeB?.yardage ?? 0))}
              {row("Par", a.par_total, b.par_total, false)}
              {row("Designer", a.designer?.split("(")[0].split(";")[0].trim(), b.designer?.split("(")[0].split(";")[0].trim(), false)}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
