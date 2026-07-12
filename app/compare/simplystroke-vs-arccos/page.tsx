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

const TITLE = "SimplyStroke vs Arccos: An Arccos Alternative With No Subscription";
const DESCRIPTION =
  "Arccos is the best shot-tracking system in golf, and it costs sensors plus a subscription. SimplyStroke counts strokes and costs nothing. An honest comparison of two apps that aren't really competing.";
const PATH = "/compare/simplystroke-vs-arccos/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH),
};

const faqs: Faq[] = [
  {
    q: "Is there an Arccos alternative without a subscription?",
    a: "It depends what you were using Arccos for. If you want strokes gained analytics without a recurring fee, the usual answer is Shot Scope, which is a one-time hardware purchase. If what you actually want is an accurate score without the sensors, the subscription or the analytics, a free one-tap stroke counter like SimplyStroke does that and costs nothing.",
  },
  {
    q: "How much does Arccos cost?",
    a: "Arccos combines a hardware purchase with an ongoing membership. Sensors and bundles typically run $180 to $300 up front, and the membership runs roughly $100 to $200 a year depending on plan and renewal terms. Check Arccos directly for current pricing. SimplyStroke is free with no hardware and no subscription.",
  },
  {
    q: "Is Arccos worth it?",
    a: "If you are genuinely working on your game and you will look at the data, yes. Arccos is the most complete automatic shot-tracking and strokes gained system available, and nothing in the free tier of the market comes close to it. If you bought it and now mostly use it as an expensive scorecard, that is a different question, and it is the question this page is about.",
  },
  {
    q: "Can Arccos track a lost ball or a penalty?",
    a: "This is a well-documented frustration among Arccos users: shots that go out of bounds, into a hazard or are lost are exactly the ones the sensors handle worst, and they are also the ones that matter most to your score. A stroke counter has no such problem, because it does not care where the ball went. You swung; it counts.",
  },
  {
    q: "Which is better for just keeping score?",
    a: "SimplyStroke, and it is not close. Arccos is an analytics platform: it needs sensors screwed into your grips, a phone in your pocket, a synced round and an account. SimplyStroke needs one tap. If the score is the only output you care about, everything else in the Arccos stack is machinery you are paying for and not using.",
  },
];

