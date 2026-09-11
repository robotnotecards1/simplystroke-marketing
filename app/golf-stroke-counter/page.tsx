import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnswerBlock from "@/components/AnswerBlock";
import GuideEngagement from "@/components/GuideEngagement";
import HomeDemo from "@/components/HomeDemo";
import HomeHeroDevices from "@/components/HomeHeroDevices";
import HomeMotionGate from "@/components/HomeMotionGate";
import PrimaryCta from "@/components/PrimaryCta";
import StoreBadges from "@/components/StoreBadges";
import TrackedCta from "@/components/TrackedCta";
import { og, APP_STORE_URL } from "@/lib/site";
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
import homeStyles from "../home.module.css";
import styles from "./page.module.css";

// CTAs are TrackedCta (components/TrackedCta.tsx — see
// docs/handoffs/tracked-cta-events.md). Slots on this page: stroke_hero,
// stroke_comparison, stroke_final, plus stroke_badge_appstore on
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

const citations: Citation[] = [
  {
    name: "Complex Prospective Memory in Adults with Attention Deficit Hyperactivity Disorder",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3590133/",
  },
  {
    name: "USGA Rules of Golf: Definitions — Stroke",
    url: "https://www.usga.org/content/usga/home-page/rules-hub/rules-modernization/major-changes/definitions.html",
  },
];

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
    a: "Yes. SimplyStroke's solo scoring is saved on your device and needs no course signal, so a dead zone on the back nine never costs you your round. (Live group scoring does need a connection.) If an app that only counts to five stops working on the back nine, that is a design choice, not a technical limit.",
  },
  {
    q: "Is it free?",
    a: "Yes. SimplyStroke is free on the App Store for iPhone and Apple Watch, and it also plays in your browser at app.simplystroke.app. No account is needed to start a round. Android is coming soon to Google Play.",
  },
  {
    q: "What is the difference between a stroke counter and a GPS or shot tracker?",
    a: "A shot tracker analyzes your golf; a stroke counter only counts it. Shot trackers such as Arccos and Shot Scope use club sensors and GPS to work out which club you hit and how far it went. A stroke counter has no opinion about your golf — it just makes sure the number is right when you reach the green.",
  },
  {
    q: "Is a golf shot counter the same as a stroke counter?",
    a: "Yes. \"Golf shot counter,\" \"golf score counter,\" and \"golf stroke counter\" all describe the same thing: something that records how many swings you have taken. \"Stroke\" is the official USGA term, but most golfers search for whichever phrase feels natural. SimplyStroke works whichever name you found it under.",
  },
  {
    q: "Are golf stroke counter beads worth it?",
    a: "Bead counters and clicker rings are cheap and need no battery, which is a real advantage. The trade-off is that they count the hole but do not total the card — you still have to transfer numbers to paper and add them up yourself. If you want a finished scorecard at the end of the round without the mental math, an app does that part for you.",
  },
  {
    q: "What is a golf clicker?",
    a: "A golf clicker is a small mechanical counter you press after each stroke. Some clip to a bag, some wrap around a finger. They solve the mid-hole count problem the same way an app does — one click per swing — but they do not produce a scorecard, track par, or undo a miscount. SimplyStroke adds all three for free.",
  },
];

const jsonLd = graph(
  organizationNode,
  personNode,
  teamNode,
  websiteNode,
  appNode,
  articleNode({
    headline: "Golf stroke counter apps: how they work and which to use",
    description: DESCRIPTION,
    path: PATH,
    datePublished: "2026-07-11",
    dateModified: "2026-09-07",
    about: APP_ID,
    citations,
    author: MIKE_ID,
  }),
  faqNode(faqs),
  breadcrumbNode([{ name: "Golf stroke counters", path: PATH }])
);

