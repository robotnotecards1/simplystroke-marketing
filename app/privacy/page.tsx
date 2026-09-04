import type { Metadata } from "next";
import Link from "next/link";
import { og } from "@/lib/site";

/**
 * NEEDS LEGAL REVIEW BEFORE RELYING ON IT.
 *
 * Rewritten to be factually accurate to what SimplyStroke actually does today,
 * verified against the codebase:
 *   - Operator: Seaport Systems LLC (North Carolina).
 *   - Guest mode: rounds stay on-device (MMKV), never sent to us.
 *   - Accounts (optional): email/password, Google, or Sign in with Apple, via
 *     Supabase Auth. Session stored encrypted at rest on-device.
 *   - Cloud sync + group rounds stored in Supabase.
 *   - Pro round-journal notes/photos and optional iPhone/Watch shot details stored
 *     privately in Supabase; scorecard scan source photos are processed
 *     on-device and are not uploaded. Apple Dictation returns text only.
 *   - Subscriptions are purchased through Apple and managed through RevenueCat.
 *   - Customer email is delivered through Resend with unsubscribe controls.
 *   - "Find courses near me": expo-location (foreground, low accuracy) → OSM
 *     Overpass API for nearby courses; GolfCourseAPI (via the course-search
 *     Edge Function proxy) for par/tee data by name.
 *   - Crash/error reporting → report-error Edge Function → public.error_reports
 *     → admin.simplystroke.app.
 *   - First-party product events → public.app_events; no persistent device ID.
 *   - No third-party analytics/ad/crash SDKs in the app; no IDFA; no tracking.
 *   - Marketing site (this site) runs a waitlist + GA4 + self-hosted Umami.
 *
 * Not a substitute for a lawyer. Keep this in sync with the App Store privacy
 * questionnaire and the app's bundled PrivacyInfo.xcprivacy manifest.
 */

const TITLE = "Privacy Policy | SimplyStroke";
const DESCRIPTION =
  "What SimplyStroke collects, why, and how to get it deleted. We don't sell your data, don't run ads, and don't track you across other apps.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy/" },
  robots: { index: true, follow: true },
  openGraph: og(TITLE, DESCRIPTION, "/privacy/"),
};

