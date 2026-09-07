import type { Metadata } from "next";
import Link from "next/link";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuideEngagement from "@/components/GuideEngagement";
import FinalCta from "@/components/FinalCta";
import { og } from "@/lib/site";
import {
  MIKE_ID,
  articleNode,
  breadcrumbNode,
  faqNode,
  graph,
  organizationNode,
  personNode,
  teamNode,
  websiteNode,
  type Citation,
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

const citations: Citation[] = [
  {
    name: "USGA — World Handicap System and handicap statistics",
    url: "https://www.usga.org/handicapping.html",
  },
  {
    name: "National Golf Foundation — golf participation and performance data",
    url: "https://www.ngf.org/",
  },
  {
    name: "Average Golf Handicap Index by Age and Gender",
    url: "https://www.usga.org/content/usga/home-page/handicapping/handicapping-stats.html",
  },
];

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
    q: "What is the average golf score for 18 holes?",
    a: "For golfers who keep a handicap, the average 18-hole score on a par-72 course is in the mid-80s to mid-90s. For the much larger group who do not track a handicap, the average is higher — typically in the 90s to low 100s. The average male Handicap Index is in the low-to-mid teens, which translates to rounds around 86 to 90 on a par-72 course of average difficulty.",
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
  {
    q: "Is par a good score in golf?",
    a: "Par is an excellent score. Shooting even par for 18 holes means you played at the level of a scratch golfer — a zero-handicap amateur. The vast majority of recreational golfers never shoot par for a full round. Even making par on a single hole is a good result for most players, since the average amateur scores above bogey on most holes.",
  },
  {
    q: "What is a perfect golf score?",
    a: "It depends on what you mean. Par (usually 72 for 18 holes) is the score a scratch golfer is expected to shoot. The theoretical lowest possible score is 18 — a hole-in-one on every hole — but no one has ever come close. The lowest competitive 18-hole round on record is 55, shot in a sanctioned professional event. In practice, anything under par is exceptional, and even par is rare for amateurs.",
  },
  {
    q: "Is a 12 handicap in golf good?",
    a: "A 12 handicap is above average. The average male Handicap Index is in the low-to-mid teens, so a 12 puts you ahead of most golfers who track their scores. A 12-handicap golfer typically shoots in the mid-80s on a par-72 course. It is not a single-digit handicap (which starts at 9.9 and below), but it is comfortably in the upper half of tracked golfers.",
  },
  {
    q: "Is 88 a good golf score?",
    a: "Yes. Shooting 88 on a par-72 course is 16 over par, which puts you solidly in the upper tier of recreational golfers. It is better than what most amateur golfers shoot and corresponds roughly to a Handicap Index in the mid-teens — around or slightly above average for golfers who track their scores. For context, breaking 90 is a milestone many recreational players work toward for years.",
  },
];

