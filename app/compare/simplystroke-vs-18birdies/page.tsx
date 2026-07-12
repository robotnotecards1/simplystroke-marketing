import type { Metadata } from "next";
import Link from "next/link";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import WaitlistSection from "@/components/WaitlistSection";
import { og } from "@/lib/site";
import {
  APP_ID,
  appNode,
  articleNode,
  breadcrumbNode,
  faqNode,
  graph,
  organizationNode,
  teamNode,
  websiteNode,
  type Faq,
} from "@/lib/schema";

const TITLE = "SimplyStroke vs 18Birdies: Which Golf App Do You Need?";
const DESCRIPTION =
  "18Birdies is a social GPS platform with a scorecard attached. SimplyStroke is a scorecard with nothing attached. An honest side-by-side, including what 18Birdies does better.";
const PATH = "/compare/simplystroke-vs-18birdies/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH),
};

const faqs: Faq[] = [
  {
    q: "Is there a simpler alternative to 18Birdies?",
    a: "Yes. If you use 18Birdies mainly to keep score and ignore the GPS, green maps and social feed, a one-tap stroke counter does that job with far less friction. SimplyStroke records a stroke in a single tap, needs no account to start a round, and shows no ads. You give up GPS yardages, handicap tracking and the social feed, which is the trade.",
  },
  {
    q: "Is 18Birdies free?",
    a: "18Birdies has a free tier that is genuinely well liked, and it includes GPS distances. The free tier carries ads, and green maps and the more advanced tools sit behind a premium subscription. SimplyStroke is free with no tiers, no ads and no subscription at all, but it also does far less.",
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
  teamNode,
  websiteNode,
  appNode,
  articleNode({
    headline: TITLE,
    description: DESCRIPTION,
    path: PATH,
    datePublished: "2026-07-11",
    dateModified: "2026-07-11",
    about: APP_ID,
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
            <span>The SimplyStroke Team</span>
            <span>·</span>
            <span>July 2026</span>
            <span>·</span>
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
          updated="July 2026"
          answer={
            <>
              <strong>18Birdies</strong> is a social GPS platform with a
              scorecard attached: yardages, green maps, stats, a feed, and a
              premium tier. <strong>SimplyStroke</strong> is a scorecard with
              nothing attached: one tap per shot, free, no account.
              Choose 18Birdies if you want the whole round instrumented. Choose
              SimplyStroke if the only thing you keep losing is the count.
            </>
          }
          facts={[
            <>
              18Birdies has a well-liked free tier{" "}
              <strong>with ads</strong>; green maps and advanced tools sit behind
              a premium subscription
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
          straightforward: the free tier is genuinely good and it gives you
          distance to the green without asking for money. Any comparison that
          pretends otherwise isn&apos;t worth reading.
        </p>
        <p>
          The complaint that has caught up with it is equally straightforward.
          Golfers describe it as <em>bloated</em> — &ldquo;too much going
          on&rdquo; — and the scorecard, the thing most people actually opened it
          for, is now one screen among many, competing with overlays, upsells and
          a social feed.
        </p>

        <h2>Side by side</h2>

        <div className="cmp-wrap">
          <table className="cmp">
            <caption>As of July 2026. Check 18Birdies&apos; own site for current pricing and features.</caption>
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
                <td data-label="SimplyStroke">Free, no tiers</td>
                <td data-label="18Birdies">Free tier + premium subscription</td>
              </tr>
              <tr>
                <th scope="row">Ads</th>
                <td data-label="SimplyStroke">None</td>
                <td data-label="18Birdies">Yes, on the free tier</td>
              </tr>
              <tr>
                <th scope="row">GPS yardages</th>
                <td data-label="SimplyStroke">No</td>
                <td data-label="18Birdies">Yes</td>
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
                <th scope="row">Works offline</th>
                <td data-label="SimplyStroke">
                  Not yet — ships with the apps
                </td>
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
              If you open 18Birdies to keep score and everything else is noise
            </strong>{" "}
            — the feed, the upsells, the grid you have to find the right cell in
            — then you are paying attention for features you never asked for.
            SimplyStroke is a single tap and it costs nothing.
          </p>
        </div>

        <h2>What you give up by switching</h2>
        <ul>
          <li>
            <strong>GPS yardages.</strong> The big one. If you don&apos;t carry a
            rangefinder, this matters.
          </li>
          <li>
            <strong>Green maps and slope</strong> (18Birdies premium).
          </li>
          <li>
            <strong>The social feed and challenges.</strong>
          </li>
          <li>
            <strong>Stats and round history depth.</strong> SimplyStroke gives you
            a scorecard, not a dashboard.
          </li>
        </ul>
        <p>
          Note what is <em>not</em> on that list: an official handicap. Neither
          app posts to GHIN, and the 18Birdies handicap isn&apos;t accepted for
          USGA events, so if that&apos;s what you thought you were getting,
          you&apos;re already doing it by hand.
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
        </ul>

        <div className="author-box">
          <div>
            <div className="author-box-name">The SimplyStroke Team</div>
            <p>
              We built SimplyStroke after one too many rounds spent
              reconstructing our own scores on the walk to the next tee.{" "}
              <Link href="/about/">More about why it exists</Link>.
            </p>
          </div>
        </div>
      </article>

      <WaitlistSection
        source="vs-18birdies"
        heading="Only need the number held?"
      />
    </main>
  );
}
