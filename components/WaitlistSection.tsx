import WaitlistForm from "./WaitlistForm";

/** Final CTA band with the email capture form (homepage + /download). */
export default function WaitlistSection({
  source = "home",
  heading = "Be first on the tee.",
}: {
  source?: string;
  heading?: string;
}) {
  return (
    <section id="waitlist" className="ss-waitlist">
      <div className="ss-waitlist-blob" />
      <div className="ss-waitlist-inner">
        <div className="pill">Live now</div>
        <h2>{heading}</h2>
        <p className="ss-waitlist-p">
          SimplyStroke is live — start counting your strokes today. Dedicated
          iPhone, Android and Apple Watch apps are coming soon to the App
          Store and Google Play; drop your email and we&apos;ll notify you the
          moment they land. No spam, just one message.
        </p>
        <a href="https://app.simplystroke.app" className="btn btn-hero">
          Get Started →
        </a>
        <WaitlistForm source={source} />
        <div className="ss-wait-note">
          Coming soon to the App Store &amp; Google Play
        </div>
      </div>
    </section>
  );
}
