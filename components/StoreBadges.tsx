import { AppleGlyph, PlayGlyph } from "./icons";

/**
 * Pre-launch "coming soon" store badges — intentionally NOT links.
 * At launch, swap these for real App Store / Google Play badge links
 * (see SEO-COPY-REVIEW.md).
 */
export default function StoreBadges() {
  return (
    <div className="ss-hero-badges">
      <div className="ss-store-badge">
        <AppleGlyph />
        <span>
          <span className="badge-label">Coming soon to the</span>
          <span className="badge-store">App Store</span>
        </span>
      </div>
      <div className="ss-store-badge">
        <PlayGlyph />
        <span>
          <span className="badge-label">Coming soon to</span>
          <span className="badge-store">Google Play</span>
        </span>
      </div>
    </div>
  );
}
