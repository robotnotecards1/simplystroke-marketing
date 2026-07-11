import type { Metadata } from "next";
import Link from "next/link";
import HeroPhone from "@/components/HeroPhone";
import ActiveRoundPhone from "@/components/ActiveRoundPhone";
import StoreBadges from "@/components/StoreBadges";
import WaitlistSection from "@/components/WaitlistSection";
import {
  BallOnGreenIcon,
  BallPinIcon,
  FlagIcon,
  FlightpathFlag,
  GolfBagIcon,
  HappyBallIcon,
  ScorecardIcon,
} from "@/components/icons";
import { og, softwareApplicationJsonLd } from "@/lib/site";

const TITLE = "Golf Stroke Counter & One-Tap Scorecard App | SimplyStroke";
const DESCRIPTION =
  "One tap counts your strokes. No math, no menus, no losing count mid-hole. The simple golf scorecard app built for ADHD golfers and anyone who forgets. Launching 2026.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: og(TITLE, DESCRIPTION, "/"),
};

// Homepage FAQ. These answer the questions people actually type into Google
// and into AI assistants ("is there a golf app that just counts strokes?"),
// which is the format answer engines quote from. Rendered on-page AND as
// FAQPage schema below — keep the two in sync by deriving one from the other.
const faqs = [
  {
    q: "Is there a golf app that just counts strokes?",
    a: "That is the entire point of SimplyStroke. The whole screen is one giant golf ball. Tap it once per swing and the app holds your stroke count, your running total and your vs-par, then hands you a finished scorecard at the end. There is no GPS overlay, no handicap tracker and no feed to scroll.",
  },
  {
    q: "Do I need a subscription or a sign-up?",
    a: "No. SimplyStroke is free to download, has no ads, and does not make you create an account before you can count your first hole.",
  },
  {
    q: "Does it work without signal on the course?",
    a: "Yes. SimplyStroke works fully offline, so a dead zone on the back nine never costs you your round. Your card syncs when you are back in range.",
  },
  {
    q: "What if I tap twice by accident?",
    a: "Press Undo. It takes one tap and it is on the same screen, so you never have to go hunting through a menu mid-hole. You can also edit any hole after the fact.",
  },
  {
    q: "Is SimplyStroke good for ADHD golfers?",
    a: "It was designed for them. Golf quietly asks you to hold a running number in working memory for ten-plus minutes per hole while doing nine other things, which is exactly the task ADHD brains drop first. SimplyStroke moves the number out of your head and into a single tap.",
  },
  {
    q: "When does SimplyStroke launch?",
    a: "SimplyStroke launches in 2026 on iPhone, Android and Apple Watch. Join the waitlist and we will send exactly one message when it is live.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Home() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ===================== HERO ===================== */}
      <header className="ss-hero">
        <div className="ss-hero-blob-a" />
        <div className="ss-hero-blob-b" />
        <div className="container ss-hero-inner">
          <div className="ss-hero-copy">
            <div className="eyebrow ss-hero-eyebrow">
              The one-tap golf scorecard
            </div>
            <h1 className="ss-hero-h1">
              Keep your head in the round.
              <br />
              <span className="accent">We&apos;ll keep the count.</span>
            </h1>
            <p className="ss-hero-p">
              One giant button counts every stroke. The scorecard does its own
              math. No menus, no ads, and no wondering whether that was your
              third or your fourth.
            </p>
            <div className="ss-hero-cta">
              <a href="#waitlist" className="btn btn-hero">
                Join the waitlist →
              </a>
              <span className="ss-hero-launch">Launching 2026</span>
            </div>
            <StoreBadges />
          </div>
          <HeroPhone />
        </div>
      </header>

      {/* ===================== PROBLEM / HOW IT WORKS ===================== */}
      <section id="how-it-works" className="ss-problem">
        <div className="eyebrow">The problem with most golf apps</div>
        <h2 className="h2-display">They&apos;re a distraction.</h2>
        <p className="ss-problem-p">
          Menus, handicaps, GPS overlays, ads, sign-up screens. By the third
          hole you&apos;re wrestling with your phone instead of your next shot,
          and the one number you actually came for is buried three taps deep.
          SimplyStroke keeps a single job on screen:{" "}
          <strong>count this stroke.</strong>
        </p>

        <div className="ss-stepswrap">
          <div className="ss-flightpath">
            <span className="tee-ball" />
            <span className="path-line" />
            <FlightpathFlag />
            <span className="travel-ball" />
          </div>

          <div className="ss-steps">
            <div className="ss-step">
              <div className="ss-step-num">
                <span>1</span>
              </div>
              <div className="ss-step-title">Tap the ball</div>
              <p className="ss-step-p">
                One tap per swing, on a button big enough to hit without
                looking. Glove on, eyes up.
              </p>
            </div>
            <div className="ss-step">
              <div className="ss-step-num">
                <span>2</span>
              </div>
              <div className="ss-step-title">Keep walking</div>
              <p className="ss-step-p">
                The app carries your running total. Nothing to add, nothing to
                remember.
              </p>
            </div>
            <div className="ss-step">
              <div className="ss-step-num">
                <span>3</span>
              </div>
              <div className="ss-step-title">Get your card</div>
              <p className="ss-step-p">
                A finished scorecard with the math already done, ready to settle
                the debate on 18.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ADHD FOLD ===================== */}
      <section className="ss-fold">
        <div className="ss-fold-grid">
          <div>
            <h2 className="ss-fold-h2">
              Ever wondered: &ldquo;was that my third or fourth?&rdquo;
            </h2>
            <p className="ss-fold-p">
              You stripe a beautiful approach, your mind wanders to that
              almost-ace from 2019 or whether you locked the back door, and you
              arrive at the green with no idea what you&apos;re lying. This app
              is for you. Built for ADHD brains and anyone whose head wanders
              mid-round, SimplyStroke holds the number so you don&apos;t have
              to. Tap it and forget it. Your focus stays where it belongs: the
              next shot.
            </p>
            <a href="#waitlist" className="btn btn-fold">
              Let the app remember →
            </a>
            <br />
            <Link href="/adhd-golf/" className="ss-fold-morelink">
              More on ADHD and golf →
            </Link>
          </div>
          <div>
            <div className="eyebrow ss-fold-eyebrow">
              For anyone who forgets the count by the next tee
            </div>
            <h3 className="ss-fold-sub">Sound familiar?</h3>
            <div className="ss-fold-cards">
              <div className="ss-fold-card">
                <div className="icon-tile">
                  <BallOnGreenIcon />
                </div>
                <span>
                  You reach the green with no idea whether it&apos;s your third
                  or your fourth. Every. Single. Time.
                </span>
              </div>
              <div className="ss-fold-card">
                <div className="icon-tile">
                  <ScorecardIcon />
                </div>
                <span>
                  That tiny scorecard pencil is a noble effort. Be honest,
                  though: it never makes it past the first few holes.
                </span>
              </div>
              <div className="ss-fold-card">
                <div className="icon-tile">
                  <BallPinIcon />
                </div>
                <span>
                  One giant button means nothing else to poke at. No mis-taps,
                  no menus to get lost in mid-round.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CINEMATIC BAND ===================== */}
      <section className="ss-band">
        <div className="ss-band-inner">
          <h2>
            One tap.
            <br />
            That&apos;s the whole <span className="accent">scorecard.</span>
          </h2>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section id="features" className="ss-features">
        <div className="ss-features-inner">
          <div className="eyebrow">What you get</div>
          <h2 className="h2-display">Four things. That&apos;s the app.</h2>

          <div className="ss-features-grid">
            <div className="ss-feature">
              <div className="icon-tile">
                <HappyBallIcon />
              </div>
              <h3>One giant tap target</h3>
              <p>
                A stroke button that fills the screen. No fumbling and no
                squinting, even with a glove on.
              </p>
            </div>
            <div className="ss-feature">
              <div className="icon-tile">
                <ScorecardIcon />
              </div>
              <h3>Scorecard, done for you</h3>
              <p>
                Every hole totals itself, with vs-par at a glance. Birdies, pars
                and bogeys color-coded so you can read the round in a second.
              </p>
            </div>
            <div className="ss-feature">
              <div className="icon-tile">
                <GolfBagIcon />
              </div>
              <h3>Fits every round</h3>
              <p>
                Nine holes or a full eighteen, match play or a casual round. One
                tap counts them all.
              </p>
            </div>
            <div className="ss-feature">
              <div className="icon-tile">
                <FlagIcon />
              </div>
              <h3>Zero clutter, zero ads</h3>
              <p>
                No feeds, no upsells, nothing to sign into. Open it, count your
                round, close it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== APPLE WATCH ===================== */}
      <section id="watch" className="ss-watch">
        <div className="ss-watch-blob" />
        <div className="ss-watch-inner">
          <div className="ss-watch-mock">
            <div className="ss-watch-float">
              <div className="ss-watch-body">
                <div className="ss-watch-screen">
                  <div className="ss-watch-top">
                    <span className="hole">HOLE 7</span>
                    <span className="over">+2</span>
                  </div>
                  <div className="ss-watch-ballwrap">
                    <span className="ss-watch-pulse" />
                    <div className="ss-watch-ball">
                      <span className="dimples" />
                      <span className="num">5</span>
                      <span className="label">STROKES</span>
                    </div>
                  </div>
                  <div className="ss-watch-hint">
                    Tap · Digital Crown to edit
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ss-watch-copy">
            <div className="pill">Apple Watch · Coming soon</div>
            <h2>Leave the phone in the bag.</h2>
            <p className="ss-watch-p">
              Count every stroke from your wrist. A tap on the watch face logs
              the shot, the Digital Crown fixes it if you double-tapped, and
              your round syncs straight to your phone&apos;s scorecard. The
              phone stays in the bag.
            </p>
            <ul className="ss-checklist">
              <li>
                <span className="ss-check">✓</span> Full-face tap target,
                glove-friendly
              </li>
              <li>
                <span className="ss-check">✓</span> Haptic tick on every stroke
              </li>
              <li>
                <span className="ss-check">✓</span> Auto-syncs to your iPhone
                card
              </li>
            </ul>
            <a href="#waitlist" className="btn btn-watch">
              Notify me at launch →
            </a>
          </div>
        </div>
      </section>

      {/* ===================== SCREENS STRIP ===================== */}
      <section id="screens" className="ss-screens">
        <div className="ss-screens-head">
          <div className="eyebrow">A peek inside</div>
          <h2 className="h2-display">A few taps, start to finish.</h2>
        </div>

        <div className="ss-screens-row">
          <div className="ss-screen-item">
            <div className="mini-wrap">
              <div className="mini-frame">
                <div className="mini-screen scrolling">
                  <img
                    src="/images/app-screens/home.png"
                    alt="SimplyStroke golf stroke counter app home screen with start new round button"
                    width={270}
                    height={540}
                  />
                </div>
              </div>
            </div>
            <div className="ss-screen-caption">
              <span className="ss-screen-stepnum">1</span>Start your round
            </div>
            <div className="ss-screen-sub">Get going in one tap</div>
          </div>

          <div className="ss-screen-item">
            <div className="mini-wrap">
              <div className="mini-frame">
                <div className="mini-screen scrolling">
                  <img
                    src="/images/app-screens/course.png"
                    alt="SimplyStroke course select screen listing nearby golf courses"
                    width={270}
                    height={540}
                  />
                </div>
              </div>
            </div>
            <div className="ss-screen-caption">
              <span className="ss-screen-stepnum">2</span>Pick a course
            </div>
            <div className="ss-screen-sub">Or skip it and just count. Your call.</div>
          </div>

          <div className="ss-screen-item">
            <ActiveRoundPhone />
            <div className="ss-screen-caption">
              <span className="ss-screen-stepnum">3</span>Active round
            </div>
            <div className="ss-screen-sub">The only screen that matters</div>
          </div>

          <div className="ss-screen-item">
            <div className="mini-wrap">
              <div className="mini-frame">
                <div className="mini-screen scrolling">
                  <img
                    src="/images/app-screens/scorecard.png"
                    alt="SimplyStroke golf scorecard screen with per-hole scores and round total"
                    width={270}
                    height={540}
                  />
                </div>
              </div>
            </div>
            <div className="ss-screen-caption">
              <span className="ss-screen-stepnum">4</span>Scorecard
            </div>
            <div className="ss-screen-sub">Every hole, math done</div>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" className="section">
        <div className="section-narrow">
          <div className="eyebrow">Fair questions</div>
          <h2 className="h2-display">Before you hand over your email.</h2>
          <div className="faq-list">
            {faqs.map(({ q, a }) => (
              <div className="faq-item" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
          <p className="section-lede" style={{ marginTop: 36 }}>
            Built for the beautifully distractible?{" "}
            <Link href="/adhd-golf/">
              See why SimplyStroke is the golf app for ADHD brains →
            </Link>
          </p>
        </div>
      </section>

      {/* ===================== WAITLIST CTA ===================== */}
      <WaitlistSection source="home" />
    </main>
  );
}
