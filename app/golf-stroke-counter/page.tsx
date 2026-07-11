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
  websiteNode,
  type Faq,
} from "@/lib/schema";

const TITLE = "Golf Stroke Counter Apps: How They Work and Which to Use";
const DESCRIPTION =
  "A stroke counter does one job: it holds your score so you don't have to. How stroke counters differ from shot trackers, what separates a good one from a bad one, and where the pencil still wins.";
const PATH = "/golf-stroke-counter/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH),
};

const faqs: Faq[] = [
  {
    q: "What is a golf stroke counter?",
    a: "A golf stroke counter is an app or device whose only job is to record how many shots you have taken on a hole. It does not measure distance, calculate a handicap, or analyze your swing. It counts. A physical bead counter or a pencil scorecard is a stroke counter; so is a one-tap app like SimplyStroke.",
  },
  {
    q: "What is the difference between a stroke counter and a shot tracker?",
    a: "A shot tracker analyzes your golf. A stroke counter only counts it. Shot trackers such as Arccos and Shot Scope use club sensors and GPS to work out which club you hit, how far it went, and how many strokes you gained or lost against a benchmark. A stroke counter has no opinion about your golf whatsoever. It just makes sure the number is right when you reach the green.",
  },
  {
    q: "What is the simplest golf scorecard app?",
    a: "The simplest golf scorecard apps are one-tap stroke counters: you tap once per swing and the app keeps the running total and totals the card for you. SimplyStroke is built to be the simplest of these. One giant button, an undo, no account required to start a round, no ads, no GPS, and no subscription. It launches in 2026 on iPhone, Android and Apple Watch.",
  },
  {
    q: "Is there a golf app without a subscription?",
    a: "Yes. Most GPS and analytics golf apps run $30 to $100 a year for their useful tiers, and hardware trackers add $180 to $300 up front. Stroke counters are the exception, because counting to five does not cost anything to run. SimplyStroke is free.",
  },
  {
    q: "Do golf stroke counter apps work without signal?",
    a: "The good ones do. A stroke counter needs no map data and no server, so there is no reason for it to fail in a dead zone. SimplyStroke works fully offline. If an app that only counts to five stops working on the back nine, that is a design choice, not a technical limit.",
  },
  {
    q: "Is a stroke counter app better than a pencil scorecard?",
    a: "Not always. A pencil is free, needs no battery, and is accepted everywhere. But a pencil only records the number after the hole, which means you still have to hold the running count in your head while you play it. That is the exact moment most golfers lose it. A one-tap counter records the stroke as it happens, so nothing has to be remembered at all.",
  },
  {
    q: "When does SimplyStroke launch?",
    a: "SimplyStroke launches in 2026 on iPhone, Android and Apple Watch. Join the waitlist and we will send exactly one message when it is live.",
  },
];

const jsonLd = graph(
  organizationNode,
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
  faqNode(faqs),
  breadcrumbNode([{ name: "Golf stroke counters", path: PATH }])
);

