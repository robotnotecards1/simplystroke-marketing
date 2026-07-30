import type { Metadata } from "next";
import "./home-new.css";
import Footage from "./Footage";
import TrackedCTA from "./TrackedCTA";
import NotifyForm from "./NotifyForm";

// EXPERIMENTAL redesign route. Isolated from the live "/" homepage:
// - noindex/nofollow (excluded from search + the sitemap) while under review
// - no canonical override; "/" stays the canonical homepage
// Nav + Footer + analytics (umami/GA4) come from the root layout, so this file
// only owns the <main>. CTA clicks are tracked with distinct event names +
// { route:"/home-new", variant:"redesign" } metadata so results compare against
// the current homepage. See TrackedCTA.tsx / NotifyForm.tsx.
export const metadata: Metadata = {
  title: "SimplyStroke — Never lose count again",
  description:
    "Tap once after every shot and SimplyStroke keeps the hole, the round, and your score to par. Play free in your browser, no download.",
  robots: { index: false, follow: false },
};

const APP_URL = "https://app.simplystroke.app";

const faqs = [
  {
    q: "Is it an app or a website?",
    a: "Right now it is a website you play in your browser at app.simplystroke.app, so there is nothing to download. Dedicated iPhone, Android and Apple Watch apps are coming soon.",
  },
  {
    q: "Is it free?",
    a: "Yes. Playing a round and keeping your score is free right now, with no subscription and no card to start.",
  },
  {
    q: "Do I need an account?",
    a: "No. Start a round as a guest with no sign-in. An account only comes in if you want to back up and sync your rounds across devices.",
  },
  {
    q: "Does it work without signal?",
    a: "Yes. Once the round is open, every tap is saved on your device, so a dead zone on the course never costs you the card. It syncs when you are back in range.",
  },
  {
    q: "What if I tap twice by accident?",
    a: "Hit undo. Same screen, one tap, no digging through a menu mid-hole. You can also long-press to set an exact number, or edit any hole later.",
  },
  {
    q: "How do friends join my round?",
    a: "Share a six-character code or a link. They join as a guest with no account, everyone taps their own strokes, and every score lands on one live card.",
  },
];

