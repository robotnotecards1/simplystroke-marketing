import type { Metadata } from "next";
import Link from "next/link";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import FinalCta from "@/components/FinalCta";
import { og } from "@/lib/site";
import {
  APP_ID,
  MIKE_ID,
  appNode,
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

const TITLE = "SimplyStroke vs 18Birdies: Which Golf App Do You Need?";
const DESCRIPTION =
  "18Birdies is a social GPS platform with a scorecard attached. SimplyStroke is a scorecard with nothing attached. An honest side-by-side.";
const PATH = "/compare/simplystroke-vs-18birdies/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH),
};

const citations: Citation[] = [
  {
    name: "18Birdies Premium Pricing",
    url: "https://18birdies.com/premium/",
  },
  {
    name: "18Birdies Knowledge Base: Is the 18Birdies App Free?",
    url: "https://help.18birdies.com/article/520-is-the-app-free",
  },
];

const faqs: Faq[] = [
  {
    q: "Is there a simpler alternative to 18Birdies?",
    a: "Yes. If you use 18Birdies mainly to keep score and ignore the GPS, green maps and social feed, a one-tap stroke counter does that job with far less friction. SimplyStroke records a stroke in a single tap, needs no account to start a round, works offline for solo rounds and shows no ads. You give up GPS yardages, handicap tracking and the social feed, which is the trade.",
  },
  {
    q: "Is 18Birdies free?",
    a: "18Birdies has a free tier that includes GPS at over 40,000 courses, shot tracking, scoring, stats tracking, multi-player scoring, side games, and a watch app. Premium features such as 3D green maps, strokes gained, plays-like distances and the AI coach sit behind a subscription at $99.99 per year, $19.99 per month, or $7.99 per week. SimplyStroke keeps its core scoring free and shows no ads, but it also does far less.",
  },
  {
    q: "Does 18Birdies post to GHIN?",
    a: "No. 18Birdies maintains its own handicap, which does not sync with GHIN, and per their own documentation the 18Birdies handicap is not accepted for USGA-sanctioned tournaments. If you need an official index you will be posting scores separately. SimplyStroke does not post to GHIN either, and does not pretend to.",
  },
  {
    q: "Which is better for just keeping score?",
    a: "SimplyStroke, by design. In 18Birdies, entering a score means opening a scorecard grid, finding the right hole and incrementing a cell, while GPS overlays and the feed compete for attention. In SimplyStroke, entering a score means tapping the screen once. If keeping score is the only job you need done, the second one is a shorter path.",
  },
  {
    q: "Which is better overall?",
    a: "It depends entirely on whether you want a golf platform or a scorecard. 18Birdies is more capable at almost everything: GPS, stats, social rounds, green maps. SimplyStroke is better at exactly one thing, which is recording a stroke without breaking your round. Pick based on which of those you actually open the app to do.",
  },
  {
    q: "Does 18Birdies work on Apple Watch?",
    a: "Yes, both apps have an Apple Watch version. The difference is what happens on the watch. 18Birdies shows GPS distances, hole layout and scoring on your wrist. SimplyStroke shows one giant button you tap after each swing. If you want yardages on your wrist, 18Birdies. If you want the count on your wrist, SimplyStroke.",
  },
];

const itemListNode = {
  "@type": "ItemList",
  name: "SimplyStroke compared with 18Birdies",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: { "@type": "SoftwareApplication", name: "SimplyStroke", "@id": APP_ID },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "SoftwareApplication",
        name: "18Birdies",
        applicationCategory: "SportsApplication",
        url: "https://18birdies.com/",
      },
    },
  ],
};