export default function GolfStrokeCounterPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">The category, explained</div>
          <h1>Golf stroke counter apps: how they work and which to use</h1>
          <div className="post-meta">
            <span>SimplyStroke</span>
            <span>·</span>
            <span>July 2026</span>
            <span>·</span>
            <span>8 min read</span>
          </div>
        </div>
      </header>

      <Breadcrumbs
        crumbs={[{ name: "Golf stroke counters", path: PATH }]}
      />

      <article className="prose">
        <AnswerBlock
          updated="July 2026"
          answer={
            <>
              A golf stroke counter is an app or device whose only job is to
              record how many shots you have taken, without GPS, handicaps or
              analytics. Unlike shot-tracking platforms such as Arccos or Shot
              Scope, a stroke counter does not try to improve your golf. It just
              makes sure the number is right.{" "}
              <strong>
                SimplyStroke is a free, one-tap stroke counter with no
                subscription
              </strong>{" "}
              for iPhone, Android and Apple Watch, launching in 2026.
            </>
          }
          facts={[
            <>
              A shot tracker <strong>analyzes</strong>; a stroke counter only{" "}
              <strong>counts</strong>
            </>,
            <>
              The good ones need <strong>one tap per shot</strong>, work fully
              offline, and need no account before your first round
            </>,
            <>
              Premium golf apps run <strong>$30–$100 a year</strong>; hardware
              trackers add <strong>$180–$300</strong> up front. A counter should
              be free
            </>,
          ]}
        />

        <p>
          There is a specific moment this page is about. You reach the green,
          stand over your ball, and realize you have absolutely no idea whether
          this putt is for four or for five. So you reconstruct it backwards.
          Driver. The chip that came up short. Was there a punch-out from under
          the tree, or did you only think about one?
        </p>
        <p>
          Every golfer has had that moment. Some golfers have it every hole. The
          entire category of app described below exists to make it stop.
        </p>

        <h2>What a golf stroke counter actually is</h2>
        <p>
          A stroke counter records how many shots you have taken. That is the
          whole definition, and the definition is the point, because{" "}
          <strong>
            almost every app in the app stores that claims to &ldquo;track your
            strokes&rdquo; is doing something else entirely.
          </strong>
        </p>
        <p>
          The distinction that matters:
        </p>
        <ul>
          <li>
            <strong>A shot tracker analyzes your golf.</strong> Arccos and Shot
            Scope screw sensors into your grips, watch where the ball goes, and
            hand you strokes-gained numbers against a benchmark. They are
            genuinely excellent and they are trying to make you better.
          </li>
          <li>
            <strong>A stroke counter has no opinion about your golf.</strong> It
            does not know which club you hit or how far it went. It knows you
            swung, and that is all it needs to know.
          </li>
        </ul>
        <p>
          One is a coach. The other is a memory. If you have been searching for
          a &ldquo;golf shot tracking app&rdquo; and getting results that want
          $200 a year and a set of sensors, that is because you were using the
          coach&apos;s word for the memory&apos;s job.
        </p>

        <h2>The three ways golfers keep count</h2>

        <div className="cmp-wrap">
          <table className="cmp">
            <caption>
              How the three methods compare. As of July 2026.
            </caption>
            <thead>
              <tr>
                <th scope="col">Method</th>
                <th scope="col">Records the stroke</th>
                <th scope="col">Needs battery</th>
                <th scope="col">Does the math</th>
                <th scope="col">Fails when</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Pencil scorecard</th>
                <td data-label="Records the stroke">
                  After the hole, from memory
                </td>
                <td data-label="Needs battery">No</td>
                <td data-label="Does the math">No</td>
                <td data-label="Fails when">
                  You forget what happened on the hole you just played
                </td>
              </tr>
              <tr>
                <th scope="row">Bead or clicker counter</th>
                <td data-label="Records the stroke">
                  As it happens, if you remember to click
                </td>
                <td data-label="Needs battery">No</td>
                <td data-label="Does the math">No</td>
                <td data-label="Fails when">
                  You forget to click, or you forget whether you clicked
                </td>
              </tr>
              <tr className="cmp-us">
                <th scope="row">One-tap counter app</th>
                <td data-label="Records the stroke">As it happens</td>
                <td data-label="Needs battery">Yes</td>
                <td data-label="Does the math">Yes</td>
                <td data-label="Fails when">
                  The app makes you do more than tap
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Read that table honestly and the pencil is not embarrassed by it. A
          pencil is free, needs no charging and is accepted at every course on
          earth. Its one flaw is fatal, though:{" "}
          <strong>
            a pencil records the number after the hole is over, which means you
            still had to carry it in your head for the whole hole.
          </strong>{" "}
          The pencil is not the counting mechanism. Your working memory is the
          counting mechanism, and the pencil is just where the answer gets
          filed.
        </p>
        <p>
          That is the entire problem, and it is why{" "}
          <Link href="/guides/lost-count-of-strokes-what-to-do/">
            &ldquo;I lost count and I don&apos;t know what I shot&rdquo;
          </Link>{" "}
          is a thing that happens to careful, intelligent, attentive people
          every weekend.
        </p>

        <h2>What separates a good stroke counter from a bad one</h2>
        <p>
          There are a handful of one-tap counters in the app stores. Most were
          built in a weekend and abandoned. If you are evaluating one, here is
          the list that actually predicts whether you will still be using it in
          October:
        </p>
        <ul>
          <li>
            <strong>One tap per stroke. Truly one.</strong> If you have to open
            a scorecard grid, find the right hole, and increment a cell, that is
            three taps and a decision, and you will stop doing it by the fourth
            hole.
          </li>
          <li>
            <strong>An undo.</strong> You will fat-finger it. A counter without
            an undo is a counter you cannot trust, and a count you cannot trust
            is worse than no count at all.
          </li>
          <li>
            <strong>It works with a glove on, at arm&apos;s length, in sun.</strong>{" "}
            This means one enormous target, not a row of small ones.
          </li>
          <li>
            <strong>Fully offline.</strong> A counter needs no map data and no
            server. There is no honest reason for one to fail in a dead zone.
          </li>
          <li>
            <strong>No account before your first round.</strong> Nobody wants to
            create a password on the first tee.
          </li>
          <li>
            <strong>No ads.</strong> An ad between you and your score is a
            product telling you what it is really for.
          </li>
          <li>
            <strong>On your wrist.</strong> The best possible home for a stroke
            counter is a watch, because it is the only screen you do not have to
            take out of your pocket.
          </li>
        </ul>

        <h2>Why the big golf apps don&apos;t solve this</h2>
        <p>
          They&apos;re not trying to. Inside 18Birdies, Golfshot or SwingU, the
          scorecard is a rounding error: one screen among fifty, competing for
          attention with GPS overlays, green maps, handicap tools, side games
          and a social feed. Nobody at those companies is being paid to make
          entering a stroke take one fewer tap, and it shows.
        </p>
        <p>
          There is also a structural reason. Subscription apps have to keep
          adding features to justify next year&apos;s renewal, which means every
          screen gets busier every year, forever. Complexity is not a bug in
          that business model. It is the business model. A free counter has no
          such pressure, which is why it can afford to stay finished.
        </p>
        <div className="callout">
          <p>
            None of which makes those apps bad. If you want strokes gained
            analytics, buy Arccos. If you want yardages, get a GPS app. We wrote
            an honest breakdown of{" "}
            <Link href="/compare/">
              how SimplyStroke compares to the big golf apps
            </Link>
            , including the things they do that we don&apos;t.
          </p>
        </div>

        <h2>How SimplyStroke does it</h2>
        <p>
          SimplyStroke is the whole of the list above and nothing else. The
          screen is one golf ball. You tap it. The number goes up. If you
          mis-tap, you undo. At the end of the hole you swipe to the next one,
          and at the end of the round there is a finished scorecard with the
          math already done.
        </p>
        <p>
          There is no GPS, no handicap posting, no strokes gained, no feed, no
          ads, and no subscription. It works offline, it works on your wrist, and
          it does not ask who you are before it will let you play golf.
        </p>
        <p>
          It launches in 2026 on iPhone, Android and Apple Watch, and it is
          free.
        </p>

        <div className="verdict">
          <div className="verdict-head">The honest version</div>
          <p>
            <strong>If you want to get better at golf, this is not the app.</strong>{" "}
            Buy sensors, get a coach, track your strokes gained. Those things
            work and SimplyStroke does not compete with them.
          </p>
          <p>
            <strong>
              But if the only thing that keeps going wrong is the count
            </strong>{" "}
            — you reach the green and genuinely do not know whether that putt is
            for four or five — that is a different problem, and none of the big
            apps solve it, because they are all busy solving something bigger.
          </p>
        </div>

        <h2>If you lose count more than most people do</h2>
        <p>
          Some golfers lose the count occasionally. Some lose it every single
          hole, every single round, and have spent years being told to
          concentrate harder.
        </p>
        <p>
          That is not carelessness. Holding a running number across a ten-minute
          hole while planning shots, walking, talking and looking for a ball is
          a prospective memory task, and prospective memory is measurably harder
          if you have ADHD. Roughly 15.5 million American adults have a current
          ADHD diagnosis, and more than half were diagnosed as adults, which
          means a great many people are quietly blaming themselves for something
          with a name.
        </p>
        <p>
          We wrote about that at length, with the research, here:{" "}
          <Link href="/adhd-golf/">ADHD and golf: why the count vanishes</Link>.
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

      </article>

      <WaitlistSection
        source="golf-stroke-counter"
        heading="Stop holding the number."
      />
    </main>
  );
}
