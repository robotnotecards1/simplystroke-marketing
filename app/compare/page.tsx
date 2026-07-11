import type { Metadata } from "next";
import Link from "next/link";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import WaitlistSection from "@/components/WaitlistSection";
import { og, SITE_URL } from "@/lib/site";
import {
  APP_ID,
  appNode,
  articleNode,
  breadcrumbNode,
  faqNode,
  graph,
  organizationNode,
  personNode,
  websiteNode,
  type Faq,
} from "@/lib/schema";

const TITLE = "SimplyStroke vs 18Birdies, Arccos, Golfshot & More (2026)";
const DESCRIPTION =
  "An honest comparison of SimplyStroke against the big golf apps. They do more than we do and charge $30-$200 a year for it. We do one thing and charge nothing. See which you actually need.";
const PATH = "/compare/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH),
};

/* Competitors. Named, linked, and NOT priced in schema — see
   COMPARISON-PAGE-SPEC.md §6. Prices below are bands, not quotes, and every
   one links to that company's own pricing page so the reader can check us.
   Re-verify quarterly; if that stops happening, cut the cost column. */
const apps = [
  {
    name: "18Birdies",
    url: "https://18birdies.com/",
    forWhat: "Social GPS + scoring",
    taps: "Several (scorecard grid)",
    account: "Yes",
    offline: "Partial",
    ads: "Yes, on the free tier",
    cost: "Free / premium tier",
    hardware: "None",
  },
  {
    name: "Arccos Caddie",
    url: "https://www.arccosgolf.com/",
    forWhat: "Automatic shot tracking & strokes gained",
    taps: "0 — sensors do it",
    account: "Yes",
    offline: "No, needs sync",
    ads: "No",
    cost: "~$100–$200 / yr",
    hardware: "Sensors, ~$180–$300",
  },
  {
    name: "Golfshot",
    url: "https://golfshot.com/",
    forWhat: "GPS + shot tracking",
    taps: "Several",
    account: "Yes",
    offline: "Partial",
    ads: "Free tier",
    cost: "Free / ~$80 Pro",
    hardware: "None",
  },
  {
    name: "SwingU",
    url: "https://swingu.com/",
    forWhat: "GPS + game improvement",
    taps: "Several",
    account: "Yes",
    offline: "Partial",
    ads: "Free tier",
    cost: "Free / ~$60–$100",
    hardware: "None",
  },
  {
    name: "TheGrint",
    url: "https://thegrint.com/",
    forWhat: "Official GHIN handicap tracking",
    taps: "Several",
    account: "Yes",
    offline: "Partial",
    ads: "Free tier",
    cost: "Free / paid tiers",
    hardware: "None",
  },
  {
    name: "Golf Pad",
    url: "https://golfpadgps.com/",
    forWhat: "Budget GPS + stats",
    taps: "Several",
    account: "Yes",
    offline: "Partial",
    ads: "Free tier",
    cost: "Free / ~$30 / yr",
    hardware: "Optional tags",
  },
];

