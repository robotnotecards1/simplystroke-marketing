import type { Metadata } from "next";
import Link from "next/link";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuideEngagement from "@/components/GuideEngagement";
import StoreBadges from "@/components/StoreBadges";
import TrackedCta from "@/components/TrackedCta";
import { og, APP_STORE_URL, APP_URL } from "@/lib/site";
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

// CTAs are TrackedCta (components/TrackedCta.tsx — see
// docs/handoffs/tracked-cta-events.md). Slots on this page: stroke_hero (App
// Store + web), stroke_comparison, stroke_final, plus stroke_badge_appstore on
// the StoreBadges Apple badge. guide_engaged fires via <GuideEngagement/>.

// Title carries the app/category intent; the H1 carries the user outcome — so
// the two are no longer identical (was flagged as a duplicate title/H1 pair).
const TITLE = "Golf Stroke Counter App for iPhone & Apple Watch";
const DESCRIPTION =
  "A simple golf stroke counter for iPhone and Apple Watch. Tap after each shot, undo mistakes, and finish with a complete scorecard. Free, no account to start.";
const PATH = "/golf-stroke-counter/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH),
};

const faqs: Faq[] = [
  {
    q: "What counts as a stroke?",
    a: "Every time you make a swing at the ball it counts as one stroke, and so does a penalty. With SimplyStroke you tap once per swing — whiffs and penalty strokes included — and the app keeps the running total so you never have to reconstruct it on the green.",
  },
  {
    q: "Does it work on Apple Watch?",
    a: "Yes. SimplyStroke runs on Apple Watch as well as iPhone, so you can tap the count on your wrist without taking your phone out of your pocket. The watch is the best home for a stroke counter — it is the only screen you never have to reach for.",
  },
  {
    q: "Does it work without signal?",
    a: "Yes. A stroke counter needs no map data and no server, so there is no reason for it to fail in a dead zone. SimplyStroke's solo scoring works fully offline — if an app that only counts to five stops working on the back nine, that is a design choice, not a technical limit.",
  },
  {
    q: "Is it free?",
    a: "Yes. SimplyStroke is free on the App Store for iPhone and Apple Watch, and it also plays in your browser at app.simplystroke.app. No account is needed to start a round. Android is coming soon to Google Play.",
  },
  {
    q: "What is the difference between a stroke counter and a GPS or shot tracker?",
    a: "A shot tracker analyzes your golf; a stroke counter only counts it. Shot trackers such as Arccos and Shot Scope use club sensors and GPS to work out which club you hit and how far it went. A stroke counter has no opinion about your golf — it just makes sure the number is right when you reach the green.",
  },
];

const jsonLd = graph(
  organizationNode,
  teamNode,
  websiteNode,
  appNode,
  articleNode({
    headline: "Golf stroke counter apps: how they work and which to use",
    description: DESCRIPTION,
    path: PATH,
    datePublished: "2026-07-11",
    dateModified: "2026-08-09",
    about: APP_ID,
  }),
  faqNode(faqs),
  breadcrumbNode([{ name: "Golf stroke counters", path: PATH }])
);

