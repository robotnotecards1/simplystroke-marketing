// Single source of truth for the production origin. Update here (or set
// NEXT_PUBLIC_SITE_URL at build time) when the real domain is attached —
// canonicals, OG URLs, sitemap.xml and JSON-LD all derive from it.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplystroke.com";

export const SITE_NAME = "SimplyStroke";

// Optional endpoint that receives waitlist signups as POST { email, source }.
// Unset pre-launch: the form falls back to a local confirmation.
export const WAITLIST_ENDPOINT =
  process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? "";

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

export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "SportsApplication",
  operatingSystem: "iOS, Android, watchOS",
  description:
    "One-tap golf stroke counter and scorecard app built for ADHD golfers and anyone who forgets. Launching 2026 on iPhone, Android and Apple Watch.",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
