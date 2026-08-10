import { AppleGlyph } from "./icons";
import TrackedCta from "@/components/TrackedCta";
import { APP_STORE_URL } from "@/lib/site";

/**
 * App Store download badge — a live, tracked link (iPhone + Apple Watch, free).
 * `ctaLocation` distinguishes the homepage badge from the /download badge.
 * There is no Google Play badge: the Android app hasn't been started, so
 * teasing it would be an unsupported availability claim.
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
    </div>
  );
}
