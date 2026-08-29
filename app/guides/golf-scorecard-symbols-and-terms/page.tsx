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

const TITLE = "Golf Scorecard Symbols and Terms Explained";
const DESCRIPTION =
  "What the circles and squares on a golf scorecard mean, plus a plain-English glossary of scoring terms — birdie, bogey, eagle, par, gross, net, stroke index and more.";
const PATH = "/guides/golf-scorecard-symbols-and-terms/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH, "article"),
};

const faqs: Faq[] = [
  {
    q: "What do circles and squares mean on a golf scorecard?",
    a: "They mark your score relative to par. A circle around the number means under par — a single circle is a birdie (one under), a double circle is an eagle (two under). A square means over par — a single square is a bogey (one over), a double square is a double bogey or worse. A score written with no shape is a par. The system is a convention, not a rule, so not every card or player uses it.",
  },
  {
    q: "What is a birdie, bogey, and eagle?",
    a: "They are names for your score on a hole relative to par. A birdie is one under par, an eagle is two under, and an albatross (or double eagle) is three under. Going the other way, a bogey is one over par, a double bogey is two over, and a triple bogey is three over. On a par-4 hole, a 3 is a birdie, a 4 is par, and a 5 is a bogey.",
  },
  {
    q: "What is the difference between gross score and net score?",
    a: "Gross score is the total number of strokes you actually took. Net score is your gross score minus your course handicap, which adjusts for skill so players of different abilities can compete fairly. A gross 92 with a handicap of 20 is a net 72.",
  },
  {
    q: "What is a stroke index on a golf scorecard?",
    a: "The stroke index (also called the handicap row) ranks the 18 holes by difficulty from 1, the hardest, to 18, the easiest. It determines which holes your handicap strokes are applied to in net and match play. It is not the same as your personal handicap.",
  },
  {
    q: "What is a hole in one called?",
    a: "A hole in one — putting the ball in the hole with your first stroke — is called an ace. On a par-3 it is also a birdie in scoring terms (two under is impossible to write another way), and on the rare par-4 ace it counts as an eagle. Aces are almost always on par-3 holes.",
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
    { name: "Scorecard symbols and terms", path: PATH },
  ])
);

// Score names, shown against a par-4 hole so the example number is concrete.
const NAMES = [
  { name: "Albatross (double eagle)", rel: "3 under", ex: "on a par 5, a 2", mark: "rare — circled" },
  { name: "Eagle", rel: "2 under", ex: "a 2", mark: "double circle" },
  { name: "Birdie", rel: "1 under", ex: "a 3", mark: "circle" },
  { name: "Par", rel: "even", ex: "a 4", mark: "no mark" },
  { name: "Bogey", rel: "1 over", ex: "a 5", mark: "square" },
  { name: "Double bogey", rel: "2 over", ex: "a 6", mark: "double square" },
  { name: "Triple bogey", rel: "3 over", ex: "a 7", mark: "double square" },
];

