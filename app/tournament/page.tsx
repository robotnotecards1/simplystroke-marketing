import type { Metadata } from "next";
import Link from "next/link";
import TournamentBoard from "@/components/TournamentBoard";
import TrackedCta from "@/components/TrackedCta";
import {
  BallOnGreenIcon,
  GolfBagIcon,
  ScorecardIcon,
} from "@/components/icons";
import { APP_STORE_URL, APP_URL, og } from "@/lib/site";

const TITLE =
  "Golf Tournament App: One Live Leaderboard | SimplyStroke";
const DESCRIPTION =
  "Run a scramble, best ball or stroke event across every group on one live leaderboard. Players join by code, and anyone can follow along on the web. Coming soon.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tournament/" },
  openGraph: og(TITLE, DESCRIPTION, "/tournament/"),
};

// On-page FAQ, mirrored as FAQPage schema below — keep the two in sync.
// Answers stay accurate to a feature that is coming soon, not yet available:
// no promised dates, hosting flagged as a planned Pro feature, joining free.
const faqs = [
  {
    q: "What is a SimplyStroke tournament?",
    a: "A tournament links many playing groups into one event with a single live leaderboard. Everyone plays their own round on their own phone, and every score rolls up to the same board in real time. It is built for scrambles, leagues, outings and charity days.",
  },
  {
    q: "What formats can I run?",
    a: "Three. Scramble (teams play the best shot each hole), Best Ball (teams, where the best individual score on each hole counts) and Stroke (individual play, gross or net).",
  },
  {
    q: "How do players join?",
    a: "The host shares a join code. Players enter it on their phone and start tapping their scores, with no account and no setup.",
  },
  {
    q: "Can people watch without the app?",
    a: "Yes. Every tournament has a public spectator leaderboard you can open in a web browser from a shareable link. It is made for a clubhouse screen or for sharing with people who are not playing.",
  },
  {
    q: "Can I host one right now?",
    a: "Tournament is coming soon. Joining a tournament that someone else hosts will be free, and hosting your own is planned as a Pro feature.",
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

export default function TournamentPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ===================== HERO ===================== */}
      <header className="page-hero">
        <div className="page-hero-inner">
          <div className="pill">Tournament · Coming soon</div>
          <h1>
            Every group.{" "}
            <br />
            <span className="accent">One live leaderboard.</span>
          </h1>
          <p className="lede">
            Run a golf event across as many groups as you like — a scramble, a
            league, a charity day — with every score on one live, cross-group
            leaderboard. Players join by code from their own phones, and anyone
            can follow along on the web.
          </p>
          <div className="cta-row">
            <span className="ss-hero-launch">Coming soon · Joining will be free</span>
          </div>
        </div>
      </header>

      {/* ===================== HOW IT WORKS + BOARD ===================== */}
      <section className="ss-tourney">
        <div className="ss-tourney-inner">
          <div className="ss-tourney-copy">
            <div className="eyebrow">How it works</div>
            <h2 className="h2-display">One code. Every group. One board.</h2>
            <p className="ss-tourney-p">
              The host creates a tournament and picks a format. Everyone else
              joins with a short code and plays their own round — the same
              one-tap scoring as always. Every group&apos;s scores roll up to a
              single leaderboard that updates live, so the whole field can see
              where it stands without waiting on a scorer&apos;s table.
            </p>
            <ul className="ss-tourney-list">
              <li>
                <strong>Made for the whole event.</strong>{" "}
                Charity scrambles, league nights, company outings, buddy trips.
              </li>
              <li>
                <strong>No math, no clipboard.</strong>{" "}
                Scores total themselves and sort the field in real time.
              </li>
              <li>
                <strong>Same simple app.</strong>{" "}
                No setup for players, no learning curve, big taps.
              </li>
            </ul>
          </div>

          <TournamentBoard />
        </div>
      </section>

      {/* ===================== FORMATS ===================== */}
      <section className="section alt-section">
        <div className="section-inner">
          <div className="eyebrow">Three formats</div>
          <h2 className="h2-display">Pick how the field plays.</h2>
          <p className="section-lede">
            Choose the format when you create the tournament. The leaderboard
            scores and ranks every group for you.
          </p>

          <div className="ss-features-grid">
            <div className="ss-feature">
              <div className="icon-tile">
                <GolfBagIcon />
              </div>
              <h3>Scramble</h3>
              <p>
                Teams play the best shot each hole, then hit the next one from
                there. The friendliest format for a mixed-ability charity day.
              </p>
            </div>
            <div className="ss-feature">
              <div className="icon-tile">
                <BallOnGreenIcon />
              </div>
              <h3>Best Ball</h3>
              <p>
                Teams, but everyone plays their own ball. The best individual
                score on each hole counts toward the team.
              </p>
            </div>
            <div className="ss-feature">
              <div className="icon-tile">
                <ScorecardIcon />
              </div>
              <h3>Stroke</h3>
              <p>
                Individual play, gross or net. Every golfer in the event, ranked
                on one leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SPECTATOR ===================== */}
      <section className="section">
        <div className="section-narrow">
          <div className="eyebrow">Spectator view</div>
          <h2 className="h2-display">Put the leaderboard on the big screen.</h2>
          <p className="section-lede">
            Every tournament has a public leaderboard that lives on the web.
            Share the link and anyone can watch the field move — no app, no
            account, no login. Drop it on the clubhouse TV, text it to the group
            chat, or hand it to the people who came to watch rather than play.
          </p>
        </div>
      </section>

      {/* ===================== AVAILABILITY ===================== */}
      <section className="section alt-section">
        <div className="section-narrow">
          <div className="eyebrow">Availability</div>
          <h2 className="h2-display">Coming soon.</h2>
          <p className="section-lede">
            Tournament is coming soon. We&apos;d rather turn it on carefully
            than promise a date we can&apos;t keep.
          </p>
          <p className="section-lede">
            Joining a tournament will always be free, and hosting your own is
            planned as a Pro feature. Meanwhile, SimplyStroke for an everyday
            round is free today: get it on the{" "}
            <TrackedCta
              event="app_store_click"
              ctaLocation="tournament_appstore"
              href={APP_STORE_URL}
            >
              App Store
            </TrackedCta>{" "}
            or{" "}
            <TrackedCta
              event="web_app_click"
              ctaLocation="tournament_webapp"
              href={APP_URL}
            >
              play in your browser
            </TrackedCta>
            .
          </p>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="section">
        <div className="section-narrow">
          <div className="eyebrow">Fair questions</div>
          <h2 className="h2-display">Tournament, answered.</h2>
          <div className="faq-list">
            {faqs.map(({ q, a }) => (
              <div className="faq-item" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
          <p className="section-lede" style={{ marginTop: 36 }}>
            New to group scoring? See{" "}
            <Link href="/#group">how live group rounds work</Link>, or head back
            to the <Link href="/">SimplyStroke home page</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
