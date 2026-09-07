import type { Metadata } from "next";
import Link from "next/link";
import PrimaryCta from "@/components/PrimaryCta";
import { APP_STORE_URL, og } from "@/lib/site";
import styles from "./pro.module.css";

const TITLE = "SimplyStroke Pro: Remember More From Every Round";
const DESCRIPTION =
  "SimplyStroke Pro adds complete history, season stats, course playbooks, goals, crews, trips, private journals, scorecard scanning, and optional private shot details on iPhone and Apple Watch.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/pro/" },
  openGraph: og(TITLE, DESCRIPTION, "/pro/"),
};

const rows = [
  ["Unlimited iPhone & Watch scoring", true, true],
  ["Backup & sync across your devices", true, true],
  ["Standard live group play", true, true],
  ["Complete round history", false, true],
  ["Season stats, goals & records", false, true],
  ["Course playbooks & challenges", false, true],
  ["Saved crews & multi-round trips", false, true],
  ["Private journals & scorecard scanning", false, true],
] as const;

const featureGroups = [
  {
    number: "01",
    eyebrow: "Your season",
    title: "See the story behind the scores.",
    body: "Keep your complete history, separate 9-hole and 18-hole trends, personal records, and a shareable season recap. Free scoring never stops; Pro keeps every completed card within reach.",
    accent: "42 rounds kept",
  },
  {
    number: "02",
    eyebrow: "Your courses",
    title: "Return with a plan.",
    body: "Course playbooks turn past rounds into hole averages, front-and-back patterns, personal bests, goals, and a clearly labeled best-ever composite card.",
    accent: "Playbook ready",
  },
  {
    number: "03",
    eyebrow: "Your people",
    title: "Keep the crew together.",
    body: "Save regular groups, revisit shared results, and connect several rounds into one golf trip. One Pro organizer can invite friends who continue to play free.",
    accent: "3 rounds · 4 golfers",
  },
  {
    number: "04",
    eyebrow: "Your memory",
    title: "Remember the shot, not just the number.",
    body: "Add private round notes and photos. From More on iPhone or Apple Watch, optionally attach a club or dictated text to your latest stroke. SimplyStroke stores the returned text, not a raw voice recording.",
    accent: "7 iron · pulled left",
  },
  {
    number: "05",
    eyebrow: "Paper to history",
    title: "Scan it. Check it. Keep it.",
    body: "Photograph a paper scorecard and review the recognized course, date, player, scores, and par before anything is saved. Recognition runs on the iPhone and the source photo stays temporary.",
    accent: "Draft · review every value",
  },
  {
    number: "06",
    eyebrow: "Private by default",
    title: "Your details stay yours.",
    body: "Notes, photos, and shot details stay out of public cards, group scoreboards, recap emails, and shared images unless a future sharing action explicitly says otherwise.",
    accent: "Only you",
  },
];

