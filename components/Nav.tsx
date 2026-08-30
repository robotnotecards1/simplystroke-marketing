import Image from "next/image";
import Link from "next/link";
import TrackedCta from "@/components/TrackedCta";
import PrimaryCta from "@/components/PrimaryCta";
import { APP_STORE_URL, APP_URL } from "@/lib/site";

export default function Nav() {
  return (
    <nav className="ss-nav">
      <div className="container ss-nav-inner">
        <Link href="/" aria-label="SimplyStroke home">
          <Image
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
            <Link href="/#apple-watch">Apple Watch</Link>
            <Link href="/#play-together">Play together</Link>
            <Link href="/guides/">Guides</Link>
            <TrackedCta
              event="web_app_click"
              ctaLocation="nav_signin"
              href={APP_URL}
              className="ss-nav-signin"
            >
              Sign in
            </TrackedCta>
          </span>
          <PrimaryCta
            event="app_store_click"
            ctaLocation="nav_appstore"
            href={APP_STORE_URL}
            size="compact"
            aria-label="Download SimplyStroke on the App Store"
          >
            Download free
          </PrimaryCta>
          <details className="ss-mobile-menu">
            <summary aria-label="Open navigation menu">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </summary>
            <div className="ss-mobile-menu-panel">
              <Link href="/#how-it-works">How it works</Link>
              <Link href="/#apple-watch">Apple Watch</Link>
              <Link href="/#play-together">Play together</Link>
              <Link href="/guides/">Guides</Link>
              <TrackedCta
                event="web_app_click"
                ctaLocation="nav_mobile_signin"
                href={APP_URL}
              >
                Sign in to view rounds
              </TrackedCta>
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}
