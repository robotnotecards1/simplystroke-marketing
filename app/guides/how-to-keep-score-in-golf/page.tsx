import type { Metadata } from "next";
import Link from "next/link";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuideEngagement from "@/components/GuideEngagement";
import FinalCta from "@/components/FinalCta";
import { og } from "@/lib/site";
import {
  articleNode,
  breadcrumbNode,
  faqNode,
  graph,
  organizationNode,
  teamNode,
  websiteNode,
  type Faq,
} from "@/lib/schema";

/* PILLAR of the golf-scoring cluster. This page teaches the whole task
   end-to-end and links DOWN to the spokes (read a scorecard, good score,
   symbols & terms). Spokes link back up here. Keep the deep-dives on the
   spokes; this page stays the complete-but-broad overview. */

const TITLE = "How to Keep Score in Golf: A Beginner's Guide";
const DESCRIPTION =
  "How to keep score in golf, explained simply: what counts as a stroke, how par works, filling in a scorecard hole by hole, totalling front and back nine, and gross vs net.";
const PATH = "/guides/how-to-keep-score-in-golf/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH, "article"),
};

const faqs: Faq[] = [
  {
    q: "How do you keep score in golf?",
    a: "Count one stroke every time you swing at the ball with the intent to hit it, add any penalty strokes, and write that number in the box for the hole you just played. At the end of the round, add up all 18 holes. In standard stroke play, the lowest total wins. A par-72 course played in 90 strokes is a score of 90, or 18 over par.",
  },
  {
    q: "What counts as a stroke in golf?",
    a: "Any forward swing made with the intention of hitting the ball counts as one stroke, whether or not you make good contact — a complete air-shot still counts. Penalty strokes (for a lost ball, out of bounds, or a water hazard) are added on top. A practice swing where you clearly did not intend to hit the ball does not count.",
  },
  {
    q: "What does 'par' mean in golf?",
    a: "Par is the number of strokes an expert golfer is expected to need on a hole, and it is printed on the scorecard for every hole. Most holes are par 3, 4, or 5. Add up the par for all 18 holes and you get the course par, which is usually 70 to 72. Your score is compared to that number — for example, 85 on a par-72 course is 13 over par.",
  },
  {
    q: "What is the difference between gross and net score?",
    a: "Your gross score is the raw number of strokes you actually took. Your net score is your gross score minus your handicap, which levels the field so players of different abilities can compete fairly. If you shoot 90 (gross) and your handicap is 18, your net score is 72.",
  },
  {
    q: "How do you count front nine and back nine?",
    a: "A scorecard splits the round in two. The front nine (holes 1–9) totals into a box labelled OUT, the back nine (holes 10–18) totals into a box labelled IN, and OUT plus IN gives your 18-hole total, labelled TOT. The names come from older courses that ran out away from the clubhouse and back in.",
  },
];

const jsonLd = graph(
  organizationNode,
  teamNode,
  websiteNode,
  articleNode({
    type: "Article",
    headline: TITLE,
    description: DESCRIPTION,
    path: PATH,
    datePublished: "2026-08-11",
    dateModified: "2026-08-11",
  }),
  faqNode(faqs),
  breadcrumbNode([
    { name: "Guides", path: "/guides/" },
    { name: "How to keep score in golf", path: PATH },
  ])
);

// Original asset: a filled-in par-72 example. Front 36 / back 36; a 90 round
// (18 over). OUT/IN/TOT are the real sums of the row.
const PAR = [4, 4, 3, 5, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 3, 5, 4, 4];
const SCORE = [5, 5, 4, 6, 5, 4, 5, 6, 5, 5, 4, 6, 5, 5, 4, 6, 5, 5];
const sum = (a: number[], s: number, e: number) =>
  a.slice(s, e).reduce((x, y) => x + y, 0);

