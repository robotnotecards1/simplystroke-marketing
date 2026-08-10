import type { Metadata } from "next";
import Link from "next/link";
import StoreBadges from "@/components/StoreBadges";
import TrackedCta from "@/components/TrackedCta";
import { APP_STORE_URL, APP_URL, og } from "@/lib/site";
import { appNode, graph, organizationNode } from "@/lib/schema";

const entityJsonLd = graph(organizationNode, appNode);

const TITLE = "Get SimplyStroke: Free Golf Scorecard App, No Subscription";
const DESCRIPTION =
  "SimplyStroke is free on the App Store for iPhone and Apple Watch: a one-tap golf stroke counter and scorecard. No subscription, no ads, no account to start. Or play right now in your browser. Android coming soon.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/download/" },
  openGraph: og(TITLE, DESCRIPTION, "/download/"),
};

export default function DownloadPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(entityJsonLd) }}
      />

      <header className="page-hero">
        <div className="page-hero-inner" style={{ maxWidth: 820, textAlign: "center" }}>
          <div className="pill">Now on the App Store</div>
          <h1 style={{ marginLeft: "auto", marginRight: "auto" }}>Get SimplyStroke.</h1>
          <p className="lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
            The one-tap golf stroke counter and scorecard, free on the App Store
            for iPhone and Apple Watch. No subscription, no ads, no account to
            start. Prefer not to download? Play right now in your browser.
          </p>
          <div className="cta-row" style={{ justifyContent: "center" }}>
            <TrackedCta
              event="app_store_click"
              ctaLocation="download_hero_appstore"
              href={APP_STORE_URL}
              className="btn btn-hero"
              aria-label="Download SimplyStroke on the App Store"
            >
              Download on the App Store →
            </TrackedCta>
            <TrackedCta
              event="web_app_click"
              ctaLocation="download_hero_webapp"
              href={APP_URL}
              style={{ color: "var(--lime-text)", fontWeight: 700, fontSize: 16 }}
            >
              or play free in your browser →
            </TrackedCta>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
            <StoreBadges ctaLocation="download_badge_appstore" />
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-narrow" style={{ textAlign: "center" }}>
          <div className="eyebrow">What you get</div>
          <h2 className="h2-display">A stroke counter, and nothing to manage</h2>
          <p className="section-lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
            One giant button that counts your strokes. A scorecard that does its
            own math. Undo for fat fingers, offline for dead zones, zero ads. On
            iPhone, Apple Watch, and the web. Free.
          </p>
          <p className="section-lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Have a look at <Link href="/features/">every feature</Link> or see{" "}
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
