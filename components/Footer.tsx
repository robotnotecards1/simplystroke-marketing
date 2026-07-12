import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ss-footer">
      <div className="ss-footer-inner">
        <div className="ss-footer-brand">
          <img src="/images/logo-white.png" alt="SimplyStroke" width={360} height={180} />
          <p>
            The one-tap golf scorer. No counting, no math, no stress, just
            stroke. Live now, with iPhone, Android and Apple Watch apps
            coming soon.
          </p>
        </div>
        <div className="ss-footer-cols">
          <div className="ss-footer-col">
            <div className="ss-footer-head">Product</div>
            <nav>
              <Link href="/features/">Features</Link>
              <Link href="/compare/">Compare golf apps</Link>
              <Link href="/compare/simplystroke-vs-18birdies/">
                vs 18Birdies
              </Link>
              <Link href="/compare/simplystroke-vs-arccos/">vs Arccos</Link>
              <Link href="/#watch">Apple Watch</Link>
              <Link href="/download/">Get the app</Link>
            </nav>
          </div>
          <div className="ss-footer-col">
            <div className="ss-footer-head">For golfers</div>
            <nav>
              <Link href="/golf-stroke-counter/">Golf stroke counters</Link>
              <Link href="/adhd-golf/">ADHD &amp; golf</Link>
              <Link href="/reddit/">What Reddit thinks</Link>
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
              {/* Cookie Policy link still pending its page; add it here when
                  that ships. */}
              <Link href="/privacy/">Privacy Policy</Link>
              <Link href="/terms-of-service/">Terms of Service</Link>
              <a href="mailto:hello@simplystroke.app">Contact</a>
            </nav>
          </div>
        </div>
      </div>
      <div className="ss-footer-bottom">
        <span>© 2026 SimplyStroke. All rights reserved.</span>
        <span>Live now 🏌️</span>
      </div>
    </footer>
  );
}
