import TrackedCta from "@/components/TrackedCta";
import { APP_STORE_URL, APP_URL } from "@/lib/site";

/**
 * Final download CTA band, rendered near the foot of most pages. `source` tags
 * where it renders; `page_path` on each event also distinguishes that. (This is
 * the former pre-launch waitlist band, now a pure App Store / web-app CTA — the
 * email capture is gone.)
 */
export default function FinalCta({
  source = "home",
  heading = "Play your next round with it.",
}: {
  source?: string;
  heading?: string;
}) {
  return (
    <section id="get-app" className="ss-waitlist" data-source={source}>
      <div className="ss-waitlist-blob" />
      <div className="ss-waitlist-inner">
        <div className="pill">Now on the App Store</div>
        <h2>{heading}</h2>
        <p className="ss-waitlist-p">
          Core scoring is free on the App Store for iPhone and Apple Watch, with
          no account needed to start. Prefer not to download? Play right now in
          your browser.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 34,
          }}
        >
          <TrackedCta
            event="app_store_click"
            ctaLocation="final_appstore"
            href={APP_STORE_URL}
            className="btn btn-hero"
            aria-label="Download SimplyStroke on the App Store"
          >
            Download on the App Store →
          </TrackedCta>
          <TrackedCta
            event="web_app_click"
            ctaLocation="final_webapp"
            href={APP_URL}
            style={{ color: "var(--lime-text)", fontWeight: 700, fontSize: 16 }}
          >
            or play free in your browser →
          </TrackedCta>
        </div>
        <div className="ss-wait-note">Android coming soon to Google Play</div>
      </div>
    </section>
  );
}
