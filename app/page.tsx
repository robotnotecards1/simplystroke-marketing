import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeBenefitsStory from "@/components/HomeBenefitsStory";
import HomeDemo from "@/components/HomeDemo";
import HomeFaq, { type HomeFaqItem } from "@/components/HomeFaq";
import HomeGroupStory from "@/components/HomeGroupStory";
import HomeHeroDevices from "@/components/HomeHeroDevices";
import HomeMotionGate from "@/components/HomeMotionGate";
import HomeReviews from "@/components/HomeReviews";
import TrackedCta from "@/components/TrackedCta";
import { AppleGlyph } from "@/components/icons";
import { getAppStoreData, type Review } from "@/lib/appStore";
import { appNode, faqNode, graph, organizationNode, websiteNode } from "@/lib/schema";
import { APP_STORE_URL, APP_URL, og } from "@/lib/site";
import styles from "./home.module.css";

const TITLE = "Free Golf Scorecard App with One-Tap Scoring | SimplyStroke";
const DESCRIPTION =
  "One tap per shot and SimplyStroke keeps your score, par and round. A simple golf stroke counter and scorecard with live group scoring. Free, works offline.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: og(TITLE, DESCRIPTION, "/"),
};

const faqs: HomeFaqItem[] = [
  {
    id: "free",
    q: "Is SimplyStroke free?",
    a: "Core scoring on iPhone and Apple Watch is free, and you can start a solo round without an account or credit card.",
  },
  {
    id: "account",
    q: "Do I need an account?",
    a: "Not to try a solo round. Create an account when you want your rounds connected to you across devices and future sessions.",
  },
  {
    id: "watch-phone",
    q: "Does the Apple Watch work without holding my phone?",
    a: "Yes. Start the round, then score from your Watch while the paired phone stays nearby in your bag or cart.",
  },
  {
    id: "group-join",
    q: "How do friends join a group round?",
    a: "Send the link or six-character code. Friends can join as guests, count their own strokes, and follow the same live scorecard.",
  },
  {
    id: "offline",
    q: "Does it work without signal?",
    a: "Solo rounds keep working offline and sync when service returns. Live group scoring requires a connection.",
  },
  {
    id: "gps-analysis",
    q: "Does it include GPS yardages or swing analysis?",
    a: "No. SimplyStroke deliberately focuses on stroke counting and scorecards. That simplicity is the product.",
  },
];

const approvedReviews: Review[] = [
  {
    author: "Chris Devonshire",
    title: "So easy!!",
    body: "I've tried so many live scoring golf apps, but like the name says, it's super simple. I got enough crazy thoughts in my head on the course—this app is a total value add.",
  },
  {
    author: "ontj",
    title: "Quick and easy",
    body: "Made keeping score a breeze, easy to navigate and enter shots, including unfortunately a penalty. Quickly found the course I was playing so no set-up required. Will be in my bag from now on.",
  },
  {
    author: "DJ CobraKai",
    title: "Best golf scoring app",
    body: "Has every course you can think of and makes keeping score so easy for yourself or even the entire group. I highly recommend for your next round!",
  },
  {
    author: "VIGNDOG",
    title: "Great app!",
    body: "It makes keeping score incredibly easy, especially with the watch app. I can stay focused on my game rather than trying to remember how many strokes I shot on a hole.",
  },
  {
    author: "Nick..1827",
    title: "Exactly what's needed",
    body: "Super straightforward to use and has the golf courses that I play at. Makes tracking scores so much easier.",
  },
  {
    author: "Dross760",
    title: "Love it",
    body: "Awesome and easy to use.",
  },
];

function selectReviews(liveReviews: Review[]): Review[] {
  return approvedReviews.map((approved) => {
    const live = liveReviews.find(
      (review) => review.author.toLowerCase() === approved.author.toLowerCase()
    );
    return live ?? approved;
  });
}

