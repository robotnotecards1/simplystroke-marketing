import type { Metadata } from "next";
import Link from "next/link";
import WaitlistSection from "@/components/WaitlistSection";
import {
  BallOnGreenIcon,
  BallPinIcon,
  FlagIcon,
  GolfBagIcon,
  HappyBallIcon,
  ScorecardIcon,
} from "@/components/icons";
import { og } from "@/lib/site";

export const metadata: Metadata = {
  title: "SimplyStroke Features: One-Tap Scoring, Undo, Offline Golf",
  description:
    "Every SimplyStroke feature, from the one-tap stroke counter to instant shareable scorecards. No subscriptions and no GPS clutter. Just simple score tracking.",
  alternates: { canonical: "/features/" },
  openGraph: og(
    "SimplyStroke Features: One-Tap Scoring, Undo, Offline Golf",
    "Every SimplyStroke feature, from the one-tap stroke counter to instant shareable scorecards. No subscriptions and no GPS clutter. Just simple score tracking.",
    "/features/"
  ),
};

const features = [
  {
    icon: <HappyBallIcon />,
    title: "One giant tap target",
    body: "A stroke button that fills the screen. No fumbling, no squinting, no mis-taps mid-swing. Tap it with a glove on, tap it without looking.",
  },
  {
    icon: <ScorecardIcon />,
    title: "Scorecard, done for you",
    body: "Every hole totals automatically with vs-par at a glance. Birdies, pars and bogeys color-coded, and the full card ready to share the second you hole out on 18.",
  },
  {
    icon: <BallPinIcon />,
    title: "Undo, for honest mistakes",
    body: "Tapped twice celebrating? One press of Undo fixes the count. Editing a hole after the fact is just as quick. No menu spelunking.",
  },
  {
    icon: <GolfBagIcon />,
    title: "Fits every round",
    body: "Nine holes or a full eighteen, match play or just messing about at the muni. One tap counts them all.",
  },
  {
    icon: <FlagIcon />,
    title: "Zero clutter, zero ads",
    body: "No feeds, no upsells, nothing to sign into. Open it, count your round, close it.",
  },
  {
    icon: <BallOnGreenIcon />,
    title: "Works fully offline",
    body: "No signal on the back nine? Doesn't matter. Rounds are counted on your phone and sync when you're back in range.",
  },
];

export default function FeaturesPage() {
  return (
    <main>
      <header className="page-hero">
        <div className="page-hero-inner">
          <div className="pill">What you get · Coming 2026</div>
          <h1>
            A simple golf scorecard app.
            <br />
            <span className="accent">Emphasis on simple.</span>
          </h1>
          <p className="lede">
            People find SimplyStroke searching for a golf shot tracking app,
            but there&apos;s no GPS hardware or strokes-gained dashboards here.
            Just the fastest way to track your golf score: tap the ball once
            per swing, and the scorecard writes itself.
          </p>
          <div className="cta-row">
            <Link href="/download/" className="btn btn-hero">
              Join the waitlist →
            </Link>
            <span className="ss-hero-launch">Launching 2026</span>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-inner">
          <div className="eyebrow">Everything in the app</div>
          <h2 className="h2-display">Everything you need. Nothing you don&apos;t.</h2>

          <div className="ss-features-grid">
            {features.map(({ icon, title, body }) => (
              <div className="ss-feature" key={title}>
                <div className="icon-tile">{icon}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="section-narrow">
          <div className="eyebrow">Apple Watch</div>
          <h2 className="h2-display">Leave the phone in the bag.</h2>
          <p className="section-lede">
            Count every stroke from your wrist. A tap on the watch face logs
            the shot, a haptic tick confirms it, the Digital Crown fixes
            mistakes, and your round syncs straight to your phone&apos;s
            scorecard.
          </p>
          <p className="section-lede">
            Built for the beautifully distractible?{" "}
            <Link href="/adhd-golf/">
              See why SimplyStroke is the golf app for ADHD brains →
            </Link>
          </p>
        </div>
      </section>

      <WaitlistSection source="features" />
    </main>
  );
}
