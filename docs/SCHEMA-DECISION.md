# SoftwareApplication schema decision

**Decided:** 2026-08-11 · **Owner:** marketing-site · **Node:** `appNode` in `lib/schema.ts`

> **UPDATE 2026-08-11 (supersedes the "do not add" decision below):** Jared
> approved showing the rating. We now inject `aggregateRating` at **build time**
> via `lib/appStore.ts`, which fetches the live App Store rating (and the 5-star
> reviews used as homepage testimonials). So the value **auto-refreshes on every
> deploy** and is never the "stale, unmaintained" number the analysis below
> warns about — the concern is resolved by the fetch, not by omitting the
> rating. Fail-safe: if the build-time fetch errors, the homepage ships
> **rating-less** (never an invented/stale value) and testimonials fall back to a
> committed snapshot. Only the homepage's app node carries the rating; other
> pages reuse the rating-less base node. **To refresh without a manual code
> change, schedule a periodic Vercel rebuild** (deploy hook / cron) — the fetch
> re-runs each build.

## The question

Google's `SoftwareApplication` rich result requires **either** `aggregateRating`
**or** `review`. Semrush's site audit flags our `SoftwareApplication` node as an
error because it has `offers` but no rating/review. Do we add a rating?

## What's true right now

- The App Store listing (id `6792327238`, v1.0.1) shows **5.0 from 6 ratings**,
  verifiable via the public iTunes lookup API:
  `https://itunes.apple.com/lookup?id=6792327238&country=us`
  (`averageUserRating`, `userRatingCount`). Verified 2026-08-11.
- The site is a **static export** (`output: "export"`). Anything written into the
  JSON-LD is frozen at build time — there is no runtime refresh.

## Decision: keep the entity markup, do NOT add `aggregateRating` yet

The rating is real but the base is **6 ratings** — small enough that a single new
review moves the average materially, and on a static export the number we ship
goes stale the moment that happens. Publishing it would be exactly the
"hard-coded, unmaintained rating" a review should penalise, and it trades an
honest gap for a fragile audit win. So:

- `appNode` stays as **valid Schema.org entity markup** (`SoftwareApplication`
  with `name`, `applicationCategory`, `operatingSystem`, `offers`, `featureList`,
  publisher, download URL). This is useful for entity resolution / knowledge
  graph and costs nothing.
- It is **intentionally NOT eligible** for Google's `SoftwareApplication` rich
  result until it carries a rating. That is a deliberate state, not an unresolved
  error — **do not report the Semrush issue as "fixed."** If Semrush keeps
  flagging it and the noise isn't worth it, the alternative is to drop the
  rich-result-targeted bits (e.g. `offers`) until a rating exists — prefer
  accurate markup over an inflated score.

## When to revisit (add the rating)

Add `aggregateRating` (with a visible on-page rating component near an App Store
CTA, using the **same** values) once **either**:

1. The rating base is large enough to be stable (rule of thumb: **~50+**
   ratings), **or**
2. A **build-time fetch** is wired up (a prebuild step reads the iTunes lookup
   API and injects `ratingValue` / `ratingCount`), so the number can't go stale
   between deploys.

At that point: source the values from the current listing, show them visibly,
and record the value + date here.

## How to verify the current rating

```bash
curl -s "https://itunes.apple.com/lookup?id=6792327238&country=us" \
  | python3 -c "import sys,json;r=json.load(sys.stdin)['results'][0];print(r['averageUserRating'], r['userRatingCount'])"
```
