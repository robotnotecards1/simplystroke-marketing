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

const TITLE = "What Is a Good Golf Score? (By Skill Level)";
const DESCRIPTION =
  "What counts as a good golf score for 18 holes, by skill level: breaking 100, 90, and 80 explained, what the average golfer really shoots, and good 9-hole scores — with a reference table.";
const PATH = "/guides/what-is-a-good-golf-score/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH, "article"),
};

const faqs: Faq[] = [
  {
    q: "What is a good golf score for 18 holes?",
    a: "For most recreational golfers, breaking 100 is the first real milestone, breaking 90 is a genuinely good score, and breaking 80 is excellent — near the level of a single-digit handicap. Those numbers are on a par-72 course: 90 is 18 over par, 100 is 28 over. A scratch golfer shoots around par (72), and a tour professional averages a few under.",
  },
  {
    q: "What does the average golfer shoot?",
    a: "Most amateurs who do not keep a formal handicap shoot somewhere in the 90s to low 100s for 18 holes. Among golfers who do maintain a handicap, the average is lower — the average male Handicap Index sits in the low-to-mid teens and the average female index in the high 20s (USGA/World Handicap System data), which corresponds to rounds in the mid-80s to mid-90s on a typical course.",
  },
  {
    q: "Is breaking 100 in golf good?",
    a: "Yes. Breaking 100 — shooting 99 or better for 18 holes — is a milestone a large share of recreational golfers never consistently reach. It works out to averaging a little over bogey (one over par) on every hole. Doing it reliably, not just once, is the mark of a solid recreational player.",
  },
  {
    q: "What is a good golf score for a beginner?",
    a: "For a true beginner, anything under about 120 for 18 holes is encouraging, and consistently breaking 108 (an average of double bogey per hole) is a strong early goal. Beginners often start by counting a maximum per hole rather than every stroke; a good early aim is simply finishing the round with a real, honest number.",
  },
  {
    q: "What is a good 9-hole golf score?",
    a: "Roughly half an 18-hole score: breaking 50 for nine holes is a good recreational score, breaking 45 is very good, and around 36 is par on a standard nine. Many casual rounds are nine holes, so these are the milestones that come up most often for newer golfers.",
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
    citations: [
      {
        name: "USGA — World Handicap System and handicap statistics",
        url: "https://www.usga.org/handicapping.html",
      },
      {
        name: "National Golf Foundation — golf participation and performance data",
        url: "https://www.ngf.org/",
      },
    ],
  }),
  faqNode(faqs),
  breadcrumbNode([
    { name: "Guides", path: "/guides/" },
    { name: "What is a good golf score", path: PATH },
  ])
);

