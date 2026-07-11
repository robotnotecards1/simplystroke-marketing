# SimplyStroke — Content Pillar Strategy

**Date:** July 11, 2026
**Scope:** Content architecture, keyword targets, schema plan, internal link map, research library
**Status:** Proposal. No files changed.
**Supersedes:** the content sections of `SEO-HANDOFF.md` (the positioning call in §1 of that doc still holds)

---

## 0. The short version

You have two thin pages fighting for a category nobody has claimed. The fix is not more blog posts. It is three pillar pages that each own a distinct search intent, twelve supporting posts that feed them, and a research spine that makes the ADHD pillar genuinely citable instead of just opinionated.

The three pillars:

| # | Pillar | URL | Owns | Competition |
|---|---|---|---|---|
| **A** | Golf apps (the landscape) | `/golf-apps/` | Discovery traffic, LLM citations | High, but winnable on structure |
| **B** | Golf stroke counters (the category) | `/golf-stroke-counter/` | Commercial intent, the money page | Low |
| **C** | ADHD and golf (the wedge) | `/adhd-golf/` | The thing only you can win | Effectively zero |

Pillar B is where revenue comes from. Pillar C is where authority comes from. Pillar A is where volume comes from, and it only works because B and C make you credible enough to be cited in it.

---

## 1. What's wrong with the current two pages

Both are competent. Neither is a pillar.

**`/adhd-golf/`** — Good voice, real FAQ schema, correct instinct. But it is a landing page wearing a content page's clothes. It asserts that working memory is the problem and cites nothing. It has one idea ("stop holding the number") and no depth beneath it. An LLM asked "is there a golf app for ADHD?" has no reason to prefer it over Neurolaunch's ADHD-and-golf article, which at least gestures at literature.

**`/guides/adhd-and-golf-losing-count/`** — Duplicates roughly 70% of the `/adhd-golf/` argument. Right now these two pages cannibalize each other: same primary intent, same angle, same conclusion. Google will pick one and ignore the other, and it may not pick the one you want.

**Nothing anywhere targets the actual commercial query.** Somebody typing "app that counts golf strokes" or "golf stroke counter app" lands on a homepage, not on a page built to answer that question. That is the highest-intent, lowest-competition query in your entire map and you have no page for it.

**No entity, no author, no citations.** Three of the biggest inputs to AI citation are all missing.

---

## 2. Architecture

```
                        HOMEPAGE  /
                    (SoftwareApplication)
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
  PILLAR A              PILLAR B              PILLAR C
  /golf-apps/       /golf-stroke-counter/    /adhd-golf/
  "the landscape"    "the category"          "the wedge"
        │                    │                    │
   ┌────┼────┐          ┌────┼────┐          ┌────┼────┐
   A1 A2 A3 A4          B1 B2 B3 B4          C1 C2 C3 C4
        │                    │                    │
        └────────────────────┼────────────────────┘
                             ▼
                    /features/  →  /download/
                                   (conversion)
```

Flat URLs. Pillars at root, spokes under `/guides/`. No `/guides/category/` nesting — it adds crawl depth and buys nothing at this size.

---

### Pillar A — `/golf-apps/`

**H1:** Golf Apps in 2026: What Each Type Actually Does (and Which One You Need)
**Primary:** golf apps · **Secondary:** best golf apps, types of golf apps, do I need a golf app
**Intent:** informational, top of funnel
**Length:** 2,000–2,500 words
**Why it exists:** This is the page an LLM reaches for when someone asks "what golf apps are there?" It is also the only place you can honestly say *"if you want strokes gained analytics, use Arccos. If you want to stop losing count, use us."* Naming your competitors accurately is what makes the page citable, and it costs you nothing because Arccos users were never going to buy SimplyStroke.

**Structure:**
1. Answer block (see §5)
2. The four categories of golf app, in a comparison table: **GPS/rangefinder** (Hole19, Golfshot) · **shot tracking / strokes gained** (Arccos, Shot Scope) · **scorecard & stroke counting** (SimplyStroke) · **all-in-one social** (18Birdies)
3. "Which one do you need?" — a decision block keyed to reader statements ("I want to know my yardage" → GPS)
4. What every category gets wrong: feature creep, subscriptions, battery, signal
5. The category nobody serves: golfers who just need the number held for them → link to Pillar B
6. FAQ

