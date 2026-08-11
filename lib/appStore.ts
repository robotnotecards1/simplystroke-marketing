// Build-time App Store data: the aggregate rating + 5-star written reviews.
//
// This is a STATIC export, so these are fetched once at `next build` and baked
// into the HTML/JSON-LD — current as of each deploy. To keep them fresh without
// a manual deploy, schedule a periodic rebuild (Vercel deploy hook / cron).
//
// Fail-safe by design: any network/parse error falls back to a committed
// snapshot so the build NEVER breaks and the testimonials section is never
// empty. Reviews are filtered to 5-star only; the rating is whatever the store
// reports (shown verbatim, never inflated).

export type Review = { author: string; title: string; body: string };
export type Rating = { value: number; count: number };
export type AppStoreData = { rating: Rating | null; reviews: Review[] };

const APP_ID = "6792327238";
const COUNTRY = "us";

// Snapshot fallback (fetched 2026-08-11). Used only if the live fetch fails.
const FALLBACK_REVIEWS: Review[] = [
  {
    author: "VIGNDOG",
    title: "Great app!",
    body: "It makes keeping score incredibly easy, especially with the watch app. I can stay focused on my game rather than trying to remember how many strokes I shot on a hole. The seamless experience and simple design make it a must-have!",
  },
  {
    author: "Chris Devonshire",
    title: "So easy!!",
    body: "I've tried so many live scoring golf apps, but like the name says, it's super simple. I got enough crazy thoughts in my head on the course — this app is a total value add.",
  },
  {
    author: "DJ CobraKai",
    title: "Best golf scoring app",
    body: "Has every course you can think of and makes keeping score so easy for yourself or even the entire group. I highly recommend for your next round!",
  },
  {
    author: "ontj",
    title: "Quick and easy",
    body: "Made keeping score a breeze, easy to navigate and enter shots, including unfortunately a penalty. Quickly found the course I was playing so no set-up required. Will be in my bag from now on.",
  },
  {
    author: "Nick..1827",
    title: "Exactly what's needed",
    body: "Super straightforward to use and has the golf courses that I play at. Makes tracking scores so much easier.",
  },
];

type LookupResult = {
  averageUserRating?: number;
  userRatingCount?: number;
};
type RssEntry = {
  "im:rating"?: { label?: string };
  author?: { name?: { label?: string } };
  title?: { label?: string };
  content?: { label?: string };
};

async function fetchRating(): Promise<Rating | null> {
  try {
    const res = await fetch(
      `https://itunes.apple.com/lookup?id=${APP_ID}&country=${COUNTRY}`,
      { cache: "force-cache" }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { results?: LookupResult[] };
    const app = data.results?.[0];
    if (!app || typeof app.averageUserRating !== "number" || !app.userRatingCount)
      return null;
    return {
      value: Math.round(app.averageUserRating * 10) / 10,
      count: app.userRatingCount,
    };
  } catch {
    return null;
  }
}

async function fetchFiveStarReviews(): Promise<Review[]> {
  const out: Review[] = [];
  try {
    for (const page of [1, 2, 3]) {
      const res = await fetch(
        `https://itunes.apple.com/${COUNTRY}/rss/customerreviews/page=${page}/id=${APP_ID}/sortby=mostrecent/json`,
        { cache: "force-cache" }
      );
      if (!res.ok) break;
      const data = (await res.json()) as { feed?: { entry?: RssEntry | RssEntry[] } };
      const raw = data.feed?.entry;
      const entries = Array.isArray(raw) ? raw : raw ? [raw] : [];
      for (const e of entries) {
        // The first entry in the feed is app info (no im:rating) — skip it.
        if (!e["im:rating"]?.label) continue;
        if (Number(e["im:rating"].label) !== 5) continue; // 5-star only
        const body = (e.content?.label ?? "").replace(/\s+/g, " ").trim();
        if (!body) continue;
        out.push({
          author: e.author?.name?.label ?? "App Store",
          title: (e.title?.label ?? "").trim(),
          body,
        });
      }
    }
  } catch {
    return [];
  }
  return out;
}

export async function getAppStoreData(): Promise<AppStoreData> {
  const [rating, reviews] = await Promise.all([
    fetchRating(),
    fetchFiveStarReviews(),
  ]);
  return { rating, reviews: reviews.length ? reviews : FALLBACK_REVIEWS };
}
