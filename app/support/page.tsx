import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { og } from "@/lib/site";

const TITLE = "SimplyStroke Support";
const DESCRIPTION =
  "Get help with SimplyStroke scoring, Apple Watch, Pro subscriptions, scorecard scans, privacy, and account access.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/support/" },
  openGraph: og(TITLE, DESCRIPTION, "/support/"),
};

export default function SupportPage() {
  return (
    <main>
      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">Support</div>
          <h1>Tell us what happened.</h1>
          <p>
            Scoring should be the easy part. Send us the details and we&apos;ll
            help you get back to your round.
          </p>
        </div>
      </header>

      <Breadcrumbs crumbs={[{ name: "Support", path: "/support/" }]} />

      <article className="prose">
        <h2>Contact SimplyStroke</h2>
        <p>
          Email{" "}
          <a href="mailto:support@simplystroke.app?subject=SimplyStroke%20support">
            support@simplystroke.app
          </a>
          . Every message is read by the team that builds the app.
        </p>
        <div className="callout">
          <p>
            Include your iPhone model, Apple Watch model if relevant, the
            SimplyStroke version shown in the app menu, and the steps that led
            to the problem. Please do not email passwords, purchase receipts,
            private journal notes, or other sensitive information.
          </p>
        </div>

        <h2>Common questions</h2>
        <h3 className="support-question">My Pro access is missing</h3>
        <p>
          Open SimplyStroke Pro and choose <strong>Restore Purchases</strong>
          {" "}while signed in with the SimplyStroke account you want to use. Apple
          handles billing; restoring does not create a second charge. If access
          is still missing, email us with the account email and approximate
          purchase date. Do not send your Apple ID password or receipt number.
        </p>

        <h3 className="support-question">The Apple Watch app is not updating</h3>
        <p>
          Keep the iPhone and Watch nearby, confirm Bluetooth is on, and open
          SimplyStroke on both devices. Your stroke count stays usable if the
          connection pauses and syncs again when the devices reconnect.
        </p>

        <h3 className="support-question">How do I add a club or private shot note?</h3>
        <p>
          During an active round, count the stroke first, then open
          <strong> More</strong> on iPhone or Apple Watch and choose
          <strong> Shot details</strong>. SimplyStroke Pro attaches the club or
          note to your latest stroke; it never interrupts scoring with an
          automatic prompt. You can use Apple Dictation to enter the note.
          SimplyStroke receives the resulting text and never records or stores
          raw voice audio. Shot details stay private and out of standard shares,
          group scoreboards, recaps, leaderboards, and email.
        </p>

        <h3 className="support-question">A paper scorecard scan looks wrong</h3>
        <p>
          Recognition creates a draft. Review every score, par, player name,
          course, and date before saving. Nothing from the scan enters your
          history until you confirm it.
        </p>

        <h3 className="support-question">I need to manage or cancel Pro</h3>
        <p>
          Open SimplyStroke Pro and choose <strong>Manage Subscription</strong>,
          or use Apple&apos;s subscription settings. Deleting your SimplyStroke
          account does not cancel an Apple subscription.
        </p>

        <h3 className="support-question">I want to delete my account</h3>
        <p>
          Use the account deletion option inside SimplyStroke. If you cannot
          access the app, email us from the address on the account and we will
          help. Read the <Link href="/privacy/">Privacy Policy</Link> for what
          is removed and how billing is handled separately.
        </p>

        <h2>Policies</h2>
        <ul>
          <li>
            <Link href="/privacy/">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms-of-service/">Terms of Service</Link>
          </li>
          <li>
            <Link href="/accessibility/">Accessibility</Link>
          </li>
        </ul>
      </article>
    </main>
  );
}
