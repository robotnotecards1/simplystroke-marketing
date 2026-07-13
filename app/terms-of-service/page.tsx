import type { Metadata } from "next";
import Link from "next/link";
import { og } from "@/lib/site";

/**
 * DRAFT — NEEDS LEGAL REVIEW BEFORE LAUNCH.
 *
 * Written to be factually accurate to what SimplyStroke actually is today:
 *   - a free golf stroke-counter (web app at app.simplystroke.app; mobile to
 *     follow) that works offline with no account required
 *   - optional accounts via Google or email/password (Supabase Auth)
 *   - optional cloud backup of rounds, and group rounds (a shared join code +
 *     live shared scorecard) for people who sign in
 *   - GPS "near me" course lookup (OpenStreetMap Overpass + GolfCourseAPI)
 *   - no subscription today; "buy me a beer" tips and any future Pro tier are
 *     stubbed/planned, not yet charging anyone
 *   - the marketing site (this site) also runs a waitlist + analytics; see the
 *     Privacy Policy for data specifics
 *
 * It is NOT a substitute for a lawyer. Governing law is set to North
 * Carolina with venue in Mecklenburg County; a lawyer should still confirm
 * the payments/liability language fits the entity that will actually operate
 * SimplyStroke before this is relied on at launch.
 */

const TITLE = "Terms of Service | SimplyStroke";
const DESCRIPTION =
  "The plain-English terms for using SimplyStroke — the free golf stroke counter. What you can expect from us, and what we expect from you.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms-of-service/" },
  robots: { index: true, follow: true },
  openGraph: og(TITLE, DESCRIPTION, "/terms-of-service/"),
};

const UPDATED = "July 12, 2026";
const CONTACT = "hello@simplystroke.app";

