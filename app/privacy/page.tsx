import type { Metadata } from "next";
import Link from "next/link";
import { og } from "@/lib/site";

/**
 * DRAFT — NEEDS LEGAL REVIEW BEFORE LAUNCH.
 *
 * Written to be factually accurate to what this site actually does today:
 *   - collects an email address via the Supabase `waitlist` edge function
 *   - runs GA4 (gtag.js) and self-hosted Umami, both in app/layout.tsx
 *   - serves no ads and sells nothing
 *
 * It is NOT a substitute for a lawyer, and it does not yet cover the mobile
 * app (App Store and Play Store both require a policy that describes what the
 * app collects). Update this the moment the app's data handling is settled.
 */

const TITLE = "Privacy Policy | SimplyStroke";
const DESCRIPTION =
  "What SimplyStroke collects, why, and how to get it deleted. Short version: your email, if you give it to us, and anonymous analytics.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy/" },
  robots: { index: true, follow: true },
  openGraph: og(TITLE, DESCRIPTION, "/privacy/"),
};

const UPDATED = "July 11, 2026";
const CONTACT = "hello@simplystroke.app";

export default function PrivacyPage() {
  return (
    <main>
      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">Legal</div>
          <h1>Privacy Policy</h1>
          <div className="post-meta">
            <span>Last updated {UPDATED}</span>
          </div>
        </div>
      </header>

      <article className="prose">
        <p>
          <strong>The short version:</strong> if you join the waitlist we store
          your email address so we can tell you when SimplyStroke launches. We
          also count page views. We don&apos;t sell anything to anyone, we
          don&apos;t run ads, and you can have all of it deleted by sending one
          email.
        </p>

        <h2>What we collect</h2>
        <p>
          <strong>Your email address</strong>, but only if you type it into the
          waitlist form. Along with it we store which page you signed up from
          and the date, so we know what&apos;s working.
        </p>
        <p>
          <strong>Anonymous usage data.</strong> We use Google Analytics 4 and
          Umami, a privacy-focused analytics tool we host ourselves, to see how
          many people visit and which pages they read. This tells us things like
          &ldquo;400 people read the ADHD page this week.&rdquo; It does not
          tell us who you are.
        </p>
        <p>We do not collect payment details, and there is nothing to log into.</p>

        <h2>What we do with it</h2>
        <p>
          We use your email for exactly one thing: telling you when SimplyStroke
          is live. That&apos;s one message. We are not going to start a
          newsletter and quietly add you to it.
        </p>
        <p>
          We never sell, rent or trade your email address, and we don&apos;t
          share it with advertisers.
        </p>

        <h2>Who else touches your data</h2>
        <p>
          Waitlist emails are stored with Supabase, our database provider. The
          site is hosted on Vercel. Analytics run through Google Analytics and
          our own Umami instance. Each of these companies processes data on our
          behalf under their own terms.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask us to show you what we hold about you, correct it, or
          delete it entirely. Email{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a> and we&apos;ll do it. You
          don&apos;t need to give a reason, and if you&apos;re in the UK, EU or
          California, this is a legal right, not a favour we&apos;re doing you.
        </p>
        <p>
          Every email we send includes an unsubscribe link. Using it removes you
          from the waitlist for good.
        </p>

        <h2>Children</h2>
        <p>
          SimplyStroke isn&apos;t aimed at children under 13, and we don&apos;t
          knowingly collect their data. If you think a child has given us their
          email, tell us and we&apos;ll delete it.
        </p>

        <h2>Changes</h2>
        <p>
          If we change this policy we&apos;ll update the date at the top. If the
          change is significant, and especially if the mobile app starts
          collecting anything new, we&apos;ll email the waitlist.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about any of this go to{" "}
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
