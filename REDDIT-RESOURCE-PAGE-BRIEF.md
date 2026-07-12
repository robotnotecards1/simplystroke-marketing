# Handoff → Claude Code: build `/reddit/` (the Resource page)

**Repo:** `marketing-site` (Next.js 16, static export, App Router)
**Phase:** 1 of 4. Resource page only. Bridge and money pages come later, *after* Search Console data exists.
**Date:** July 11, 2026

**Paste everything below into Claude Code, from inside `marketing-site/`.**

---

## Read these first, in this order

1. `research/README.md` — what the corpus is and where the raw data isn't
2. `research/CUSTOMER-KNOWLEDGEBASE.md` — the headline findings
3. `research/COMPETITOR-TEARDOWN.md` — **share of voice + every verbatim quote with upvotes**
4. `research/SEO-FAQ.md` — real thread titles with comment counts
5. `REDDIT-SEO-PLAY.md` — why this page exists, and the rules that govern it
6. `CONTENT-STRATEGY-V2.md` §2 — the positioning this page must not contradict

Then look at `app/golf-stroke-counter/page.tsx` as the pattern to copy: `AnswerBlock`, `Breadcrumbs`, `graph()` schema, `.prose` article, FAQ list, `WaitlistSection`.

---

## 🚨 The one rule that matters

**Every quote, every number, every permalink on this page must come from `research/`.**

If you want to cite something that isn't in those three files — a quote, an upvote count, a thread link — **stop and ask Jared for the CSVs** (`data/competitor_quotes.csv`, `data/pain_quotes.csv`, `data/posts_index.csv`). Do not reconstruct it from memory. Do not paraphrase a quote and present it as verbatim. Do not invent a permalink.

A fabricated Reddit quote on a page whose entire premise is *"we read the Reddit"* is unrecoverable. It is the only way this page can fail badly.