function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function ProofIcon({ type }: { type: "rating" | "watch" | "guest" | "course" }) {
  if (type === "rating") {
    return <svg viewBox="0 0 72 72" aria-hidden="true"><path className={`${styles.proofAccent} ${styles.proofStars}`} d="m8 12 2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 22.8 3.8 25l.8-4.7L1.2 17l4.7-.7L8 12Zm14 0 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L22 12Zm14 0 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L36 12Zm14 0 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L50 12Zm14 0 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L64 12Z" /><path d="M8 39h56M14 49h44M22 59h28" /></svg>;
  }
  if (type === "watch") {
    return <svg viewBox="0 0 72 72" aria-hidden="true"><path d="M27 4h18l4 12v40l-4 12H27l-4-12V16L27 4Z" /><rect x="18" y="14" width="36" height="44" rx="12" /><circle cx="36" cy="36" r="13" /><path d="M26 33c6 3 14 3 20 0M27 42c6-2 12-2 18 0M31 24c-2 7-2 17 0 24M41 24c2 7 2 17 0 24" opacity=".3" /><path className={`${styles.proofAccent} ${styles.proofWatchCount}`} d="M34 31.5 37 29v15" /></svg>;
  }
  if (type === "guest") {
    return <svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="19" cy="22" r="8" /><path d="M5 59c1-16 7-25 14-25s13 9 14 25M43 8h20v55H43" /><path className={`${styles.proofAccent} ${styles.proofGuestArrow}`} d="M31 36h26m-8-8 8 8-8 8" /></svg>;
  }
  return <svg viewBox="0 0 72 72" aria-hidden="true"><path d="M24 60V8" /><path className={styles.proofFlag} d="M25 11h31L46 22l10 11H25Z" /><path d="M8 61c12-6 35-6 51 0" /><circle className={styles.proofAccent} cx="15" cy="54" r="6" /><path d="M12 51h.1M17 53h.1M14 57h.1" /></svg>;
}

function DemoFlightIllustration() {
  return (
    <svg className={styles.demoFlightIllustration} viewBox="0 0 460 300" aria-hidden="true">
      <path className={styles.illustrationTrail} d="M26 250C76 108 198 52 351 91c42 11 65 39 75 72" />
      <circle cx="27" cy="250" r="13" />
      <path d="M18 247h18M21 241h2M30 254h2" opacity=".35" />
      <path className={styles.illustrationFlag} d="M404 46v170m2-166h43l-14 17 14 18h-43" />
      <path d="M363 222c21-12 70-12 91 0" />
      <circle className={styles.illustrationAccent} cx="388" cy="219" r="8" />
    </svg>
  );
}

function FocusIllustration() {
  return (
    <svg className={styles.focusIllustration} viewBox="0 0 310 170" aria-hidden="true">
      <path className={styles.illustrationTrail} d="M18 126c45-77 126-94 203-52 30 16 43 38 48 64" />
      <circle cx="251" cy="137" r="9" />
      <path d="M244 135h14M248 130h2M254 140h2" opacity=".42" />
      <path className={styles.illustrationFlag} d="M268 31v109m2-106h30l-10 12 10 12h-30" />
      <path d="M244 143c16-8 42-8 58 0" />
    </svg>
  );
}

