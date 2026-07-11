import type { Metadata } from "next";
import Link from "next/link";
import WaitlistSection from "@/components/WaitlistSection";
import { og } from "@/lib/site";

const TITLE = "The SimplyStroke Blog: Golf, ADHD and Keeping Count";
const DESCRIPTION =
  "Writing on golf scoring, ADHD, working memory and why keeping count mid-round is harder than it looks.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog/" },
  openGraph: og(TITLE, DESCRIPTION, "/blog/"),
};

// Add new posts here. Keep newest first; app/sitemap.ts reads the same slugs.
const posts = [
  {
    slug: "/blog/adhd-and-golf-losing-count/",
    title: "ADHD and golf: how to stop losing count mid-round",
    date: "July 2026",
    readingTime: "5 min read",
    excerpt:
      "Losing track of your score isn't a focus problem, it's a golf design problem. Why the count evaporates somewhere between your approach shot and the green, and what actually helps.",
  },
];

export default function BlogIndex() {
  return (
    <main>
      <header className="page-hero">
        <div className="page-hero-inner">
          <div className="pill">The blog</div>
          <h1>
            Golf, ADHD, and the
            <br />
            <span className="accent">number you keep losing.</span>
          </h1>
          <p className="lede">
            Occasional writing on scoring, working memory, and why the simplest
            job on a golf course is the one everybody drops.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="section-narrow">
          <div className="post-list">
            {posts.map(({ slug, title, date, readingTime, excerpt }) => (
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
                  Read the post →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WaitlistSection source="blog" />
    </main>
  );
}