export default function Post() {
  return (
    <main>
      <GuideEngagement />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        .sc { width:100%; overflow-x:auto; margin:8px 0 6px; }
        .sc table { border-collapse:collapse; width:100%; min-width:640px; font-variant-numeric:tabular-nums; font-size:14px; }
        .sc th, .sc td { border:1px solid var(--green-light,#40916C); padding:8px 6px; text-align:center; }
        .sc thead th { background:var(--green-deep,#1B4332); color:#fff; font-weight:700; }
        .sc th[scope="row"] { background:#F1EEE6; text-align:left; white-space:nowrap; font-weight:700; }
        .sc .grp { background:#E8F0EA; font-weight:800; }
        .sc .tot { background:var(--green-mid,#2D6A4F); color:#fff; font-weight:800; }
        .sc .over { color:#B0413E; font-weight:700; }
        .sc-cap { font-size:13px; color:var(--gray-body,#6B7280); margin:0 0 26px; }
      `}</style>

      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">Golf scoring</div>
          <h1>How to keep score in golf</h1>
          <div className="post-meta">
            <span>The SimplyStroke Team</span>
            <span>·</span>
            <span>August 2026</span>
            <span>·</span>
            <span>7 min read</span>
          </div>
        </div>
      </header>

      <Breadcrumbs
        crumbs={[
          { name: "Guides", path: "/guides/" },
          { name: "How to keep score in golf", path: PATH },
        ]}
      />

      <article className="prose">
        <AnswerBlock
          updated="August 2026"
          answer={
            <>
              To keep score in golf,{" "}
              <strong>
                count one stroke for every swing plus any penalty strokes
              </strong>
              , and write that number in the box for the hole you just played.
              Add up all 18 holes for your total. On a par-72 course, a round of
              90 is a score of 90 — eighteen over par.
            </>
          }
          facts={[
            <>
              A <strong>stroke</strong> is any swing meant to hit the ball, plus
              penalties — an air-shot still counts
            </>,
            <>
              <strong>Par</strong> is the expected strokes for a hole; add all
              18 for the course par (usually 70–72)
            </>,
            <>
              The card totals the <strong>front nine (OUT)</strong> and{" "}
              <strong>back nine (IN)</strong> into your <strong>18-hole total</strong>
            </>,
          ]}
        />

        <p>
          Keeping score in golf is genuinely simple: you count your swings. The
          reason it feels harder than that is everything happening around the
          counting — walking, club choice, conversation, hunting for a ball in
          the trees — which is where the number tends to slip. This guide covers
          the whole task once, cleanly, so the mechanics are never the part that
          trips you up.
        </p>

        <h2>Step 1: Count every stroke</h2>
        <p>
          One <strong>stroke</strong> is any forward swing you make{" "}
          <em>intending</em> to hit the ball. It counts whether or not you make
          good contact — a complete swing-and-miss (an{" "}
          <strong>air shot</strong>) still counts as a stroke, because you
          intended to hit it. A practice swing where you clearly were not trying
          to strike the ball does not count.
        </p>
        <p>
          On top of your swings, you add <strong>penalty strokes</strong>. The
          common ones: one stroke for an unplayable lie or a ball in a water
          (penalty) area, and stroke-and-distance for a ball hit out of bounds
          or lost. So a hole where you swung five times and took one penalty is
          a <strong>6</strong>.
        </p>
        <div className="callout">
          <p>
            <strong>The whole job is not addition — it is memory.</strong> The
            arithmetic is trivial; the hard part is arriving at the green still
            knowing whether that putt is for a 4 or a 5. That is a working-memory
            task, and it is the one worth solving.{" "}
            <Link href="/guides/lost-count-of-strokes-what-to-do/">
              What to do when you lose count
            </Link>
            .
          </p>
        </div>

        <h2>Step 2: Know the par for the hole</h2>
        <p>
          <strong>Par</strong> is the number of strokes an expert golfer is
          expected to take on a hole, assuming two putts once on the green. It
          is printed on the scorecard for every hole. Almost every hole is a{" "}
          <strong>par 3</strong> (short), <strong>par 4</strong> (medium), or{" "}
          <strong>par 5</strong> (long). Add the par of all 18 holes and you get
          the <strong>course par</strong>, typically 70 to 72.
        </p>
        <p>
          Your score is read <em>against</em> par. Beat a hole&apos;s par and
          you are under; take more and you are over. Those results have names —
          birdie, bogey, and the rest — with their own shorthand on the card,
          covered in{" "}
          <Link href="/guides/golf-scorecard-symbols-and-terms/">
            golf scorecard symbols and terms
          </Link>
          .
        </p>

        <h2>Step 3: Fill in the card, hole by hole</h2>
        <p>
          After each hole, write your stroke total in that hole&apos;s box. Do
          it before you tee off on the next hole, while the number is still
          fresh — the walk to the next tee is exactly where scores get lost.
          Here is a full round on a par-72 course, written the way a card fills
          in:
        </p>

        <div className="sc" role="group" aria-label="Example filled-in golf scorecard, par 72, total 90">
          <table>
            <thead>
              <tr>
                <th scope="col">Hole</th>
                {Array.from({ length: 9 }, (_, i) => (
                  <th scope="col" key={i}>{i + 1}</th>
                ))}
                <th scope="col" className="grp">OUT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Par</th>
                {PAR.slice(0, 9).map((p, i) => (
                  <td key={i}>{p}</td>
                ))}
                <td className="grp">{sum(PAR, 0, 9)}</td>
              </tr>
              <tr>
                <th scope="row">Score</th>
                {SCORE.slice(0, 9).map((s, i) => (
                  <td key={i}>{s}</td>
                ))}
                <td className="grp">{sum(SCORE, 0, 9)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="sc" role="group" aria-label="Back nine and totals">
          <table>
            <thead>
              <tr>
                <th scope="col">Hole</th>
                {Array.from({ length: 9 }, (_, i) => (
                  <th scope="col" key={i}>{i + 10}</th>
                ))}
                <th scope="col" className="grp">IN</th>
                <th scope="col" className="tot">TOT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Par</th>
                {PAR.slice(9, 18).map((p, i) => (
                  <td key={i}>{p}</td>
                ))}
                <td className="grp">{sum(PAR, 9, 18)}</td>
                <td className="tot">{sum(PAR, 0, 18)}</td>
              </tr>
              <tr>
                <th scope="row">Score</th>
                {SCORE.slice(9, 18).map((s, i) => (
                  <td key={i}>{s}</td>
                ))}
                <td className="grp">{sum(SCORE, 9, 18)}</td>
                <td className="tot">{sum(SCORE, 0, 18)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="sc-cap">
          Front nine (OUT) {sum(SCORE, 0, 9)} + back nine (IN) {sum(SCORE, 9, 18)} ={" "}
          <strong>{sum(SCORE, 0, 18)}</strong> on a par-{sum(PAR, 0, 18)} course —{" "}
          <span className="over">
            {sum(SCORE, 0, 18) - sum(PAR, 0, 18)} over par
          </span>
          . Learn to read every row of a real card in{" "}
          <Link href="/guides/how-to-read-a-golf-scorecard/">
            how to read a golf scorecard
          </Link>
          .
        </p>

        <h2>Step 4: Total the nines, then the round</h2>
        <p>
          A scorecard is split into two halves. The <strong>front nine</strong>{" "}
          (holes 1–9) adds up into a column marked <strong>OUT</strong>; the{" "}
          <strong>back nine</strong> (holes 10–18) adds up into{" "}
          <strong>IN</strong>. OUT plus IN is your <strong>18-hole total</strong>,
          usually marked <strong>TOT</strong>. (The names are literal: old links
          courses ran nine holes <em>out</em> from the clubhouse and nine back{" "}
          <em>in</em>.)
        </p>

        <h2>Gross, net, and your handicap</h2>
        <p>
          The total you just added is your <strong>gross score</strong> — every
          stroke you actually took. Your <strong>net score</strong> is that
          number minus your <strong>handicap</strong>, a figure that represents
          how many strokes above par you typically play. Net scoring lets a
          beginner and a low-handicapper compete fairly in the same group.
        </p>
        <p>
          Shoot 90 gross with an 18 handicap and your net is 72. What actually
          counts as a good number, gross or net, is its own question —{" "}
          <Link href="/guides/what-is-a-good-golf-score/">
            what is a good golf score?
          </Link>
        </p>

        <h2>Stroke play, match play, and Stableford</h2>
        <p>
          Everything above is <strong>stroke play</strong> — total strokes, lowest
          wins — which is how most casual rounds and most professional golf are
          scored. Two other formats you will meet:
        </p>
        <ul>
          <li>
            <strong>Match play:</strong> you play hole by hole against one
            opponent, and whoever takes fewer strokes wins that hole. The score
            is holes up/down, not a total — &ldquo;3 and 2&rdquo; means three
            holes ahead with two to play.
          </li>
          <li>
            <strong>Stableford:</strong> you earn points based on your score
            relative to par on each hole (for example, 2 points for par, 3 for a
            birdie), and the highest points total wins. A blow-up hole costs you
            points, not your whole round.
          </li>
        </ul>

        <h2>The easiest way to never lose the count</h2>
        <p>
          The mechanics on this page are simple. Keeping the running number in
          your head for four hours is the part that fails, which is why a
          purpose-built <Link href="/golf-stroke-counter/">golf stroke counter</Link>{" "}
          exists: one tap per swing, the total kept for you, a finished card at
          the end — no pencil, no arithmetic on the walk in. SimplyStroke does
          exactly that, and core scoring is free.
        </p>

        <div className="author-box">
          <div>
            <div className="author-box-name">The SimplyStroke Team</div>
            <p>
              We build SimplyStroke, a one-tap golf stroke counter and scorecard.
              We got tired of reconstructing our own scores on the walk to the
              next tee. <Link href="/about/">More about why it exists</Link>.
            </p>
          </div>
        </div>
      </article>

      <FinalCta source="guide-keep-score" heading="Let the app keep the count." />
    </main>
  );
}
