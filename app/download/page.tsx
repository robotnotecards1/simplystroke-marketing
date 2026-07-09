import type { Metadata } from "next";
import Link from "next/link";
import StoreBadges from "@/components/StoreBadges";
import WaitlistForm from "@/components/WaitlistForm";
import { og, softwareApplicationJsonLd } from "@/lib/site";

// Pre-launch: this is the waitlist/notify page. At launch, reframe to real
// download copy and add store links (see SEO-COPY-REVIEW.md + SEO-HANDOFF.md §6).
export const metadata: Metadata = {
  title: "Get SimplyStroke — Free Golf Stroke Counter App (2026)",
  description:
    "SimplyStroke is a free, one-tap golf stroke counter for iPhone, Android and Apple Watch, launching 2026. Join the waitlist and we'll tell you the moment it's live.",
  alternates: { canonical: "/download/" },
  openGraph: og(
    "Get SimplyStroke — Free Golf Stroke Counter App (2026)",
    "SimplyStroke is a free, one-tap golf stroke counter for iPhone, Android and Apple Watch, launching 2026. Join the waitlist and we'll tell you the moment it's live.",
    "/download/"
  ),
};

export default function DownloadPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />

      <header className="page-hero">
        <div className="page-hero-inner" style={{ maxWidth: 820, textAlign: "center" }}>
          <div className="pill">Coming soon</div>
          <h1 style={{ marginLeft: "auto", marginRight: "auto" }}>
            Be first on the tee.
          </h1>
          <p
            className="lede"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            SimplyStroke is a free, one-tap golf stroke counter launching in
            2026 on iPhone, Android and Apple Watch. Drop your email and
            we&apos;ll tell you the moment it&apos;s live. No spam, one
            message.
          </p>
          <WaitlistForm source="download" />
          <div className="ss-wait-note">
            Launching 2026 · iPhone · Android · Apple Watch
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
            its own math. Undo for fat fingers, offline for dead zones, zero
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
