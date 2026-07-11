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
        <div className="pill">Coming soon</div>
        <h2>{heading}</h2>
        <p className="ss-waitlist-p">
          SimplyStroke launches on iPhone, Android and Apple Watch soon. Drop
          your email and we&apos;ll notify you the moment it&apos;s live. No
          spam, just one message. We respect your inbox as much as your swing.
        </p>
        <WaitlistForm source={source} />
        <div className="ss-wait-note">
          Launching 2026 · iPhone · Android · Apple Watch
        </div>
      </div>
    </section>
  );
}
