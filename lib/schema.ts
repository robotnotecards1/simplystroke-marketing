// Structured data for the whole site.
//
// Everything hangs off a small set of stable @id values. The rule: every page
// that mentions the app, the company or the author points at the SAME @id
// rather than re-describing them. Search engines and LLMs then resolve all of
// it to one entity instead of a dozen unrelated look-alikes, which is one of
// the strongest citation signals available and costs us nothing but a string.
//
// Do NOT add `offers`, `price`, `aggregateRating` or `review` to any node that
// isn't SimplyStroke. Publishing machine-readable pricing or ratings claims
// about other companies' products, on our domain, is a claim we can't stand
// behind and don't need to make. See COMPARISON-PAGE-SPEC.md §6.

import { SITE_NAME, SITE_URL } from "./site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const APP_ID = `${SITE_URL}/#app`;
export const TEAM_ID = `${SITE_URL}/about/#team`;

/* -------------------------------------------------------------------------- */
/* Core entities                                                              */
/* -------------------------------------------------------------------------- */

export const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo-color.png`,
  email: "hello@simplystroke.app",
  description:
    "SimplyStroke makes a free, one-tap golf stroke counter and scorecard for golfers who lose count. No subscription, no ads, no account.",
};

// The byline. Deliberately not a named individual: authorship is the team's,
// and the founder's name is kept off the site on purpose. This still gives
// every article an `author` with an @id, a URL and a stated expertise, which
// is most of what a named-author E-E-A-T signal was doing for us.
export const teamNode = {
  "@type": "Organization",
  "@id": TEAM_ID,
  name: "The SimplyStroke Team",
  url: `${SITE_URL}/about/`,
  parentOrganization: { "@id": ORG_ID },
  description:
    "The people who build SimplyStroke. Golfers who got tired of reconstructing their own score on the walk to the next tee, and built the boring app nobody else would.",
  knowsAbout: [
    "golf scoring",
    "the Rules of Golf",
    "golf scorecard apps",
    "ADHD and working memory",
    "app design",
  ],
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
};

// The product. The one node allowed to carry an Offer.
export const appNode = {
  "@type": "SoftwareApplication",
  "@id": APP_ID,
  name: SITE_NAME,
  applicationCategory: "SportsApplication",
  applicationSubCategory: "Golf scorecard and stroke counter",
  operatingSystem: "iOS, Android, watchOS",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-image.jpg`,
  publisher: { "@id": ORG_ID },
  description:
    "A free, one-tap golf stroke counter and scorecard for iPhone, Android and Apple Watch. Counts your strokes so working memory doesn't have to.",
  featureList: [
    "One tap per stroke",
    "Undo a mis-tap",
    "Works fully offline",
    "No account required to start a round",
    "No ads",
    "Apple Watch support",
    "Finished scorecard with the math already done",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  // No aggregateRating / review until the app has shipped and earned real
  // ones. Inventing them is the one thing here that could earn a penalty.
};

/* -------------------------------------------------------------------------- */
/* Builders                                                                   */
/* -------------------------------------------------------------------------- */

export type Faq = { q: string; a: string };

export function faqNode(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export type Crumb = { name: string; path: string };

/** Pass the trail WITHOUT "Home" — it's prepended for you. */
export function breadcrumbNode(crumbs: Crumb[]) {
  const items = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

export type Citation = { name: string; url: string; doi?: string };

export function articleNode({
  type = "Article",
  headline,
  description,
  path,
  datePublished,
  dateModified,
  citations,
  about,
}: {
  type?: "Article" | "BlogPosting";
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  citations?: Citation[];
  about?: string;
}) {
  return {
    "@type": type,
    "@id": `${SITE_URL}${path}#article`,
    headline,
    description,
    datePublished,
    dateModified,
    inLanguage: "en-US",
    author: { "@id": TEAM_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    image: `${SITE_URL}/og-image.jpg`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    ...(about ? { about: { "@id": about } } : {}),
    ...(citations?.length
      ? {
          citation: citations.map(({ name, url, doi }) => ({
            "@type": "ScholarlyArticle",
            name,
            url,
            ...(doi ? { identifier: doi } : {}),
          })),
        }
      : {}),
  };
}

// --- course directory nodes -------------------------------------------------

export type GolfCourseInput = {
  name: string;
  url: string; // absolute
  description: string;
  street?: string;
  city: string;
  state: string;
  zip?: string;
  country?: string;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
  image?: string;
  // Only pass when rounds_count > 0. Inventing ratings is the one thing here
  // that can earn a penalty (mirrors the appNode rule above).
  rating?: { value: number; count: number };
};

export function golfCourseNode(c: GolfCourseInput) {
  return {
    "@type": "GolfCourse",
    "@id": `${c.url}#course`,
    name: c.name,
    url: c.url,
    description: c.description,
    ...(c.image ? { image: c.image } : {}),
    address: {
      "@type": "PostalAddress",
      ...(c.street ? { streetAddress: c.street } : {}),
      addressLocality: c.city,
      addressRegion: c.state,
      ...(c.zip ? { postalCode: c.zip } : {}),
      addressCountry: c.country ?? "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng },
    ...(c.phone ? { telephone: c.phone } : {}),
    ...(c.website ? { sameAs: c.website } : {}),
    ...(c.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: c.rating.value,
            reviewCount: c.rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

export type LeaderItem = { name: string; score: number };

export function leaderboardItemList(name: string, items: LeaderItem[]) {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${it.name}: ${it.score}`,
    })),
  };
}

/** Wrap a set of nodes into a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
