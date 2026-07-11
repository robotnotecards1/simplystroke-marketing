# `/compare/` — Golf App Comparison Page Spec

**Date:** July 11, 2026
**Companion to:** `CONTENT-STRATEGY-2026-07.md`
**Status:** Spec. No files changed.

---

## 1. Where it lives

The draft you have is trying to be two pages at once. Split them:

| URL | Intent | Tone |
|---|---|---|
| `/golf-apps/` (Pillar A) | Informational — "what golf apps exist, which type do I need?" | Neutral. SimplyStroke barely appears |
| **`/compare/`** (this page) | Commercial — "is SimplyStroke better than the app I have?" | SimplyStroke-centric. Openly a comparison |

A page that tries to both educate and pitch ranks for neither. Google reads them as different intents and so do LLMs.

`/compare/` is a folder, not a leaf. It extends later into `/compare/simplystroke-vs-18birdies/`, `/compare/simplystroke-vs-golfshot/` etc. once the hub earns traffic. Don't build those yet.

**Link position:** `/golf-apps/` → `/compare/` → `/download/`. Also linked from `/golf-stroke-counter/` and from the homepage footer.

---

## 2. Metadata

- **Title (57):** `SimplyStroke vs 18Birdies, Arccos, Golfshot & More (2026)`
- **Slug:** `/compare/`
- **Meta (154):** `An honest comparison of SimplyStroke against the big golf apps. Most of them do more than SimplyStroke does. That's the point. See which one you actually need.`
- **H1:** Golf App Comparison: SimplyStroke vs. Everything Else

The "most of them do more than we do" line in the meta is deliberate. It is unusual enough to earn a click and honest enough to survive the landing.

---

## 3. The answer block

Directly under the H1, using the `AnswerBlock` component from the main strategy doc.

> **The short answer**
> SimplyStroke is a free, one-tap golf stroke counter for iPhone, Android and Apple Watch, launching in 2026. It does one thing: it holds your score so you don't have to. Apps like 18Birdies, Arccos, Golfshot and SwingU do far more — GPS, strokes gained, handicaps, side games — and cost $30 to $200 a year to do it. Pick SimplyStroke if the only thing you keep losing is the count.
>
> - Most golf apps are GPS or analytics platforms with a scorecard bolted on. SimplyStroke is a scorecard with nothing bolted on
> - Premium golf app subscriptions run roughly $30–$100/year; hardware trackers add $180–$300 up front
> - SimplyStroke is free, works offline, and needs no account to start a round
>
> *Last updated: July 2026*

Note it names competitors in the extractable paragraph. That is intentional: it makes the block a valid answer to *"what's a simpler alternative to 18Birdies?"*, which is the query you actually want.

---

## 4. The table — rebuilt on your axes

The draft's table has nine feature columns. SimplyStroke says "No" to seven of them. That is a table Arccos would be delighted for you to publish.

Comparison pages are won by choosing the axes. Yours are speed, friction, and cost. So the columns become:

### SimplyStroke vs. the leading golf apps

| App | What it's actually for | Taps to log a stroke | Account needed to start | Works offline | Ads | Typical annual cost | Hardware |
|---|---|---|---|---|---|---|---|
| **SimplyStroke** | Counting strokes. Nothing else | **1** | No | Yes | None | **Free** | None |
| 18Birdies | Social GPS + scoring | Several (scorecard grid) | Yes | Partial | Yes, free tier | Free / premium tier | None |
| Arccos | Automatic shot tracking & strokes gained | 0 (sensors) | Yes | No (needs sync) | No | ~$100–$200 | Sensors, ~$180–$300 |
| Golfshot | GPS + shot tracking | Several | Yes | Partial | Free tier | Free / ~$80 Pro | None |
| SwingU | GPS + game improvement | Several | Yes | Partial | Free tier | Free / ~$60–$100 | None |
| TheGrint | Official GHIN handicap tracking | Several | Yes | Partial | Free tier | Free / paid tiers | None |
| Golf Pad | Budget GPS + stats | Several | Yes | Partial | Free tier | Free / ~$30 | Optional tags |

**Rules for this table, all of which the draft broke:**