const GLOSSARY = [
  ["Par", "The strokes an expert is expected to need on a hole (3, 4, or 5)."],
  ["Ace", "A hole in one — the ball in the hole in a single stroke."],
  ["Gross score", "The raw total of every stroke you took."],
  ["Net score", "Gross score minus your course handicap."],
  ["Handicap", "A number representing how many strokes over par you typically play, used to level the field."],
  ["Stroke index", "The row ranking holes 1–18 by difficulty; sets where handicap strokes fall."],
  ["Scratch golfer", "A player with a 0 handicap — shoots roughly par."],
  ["Bogey golfer", "A player who averages about one over par per hole (~90 on a par 72)."],
  ["OUT / IN / TOT", "Front-nine total, back-nine total, and full 18-hole total."],
  ["Gimme", "A short putt conceded by playing partners so you don't have to hole it (casual play only)."],
  ["Mulligan", "An informal do-over shot, not allowed under the Rules of Golf."],
  ["Up and down", "Holing out in two shots from around the green — a chip (or bunker shot) and a putt."],
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
        .leg { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:16px; margin:26px 0; }
        .leg-item { display:flex; flex-direction:column; align-items:center; gap:10px; text-align:center; background:#FAF9F5; border:1px solid rgba(27,67,50,.12); padding:18px 10px; }
        .leg-item small { color:var(--gray-body,#6B7280); font-size:12.5px; }
        .leg-item b { color:var(--green-deep,#1B4332); font-size:15px; }
        .mark { display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px; font-weight:800; font-size:18px; font-variant-numeric:tabular-nums; color:var(--green-deep,#1B4332); background:#fff; }
        .mark.birdie { border:2px solid var(--green-mid,#2D6A4F); border-radius:50%; }
        .mark.eagle { border:2px solid var(--green-mid,#2D6A4F); border-radius:50%; box-shadow:0 0 0 3px #fff,0 0 0 5px var(--green-mid,#2D6A4F); }
        .mark.bogey { border:2px solid #B0413E; }
        .mark.dbogey { border:2px solid #B0413E; box-shadow:0 0 0 3px #fff,0 0 0 5px #B0413E; }
        .mark.par { border:2px dashed rgba(27,67,50,.25); }
        .sc { width:100%; overflow-x:auto; margin:8px 0 6px; }
        .sc table { border-collapse:collapse; width:100%; min-width:520px; font-size:14.5px; }
        .sc th, .sc td { border:1px solid var(--green-light,#40916C); padding:9px 12px; text-align:left; }
        .sc thead th { background:var(--green-deep,#1B4332); color:#fff; font-weight:700; }
        .sc tbody th { background:#F1EEE6; font-weight:700; white-space:nowrap; }
        .sc tbody tr:nth-child(even) td, .sc tbody tr:nth-child(even) th { background:#FAF9F5; }
        .gloss { display:grid; gap:0; margin:24px 0; border:1px solid rgba(27,67,50,.14); }
        .gloss div { display:grid; grid-template-columns:170px 1fr; gap:16px; padding:12px 16px; border-top:1px solid rgba(27,67,50,.1); }
        .gloss div:first-child { border-top:0; }
        .gloss dt { font-weight:800; color:var(--green-deep,#1B4332); margin:0; }
        .gloss dd { margin:0; color:var(--gray-dark,#4B5563); }
        @media (max-width:560px){ .gloss div { grid-template-columns:1fr; gap:2px; } }
      `}</style>

      <header className="post-header guide-post-header">
        <div className="post-header-inner">
          <div className="pill">Golf scoring</div>
          <h1>Golf scorecard symbols and terms</h1>
          <div className="post-meta">
            <span>The SimplyStroke Team</span>
            <span>·</span>
            <span>August 2026</span>
            <span>·</span>
            <span>5 min read</span>
          </div>
        </div>
      </header>

      <Breadcrumbs
        crumbs={[
          { name: "Guides", path: "/guides/" },
          { name: "Scorecard symbols and terms", path: PATH },
        ]}
      />

      <article className="prose guide-prose">
        <AnswerBlock
          updated="August 2026"
          answer={
            <>
              On a golf scorecard,{" "}
              <strong>a circle around a number means under par</strong> (one
              circle = birdie, two = eagle) and{" "}
              <strong>a square means over par</strong> (one square = bogey, two =
              double bogey). A number with no shape is a par. The shapes are a
              common convention for reading a card at a glance, not an official
              rule.
            </>
          }
          facts={[
            <>
              <strong>Circle = under par</strong>, <strong>square = over par</strong>,
              nothing = par
            </>,
            <>
              Names go <strong>eagle · birdie · par · bogey · double bogey</strong>{" "}
              (−2 to +2)
            </>,
            <>
              An <strong>ace</strong> is a hole in one; <strong>net</strong> score
              is gross minus handicap
            </>,
          ]}
        />

        <p>
          Two things confuse people about a scorecard: the little{" "}
          <strong>shapes</strong> drawn around some numbers, and the{" "}
          <strong>vocabulary</strong> golfers use for those numbers. Both are
          simple once mapped. Here they are.
        </p>

        <h2>The shapes: circles and squares</h2>
        <p>
          The marking system encodes your score relative to par as a shape, so a
          card can be read at a glance. Below, each mark is shown on a{" "}
          <strong>par-4 hole</strong>:
        </p>

        <div className="leg" role="group" aria-label="Golf scorecard marking legend, examples on a par 4">
          <div className="leg-item">
            <span className="mark eagle" aria-hidden="true">2</span>
            <b>Eagle</b>
            <small>2 under · double circle</small>
          </div>
          <div className="leg-item">
            <span className="mark birdie" aria-hidden="true">3</span>
            <b>Birdie</b>
            <small>1 under · circle</small>
          </div>
          <div className="leg-item">
            <span className="mark par" aria-hidden="true">4</span>
            <b>Par</b>
            <small>even · no mark</small>
          </div>
          <div className="leg-item">
            <span className="mark bogey" aria-hidden="true">5</span>
            <b>Bogey</b>
            <small>1 over · square</small>
          </div>
          <div className="leg-item">
            <span className="mark dbogey" aria-hidden="true">6</span>
            <b>Double bogey</b>
            <small>2 over · double square</small>
          </div>
        </div>
        <p>
          You will see this most on TV leaderboards and on the cards of players
          who track their game closely. It is a <em>convention</em>, not a rule —
          plenty of golfers just write the number.
        </p>

        <h2>The names for every score</h2>
        <p>
          Each result relative to par has a name. Examples are shown against a
          par-4 hole (except the albatross, which needs a par 5):
        </p>
        <div className="sc" role="group" aria-label="Golf score names relative to par">
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Relative to par</th>
                <th scope="col">Example</th>
                <th scope="col">Usual mark</th>
              </tr>
            </thead>
            <tbody>
              {NAMES.map((n) => (
                <tr key={n.name}>
                  <th scope="row">{n.name}</th>
                  <td>{n.rel}</td>
                  <td>{n.ex}</td>
                  <td>{n.mark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          A <strong>hole in one</strong> is called an <strong>ace</strong>. On a
          par 3 it is scored as a birdie; on a (very rare) par-4 ace it is an
          eagle.
        </p>

        <h2>Scorecard terms glossary</h2>
        <p>The words that show up on the card and around the group:</p>
        <dl className="gloss">
          {GLOSSARY.map(([term, def]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{def}</dd>
            </div>
          ))}
        </dl>
        <p>
          For where these rows physically sit on the card, see{" "}
          <Link href="/guides/how-to-read-a-golf-scorecard/">
            how to read a golf scorecard
          </Link>
          , and for the whole scoring task start to finish,{" "}
          <Link href="/guides/how-to-keep-score-in-golf/">
            how to keep score in golf
          </Link>
          .
        </p>

        <h2>Reading the shapes vs. keeping the score</h2>
        <p>
          Knowing the symbols helps you <em>read</em> a finished card. The harder
          job is producing an accurate one in the first place — remembering
          whether that hole was a bogey or a double while you walk to the next
          tee. A one-tap{" "}
          <Link href="/golf-stroke-counter/">golf stroke counter</Link> handles
          that part: it keeps the running total and hands you a finished card, so
          the only thing left to do is admire the circles.
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

      <FinalCta source="guide-symbols" heading="More circles. Fewer squares." />
    </main>
  );
}