const jsonLd = graph(
  organizationNode,
  personNode,
  teamNode,
  websiteNode,
  appNode,
  articleNode({
    headline: TITLE,
    description: DESCRIPTION,
    path: PATH,
    datePublished: "2026-07-11",
    dateModified: "2026-09-07",
    about: APP_ID,
    citations,
    author: MIKE_ID,
  }),
  itemListNode,
  faqNode(faqs),
  breadcrumbNode([
    { name: "Compare", path: "/compare/" },
    { name: "vs 18Birdies", path: PATH },
  ])
);

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">Comparison</div>
          <h1>SimplyStroke vs 18Birdies</h1>
          <div className="post-meta">
            <span>
              <Link href="/about/mike-anderson/">Mike Anderson</Link>
            </span>
            <span>&middot;</span>
            <span>September 2026</span>
            <span>&middot;</span>
            <span>5 min read</span>
          </div>
        </div>
      </header>

      <Breadcrumbs
        crumbs={[
          { name: "Compare", path: "/compare/" },
          { name: "vs 18Birdies", path: PATH },
        ]}
      />

      <article className="prose">
        <AnswerBlock
          updated="September 2026"
          answer={
            <>
              <strong>18Birdies</strong> is a social GPS platform with a
              scorecard attached: yardages at 40,000+ courses, green maps, stats,
              a feed, and a{" "}
              <a href="https://18birdies.com/premium/" target="_blank" rel="noopener">
                premium tier at $99.99/year
              </a>
              . <strong>SimplyStroke</strong> is a scorecard with
              nothing attached: one tap per shot, free, offline, no account.
              Choose 18Birdies if you want the whole round instrumented. Choose
              SimplyStroke if the only thing you keep losing is the count.
            </>
          }
          facts={[
            <>
              18Birdies&apos; free tier includes GPS, shot tracking, scoring,
              stats, side games and a watch app.{" "}
              <strong>Premium adds 3D green maps, strokes gained and the AI coach</strong>{" "}
              at $99.99/yr
            </>,
            <>
              <strong>Neither app posts to GHIN.</strong> The 18Birdies handicap
              does not sync with it and is not accepted for USGA events
            </>,
            <>
              SimplyStroke logs a stroke in <strong>one tap</strong>; 18Birdies
              needs a scorecard grid, the right hole, and a cell
            </>,
          ]}
        />

        <p>
          18Birdies was the default golf app for a long time, and the reason is
          straightforward: the{" "}
          <a href="https://help.18birdies.com/article/520-is-the-app-free" target="_blank" rel="noopener">
            free tier
          </a>{" "}
          is genuinely good and it gives you GPS distances at over 40,000
          courses without asking for money. Any comparison that pretends
          otherwise is not worth reading.
        </p>
        <p>
          The complaint that has caught up with it is equally straightforward.
          Golfers describe it as <em>bloated</em>, or &ldquo;too much going
          on,&rdquo; and the scorecard, the thing most people actually
          opened it for, is now one screen among many, competing with overlays,
          upsells and a social feed.
        </p>

        <h2>Side by side</h2>

        <div className="cmp-wrap">
          <table className="cmp">
            <caption>As of September 2026. Check 18Birdies&apos; own site for current pricing and features.</caption>
            <thead>
              <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col">SimplyStroke</th>
                <th scope="col">18Birdies</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">What it&apos;s for</th>
                <td data-label="SimplyStroke">Counting strokes. Nothing else</td>
                <td data-label="18Birdies">Social GPS platform + scoring</td>
              </tr>
              <tr>
                <th scope="row">Taps to log a stroke</th>
                <td data-label="SimplyStroke">1</td>
                <td data-label="18Birdies">Several (scorecard grid)</td>
              </tr>
              <tr>
                <th scope="row">Account to start</th>
                <td data-label="SimplyStroke">No</td>
                <td data-label="18Birdies">Yes</td>
              </tr>
              <tr>
                <th scope="row">Cost</th>
                <td data-label="SimplyStroke">Core scoring free</td>
                <td data-label="18Birdies">Free tier + $99.99/yr premium</td>
              </tr>
              <tr>
                <th scope="row">Ads</th>
                <td data-label="SimplyStroke">None</td>
                <td data-label="18Birdies">Yes, on the free tier</td>
              </tr>
              <tr>
                <th scope="row">GPS yardages</th>
                <td data-label="SimplyStroke">No</td>
                <td data-label="18Birdies">Yes (40,000+ courses)</td>
              </tr>
              <tr>
                <th scope="row">3D green maps</th>
                <td data-label="SimplyStroke">No</td>
                <td data-label="18Birdies">Premium only (Strackaline)</td>
              </tr>
              <tr>
                <th scope="row">Strokes gained stats</th>
                <td data-label="SimplyStroke">No</td>
                <td data-label="18Birdies">Premium only</td>
              </tr>
              <tr>
                <th scope="row">GHIN handicap posting</th>
                <td data-label="SimplyStroke">No</td>
                <td data-label="18Birdies">No (own handicap, doesn&apos;t sync)</td>
              </tr>
              <tr>
                <th scope="row">Social feed</th>
                <td data-label="SimplyStroke">No</td>
                <td data-label="18Birdies">Yes</td>
              </tr>
              <tr>
                <th scope="row">Apple Watch</th>
                <td data-label="SimplyStroke">Yes (one-tap counter)</td>
                <td data-label="18Birdies">Yes (GPS + scoring)</td>
              </tr>
              <tr>
                <th scope="row">Solo rounds work offline</th>
                <td data-label="SimplyStroke">Yes</td>
                <td data-label="18Birdies">Partial</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="verdict">
          <div className="verdict-head">The verdict</div>
          <p>
            <strong>
              If you use 18Birdies for the GPS, keep 18Birdies.
            </strong>{" "}
            Distance to the green on a good free tier is a real thing and
            SimplyStroke has no answer to it.
          </p>
          <p>
            <strong>
              If you open 18Birdies to keep score and everything else is noise,
            </strong>{" "}
            the feed, the upsells and the grid you have to find the right cell in
            make you pay attention to features you never asked for.
            SimplyStroke is a single tap and core scoring costs nothing.
          </p>
        </div>

        <h2>What you give up by switching</h2>
        <ul>
          <li>
            <strong>GPS yardages.</strong> The big one. 18Birdies covers over
            40,000 courses on the free tier. If you do not carry a rangefinder,
            this matters.
          </li>
          <li>
            <strong>3D green maps and Strackaline data</strong> (premium).
          </li>
          <li>
            <strong>Strokes gained and advanced stats</strong> (premium).
          </li>
          <li>
            <strong>The social feed, side games and leagues.</strong>
          </li>
          <li>
            <strong>AI swing analyzer and club recommendations</strong>{" "}
            (premium).
          </li>
        </ul>
        <p>
          Note what is <em>not</em> on that list: an official handicap. Neither
          app posts to GHIN, and the 18Birdies handicap is not accepted for
          USGA events, so if that is what you thought you were getting,
          you are already doing it by hand.
        </p>

        <h2>What you gain by switching</h2>
        <ul>
          <li>
            <strong>One tap per stroke instead of a grid.</strong> The single
            biggest difference in daily use. You tap after each swing instead of
            opening a scorecard, finding the hole, and incrementing a cell.
          </li>
          <li>
            <strong>No account to start.</strong> Pick up your phone on the
            first tee and start a round. No email, no password, no profile.
          </li>
          <li>
            <strong>No ads, no upsells.</strong> The screen shows your count and
            nothing else.
          </li>
          <li>
            <strong>Works offline for solo rounds.</strong> Your round is saved
            on your device and needs no course signal.
          </li>
          <li>
            <strong>A finished scorecard.</strong> SimplyStroke totals the round
            and calculates your score to par. You never add it up yourself.
          </li>
        </ul>

        <h2>When to use both</h2>
        <p>
          Some golfers keep both on their phone. 18Birdies for the GPS on
          unfamiliar courses where distance matters, and SimplyStroke on
          the home course where they already know every yardage and just want
          the count to stick. They are not competing for the same job, and
          installing one does not break the other.
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
            <Link href="/compare/">
              The full comparison: SimplyStroke vs every big golf app
            </Link>
          </li>
          <li>
            <Link href="/compare/simplystroke-vs-arccos/">
              SimplyStroke vs Arccos
            </Link>
          </li>
          <li>
            <Link href="/golf-stroke-counter/">
              What a golf stroke counter is, and how to pick one
            </Link>
          </li>
          <li>
            <Link href="/guides/how-to-keep-score-in-golf/">
              How to keep score in golf: the complete beginner guide
            </Link>
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

      <FinalCta
        source="vs-18birdies"
        heading="Only need the number held?"
      />
    </main>
  );
}