- **Price *bands*, not exact figures.** Every cell above says "~$80" not "$79.99." Exact competitor pricing goes stale within a quarter and you will not remember to update it. One search on Arccos alone surfaced $99, $155.88 and $200 per year from three sources. Bands are defensible; decimals are a hostage.
- **Date-stamp the table** and link every competitor's own pricing page. "As of July 2026. Prices change; check theirs."
- **Compare up, not sideways.** This page deliberately does not name the other small stroke counters (StrokeTap, EasyStroke, Stroke Keeper). Comparing against the big GPS and analytics platforms frames SimplyStroke as *the simple alternative to a bloated category*, which is a category-defining position. Comparing against three other one-tap counters frames it as *one of four near-identical apps*, which is a feature fight you gain nothing from winning. If a competitor ever earns real search demand for "SimplyStroke vs [X]," build a dedicated `/compare/simplystroke-vs-x/` page then — on your terms, at a URL you control.
- **Never claim a competitor lacks a feature without a source.** 18Birdies genuinely does not sync to GHIN (their own help docs confirm it), so that's safe to state — with a link to their help doc. Anything you can't source that way, leave the cell blank rather than guessing.
- **Mobile:** eight columns is unusable on the device your entire audience uses. Ship this as a stacked card layout below 768px — one card per app, label/value pairs. Keep the `<table>` in the DOM for extraction; restyle it with CSS, don't swap the markup.

**Below the table, a short honest verdict block.** Three sentences, not a pitch:

> **If you want strokes gained analytics, buy Arccos.** It's the best at that and SimplyStroke doesn't try. **If you want yardages, get a GPS app or a rangefinder.** **If the only thing that keeps going wrong is the count — you get to the green and genuinely don't know if that was your fourth or your fifth — that's the problem SimplyStroke was built for, and none of the apps above solve it, because they're all busy solving something bigger.**

That paragraph will do more for conversion than the entire table above it. It is also the passage most likely to be quoted verbatim by an LLM.

---

## 5. Sections after the table

