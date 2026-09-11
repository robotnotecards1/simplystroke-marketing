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
import PrimaryCta from "@/components/PrimaryCta";
import TrackedCta from "@/components/TrackedCta";
import shotDetailsScreen from "@/assets/app-store/1.0.4/raw/shot-details.png";
import ocrScanScreen from "@/assets/pro-features/ocr-scan.webp";
import { getAppStoreData, type Review } from "@/lib/appStore";
import { appNode, faqNode, graph, organizationNode, websiteNode } from "@/lib/schema";
import { APP_STORE_URL, APP_URL, og } from "@/lib/site";
import styles from "./home.module.css";

const TITLE = "Free Golf Scorecard App with One-Tap Scoring | SimplyStroke";
const DESCRIPTION =
  "Tap once per shot on iPhone or Apple Watch. Keep score free, then add Pro tools for complete history, private shot details, scorecard scanning, crews, and trips.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: og(TITLE, DESCRIPTION, "/"),
};

const faqs: HomeFaqItem[] = [
  {
    id: "free",
    q: "Is core scoring free?",
    a: "Yes. Unlimited stroke counting on iPhone and Apple Watch stays free, including undo, penalties, finished scorecards, and standard group play.",
  },
  {
    id: "pro",
    q: "What does SimplyStroke Pro add?",
    a: "Pro adds complete history, season stats and recaps, course playbooks, goals, private journals and shot details, paper scorecard scanning, saved crews, and multi-round trips.",
  },
  {
    id: "account",
    q: "Do I need an account?",
    a: "Not for a solo round. Create an account when you want Pro, device sync, or to host a group round. Friends can join group rounds as guests.",
  },
  {
    id: "watch-phone",
    q: "Can I score from my Apple Watch?",
    a: "Yes. Start the round, then score from your Watch while the paired phone stays nearby in your bag or cart.",
  },
  {
    id: "privacy",
    q: "Are shot notes and photos private?",
    a: "Yes. Private details stay out of shared scorecards, group results, leaderboards, emails, and season recaps.",
  },
  {
    id: "scorecard-scan",
    q: "How does paper scorecard scanning work?",
    a: "Photograph the card on iPhone, review the scores and pars SimplyStroke found, correct anything uncertain, and save only when everything looks right.",
  },
  {
    id: "group-join",
    q: "How do friends join a group round?",
    a: "Send one link or six-character code. Each golfer records their own shots and follows the same live scorecard.",
  },
  {
    id: "offline",
    q: "Does it work without a signal?",
    a: "Solo scoring works offline. Live group scoring needs a connection so every golfer sees the same card.",
  },
];

const proFeatureGroups = [
  {
    number: "01",
    label: "Shot details + private journal",
    title: "Remember the shot, not just the number.",
    body: "After a stroke, add the club and a private note from your iPhone or Apple Watch. Dictate on the Watch, or add notes and photos after the round. Private details never appear on shared scorecards.",
  },
  {
    number: "02",
    label: "Paper scorecard scanning",
    title: "Take a photo. Check the numbers. Keep the round.",
    body: "Photograph a paper scorecard on your iPhone. SimplyStroke reads the card on the device, highlights anything uncertain, and lets you review every score and par before saving it.",
  },
  {
    number: "03",
    label: "History + progress",
    title: "See what your rounds add up to.",
    body: "Open your complete history, follow separate 9-hole and 18-hole trends, set goals, see personal records, and share a season recap. Every course builds its own playbook from your past rounds.",
  },
  {
    number: "04",
    label: "Crews + trips",
    title: "Keep the regular group together.",
    body: "Save the people you play with, revisit group results and head-to-head records, and connect several rounds into one golf-trip scoreboard. One Pro organizer can bring the crew. Friends keep playing free.",
  },
] as const;

