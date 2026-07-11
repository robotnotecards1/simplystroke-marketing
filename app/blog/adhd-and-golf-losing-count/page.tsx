import type { Metadata } from "next";
import Link from "next/link";
import { og, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ADHD and Golf: How to Stop Losing Count Mid-Round",
  description:
    "Losing track of your score isn't a focus problem, it's a golf design problem. Here's why ADHD brains lose the count mid-round, and what actually helps.",
  alternates: { canonical: "/blog/adhd-and-golf-losing-count/" },
  openGraph: og(
    "ADHD and Golf: How to Stop Losing Count Mid-Round",
    "Losing track of your score isn't a focus problem, it's a golf design problem. Here's why ADHD brains lose the count mid-round, and what actually helps.",
    "/blog/adhd-and-golf-losing-count/",
    "article"
  ),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "ADHD and Golf: How to Stop Losing Count Mid-Round",
  description:
    "Losing track of your score isn't a focus problem, it's a golf design problem. Here's why ADHD brains lose the count mid-round, and what actually helps.",
  datePublished: "2026-07-08",
  dateModified: "2026-07-08",
  author: { "@type": "Organization", name: "SimplyStroke" },
  publisher: { "@type": "Organization", name: "SimplyStroke" },
  image: `${SITE_URL}/og-image.jpg`,
  mainEntityOfPage: `${SITE_URL}/blog/adhd-and-golf-losing-count/`,
};

export default function Post() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">ADHD &amp; golf</div>
          <h1>ADHD and golf: how to stop losing count mid-round</h1>
          <div className="post-meta">
            <span>The SimplyStroke Team</span>
            <span>·</span>
            <span>July 2026</span>
            <span>·</span>
            <span>5 min read</span>
          </div>
        </div>
      </header>

      <article className="prose">
        <p>
          You hit a genuinely good drive. You spend the walk to your ball
          replaying it, then wondering if your playing partner saw it, then
          wondering whether you closed the garage door this morning. You chip
          on, two-putt, pick the ball out of the cup, and realize you have
          no idea what you just shot.
        </p>
        <p>
          Four? Five? You do the forensic reconstruction. Driver, the chip…
          wait, was there a punch-out? By the next tee box you&apos;ve
          settled on &ldquo;probably five&rdquo; and quietly resolved to pay
          more attention, which lasts exactly one hole.
        </p>
        <p>
          If that&apos;s you every single round: you&apos;re not careless,
          and you don&apos;t need another lecture about focus.{" "}
          <strong>
            Losing the count isn&apos;t a focus problem. It&apos;s a golf
            design problem.
          </strong>
        </p>

        <h2>What golf actually asks of your working memory</h2>
        <p>
          Strip a hole of golf down to its cognitive parts and it&apos;s a
          strange assignment. Over ten to fifteen minutes you are asked to:
          judge distance and wind, pick a club, execute a swing, track a small
          ball across a large sky, walk several hundred yards while holding a
          conversation, find the ball, replan, and swing again, several times
          over. And underneath all of it, golf adds one quiet background task:{" "}
          <strong>hold a number in your head and increment it, without ever
          being reminded to.</strong>
        </p>
        <p>
          That background task lives in working memory, the mental
          sticky-note where you hold &ldquo;current stroke: 4&rdquo; while
          doing everything else. Working memory is limited in
          everyone. In ADHD brains, it&apos;s the first thing to get evicted
          the moment something more interesting shows up. And a golf course
          is an all-you-can-eat buffet of more interesting things: hawks,
          water hazards, your backswing thoughts, the 2019 round where you
          almost aced the seventh.
        </p>
        <p>
          So the number doesn&apos;t get &ldquo;forgotten&rdquo; so much as
          overwritten. It was never going to survive the walk to the green.
        </p>

        <h2>Why the usual fixes don&apos;t stick</h2>
        <p>
          Every golfer who loses count has been offered the same three fixes,
          and they all fail the same way:
        </p>
        <ul>
          <li>
            <strong>&ldquo;Just use the scorecard and pencil.&rdquo;</strong>{" "}
            The scorecard records the hole <em>after</em>{" "}
            it&apos;s over. It
            does nothing for the count during the hole, which is where the
            number goes missing. And remembering to write things down is
            itself a working-memory task. A boring one.
          </li>
          <li>
            <strong>Clickers and bead counters.</strong>{" "}
            Closer! They move
            the count out of your head, which is the right idea. But
            they&apos;re one more thing to buy, carry, clip on and remember
            to click. A tiny commitment device with all the failure modes of
            the pencil.
          </li>
          <li>
            <strong>Full-featured golf apps.</strong> GPS overlays, handicap
            tracking, shot dispersion charts, ads, sign-in screens. For a
            brain that struggles to hold one number, an app with forty
            buttons is a distraction engine. By the third hole the phone
            stays in the bag.
          </li>
        </ul>
        <p>
          The pattern: anything that adds steps, screens or things-to-remember
          will eventually lose to the hawk, the hazard and the garage door.
        </p>

        <h2>What actually helps: externalize the count, cost-free</h2>
        <p>
          The fix that works is the one ADHD-friendly design always lands on:{" "}
          <strong>move the task out of your head and make the capture
          effortless.</strong>{" "}
          Don&apos;t hold the number. Put it somewhere
          that can&apos;t get distracted, with a recording action so small it
          survives being uninteresting.
        </p>
        <p>
          Concretely, for stroke counting, that means: one action per swing
          (not per hole), a target you can hit without looking, instant
          feedback that it registered, an undo for honest mistakes, and
          absolutely nothing else competing for your attention while you do
          it.
        </p>
        <p>
          That&apos;s the entire design brief behind{" "}
          <Link href="/adhd-golf/">SimplyStroke, the golf app for ADHD</Link>.
          The whole screen is one giant golf ball. Swing, tap, forget, move
          on. The app holds the stroke count, the running total and the
          vs-par, and at the end it hands you a finished scorecard with the
          math already done. There are no menus to wander into mid-round,
          because the middle of your round is exactly when wandering happens.
        </p>

        <div className="callout">
          <p>
            <strong>The short version:</strong> stop trying to remember the
            number. You were never supposed to be the scorekeeper. Your job
            is the shot. Let something else hold the count.
          </p>
        </div>

        <h2>Until launch day</h2>
        <p>
          SimplyStroke launches in 2026 on iPhone, Android and Apple Watch:
          free, offline-friendly, and ad-free. Until then, the honest interim
          advice: count out loud on every swing (externalizing beats
          rehearsing), settle the number with your playing partner{" "}
          <em>before</em> anyone putts, and forgive yourself the rest. The
          garage door was fine, by the way.
        </p>
        <p className="post-cta">
          <Link href="/download/" className="btn btn-fold">
            Join the SimplyStroke waitlist →
          </Link>
        </p>
      </article>
    </main>
  );
}