**Schema:** `Article` + `ItemList` (the app categories) + `FAQPage` + `BreadcrumbList`

---

### Pillar B — `/golf-stroke-counter/`  ★ priority build

**H1:** Golf Stroke Counter Apps: How They Work and Which to Use
**Primary:** golf stroke counter app · **Secondary:** app that counts golf strokes, golf shot counter, stroke counter for golf, golf tally counter app
**Intent:** commercial investigation. **This is the money page.**
**Length:** 1,800–2,200 words

**Why it exists:** "Golf stroke counter app" and its variants are searched by people who have already diagnosed their own problem and are shopping for the fix. The competition is a handful of unmarketed App Store listings with no web presence at all. There is no editorial page in the world that owns this term. You can take it in a quarter.

**Standing rule across the whole site: never name a small stroke-counter competitor.** Not on this pillar, not on `/compare/`, not in a blog post. They have no SEO presence, no brand, and no search demand of their own. Every mention you give them is free association you're donating to an app that is one tap away from being chosen instead of yours. Define the category; compare only upward.

**Structure:**
1. Answer block
2. What a stroke counter actually is, and how it differs from a shot tracker (this distinction is the whole page; own the definition and you own the category)
3. The three ways golfers count: pencil scorecard, physical clicker/bead counter, app. Honest table of tradeoffs, including where the pencil still wins
4. What separates a good stroke counter from a bad one: one-tap entry, undo, works offline, works with a glove on, works on the wrist, no login before first round, no ads mid-round
5. Why the big golf apps don't solve this: a stroke counter is a rounding error inside a GPS platform's feature list, so it never gets designed properly. Compare *up* (18Birdies, Arccos, Golfshot) and link across to `/compare/`. **Do not name the other small stroke-counter apps.** Naming them hands them the association, turns a category-defining page into a four-way feature fight, and sends your own visitors off to evaluate near-identical alternatives. Define the category, then be the only app in it
6. How SimplyStroke approaches it (one fold, not a pitch deck)
7. FAQ

**Schema:** `Article` + `ItemList` + `SoftwareApplication` (SimplyStroke) + `FAQPage` + `BreadcrumbList`

---

### Pillar C — `/adhd-golf/`  (rebuild in place)

**H1:** ADHD and Golf: Why the Count Disappears, and What Actually Helps
**Primary:** ADHD golf · **Secondary:** golf app for ADHD, ADHD golf app, is golf good for ADHD, golf with ADHD
**Intent:** informational with strong commercial pull
**Length:** 2,200–2,800 words

Keep the URL. It is in your sitemap, it has whatever equity exists, and the slug is correct. Rebuild the body from a landing page into a resource.

**Why it exists:** It is the only page in this plan with no real competitor, and the only one where you can build genuine E-E-A-T. Right now the ADHD-golf conversation online is a Neurolaunch SEO page and a MyGolfSpy forum thread. A page that actually engages with the literature, is honest about its limits, and is written by a named person who lives it, wins by default and stays won.

**Structure:**
1. Answer block
2. **Why the count vanishes** — the working memory / prospective memory argument, now with citations. Golf is a prospective memory task disguised as a game: hold an intention (the running count) across a 10+ minute interval filled with competing demands. Prospective memory failures account for a majority of everyday memory failures generally, and prospective memory is measurably harder with ADHD (see §6). Reframe from "you're bad at focusing" to "this is a known, studied, named cognitive load, and it is not a character flaw"
3. **Is golf good for ADHD?** — the interesting section, and the honest one. There is real evidence that exercise and sport improve executive function in ADHD, and one 2024 trial found golf specifically improved inhibitory control. **State the limit plainly: that trial was university students, not a diagnosed ADHD population.** Do not claim golf treats ADHD. The credibility you get from *refusing* to overclaim is worth more than the traffic you'd get from overclaiming, and it is exactly what makes an LLM comfortable citing you
4. **What actually helps on the course** — pre-shot routine, quiet eye (real literature exists), playing partners as external memory, offloading the count. Practical, not preachy
5. **Offloading the count** — where the product enters, as a conclusion rather than a pitch
6. FAQ (expand the current five; add "Is golf good for ADHD?", "Why do I lose count of my strokes?", "Are there neurodivergent-friendly golf apps?")
7. Author box + references list

**Schema:** `Article` + `FAQPage` + `BreadcrumbList` + `citation` array pointing at the `ScholarlyArticle` DOIs + `author` (Person)

