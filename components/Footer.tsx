import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ss-footer">
      <div className="ss-footer-inner">
        <div className="ss-footer-brand">
          <img src="/images/logo-white.png" alt="SimplyStroke" width={360} height={180} />
          <p>
            The one-tap golf scorer. No counting, no math, no stress, just
            stroke. Coming soon to iPhone, Android and Apple Watch.
          </p>
        </div>
        <div className="ss-footer-cols">
          <div className="ss-footer-col">
            <div className="ss-footer-head">Product</div>
            <nav>
              <Link href="/features/">Features</Link>
              <Link href="/compare/">Compare golf apps</Link>
              <Link href="/#watch">Apple Watch</Link>
              <Link href="/download/">Join waitlist</Link>
            </nav>
          </div>
          <div className="ss-footer-col">
            <div className="ss-footer-head">For golfers</div>
            <nav>
              <Link href="/golf-stroke-counter/">Golf stroke counters</Link>
              <Link href="/adhd-golf/">ADHD &amp; golf</Link>
              <Link href="/guides/lost-count-of-strokes-what-to-do/">
                Lost count mid-hole?
              </Link>
              <Link href="/guides/">All guides</Link>
            </nav>
          </div>
          <div className="ss-footer-col">
            <div className="ss-footer-head">Company</div>
            <nav>
              <Link href="/about/">About</Link>
              {/* Terms of Service and Cookie Policy links removed until the
                  pages exist. They were href="#", which reads as an unfinished
                  site on the exact page where we ask for an email address.
                  Add them back here when the real pages ship. */}
              <Link href="/privacy/">Privacy Policy</Link>
              <a href="mailto:hello@simplystroke.app">Contact</a>
            </nav>
          </div>
        </div>
      </div>
      <div className="ss-footer-bottom">
        <span>© 2026 SimplyStroke. All rights reserved.</span>
        <span>Coming soon 🏌️</span>
      </div>
    </footer>
  );
}