const faqs: Faq[] = [
  {
    q: "What is the simplest golf scorecard app?",
    a: "The simplest golf scorecard apps are one-tap stroke counters, where you tap once per swing and the app keeps the running total and totals the card for you. SimplyStroke is built to be the simplest of these: one giant button, an undo, no account required to start a round, no ads, no GPS and no subscription.",
  },
  {
    q: "Is there a golf app without a subscription?",
    a: "Yes. SimplyStroke is free with no subscription. Most GPS and analytics golf apps charge roughly $30 to $100 a year for their useful tiers, and hardware trackers like Arccos add $180 to $300 up front for sensors.",
  },
  {
    q: "What is a simpler alternative to 18Birdies?",
    a: "If you use 18Birdies mainly to keep score and ignore the GPS, green maps and social feed, a one-tap stroke counter does that one job with far less friction. SimplyStroke records a stroke in a single tap, needs no account to start a round, works fully offline and shows no ads. You lose GPS yardages, handicap tracking and the social feed, which is the trade.",
  },
  {
    q: "Do I need a golf GPS app if I already have a rangefinder?",
    a: "Probably not. If you already get your yardages from a laser rangefinder or a cart GPS, the only thing a golf app is still doing for you is holding your score, and a full GPS app is a heavy way to do that. A stroke counter covers it in one tap.",
  },
  {
    q: "Does SimplyStroke have GPS, handicap posting or strokes gained?",
    a: "No, and it will not. SimplyStroke has no GPS, no GHIN handicap posting, no strokes gained analytics, no side games and no social feed. It counts strokes and produces a finished scorecard. If you want analytics, Arccos is genuinely excellent and does that far better than we ever would.",
  },
  {
    q: "Is SimplyStroke free?",
    a: "Yes. SimplyStroke is free, with no subscription, no ads and no hardware to buy.",
  },
  {
    q: "When does SimplyStroke launch?",
    a: "SimplyStroke launches in 2026 on iPhone, Android and Apple Watch. Join the waitlist and we will send exactly one message when it is live.",
  },
];

/* The compared apps as an ItemList. Name and url only — no offers, no price,
   no aggregateRating. We do not publish machine-readable claims about other
   companies' products. */
const itemListNode = {
  "@type": "ItemList",
  name: "Golf apps compared with SimplyStroke",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: { "@type": "SoftwareApplication", name: "SimplyStroke", "@id": APP_ID },
    },
    ...apps.map((app, i) => ({
      "@type": "ListItem",
      position: i + 2,
      item: {
        "@type": "SoftwareApplication",
        name: app.name,
        applicationCategory: "SportsApplication",
        url: app.url,
      },
    })),
  ],
};

const jsonLd = graph(
  organizationNode,
  websiteNode,
  personNode,
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
  breadcrumbNode([{ name: "Compare", path: PATH }])
);

