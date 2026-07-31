import Link from "next/link";
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
          {/* Nav links archived per client request (2026-07-08) — restore by
              uncommenting when the site should expose section navigation.
          <span className="ss-navlinks">
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/features/">Features</Link>
            <Link href="/#screens">Screenshots</Link>
          </span> */}
          <a href={APP_STORE_URL} className="btn btn-nav">
            Get the app →
          </a>
        </div>
      </div>
    </nav>
  );
}