export default async function Home() {
  const { rating, reviews } = await getAppStoreData();
  const featuredReviews = selectReviews(reviews);
  const appRating = rating
    ? `${rating.value.toFixed(1)} on the App Store`
    : "5-star App Store reviews";

  const entityJsonLd = graph(
    organizationNode,
    websiteNode,
    rating
      ? {
          ...appNode,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            ratingCount: rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : appNode
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    ...faqNode(faqs.map(({ q, a }) => ({ q, a }))),
  };

  return (
    <main id="top" className={styles.home}>
      <HomeMotionGate />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(entityJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(faqJsonLd) }}
      />

      <header className={styles.hero} data-home-motion="load">
        <div className={`${styles.wrap} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>Free golf scorecard · iPhone + Apple Watch</p>
            <h1>
              <span className={styles.heroTitleTop}>Golf&apos;s simplest</span>
              <span className={styles.heroTitleBottom}>stroke counter.</span>
            </h1>
            <p className={styles.heroLede}>
              Tap once after every shot. SimplyStroke keeps the count on your
              iPhone or Apple Watch so you can stop doing math and keep your
              head in the game.
            </p>
            <TrackedCta
              event="app_store_click"
              ctaLocation="home_hero"
              href={APP_STORE_URL}
              className={`${styles.primaryCta} ${styles.heroStoreCta}`}
              aria-label="Download SimplyStroke free on the App Store"
            >
              <AppleGlyph />
              <span className={styles.heroStoreCtaCopy}>
                <strong>Free download</strong>
                <small>Apple App Store</small>
              </span>
              <Arrow />
            </TrackedCta>
            <p className={styles.reassurance}>
              No account required to start <span aria-hidden="true">·</span> Solo rounds work offline
            </p>
          </div>

          <HomeHeroDevices />
        </div>
      </header>

      <section className={styles.proofRail} aria-label="SimplyStroke highlights" data-home-motion>
        <div className={`${styles.wrap} ${styles.proofGrid}`}>
          <div><span className={styles.proofIcon}><ProofIcon type="rating" /></span><p><strong>{appRating}</strong><span>{rating ? `${rating.count} verified ratings` : "From verified golfers"}</span></p></div>
          <div><span className={styles.proofIcon}><ProofIcon type="watch" /></span><p><strong>Apple Watch built in</strong><span>Score from your wrist</span></p></div>
          <div><span className={styles.proofIcon}><ProofIcon type="guest" /></span><p><strong>Start without an account</strong><span>Guest play is one tap away</span></p></div>
          <div><span className={styles.proofIcon}><ProofIcon type="course" /></span><p><strong>40,000+ courses ready</strong><span>Or skip the course and count</span></p></div>
        </div>
      </section>

      <section id="how-it-works" className={`${styles.section} ${styles.demoSection}`} data-home-motion>
        <DemoFlightIllustration />
        <div className={styles.wrap}>
          <HomeDemo />
        </div>
      </section>

      <section className={`${styles.section} ${styles.simpleSection}`} data-home-motion>
        <HomeBenefitsStory />
      </section>

      <section id="apple-watch" className={`${styles.section} ${styles.watchSection}`} data-home-motion>
        <div className={`${styles.wrap} ${styles.watchLayout}`}>
          <div className={styles.watchImageSpace} aria-hidden="true" />
          <div className={styles.watchCopy}>
            <p className={styles.eyebrow}>On your wrist</p>
            <h2>Leave your phone in the bag.</h2>
            <p className={styles.lede}>
              Tap the Watch after every shot and feel a haptic tick confirm the
              count. The scoring screen stays ready through the round, while
              the phone can stay nearby in your bag or cart.
            </p>
            <ul className={styles.detailList}>
              <li>Full-face, glove-friendly tap target.</li>
              <li>A haptic tick confirms every logged stroke.</li>
              <li>Undo, penalties, and next hole from the Watch.</li>
              <li>The completed card syncs back to iPhone.</li>
            </ul>
            <TrackedCta
              event="app_store_click"
              ctaLocation="home_watch"
              href={APP_STORE_URL}
              className={styles.primaryCta}
            >
              Download for iPhone + Apple Watch <Arrow />
            </TrackedCta>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.focusSection}`} data-home-motion>
        <div className={`${styles.wrap} ${styles.focusLayout}`}>
          <div className={styles.focusPhoto}>
            <Image
              src="/images/photos/66454.jpg"
              alt="A golfer reading a putt while staying focused on the next shot"
              width={1600}
              height={1046}
              loading="lazy"
            />
          </div>
          <div className={styles.focusCopy}>
            <FocusIllustration />
            <h2>Keep your head in the game.</h2>
            <p>
              Golf already gives you enough to think about. Your lie. Your club.
              The water you&apos;re pretending not to see. The last thing you need
              is a number bouncing around in your head on the walk to the green.
            </p>
            <p>SimplyStroke holds the count so you can get back to the shot in front of you.</p>
            <blockquote>
              “It makes keeping score incredibly easy, especially with the watch
              app. I can stay focused on my game rather than trying to remember
              how many strokes I shot on a hole.”
              <cite>— VIGNDOG, App Store</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <section id="play-together" className={`${styles.section} ${styles.groupSection}`} data-home-motion>
        <div className={styles.wrap}>
          <div className={styles.groupIntro}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Play together</p>
              <h2 className={styles.groupHeadline}>
                <span>Invite your bros.</span>
                <span>Lose the scorekeeper.</span>
              </h2>
            </div>
            <div>
              <p className={styles.lede}>
                Start a group round, share the code, and let everyone count their
                own shots. Every phone updates the same live scorecard, so nobody
                gets stuck doing the whole group&apos;s math.
              </p>
              <p className={styles.groupTrust}>Live group scoring needs a connection. Solo scoring works offline.</p>
            </div>
          </div>

          <HomeGroupStory />

          <div className={styles.groupAction}>
            <TrackedCta
              event="web_app_click"
              ctaLocation="home_group"
              href={`${APP_URL}/round/mode`}
              className={styles.primaryCta}
            >
              Start a group round <Arrow />
            </TrackedCta>
            <small>Hosting is free during launch. The host signs in; friends can join as guests.</small>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.reviewsSection}`} data-home-motion>
        <div className={styles.wrap}>
          <div className={`${styles.sectionHeading} ${styles.centerHeading}`}>
            <p className={styles.eyebrow}>5 Stars on the App Store</p>
            <h2>Golfers who stopped losing count.</h2>
          </div>
          <HomeReviews reviews={featuredReviews} />
          <div className={styles.centerAction}>
            <TrackedCta
              event="app_store_click"
              ctaLocation="home_reviews"
              href={APP_STORE_URL}
              className={styles.primaryCta}
            >
              Download the app golfers are describing <Arrow />
            </TrackedCta>
          </div>
        </div>
      </section>

      <section id="faq" className={`${styles.section} ${styles.faqSection}`} data-home-motion>
        <div className={`${styles.wrap} ${styles.faqLayout}`}>
          <div className={styles.faqIntro}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>First-tee questions</p>
              <h2>Before you put it in the bag.</h2>
              <p className={styles.faqIntroCopy}>Six quick answers. About the same amount of reading as a short par three.</p>
            </div>
          </div>
          <HomeFaq items={faqs} />
          <p className={styles.resourceLinks}>
            Go deeper with our <Link href="/golf-stroke-counter/">golf stroke counter guide</Link>,{" "}
            <Link href="/adhd-golf/">ADHD and golf hub</Link>,{" "}
            <Link href="/compare/">golf app comparisons</Link>,{" "}
            <Link href="/guides/">scoring and rules guides</Link>, or{" "}
            <Link href="/courses/">course directory</Link>.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.finalSection}`} data-home-motion>
        <div className={`${styles.wrap} ${styles.finalInner}`}>
          <p className={styles.heroEyebrow}>Play your next round with it</p>
          <h2>Your next round has enough to think about.</h2>
          <p>
            The count doesn&apos;t have to be one of those things. Put SimplyStroke
            on your iPhone and Apple Watch before the first tee.
          </p>
          <TrackedCta
            event="app_store_click"
            ctaLocation="home_final"
            href={APP_STORE_URL}
            className={styles.primaryCta}
          >
            Download free on the App Store <Arrow />
          </TrackedCta>
          <small>Start without an account · No ads today · Android coming later</small>
          <p className={styles.finalUtility}>
            Already use SimplyStroke?{" "}
            <TrackedCta event="web_app_click" ctaLocation="home_final" href={APP_URL}>
              View your rounds →
            </TrackedCta>
          </p>
        </div>
      </section>
    </main>
  );
}
