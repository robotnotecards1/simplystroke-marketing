import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import PrimaryCta from "@/components/PrimaryCta";
import { APP_STORE_URL, og } from "@/lib/site";
import proScreen from "@/assets/app-store/1.0.4/raw/pro.png";
import seasonRecapScreen from "@/assets/app-store/1.0.4/raw/season-recap.png";
import crewsScreen from "@/assets/app-store/1.0.4/raw/crews.png";
import tripsScreen from "@/assets/app-store/1.0.4/raw/trips.png";
import journalScreen from "@/assets/app-store/1.0.4/raw/journal.png";
import ocrScreen from "@/assets/app-store/1.0.4/raw/ocr-fixture.png";
import shotDetailsScreen from "@/assets/app-store/1.0.4/raw/shot-details.png";
import fullHistoryScreen from "@/assets/pro-features/full-history.png";
import goalsRecordsScreen from "@/assets/pro-features/goals-records.png";
import coursePlaybookScreen from "@/assets/pro-features/course-playbook.png";
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

const proFeatures: Array<{
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
  image: StaticImageData;
  alt: string;
}> = [
  {
    number: "01",
    eyebrow: "Complete history",
    title: "Every finished card stays within reach.",
    body: "Open your full round archive, filter it by course or month, and jump back into any completed scorecard. Free scoring never stops; Pro removes the 10-round viewing window.",
    accent: "Your complete scorecard archive",
    image: fullHistoryScreen,
    alt: "SimplyStroke Rounds screen showing a complete history of finished rounds",
  },
  {
    number: "02",
    eyebrow: "Season recap",
    title: "See the story behind the scores.",
    body: "Review your month, season, or all-time play with separate 9-hole and 18-hole views, then create a visual recap that is ready to share.",
    accent: "Trends and a shareable recap",
    image: seasonRecapScreen,
    alt: "SimplyStroke Visual Season Recap screen with rounds, average, birdies, pars, and best round",
  },
  {
    number: "03",
    eyebrow: "Goals and records",
    title: "Give the next round something to chase.",
    body: "Set a scoring target and let SimplyStroke track it from rounds you already play. Personal records update automatically as your history grows.",
    accent: "Targets, progress, and personal bests",
    image: goalsRecordsScreen,
    alt: "SimplyStroke Goals screen showing two completed goals and personal scoring records",
  },
  {
    number: "04",
    eyebrow: "Course playbooks",
    title: "Return to every course with a guide.",
    body: "Each course builds its own playbook from your results. See hole averages, best and worst scores, personal records, challenges, and your best-ever composite card.",
    accent: "A golf guide built from your rounds",
    image: coursePlaybookScreen,
    alt: "SimplyStroke Pinehurst No. 2 course playbook showing hole-by-hole averages, best scores, and worst scores",
  },
  {
    number: "05",
    eyebrow: "Saved crews",
    title: "Keep your regular group together.",
    body: "Save the people you play with, start the next group round faster, and revisit the results you made together. Friends can keep playing free when a Pro organizer hosts.",
    accent: "Your regular foursome, ready to go",
    image: crewsScreen,
    alt: "SimplyStroke Saved Crews screen with a regular golf group",
  },
  {
    number: "06",
    eyebrow: "Golf trips",
    title: "Put the whole trip on one card.",
    body: "Connect several rounds into one trip, keep the crew and courses organized, and come back to the full weekend instead of a pile of separate scores.",
    accent: "Several rounds, one trip",
    image: tripsScreen,
    alt: "SimplyStroke Golf Trips screen showing an upcoming multi-round golf trip",
  },
  {
    number: "07",
    eyebrow: "Private round journal",
    title: "Remember more than the final number.",
    body: "Keep private notes and photos with a finished round so the details worth remembering stay beside the scorecard that created them.",
    accent: "Notes and photos only you can see",
    image: journalScreen,
    alt: "SimplyStroke Private Round Journal screen with a round note and golf photo",
  },
  {
    number: "08",
    eyebrow: "Paper scorecard scan",
    title: "Scan it. Check it. Keep it.",
    body: "Photograph a paper scorecard and review the recognized course, date, player, scores, and par before anything is saved. Recognition runs on the phone and the source photo stays temporary.",
    accent: "Draft first, then you approve every value",
    image: ocrScreen,
    alt: "SimplyStroke Review Scorecard screen showing recognized values from a photographed paper scorecard",
  },
  {
    number: "09",
    eyebrow: "Shot details",
    title: "Remember the shot, not just the stroke.",
    body: "From More on the phone or Apple Watch, attach a club, lie, or private note to your latest stroke. Dictation returns text; SimplyStroke does not keep a raw voice recording.",
    accent: "Club, lie, and a private note",
    image: shotDetailsScreen,
    alt: "SimplyStroke Shot Details screen showing club, lie, and private shot note fields",
  },
];

function PhoneFrame({
  image,
  alt,
  className = "",
  priority = false,
}: {
  image: StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`${styles.phoneFrame} ${className}`}>
      <span className={styles.phoneButtonTop} aria-hidden="true" />
      <span className={styles.phoneButtonMiddle} aria-hidden="true" />
      <span className={styles.phoneButtonSide} aria-hidden="true" />
      <div className={styles.phoneScreen}>
        <Image src={image} alt={alt} priority={priority} sizes="(max-width: 700px) 62vw, 290px" />
      </div>
    </figure>
  );
}

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

          <div className={styles.heroDevices} aria-label="Current SimplyStroke Pro app screens">
            <PhoneFrame
              image={seasonRecapScreen}
              alt="SimplyStroke visual season recap"
              className={styles.heroPhoneLeft}
              priority
            />
            <PhoneFrame
              image={proScreen}
              alt="SimplyStroke Pro feature and plan screen"
              className={styles.heroPhoneCenter}
              priority
            />
            <PhoneFrame
              image={ocrScreen}
              alt="SimplyStroke paper scorecard review screen"
              className={styles.heroPhoneRight}
              priority
            />
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
          <p className={styles.kicker}>Inside SimplyStroke Pro</p>
          <h2>Real features. Real app screens.</h2>
          <p>
            Every screen below comes from the current SimplyStroke app. Pro
            builds on the scores you already entered, so there is no second stat
            sheet to maintain.
          </p>
        </div>
        <div className={styles.featureShowcases}>
          {proFeatures.map((feature, index) => (
            <article
              className={`${styles.featureShowcase} ${index % 2 === 1 ? styles.featureShowcaseReverse : ""}`}
              key={feature.number}
            >
              <div className={styles.featureCopy}>
                <div className={styles.featureMeta}>
                  <span>{feature.number}</span>
                  <p>{feature.eyebrow}</p>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
                <strong>{feature.accent}</strong>
              </div>
              <div className={styles.featureDeviceStage}>
                <PhoneFrame image={feature.image} alt={feature.alt} />
              </div>
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
