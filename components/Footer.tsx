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
              <Link href="/#watch">Apple Watch</Link>
              <Link href="/#screens">Screens</Link>
              <Link href="/download/">Join waitlist</Link>
            </nav>
          </div>
          <div className="ss-footer-col">
            <div className="ss-footer-head">For golfers</div>
            <nav>
              <Link href="/adhd-golf/">ADHD &amp; golf</Link>
              <Link href="/blog/adhd-and-golf-losing-count/">
                Losing count mid-round?
              </Link>
            </nav>
          </div>
          <div className="ss-footer-col">
            <div className="ss-footer-head">Legal</div>
            <nav>
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
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