export default function GolfStrokeCounterPage() {
  return (
    <main className={homeStyles.home}>
      <HomeMotionGate />
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
            <div className={styles.heroAction}>
              <PrimaryCta
                event="app_store_click"
                ctaLocation="stroke_hero"
                tone="light"
                href={APP_STORE_URL}
                className={`${homeStyles.primaryCta} ${styles.heroStoreCta}`}
                size="large"
                apple
                subtitle="on the App Store"
              >
                Free download
              </PrimaryCta>
              <p className={styles.reassurance}>
                No account required <span aria-hidden="true">·</span> Core scoring stays free <span aria-hidden="true">·</span> Solo rounds work offline
              </p>
            </div>
          </div>
          <div className={styles.heroDevices}>
            <HomeHeroDevices />
          </div>
        </div>
      </section>

      {/* ---------- The same real, interactive product view used on the homepage ---------- */}
      <section className={`${homeStyles.section} ${homeStyles.demoSection}`} data-home-motion>
        <div className={homeStyles.wrap}>
          <HomeDemo className={styles.compactDemo} />
          <ol className={styles.roundSteps} aria-label="A round in three steps">
            <li>
              <span>01</span>
              <div>
                <strong>Start the round</strong>
                <p>No account or setup before your first shot.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Tap after each shot</strong>
                <p>Your count updates on iPhone and Apple Watch.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Finish the scorecard</strong>
                <p>Every hole and total is already added up.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <article className="prose" style={{ paddingTop: "clamp(28px, 3vw, 40px)" }}>
        <AnswerBlock
          updated="September 2026"
          answer={
            <>
              A <strong>golf stroke counter</strong> (also called a golf shot
              counter or golf score counter) is an app or device whose only job
              is to record how many shots you have taken, without GPS, handicaps
              or analytics. Unlike shot-tracking platforms such as Arccos or Shot
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
              The good ones need <strong>one tap per shot</strong>, work
              offline for a solo round, and need no account before your first
              round
            </>,
            <>
              Core stroke counting should not require a premium GPS
              subscription &mdash; SimplyStroke lets you count and complete a
              solo round for free
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

        <h2>What is a golf stroke counter?</h2>
        <p>
          Under the{" "}
          <a href="https://www.usga.org/content/usga/home-page/rules-hub/rules-modernization/major-changes/definitions.html" target="_blank" rel="noopener">
            USGA Rules of Golf
          </a>
          , a stroke is any forward motion of the club made with the intent to
          hit the ball. Whiffs count. Penalty strokes count. A stroke counter
          records each one as it happens so you do not have to hold the number
          in your head.
        </p>
        <p>
          If you searched for &ldquo;golf shot counter&rdquo; or
          &ldquo;golf score counter,&rdquo; you are looking for the same thing.
          The terms are interchangeable. &ldquo;Stroke&rdquo; is the Rules word;
          &ldquo;shot&rdquo; is what most people say on the course.
        </p>
        <p>
          <strong>
            Almost every app that claims to &ldquo;track your strokes&rdquo; is
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

      <section className={styles.watchStory} aria-labelledby="watch-story-title">
        <div className={styles.watchStoryImage}>
          <Image
            src="/images/watch-course-bg.webp"
            alt="A golfer wearing Apple Watch with the SimplyStroke stroke counter open on the course"
            fill
            loading="lazy"
            sizes="(max-width: 800px) 100vw, 62vw"
          />
        </div>
        <div className={styles.watchStoryCopy}>
          <span>Apple Watch built in</span>
          <h2 id="watch-story-title">The count stays on your wrist.</h2>
          <p>
            Log the shot where the number is easiest to reach. The same round
            stays in sync on your nearby iPhone, and solo scoring keeps working
            when the course signal disappears.
          </p>
          <Link href="/#apple-watch">See Apple Watch scoring →</Link>
        </div>
      </section>

      {/* ---------- Clarify physical vs digital intent ---------- */}
      <section className={`${styles.comparisonSection} section`} style={{ paddingTop: "clamp(28px, 3vw, 40px)", paddingBottom: "clamp(24px, 3vw, 36px)" }}>
        <div className="section-inner">
          <span className="eyebrow">Clicker vs. app</span>
          <h2 className="h2-display" style={{ margin: "8px 0 6px" }}>
            A clicker counts. SimplyStroke also finishes the card.
          </h2>
          <div className="cmp-wrap" style={{ marginTop: 24 }}>
            <table className="cmp">
              <caption>How the three methods compare. As of September 2026.</caption>
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

      <article className={`prose ${styles.comparisonArticle}`}>
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

        <h2>Golf clicker, bead counter, or stroke counter app?</h2>
        <p>
          Golf clickers, bead counters and stroke-counter bracelets have been
          around for decades. A mechanical clicker clips to your bag or wraps
          around a finger; a bead counter is a string of beads you slide after
          each swing. Both solve the mid-hole problem the same way an app does:
          one physical action per stroke, so the number is never just in your
          head.
        </p>
        <p>
          The advantage is obvious: no battery, no screen, no technology to
          learn. If all you need is a running count for the current hole and you
          are happy transferring that number to paper at the green, a clicker or
          bead counter does that job for a few dollars.
        </p>
        <p>
          Where they fall short is everything after the count. A clicker does not
          total the card, does not track par, does not give you a finished
          scorecard you can review after the round, and cannot undo a misclick
          except by carefully counting backwards. A stroke counter app adds all
          of that without adding any extra taps during the hole. SimplyStroke
          records the stroke in one tap on your Apple Watch, totals the round as
          you go, and hands you a complete scorecard when you finish.
        </p>

        <h2>Best golf stroke counter: what to look for</h2>
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
            <strong>Works offline, and on your wrist.</strong> Your solo round
            is saved on your device and needs no course signal, and the best
            home for it is the watch you never have to reach for.
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
      </article>

      <figure className={styles.focusPhoto}>
        <Image
          src="/images/photos/66454.jpg"
          alt="A golfer reading a putt while focusing on the next shot"
          width={1600}
          height={1046}
          loading="lazy"
          sizes="100vw"
        />
        <figcaption>
          <strong>Keep the number out of your head.</strong>
          <span>Golf already gives you enough to think about.</span>
        </figcaption>
      </figure>

      <article className={`prose ${styles.followupArticle}`}>
        <h2>If you lose count more than most people do</h2>
        <p>
          Some golfers lose the count occasionally. Some lose it every single
          hole and have spent years being told to concentrate harder. That is not
          carelessness — holding a running number across a ten-minute hole while
          planning shots, walking and looking for a ball is a{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3590133/" target="_blank" rel="noopener">prospective-memory
          task</a>, and prospective memory is measurably harder if you have ADHD.
          We wrote about that, with the research, here:{" "}
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

        <h2>Keep reading</h2>
        <ul>
          <li>
            <Link href="/guides/how-to-keep-score-in-golf/">
              How to keep score in golf: the complete beginner guide
            </Link>
          </li>
          <li>
            <Link href="/guides/how-to-read-a-golf-scorecard/">
              How to read a golf scorecard
            </Link>
          </li>
          <li>
            <Link href="/guides/golf-scorecard-symbols-and-terms/">
              Golf scorecard symbols and terms explained
            </Link>
          </li>
          <li>
            <Link href="/guides/lost-count-of-strokes-what-to-do/">
              Lost count of strokes: what to do
            </Link>
          </li>
          <li>
            <Link href="/compare/">
              How SimplyStroke compares to the big golf apps
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
          <p className="section-lede" style={{ color: "rgba(255,255,255,0.9)", marginTop: 12, marginInline: "auto" }}>
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
