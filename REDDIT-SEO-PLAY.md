# The Reddit-Modifier Play

**Date:** July 11, 2026
**Companion to:** `CONTENT-STRATEGY-V2.md`, `MARKETING-PLAN.md`
**Status:** Plan. Nothing built.

---

## 0. The verdict up front

**Do it. But understand why it works for you and wouldn't work for almost anyone else — because that reason is also the thing that keeps it from blowing up in your face.**

The tactic in its usual form is thin: skim three threads, write "Lessons From Reddit," stuff the word into the title/slug/H1/first sentence, harvest the modifier traffic. Google is actively hostile to exactly that shape of content, and it is one algorithm update from being worthless.

**You are in a different position.** You have a 238,854-comment corpus with upvote counts and permalinks. You can build the single best "what r/golf actually says about golf apps" page that exists anywhere — better than the Reddit threads themselves, because nobody on Reddit has read all 2,437 of them.

That converts the play from *keyword arbitrage* into *a genuinely superior resource that happens to rank on a lucrative modifier*. Same URLs, same title tags, completely different survival odds.

**The one-line rule for every page below:** if a redditor lands on it, they should think *"huh, that's a fair summary of our threads"* — not *"this is a vendor scraping us."* If a page can't clear that bar, don't publish it.

---

## 1. Why the modifier works (and its ceiling)

**The demand is real.** Millions of people append "reddit" to searches because they want human opinion rather than SEO content. They do it because it *usually works* — Google returns Reddit threads *plus* other pages, since "reddit" is a keyword, not a `site:` operator.

**LLMs do it too.** When ChatGPT or Claude fans a prompt out into searches, it will sometimes issue `best golf scorecard app reddit` rather than `site:reddit.com best golf scorecard app`. Which means a page ranking for the modifier query becomes a **citable source in AI answers** — and that dovetails exactly with the AnswerBlock/AI-SEO work already built into the site.

**The ceiling, stated honestly:** Google has spent the last couple of years *boosting Reddit itself* in results. You will not outrank r/golf for `best golf app reddit`, and you shouldn't plan to. Realistic outcome: you sit **below the Reddit threads but above the content farms**, picking up the clicks from people who bounce off a thread that didn't answer them — plus the LLM citations, which don't care about position as much as extractability.

Plan for positions 3–8 and AI citations. Anyone promising position 1 is selling a course.

---

## 2. The three risks, and how we avoid each

### Risk 1 — Burning the r/golf channel 🔴 the serious one

`MARKETING-PLAN.md` §7 plans a **disclosed-founder presence in r/golf**. It also says, correctly, that this crowd punishes anything that smells like exploitation and never forgets.

Now imagine a redditor googles their own hobby and finds *a golf app company* ranking on "reddit" keywords, above their own threads, monetising their comments. That is a front-page post about you, and it costs you the only community that matters.

**Mitigations — all mandatory, not optional:**

- **Link every single quote to its permalink.** Attribution isn't decoration here, it's the whole defence. Send traffic *back* to Reddit.
- **Say who made the page, at the top, plainly.** "We're the team behind SimplyStroke. We read 238,854 r/golf comments so you don't have to." No coyness.
- **Be genuinely useful about competitors.** If r/golf loves the 18Birdies free tier — and it does — the page says so, loudly. A page that mysteriously concludes "and therefore SimplyStroke" is the tell.
- **Mention SimplyStroke once, at the bottom, and briefly.** The page's credibility *is* the asset. Spending it on a pitch is a bad trade.
- **Never post these pages to r/golf.** Let them be found. Publishing a page *about* r/golf *to* r/golf is a self-own.

### Risk 2 — Google's spam classifiers

Thin, scaled "lessons from Reddit" pages are precisely the profile that scaled-content-abuse updates target. The defence is not clever technical SEO. It's that **the pages are actually good** — real data, real quotes, real numbers, real permalinks, an angle nobody else has. Which we have and they don't.

