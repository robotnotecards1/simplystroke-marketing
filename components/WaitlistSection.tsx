import TrackedCta from "@/components/TrackedCta";
import { APP_STORE_URL, APP_URL } from "@/lib/site";

/**
 * Final CTA band. The app is on the App Store, so this is a download CTA (it
 * used to be the pre-launch email waitlist). `source` is accepted but unused
 * (kept so the call sites don't need editing). Rendered on ~10 pages, so
 * `page_path` on each event distinguishes where it fired.
 */
export default function WaitlistSection({
  heading = "Play your next round with it.",
}: {
  source?: string;
  heading?: string;
}) {
  return (
    <section id="waitlist" className="ss-waitlist">
      <div className="ss-waitlist-blob" />
      <div className="ss-waitlist-inner">
        <div className="pill">Now on the App Store</div>
        <h2>{heading}</h2>
        <p className="ss-waitlist-p">
          SimplyStroke is free on the App Store for iPhone and Apple Watch. No
          subscription, no ads, and no account to start. Prefer not to download?
          Play right now in your browser.
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
            ctaLocation="waitlist_appstore"
            href={APP_STORE_URL}
            className="btn btn-hero"
            aria-label="Download SimplyStroke on the App Store"
          >
            Download on the App Store →
          </TrackedCta>
          <TrackedCta
            event="web_app_click"
            ctaLocation="waitlist_webapp"
            href={APP_URL}
            style={{ color: "var(--lime-text)", fontWeight: 700, fontSize: 16 }}
          >
            or play free in your browser →
          </TrackedCta>
        </div>
      </div>
    </section>
  );
}