const jsonLd = graph(
  organizationNode,
  personNode,
  teamNode,
  websiteNode,
  articleNode({
    type: "Article",
    headline: TITLE,
    description: DESCRIPTION,
    path: PATH,
    datePublished: "2026-08-11",
    dateModified: "2026-09-07",
    citations,
    author: MIKE_ID,
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
  { level: "Tour professional", score: "66-72", par: "-6 to E", note: "Averages a few under par" },
  { level: "Scratch amateur (0 hcp)", score: "72-76", par: "E to +4", note: "Plays to par; elite amateur" },
  { level: "Single-digit handicap", score: "77-82", par: "+5 to +10", note: "Breaks 80 regularly" },
  { level: "Handicap ~10-18", score: "83-90", par: "+11 to +18", note: "Above-average club golfer" },
  { level: "Handicap ~19-28 (average)", score: "91-100", par: "+19 to +28", note: "The middle of the bell curve" },
  { level: "Beginner", score: "100+", par: "+28 and up", note: "Learning; breaking 100 is the goal" },
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
            <Link href="/about/mike-anderson/">Mike Anderson</Link>
            <span>·</span>
            <span>August 2026</span>
            <span>·</span>
            <span>8 min read</span>
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
          updated="September 2026"
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
              <strong>Break 100, then 90, then 80</strong> are the three
              milestones every amateur chases, in that order
            </>,
            <>
              Most golfers without a handicap shoot in the{" "}
              <strong>90s to low 100s</strong>
            </>,
            <>
              For nine holes, halve the milestones: <strong>breaking 50</strong>{" "}
              is a good recreational nine
            </>,
          ]}
        />

        <p>
          There is no single &ldquo;good&rdquo; golf score, because the honest
          answer depends entirely on who is holding the club. What is elite for a
          beginner is an off day for a scratch player. So the useful way to
          answer it is by <strong>milestones</strong> and by{" "}
          <strong>skill level</strong>, both on a standard par-72 course.
        </p>

        <h2>The three milestones: 100, 90, and 80</h2>
        <p>
          Recreational golf is organised around three round numbers, chased in
          order:
        </p>
        <ul>
          <li>
            <strong>Breaking 100</strong> (shooting 99 or lower). The first big
            one. It means averaging a little over bogey on every
            hole. A large share of casual golfers never do it consistently.
          </li>
          <li>
            <strong>Breaking 90</strong> (89 or lower). A genuinely good score
            and the mark of a solid, experienced club golfer. That is averaging
            bogey with a handful of pars mixed in.
          </li>
          <li>
            <strong>Breaking 80</strong> (79 or lower). Excellent. The territory
            of single-digit handicaps and the best amateurs at most clubs. It
            requires pars as the norm, not the exception.
          </li>
        </ul>
        <p>
          Each milestone is a real step up. Breaking 100 is the difference
          between a golfer who keeps score and one who sort of keeps score.
          Breaking 90 is the one most club golfers point to when they say
          &ldquo;I had a good round.&rdquo; Breaking 80 is where the
          conversation shifts from &ldquo;good golfer&rdquo; to &ldquo;serious
          golfer.&rdquo;
        </p>

        <h2>What a good score looks like by level</h2>
        <p>
          Here is where typical 18-hole scores fall by skill, on a par-72 course.
          The bands follow{" "}
          <a href="https://www.usga.org/handicapping.html" target="_blank" rel="noopener">USGA</a> and{" "}
          <a href="https://www.ngf.org/" target="_blank" rel="noopener">National Golf Foundation</a>{" "}
          handicap data and are meant as a realistic map, not hard cut-offs:
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
          Par-72 course. Sources:{" "}
          <a href="https://www.usga.org/content/usga/home-page/handicapping/handicapping-stats.html" target="_blank" rel="noopener">USGA
          handicap statistics</a> and the{" "}
          <a href="https://www.ngf.org/" target="_blank" rel="noopener">National Golf Foundation</a>.
          Individual courses and tee choices shift these by several strokes.
        </p>

        <h2>What is the average golf score for 18 holes?</h2>
        <p>
          Two different numbers get quoted, and both are right for different
          groups.
        </p>
        <p>
          Among golfers who keep a formal handicap, scoring is better:
          USGA/World Handicap System{" "}
          <a href="https://www.usga.org/content/usga/home-page/handicapping/handicapping-stats.html" target="_blank" rel="noopener">handicap
          statistics</a> put the{" "}
          <strong>average male Handicap Index in the low-to-mid teens</strong>{" "}
          and the <strong>average female index in the high 20s</strong>. On a
          par-72 course, that translates to average rounds in the mid-80s to
          mid-90s.
        </p>
        <p>
          Among the much larger group who <em>don&apos;t</em> track a handicap,
          scores in the <strong>90s to low 100s</strong> are the norm. If you
          shoot in the 90s, you are squarely average. Not behind.
        </p>
        <p>
          The average male golfer score specifically sits around{" "}
          <strong>86 to 92</strong> on a par-72 course, depending on whether you
          are looking at tracked handicaps or self-reported scores. The average
          female golfer score is higher, roughly in the <strong>mid-90s to
          low 100s</strong>, reflecting the wider spread of the female handicap
          distribution.
        </p>

        <h2>What is a good golf score for a beginner?</h2>
        <p>
          For a <strong>true beginner</strong>, the goal is not a number yet. It
          is finishing with an honest one.
        </p>
        <p>
          Anything under about <strong>120 for 18 holes</strong> is encouraging.
          Consistently breaking <strong>108</strong>, which works out to an
          average of double bogey on every hole, is a strong early target. Most
          beginners start well above that and work down over their first season.
        </p>
        <p>
          There is an honesty problem underneath the number problem: beginners
          are the most likely to lose count of their strokes mid-hole, because
          every shot requires full concentration and the count gets buried. If
          your round starts with a real number, even a high one, you are ahead
          of everyone who guessed theirs. For more on that:{" "}
          <Link href="/guides/lost-count-of-strokes-what-to-do/">
            what to do when you lose count of your strokes
          </Link>.
        </p>

        <h2>What is a good score for 9 holes?</h2>
        <p>
          A lot of recreational golf is nine holes, not eighteen, especially for
          newer golfers and anyone short on time. Halve the 18-hole milestones:
        </p>
        <ul>
          <li>
            <strong>Par is 36</strong> on a standard nine (par-72 course divided
            in half). Shooting par for nine is excellent.
          </li>
          <li>
            <strong>Breaking 50</strong> is a good recreational nine-hole score.
            It means averaging about bogey-and-a-half per hole.
          </li>
          <li>
            <strong>Breaking 45</strong> is very good, roughly bogey golf.
          </li>
          <li>
            For beginners, <strong>breaking 54</strong> (double bogey per hole)
            is a solid early target for nine.
          </li>
        </ul>
        <p>
          Nine-hole scores are often slightly better per hole than eighteen-hole
          scores, because fatigue, concentration, and the accumulation of
          penalty strokes have half the time to compound.
        </p>

        <h2>Is par a good score?</h2>
        <p>
          Par is an <strong>excellent</strong> score. It does not sound
          impressive because the word means &ldquo;standard,&rdquo; but the
          standard it refers to is the play of a scratch golfer, a
          zero-handicap amateur. The vast majority of recreational golfers never
          shoot even par for a full 18-hole round.
        </p>
        <p>
          Even making par on a <em>single hole</em> is a good result for most
          players: the average amateur scores above bogey on most holes. If you
          card more pars than bogeys in a round, you are having a very good day.
        </p>

        <h2>What is a perfect golf score?</h2>
        <p>
          It depends on what you mean by &ldquo;perfect.&rdquo;
        </p>
        <ul>
          <li>
            <strong>Par</strong> (usually 72 for 18 holes) is the score a
            scratch golfer is expected to shoot. It is the benchmark, not the
            floor.
          </li>
          <li>
            The <strong>theoretical lowest possible score is 18</strong>: a
            hole-in-one on every hole. Nobody has ever come close.
          </li>
          <li>
            The <strong>lowest competitive 18-hole round on record is 55</strong>,
            shot in a sanctioned professional event. On a major tour, the record
            is 58.
          </li>
        </ul>
        <p>
          In practice, &ldquo;perfect&rdquo; for an amateur means a round where
          every swing felt deliberate, every putt had a chance, and the score
          on the card matched what actually happened on the course. That last
          part is the one most people skip.
        </p>

        <h2>Is a 12 handicap good?</h2>
        <p>
          A <strong>12 handicap is above average</strong>. The average male
          Handicap Index in the{" "}
          <a href="https://www.usga.org/content/usga/home-page/handicapping/handicapping-stats.html" target="_blank" rel="noopener">USGA&apos;s
          data</a> sits in the low-to-mid teens, so a 12 puts you ahead of most
          golfers who track their scores.
        </p>
        <p>
          A 12-handicap golfer typically shoots in the <strong>mid-80s</strong>{" "}
          on a par-72 course. That is consistently breaking 90. It is not a
          single-digit handicap (which starts at 9.9 and below), but it is
          comfortably in the upper half of tracked golfers and well above
          average if you include everyone who plays without keeping a handicap.
        </p>

        <h2>Is 88 a good golf score?</h2>
        <p>
          Yes. Shooting <strong>88 on a par-72 course</strong> is 16 over par,
          which puts you solidly in the upper tier of recreational golfers. It
          is better than what most amateur golfers shoot and corresponds roughly
          to a Handicap Index in the mid-teens.
        </p>
        <p>
          For context, breaking 90 is a milestone many recreational players work
          toward for years. An 88 puts you two strokes inside it. That is not
          an off day for a good player. That is a good day, period.
        </p>

        <h2>The score you can trust is the one you actually counted</h2>
        <p>
          A milestone only means something if the number is real. The most common
          way a &ldquo;good round&rdquo; falls apart is not a bad swing. It is a
          miscounted hole, a forgotten penalty, or a total reconstructed from
          memory on the 18th green.
        </p>
        <p>
          If you want your score to be one you can stand behind, count every
          stroke as you go. A one-tap{" "}
          <Link href="/golf-stroke-counter/">golf stroke counter</Link> keeps the
          running number honest so &ldquo;I think I broke 90&rdquo; becomes
          &ldquo;I broke 90.&rdquo;
        </p>
        <p>
          If you lose count more than you want to admit, you are not alone, and
          concentrating harder is not the fix:{" "}
          <Link href="/guides/lost-count-of-strokes-what-to-do/">
            what to do when you lose count
          </Link>
          . And if it happens every single hole, read about{" "}
          <Link href="/adhd-golf/">
            why the count disappears and what actually helps
          </Link>
          . First, the basics:{" "}
          <Link href="/guides/how-to-keep-score-in-golf/">
            how to keep score in golf
          </Link>
          .
        </p>

        <h2>Common questions</h2>
        <div className="faq-list">
          {faqs.map(({ q, a }) => (
            <div className="faq-item" key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>

        <h2>Keep reading</h2>
        <ul>
          <li>
            <Link href="/guides/how-to-keep-score-in-golf/">
              How to keep score in golf
            </Link>{" "}
            — the basics of scoring, from strokes to handicaps.
          </li>
          <li>
            <Link href="/guides/golf-scorecard-symbols-and-terms/">
              Golf scorecard symbols and terms explained
            </Link>{" "}
            — what the markings on a scorecard mean.
          </li>
          <li>
            <Link href="/golf-stroke-counter/">
              Golf stroke counter apps
            </Link>{" "}
            — what separates a good one from a bad one.
          </li>
        </ul>


        <div className="author-box">
          <div>
            <div className="author-box-name">
              <Link href="/about/mike-anderson/">Mike Anderson</Link>
            </div>
            <div className="author-box-role">Editor, SimplyStroke</div>
            <p>
              Mike covers golf scoring, the Rules of Golf, and the intersection
              of ADHD and sport. He fact-checks every clinical claim on this
              site against the research it cites.{" "}
              <Link href="/about/mike-anderson/">More about Mike</Link>.
            </p>
          </div>
        </div>
      </article>

      <FinalCta source="guide-good-score" heading="Count it. Then you'll know." />
    </main>
  );
}