export default function HomeNew() {
  return (
    <main id="top" className="hn-main">
      {/* ===================== HERO ===================== */}
      <header className="hn-hero">
        <div className="hn-hero-grid">
          <div className="hn-hero-copy">
            <span className="hn-hero-avail">
              <b>Live now</b> · Plays in your browser
            </span>
            <h1 className="hn-h1">
              Never lose <span className="accent">count</span> again.
            </h1>
            <p className="hn-hero-sub">
              Tap once after every shot. SimplyStroke keeps the hole, the round,
              and your score to par. No GPS screens, no setup rituals, no mental
              math.
            </p>
            <div className="hn-hero-ctarow">
              <TrackedCTA event="play_hero">Play now →</TrackedCTA>
            </div>
            <p className="hn-hero-micro">
              <b>Free to play.</b> No account, no download.
            </p>
            <p className="hn-hero-micro" style={{ marginTop: 6 }}>
              Native iPhone, Android and Apple Watch apps coming soon.
            </p>
          </div>

          <div className="hn-phone-wrap">
            <div className="hn-phone">
              <div className="hn-phone-screen">
                <Footage
                  src="/videos/phone-active-round.mp4"
                  poster="/images/app-screens/round.png"
                  label="SimplyStroke active round: tapping the golf ball counts each stroke and the total updates live."
                />
              </div>
            </div>
            <div className="hn-phone-tag">Actual app footage</div>
          </div>
        </div>
      </header>

      {/* ===================== PROOF / ANATOMY ===================== */}
      <section className="hn-proof" aria-labelledby="hn-proof-h">
        <div className="hn-proof-grid">
          <div className="hn-shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/app-screens/round.png"
              alt="SimplyStroke active-round screen: a large golf-ball button, the running stroke count, and score to par."
              width={270}
              height={540}
              loading="lazy"
            />
          </div>
          <div className="hn-proof-copy">
            <span className="hn-section-eyebrow">One screen, one job</span>
            <h2 id="hn-proof-h" className="h2-display" style={{ marginTop: 10 }}>
              The whole app is this screen.
            </h2>
            <ul className="hn-notes">
              <li>
                <span className="hn-dot" aria-hidden="true" />
                <span>
                  <b>Tap the giant ball.</b> One tap per shot, on a target big
                  enough to hit without looking.
                </span>
              </li>
              <li>
                <span className="hn-dot" aria-hidden="true" />
                <span>
                  <b>The number climbs itself.</b> Stroke count, hole total and
                  score to par update live. You never add anything up.
                </span>
              </li>
              <li>
                <span className="hn-dot" aria-hidden="true" />
                <span>
                  <b>Chunked one into the trees?</b> Hit undo, or long-press to
                  set the exact number. Then keep playing.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================== PROBLEM / CONTRAST ===================== */}
      <section className="hn-contrast" aria-labelledby="hn-contrast-h">
        <div className="hn-contrast-inner">
          <span className="hn-section-eyebrow">Wait, was that a six?</span>
          <h2 id="hn-contrast-h" style={{ marginTop: 10 }}>
            They built a spreadsheet. You wanted your score.
          </h2>
          <p className="hn-contrast-lede">
            Most golf apps bury the one number you came for under GPS overlays, a
            setup wizard, and a prompt for which club you missed the green with.
            By the third hole you are fighting your phone instead of your swing.{" "}
            <b>SimplyStroke keeps one job on screen: count this stroke.</b>
          </p>
          <div className="hn-vs">
            <div className="hn-vs-col">
              <div className="hn-vs-h">A typical golf app</div>
              <ul className="hn-vs-list">
                <li>Pick GPS, satellite, or list view</li>
                <li>Log the club, the lie, the distance</li>
                <li>Scroll past the feed and the upsell</li>
                <li>Find the score three taps deep</li>
              </ul>
            </div>
            <div className="hn-vs-col you">
              <div className="hn-vs-h">SimplyStroke</div>
              <ul className="hn-vs-list">
                <li>Open it and tap the ball</li>
                <li>One number on screen, always</li>
                <li>No feed, no ads, no account to start</li>
                <li>A finished card waiting on 18</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CONFIDENT LIMITATION ===================== */}
      <section className="hn-band" aria-label="What SimplyStroke does">
        <p>
          It won&apos;t read greens, pick your clubs, or grade your swing. It{" "}
          <span className="accent">counts every shot.</span>
        </p>
        <small>That is the whole promise. It is also the whole app.</small>
      </section>

      {/* ===================== THREE CORE BENEFITS ===================== */}
      <section className="hn-benefits" aria-labelledby="hn-benefits-h">
        <div className="hn-benefits-inner">
          <span className="hn-section-eyebrow">On the course</span>
          <h2 id="hn-benefits-h" className="h2-display" style={{ marginTop: 10 }}>
            Three things it does. Nothing it doesn&apos;t.
          </h2>
          <div style={{ marginTop: 8 }}>
            <div className="hn-benefit">
              <div className="hn-benefit-ord" aria-hidden="true">
                01
              </div>
              <div className="hn-benefit-body">
                <h3>Gloves on, one thumb</h3>
                <p>
                  An oversized button you can hit without looking or peeling a
                  glove off. Counting a shot never pulls your head out of the
                  round.
                </p>
              </div>
            </div>
            <div className="hn-benefit">
              <div className="hn-benefit-ord" aria-hidden="true">
                02
              </div>
              <div className="hn-benefit-body">
                <h3>You never do the math</h3>
                <p>
                  Hole total, round total, score to par, all added up live. The
                  running number lives on the screen instead of in your head, so
                  there is nothing to lose track of.
                </p>
              </div>
            </div>
            <div className="hn-benefit">
              <div className="hn-benefit-ord" aria-hidden="true">
                03
              </div>
              <div className="hn-benefit-body">
                <h3>A dead zone can&apos;t cost you</h3>
                <p>
                  Every tap is saved on your device the moment you make it. Lose
                  signal on the back nine, or your battery dies, and your card is
                  right where you left it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GROUP ROUNDS ===================== */}
      <section className="hn-group" aria-labelledby="hn-group-h">
        <div className="hn-group-inner">
          <span className="hn-eyebrow">Play the group</span>
          <h2 id="hn-group-h">One code. Everyone taps their own. One live card.</h2>
          <p className="hn-group-lede">
            Start a round, share a six-character code, and every golfer counts
            their own strokes on their own phone. One scorecard, updating in real
            time. The scorekeeper&apos;s job, gone.
          </p>
          <div className="hn-steps">
            <div className="hn-step">
              <div className="hn-step-n" aria-hidden="true">
                01
              </div>
              <h3>Share a code</h3>
              <p>Text a six-character code or a link. Friends join as guests, no account.</p>
            </div>
            <div className="hn-step">
              <div className="hn-step-n" aria-hidden="true">
                02
              </div>
              <h3>Everyone taps</h3>
              <p>Each golfer counts their own shots on their own phone.</p>
            </div>
            <div className="hn-step">
              <div className="hn-step-n" aria-hidden="true">
                03
              </div>
              <h3>One live card</h3>
              <p>Every score lands on the same scorecard, updating as you play.</p>
            </div>
          </div>
          <div className="hn-group-cta">
            <TrackedCTA event="play_group" className="btn btn-fold">
              Start a group round →
            </TrackedCTA>
          </div>
        </div>
      </section>

      {/*
        VERIFIED-PROOF PLACEHOLDER — intentionally unpublished.
        No real testimonials, ratings, review counts, or round counts exist yet:
        the old homepage's stat cards (87/82/+1.4) and group leaderboard were
        illustrative, and lib/schema.ts deliberately omits aggregateRating until
        the app earns real reviews. When genuine, attributable golfer reviews or
        App Store ratings exist, add a proof section here. Do NOT ship fabricated
        proof. Until then the real app footage above is the evidence.
      */}

      {/* ===================== FAQ ===================== */}
      <section className="hn-faq" aria-labelledby="hn-faq-h">
        <div className="hn-faq-inner">
          <span className="hn-section-eyebrow">Fair questions</span>
          <h2 id="hn-faq-h" className="h2-display" style={{ marginTop: 10 }}>
            The stuff you&apos;d ask on the first tee.
          </h2>
          <div className="hn-faq-list">
            {faqs.map(({ q, a }) => (
              <div className="hn-faq-item" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="hn-final" aria-labelledby="hn-final-h">
        <div className="hn-final-inner">
          <span className="hn-eyebrow">Your next round</span>
          <h2 id="hn-final-h">Play your next round with it.</h2>
          <p className="hn-final-sub">
            Open it on the first tee and tap your way around. No download, no
            setup, no account. Just your score, done right.
          </p>
          <div className="hn-final-ctarow">
            <TrackedCTA event="play_final">Play now →</TrackedCTA>
          </div>
          <p className="hn-final-micro">
            Free to play. Works right in your browser.
          </p>
          <NotifyForm />
        </div>
      </section>
    </main>
  );
}
