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

export const metadata: Metadata = {
  title: "SimplyStroke — The One-Tap Golf Scorecard App",
  description:
    "One tap counts your strokes — no math, no menus, no losing count mid-hole. Built for ADHD golfers and anyone who forgets. Coming 2026 — join the waitlist.",
  alternates: { canonical: "/" },
  openGraph: og(
    "SimplyStroke — The One-Tap Golf Scorecard App",
    "One tap counts your strokes — no math, no menus, no losing count mid-hole. Built for ADHD golfers and anyone who forgets. Coming 2026 — join the waitlist.",
    "/"
  ),
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

      {/* ===================== HERO ===================== */}
      <header className="ss-hero">
        <div className="ss-hero-blob-a" />
        <div className="ss-hero-blob-b" />
        <div className="container ss-hero-inner">
          <div className="ss-hero-copy">
            <h1 className="ss-hero-h1">
              Master your round,
              <br />
              <span className="accent">effortlessly.</span>
            </h1>
            <p className="ss-hero-p">
              <strong>No counting. No math. No stress. Just Stroke.</strong>{" "}
              One giant button logs each stroke, and at the end you get a
              scorecard so clean your partners will wonder if you&apos;ve got a
              secret caddy. No mid-fairway brain freezes — just tap, walk,
              repeat.
            </p>
            <StoreBadges />
            <div className="ss-hero-cta">
              <a href="#waitlist" className="btn btn-hero">
                Join the waitlist →
              </a>
              <span className="ss-hero-launch">Launching 2026</span>
            </div>
          </div>
          <HeroPhone />
        </div>
      </header>

      {/* ===================== PROBLEM / HOW IT WORKS ===================== */}
      <section id="how-it-works" className="ss-problem">
        <div className="eyebrow">The problem with most golf apps</div>
        <h2 className="h2-display">They&apos;re a distraction.</h2>
        <p className="ss-problem-p">
          We&apos;ve all been there. Other scoring apps can be more distracting
          than a rogue cart on the fairway — menus, handicaps, GPS overlays,
          ads, sign-ups. By the third hole you&apos;re wrestling with your phone
          instead of your next shot. SimplyStroke cuts through the noise and
          keeps the single job:{" "}
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
              <div className="ss-step-title">Tap with confidence</div>
              <p className="ss-step-p">
                Every swing is one no-look tap on a button built for the course.
                You&apos;ll wonder how you played without it.
              </p>
            </div>
            <div className="ss-step">
              <div className="ss-step-num">
                <span>2</span>
              </div>
              <div className="ss-step-title">Seamless progression</div>
              <p className="ss-step-p">
                The app carries your running total. No adding, no remembering —
                your head stays on the next shot.
              </p>
            </div>
            <div className="ss-step">
              <div className="ss-step-num">
                <span>3</span>
              </div>
              <div className="ss-step-title">Instant scorecard</div>
              <p className="ss-step-p">
                A clean, accurate scorecard with the math already done — ready
                to share, ready to settle the debate on 18.
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
              to. Tap, forget, move on — your focus stays where it belongs: the
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
                  You reach the green genuinely unsure if it&apos;s your third
                  or fourth stroke. Every. Single. Time.
                </span>
              </div>
              <div className="ss-fold-card">
                <div className="icon-tile">
                  <ScorecardIcon />
                </div>
                <span>
                  That tiny scorecard pencil is a noble effort — but be honest,
                  it never makes it past the first few holes. This one actually
                  works.
                </span>
              </div>
              <div className="ss-fold-card">
                <div className="icon-tile">
                  <BallPinIcon />
                </div>
                <span>
                  One giant button means zero distractions. No accidental taps,
                  no getting lost in menus mid-round.
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
            Keep your head in the round.
            <br />
            We&apos;ll keep the <span className="accent">count.</span>
          </h2>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section id="features" className="ss-features">
        <div className="ss-features-inner">
          <div className="eyebrow">What you get</div>
          <h2 className="h2-display">Everything you need. Nothing you don&apos;t.</h2>

          <div className="ss-features-grid">
            <div className="ss-feature">
              <div className="icon-tile">
                <HappyBallIcon />
              </div>
              <h3>One giant tap target</h3>
              <p>
                A stroke button that fills the screen. No fumbling, no
                squinting, no mis-taps — even with a glove on.
              </p>
            </div>
            <div className="ss-feature">
              <div className="icon-tile">
                <ScorecardIcon />
              </div>
              <h3>Scorecard, done for you</h3>
              <p>
                Every hole totals automatically with vs-par at a glance.
                Birdies, pars and bogeys colour-coded for instant review.
              </p>
            </div>
            <div className="ss-feature">
              <div className="icon-tile">
                <GolfBagIcon />
              </div>
              <h3>Fits every round</h3>
              <p>
                Nine holes or a full eighteen, match play or a casual round.
                One tap counts them all, seamlessly.
              </p>
            </div>
            <div className="ss-feature">
              <div className="icon-tile">
                <FlagIcon />
              </div>
              <h3>Zero clutter, zero ads</h3>
              <p>
                No feeds, no upsells, no distractions. Open it, count your
                round, close it. That&apos;s the whole app.
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
              the shot, the Digital Crown makes corrections a breeze, and your
              round syncs straight to your phone&apos;s scorecard. Keep the phone
              tucked away and focus on the follow-through.
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
            <div className="ss-screen-sub">Or skip it and just count — your call</div>
          </div>

          <div className="ss-screen-item">
            <ActiveRoundPhone />
            <div className="ss-screen-caption">
              <span className="ss-screen-stepnum">3</span>Active round
            </div>
            <div className="ss-screen-sub">The only screen that truly matters</div>
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
            <div className="ss-screen-sub">Every hole, math done — pure and simple</div>
          </div>
        </div>
      </section>

      {/* ===================== WAITLIST CTA ===================== */}
      <WaitlistSection source="home" />
    </main>
  );
}