1. **Why most golf apps get more complicated every year** — feature creep is a business model, not an accident. Subscription apps must keep adding to justify renewal. A free counter has no such pressure. (Short. Don't sneer.)
2. **What "simple" costs you** — the honest section. You give up: GPS, handicap posting, strokes gained, side games, social. Say so plainly, in a bulleted list, under a heading that admits it. Naming your own weaknesses is the highest-trust move available on a comparison page and almost nobody makes it.
3. **Who should *not* use SimplyStroke** — golfers chasing a handicap, golfers who want data, golfers who already love their app. Yes, really. This section converts.
4. **Who SimplyStroke is for** — paper-scorecard holdouts, people who already own a rangefinder, casual groups, and golfers who lose count for reasons that aren't carelessness → link to `/adhd-golf/`.
5. **FAQ** (see §7)

---

## 6. Schema — corrected

The draft says "add Product and Offer schema to the SimplyStroke row." Half right, and the half that's wrong is the dangerous half.

**Do:**
- `SoftwareApplication` + `Offer` (price 0) **for SimplyStroke only**
- `ItemList` naming the compared apps, each as a bare `SoftwareApplication` with `name` and `url` — no `offers`, no `price`
- `FAQPage`
- `BreadcrumbList`
- `dateModified`

**Do not** put `Offer` / `price` on any competitor. That is publishing machine-readable pricing claims about other companies' products, on your domain, under your name. It will be wrong, and unlike prose, structured data is a claim you're asserting as fact to a machine.

```jsonc
// app/compare/page.tsx
const comparisonJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.simplystroke.app/compare/#page",
      "name": "Golf App Comparison: SimplyStroke vs. Everything Else",
      "dateModified": "2026-07-11",
      "isPartOf": { "@id": "https://www.simplystroke.app/#website" },
      "about": { "@id": "https://www.simplystroke.app/#app" }
    },
    {
      // SimplyStroke — the ONLY node that carries an Offer
      "@type": "SoftwareApplication",
      "@id": "https://www.simplystroke.app/#app",
      "name": "SimplyStroke",
      "applicationCategory": "SportsApplication",
      "applicationSubCategory": "Golf scorecard and stroke counter",
      "operatingSystem": "iOS, Android, watchOS",
      "description": "A free, one-tap golf stroke counter and scorecard for iPhone, Android and Apple Watch. Counts your strokes so working memory doesn't have to.",
      "featureList": [
        "One tap per stroke",
        "Undo",
        "Works fully offline",
        "No account required to start a round",
        "No ads",
        "Apple Watch support"
      ],
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      // The compared apps — named, NOT priced
      "@type": "ItemList",
      "name": "Golf apps compared with SimplyStroke",
      "itemListElement": [
        { "@type": "ListItem", "position": 1,
          "item": { "@type": "SoftwareApplication", "name": "SimplyStroke",
                    "@id": "https://www.simplystroke.app/#app" } },
        { "@type": "ListItem", "position": 2,
          "item": { "@type": "SoftwareApplication", "name": "18Birdies",
                    "applicationCategory": "SportsApplication",
                    "url": "https://18birdies.com/" } },
        { "@type": "ListItem", "position": 3,
          "item": { "@type": "SoftwareApplication", "name": "Arccos Caddie",
                    "applicationCategory": "SportsApplication",
                    "url": "https://www.arccosgolf.com/" } },
        { "@type": "ListItem", "position": 4,
          "item": { "@type": "SoftwareApplication", "name": "Golfshot",
                    "applicationCategory": "SportsApplication",
                    "url": "https://golfshot.com/" } },
        { "@type": "ListItem", "position": 5,
          "item": { "@type": "SoftwareApplication", "name": "SwingU",
                    "applicationCategory": "SportsApplication",
                    "url": "https://swingu.com/" } }
        // ...TheGrint, Golf Pad
      ]
    },
    { "@type": "FAQPage", "mainEntity": [ /* §7 */ ] },
    { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",
          "item": "https://www.simplystroke.app/" },
        { "@type": "ListItem", "position": 2, "name": "Compare",
          "item": "https://www.simplystroke.app/compare/" } ] }
  ]
};
```

The `@id` on the SimplyStroke node is doing real work: reuse that exact `@id` on the homepage, `/features/` and `/download/` so every page is describing *the same entity*, not four unrelated ones. Entity consistency is one of the strongest AI-citation signals available and it costs one string.

---

## 7. FAQ

Write these as the questions people actually type into a chat window.

- **What's the simplest golf scorecard app?** *(the query you most want to own)*
- **Is there a golf app without a subscription?**
- **What's a simpler alternative to 18Birdies?**
- **Do I need a golf GPS app if I already have a rangefinder?**
- **Is SimplyStroke free?**
- **Does SimplyStroke have GPS or handicap tracking?** *(answer: no, and here's why — this is the objection, handle it in the schema where AI will read it)*
- **When does SimplyStroke launch?**

---

## 8. The launch-timing problem

SimplyStroke is not downloadable yet. A comparison page that speaks in the present tense about a product nobody can install is a trust leak, and the draft is written entirely in the present tense.

**Until launch:**
- Every SimplyStroke claim carries "launching 2026." Once, prominently, in the answer block — not sprinkled apologetically through every cell.
- CTA is the waitlist, not a store badge.
- The `SoftwareApplication` node is fine as-is; schema doesn't need a launch date, and claiming free/one-tap/offline for a built-but-unreleased app is accurate.
- **Do not** publish `aggregateRating` or `review` schema. You have no ratings. Inventing them is the one thing here that could get you a manual action.

**At launch:** find-and-replace "launching 2026" across the page, swap CTAs for store links, add real `aggregateRating` once you have genuine reviews, and re-date the table.

---

## 9. Build order impact

This slots into the main strategy as **Phase 4**, alongside Pillar A:

- Phase 2: `/golf-stroke-counter/` (unchanged — still build first)
- Phase 4: `/golf-apps/` **and** `/compare/` together. They're a pair; ship them in the same week so the internal links land at once.

One net-new page against the plan. Twelve supporting posts still stands.

---

## 10. Fact-check before publishing

Everything in the pasted draft was sourced to a single App Store listing for a different app. Before any of it goes live:

- [ ] Re-verify every competitor pricing band against that company's **own** pricing page, and link to it
- [ ] Re-verify every "No" cell against the competitor's own docs (18Birdies-has-no-GHIN checks out against [their help centre](https://help.18birdies.com/article/607-18birdies-handicap-faqs) — most other claims in the draft do not have that backing yet)
- [ ] Delete every SimplyStroke fact that traces back to the StrokeTap listing and rewrite from `lib/site.ts` and the actual app
- [ ] Confirm no `Offer`, `price`, `aggregateRating` or `review` schema appears on any node that isn't SimplyStroke
- [ ] Set a calendar reminder to re-verify the table quarterly. If you won't do that, cut the pricing column entirely and describe cost in prose instead
