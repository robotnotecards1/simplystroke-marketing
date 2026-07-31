import { AppleGlyph, PlayGlyph } from "./icons";
import { APP_STORE_URL } from "@/lib/site";

/**
 * Store badges. The App Store badge is a live link (iPhone + Apple Watch, free).
 * Google Play stays a non-link "coming soon" until the Android app ships.
 */
export default function StoreBadges() {
  return (
    <div className="ss-hero-badges">
      <a
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
      </a>
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
