import type { Metadata } from "next";
import Link from "next/link";
import { og } from "@/lib/site";

/**
 * NEEDS LEGAL REVIEW BEFORE RELYING ON IT.
 *
 * Rewritten for the entity that operates SimplyStroke — Seaport Systems LLC
 * (North Carolina) — and verified against the codebase (free local-first
 * stroke counter; optional Supabase accounts via Google/Apple/email; cloud
 * sync + group rounds; expo-location + OSM Overpass + GolfCourseAPI for course
 * lookup; no charges today). Strong-form terms: indemnification, limitation of
 * liability, "as is" disclaimers, binding individual arbitration + class-action
 * waiver with a 30-day opt-out, NC governing law, and Apple App Store terms.
 *
 * Not a substitute for a lawyer. Arbitration clauses, class-action waivers, and
 * liability caps have state-specific enforceability rules — have a licensed NC
 * attorney confirm before launch. Court venue is left as "North Carolina";
 * pin a specific county if desired.
 */

const TITLE = "Terms of Service | SimplyStroke";
const DESCRIPTION =
  "The terms for using SimplyStroke — the free golf stroke counter from Seaport Systems LLC. What you can expect from us, and what we expect from you.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms-of-service/" },
  robots: { index: true, follow: true },
  openGraph: og(TITLE, DESCRIPTION, "/terms-of-service/"),
};

