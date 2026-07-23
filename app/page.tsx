import type { Metadata } from "next";
import Link from "next/link";
import AppClip from "@/components/AppClip";
import HeroPhone from "@/components/HeroPhone";
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
import { og } from "@/lib/site";
import {
  appNode,
  graph,
  organizationNode,
  websiteNode,
} from "@/lib/schema";

// One @graph: the site, the company, the founder and the app, all behind
// stable @ids that every other page reuses. See lib/schema.ts.
const entityJsonLd = graph(
  organizationNode,
  websiteNode,
  appNode
);

const TITLE =
  "Free Golf Scorecard App. Count Every Stroke in One Tap | SimplyStroke";
const DESCRIPTION =
  "One tap per shot and SimplyStroke keeps your score, your par and your whole round. A simple golf stroke counter and scorecard, with live group scoring for your foursome. Works offline. Free to start.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: og(TITLE, DESCRIPTION, "/"),
};

// Homepage FAQ. These answer the questions people actually type into Google
// and into AI assistants, which is the format answer engines quote from.
// Rendered on-page AND as FAQPage schema below — keep the two in sync.
const faqs = [
  {
    q: "Is SimplyStroke free?",
    a: "Yes. Start counting your first round free, no account and no credit card to get going. If you just want the score, that is the whole app and it costs nothing to use.",
  },
  {
    q: "Is there a golf app that just counts strokes?",
    a: "That is the whole point of SimplyStroke. The screen is one giant golf ball. Tap it once per swing and the app holds your stroke count, your running total and your vs-par, then hands you a finished scorecard at the end. No GPS overlay, no feed to scroll.",
  },
  {
    q: "How do friends join my round?",
    a: "Share a 6-character code or a link. Friends join as a guest with no account, everyone taps their own strokes, and every score lands on one live scorecard.",
  },
  {
    q: "Does it work without signal on the course?",
    a: "Yes. SimplyStroke works fully offline, so a dead zone on the back nine never costs you your round. Your card syncs when you are back in range.",
  },
  {
    q: "Will I lose my round if my phone dies?",
    a: "No. Every stroke is saved the instant you tap it, so a force-quit or a dead battery mid-round never costs you the card. You pick up right where you left off.",
  },
  {
    q: "What if I tap twice by accident?",
    a: "Press undo. One tap, same screen, no hunting through a menu mid-hole. You can also edit any hole after the fact.",
  },
  {
    q: "Is SimplyStroke good for ADHD golfers?",
    a: "It was built with them in mind. Golf quietly asks you to hold a running number in working memory for ten-plus minutes a hole while doing nine other things, which is the exact task an ADHD brain drops first. SimplyStroke moves the number out of your head and into one tap.",
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
          __html: JSON.stringify(entityJsonLd),
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
              Free to start · One tap per shot
            </div>
            <h1 className="ss-hero-h1">
              Golf&apos;s simplest app.
              <br />
              <span className="accent">On purpose.</span>
            </h1>
            <p className="ss-hero-p">
              Just count. We&apos;ll do the math. Tap once per shot and
              SimplyStroke keeps your score, your par and your whole round. Keep
              your head in the game, not in a scorecard.
            </p>
            <div className="ss-hero-cta">
              <a href="https://app.simplystroke.app" className="btn btn-hero">
                Start a round free →
              </a>
              <span className="ss-hero-launch">Free · Live now</span>
            </div>
            <StoreBadges />
          </div>
          <HeroPhone />
        </div>
      </header>

      {/* ===================== PROBLEM / HOW IT WORKS ===================== */}
      <section id="how-it-works" className="ss-problem">
        <div className="eyebrow">How it works</div>
        <h2 className="h2-display">
          They built a spreadsheet. You wanted your score.
        </h2>
        <p className="ss-problem-p">
          Most golf apps bury the one number you came for under menus, GPS
          overlays and a setup wizard. Miss a green and they want to know: long
          or short, left or right, which club. By the third hole you&apos;re
          fighting your phone instead of your swing. SimplyStroke keeps a single
          job on screen: <strong>count this stroke.</strong>
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
                looking. Chunk one into the trees? Hit +1 for a penalty.
              </p>
            </div>
            <div className="ss-step">
              <div className="ss-step-num">
                <span>2</span>
              </div>
              <div className="ss-step-title">Never do the math</div>
              <p className="ss-step-p">
                Hole total, score to par, round total. All added up for you,
                live. You never total a thing.
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

      {/* ===================== SIMPLE ON PURPOSE ===================== */}
      <section className="ss-simple">
        <div className="ss-simple-inner">
          <div className="eyebrow" style={{ color: "var(--lime-text)" }}>
            Simple on purpose
          </div>
          <h2 className="h2-display">Built to stay out of your way.</h2>
          <p className="ss-simple-lede">
            The whole app is a stroke counter and a scorecard. That is the
            point, not a limitation.
          </p>

          <div className="ss-simple-grid">
            <div className="ss-simple-cell">
              <h3>No math, ever</h3>
              <p>The running number lives on the screen, not in your head.</p>
            </div>
            <div className="ss-simple-cell">
              <h3>Gloves on, one hand</h3>
              <p>
                Oversized buttons you can hit without looking or taking your
                glove off.
              </p>
            </div>
            <div className="ss-simple-cell">
              <h3>Works with no signal</h3>
              <p>
                Fully offline. A dead zone on the back nine never costs you your
                round.
              </p>
            </div>
            <div className="ss-simple-cell">
              <h3>Never lose a round</h3>
              <p>
                Every tap is saved the instant you make it. Dead battery
                mid-round? You pick up right where you left off.
              </p>
            </div>
            <div className="ss-simple-cell">
              <h3>Undo anything</h3>
              <p>
                Fat-fingered a tap? One undo fixes it. Long-press to set an
                exact number.
              </p>
            </div>
            <div className="ss-simple-cell">
              <h3>Set up in one tap</h3>
              <p>
                Near Me finds your course and fills in the pars, so you&apos;re
                ready before the first tee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GROUP ROUNDS (flagship) ===================== */}
      <section id="group" className="ss-group">
        <div className="ss-group-inner">
          <div className="ss-group-copy">
            <div className="eyebrow" style={{ color: "var(--lime-text)" }}>
              Play with your group
            </div>
            <h2 className="h2-display" style={{ color: "var(--offwhite)" }}>
              One code. Everyone&apos;s scores. Live.
            </h2>
            <p className="ss-group-p">
              Start a round, share a 6-character code, and everyone taps their
              own strokes on their own phone. One scorecard, updating in real
              time. The scorekeeper&apos;s job, gone.
            </p>
            <ul className="ss-group-list">
              <li>Share a code or link. Friends join as guests, no account.</li>
              <li>Every phone shows the same live leaderboard.</li>
              <li>Nobody waits until 18 to find out how it went.</li>
            </ul>
            <a href="https://app.simplystroke.app" className="btn btn-fold">
              Start a group round →
            </a>
          </div>

          <div className="ss-lb" aria-hidden="true">
            <div className="ss-lb-top">
              <span>Saturday · Front Nine</span>
              <span className="ss-live">
                <i />
                Live
              </span>
            </div>
            <div className="ss-lb-row">
              <span className="ss-lb-who">
                <span className="ss-lb-dot" style={{ background: "#96C41E" }}>
                  Y
                </span>
                You
              </span>
              <span className="ss-lb-score under">+2</span>
            </div>
            <div className="ss-lb-row">
              <span className="ss-lb-who">
                <span className="ss-lb-dot" style={{ background: "#FF6B6B" }}>
                  M
                </span>
                Marcus
              </span>
              <span className="ss-lb-score over">+5</span>
            </div>
            <div className="ss-lb-row">
              <span className="ss-lb-who">
                <span className="ss-lb-dot" style={{ background: "#4A90D9" }}>
                  D
                </span>
                Dave
              </span>
              <span className="ss-lb-score over">+7</span>
            </div>
            <div className="ss-lb-row">
              <span className="ss-lb-who">
                <span className="ss-lb-dot" style={{ background: "#F5C451" }}>
                  P
                </span>
                Priya
              </span>
              <span className="ss-lb-score under">E</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="ss-stats">
        <div className="ss-stats-inner">
          <div className="eyebrow">Stats that mean something</div>
          <h2 className="h2-display">Improvement you can actually see.</h2>
          <p className="section-lede">
            No spreadsheet. Just the handful of numbers that tell you whether
            your game is moving.
          </p>

          <div className="ss-stats-grid">
            <div className="ss-stat">
              <div className="ss-stat-num">87</div>
              <div className="ss-stat-lbl">Average, last 10 rounds</div>
            </div>
            <div className="ss-stat">
              <div className="ss-stat-num">82</div>
              <div className="ss-stat-lbl">Best round</div>
            </div>
            <div className="ss-stat">
              <div className="ss-spark">
                <span style={{ height: "90%" }} />
                <span style={{ height: "72%" }} />
                <span style={{ height: "80%" }} />
                <span style={{ height: "55%" }} />
                <span style={{ height: "60%" }} />
                <span style={{ height: "40%" }} />
              </div>
              <div className="ss-stat-lbl">Score trend, heading down</div>
            </div>
            <div className="ss-stat">
              <div className="ss-stat-num">+1.4</div>
              <div className="ss-stat-lbl">Your hardest hole, vs par</div>
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
                <div className="ss-watch-screen video">
                  {/* Real capture: four taps on the wrist count strokes, then
                      Next advances the hole — synced live from the phone. */}
                  <AppClip
                    src="/videos/watch-live-round.mp4"
                    label="SimplyStroke on Apple Watch: tapping the ball counts strokes, Next advances the hole"
                  />
                </div>
              </div>
              <div className="ss-watch-realtag">Actual app footage</div>
            </div>
          </div>
          <div className="ss-watch-copy">
            <div className="pill">Apple Watch · Coming soon</div>
            <h2>Leave the phone in the bag.</h2>
            <p className="ss-watch-p">
              Count every stroke from your wrist. A tap on the watch face logs
              the shot with a haptic tick, undo fixes it if you double-tapped,
              and your round syncs straight to your phone&apos;s scorecard. The
              best free golf app for Apple Watch, once it lands.
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
            <div className="ss-screen-sub">
              Or skip it and just count. Your call.
            </div>
          </div>

          <div className="ss-screen-item">
            <div className="mini-wrap">
              <div className="mini-frame">
                <div className="mini-screen video">
                  <AppClip
                    src="/videos/phone-active-round.mp4"
                    label="SimplyStroke active round screen: tapping the giant golf ball counts a stroke"
                  />
                </div>
              </div>
            </div>
            <div className="ss-screen-caption">
              <span className="ss-screen-stepnum">3</span>Active round
            </div>
            <div className="ss-screen-sub">Actual footage, not a mockup</div>
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

      {/* ===================== TRUST STRIP ===================== */}
      <section className="ss-trust">
        <div className="ss-trust-grid">
          <div className="ss-trust-cell">
            <h3>Free to play</h3>
            <p>No ads mid-round, no catch. Start counting today.</p>
          </div>
          <div className="ss-trust-cell">
            <h3>Works offline</h3>
            <p>No signal on the back nine? No problem.</p>
          </div>
          <div className="ss-trust-cell">
            <h3>No account needed</h3>
            <p>Play without signing in. Sign in only to back up and sync.</p>
          </div>
          <div className="ss-trust-cell">
            <h3>Yours to delete</h3>
            <p>One tap removes your account and every round, for good.</p>
          </div>
        </div>
      </section>

      {/* ===================== ADHD SOFT NOD ===================== */}
      <section className="ss-adhdnod">
        <div className="ss-adhdnod-box">
          <h2 className="h2-display">
            Lose the count by the next tee? You&apos;re in good company.
          </h2>
          <p>
            Golf asks you to hold a number in your head for twenty minutes while
            nine other things pull at your attention. Some brains just
            won&apos;t. SimplyStroke holds the number so you don&apos;t have to.
          </p>
          <Link href="/adhd-golf/" className="ss-adhdnod-link">
            More on golf with ADHD →
          </Link>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" className="section">
        <div className="section-narrow">
          <div className="eyebrow">Fair questions</div>
          <h2 className="h2-display">The stuff you&apos;d ask on the first tee.</h2>
          <div className="faq-list">
            {faqs.map(({ q, a }) => (
              <div className="faq-item" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
          <p className="section-lede" style={{ marginTop: 36 }}>
            Learning the ropes? Start with our{" "}
            <Link href="/guides/">golf scoring and rules guides</Link>, see{" "}
            <Link href="/golf-stroke-counter/">
              what a golf stroke counter is and how to pick one
            </Link>
            , or check{" "}
            <Link href="/compare/">
              how SimplyStroke compares to 18Birdies, Arccos and the rest
            </Link>
            .
          </p>
          <p className="section-lede">
            Built for the beautifully distractible?{" "}
            <Link href="/adhd-golf/">
              See why SimplyStroke is the golf app for ADHD brains →
            </Link>
          </p>
        </div>
      </section>

      {/* ===================== FINAL CTA / WAITLIST ===================== */}
      <WaitlistSection source="home" heading="Play your next round with it." />
    </main>
  );
}
