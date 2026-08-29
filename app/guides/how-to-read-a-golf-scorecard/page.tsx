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

const TITLE = "How to Read a Golf Scorecard (With an Annotated Example)";
const DESCRIPTION =
  "Read a golf scorecard row by row: par, the stroke index (handicap) row, yardages per tee, OUT/IN/TOT columns, and course and slope rating — shown on a labelled example card.";
const PATH = "/guides/how-to-read-a-golf-scorecard/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH, "article"),
};

const faqs: Faq[] = [
  {
    q: "What do the rows on a golf scorecard mean?",
    a: "A scorecard has one column per hole and a handful of rows. The yardage rows give the length of each hole from each set of tees (one row per tee colour). The par row gives the target strokes for the hole. The handicap or stroke-index row (1–18) ranks the holes by difficulty. The remaining blank rows are where players write their scores.",
  },
  {
    q: "What is the handicap row on a scorecard?",
    a: "The handicap row — often labelled 'HCP', 'Hdcp', 'Index', or 'S.I.' — ranks the 18 holes by difficulty from 1 (hardest) to 18 (easiest). It has nothing to do with your personal handicap. It tells you which holes your handicap strokes are applied to in net and match-play scoring: a 9-handicap gets a stroke on the holes indexed 1 through 9.",
  },
  {
    q: "What do OUT, IN, and TOT mean on a scorecard?",
    a: "OUT is the total for the front nine (holes 1–9), IN is the total for the back nine (holes 10–18), and TOT is the full 18-hole total (OUT + IN). 'Out' and 'in' come from traditional links courses that ran nine holes out from the clubhouse and nine back in.",
  },
  {
    q: "What are course rating and slope rating?",
    a: "Course rating is the score a scratch (zero-handicap) golfer is expected to shoot from a given set of tees — a number like 71.2. Slope rating (55–155, with 113 average) measures how much harder the course plays for a bogey golfer than for a scratch golfer. Both are used to convert your scores into a handicap.",
  },
  {
    q: "Why are there different coloured tees on a scorecard?",
    a: "Each tee colour is a different set of starting points, and therefore a different length and difficulty for the same course. Forward tees are shorter; back tees are longer. The scorecard lists a separate yardage row and its own course and slope rating for each colour, so you pick the tees that fit your game and score against that set.",
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
    { name: "How to read a golf scorecard", path: PATH },
  ])
);

// Original asset: a labelled example card. Par 72; stroke index 1–18 (odds
// front, evens back); White-tee yardages. Score row is left blank on purpose —
// that is the row you fill in.
const PAR = [4, 4, 3, 5, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 3, 5, 4, 4];
const HCP = [7, 3, 15, 1, 11, 17, 5, 9, 13, 8, 14, 4, 12, 2, 18, 6, 10, 16];
const YDS = [385, 395, 165, 510, 380, 150, 405, 490, 370, 375, 155, 505, 385, 390, 145, 500, 380, 365];
const sum = (a: number[], s: number, e: number) =>
  a.slice(s, e).reduce((x, y) => x + y, 0);