---

### The twelve supporting posts

All at `/guides/[slug]/`. Each is a real answer to a real query, each links up to exactly one pillar.

**Cluster A → `/golf-apps/`**

| # | Slug | Primary keyword | Why |
|---|---|---|---|
| A1 | `golf-gps-vs-scorecard-app` | golf gps vs scorecard app | The single most common "which type do I need" confusion. Comparison table = AI Overview bait |
| A2 | `free-golf-apps-no-subscription` | free golf app no subscription | High commercial intent, and subscription fatigue is your best wedge against 18Birdies/Arccos |
| A3 | `golf-apps-that-work-offline` | golf app offline no signal | Genuine unmet need. Nobody writes about it. Cheap win |
| A4 | `apple-watch-golf-scorecard-apps` | apple watch golf scorecard app | Rising query, and the wrist is your natural home form factor |

**Cluster B → `/golf-stroke-counter/`**

| # | Slug | Primary keyword | Why |
|---|---|---|---|
| B1 | `how-to-keep-score-in-golf` | how to keep score in golf | Biggest evergreen volume in the whole map. `HowTo` schema. Beginner query that ages into a customer |
| B2 | `golf-stroke-counter-app-vs-clicker` | golf stroke counter vs clicker | Direct substitution query. The person searching this is 90% of the way to buying |
| B3 | `how-to-count-penalty-strokes` | how to count penalty strokes, provisional ball scoring | Rules-adjacent, high trust, links naturally to B1. Cite the actual Rules of Golf |
| B4 | `lost-count-of-strokes-what-to-do` | lost count of strokes golf, forgot my score | The literal moment of pain, in the searcher's own words. Bridges Cluster B to Cluster C |

**Cluster C → `/adhd-golf/`**

| # | Slug | Primary keyword | Why |
|---|---|---|---|
| C1 | `adhd-and-golf-losing-count` *(exists — rewrite)* | ADHD losing count golf | Narrow it hard: this becomes the **personal, first-person story**, not the argument. The argument now lives on the pillar. That kills the cannibalization |
| C2 | `is-golf-good-for-adhd` | is golf good for ADHD | The citation magnet. Research roundup, honest about limits. This is the page that gets you quoted |
| C3 | `neurodivergent-friendly-app-design` | ADHD friendly app design, neurodivergent app | Broader than golf. Attracts links from outside the golf niche, which is how you build domain authority when you have none |
| C4 | `golf-tips-for-adhd-golfers` | golf tips ADHD, playing golf with ADHD | Practical listicle. Pace of play, routine, partners, offloading. Most shareable piece in the plan |

---

## 3. Internal link map

**The rules (enforce these, they are the whole point):**

1. **Every spoke links up to its pillar**, once, high in the body, with a descriptive anchor. Not "click here." Not "learn more." Use `golf stroke counter apps` / `ADHD and golf` / `types of golf apps`.
2. **Every pillar links down to all four of its spokes** at the relevant section, not in a dumped "related posts" list at the bottom. Contextual placement is what passes intent.
3. **Pillars link across to each other exactly once**, contextually. A→B ("if all you need is the number held for you"), B→C ("if you lose count for reasons that aren't carelessness"), C→B ("what a stroke counter is and how to pick one").
4. **Spokes link laterally at most twice.** More than that and you're diluting.
5. **Every page has exactly one primary CTA** to `/download/`. Not three.
6. **`/features/` sits below the pillars, not beside them.** It is a conversion assist. Pillars link to it; it links to `/download/`.
7. **B4 is the designated bridge.** "Lost count of strokes, what do I do" is the query where the merely-forgetful and the ADHD audiences collide. It links to both Pillar B and Pillar C. It will be your highest-converting blog post.

**The map:**

```
/  homepage
├→ /golf-stroke-counter/     (primary nav + hero secondary link)
├→ /adhd-golf/               (ADHD fold "read more")
├→ /golf-apps/               (footer + "how we compare")
└→ /download/

/golf-apps/  (A)
├→ A1 A2 A3 A4               (contextual, in-section)
├→ /golf-stroke-counter/     (the "category nobody serves" section)
├→ /features/
└→ /download/

/golf-stroke-counter/  (B)
├→ B1 B2 B3 B4               (contextual, in-section)
├→ /adhd-golf/               (the "why people lose count" section)
├→ /features/
└→ /download/

/adhd-golf/  (C)
├→ C1 C2 C3 C4               (contextual, in-section)
├→ /golf-stroke-counter/     (the "offloading the count" section)
└→ /download/

B4 (lost-count-of-strokes-what-to-do)
├→ /golf-stroke-counter/     (up)
├→ /adhd-golf/               (bridge)
└→ /download/

C2 (is-golf-good-for-adhd)
├→ /adhd-golf/               (up)
├→ C4                        (lateral: "what helps on the course")
└→ external: the studies      (rel=noopener, dofollow — citing real research
                               is a trust signal, don't nofollow it)
```