const approvedReviews: Review[] = [
  {
    author: "Chris Devonshire",
    title: "So easy!!",
    body: "I've tried so many live scoring golf apps, but like the name says, it's super simple. I got enough crazy thoughts in my head on the course, and this app is a total value add.",
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

function ProofIcon({ type }: { type: "rating" | "watch" | "guest" | "course" }) {
  if (type === "rating") {
    return <svg viewBox="0 0 72 72" aria-hidden="true"><path className={`${styles.proofAccent} ${styles.proofStars}`} d="m8 12 2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 22.8 3.8 25l.8-4.7L1.2 17l4.7-.7L8 12Zm14 0 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L22 12Zm14 0 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L36 12Zm14 0 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L50 12Zm14 0 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L64 12Z" /><path d="M8 39h56M14 49h44M22 59h28" /></svg>;
  }
  if (type === "watch") {
    return <svg viewBox="0 0 72 72" aria-hidden="true"><path d="M28 5h16l2 10H26L28 5Zm-2 52h20l-2 10H28l-2-10Z" /><rect x="20" y="14" width="32" height="44" rx="10" /><path d="M52 25h4v9h-4" /><path className={`${styles.proofAccent} ${styles.proofWatchCount}`} d="M32 36h8m-4-4v8" /></svg>;
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
              Tap once after every shot. SimplyStroke keeps the count, does the
              math, and builds your scorecard, so you can think about the next
              shot, not the last one.
            </p>
          </div>

          <HomeHeroDevices />

          <div className={styles.heroAction}>
            <PrimaryCta
              event="app_store_click"
              ctaLocation="home_hero"
              tone="light"
              href={APP_STORE_URL}
              className={`${styles.primaryCta} ${styles.heroStoreCta}`}
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
      </header>

      <section className={styles.proofRail} aria-label="SimplyStroke highlights" data-home-motion>
        <div className={`${styles.wrap} ${styles.proofGrid}`}>
          <div><span className={styles.proofIcon}><ProofIcon type="rating" /></span><p><strong>{appRating}</strong><span>{rating ? `${rating.count} verified ratings` : "From verified golfers"}</span></p></div>
          <div><span className={styles.proofIcon}><ProofIcon type="watch" /></span><p><strong>Apple Watch built in</strong><span>Score from your wrist</span></p></div>
          <div><span className={styles.proofIcon}><ProofIcon type="guest" /></span><p><strong>Start without an account</strong><span>Your first round comes first</span></p></div>
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
            <p className={styles.eyebrow}>Score from your wrist</p>
            <h2>Leave your phone in the bag.</h2>
            <p className={styles.lede}>
              Tap your Watch after every shot. A quick vibration tells you the
              stroke was counted, and your round controls remain on screen until
              you finish. Your iPhone can stay nearby in your bag or cart.
            </p>
            <ul className={styles.detailList}>
              <li>One large, glove-friendly tap target.</li>
              <li>A quick vibration confirms each stroke.</li>
              <li>Undo, penalties, and next hole from the Watch.</li>
              <li>Your completed scorecard syncs back to iPhone.</li>
            </ul>
            <PrimaryCta
              event="app_store_click"
              ctaLocation="home_watch"
              apple
              tone="light"
              href={APP_STORE_URL}
              className={styles.primaryCta}
            >
              Download for iPhone + Apple Watch
            </PrimaryCta>
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
            <h2 className={styles.wrappedHeadline}>
              <span>Keep your head</span>
              <span>in the game.</span>
            </h2>
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
              <cite>VIGNDOG, App Store</cite>
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
                <span>Everyone counts.</span>
                <span className={styles.groupHeadlineLong}>One card keeps up.</span>
              </h2>
            </div>
            <div>
              <p className={styles.lede}>
                Start a group round and share one code. Each golfer records their
                own shots, and every phone follows the same live scorecard. Nobody
                gets stuck doing the whole group&apos;s math.
              </p>
              <p className={styles.groupTrust}>Friends can join as guests. Live group scoring requires a connection.</p>
            </div>
          </div>

          <HomeGroupStory />

          <div className={styles.groupAction}>
            <PrimaryCta
              event="web_app_click"
              ctaLocation="home_group"
              apple
              tone="light"
              href={`${APP_URL}/round/mode`}
              className={styles.primaryCta}
            >
              Start a group round
            </PrimaryCta>
            <small>Hosting is free during launch. The host signs in; friends can join as guests.</small>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.proPreviewSection}`} data-home-motion>
        <div className={styles.wrap}>
          <div className={styles.proPreviewLayout}>
            <div className={styles.proPreviewCopy}>
              <p className={styles.eyebrow}>SimplyStroke Pro</p>
              <h2>
                <span>Remember more</span>
                <span>than the score.</span>
              </h2>
              <p className={styles.lede}>
                Core scoring stays simple and free. Pro remembers the shots,
                courses, people, and moments behind every completed round.
              </p>
              <Link className={styles.proPreviewLink} href="/pro/">
                Explore SimplyStroke Pro →
              </Link>
            </div>

            <div className={styles.proPreviewScreens} aria-label="SimplyStroke Pro shown in the real iPhone app">
              <figure className={`${styles.proScreen} ${styles.proScreenPrimary}`}>
                <div className={styles.proPhoneFrame}>
                  <div className={styles.proScreenViewport}>
                    <Image
                      src={shotDetailsScreen}
                      alt="SimplyStroke Shot Details screen with a selected club and private note"
                      sizes="(max-width: 860px) 66vw, 280px"
                    />
                  </div>
                </div>
                <figcaption>
                  <span>Shot details</span>
                  <strong>Club + private note</strong>
                </figcaption>
              </figure>
              <figure className={`${styles.proScreen} ${styles.proScreenSecondary}`}>
                <div className={styles.proPhoneFrame}>
                  <div className={styles.proScreenViewport}>
                    <Image
                      src={ocrScanScreen}
                      alt="SimplyStroke Pro preview showing a real photographed paper scorecard becoming recognized scores"
                      sizes="(max-width: 860px) 62vw, 280px"
                    />
                  </div>
                </div>
                <figcaption>
                  <span>Paper card scan</span>
                  <strong>Review before saving</strong>
                </figcaption>
              </figure>
            </div>
          </div>

          <div className={styles.proFeatureIndex}>
            {proFeatureGroups.map((feature) => (
              <article key={feature.number}>
                <div className={styles.proFeatureMeta}>
                  <span>{feature.number}</span>
                  <small>{feature.label}</small>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>

          <div className={styles.proHistoryPromise}>
            <div>
              <span>Free</span>
              <strong>Your 10 most recent completed rounds</strong>
            </div>
            <div>
              <span>Pro</span>
              <strong>Your complete scorecard archive</strong>
            </div>
            <p>Older scorecards stay safely saved. They are never deleted when they leave the Free history window.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.reviewsSection}`} data-home-motion>
        <div className={styles.wrap}>
          <div className={`${styles.sectionHeading} ${styles.centerHeading}`}>
            <h2 className={styles.reviewsHeadline}>Reviews from the clubhouse</h2>
            <div className={styles.reviewHeadingStars} aria-label="5 out of 5 stars">★★★★★</div>
            <p className={styles.reviewRatingCopy}>5 stars on the App Store</p>
          </div>
          <HomeReviews reviews={featuredReviews} />
          <div className={styles.centerAction}>
            <PrimaryCta
              event="app_store_click"
              ctaLocation="home_reviews"
              apple
              href={APP_STORE_URL}
              className={styles.primaryCta}
            >
              Download on the App Store
            </PrimaryCta>
          </div>
        </div>
      </section>

      <section id="faq" className={`${styles.section} ${styles.faqSection}`} data-home-motion>
        <div className={`${styles.wrap} ${styles.faqLayout}`}>
          <div className={styles.faqIntro}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Before you tee off</p>
              <h2 className={styles.faqHeadline}>Quick questions. Straight answers.</h2>
              <p className={styles.faqIntroCopy}>Everything worth knowing before your first tap.</p>
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
          <h2>ONE LESS THING TO THINK ABOUT.</h2>
          <p>JUST PLAY. WE’LL KEEP COUNT.</p>
          <PrimaryCta
            event="app_store_click"
            ctaLocation="home_final"
            tone="light"
            href={APP_STORE_URL}
            className={styles.primaryCta}
            size="large"
            apple
            subtitle="on the App Store"
          >
            Free download
          </PrimaryCta>
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