// Sourced reference table (par 72). Bands are non-overlapping and framed to
// USGA/NGF handicap data; see the citations in the JSON-LD above.
const ROWS = [
  { level: "Tour professional", score: "66–72", par: "−6 to E", note: "Averages a few under par" },
  { level: "Scratch amateur (0 hcp)", score: "72–76", par: "E to +4", note: "Plays to par; elite amateur" },
  { level: "Single-digit handicap", score: "77–82", par: "+5 to +10", note: "Breaks 80 regularly — very good" },
  { level: "Handicap ~10–18", score: "83–90", par: "+11 to +18", note: "Above-average club golfer" },
  { level: "Handicap ~19–28 (average)", score: "91–100", par: "+19 to +28", note: "The middle of the bell curve" },
  { level: "Beginner", score: "100+", par: "+28 and up", note: "Learning — breaking 100 is the goal" },
];

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
        .sc table { border-collapse:collapse; width:100%; min-width:560px; font-variant-numeric:tabular-nums; font-size:14.5px; }
        .sc th, .sc td { border:1px solid var(--green-light,#40916C); padding:10px 12px; text-align:left; }
        .sc thead th { background:var(--green-deep,#1B4332); color:#fff; font-weight:700; }
        .sc tbody th { background:#F1EEE6; font-weight:700; white-space:nowrap; }
        .sc td.num { text-align:center; font-weight:700; color:var(--green-mid,#2D6A4F); white-space:nowrap; }
        .sc tbody tr:nth-child(even) td, .sc tbody tr:nth-child(even) th { background:#FAF9F5; }
        .sc-cap { font-size:13px; color:var(--gray-body,#6B7280); margin:0 0 24px; }
      `}</style>

      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">Golf scoring</div>
          <h1>What is a good golf score?</h1>
          <div className="post-meta">
            <span>The SimplyStroke Team</span>
            <span>·</span>
            <span>August 2026</span>
            <span>·</span>
            <span>6 min read</span>
          </div>
        </div>
      </header>

      <Breadcrumbs
        crumbs={[
          { name: "Guides", path: "/guides/" },
          { name: "What is a good golf score", path: PATH },
        ]}
      />

      <article className="prose">
        <AnswerBlock
          updated="August 2026"
          answer={
            <>
              For most recreational golfers on a par-72 course,{" "}
              <strong>breaking 100 is the first milestone</strong>,{" "}
              <strong>breaking 90 is a genuinely good score</strong>, and{" "}
              <strong>breaking 80 is excellent</strong>. A scratch golfer shoots
              around par (72); a tour professional averages a few under. &ldquo;
              Good&rdquo; is always relative to your own level.
            </>
          }
          facts={[
            <>
              <strong>Break 100 → 90 → 80</strong> are the three milestones every
              amateur chases, in that order
            </>,
            <>
              Most golfers without a handicap shoot in the{" "}
              <strong>90s to low 100s</strong>
            </>,
            <>
              Par-72 reference: 90 is <strong>+18</strong>, 100 is{" "}
              <strong>+28</strong>
            </>,
          ]}
        />

        <p>
          There is no single &ldquo;good&rdquo; golf score, because the honest
          answer depends entirely on who is holding the club. What is elite for a
          beginner is an off day for a scratch player. So the useful way to
          answer it is by <strong>milestones</strong> and by{" "}
          <strong>skill level</strong> — both below, on a standard par-72 course.
        </p>

        <h2>The three milestones: 100, 90, 80</h2>
        <p>
          Recreational golf is organised around three round numbers, chased in
          order:
        </p>
        <ul>
          <li>
            <strong>Breaking 100</strong> (shooting 99 or lower). The first big
            one. It means averaging a little over bogey — one over par — on every
            hole. A large share of casual golfers never do it consistently.
          </li>
          <li>
            <strong>Breaking 90</strong> (89 or lower). A genuinely good score
            and the mark of a solid, experienced club golfer. That is averaging
            bogey with a handful of pars mixed in.
          </li>
          <li>
            <strong>Breaking 80</strong> (79 or lower). Excellent — the territory
            of single-digit handicaps and the best amateurs at most clubs. It
            requires pars as the norm, not the exception.
          </li>
        </ul>

        <h2>What a good score looks like by level</h2>
        <p>
          Here is where typical 18-hole scores fall by skill, on a par-72 course.
          The bands follow USGA and National Golf Foundation handicap data (cited
          below) and are meant as a realistic map, not hard cut-offs:
        </p>

        <div className="sc" role="group" aria-label="Typical 18-hole golf scores by skill level, par 72">
          <table>
            <thead>
              <tr>
                <th scope="col">Level</th>
                <th scope="col">18-hole score</th>
                <th scope="col">Vs par</th>
                <th scope="col">What it means</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.level}>
                  <th scope="row">{r.level}</th>
                  <td className="num">{r.score}</td>
                  <td className="num">{r.par}</td>
                  <td>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="sc-cap">
          Par-72 course. Sources: USGA World Handicap System data and the
          National Golf Foundation (see references). Individual courses and tee
          choices shift these by several strokes.
        </p>

        <h2>What does the average golfer actually shoot?</h2>
        <p>
          Two different numbers get quoted, and both are right for different
          groups. Among golfers who keep a formal handicap, scoring is better:
          USGA/World Handicap System data puts the{" "}
          <strong>average male Handicap Index in the low-to-mid teens</strong>{" "}
          and the <strong>average female index in the high 20s</strong>, which
          works out to rounds in the mid-80s to mid-90s. Among the much larger
          group who <em>don&apos;t</em> track a handicap, scores in the{" "}
          <strong>90s to low 100s</strong> are the norm. If you shoot in the
          90s, you are squarely average — not behind.
        </p>

        <h2>Good scores for beginners and for nine holes</h2>
        <p>
          For a <strong>true beginner</strong>, the goal is not a number yet — it
          is finishing with an honest one. Anything under ~120 is encouraging,
          and consistently breaking 108 (double bogey per hole) is a strong early
          target.
        </p>
        <p>
          Plenty of rounds are only <strong>nine holes</strong>, so halve the
          milestones: <strong>par is 36</strong> on a standard nine,{" "}
          <strong>breaking 50 is a good recreational nine</strong>, and breaking
          45 is very good.
        </p>

        <h2>The score you can trust is the one you actually counted</h2>
        <p>
          A milestone only means something if the number is real. The most common
          way a &ldquo;good round&rdquo; falls apart is not a bad swing — it is a
          miscounted hole, a forgotten penalty, or a total reconstructed from
          memory on the 18th green. If you want your score to be one you can
          stand behind, count every stroke as you go. A one-tap{" "}
          <Link href="/golf-stroke-counter/">golf stroke counter</Link> keeps the
          running number honest so &ldquo;I think I broke 90&rdquo; becomes{" "}
          &ldquo;I broke 90.&rdquo; First, the basics:{" "}
          <Link href="/guides/how-to-keep-score-in-golf/">
            how to keep score in golf
          </Link>
          .
        </p>

        <div className="author-box">
          <div>
            <div className="author-box-name">The SimplyStroke Team</div>
            <p>
              We build SimplyStroke, a one-tap golf stroke counter and scorecard.{" "}
              <Link href="/about/">More about why it exists</Link>.
            </p>
          </div>
        </div>
      </article>

      <FinalCta source="guide-good-score" heading="Count it. Then you'll know." />
    </main>
  );
}