**Breadcrumbs on every page**, with `BreadcrumbList` schema: `Home > Golf Stroke Counters > How to Keep Score in Golf`. This is the single cheapest thing you can do to make crawlers understand the hierarchy, and Google renders it in the SERP.

---

## 4. Schema plan

You already have `SoftwareApplication` in `lib/site.ts` and `FAQPage` on `/adhd-golf/`. Good foundation. What's missing:

| Page type | Schema |
|---|---|
| Homepage | `SoftwareApplication` *(have it)* + `WebSite` + `Organization` |
| Pillar A | `Article` + `ItemList` + `FAQPage` + `BreadcrumbList` |
| Pillar B | `Article` + `ItemList` + `SoftwareApplication` + `FAQPage` + `BreadcrumbList` |
| Pillar C | `Article` + `FAQPage` + `BreadcrumbList` + `citation[]` + `author` |
| B1, B3 | `HowTo` + `BreadcrumbList` |
| All blog posts | `BlogPosting` + `author` (Person) + `datePublished` + `dateModified` + `BreadcrumbList` |
| `/about/` *(new)* | `Person` + `Organization` |

**Three additions that punch above their weight:**

**1. An `Organization` + `Person` entity.** Right now SimplyStroke is a product with no publisher and no author. That is an E-E-A-T hole and it is the reason an LLM has no idea who is telling it this. Add an `Organization` node on the homepage, a `/about/` page with a `Person` node for you, and set `author` on every article to that same `@id`. Entity consistency across pages is one of the strongest citation signals there is.

**2. `citation` on Pillar C and C2.** Schema.org `Article` supports a `citation` property. Point it at the DOIs in §6.

```json
"citation": [
  { "@type": "ScholarlyArticle",
    "name": "Comparative effects of open-skill and closed-skill sports on executive function in university students: a 16-week quasi-experimental study",
    "identifier": "10.3389/fpsyg.2024.1457449" }
]
```

Almost nobody in consumer app marketing does this. It is a direct machine-readable statement that your claims have sources.

**3. `dateModified` on everything, and actually update it.** Freshness is a real input to AI citation. A page last touched 14 months ago loses to an equivalent page touched last month.

**Author bio requirement:** every article needs a visible byline with a real credential line. Yours is not "SEO expert." It is *"Jared built SimplyStroke after one too many rounds spent reconstructing his own score on the 14th green."* Lived experience is a legitimate E-E-A-T signal and it is the one you actually have.

---

## 5. The answer block (AI-first page template)

Every pillar and every post opens with the same component, directly under the H1 and above everything else.

```
┌──────────────────────────────────────────────────────┐
│  THE SHORT ANSWER                                    │
│                                                      │
│  [40–60 words. One self-contained paragraph that     │
│   fully answers the page's title question, names     │
│   the entity, and works if you paste it into a       │
│   chat window with zero surrounding context.]        │
│                                                      │
│  • [Key fact with a number]                          │
│  • [Key fact with a number]                          │
│  • [Key fact with a number]                          │
│                                                      │
│  Last updated: July 2026                             │
└──────────────────────────────────────────────────────┘
```

**Hard rules for the answer paragraph:**
- No pronouns pointing backwards. "It" and "this" are banned in the first sentence. LLMs extract the passage without the H1.
- Name the entity: "SimplyStroke is…", "A golf stroke counter is…"
- Front-load the answer. No throat-clearing, no "in today's world."
- If a number exists, use it. Statistics materially increase citation rates.

**Worked example — Pillar B:**

