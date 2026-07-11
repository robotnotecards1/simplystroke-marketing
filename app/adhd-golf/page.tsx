import type { Metadata } from "next";
import Link from "next/link";
import WaitlistSection from "@/components/WaitlistSection";
import {
  BallOnGreenIcon,
  BallPinIcon,
  ScorecardIcon,
} from "@/components/icons";
import { og } from "@/lib/site";

export const metadata: Metadata = {
  title: "ADHD and Golf: Why You Keep Losing Count (and the Fix)",
  description:
    "Golf asks you to remember a number while doing ten other things. ADHD brains have other plans. See how SimplyStroke counts strokes so you don't have to.",
  alternates: { canonical: "/adhd-golf/" },
  openGraph: og(
    "ADHD and Golf: Why You Keep Losing Count (and the Fix)",
    "Golf asks you to remember a number while doing ten other things. ADHD brains have other plans. See how SimplyStroke counts strokes so you don't have to.",
    "/adhd-golf/"
  ),
};

const faqs = [
  {
    q: "Is there a golf app made for ADHD?",
    a: "Yes. SimplyStroke is a golf app built for ADHD golfers. The whole app is one giant tap-the-ball button that counts your strokes, so working memory never has to hold the number. It launches in 2026 on iPhone, Android and Apple Watch; you can join the waitlist to be told the moment it's live.",
  },
  {
    q: "Why do I keep losing count of my strokes?",
    a: "Because golf quietly asks you to hold a running number in working memory for ten-plus minutes per hole while also planning shots, chatting, walking and looking for your ball. That's a hard task for anyone and a nearly impossible one for ADHD brains. It's a design problem, not a discipline problem. The fix is moving the count out of your head and into a single tap.",
  },
  {
    q: "How is SimplyStroke different from other golf scorecard apps?",
    a: "Most scoring apps bury the score behind menus, GPS overlays, handicaps and ads. SimplyStroke keeps exactly one job on screen: count this stroke. One tap per swing, an undo button for fat fingers, and a finished scorecard with the math already done.",
  },
  {
    q: "Does SimplyStroke work without signal on the course?",
    a: "Yes. SimplyStroke works fully offline, so a dead zone on the back nine never costs you your round.",
  },
  {
    q: "When does SimplyStroke launch?",
    a: "SimplyStroke launches in 2026 on iPhone, Android and Apple Watch. Join the waitlist and we'll send exactly one message when it's live.",
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

export default function AdhdGolfPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="page-hero with-photo">
        <div className="page-hero-inner">
          <div className="pill">The ADHD golf app · Coming 2026</div>
          <h1>
            Golf asks you to remember one number.
            <br />
            <span className="accent">Your brain has other plans.</span>
          </h1>
          <p className="lede">
            SimplyStroke is the golf app for ADHD: one giant button counts
            every stroke, holds the number, and hands you a finished
            scorecard, so your head is free to wander and your score still
            adds up.
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
        <div className="section-narrow">
          <div className="eyebrow">Why the count keeps vanishing</div>
          <h2 className="h2-display">
            It&apos;s not a focus problem. It&apos;s a golf design problem.
          </h2>
          <p className="section-lede">
            Think about what golf actually asks of you on a single par 4: pick
            a club, read the wind, hit, watch the ball, walk, chat, find the
            ball, plan again, hit again. And the whole time, silently
            increment a number in your head and don&apos;t lose it. For ten
            minutes. While everything on a golf course is more interesting
            than that number.
          </p>
          <p className="section-lede">
            Working memory is exactly the thing ADHD brains don&apos;t hand
            out for free. So the count evaporates somewhere between your
            approach shot and the green, and you end up doing forensic
            reconstruction: <em>driver, chip, the one in the bunker… was the
            bunker one shot or two?</em>{" "}
            The pencil-and-scorecard fix fails
            for the same reason: it&apos;s one more boring thing to remember.
          </p>
          <p className="section-lede">
            The fix that actually works is embarrassingly simple: stop holding
            the number. Move it somewhere that can&apos;t get distracted.
          </p>
        </div>
      </section>

      <section className="section alt-section">
        <div className="section-narrow">
          <div className="eyebrow">The fix</div>
          <h2 className="h2-display">One tap. The app remembers.</h2>
          <p className="section-lede">
            SimplyStroke turns your whole phone screen into a golf ball. Swing,
            tap, done. The app holds your stroke count, your running total
            and your vs-par, and builds the scorecard as you play. Nothing to
            navigate, nothing to poke, nothing else to wander off into.
          </p>
          <div className="ss-fold-cards" style={{ marginTop: 40 }}>
            <div className="ss-fold-card">
              <div className="icon-tile">
                <BallOnGreenIcon />
              </div>
              <span>
                One giant tap target you can hit without looking, or from
                your wrist on Apple Watch.
              </span>
            </div>
            <div className="ss-fold-card">
              <div className="icon-tile">
                <ScorecardIcon />
              </div>
              <span>
                The scorecard fills itself in. Totals, vs-par, color-coded
                holes, math already done.
              </span>
            </div>
            <div className="ss-fold-card">
              <div className="icon-tile">
                <BallPinIcon />
              </div>
              <span>
                Tapped twice by accident? Undo. Fully offline, no ads, no
                feeds, no menus mid-round.
              </span>
            </div>
          </div>
          <Link
            href="/features/"
            className="btn btn-fold"
            style={{ marginTop: 40 }}
          >
            See every feature →
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-narrow">
          <div className="eyebrow">Fair questions</div>
          <h2 className="h2-display">ADHD golf app FAQ</h2>
          <div className="faq-list">
            {faqs.map(({ q, a }) => (
              <div className="faq-item" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
          <p className="section-lede" style={{ marginTop: 36 }}>
            Want the longer story on why ADHD brains and stroke counting
            don&apos;t mix?{" "}
            <Link href="/blog/adhd-and-golf-losing-count/">
              Read: ADHD and golf, and how to stop losing count mid-round
            </Link>
            .
          </p>
        </div>
      </section>

      <WaitlistSection
        source="adhd-golf"
        heading="Your brain has better things to hold."
      />
    </main>
  );
}