Where a quote in `research/` has **no permalink** (a few don't), you may still use it — but present it as a paraphrase of the sentiment, not inside quotation marks with a fake link. Flag those to Jared in your summary.

---

## The page

**Route:** `app/reddit/page.tsx` → `/reddit/`

The tactic requires the keyword — *including the word "Reddit"* — in exactly four places:

1. **Title:** `What Reddit Really Thinks About Golf Apps: 238,854 Comments Analysed`
2. **URL slug:** `/reddit/`
3. **H1:** `What Reddit really thinks about golf apps`
4. **The beginning of the first sentence** — not buried mid-paragraph:

> **"Reddit has been arguing about golf apps since 2010, so we read 238,854 comments across 2,437 r/golf threads and counted what people actually say."**

That sentence opens the `AnswerBlock`. It's also the passage LLMs will lift, which is the second half of why this page exists.

**Meta description:** `We read 238,854 r/golf comments to find out what golfers really think about Arccos, 18Birdies, TheGrint, Garmin and the rest. The complaints, the praise, and the upvote counts.`

---

## Structure

**1. AnswerBlock** — the first sentence above, plus three key facts (real numbers from the corpus: comment count, the loudest complaint, the share-of-voice leader).

**2. Who we are, immediately.** Second paragraph, no coyness:

> "We're the team behind SimplyStroke, a golf scorecard app. We ran this analysis to work out what golfers actually want, and it changed our minds about several things. The whole thing is below, including the parts that don't flatter us."

This is not modesty, it's armour. A redditor who finds this page must never feel they've been harvested.

**3. Methodology.** Corpus size, subreddits, date range, method (Arctic Shift archive), and what the numbers do and don't prove. This is what makes the page *citable* rather than merely assertive — it's the difference between a source and a blog post.

**4. Share of voice table.** Use the `.cmp` table class (already responsive, stacks to cards on mobile). All eleven apps from `COMPETITOR-TEARDOWN.md` with mention counts and a one-line read on each.

**5. The five complaints, ranked, each with real quotes + upvotes + permalinks:**

- Subscription fatigue (the +493 comment — the highest-upvoted competitor comment in the whole corpus)
- Bloat (18Birdies)
- Data-entry friction
- Battery
- "I don't bring my phone on the golf course"

Use `<blockquote>` for quotes. Show the upvote count. Link the permalink. Send traffic **back to Reddit** — that's the deal.

**6. What Reddit *praises*, and be generous about it.** 18Birdies' free tier (+123, +109). Shot Scope's one-time purchase. Garmin's battery. TheGrint's grandfathered pricing. **A page that mysteriously concludes "and therefore SimplyStroke" is the tell.** This section is the credibility.

**7. What golfers actually do about scoring.** The behavioural threads — 574, 314, 306, 271 comments — plus the counter-signal (+442, *"The score is why I play, why I curse, why I smile and why I cry"*). People care enormously about the score *and* routinely fail to record it. That tension, stated plainly, is the most interesting paragraph on the page.

**8. What surprised us.** The ADHD null result: 197 comments mention ADHD, 84 describe losing count, **0 do both.** Report it straight — including that it contradicted our own assumption. Publishing a finding that undercuts your own marketing is the single strongest trust signal available, and it costs nothing because it's true.

**9. One short SimplyStroke mention. At the bottom. Two sentences.** Link to `/golf-stroke-counter/` and `/compare/`. Then stop.

**10. FAQ** — natural-language questions, with `FAQPage` schema, per the existing pattern.

---

## Length

**Long.** 2,500+ words. This one's job is to surface for *hundreds* of long-tail Reddit queries in Search Console — that's the whole mechanism. Bridge pages later will be short. This one is not.

---

## Technical

- Copy the schema pattern from `app/golf-stroke-counter/page.tsx`: `graph(organizationNode, teamNode, websiteNode, appNode, articleNode({...}), faqNode(faqs), breadcrumbNode([...]))`
- Breadcrumb: `Home > What Reddit thinks about golf apps`
- Add `/reddit/` to `app/sitemap.ts` (priority 0.8) and to `public/llms.txt`
- Add a footer link under "For golfers"
- Link out from the page to `/golf-stroke-counter/` and `/compare/`
- **Do not** link to it from the homepage hero. It's a research page, not a sales page.
- External Reddit links: `target="_blank" rel="noopener"` — and **dofollow**. Linking to your sources is a trust signal; nofollowing them is a tell.
- Verify: `npx next build` clean, all JSON-LD parses, no broken internal links, `.cmp` table stacks correctly under 768px.

---

## ⛔ Do not build

- ❌ **Any `/reddit/adhd-golf/` page.** Explicitly excluded. See `REDDIT-SEO-PLAY.md` §5 — the honest version undercuts our own pillar, and a golf-app company publishing an analysis of ADHD golfers' confessions is a page we don't want to have written.
- ❌ Bridge pages or money pages. Phase 3 and 4. They get built from **Search Console data**, not from guesses — that mining step is the entire edge of this method, and skipping it defeats the point.
- ❌ Reddit's logo, wordmark, brand colours or trade dress. Nothing that implies affiliation or endorsement.
- ❌ Reddit usernames. Quote the comment, link the source, skip the handle.
- ❌ Bulk republication of the corpus. Selective quotes with attribution only.
- ❌ Any claim that the corpus can't support.

---

## Definition of done

- [ ] "Reddit" appears in the title, the URL, the H1, and the **first few words of the first sentence**
- [ ] Every quote traces to `research/`, with its real upvote count and a real permalink
- [ ] Anything without a permalink is presented as paraphrase, not a fake quotation, and is flagged to Jared
- [ ] The page says who wrote it, in the second paragraph
- [ ] Competitors are treated fairly, including the things they beat us at
- [ ] The ADHD null result is reported honestly, even though it's inconvenient
- [ ] SimplyStroke is mentioned once, briefly, at the end
- [ ] 2,500+ words
- [ ] Build passes, schema parses, no broken links
- [ ] A redditor reading it would think *"that's a fair summary of our threads"* — not *"this is a vendor scraping us"*

That last one is the actual test. Everything else is mechanics.