const itemListNode = {
  "@type": "ItemList",
  name: "SimplyStroke compared with Arccos Caddie",
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
        name: "Arccos Caddie",
        applicationCategory: "SportsApplication",
        url: "https://www.arccosgolf.com/",
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
    { name: "vs Arccos", path: PATH },
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
          <h1>SimplyStroke vs Arccos</h1>
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
          { name: "vs Arccos", path: PATH },
        ]}
      />

      <article className="prose">
        <AnswerBlock
          updated="July 2026"
          answer={
            <>
              <strong>Arccos</strong> is an automatic shot-tracking and strokes
              gained system: sensors in your grips, a subscription, and the best
              golf analytics money can buy. <strong>SimplyStroke</strong> is a
              free one-tap stroke counter with no sensors, no subscription and no
              analytics. These two apps are not really competing. The only
              question worth asking is which output you actually use: the data,
              or the number.
            </>
          }
          facts={[
            <>
              Arccos costs <strong>~$180–$300</strong> in sensors plus roughly{" "}
              <strong>$100–$200 a year</strong>. SimplyStroke is{" "}
              <strong>free</strong>
            </>,
            <>
              Arccos is <strong>the best in the world at analytics</strong>, and
              SimplyStroke doesn&apos;t try to compete with it
            </>,
            <>
              Arccos users report it handles{" "}
              <strong>lost balls and penalties worst</strong> — the shots that
              matter most to a score
            </>,
          ]}
        />

        <p>
          Let&apos;s get the honest part out of the way first: Arccos is
          extraordinary. Sensors in the grips, automatic shot detection, strokes
          gained against a real benchmark, club recommendations. If you are
          working on your game and you will actually read the data, there is
          nothing on this page that should talk you out of it.
        </p>
        <p>
          This page is for the other person. The one who bought in, stopped
          opening the analytics after the third month, and is now paying a
          recurring fee for what has quietly become an expensive scorecard.
        </p>

        <h2>The subscription question</h2>
        <p>
          Arccos pricing is the loudest single grievance in amateur golf. Golfers
          talk openly about cancelling it and replacing the whole system with
          one-time-purchase hardware, and they do it knowing they&apos;re taking a
          downgrade — that is how much the recurring charge grates.
        </p>
        <p>
          Worth being precise about what you&apos;re weighing: sensors and bundles
          typically run <strong>$180–$300</strong> up front, and membership lands
          somewhere around <strong>$100–$200 a year</strong> depending on plan and
          renewal. Prices move; check Arccos for the current numbers before you
          quote us.
        </p>
        <p>SimplyStroke is free. There is no tier, and no renewal.</p>

        <h2>Side by side</h2>

        <div className="cmp-wrap">
          <table className="cmp">
            <caption>
              As of July 2026. Arccos pricing changes — check their site.
            </caption>
            <thead>
              <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col">SimplyStroke</th>
                <th scope="col">Arccos Caddie</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">What it&apos;s for</th>
                <td data-label="SimplyStroke">Counting strokes. Nothing else</td>
                <td data-label="Arccos">Shot tracking &amp; strokes gained</td>
              </tr>
              <tr>
                <th scope="row">Cost</th>
                <td data-label="SimplyStroke">Free</td>
                <td data-label="Arccos">~$100–$200/yr + hardware</td>
              </tr>
              <tr>
                <th scope="row">Hardware</th>
                <td data-label="SimplyStroke">None</td>
                <td data-label="Arccos">Sensors, ~$180–$300</td>
              </tr>
              <tr>
                <th scope="row">Taps to log a stroke</th>
                <td data-label="SimplyStroke">1</td>
                <td data-label="Arccos">0 — the sensors do it</td>
              </tr>
              <tr>
                <th scope="row">Strokes gained analytics</th>
                <td data-label="SimplyStroke">No</td>
                <td data-label="Arccos">Yes, best in class</td>
              </tr>
              <tr>
                <th scope="row">Lost balls &amp; penalties</th>
                <td data-label="SimplyStroke">Just tap. It counts</td>
                <td data-label="Arccos">A known weak spot</td>
              </tr>
              <tr>
                <th scope="row">Works offline</th>
                <td data-label="SimplyStroke">
                  Not yet — ships with the apps
                </td>
                <td data-label="Arccos">No, needs sync</td>
              </tr>
              <tr>
                <th scope="row">Account to start</th>
                <td data-label="SimplyStroke">No</td>
                <td data-label="Arccos">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="verdict">
          <div className="verdict-head">The verdict</div>
          <p>
            <strong>If you read the data, keep Arccos.</strong> It is the best
            shot-tracking system in golf and SimplyStroke is not an alternative to
            it in any meaningful sense.
          </p>
          <p>
            <strong>
              If you stopped reading the data and kept paying the invoice
            </strong>{" "}
            — you&apos;re renting an analytics platform to do a job a free app
            does in one tap. That&apos;s the whole pitch, and it only applies to
            you if you already know it does.
          </p>
        </div>

        <h2>The one thing Arccos genuinely can&apos;t do</h2>
        <p>
          Automatic shot detection works by sensing the swing. Which means the
          shots it struggles with are the ones where things go wrong: a ball out
          of bounds, a ball in the water, a provisional, a re-tee. Arccos users
          raise this constantly, and it is not a small complaint, because{" "}
          <strong>
            those are exactly the shots that decide your score.
          </strong>
        </p>
        <p>
          A stroke counter has no opinion about where the ball went. You swung, so
          it counts. That is a stupid advantage, and it is a real one.
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
            <Link href="/compare/simplystroke-vs-18birdies/">
              SimplyStroke vs 18Birdies
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
        source="vs-arccos"
        heading="Cancelled the subscription?"
      />
    </main>
  );
}