export default function ProPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>SimplyStroke Pro</p>
            <h1>
              Play more.
              <span>Remember more.</span>
            </h1>
            <p className={styles.heroLede}>
              Scoring stays simple. Pro turns the rounds you already played into
              a season you can revisit, learn from, and share.
            </p>
            <div className={styles.heroActions}>
              <PrimaryCta
                event="app_store_click"
                ctaLocation="pro_hero"
                href={APP_STORE_URL}
                tone="light"
                size="large"
                apple
              >
                Get SimplyStroke
              </PrimaryCta>
              <a href="#compare">Compare Free + Pro</a>
            </div>
            <p className={styles.freePromise}>
              Core iPhone and Apple Watch scoring stays free. Older cards are
              retained even when they are outside the Free history window.
            </p>
          </div>

          <div className={styles.memoryStack} aria-label="Examples of SimplyStroke Pro memories">
            <article className={`${styles.memoryCard} ${styles.memoryCardBack}`}>
              <span>Trip 03</span>
              <strong>Pinehurst weekend</strong>
              <small>3 rounds · 4 golfers</small>
            </article>
            <article className={`${styles.memoryCard} ${styles.memoryCardMiddle}`}>
              <span>Course playbook</span>
              <strong>Hole 7</strong>
              <small>Best 4 · Average 5.2</small>
            </article>
            <article className={styles.memoryCard}>
              <div className={styles.cardTopline}>
                <span>Round journal</span>
                <b>Private</b>
              </div>
              <p className={styles.cardScore}>84</p>
              <strong>Best back nine this season.</strong>
              <small>7 iron · smooth tempo · pin high</small>
              <div className={styles.cardRule} />
              <em>October 12 · Mill Pond Golf</em>
            </article>
          </div>
        </div>
      </header>

      <section className={styles.outcomeRail} aria-label="SimplyStroke Pro outcomes">
        <div><span>Every round</span><strong>Kept close</strong></div>
        <div><span>Every course</span><strong>More familiar</strong></div>
        <div><span>Every golf trip</span><strong>Worth revisiting</strong></div>
      </section>

      <section id="compare" className={styles.compareSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>Choose your pace</p>
          <h2>Keep score free. Keep the whole story with Pro.</h2>
          <p>
            Free covers the round in front of you. Pro is for golfers who want
            to remember the season behind them.
          </p>
        </div>
        <div className={styles.comparison} role="table" aria-label="Free and Pro feature comparison">
          <div className={styles.comparisonHead} role="row">
            <span role="columnheader">What SimplyStroke does</span>
            <strong role="columnheader">Free</strong>
            <strong role="columnheader">Pro</strong>
          </div>
          {rows.map(([label, free, pro]) => (
            <div className={styles.comparisonRow} role="row" key={label}>
              <span role="cell">{label}</span>
              <b role="cell" className={free ? styles.yes : styles.no} aria-label={free ? "Included" : "Not included"}>
                {free ? "✓" : "×"}
              </b>
              <b role="cell" className={pro ? styles.yes : styles.no} aria-label={pro ? "Included" : "Not included"}>
                {pro ? "✓" : "×"}
              </b>
            </div>
          ))}
          <p className={styles.comparisonNote}>
            Free shows your latest 10 completed rounds plus protected older
            cards. Nothing is deleted when a card leaves that visible window.
          </p>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>What Pro gives you</p>
          <h2>More meaning without more work.</h2>
          <p>
            Pro builds on the score you already entered. No swing sensors, no
            manual stat sheet, and no handicap math pretending to know more than
            the card does.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {featureGroups.map((feature) => (
            <article className={styles.featureCard} key={feature.number}>
              <div className={styles.featureMeta}>
                <span>{feature.number}</span>
                <p>{feature.eyebrow}</p>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <strong>{feature.accent}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.trustSection}>
        <div className={styles.trustCopy}>
          <p className={styles.kicker}>Built around trust</p>
          <h2>Your round never depends on the subscription.</h2>
          <p>
            Count strokes first. Billing, uploads, scanning, and reports stay
            outside the core scoring path. If Pro ends, your rounds and private
            content remain retained, and you can still read or delete them.
          </p>
        </div>
        <ul>
          <li><strong>Scoring stays free</strong><span>Unlimited rounds on iPhone and Apple Watch.</span></li>
          <li><strong>Private stays private</strong><span>Journal and shot details never appear in standard sharing.</span></li>
          <li><strong>You approve every scan</strong><span>Recognized values are a draft until you review and save.</span></li>
          <li><strong>Your friends play free</strong><span>A Pro organizer can invite the crew without charging everyone.</span></li>
        </ul>
      </section>

      <section className={styles.pricingSection}>
        <div className={styles.pricingCopy}>
          <p className={styles.kicker}>One Pro. Two billing choices.</p>
          <h2>Same features. Pick the cadence that fits.</h2>
          <p>
            Subscribe inside the iPhone app. Apple confirms the exact local
            price and renewal terms before purchase.
          </p>
        </div>
        <div className={styles.plans}>
          <article className={`${styles.plan} ${styles.planFeatured}`}>
            <span>Annual</span>
            <p><strong>$19.99</strong> / year</p>
            <b>Save 44% compared with 12 monthly payments</b>
          </article>
          <article className={styles.plan}>
            <span>Monthly</span>
            <p><strong>$2.99</strong> / month</p>
            <b>Same Pro features</b>
          </article>
        </div>
        <PrimaryCta
          event="app_store_click"
          ctaLocation="pro_pricing"
          href={APP_STORE_URL}
          size="large"
          apple
        >
          Open SimplyStroke on the App Store
        </PrimaryCta>
        <small>U.S. pricing shown. Subscriptions renew automatically unless cancelled before renewal.</small>
      </section>

      <section className={styles.finalSection}>
        <p className={styles.kicker}>Golf&apos;s simplest stroke counter</p>
        <h2>Start free. Go Pro when the rounds become memories.</h2>
        <div>
          <PrimaryCta
            event="app_store_click"
            ctaLocation="pro_final"
            href={APP_STORE_URL}
            tone="light"
            size="large"
            apple
          >
            Download SimplyStroke
          </PrimaryCta>
          <Link href="/features/">See every feature →</Link>
        </div>
      </section>
    </main>
  );
}