> **The short answer**
> A golf stroke counter is an app or device whose only job is to record how many shots you've taken, without GPS, handicaps, or analytics. Unlike shot-tracking platforms such as Arccos or Shot Scope, a stroke counter doesn't try to improve your game. It just makes sure the number is right. SimplyStroke is a free, one-tap stroke counter for iPhone, Android and Apple Watch.
>
> - A shot tracker analyzes; a stroke counter only counts
> - The best ones need one tap per shot and work fully offline
> - Most golf apps in this category are unmarketed App Store listings with no support and no updates

**Worked example — Pillar C:**

> **The short answer**
> Golfers with ADHD lose count of their strokes because golf is a prospective memory task: it asks you to hold a running number across ten-plus minutes while planning shots, walking, talking and searching for a ball. Prospective memory is measurably harder with ADHD, which is why the count disappears. The fix is not more discipline. It is moving the number out of working memory.
>
> - About 15.5 million US adults (6.0%) have a current ADHD diagnosis (CDC, 2024)
> - Prospective memory accounts for the majority of everyday memory failures
> - One 2024 trial found 16 weeks of golf improved inhibitory control, though not in a diagnosed ADHD group

Build it once as `components/AnswerBlock.tsx` and reuse. Keep it visually distinct (bordered card, brand green rule) so humans skim it and machines find it.

**Supporting AI-SEO moves:**
- **FAQ sections written as natural-language questions**, matching how people actually type into ChatGPT. Not "Pricing." "Is SimplyStroke free?"
- **One idea per H2**, and H2s phrased as questions where honest. AI extracts at the heading level.
- **`robots.txt` is already `allow: /`** for all agents, which is correct. GPTBot, PerplexityBot, ClaudeBot and Google-Extended can all reach you. Leave it that way. **Do not** let anyone talk you into blocking AI crawlers before you have a brand to protect.
- **Add `/llms.txt`** — a plain-text index of your key pages with one-line descriptions. Cheap, increasingly respected, takes twenty minutes.
- **Comparison tables everywhere.** Tables are the single most-extracted content structure in AI Overviews.

---

## 6. Research library

Verified, real, and load-bearing. Use these on Pillar C and C2. **Read the caveats.**

**Prospective and working memory in ADHD** — the spine of the "why the count vanishes" argument.

