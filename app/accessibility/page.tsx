import type { Metadata } from "next";
import Link from "next/link";
import { og } from "@/lib/site";

/**
 * KEEP THIS HONEST AND CURRENT.
 *
 * This is an accessibility statement for the marketing site (simplystroke.app),
 * operated by Seaport Systems LLC. It describes the target (WCAG 2.2 Level AA),
 * the measures we take, honest known limitations, and how to report a problem.
 *
 * It is written as a commitment and an ongoing effort, not a certification — do
 * not add claims of full/audited conformance unless a real audit backs them. If
 * the site changes materially (new templates, the course directory, embedded
 * third-party widgets), revisit the "Known limitations" and "Assessment"
 * sections and bump the date below. The app (iOS + app.simplystroke.app) is a
 * separate surface with its own considerations; this page covers the website.
 */

const TITLE = "Accessibility Statement | SimplyStroke";
const DESCRIPTION =
  "How SimplyStroke works to keep its website usable for everyone — our WCAG 2.2 AA goal, what we've done, known gaps, and how to tell us about a barrier.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/accessibility/" },
  robots: { index: true, follow: true },
  openGraph: og(TITLE, DESCRIPTION, "/accessibility/"),
};

const UPDATED = "July 31, 2026";
const CONTACT = "support@simplystroke.app";

export default function AccessibilityPage() {
  return (
    <main>
      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">Legal</div>
          <h1>Accessibility Statement</h1>
          <div className="post-meta">
            <span>Last updated {UPDATED}</span>
          </div>
        </div>
      </header>

      <article className="prose">
        <p>
          <strong>Seaport Systems LLC</strong>, the maker of SimplyStroke
          (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), wants
          everyone to be able to use our website — including people who browse
          with a keyboard, a screen reader, a magnifier, voice control, or other
          assistive technology. Accessibility is something we work at as we
          build, not a box we tick once.
        </p>

        <p>
          <strong>The short version:</strong> we aim for the SimplyStroke
          website at simplystroke.app to meet{" "}
          <strong>WCAG 2.2 Level AA</strong>. We are not perfect yet, some of it
          is still a work in progress, and if you hit a barrier we want to hear
          about it and fix it.
        </p>

        <h2>What this covers</h2>
        <p>
          This statement is about the <strong>marketing website</strong> at
          simplystroke.app — the pages you are reading now. The SimplyStroke app
          (on iPhone, and the web version at app.simplystroke.app) is a separate
          product with its own screens and its own accessibility work, and it is
          not covered here. If you have trouble with the app itself, email us at
          the address below and we will help.
        </p>

        <h2>Our goal</h2>
        <p>
          We use the{" "}
          <a
            href="https://www.w3.org/TR/WCAG22/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Web Content Accessibility Guidelines (WCAG) 2.2
          </a>{" "}
          as our standard, and we aim for <strong>Level AA</strong>. WCAG is the
          internationally recognized reference for making web content usable by
          people with a wide range of disabilities. Level AA is the level most
          organizations and laws (such as the ADA and the European EN 301 549
          standard) treat as the practical target. We describe our status as{" "}
          <strong>&ldquo;partially conformant&rdquo;</strong>: most of the site
          meets the standard, and we are working on the parts that do not yet.
        </p>

        <h2>What we do to get there</h2>
        <p>We build the site so that:</p>
        <ul>
          <li>
            pages use <strong>semantic HTML</strong> — real headings, lists,
            landmarks, and buttons — so assistive technology can understand the
            structure;
          </li>
          <li>
            you can <strong>navigate and operate everything with a keyboard</strong>
            , not just a mouse or touch, and the element you are on is visibly
            focused;
          </li>
          <li>
            images that carry meaning have <strong>text alternatives</strong>,
            and images that are purely decorative are marked so screen readers
            skip them;
          </li>
          <li>
            text and interface colors aim to meet the{" "}
            <strong>AA contrast ratios</strong> so they stay readable;
          </li>
          <li>
            the layout is <strong>responsive</strong> and reflows without a loss
            of content when you zoom in or use a small screen or large text;
          </li>
          <li>
            links and buttons have <strong>clear, descriptive labels</strong>{" "}
            rather than bare &ldquo;click here&rdquo; text; and
          </li>
          <li>
            we respect your system settings, including{" "}
            <strong>reduced-motion</strong> preferences, where animation is used.
          </li>
        </ul>

        <h2>Compatibility</h2>
        <p>
          The site is built to work with current versions of major browsers
          (Chrome, Safari, Firefox, and Edge) on desktop and mobile, together
          with the assistive technologies commonly paired with them — such as
          VoiceOver on Apple devices, TalkBack on Android, and NVDA or JAWS on
          Windows. It is not designed for browsers more than a couple of major
          versions out of date, where some things may not work as intended.
        </p>

        <h2>Known limitations</h2>
        <p>
          We want to be straight with you rather than over-promise. Despite our
          efforts, some parts of the site may not yet fully meet Level AA:
        </p>
        <ul>
          <li>
            <strong>Third-party and data-driven content.</strong> Some pages —
            for example course listings and comparison tables — are built from
            outside data sources. Their structure or labeling may occasionally
            fall short, and we are working to improve how that content is
            presented.
          </li>
          <li>
            <strong>Newer pages.</strong> As we add pages, a new one may ship
            before it has been fully checked against every guideline. When we
            find a gap, we fix it.
          </li>
          <li>
            <strong>Embedded media.</strong> Any embedded third-party media or
            widget may not meet the same standard as the rest of the site, since
            we do not control how it is built.
          </li>
        </ul>
        <p>
          If you run into something not listed here, please tell us — real
          reports from real people are the best way we find and fix these.
        </p>

        <h2>Tell us about a barrier</h2>
        <p>
          If you have trouble using any part of the SimplyStroke website, or you
          need something in a different format, email{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>. It helps if you can
          include:
        </p>
        <ul>
          <li>the page address (URL) where you had the problem;</li>
          <li>a short description of what happened and what you expected; and</li>
          <li>
            the browser, operating system, and any assistive technology you were
            using, if you know them.
          </li>
        </ul>
        <p>
          We aim to reply within <strong>five business days</strong>. If your
          request is about getting access to specific information, we will work
          with you to provide it in a way that works for you.
        </p>

        <h2>How we assess the site</h2>
        <p>
          We check accessibility with a mix of approaches: automated tooling as
          part of building the site, manual keyboard and screen-reader checks on
          key pages, and the feedback you send us. This is an ongoing process —
          we treat accessibility problems like any other bug and prioritize
          fixing them. This statement reflects our current self-assessment; it is
          not a third-party certification.
        </p>

        <h2>Technical notes</h2>
        <p>
          The site relies on HTML, CSS, JavaScript, and WAI-ARIA where it adds
          clarity for assistive technology. These technologies are used with the
          goal of conforming to WCAG 2.2 Level AA.
        </p>

        <h2>Changes to this statement</h2>
        <p>
          As the site grows and our accessibility work continues, we will update
          this statement and change the date above. If our target or status
          changes in a material way, we will say so here.
        </p>

        <h2>Contact</h2>
        <p>
          Accessibility questions, feedback, and requests go to{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a> — Seaport Systems LLC. You
          can also read our{" "}
          <Link href="/privacy/">Privacy Policy</Link> and{" "}
          <Link href="/terms-of-service/">Terms of Service</Link>.
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