**Corollary:** don't mass-produce these. Ten excellent pages beat fifty templated ones, and fifty templated ones are a liability.

### Risk 3 — Reddit's brand, and quoting

- Using the word "Reddit" in a title/URL to describe content genuinely *about* Reddit is normal descriptive use. **Do not use Reddit's logo, wordmark styling, colours or trade dress**, and never imply affiliation or endorsement.
- Quote *selectively*, with attribution and a permalink — standard commentary practice. **Do not republish the corpus.** No dumping thousands of comments, no "Reddit thread archive" pages.
- Don't use usernames. Quote the comment, link the source, skip the handle.

---

## 3. Architecture: Resource → Bridge → Money

```
                  RESOURCE PAGE (long, the hub)
                  /reddit/  — the 239k-comment analysis
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
   BRIDGE PAGES (short, long-tail, easy wins)
   /reddit/arccos-subscription-worth-it/
   /reddit/18birdies-bloated/
   /reddit/ghin-app-complaints/
   /reddit/losing-count-of-strokes/
   /reddit/how-golfers-actually-keep-score/
   /reddit/golf-app-battery-drain/
                            │
                            ▼
              MONEY PAGES (hard, later, only once bridges rank)
              /reddit/best-golf-scorecard-app/
              /reddit/best-golf-app-no-subscription/
              /reddit/arccos-alternatives/
```

**URL structure:** a `/reddit/` folder puts the modifier in every URL, gives the hub real internal-link authority to pass down, and keeps the play quarantined from the main site architecture. Every page also carries the topic keyword in its slug.

**The four placements, on every page:** title, URL, H1, and the **first few words of the first sentence.** That last one is the bit people skip and it's the one that matters most — it's also, conveniently, exactly what the existing `AnswerBlock` component is built to do.

---

## 4. The pages, with what makes each one non-fake

### 🏛 Resource page — `/reddit/`

**Title:** `What Reddit Really Thinks About Golf Apps: 238,854 Comments, Analysed`
**H1:** same
**First sentence:** *"Reddit has been arguing about golf apps since 2010, so we read 238,854 comments across 2,437 r/golf threads and counted what people actually say."*

**Why it's not fake:** nobody else has done this. It's the single most defensible page on the whole site.

**Contents:**
- Share of voice table — Arccos 2,126 mentions, GHIN 1,765, TheGrint 1,364, 18Birdies 1,294, Garmin 1,262, Shot Scope 614, Golfshot 511, Golf Pad 446, Hole19 224, SwingU 158, GolfLogix 76
- The five complaints, ranked, with upvotes and permalinks: subscription fatigue, bloat, data-entry friction, battery, "I don't bring my phone on the course"
- What each app is genuinely *praised* for — 18Birdies' free tier (+123, +109), Shot Scope's one-time purchase, Garmin's battery, TheGrint's grandfathered pricing
- Methodology section. Say how the corpus was gathered, over what date range. This is what makes it citable rather than assertable
- **One** short SimplyStroke mention at the bottom

Long, thorough, and honest. Its job is to rank for *hundreds* of long-tail Reddit queries you'd never guess at — which you then read out of Search Console.

### 🌉 Bridge pages — short, ~300–600 words, one clear answer each

Each answers one question, leads with the AnswerBlock, quotes 2–4 real comments with permalinks, links up to the Resource page, and links across to the relevant money page.

