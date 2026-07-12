import type { Metadata } from "next";
import Link from "next/link";
import StoreBadges from "@/components/StoreBadges";
import WaitlistForm from "@/components/WaitlistForm";
import { og } from "@/lib/site";
import { appNode, graph, organizationNode } from "@/lib/schema";

const entityJsonLd = graph(organizationNode, appNode);

// Pre-launch: this is the waitlist/notify page. At launch, reframe to real
// download copy and add store links (see SEO-COPY-REVIEW.md + SEO-HANDOFF.md §6).
export const metadata: Metadata = {
  title: "Get SimplyStroke: Free Golf Scorecard App, No Subscription",
  description:
    "SimplyStroke is a free, one-tap golf stroke counter for iPhone, Android and Apple Watch. No subscription, no ads, no account. Live now — dedicated App Store and Google Play apps are coming soon.",
  alternates: { canonical: "/download/" },
  openGraph: og(
    "Get SimplyStroke: Free Golf Scorecard App, No Subscription",
    "SimplyStroke is a free, one-tap golf stroke counter for iPhone, Android and Apple Watch. No subscription, no ads, no account. Live now — dedicated App Store and Google Play apps are coming soon.",
    "/download/"
  ),
};

export default function DownloadPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(entityJsonLd),
        }}
      />

      <header className="page-hero">
        <div className="page-hero-inner" style={{ maxWidth: 820, textAlign: "center" }}>
          <div className="pill">Live now</div>
          <h1 style={{ marginLeft: "auto", marginRight: "auto" }}>
            Be first on the tee.
          </h1>
          <p
            className="lede"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            SimplyStroke is a free, one-tap golf stroke counter, live now.
            Dedicated iPhone, Android and Apple Watch apps are coming soon to
            the App Store and Google Play — drop your email and we&apos;ll
            tell you the moment they land. No spam, one message.
          </p>
          <a
            href="https://app.simplystroke.app"
            className="btn btn-hero"
            data-umami-event="open_app"
            data-umami-event-location="download_hero"
          >
            Get Started →
          </a>
          <WaitlistForm source="download" />
          <div className="ss-wait-note">
            Coming soon to the App Store &amp; Google Play
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StoreBadges />
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-narrow" style={{ textAlign: "center" }}>
          <div className="eyebrow">While you wait</div>
          <h2 className="h2-display">What you&apos;re signing up for</h2>
          <p className="section-lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
            One giant button that counts your strokes. A scorecard that does
            its own math. Undo for fat fingers, no account to start, zero
            ads forever. Free to download when it lands.
          </p>
          <p className="section-lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Have a look at{" "}
            <Link href="/features/">every feature</Link> or see{" "}
            <Link href="/adhd-golf/">
              why ADHD golfers are the whole reason this app exists
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
