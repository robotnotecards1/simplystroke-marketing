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
    category: "Learn the card",
    excerpt:
      "The whole task, once, cleanly: what counts as a stroke, how par works, filling in the card hole by hole, totalling the nines, and gross vs net — with a worked example scorecard.",
  },
  {
    slug: "/guides/how-to-read-a-golf-scorecard/",
    title: "How to read a golf scorecard",
    date: "August 2026",
    readingTime: "6 min read",
    category: "Learn the card",
    excerpt:
      "Every row explained on a labelled card: par, the stroke-index (handicap) row, yardages per tee, the OUT/IN/TOT columns, and what course and slope rating actually mean.",
  },
  {
    slug: "/guides/what-is-a-good-golf-score/",
    title: "What is a good golf score?",
    date: "August 2026",
    readingTime: "6 min read",
    category: "Know your number",
    excerpt:
      "Breaking 100, 90 and 80 explained, what the average golfer really shoots, and good beginner and nine-hole scores — with a reference table by skill level.",
  },
  {
    slug: "/guides/golf-scorecard-symbols-and-terms/",
    title: "Golf scorecard symbols and terms",
    date: "August 2026",
    readingTime: "5 min read",
    category: "Learn the card",
    excerpt:
      "What the circles and squares mean, and a plain-English glossary — birdie, bogey, eagle, par, gross, net, stroke index and the rest.",
  },
  {
    slug: "/guides/lost-count-of-strokes-what-to-do/",
    title: "You lost count of your strokes. Now what?",
    date: "July 2026",
    readingTime: "6 min read",
    category: "Keep the count",
    excerpt:
      "What the Rules of Golf actually say when you don't know your score, how to reconstruct a hole honestly, and the three fixes that work because none of them ask you to try harder.",
  },
  {
    slug: "/guides/adhd-and-golf-losing-count/",
    title: "How to stop losing count mid-round when you have ADHD",
    date: "July 2026",
    readingTime: "6 min read",
    category: "Keep the count",
    excerpt:
      "Pencils, clickers, playing partners, big golf apps: every standard fix for losing count fails ADHD golfers in the same specific way. Here's why, and what a fix has to look like to survive a real round.",
  },
];

const guideGroups = [
  {
    title: "Learn the card",
    note: "The scoring basics, without the clubhouse lecture.",
    guides: guides.filter((guide) => guide.category === "Learn the card"),
  },
  {
    title: "Know your number",
    note: "What the total means once the pencils are down.",
    guides: guides.filter((guide) => guide.category === "Know your number"),
  },
  {
    title: "Keep the count",
    note: "Practical help for the number that disappears mid-hole.",
    guides: guides.filter((guide) => guide.category === "Keep the count"),
  },
];

export default function GuidesIndex() {
  return (
    <main className="guides-index">
      <header className="guides-hero">
        <div className="guides-hero-inner">
          <div className="guides-hero-copy">
            <div className="guides-kicker">The SimplyStroke field guide</div>
            <h1>
              Know the card.
              <span>Keep your head in the game.</span>
            </h1>
            <p>
              Plain-English golf scoring for people who would rather play the
              next shot than do math on the walk to it.
            </p>
            <Link
              href="/guides/how-to-keep-score-in-golf/"
              className="guides-start-link"
            >
              Start with the scoring basics <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="guides-scorecard" aria-hidden="true">
            <div className="guides-scorecard-top">
              <span>Field notes</span>
              <span>01 / 06</span>
            </div>
            <div className="guides-scorecard-row">
              <b>01</b>
              <span>Count the shot</span>
              <i>✓</i>
            </div>
            <div className="guides-scorecard-row">
              <b>02</b>
              <span>Mark the hole</span>
              <i>✓</i>
            </div>
            <div className="guides-scorecard-row guides-scorecard-row-active">
              <b>03</b>
              <span>Forget the math</span>
              <i>•</i>
            </div>
            <div className="guides-scorecard-green">
              <span className="guides-scorecard-hole" />
              <span className="guides-scorecard-pin" />
            </div>
          </div>
        </div>
      </header>

      <section className="guides-library" aria-labelledby="guide-library-title">
        <div className="guides-library-inner">
          <div className="guides-library-intro">
            <div>
              <span className="guides-library-count">Six useful reads</span>
              <h2 id="guide-library-title">Pick the question in your bag.</h2>
            </div>
            <p>
              Start with the card if you are new. Jump straight to losing count
              if that is the part of golf that keeps following you around.
            </p>
          </div>

          <div className="guides-groups">
            {guideGroups.map((group) => (
              <section className="guides-group" key={group.title}>
                <header className="guides-group-header">
                  <h3>{group.title}</h3>
                  <p>{group.note}</p>
                </header>

                <div className="guides-rows">
                  {group.guides.map(
                    ({ slug, title, date, readingTime, excerpt }, index) => (
                      <article className="guides-row" key={slug}>
                        <div className="guides-row-number">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="guides-row-copy">
                          <div className="guides-row-meta">
                            <span>{date}</span>
                            <span aria-hidden="true">·</span>
                            <span>{readingTime}</span>
                          </div>
                          <h4>
                            <Link href={slug}>{title}</Link>
                          </h4>
                          <p>{excerpt}</p>
                        </div>
                        <Link
                          href={slug}
                          className="guides-row-link"
                          aria-label={`Read ${title}`}
                        >
                          <span>Read</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </article>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <FinalCta source="guides" />
    </main>
  );
}