- **Complex Prospective Memory in Adults with ADHD** — [PMC3590133](https://pmc.ncbi.nlm.nih.gov/articles/PMC3590133/). Direct evidence of prospective memory impairment in adult ADHD.
- **Prospective memory (partially) mediates the link between ADHD symptoms and procrastination** (2018) — [Springer, ADHD Atten Def Hyp Disord](https://link.springer.com/article/10.1007/s12402-018-0273-x). Prospective memory failures in everyday life, in adults with ADHD symptoms.
- **Assessment of goal-directed behavior and prospective memory in adult ADHD with an online 3D videogame simulating everyday tasks** (2023) — [Scientific Reports](https://www.nature.com/articles/s41598-023-36351-6). Naturalistic, everyday-task framing. Closest analogue in the literature to "hold a number while doing ten other things."

**Exercise, sport and executive function in ADHD** — the "is golf good for ADHD" section.

- **Effects of Physical Activity, Exercise and Sport on Executive Function in Young People with ADHD: A Systematic Review** (2022) — [PMC8774533](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8774533/). ~20 minutes of activity improves executive function in children and adolescents with ADHD.
- **Effects of Physical Activity, Exercise and Sport on Executive Function in Adults Diagnosed with ADHD: A Systematic Review** (2025) — [MDPI](https://www.mdpi.com/2673-5318/6/4/120). Of ten adult studies: nine report improved inhibitory control, six improved selective attention, three cognitive flexibility, one working memory.

**Golf specifically** — the strongest and most fragile card in the deck.

- **Comparative effects of open-skill and closed-skill sports on executive function in university students: a 16-week quasi-experimental study** (2024) — [Frontiers in Psychology](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1457449/full). n=63, three arms (golf, football, sedentary control), four 90-minute sessions per week for 16 weeks. The **golf group significantly improved inhibitory control** (p = 0.02, d = 0.26); football and control did not.
  **⚠️ The caveat you must print:** participants were university students, **not** a diagnosed ADHD population, and the effect size is small. Say so, in the body, in plain language. Then say why it's still interesting: golf is a closed-skill sport that was assumed to be *worse* for executive function, and it wasn't. If you overclaim this into "golf treats ADHD," you will deserve the backlash and you will lose the citations. If you handle it honestly, you become the page that gets quoted precisely *because* you handled it honestly.

**Attention and golf** — supporting material for C4 (practical tips).

- **The effect of quiet eye training on golf putting performance in pressure situations** (2024) — [Scientific Reports](https://www.nature.com/articles/s41598-024-55716-z). Longer pre-shot gaze fixation improves putting under pressure and reduces state anxiety. Real, usable, evidence-backed advice for a distractible golfer, and it has nothing to do with your app, which is exactly why it builds trust.
- **Quiet Eye Training Facilitates Competitive Putting Performance in Elite Golfers** (2011) — [Frontiers in Psychology](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2011.00008/full).

**Prevalence** — the stat for the answer block.

- **ADHD Diagnosis, Treatment, and Telehealth Use in Adults** (2024) — [CDC MMWR](https://www.cdc.gov/mmwr/volumes/73/wr/mm7340a1.htm). ~15.5 million US adults (6.0%) with a current ADHD diagnosis; 55.9% diagnosed in adulthood. First major CDC update on adult ADHD in nearly two decades. This is your market-size line and your "you are not alone" line, and it is a hard number from a hard source, which is exactly what LLMs cite.

**A standing rule for this pillar:** every clinical claim gets a source or gets cut. SimplyStroke is not a medical product and must never read like one. You are not treating anything. You are removing one small cognitive load from a game. That is a modest, true, defensible claim, and modest true claims are what survive contact with both Google's quality raters and an ADHD audience with a finely tuned detector for people selling to them.

---

## 7. Build order

**Phase 1 — foundation (week 1)**
1. `components/AnswerBlock.tsx`
2. `Organization` + `WebSite` schema on homepage; `/about/` page with `Person` schema and a real bio
3. `BreadcrumbList` on all pages
4. `/llms.txt`

**Phase 2 — Pillar B (weeks 1–2)** ← start here
5. `/golf-stroke-counter/` — full build. Highest intent, lowest competition, fastest payback
6. B4 `lost-count-of-strokes-what-to-do` — the bridge post, and your best converter
7. Homepage + `/features/` link into B

**Phase 3 — Pillar C (weeks 2–4)**
8. Rebuild `/adhd-golf/` as the pillar, with citations, author box, expanded FAQ
9. **Rewrite `/guides/adhd-and-golf-losing-count/` as a first-person story**, stripping the argument out of it. Cannibalization dies here
10. C2 `is-golf-good-for-adhd` — the citation magnet. Ship this one carefully
11. C4 `golf-tips-for-adhd-golfers`

**Phase 4 — Pillar A (weeks 4–6)**
12. `/golf-apps/` — full build with the honest competitor table
13. A1, A2 — the two comparison posts

**Phase 5 — fill in (weeks 6–10)**
14. B1 `how-to-keep-score-in-golf` (biggest volume, slowest to rank, so start the clock early — arguably move this to Phase 2)
15. B2, B3, A3, A4, C3

**Also update:** `sitemap.ts` (add all new routes), nav (add `/golf-stroke-counter/`), footer (add `/golf-apps/`, `/about/`).

---

## 8. What to measure

- **GSC impressions on `golf stroke counter app` cluster** — the leading indicator. Movement here in 6–8 weeks means Pillar B is working.
- **Rank for `ADHD golf app` / `golf app for ADHD`** — you should be top 3 within 90 days. If you aren't, the wedge isn't real and we rethink.
- **AI citation checks, monthly.** Ask ChatGPT, Perplexity, Claude and Google AI Overviews: *"is there a golf app for ADHD?"* · *"app that counts golf strokes"* · *"best simple golf scorecard app"*. Log who gets cited. This is the actual scoreboard for this strategy and it will not show up in Google Analytics.
- **Waitlist conversions by landing page.** Expect B4 and Pillar C to outperform everything else per visitor, and Pillar A to bring volume that converts poorly. That's fine. That's what Pillar A is for.

---

## 9. The one risk

The ADHD angle is your moat and your liability. An audience that has spent its life being sold focus supplements, planners and productivity cures will read your page with maximum suspicion, and they are right to. The line you cannot cross is implying that golf, or SimplyStroke, does anything to ADHD itself.

What SimplyStroke does is smaller and better than that: it takes one arbitrary memory task out of a game that never needed it. That's it. Say exactly that, cite what you cite, admit what you don't know, and you'll get a level of trust that no amount of keyword targeting can buy — and, not incidentally, the kind of page that language models are happy to quote.
