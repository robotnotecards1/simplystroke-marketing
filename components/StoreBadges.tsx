import { AppleGlyph, PlayGlyph } from "./icons";
import TrackedCta from "@/components/TrackedCta";
import { APP_STORE_URL } from "@/lib/site";

/**
 * Store badges. The App Store badge is a live, tracked link (iPhone + Apple
 * Watch, free). Google Play stays a non-link "coming soon" — the Android app is
 * confirmed coming (full app.json config) but not yet on Google Play.
 * `ctaLocation` distinguishes the homepage badge from the /download badge.
 */
export default function StoreBadges({
  ctaLocation = "hero_badge_appstore",
}: {
  ctaLocation?: string;
}) {
  return (
    <div className="ss-hero-badges">
      <TrackedCta
        event="app_store_click"
        ctaLocation={ctaLocation}
        href={APP_STORE_URL}
        className="ss-store-badge ss-store-badge--apple"
        style={{ color: "var(--offwhite)" }}
        aria-label="Download SimplyStroke on the App Store"
      >
        <AppleGlyph />
        <span>
          <span className="badge-label">Download on the</span>
          <span className="badge-store">App Store</span>
        </span>
      </TrackedCta>
      <div className="ss-store-badge" aria-hidden="true">
        <PlayGlyph />
        <span>
          <span className="badge-label">Coming soon to</span>
          <span className="badge-store">Google Play</span>
        </span>
      </div>
    </div>
  );
}
