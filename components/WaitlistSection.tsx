import { APP_STORE_URL, APP_URL } from "@/lib/site";

/**
 * Final CTA band. Now that the app is on the App Store this is the download CTA
 * — it used to be the pre-launch email waitlist. `source` is accepted but unused
 * (kept so the ~12 call sites don't need editing).
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
          subscription, no ads, no account. Prefer not to download? Play right
          now in your browser.
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
          <a href={APP_STORE_URL} className="btn btn-hero">
            Download on the App Store →
          </a>
          <a
            href={APP_URL}
            style={{ color: "var(--lime-text)", fontWeight: 700, fontSize: 16 }}
          >
            or play free in your browser →
          </a>
        </div>
        <div className="ss-wait-note">Android coming soon to Google Play</div>
      </div>
    </section>
  );
}
