// Single source of truth for the production origin. Update here (or set
// NEXT_PUBLIC_SITE_URL at build time) when the real domain is attached —
// canonicals, OG URLs, sitemap.xml and JSON-LD all derive from it.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.simplystroke.app";

export const SITE_NAME = "SimplyStroke";

// Waitlist signups POST here as { email, source, website (honeypot) }.
// Backed by the `waitlist` edge function on the simplystroke Supabase
// project (source in supabase/ in this repo); env var overrides for
// local/testing setups.
export const WAITLIST_ENDPOINT =
  process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ??
  "https://uqlrfzzszfsnjepuppdk.supabase.co/functions/v1/waitlist";

// Google Analytics 4 measurement ID (gtag.js, loaded in app/layout.tsx).
export const GA_ID = "G-M00J122TYL";

// Per-page OpenGraph block. Next.js replaces (not merges) the layout's
// `openGraph` when a page defines its own, so every page builds the full
// set here to keep og:image/siteName intact.
export function og(
  title: string,
  description: string,
  url: string,
  type: "website" | "article" = "website"
) {
  return {
    title,
    description,
    url,
    type,
    siteName: SITE_NAME,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  };
}

// The app / organization / person / website entities used to live here as a
// single loose SoftwareApplication blob. They now live in lib/schema.ts behind
// stable @id values, so every page points at the SAME entity rather than
// re-declaring a new one each time. Import from "@/lib/schema" instead.