function Nine({ start }: { start: number }) {
  const end = start + 9;
  const holes = Array.from({ length: 9 }, (_, i) => start + i);
  const grp = start === 0 ? "OUT" : "IN";
  return (
    <div className="sc" role="group" aria-label={`Scorecard holes ${start + 1} to ${end}`}>
      <table>
        <thead>
          <tr>
            <th scope="col">Hole</th>
            {holes.map((h) => (
              <th scope="col" key={h}>{h + 1}</th>
            ))}
            <th scope="col" className="grp">{grp}</th>
            {start === 9 ? <th scope="col" className="tot">TOT</th> : null}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">White yds</th>
            {YDS.slice(start, end).map((y, i) => (
              <td key={i}>{y}</td>
            ))}
            <td className="grp">{sum(YDS, start, end)}</td>
            {start === 9 ? <td className="tot">{sum(YDS, 0, 18)}</td> : null}
          </tr>
          <tr>
            <th scope="row">Par</th>
            {PAR.slice(start, end).map((p, i) => (
              <td key={i}>{p}</td>
            ))}
            <td className="grp">{sum(PAR, start, end)}</td>
            {start === 9 ? <td className="tot">{sum(PAR, 0, 18)}</td> : null}
          </tr>
          <tr>
            <th scope="row">Handicap</th>
            {HCP.slice(start, end).map((h, i) => (
              <td key={i} className="hcp">{h}</td>
            ))}
            <td className="grp">—</td>
            {start === 9 ? <td className="tot">—</td> : null}
          </tr>
          <tr>
            <th scope="row">Score</th>
            {holes.map((h) => (
              <td key={h} className="blank" aria-label="blank score box" />
            ))}
            <td className="grp blank" />
            {start === 9 ? <td className="tot blank" /> : null}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

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
        .sc table { border-collapse:collapse; width:100%; min-width:660px; font-variant-numeric:tabular-nums; font-size:14px; }
        .sc th, .sc td { border:1px solid var(--green-light,#40916C); padding:8px 6px; text-align:center; }
        .sc thead th { background:var(--green-deep,#1B4332); color:#fff; font-weight:700; }
        .sc th[scope="row"] { background:#F1EEE6; text-align:left; white-space:nowrap; font-weight:700; }
        .sc .hcp { color:var(--green-mid,#2D6A4F); font-weight:700; }
        .sc .grp { background:#E8F0EA; font-weight:800; }
        .sc .tot { background:var(--green-mid,#2D6A4F); color:#fff; font-weight:800; }
        .sc .blank { background:repeating-linear-gradient(135deg,#fff,#fff 6px,#F3F1EA 6px,#F3F1EA 7px); }
        .sc-cap { font-size:13px; color:var(--gray-body,#6B7280); margin:0 0 22px; }
        .anno { list-style:none; padding:0; margin:26px 0; display:grid; gap:12px; }
        .anno li { padding-left:0; }
        .anno b { color:var(--green-deep,#1B4332); }
      `}</style>

      <header className="post-header guide-post-header">
        <div className="post-header-inner">
          <div className="pill">Golf scoring</div>
          <h1>How to read a golf scorecard</h1>
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
          { name: "How to read a golf scorecard", path: PATH },
        ]}
      />

      <article className="prose guide-prose">
        <AnswerBlock
          updated="August 2026"
          answer={
            <>
              A golf scorecard has{" "}
              <strong>one column per hole and a few rows</strong>: yardage (one
              row per tee colour), par, and a handicap row that ranks holes 1–18
              by difficulty. The blank rows are for scores. Columns total into{" "}
              <strong>OUT</strong> (front nine), <strong>IN</strong> (back nine)
              and <strong>TOT</strong> (all 18).
            </>
          }
          facts={[
            <>
              The <strong>handicap row</strong> (1 = hardest) ranks holes — it is
              not your personal handicap
            </>,
            <>
              Each <strong>tee colour</strong> gets its own yardage row and its
              own course/slope rating
            </>,
            <>
              <strong>OUT + IN = TOT</strong>; course rating and slope convert
              scores into handicaps
            </>,
          ]}
        />

        <p>
          A scorecard looks busy, but it is just a grid: a column for every hole,
          and a short stack of rows. Once you know what each row is telling you,
          any card in the world reads the same. Here is a typical par-72 card,
          labelled — the striped row is the one you fill in:
        </p>

        <Nine start={0} />
        <Nine start={9} />
        <p className="sc-cap">
          Example card, White tees, par {sum(PAR, 0, 18)},{" "}
          {sum(YDS, 0, 18).toLocaleString()} yards. OUT {sum(PAR, 0, 9)} + IN{" "}
          {sum(PAR, 9, 18)} = {sum(PAR, 0, 18)} par.
        </p>

        <h2>Row by row</h2>
        <ul className="anno">
          <li>
            <b>Yardage rows (one per tee colour).</b> The length of each hole
            from a given set of tees. A card usually stacks several — e.g. Black,
            Blue, White, Red — from longest to shortest. Read the row that
            matches the tees you are playing.
          </li>
          <li>
            <b>Par.</b> The target strokes for each hole (3, 4, or 5), and the
            course total at the end of the row. This is what your score is
            measured against — see{" "}
            <Link href="/guides/how-to-keep-score-in-golf/">
              how to keep score in golf
            </Link>
            .
          </li>
          <li>
            <b>Handicap / stroke index (1–18).</b> Ranks the holes by difficulty,
            1 being hardest. Labelled <em>HCP</em>, <em>Hdcp</em>, <em>Index</em>,
            or <em>S.I.</em> It is <strong>not</strong> your handicap — it tells
            you <em>where</em> your handicap strokes fall. A 9-handicap gets one
            extra stroke on the holes indexed 1–9.
          </li>
          <li>
            <b>Score rows (blank).</b> Where each player writes their strokes,
            hole by hole. Most cards give two to four blank rows so a group can
            share one card.
          </li>
          <li>
            <b>OUT, IN, TOT.</b> OUT totals the front nine, IN totals the back
            nine, TOT is the 18-hole sum. Some cards add a <em>Net</em> box
            (total minus handicap) and a <em>+/–</em> box (score to par).
          </li>
        </ul>

        <h2>Course rating and slope</h2>
        <p>
          Printed near the tee boxes, usually as a pair like{" "}
          <strong>71.2 / 132</strong>:
        </p>
        <ul>
          <li>
            <strong>Course rating</strong> (the 71.2) is the score a scratch
            golfer is expected to shoot from those tees. It is par expressed more
            precisely — a course can be &ldquo;par 72&rdquo; but rated 73.5
            because it plays hard.
          </li>
          <li>
            <strong>Slope rating</strong> (the 132) measures how much harder the
            course plays for an average golfer than for a scratch golfer. The
            scale runs 55–155; 113 is the standard. Higher means less forgiving.
          </li>
        </ul>
        <p>
          You do not need either number to add up your round — they exist to turn
          your scores into a{" "}
          <Link href="/guides/what-is-a-good-golf-score/">handicap</Link>, which
          is how a 90 at one course is compared fairly to an 88 at a much harder
          one.
        </p>

        <h2>Reading it while you play</h2>
        <p>
          The card is a reference and a filing cabinet — not a live counter. It
          tells you the hole&apos;s par and difficulty before you tee off, and
          holds your number after the hole is done. What it cannot do is keep the
          running count <em>during</em> the hole, which is where scores actually
          go missing. That is the job a{" "}
          <Link href="/golf-stroke-counter/">stroke counter</Link> does: one tap
          per shot, the total kept for you, the card filled in automatically.
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

      <FinalCta source="guide-read-card" heading="Skip the pencil. Tap the ball." />
    </main>
  );
}