const UPDATED = "July 23, 2026";
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
          These Terms are a binding agreement between you and{" "}
          <strong>Seaport Systems LLC</strong>, a North Carolina limited
          liability company (&ldquo;Seaport Systems,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;), and govern your use of the
          SimplyStroke app (including the web version at app.simplystroke.app) and
          the website at simplystroke.app (together, the &ldquo;Service&rdquo;).
        </p>

        <p>
          <strong>Please read carefully.</strong> Section 12 requires most
          disputes to be resolved by binding individual arbitration and waives
          class actions. Sections 10 and 11 disclaim warranties and limit our
          liability. Section 12 also requires you to indemnify us in certain
          cases. By downloading, accessing, or using the Service, you agree to
          these Terms. If you do not agree, do not use the Service.
        </p>

        <h2>1. What SimplyStroke is</h2>
        <p>
          SimplyStroke is a golf stroke counter. You tap to count strokes, add
          penalties, and get a scorecard. The core counter is free and works
          fully offline — no account, no subscription, no ads. Optional extras
          need an account or a connection: backing rounds up to the cloud so they
          follow you across devices; <strong>group rounds</strong>, where a shared
          join code puts everyone&apos;s scorecard in one live view; and looking
          up nearby courses to auto-fill par. Features may change, break, or be
          removed while we build.
        </p>

        <h2>2. Who can use it</h2>
        <p>
          You must be at least 13 to use the Service and to make an account. If
          you are between 13 and the age of majority where you live, use it only
          with a parent or guardian who agrees to these Terms. By using the
          Service you confirm you meet these requirements and that the information
          you give is accurate.
        </p>

        <h2>3. Your account</h2>
        <p>
          You can use the stroke counter without signing in. If you create an
          account — with email and password, Google, or Sign in with Apple — keep
          your credentials to yourself. You are responsible for activity under
          your account. Tell us at{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a> if you think someone else
          has gotten into it. You can delete your account any time from within the
          app, which removes it and the rounds tied to it.
        </p>

        <h2>4. License to use the Service</h2>
        <p>
          Subject to these Terms, we grant you a personal, limited, non-exclusive,
          non-transferable, revocable license to use the app on devices you own or
          control, for your own personal, non-commercial use.
        </p>

        <h2>5. Your scores and your content</h2>
        <p>
          <strong>Your rounds are yours.</strong> We do not claim ownership of
          your scores. In guest mode they stay on your device and never reach us.
          When you use an account or a group round, you grant us a limited,
          non-exclusive, royalty-free license to host, store, process, transmit,
          and display your content <em>solely to run the Service for you</em> —
          for example, to sync your rounds and to show a shared scorecard to the
          players in a group round. That license ends when you delete the content
          or your account, apart from routine backups or where the law requires
          retention. You are responsible for what you enter and share, including
          anything visible to other players in a group round.
        </p>
        <p>
          How we handle the data behind all this is in our{" "}
          <Link href="/privacy/">Privacy Policy</Link>.
        </p>

        <h2>6. It counts strokes — it is not an official scorer</h2>
        <p>
          SimplyStroke records the numbers <em>you</em> enter. It does not watch
          you play, verify anything, or act as a system of record for handicaps or
          competition. We are <strong>not affiliated with</strong> the USGA, The
          R&amp;A, GHIN, the PGA, or any golf governing body, tour, or club.
          Course and par data comes from third-party sources (including
          GolfCourseAPI and OpenStreetMap) and can be wrong or missing; you are
          responsible for confirming scores and course information. For anything
          official — a tournament, a posted handicap — follow the process your
          club or association requires.
        </p>

        <h2>7. Playing nice</h2>
        <p>You agree not to:</p>
        <ul>
          <li>use the Service unlawfully or to help anyone else break the law;</li>
          <li>
            access accounts, group rounds, or data that are not yours — including
            guessing or scraping other people&apos;s join codes;
          </li>
          <li>
            copy, modify, reverse-engineer, or extract the app&apos;s source code,
            except where that restriction is prohibited by law;
          </li>
          <li>
            scrape or systematically extract data from the Service, including
            course and par data;
          </li>
          <li>
            attack, overload, disrupt, or attempt unauthorized access to the
            Service or our systems;
          </li>
          <li>upload malware, or anything abusive, infringing, or unlawful; or</li>
          <li>impersonate anyone, or resell or repackage the Service as your own.</li>
        </ul>
        <p>
          If you do, we may suspend or close your access. We will try to be
          reasonable about it.
        </p>

        <h2>8. Payments</h2>
        <p>
          Today the Service costs nothing and there is nothing to buy. If we later
          add optional purchases — a tip, or a Pro tier — they will be clearly
          optional, and any charge will run through the App Store, Google Play, or
          a payment processor under <em>their</em> terms and refund rules. The
          free stroke counter stays free, and we will update these Terms before
          anything starts charging.
        </p>

        <h2>9. Other services we rely on</h2>
        <p>
          The Service is built on services other people run: Supabase (accounts,
          cloud data, backend), Google (sign-in), Apple (Sign in with Apple, App
          Store), GolfCourseAPI and OpenStreetMap&apos;s Overpass API (finding
          courses and par), and Vercel (site hosting). Your use of those pieces is
          also subject to their terms, and we are not responsible for their
          outages, accuracy, or conduct. If you got the app from the Apple App
          Store, Section 15 also applies.
        </p>

        <h2>10. Disclaimer of warranties</h2>
        <p>
          The Service is provided <strong>&ldquo;as is&rdquo;</strong> and{" "}
          <strong>&ldquo;as available,&rdquo;</strong> without warranties of any
          kind, whether express, implied, or statutory. To the fullest extent
          permitted by law, we disclaim all warranties, including merchantability,
          fitness for a particular purpose, title, and non-infringement, and any
          warranty that the Service will be uninterrupted, timely, secure,
          error-free, or accurate. You use it at your own risk. Some jurisdictions
          do not allow certain exclusions, so some of the above may not apply to
          you.
        </p>

        <h2>11. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Seaport Systems and its members,
          managers, officers, employees, and agents (the &ldquo;Seaport
          Parties&rdquo;) will <strong>not</strong> be liable for any indirect,
          incidental, special, consequential, exemplary, or punitive damages, or
          for lost profits, revenue, data, goodwill, or golf scores — for example
          a miscounted score, a round that did not sync, or a wrong par from a
          course database — whether based in contract, tort (including
          negligence), strict liability, or any other theory, even if advised of
          the possibility.
        </p>
        <p>
          The Seaport Parties&apos; <strong>total aggregate liability</strong> for
          all claims relating to the Service will not exceed the greater of (a)
          what you paid us in the 12 months before the event giving rise to the
          claim (for most people, nothing), or (b) fifty U.S. dollars ($50). Some
          jurisdictions do not allow certain limits, so some of the above may not
          apply to you, and nothing here limits liability that cannot be limited
          under applicable law.
        </p>

        <h2>12. Indemnification, disputes, and arbitration</h2>
        <p>
          <strong>Indemnification.</strong> You agree to indemnify, defend, and
          hold harmless the Seaport Parties from any claims, damages, losses,
          liabilities, costs, and expenses (including reasonable attorneys&apos;
          fees) arising out of or related to: your use or misuse of the Service;
          content you submit or share, including in group rounds; your violation
          of these Terms; or your violation of any law or the rights of any third
          party. We may assume exclusive defense and control of any such matter,
          and you agree to cooperate.
        </p>
        <p>
          <strong>Informal resolution first.</strong> Before starting arbitration
          or a lawsuit, email{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a> and give us 30 days to try to
          resolve the dispute.
        </p>
        <p>
          <strong>Binding arbitration.</strong> Except as noted below, you and
          Seaport Systems agree that any dispute relating to the Service or these
          Terms will be resolved by <strong>binding individual arbitration</strong>{" "}
          under the Consumer Arbitration Rules of the American Arbitration
          Association, rather than in court. Arbitration will take place in North
          Carolina or, at your choice, by phone/video or in the county where you
          live. The arbitrator decides questions about the scope and enforceability
          of this arbitration agreement.
        </p>
        <p>
          <strong>Class-action waiver.</strong> You and Seaport Systems agree to
          bring claims only in an individual capacity, and{" "}
          <strong>not</strong> as a plaintiff or class member in any class or
          representative proceeding. The arbitrator may not consolidate claims or
          preside over any class proceeding.
        </p>
        <p>
          <strong>Exceptions.</strong> Either party may bring an individual claim
          in small-claims court, and either may seek injunctive or equitable relief
          in court for infringement or misuse of intellectual property.
        </p>
        <p>
          <strong>30-day opt-out.</strong> You may opt out of arbitration by
          emailing{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a> within 30 days of first
          accepting these Terms, stating your name and that you opt out. Opting out
          does not affect the rest of these Terms.
        </p>
        <p>
          <strong>Governing law.</strong> These Terms and any dispute are governed
          by the laws of the <strong>State of North Carolina</strong>, without
          regard to conflict-of-laws rules, and by the Federal Arbitration Act as
          to arbitration. For any dispute not subject to arbitration, you and
          Seaport Systems consent to the exclusive jurisdiction of the state and
          federal courts located in North Carolina. Nothing here removes
          consumer-protection rights you have where you live that cannot be waived.
        </p>

        <h2>13. Ending things</h2>
        <p>
          You can stop using the Service and delete your account any time from the
          app. We may suspend or end your access at any time, with or without
          cause or notice, including if you break these Terms. Sections that should
          survive termination — including 5, 6, 10, 11, 12, and 16 — survive.
        </p>

        <h2>14. Changes to these Terms</h2>
        <p>
          We will update these Terms as SimplyStroke grows. When we do, we will
          change the date above, and for material changes give notice in the app or
          by email. Continuing to use the Service after a change means you accept
          the updated Terms.
        </p>

        <h2>15. Apple App Store terms</h2>
        <p>
          If you download the app from the Apple App Store, you acknowledge that:
          these Terms are between you and Seaport Systems only, not Apple, and Apple
          is not responsible for the app or its content; Apple has no obligation to
          provide maintenance or support; in the event the app fails to conform to
          any applicable warranty, you may notify Apple and Apple will refund any
          purchase price paid (if any), and to the maximum extent permitted by law
          Apple has no other warranty obligation; Apple is not responsible for
          addressing product-liability, legal/regulatory, or third-party
          intellectual-property claims relating to the app; you are not located in
          an embargoed country or on a U.S. restricted-parties list; and{" "}
          <strong>Apple and its subsidiaries are third-party beneficiaries of these
          Terms</strong> and may enforce them against you.
        </p>

        <h2>16. General</h2>
        <p>
          These Terms and the Privacy Policy are the entire agreement between you
          and Seaport Systems about the Service and supersede prior agreements. If
          any provision is unenforceable, the rest stays in effect. Our not
          enforcing a provision is not a waiver. You may not assign these Terms
          without our consent; we may assign them in a merger, acquisition, or sale
          of assets. Nothing here creates an agency, partnership, or joint venture.
        </p>

        <h2>17. Contact</h2>
        <p>
          Questions about these Terms go to{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a> — Seaport Systems LLC.
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
