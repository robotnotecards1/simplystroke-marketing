import type { Metadata } from "next";
import Link from "next/link";
import PrimaryCta from "@/components/PrimaryCta";
import { APP_STORE_URL, og } from "@/lib/site";
import styles from "./features.module.css";

const TITLE = "SimplyStroke Features: Free Scoring and SimplyStroke Pro";
const DESCRIPTION =
  "Explore SimplyStroke's free one-tap iPhone and Apple Watch scoring, live group scorecards, and optional Pro tools for history, courses, crews, journals, and scorecard scanning.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/features/" },
  openGraph: og(TITLE, DESCRIPTION, "/features/"),
};

const freeFeatures = [
  {
    marker: "01",
    title: "One tap per stroke",
    body: "A large target on iPhone and Apple Watch keeps the count without turning the round into data entry.",
  },
  {
    marker: "02",
    title: "Undo, penalties & automatic math",
    body: "Fix a stray tap, add a penalty, move to the next hole, and let the scorecard total itself.",
  },
  {
    marker: "03",
    title: "Solo play works offline",
    body: "Keep scoring through a dead zone. Your solo round remains local first and syncs after service returns.",
  },
  {
    marker: "04",
    title: "Courses and par ready",
    body: "Choose from more than 40,000 courses, use nearby search, or skip setup and start counting immediately.",
  },
  {
    marker: "05",
    title: "Live group scorecards",
    body: "Share a six-character code and let each golfer keep their own score on the same live card. Friends can join as guests.",
  },
  {
    marker: "06",
    title: "Backup, sync & sharing",
    body: "Connect rounds to your account, keep them across devices, and share a finished scorecard without exposing private details.",
  },
];

const proFeatures = [
  ["Complete history", "Open every completed round, with 9-hole and 18-hole results kept separate."],
  ["Season stats & records", "Follow averages, best scores, trends, goals, and a visual season recap."],
  ["Course playbooks", "Revisit hole averages, front/back patterns, challenges, and a best-ever composite card."],
  ["Saved crews", "Keep regular groups together and revisit comparable shared results."],
  ["Golf trips", "Connect several rounds and follow cumulative gross results across the trip."],
  ["Private round journal", "Attach personal notes and photos to the scorecard you want to remember."],
  ["Paper scorecard scan", "Recognize a photographed card on iPhone, then review every value before saving."],
  ["Private shot details", "From More on iPhone or Apple Watch, optionally attach a club or dictated text to your latest stroke without storing raw audio."],
];

export default function FeaturesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Free scoring + optional Pro</p>
          <h1>
            Simple during the round.
            <span>Useful long after it.</span>
          </h1>
          <p>
            SimplyStroke begins with one job: keep count. Free does that on
            iPhone and Apple Watch. Pro helps you remember what those rounds
            added up to.
          </p>
          <div className={styles.heroActions}>
            <PrimaryCta
              event="app_store_click"
              ctaLocation="features_hero"
              href={APP_STORE_URL}
              tone="light"
              size="large"
              apple
            >
              Download free
            </PrimaryCta>
            <Link href="/pro/">Explore SimplyStroke Pro →</Link>
          </div>
        </div>
      </header>

      <section className={styles.freeSection}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.kicker}>Free core</p>
            <h2>Everything required to play the round.</h2>
          </div>
          <p>
            No account or credit card is required to start a solo round. Core
            scoring stays unlimited, including on Apple Watch.
          </p>
        </div>
        <div className={styles.freeGrid}>
          {freeFeatures.map((feature) => (
            <article key={feature.marker}>
              <span>{feature.marker}</span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.watchBand}>
        <div className={styles.watchFace} aria-hidden="true">
          <span>Hole 7</span>
          <div><b>5</b><small>strokes</small></div>
          <em>Haptic confirmed</em>
        </div>
        <div>
          <p className={styles.kicker}>Apple Watch</p>
          <h2>Leave the phone nearby. Keep the score on your wrist.</h2>
          <p>
            Tap to add a stroke, feel the confirmation, undo a mistake, add a
            penalty, and advance holes from the Watch. Scoring remains free.
            With Pro, open More whenever you want to attach a club or dictated
            text to the latest stroke. Nothing interrupts the next tap.
          </p>
        </div>
      </section>

      <section className={styles.proSection}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.kicker}>SimplyStroke Pro</p>
            <h2>Get more from the score you already entered.</h2>
          </div>
          <p>
            Pro adds memory, context, and planning. It never puts a paywall in
            the middle of counting a stroke.
          </p>
        </div>
        <div className={styles.proList}>
          {proFeatures.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.proAction}>
          <Link href="/pro/">See how Free and Pro compare →</Link>
        </div>
      </section>

      <section className={styles.boundariesSection}>
        <div>
          <p className={styles.kicker}>Still deliberately simple</p>
          <h2>What SimplyStroke does not pretend to be.</h2>
        </div>
        <ul>
          <li><strong>No GPS yardage screen</strong><span>Location can help find a nearby course; it does not turn scoring into a rangefinder.</span></li>
          <li><strong>No swing diagnosis</strong><span>SimplyStroke records the score and the details you choose, without inventing advice from them.</span></li>
          <li><strong>No GHIN posting</strong><span>SimplyStroke does not calculate or submit an official handicap index.</span></li>
          <li><strong>No public social feed</strong><span>Your round stays about golf, with sharing controlled by you.</span></li>
        </ul>
      </section>

      <section className={styles.finalSection}>
        <p className={styles.kicker}>One less thing to think about</p>
        <h2>Tap the shot. We&apos;ll keep the count.</h2>
        <PrimaryCta
          event="app_store_click"
          ctaLocation="features_final"
          href={APP_STORE_URL}
          tone="light"
          size="large"
          apple
        >
          Get SimplyStroke
        </PrimaryCta>
        <small>Free to download · Optional Pro · iPhone + Apple Watch</small>
      </section>
    </main>
  );
}