export default function TermsPage() {
  return (
    <main>
      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">Legal</div>
          <h1>Terms of Service</h1>
          <div className="post-meta">
            <span>Last updated {UPDATED}</span>
          </div>
        </div>
      </header>

      <article className="prose">
        <p>
          <strong>The short version:</strong> SimplyStroke is a free tool for
          counting your golf strokes. Use it for that and you&apos;ll never hear
          from our lawyers. It works offline with no account; if you make one, a
          few extra features turn on. We do our best to keep it running, but it
          comes as-is, your scores are whatever you tap in, and it isn&apos;t an
          official scorer. Be decent to other players in group rounds. That&apos;s
          basically it — the rest is detail.
        </p>

        <h2>1. Agreeing to these terms</h2>
        <p>
          By using SimplyStroke — the website at simplystroke.app, the app at
          app.simplystroke.app, and any mobile apps we release — you agree to
          these terms. If you don&apos;t agree, please don&apos;t use it. If you
          use SimplyStroke on behalf of someone else, you&apos;re confirming
          you&apos;re allowed to accept these terms for them.
        </p>

        <h2>2. What SimplyStroke is</h2>
        <p>
          SimplyStroke is a golf stroke counter. You tap to count strokes, add
          penalty strokes, and get a scorecard at the end of the round. The core
          counter is free and works fully offline — no account, no subscription,
          no ads. Some optional extras (below) need an account or a network
          connection.
        </p>
        <p>
          Optional extras include: backing your rounds up to the cloud so they
          follow you across devices; <strong>group rounds</strong>, where you
          share a join code and everyone&apos;s scorecard shows up in one live
          view; looking up nearby courses by GPS to auto-fill par; and sharing a
          finished scorecard as an image or text.
        </p>
        <p>
          Some features are new and may change, break, or disappear while
          we&apos;re still building them. We&apos;ll try not to lose your data
          when that happens (see below), but we can&apos;t promise any specific
          feature will stick around.
        </p>

        <h2>3. Who can use it</h2>
        <p>
          SimplyStroke isn&apos;t aimed at children under 13, and you need to be
          at least 13 to make an account. If you&apos;re between 13 and the age
          of majority where you live, you should have a parent or guardian look
          these terms over with you.
        </p>

        <h2>4. Your account</h2>
        <p>
          You can use the stroke counter without ever signing in. If you do
          create an account — with Google or an email and password — keep your
          login details to yourself. You&apos;re responsible for what happens
          under your account, so tell us at{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a> if you think someone else
          has gotten into it. You can delete your account at any time; email us
          and we&apos;ll remove it and the rounds tied to it.
        </p>

        <h2>5. Your scores and your data</h2>
        <p>
          Your rounds are yours. We don&apos;t claim ownership of your scores.
          Every stroke saves to your device first, and only syncs to the cloud
          if you&apos;re signed in and online — so the app keeps working when the
          course has no signal.
        </p>
        <p>
          When you start or join a <strong>group round</strong>, the other
          players in that round can see your per-hole scores and total for that
          round, live. Only share a join code with people you actually want in
          your group. When you share a scorecard image or text, that&apos;s you
          choosing to send your own scores somewhere — what happens to it after
          that is up to you and whoever you sent it to.
        </p>
        <p>
          How we handle the data behind all of this — your email, your synced
          rounds, analytics — is spelled out in our{" "}
          <Link href="/privacy/">Privacy Policy</Link>.
        </p>

        <h2>6. It counts strokes — it isn&apos;t an official scorer</h2>
        <p>
          SimplyStroke records the numbers <em>you</em> enter. It doesn&apos;t
          watch you play, it doesn&apos;t verify anything, and it isn&apos;t a
          system of record for handicaps or competition. We are not affiliated
          with the USGA, R&amp;A, GHIN, or any golf governing body or tour. Par
          data pulled from third-party sources can be wrong or missing, and any
          &ldquo;share to GHIN&rdquo; convenience is just formatting your own
          numbers for you to submit yourself. For anything official — a
          tournament, a posted handicap — follow the process your club or
          association actually requires.
        </p>

        <h2>7. Playing nice</h2>
        <p>Please don&apos;t use SimplyStroke to:</p>
        <ul>
          <li>break the law, or help anyone else break it;</li>
          <li>
            get into accounts, group rounds, or data that aren&apos;t yours —
            including guessing or scraping other people&apos;s join codes;
          </li>
          <li>
            attack, overload, reverse-engineer, or otherwise mess with how the
            service runs;
          </li>
          <li>
            resell or repackage the service as your own, or scrape it at scale;
            or
          </li>
          <li>upload anything abusive, or impersonate someone else.</li>
        </ul>
        <p>
          If you do, we may suspend or close your access. We&apos;ll try to be
          reasonable about it.
        </p>

        <h2>8. Payments, tips, and Pro</h2>
        <p>
          Today, SimplyStroke costs nothing and there is nothing to buy. If we
          later add optional things — a &ldquo;buy me a beer&rdquo; tip, or a Pro
          tier with extra features — they&apos;ll be clearly optional, and any
          charge will run through the App Store, Google Play, or a payment
          processor under <em>their</em> terms and refund rules, not ours. The
          free stroke counter will stay free. We&apos;ll update these terms
          before any of that actually starts charging anyone.
        </p>

        <h2>9. Other companies we rely on</h2>
        <p>
          SimplyStroke is glued together from services other people run: Supabase
          (accounts and cloud data), Google (sign-in), OpenStreetMap&apos;s
          Overpass API and GolfCourseAPI (finding courses and par), Vercel
          (hosting), and — for the mobile apps — Apple&apos;s App Store and Google
          Play. Your use of those pieces is also subject to their terms, and we
          aren&apos;t responsible for outages or behaviour on their end.
        </p>

        <h2>10. We do our best, but it&apos;s &ldquo;as is&rdquo;</h2>
        <p>
          We work hard to make SimplyStroke reliable and to never lose a stroke
          you&apos;ve tapped. But we provide it &ldquo;as is&rdquo; and &ldquo;as
          available,&rdquo; without warranties of any kind, to the fullest extent
          the law allows. We don&apos;t promise it will always be available,
          bug-free, or that features (especially newer ones like group rounds and
          GPS course lookup) will work perfectly everywhere. It&apos;s a tool to
          help you enjoy your round — not something to bet your livelihood on.
        </p>

        <h2>11. Limits on our liability</h2>
        <p>
          To the fullest extent the law allows, SimplyStroke and the people
          behind it won&apos;t be liable for indirect or consequential losses, or
          for things like a lost or miscounted score, a round that didn&apos;t
          sync, or a wrong par from a course database. Golf is golf; a counting
          app is a counting app. If we&apos;re found liable for something despite
          all this, our total liability is limited to the greater of what you
          paid us in the last 12 months (for most people, nothing) or US $50.
        </p>

        <h2>12. Ending things</h2>
        <p>
          You can stop using SimplyStroke whenever you like, and delete your
          account by emailing us. We may suspend or end your access if you break
          these terms or misuse the service. If we ever shut the service down,
          we&apos;ll try to give reasonable notice so you can export your rounds
          first.
        </p>

        <h2>13. Changes to these terms</h2>
        <p>
          We&apos;ll update these terms as SimplyStroke grows — most obviously
          when the mobile apps ship or if we introduce paid features. When we do,
          we&apos;ll change the date at the top, and for significant changes
          we&apos;ll give notice in the app or by email. Continuing to use
          SimplyStroke after a change means you accept the updated terms.
        </p>

        <h2>14. Governing law</h2>
        <p>
          These terms are governed by the laws of the State of North Carolina,
          without regard to conflict-of-laws rules. Any dispute will be handled
          by the state or federal courts located in Mecklenburg County, North
          Carolina, and you agree to that venue. Nothing here takes away
          consumer-protection rights you have where you live that can&apos;t be
          waived.
        </p>

        <h2>15. Contact</h2>
        <p>
          Questions about these terms, your account, or anything else go to{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>

        <p className="post-cta">
          <Link href="/" className="btn btn-fold">
            Back to SimplyStroke →
          </Link>
        </p>
      </article>
    </main>
  );
}
