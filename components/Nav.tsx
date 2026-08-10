import Link from "next/link";
import TrackedCta from "@/components/TrackedCta";
import { APP_STORE_URL } from "@/lib/site";

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
          {/* Desktop section nav. Hidden under 760px (see globals.css); the
              footer carries the full link set on mobile. All targets are real,
              existing pages. */}
          <span className="ss-navlinks">
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/features/">Features</Link>
            <Link href="/compare/">Compare</Link>
            <Link href="/guides/">Guides</Link>
          </span>
          <TrackedCta
            event="app_store_click"
            ctaLocation="nav_appstore"
            href={APP_STORE_URL}
            className="btn btn-nav"
            aria-label="Download SimplyStroke on the App Store"
          >
            Get the app →
          </TrackedCta>
        </div>
      </div>
    </nav>
  );
}
