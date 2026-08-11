import type { Metadata } from "next";
import Link from "next/link";
import FinalCta from "@/components/FinalCta";
import { og } from "@/lib/site";

const TITLE = "Guides: Golf Scoring, Stroke Counting and ADHD";
const DESCRIPTION =
  "Guides on golf scoring, stroke counting, working memory and ADHD, and why keeping count mid-round is harder than it looks.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/" },
  openGraph: og(TITLE, DESCRIPTION, "/guides/"),
};

// Add new guides here. Keep newest first; app/sitemap.ts reads the same slugs.
const guides = [
  {
    slug: "/guides/how-to-keep-score-in-golf/",
    title: "How to keep score in golf",
    date: "August 2026",
    readingTime: "7 min read",
    excerpt:
      "The whole task, once, cleanly: what counts as a stroke, how par works, filling in the card hole by hole, totalling the nines, and gross vs net — with a worked example scorecard.",
  },
  {
    slug: "/guides/how-to-read-a-golf-scorecard/",
    title: "How to read a golf scorecard",
    date: "August 2026",
    readingTime: "6 min read",
    excerpt:
      "Every row explained on a labelled card: par, the stroke-index (handicap) row, yardages per tee, the OUT/IN/TOT columns, and what course and slope rating actually mean.",
  },
  {
    slug: "/guides/what-is-a-good-golf-score/",
    title: "What is a good golf score?",
    date: "August 2026",
    readingTime: "6 min read",
    excerpt:
      "Breaking 100, 90 and 80 explained, what the average golfer really shoots, and good beginner and nine-hole scores — with a reference table by skill level.",
  },
  {
    slug: "/guides/golf-scorecard-symbols-and-terms/",
    title: "Golf scorecard symbols and terms",
    date: "August 2026",
    readingTime: "5 min read",
    excerpt:
      "What the circles and squares mean, and a plain-English glossary — birdie, bogey, eagle, par, gross, net, stroke index and the rest.",
  },
  {
    slug: "/guides/lost-count-of-strokes-what-to-do/",
    title: "You lost count of your strokes. Now what?",
    date: "July 2026",
    readingTime: "6 min read",
    excerpt:
      "What the Rules of Golf actually say when you don't know your score, how to reconstruct a hole honestly, and the three fixes that work because none of them ask you to try harder.",
  },
  {
    slug: "/guides/adhd-and-golf-losing-count/",
    title: "How to stop losing count mid-round when you have ADHD",
    date: "July 2026",
    readingTime: "6 min read",
    excerpt:
      "Pencils, clickers, playing partners, big golf apps: every standard fix for losing count fails ADHD golfers in the same specific way. Here's why, and what a fix has to look like to survive a real round.",
  },
];

export default function GuidesIndex() {
  return (
    <main>
      <header className="page-hero with-photo-guides">
        <div className="page-hero-inner">
          <div className="pill">Guides</div>
          <h1>
            Golf, ADHD, and the{" "}
            <br />
            <span className="accent">number you keep losing.</span>
          </h1>
          <p className="lede">
            Guides on scoring, working memory, and why the simplest job on a
            golf course is the one everybody drops.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="section-narrow">
          <div className="post-list">
            {guides.map(({ slug, title, date, readingTime, excerpt }) => (
              <article className="post-card" key={slug}>
                <div className="post-card-meta">
                  <span>{date}</span>
                  <span>·</span>
                  <span>{readingTime}</span>
                </div>
                <h2>
                  <Link href={slug}>{title}</Link>
                </h2>
                <p>{excerpt}</p>
                <Link href={slug} className="post-card-link">
                  Read the guide →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta source="guides" />
    </main>
  );
}