export default function GolfStrokeCounterPage() {
  return (
    <main>
      <GuideEngagement />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ---------- Hero: answer + demonstrate ---------- */}
      <section className="ss-hero">
        <span className="ss-hero-blob-a" />
        <span className="ss-hero-blob-b" />
        <div className="container ss-hero-inner">
          <div className="ss-hero-copy">
            <div className="ss-hero-eyebrow">
              Golf stroke counter · iPhone + Apple Watch
            </div>
            <h1 className="ss-hero-h1">
              Count every golf stroke with <span className="accent">one tap.</span>
            </h1>
            <p className="ss-hero-p">
              Tap after each shot. SimplyStroke keeps the hole total, the round
              total and your score to par, then finishes the scorecard for you —
              no GPS, no math, no losing count on the walk to the green.
            </p>
            <div className="ss-hero-cta">
              <TrackedCta
                event="app_store_click"
                ctaLocation="stroke_hero"
                href={APP_STORE_URL}
                className="btn btn-hero"
              >
                Download free on the App Store
              </TrackedCta>
              <TrackedCta
                event="web_app_click"
                ctaLocation="stroke_hero"
                href={APP_URL}
                className="btn btn-fold"
              >
                Try it in your browser
              </TrackedCta>
            </div>
            <p className="ss-hero-p" style={{ fontSize: 15, marginTop: 18, opacity: 0.85 }}>
              No account to start · Undo mistakes · Works without course signal
            </p>
          </div>
          <div className="ss-hero-phonewrap">
            <img
              src="/images/app-screens/round.png"
              alt="SimplyStroke active-round screen: one giant golf-ball button showing the current stroke count."
              className="ss-hero-float"
              style={{
                width: 300,
                maxWidth: "100%",
                height: "auto",
                borderRadius: 40,
                boxShadow: "0 40px 80px rgba(0,0,0,0.45)",
              }}
            />
          </div>
        </div>
      </section>

      <Breadcrumbs crumbs={[{ name: "Golf stroke counters", path: PATH }]} />

      {/* ---------- Three-step demonstration ---------- */}
      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">How it works</span>
          <h2 className="h2-display" style={{ margin: "8px 0 28px" }}>
            A round in three taps.
          </h2>
          <div className="demo-steps">
            {[
              {
                img: "home.png",
                n: "1",
                cap: "Start a round",
                sub: "One tap on the tee. No setup, no account.",
              },
              {
                img: "round.png",
                n: "2",
                cap: "Tap after each shot",
                sub: "The count goes up. Mis-tap? One undo fixes it.",
              },
              {
                img: "scorecard.png",
                n: "3",
                cap: "Finish with a scorecard",
                sub: "The hole, the round and your score to par — added up for you.",
              },
            ].map((s) => (
              <figure className="demo-step" key={s.n}>
                <img
                  src={`/images/app-screens/${s.img}`}
                  alt={`SimplyStroke step ${s.n}: ${s.cap}.`}
                  loading="lazy"
                  style={{ width: "100%", height: "auto", borderRadius: 22, display: "block" }}
                />
                <figcaption>
                  <span className="demo-step-cap">
                    <b>{s.n}.</b> {s.cap}
                  </span>
                  <span className="demo-step-sub">{s.sub}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <article className="prose">
        <AnswerBlock
          updated="August 2026"
          answer={
            <>
              A golf stroke counter is an app or device whose only job is to
              record how many shots you have taken, without GPS, handicaps or
              analytics. Unlike shot-tracking platforms such as Arccos or Shot
              Scope, a stroke counter does not try to improve your golf. It just
              makes sure the number is right.{" "}
              <strong>
                SimplyStroke is a free, one-tap stroke counter
              </strong>{" "}
              for iPhone and Apple Watch on the App Store, and playable in your
              browser, with Android coming soon.
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
          Every golfer has had that moment. Some golfers have it every hole. A
          one-tap counter exists to make it stop.
        </p>

        <h2>Stroke counter vs. shot tracker</h2>
        <p>
          A stroke counter records how many shots you have taken. That is the
          whole definition, and the definition is the point, because{" "}
          <strong>
            almost every app that claims to &ldquo;track your strokes&rdquo; is
            doing something else entirely.
          </strong>
        </p>
        <ul>
          <li>
            <strong>A shot tracker analyzes your golf.</strong> Arccos and Shot
            Scope screw sensors into your grips, watch where the ball goes, and
            hand you strokes-gained numbers. They are excellent, and they are
            trying to make you better.
          </li>
          <li>
            <strong>A stroke counter has no opinion about your golf.</strong> It
            does not know which club you hit or how far it went. It knows you
            swung, and that is all it needs to know.
          </li>
        </ul>
        <p>
          One is a coach. The other is a memory. If you searched for a
          &ldquo;golf shot tracking app&rdquo; and got results that want $200 a
          year and a set of sensors, that is because you were using the
          coach&apos;s word for the memory&apos;s job.
        </p>
      </article>

      {/* ---------- Clarify physical vs digital intent ---------- */}
      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">Clicker vs. app</span>
          <h2 className="h2-display" style={{ margin: "8px 0 6px" }}>
            A clicker counts. SimplyStroke also finishes the card.
          </h2>
          <div className="cmp-wrap" style={{ marginTop: 24 }}>
            <table className="cmp">
              <caption>How the three methods compare. As of August 2026.</caption>
              <thead>
                <tr>
                  <th scope="col">Method</th>
                  <th scope="col">Records the stroke</th>
                  <th scope="col">Undo</th>
                  <th scope="col">Totals the card</th>
                  <th scope="col">Apple Watch</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Pencil scorecard</th>
                  <td data-label="Records the stroke">After the hole, from memory</td>
                  <td data-label="Undo">Eraser</td>
                  <td data-label="Totals the card">No</td>
                  <td data-label="Apple Watch">No</td>
                </tr>
                <tr>
                  <th scope="row">Bead or clicker</th>
                  <td data-label="Records the stroke">As it happens, if you remember to click</td>
                  <td data-label="Undo">Manual</td>
                  <td data-label="Totals the card">No</td>
                  <td data-label="Apple Watch">No</td>
                </tr>
                <tr className="cmp-us">
                  <th scope="row">SimplyStroke</th>
                  <td data-label="Records the stroke">As it happens, one tap</td>
                  <td data-label="Undo">One tap</td>
                  <td data-label="Totals the card">Yes</td>
                  <td data-label="Apple Watch">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ss-hero-cta" style={{ marginTop: 28 }}>
            <TrackedCta
              event="app_store_click"
              ctaLocation="stroke_comparison"
              href={APP_STORE_URL}
              className="btn btn-hero"
            >
              Get SimplyStroke free
            </TrackedCta>
          </div>
        </div>
      </section>

      <article className="prose">
        <p>
          Read that table honestly and the pencil is not embarrassed by it. A
          pencil is free, needs no charging and is accepted at every course on
          earth. Its one flaw is fatal, though:{" "}
          <strong>
            a pencil records the number after the hole is over, which means you
            still had to carry it in your head for the whole hole.
          </strong>{" "}
          That is the entire problem, and it is why{" "}
          <Link href="/guides/lost-count-of-strokes-what-to-do/">
            &ldquo;I lost count and I don&apos;t know what I shot&rdquo;
          </Link>{" "}
          happens to careful, attentive people every weekend.
        </p>

        <h2>What separates a good stroke counter from a bad one</h2>
        <p>
          There are a handful of one-tap counters in the app stores. Most were
          built in a weekend and abandoned. Here is the short list that predicts
          whether you will still be using one in October:
        </p>
        <ul>
          <li>
            <strong>One tap per stroke. Truly one.</strong> If you have to open a
            grid, find the hole, and increment a cell, that is three taps and a
            decision, and you will stop by the fourth hole.
          </li>
          <li>
            <strong>An undo.</strong> You will fat-finger it. A count you cannot
            trust is worse than no count at all.
          </li>
          <li>
            <strong>Works with a glove on, at arm&apos;s length, in sun.</strong>{" "}
            One enormous target, not a row of small ones.
          </li>
          <li>
            <strong>Fully offline, and on your wrist.</strong> A counter needs no
            server, and the best home for it is the watch you never have to reach
            for.
          </li>
          <li>
            <strong>No account before your first round.</strong> Nobody wants to
            make a password on the first tee.
          </li>
        </ul>

        <div className="callout">
          <p>
            None of which makes the big apps bad. If you want strokes-gained
            analytics, buy Arccos. If you want yardages, get a GPS app. We wrote
            an honest breakdown of{" "}
            <Link href="/compare/">how SimplyStroke compares to the big golf apps</Link>,
            including the things they do that we don&apos;t.
          </p>
        </div>

        <div className="verdict">
          <div className="verdict-head">The honest version</div>
          <p>
            <strong>If you want to get better at golf, this is not the app.</strong>{" "}
            Buy sensors, get a coach, track your strokes gained. Those things work
            and SimplyStroke does not compete with them.
          </p>
          <p>
            <strong>But if the only thing that keeps going wrong is the count</strong>{" "}
            — you reach the green and genuinely do not know whether that putt is
            for four or five — that is a different problem, and none of the big
            apps solve it, because they are all busy solving something bigger.
          </p>
        </div>

        <h2>If you lose count more than most people do</h2>
        <p>
          Some golfers lose the count occasionally. Some lose it every single
          hole and have spent years being told to concentrate harder. That is not
          carelessness — holding a running number across a ten-minute hole while
          planning shots, walking and looking for a ball is a prospective-memory
          task, and prospective memory is measurably harder if you have ADHD. We
          wrote about that, with the research, here:{" "}
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

        <div className="author-box">
          <div>
            <div className="author-box-name">The SimplyStroke Team</div>
            <p>
              We built SimplyStroke after one too many rounds spent reconstructing
              our own scores on the walk to the next tee.{" "}
              <Link href="/about/">More about why it exists</Link>.
            </p>
          </div>
        </div>
      </article>

      {/* ---------- Final CTA (replaces the pre-launch FinalCta) ---------- */}
      <section
        className="section"
        style={{
          background:
            "linear-gradient(165deg, rgba(27,67,50,0.95), rgba(45,106,79,0.9)), url('/images/watch-course-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--offwhite)",
          textAlign: "center",
        }}
      >
        <div className="section-inner section-narrow">
          <h2 className="h2-display" style={{ color: "#fff" }}>
            Know the number before you reach the green.
          </h2>
          <p className="section-lede" style={{ color: "rgba(255,255,255,0.9)", marginTop: 12 }}>
            Free on the App Store for iPhone and Apple Watch. No account to start.
            Android coming soon.
          </p>
          <div className="ss-hero-cta" style={{ justifyContent: "center", marginTop: 24 }}>
            <TrackedCta
              event="app_store_click"
              ctaLocation="stroke_final"
              href={APP_STORE_URL}
              className="btn btn-hero"
            >
              Download SimplyStroke free
            </TrackedCta>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 22 }}>
            <StoreBadges ctaLocation="stroke_badge_appstore" />
          </div>
        </div>
      </section>
    </main>
  );
}
