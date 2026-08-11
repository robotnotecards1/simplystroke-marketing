# Content pillar plan — golf scoring hub (next phase)

**Status:** PLANNED — not built. Do not publish these without Jared's explicit
go-ahead. This PR (the SEO-review corrections) deliberately ships **no** new
guides and **no** placeholder pages.

## Why this is a separate phase

`/guides/` today holds two honest, ranked articles, both about *losing count*
(ADHD + "you lost count, now what"). That is not a full scoring library, and the
hub copy does not claim to be one — leave it that way until real pages exist.
Thin, AI-generated filler on a young domain is a liability, not a win.

## The gap this pillar fills

We rank for "golf stroke counter" intent but own nothing for the broader
**"how to keep score in golf"** cluster — high-intent, evergreen, and a natural
internal-link home for `/golf-stroke-counter/` and `/download/`.

## Planned pages

Each page **must ship with at least one original asset** (below). No page goes
live on generic prose alone.

| # | Page | Canonical slug (proposed) | Required original asset |
|---|------|---------------------------|-------------------------|
| 1 | **How to Keep Score in Golf** (pillar hub) | `/guides/how-to-keep-score-in-golf/` | A real, filled-in scorecard from a demonstrated round (photo or high-res scan), annotated. |
| 2 | **How to Read a Golf Scorecard** | `/guides/how-to-read-a-golf-scorecard/` | An annotated scorecard graphic labelling par, handicap/stroke index, yardage, totals — built from a real card. |
| 3 | **What Is a Good Golf Score?** | `/guides/what-is-a-good-golf-score/` | A sourced scoring table (par vs. bogey golfer vs. scratch, by handicap), with the source cited. |
| 4 | **Golf Scorecard Symbols and Terms** | `/guides/golf-scorecard-symbols-and-terms/` | An annotated app screenshot + a legend of symbols (birdie/bogey circles & squares) shown on a real card. |

Acceptable asset types (pick what fits each page): filled-in scorecard example,
annotated app screenshot, sourced scoring table, real round demonstration, or
qualified expert input.

## Structure per page (when built)

- One `<h1>`, unique title + meta description + canonical + breadcrumbs.
- `Article`/`BlogPosting` JSON-LD via `lib/schema.ts` `articleNode` (author =
  team `@id`), plus `FAQPage` where it fits.
- The pillar (#1) links down to #2–#4; each spoke links back up and across to
  `/golf-stroke-counter/`.
- Add slugs to the `guides` array in `app/guides/page.tsx` **and**
  `app/sitemap.ts` (they read the same slugs) only when the page actually ships.

## Explicitly out of scope for the current repair PR

- No new guide pages.
- No placeholder or stub articles.
- No hub copy implying pages exist that don't.