export default function ComparePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">Comparison</div>
          <h1>Golf app comparison: SimplyStroke vs. everything else</h1>
          <div className="post-meta">
            <span>Jared Moore</span>
            <span>·</span>
            <span>July 2026</span>
            <span>·</span>
            <span>7 min read</span>
          </div>
        </div>
      </header>

      <Breadcrumbs crumbs={[{ name: "Compare", path: PATH }]} />

      <article className="prose">
        <AnswerBlock
          updated="July 2026"
          answer={
            <>
              <strong>SimplyStroke</strong> is a free, one-tap golf stroke
              counter for iPhone, Android and Apple Watch, launching in 2026. It
              does one thing: it holds your score so you don&apos;t have to.
              Apps like 18Birdies, Arccos, Golfshot and SwingU do far more —
              GPS, strokes gained, handicaps, side games — and cost $30 to $200
              a year to do it. Pick SimplyStroke if the only thing you keep
              losing is the count.
            </>
          }
          facts={[
            <>
              Most golf apps are GPS or analytics platforms with a scorecard
              bolted on. SimplyStroke is{" "}
              <strong>a scorecard with nothing bolted on</strong>
            </>,
            <>
              Premium golf subscriptions run <strong>$30–$100 a year</strong>;
              hardware trackers add <strong>$180–$300</strong> up front
            </>,
            <>
              SimplyStroke is <strong>free</strong>, works offline, and needs no
              account to start a round
            </>,
          ]}
        />

        <p>
          Every golf app on this page is better than SimplyStroke at something.
          Several are better at almost everything. That is not false modesty and
          it is not a negotiating tactic, it is the actual situation, and the
          point of this page is to help you work out whether the one thing
          SimplyStroke is better at is the thing you were looking for.
        </p>

        <h2>The comparison</h2>
        <p>
          Note what the columns are. Not features, because a feature count is a
          contest SimplyStroke loses to Arccos on purpose. What is measured here
          is <strong>friction</strong>: how much has to happen between you
          swinging a club and the number being right.
        </p>

        <div className="cmp-wrap">
          <table className="cmp">
            <caption>
              As of July 2026. Prices are bands, not quotes, and they change —
              check each company&apos;s own pricing page, linked above.
            </caption>
            <thead>
              <tr>
                <th scope="col">App</th>
                <th scope="col">What it&apos;s actually for</th>
                <th scope="col">Taps to log a stroke</th>
                <th scope="col">Account to start</th>
                <th scope="col">Works offline</th>
                <th scope="col">Ads</th>
                <th scope="col">Typical annual cost</th>
                <th scope="col">Hardware</th>
              </tr>
            </thead>
            <tbody>
              <tr className="cmp-us">
                <th scope="row">SimplyStroke</th>
                <td data-label="What it's for">Counting strokes. Nothing else</td>
                <td data-label="Taps to log a stroke">1</td>
                <td data-label="Account to start">No</td>
                <td data-label="Works offline">Yes</td>
                <td data-label="Ads">None</td>
                <td data-label="Typical annual cost">Free</td>
                <td data-label="Hardware">None</td>
              </tr>
              {apps.map((app) => (
                <tr key={app.name}>
                  <th scope="row">
                    <a href={app.url} target="_blank" rel="noopener">
                      {app.name}
                    </a>
                  </th>
                  <td data-label="What it's for">{app.forWhat}</td>
                  <td data-label="Taps to log a stroke">{app.taps}</td>
                  <td data-label="Account to start">{app.account}</td>
                  <td data-label="Works offline">{app.offline}</td>
                  <td data-label="Ads">{app.ads}</td>
                  <td data-label="Typical annual cost">{app.cost}</td>
                  <td data-label="Hardware">{app.hardware}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="verdict">
          <div className="verdict-head">The verdict</div>
          <p>
            <strong>
              If you are here because you just looked at a renewal notice:
            </strong>{" "}
            SimplyStroke is free, permanently, with no premium tier and no
            hardware. If all you were getting for that money was a scorecard,
            you were being overcharged by roughly the entire amount.
          </p>
          <p>
            <strong>If you want strokes gained analytics, buy Arccos.</strong>{" "}
            It is the best in the world at that and SimplyStroke does not try.
          </p>
          <p>
            <strong>
              If you want yardages, get a GPS app or a rangefinder.
            </strong>{" "}
            SimplyStroke will never tell you the distance to the pin.
          </p>
          <p>
            <strong>
              But if the only thing that keeps going wrong is the count
            </strong>{" "}
            — you get to the green and genuinely do not know whether that was
            your fourth or your fifth — that is the problem SimplyStroke was
            built for, and none of the apps above solve it, because they are all
            busy solving something bigger.
          </p>
        </div>

        <h2>The subscription problem</h2>
        <p>
          Look at what golfers are actually doing about app pricing. They are
          buying <strong>$150 to $300 of hardware</strong> — sensors, watches,
          the lot — and accepting software they like less, specifically so they
          never have to see another renewal notice. That is not price
          sensitivity. That is a grudge, and it is well earned: the going rate
          for a golf app&apos;s useful tier has been climbing for years, and it
          climbs again every time the app adds something you did not ask for.
        </p>
        <p>
          SimplyStroke sidesteps the whole argument by not having one.
          It&apos;s free. There is no premium tier, no annual renewal, no
          hardware bundle and no upsell holding your own scorecard hostage.
        </p>
        <p>
          That is not generosity, it is arithmetic:{" "}
          <strong>counting to five costs nothing to run.</strong> There are no
          course maps to license, no servers doing analytics, no sensors to
          manufacture. An app that only counts can afford to be free, and an app
          that&apos;s free is an app that never has to invent a reason for you
          to pay again next year.
        </p>

        <h2>Why golf apps get more complicated every year</h2>
        <p>
          A subscription app has to earn its renewal every twelve months, and
          the easiest way to look like you have earned it is to ship features.
          So every year the scorecard screen gets one more overlay, one more
          upsell, one more thing to dismiss before you can write down a four.
        </p>
        <p>
          Complexity is not a bug in that model. It is the model. And it is why
          a free app that only counts can afford to do something none of them
          can: stay finished.
        </p>

        <h2>What &ldquo;simple&rdquo; costs you</h2>
        <p>
          Here is the honest list of what you give up by choosing SimplyStroke.
          Read it before you join the waitlist, not after.
        </p>
        <ul>
          <li>
            <strong>GPS yardages.</strong> No distance to the pin, no hazard
            distances, no green maps.
          </li>
          <li>
            <strong>Official handicap posting.</strong> No GHIN integration. If
            you carry an official index, you will still be posting scores
            yourself.
          </li>
          <li>
            <strong>Strokes gained and shot analytics.</strong> SimplyStroke
            does not know which club you hit, and never will.
          </li>
          <li>
            <strong>Side games and betting.</strong> No Wolf, no skins, no
            Nassau.
          </li>
          <li>
            <strong>A social feed.</strong> Nobody is going to like your round.
          </li>
        </ul>
        <p>
          If two or more of those matter to you, one of the apps in the table is
          a better buy than we are, and you should go get it.
        </p>

        <h2>Who should not use SimplyStroke</h2>
        <ul>
          <li>
            <strong>Golfers chasing a handicap.</strong> You need GHIN
            integration. TheGrint is built for exactly this.
          </li>
          <li>
            <strong>Golfers who want data.</strong> If you enjoy the analytics,
            you will find SimplyStroke boring, and you will be right to.
          </li>
          <li>
            <strong>Golfers who already love their app.</strong> If your
            scorecard workflow is not costing you anything, there is nothing
            here for you to fix.
          </li>
        </ul>

        <h2>Who SimplyStroke is for</h2>
        <ul>
          <li>
            Golfers who still keep a paper scorecard and want a cleaner version
            of exactly that, with no account and no settings.
          </li>
          <li>
            Golfers who already own a rangefinder or ride a cart with GPS, and
            need an app for one job only.
          </li>
          <li>
            Casual groups who do not care about handicaps, analytics or betting
            engines and just want a shared card that adds itself up.
          </li>
          <li>
            Golfers who lose count for reasons that are not carelessness. If
            that is every round, every hole, and you have spent years being told
            to concentrate harder, read{" "}
            <Link href="/adhd-golf/">ADHD and golf</Link> — the count is a{" "}
            prospective memory task and it is measurably harder for some brains
            than others.
          </li>
        </ul>
        <p>
          If you want the category explained rather than the products compared,
          start with{" "}
          <Link href="/golf-stroke-counter/">
            what a golf stroke counter is and how to pick one
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

        <div className="author-box">
          <div>
            <div className="author-box-name">Jared Moore</div>
            <p>
              Built SimplyStroke after one too many rounds spent reconstructing
              his own score on the walk to the next tee.{" "}
              <Link href="/about/">More about the app and why it exists</Link>.
              Spot something wrong in the table above?{" "}
              <a href="mailto:hello@simplystroke.app">Tell us</a> and we will
              fix it.
            </p>
          </div>
        </div>

        <p style={{ fontSize: 14, color: "var(--gray-body)", marginTop: 28 }}>
          SimplyStroke has not launched yet, so this page carries no user
          ratings and makes none up. Competitor pricing and features are
          summarised from each company&apos;s own published material as of July
          2026 and are their trademarks, not ours. Canonical:{" "}
          <a href={`${SITE_URL}${PATH}`}>{`${SITE_URL}${PATH}`}</a>
        </p>
      </article>

      <WaitlistSection
        source="compare"
        heading="Only need the number held?"
      />
    </main>
  );
}
