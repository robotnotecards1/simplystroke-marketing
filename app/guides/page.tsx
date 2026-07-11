import type { Metadata } from "next";
import Link from "next/link";
import WaitlistSection from "@/components/WaitlistSection";
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
            Golf, ADHD, and the
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

      <WaitlistSection source="guides" />
    </main>
  );
}