const UPDATED = "September 3, 2026";
const CONTACT = "support@simplystroke.app";

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
          SimplyStroke (the &ldquo;App,&rdquo; and together with the website at
          simplystroke.app, the &ldquo;Service&rdquo;) is operated by{" "}
          <strong>Seaport Systems LLC</strong>, a North Carolina limited
          liability company (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;). This policy explains what we collect, why, and the
          choices you have. It covers both the app and the website; where a
          practice applies to only one, we say so.
        </p>

        <p>
          <strong>The short version:</strong> you can keep a solo score without
          an account, in which case that round never leaves your device. If you
          create an account, we store your email and the app data you choose to
          sync, including rounds and private Pro content. Apple processes App
          Store subscription payments, and RevenueCat helps us verify Pro access.
          We do not sell your personal information, we do not run ads, and the
          app does not track you across other companies&apos; apps or websites.
        </p>

        <h2>What we collect</h2>

        <p>
          <strong>Your solo rounds stay local if you play as a guest.</strong>{" "}
          The core stroke counter works with no account. In guest mode, the solo
          rounds you record — course names, dates, pars, strokes, and scores —
          are stored <em>only on your device</em>. They are not sent to us and we
          cannot see them. Delete the app and they are gone. If you choose group
          play, the shared-round data described below is sent so the group can
          work; technical diagnostics may also be sent as described below.
        </p>

        <p>
          <strong>Account information.</strong> If you create an account, we
          collect your <strong>email address</strong> (from email/password
          signup, or shared by Google or Apple when you use those). If you use
          Sign in with Apple&apos;s private-relay option, we receive only a relay
          address, not your real one. We also store your{" "}
          <strong>display name</strong> (your first name, seeded from your
          Google/Apple profile or typed in onboarding). Passwords are handled by
          Supabase Auth in hashed form; we never see your plaintext password.
        </p>

        <p>
          <strong>Your golf data (when signed in).</strong> The rounds you save
          are synced to our backend so they follow you across devices — course
          names, dates, hole counts, pars, strokes, scores, goals, records, saved
          crews, and golf trips. If you never sign in, none of this leaves your
          device.
        </p>

        <p>
          <strong>Private round journals.</strong> If you use the Pro journal,
          the note and up to three photos you choose are stored in a private area
          of our Supabase backend and linked to your account and round. They are
          not included in scorecard shares or shown to other golfers. Camera and
          Photos access occurs only when you choose to add or replace a journal
          photo.
        </p>

        <p>
          <strong>Private iPhone and Apple Watch shot details.</strong> With Pro,
          you can record a stroke, open More on iPhone or Apple Watch, and attach
          a club choice or text to that latest stroke. The Watch action can be
          enabled in Profile. Recording a stroke never opens the details flow
          automatically. If you use iPhone keyboard Dictation or watchOS system
          Dictation, Apple returns the resulting text to SimplyStroke;
          the App does not record, receive, retain, or transfer the raw voice
          audio. The club choice and text are stored privately in Supabase and
          linked to your account, round, hole, and shot. They are not included
          in scorecard shares, season recaps, group results, leaderboards, or
          customer email.
        </p>

        <p>
          <strong>Paper scorecard scanning.</strong> If you photograph or choose
          a paper scorecard to import, Apple&apos;s Vision framework reads the
          prepared image on your iPhone. The source image is kept temporarily in
          the app&apos;s cache and deleted after you save, cancel, or leave the
          scan flow. It is not uploaded to us or to an OCR provider. Only the
          scores, pars, course, date, and player name you review and approve are
          saved as round data.
        </p>

        <p>
          <strong>Group round data.</strong> When you host or join a group round
          using a join code, your display name and your per-hole strokes and
          scores for that round are stored on our backend and shown live to the
          other players in that same round. Only people with the join code can
          see it — so share codes only with people you want in your group.
        </p>

        <p>
          <strong>Subscription information.</strong> Pro purchases are processed
          by Apple through the App Store. We do not receive your payment-card
          number. RevenueCat receives an account identifier and App Store
          purchase and entitlement information so we can activate, restore, and
          support Pro access. We store the verified entitlement status and
          expiration date on our backend.
        </p>

        <p>
          <strong>Customer email and preferences.</strong> For signed-in users,
          we store whether you want product updates and a monthly golf digest,
          plus the information needed to honor unsubscribe and suppression
          requests. We may send a one-time follow-up after your first completed
          round, product updates when that preference is enabled, and a monthly
          recap when an eligible Pro user opts in. Resend processes the email
          address and message for delivery. We record delivery events such as
          sent, delivered, bounced, complained, failed, suppressed, and
          unsubscribed; if email engagement measurement is enabled, we may also
          record the first open and click for a message. Every customer email
          includes an unsubscribe link.
        </p>

        <p>
          <strong>Location, only to find nearby courses.</strong> If you use
          &ldquo;find courses near me,&rdquo; the app asks permission to access
          your device location. With permission, it reads your approximate
          location once, at low accuracy, and sends those coordinates to the{" "}
          <strong>OpenStreetMap Overpass API</strong> to list golf courses near
          you. We use your location only in that moment, only to find courses. We
          do <strong>not</strong> track your location in the background and we do{" "}
          <strong>not</strong> store it for advertising or profiling. You can
          decline the permission and search for courses by name instead.
        </p>

        <p>
          <strong>Course and par lookups.</strong> When you search for a course
          by name, that search text is sent through our server to{" "}
          <strong>GolfCourseAPI</strong> to fill in par and tee data. The request
          goes through our own proxy so the provider key never ships in the app.
          We cache the normalized search text and matching course list for up to
          24 hours so repeated searches do not create duplicate paid requests.
          That cache is not linked to an account.
        </p>

        <p>
          <strong>Diagnostics and crash reports.</strong> To keep the app stable,
          it automatically reports technical errors and crashes to our backend. A
          report may include the error message and stack trace, the app version
          and build, your device&apos;s operating-system version, the screen you
          were on, and limited non-sensitive context. If you are signed in, the
          report includes your account user ID so we can connect repeated issues.
          These go to our database and our internal admin dashboard and are used
          only to diagnose and fix bugs — never for advertising, and we do not
          sell them.
        </p>

        <p>
          <strong>First-party product analytics.</strong> We record events such
          as app launches, rounds started and completed, scorecard imports, and
          group or tournament use. Each cold launch gets a new random session
          identifier; we do not create a persistent advertising or device ID. If
          you are signed in, an event may also include your account user ID. We
          use these events only to understand whether the app&apos;s features work
          and are useful.
        </p>

        <p>
          <strong>Abuse prevention.</strong> Our public course-search and error
          reporting endpoints convert the request IP address into a one-way hash
          for short-lived rate limiting. We do not store the raw IP address or
          use the hash for advertising or cross-app tracking.
        </p>

        <p>
          <strong>Website (simplystroke.app).</strong> If you join the waitlist,
          we store the email you submit, the page that referred you, and the
          signup date. Our website also uses{" "}
          <strong>Google Analytics 4</strong> and{" "}
          <strong>Umami</strong> (self-hosted) to measure aggregate traffic —
          things like &ldquo;400 people read this page this week.&rdquo; That
          tells us how the site is used in aggregate; it does not tell us who you
          are.
        </p>

        <p>
          <strong>Support.</strong> If you email us, we receive your address and
          whatever you put in the message.
        </p>

        <h2>What we do not collect</h2>
        <p>For clarity, the SimplyStroke app:</p>
        <ul>
          <li>
            contains <strong>no</strong> third-party analytics, advertising, or
            crash-reporting SDKs;
          </li>
          <li>
            does <strong>not</strong> use the Advertising Identifier (IDFA) and
            does <strong>not</strong> track you across other companies&apos; apps
            or websites;
          </li>
          <li>
            does <strong>not</strong> access your location in the background — the
            only location use is the one-time, foreground &ldquo;near me&rdquo;
            course search above;
          </li>
          <li>
            does <strong>not</strong> directly access your contacts or
            microphone. If you choose iPhone keyboard Dictation or watchOS
            system Dictation, Apple provides the resulting text to the App;
            SimplyStroke never receives or stores the raw audio. The App accesses
            the camera or Photos only when you
            choose a journal or scorecard-scan action; and
          </li>
          <li>
            does <strong>not</strong> sell your personal information.
          </li>
        </ul>

        <h2>How we use information</h2>
        <p>We use what we collect to:</p>
        <ul>
          <li>provide the scorekeeping features of the app;</li>
          <li>authenticate you and keep your account secure;</li>
          <li>sync your rounds across your devices when you are signed in;</li>
          <li>
            store private Pro journals, the photos you choose, and optional
            shot-level club choices and dictated text;
          </li>
          <li>verify, restore, and support your Pro subscription;</li>
          <li>
            deliver requested product updates, first-round follow-up, monthly
            recaps, and required service messages, and honor email preferences;
          </li>
          <li>
            run group rounds and show a shared live scorecard to the players in a
            round;
          </li>
          <li>find nearby courses and fill in par when you ask;</li>
          <li>understand whether app features are working and being used;</li>
          <li>diagnose crashes and fix bugs;</li>
          <li>respond to support requests;</li>
          <li>notify waitlist subscribers about launch and major changes; and</li>
          <li>comply with law and enforce our Terms.</li>
        </ul>
        <p>
          We do not use your personal information for third-party advertising,
          and we do not sell or rent it.
        </p>

        <h2>Who else touches your data</h2>
        <p>
          We share data only with providers that process it on our behalf, each
          limited to what it needs:
        </p>
        <ul>
          <li>
            <strong>Supabase</strong> — database, authentication, and backend
            functions;
          </li>
          <li>
            <strong>Vercel</strong> — website hosting;
          </li>
          <li>
            <strong>Google</strong> — Google Sign-In (app) and Google Analytics 4
            (website only);
          </li>
          <li>
            <strong>Apple</strong> — Sign in with Apple and system Dictation on
            iPhone and Apple Watch;
          </li>
          <li>
            <strong>Apple App Store</strong> — subscription purchase and billing;
          </li>
          <li>
            <strong>RevenueCat</strong> — subscription and entitlement
            verification;
          </li>
          <li>
            <strong>Resend</strong> — customer email delivery and delivery-event
            processing;
          </li>
          <li>
            <strong>GolfCourseAPI</strong> — course and par lookups, via our
            server-side proxy;
          </li>
          <li>
            <strong>OpenStreetMap / Overpass API</strong> — nearby-course search
            from your coordinates; and
          </li>
          <li>
            <strong>Umami</strong> — website analytics (self-hosted).
          </li>
        </ul>
        <p>
          We may also disclose information if required by law or legal process,
          or to protect the rights, safety, or property of Seaport Systems, our
          users, or the public; and as part of a merger, acquisition, or sale of
          assets, subject to this policy. We do not sell your personal
          information or share it for cross-context behavioral advertising.
        </p>

        <h2>Cookies</h2>
        <p>
          The <strong>app does not use cookies.</strong> It stores your login
          session in your device&apos;s secure storage (the iOS Keychain) and
          your local rounds in on-device storage. The web version of the app at
          app.simplystroke.app stores similar data in your browser&apos;s local
          storage, not in tracking cookies.
        </p>
        <p>
          The <strong>marketing site</strong> uses cookies and similar
          technologies for the Google Analytics 4 and Umami measurement described
          above. You can control these through your browser settings; blocking
          them will not stop you using the site. We do not use advertising or
          cross-site tracking cookies.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Guest (local) data stays on your device until you delete it or uninstall
          the app — we never receive it. Account and synced round data is kept
          while your account is active and is deleted when you delete your
          account, including private journal notes, photos, and shot details,
          except limited records we or our payment providers must keep by law.
          Temporary scorecard-scan images are deleted from the app cache after
          the scan flow. Crash reports are kept only as long as needed to fix issues.
          Email preferences and suppression records are kept as needed to honor
          your choices; waitlist emails are kept until you unsubscribe or ask us
          to remove them.
        </p>

        <h2>Security</h2>
        <p>
          We encrypt data in transit (HTTPS/TLS), store your authentication
          session encrypted at rest on your device, and use access controls at
          our backend so your data is reachable only by you and — for group rounds
          — by the players you share a code with. No method of transmission or
          storage is perfectly secure, and we cannot guarantee absolute security.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask us to show you what we hold about you, correct it, or delete
          it, by emailing{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>. You can also{" "}
          <strong>delete your account and its data from within the app</strong>,
          which removes your account, synced rounds, private journals, photos,
          shot details, email preferences, RevenueCat customer record, and
          group-round participation from our systems. Deleting a SimplyStroke
          account does not cancel an App Store subscription; manage or cancel
          that subscription in your Apple Account subscription settings. Every
          customer and waitlist email includes an unsubscribe link.
        </p>
        <p>
          <strong>California residents (CCPA/CPRA).</strong> You have the right to
          know what personal information we collect, use, and disclose; to request
          deletion; to correct inaccurate information; and not to be discriminated
          against for exercising these rights. We do not sell or &ldquo;share&rdquo;
          (as California law defines it) your personal information.
        </p>
        <p>
          <strong>EEA / UK residents (GDPR).</strong> You have rights to access,
          correct, delete, restrict, and port your data, and to object to certain
          processing. Our legal bases are performing our contract with you
          (running the Service), your consent or saved preferences (optional
          customer email, waitlist, and site analytics), and our legitimate
          interests (keeping the Service secure and working). You may complain
          to your local data-protection authority.
        </p>

        <h2>Children</h2>
        <p>
          SimplyStroke is not directed to children under 13, and we do not
          knowingly collect their data. If you believe a child under 13 has given
          us information, tell us and we will delete it.
        </p>

        <h2>International users</h2>
        <p>
          We operate in the United States, and information we collect is processed
          and stored there and by our providers. If you use the Service from
          outside the United States, your information will be transferred to and
          processed in the United States.
        </p>

        <h2>Changes</h2>
        <p>
          If we change this policy we will update the date above, and for material
          changes we will give more prominent notice. Continuing to use the
          Service after an update means you accept the revised policy.
        </p>

        <h2>Contact</h2>
        <p>
          Questions or privacy requests go to{" "}
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
