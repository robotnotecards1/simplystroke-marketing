import Link from "next/link";

export default function Nav() {
  return (
    <nav className="ss-nav">
      <div className="container ss-nav-inner">
        <Link href="/" aria-label="SimplyStroke home">
          <img
            src="/images/logo-color.png"
            alt="SimplyStroke"
            className="ss-logo"
            width={560}
            height={162}
          />
        </Link>
        <div className="ss-nav-right">
          <span className="ss-navlinks">
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/features/">Features</Link>
            <Link href="/#screens">Screenshots</Link>
          </span>
          <Link href="/download/" className="btn btn-nav">
            Join the waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
}