| URL | Title | The unfakeable bit |
|---|---|---|
| `/reddit/arccos-subscription-worth-it/` | Is Arccos Worth It? What Reddit Says About the Subscription | The +493 comment. The highest-upvoted competitor comment in the entire corpus is someone leaving over price |
| `/reddit/18birdies-bloated/` | Is 18Birdies Bloated? What Reddit Says in 2026 | *"18 birdies is a bloated mess these days."* Plus the honest counterweight: the free tier is genuinely loved |
| `/reddit/ghin-app-complaints/` | Why Does Everyone Hate the GHIN App? What Reddit Says | 1,765 mentions, universally grudging. Nobody has written this and everybody wants it |
| `/reddit/losing-count-of-strokes/` | Losing Count of Your Strokes: What Reddit Actually Does About It | *"I would lose count and just go with a double."* This is your customer confessing, in public |
| `/reddit/how-golfers-actually-keep-score/` | How Do Golfers Actually Keep Score? What Reddit Says | The behavioural threads: 574, 314, 306, 271 comments. Plus the counter-signal (+442, *"the score is why I play"*) |
| `/reddit/golf-app-battery-drain/` | Which Golf Apps Kill Your Battery? What Reddit Says | *"The Grint sucked my watch battery dry."* Garmin's whole reputation |

### 💰 Money pages — build LAST, only once bridges rank

| URL | Title |
|---|---|
| `/reddit/best-golf-scorecard-app/` | Best Golf Scorecard App: What Reddit Actually Recommends |
| `/reddit/best-golf-app-no-subscription/` | Best Golf App With No Subscription: What Reddit Recommends |
| `/reddit/arccos-alternatives/` | Arccos Alternatives: What Reddit Recommends Instead |

These are the competitive ones. They only work once the Resource page and bridges have earned enough authority to hand them a push.

---

## 5. ⚠️ The ADHD-on-Reddit page: don't

There's an obvious slot here — `/reddit/adhd-golf/` — and the honest version of that page would have to report the corpus finding: **in 238,854 comments, zero connect ADHD to losing count.** Which is true, is interesting, and would actively undercut the `/adhd-golf/` pillar we already have live.

Worse, it would be a golf-app company publishing an analysis of ADHD golfers' confessions. Read that sentence back.

**Skip it.** The one page in this play that would look like exploitation is the one about the vulnerable audience. There's no version of it that's worth the risk.

---

## 6. Sequencing, and the Search Console step everyone skips

**Phase 1 — the Resource page.** One page. Make it excellent. Ship it. Then *wait* — 4–8 weeks, doing nothing.

**Phase 2 — mine Search Console.** This is the actual clever part of the method and the bit people skip.

Open GSC, filter queries containing **"reddit"**, and look for the tell: **queries getting clicks despite terrible positions.** A query pulling clicks from position 60 has demand you couldn't see with any keyword tool, because keyword tools don't index modifier queries well. That's your bridge-page shortlist, and it's derived from *your own data* rather than a guess.

**Phase 3 — build 4–6 bridge pages** against what GSC actually told you. Short. Fast. One answer each.

**Phase 4 — internal links.** Resource → bridges. Bridges → money pages. Once bridges are stable, Resource → money pages too.

**Phase 5 — money pages.** Not before.

**Ongoing:** the pages that rank, expand. Low-hanging fruit compounds.

---

## 7. How this interacts with what's already live

- **It doesn't touch the main architecture.** Everything lives under `/reddit/`, and the pillars (`/golf-stroke-counter/`, `/compare/`, `/adhd-golf/`) are untouched.
- **Every Reddit page links out to a pillar** — `/compare/`, `/golf-stroke-counter/`, `/golf-app-without-subscription/` — which is how the traffic converts and how the authority flows into the money pages that actually sell.
- **The AnswerBlock is already built for this.** "Reddit" in the first sentence of a self-contained 40–60-word extractable passage is exactly the shape LLMs lift. This play and the AI-SEO work reinforce each other.
- **It obeys the compare-up rule.** Every app named is a big one.

---

## 8. The honest expectation

This is a **6–12 month play**, not a quarter. The Resource page needs to age. The GSC data needs to accumulate. The money pages can't be forced.

And you will not beat Reddit at Reddit. What you'll get is the traffic that bounces off Reddit, the long tail no tool can see, and — probably the most valuable part — **citations in AI answers**, where a well-structured analysis of 238,854 comments is a far more attractive source than a single thread with nine replies.

The reason to do it is not that the trick is clever. It's that you accidentally did the work that makes the trick legitimate.
