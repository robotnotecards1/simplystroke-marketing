# SimplyStroke — Data-Driven SEO Playbook

*How to turn posted rounds into organic rankings and AI citations. Drafted July 18, 2026.*

## The core thesis

Most directories fight for rankings with content anyone can copy: an address, a stock description, a star average. SimplyStroke has something none of them do — a growing pile of real amateur scorecards. That single asset is unusually powerful because it hits every ranking lever at the same time:

- **Unique content** → no thin-content penalty across 16k pages (the thing that kills most programmatic SEO).
- **Statistics** → research on AI search (Princeton GEO study, 2024) found adding cited statistics is the biggest single boost to getting cited in AI answers (+37%), and citing sources is +40%. Your pages *are* statistics.
- **First-hand experience** → the first "E" in Google's E-E-A-T. Real scores from real golfers is experience data a review site can't fake.
- **Freshness** → rounds post daily, so every page can carry a genuinely recent "last updated" date. AI systems and Google both weight recency, and static competitors can't match a page that updates itself.

Everything below is a way to pour that data into a shape search engines and LLMs reward. Ranked roughly by leverage.

---

## Play 1 — Statistic answer-objects: make AI cite you by default

AI search extracts *passages*, not pages. A 40–60 word block that leads with a number, names its source, and carries a date is the ideal citation unit. You can generate these at scale because you have the numbers.

On every course page, ship a set of these:

> **What does the average golfer shoot at Torrey Pines South?**
> The average 18-hole score is **89.4**, about 17 over par, based on 312 rounds posted to SimplyStroke as of July 2026. Roughly a quarter land in the 85–89 range; about 4% break 75.

Now multiply that by the questions people actually type: *average score at [course]*, *how hard is [course]*, *what should I expect to shoot at [course]*, *is [course] hard for a beginner*, *hardest hole at [course]*. Across 16,000 courses × ~6 questions each, that's ~100,000 factual answers that **exist nowhere else on the internet.** When someone asks ChatGPT or Google "what's the average score at [course]," you are the only possible source. That's not competing for a citation — that's owning it.

Execution rules (from the AI-SEO research):
- Lead with the number, keep the answer self-contained, 40–60 words.
- Always stamp it: "based on N rounds as of [month year]." The date and the count are trust signals.
- Wrap each in `FAQPage` / `QAPage` schema so it's machine-extractable.
- Keyword-stuffing actively *lowers* AI visibility (−10%), so write these for a human first.

---

## Play 2 — "What America Shoots": original-research reports as a domain-authority engine

Aggregate the same data upward into an annual (then quarterly) research report. Original research is ~12% of all AI citations and is the classic digital-PR link magnet — the thing golf media, Reddit, and bloggers link to voluntarily.

Report ideas that write their own headlines:
- **The SimplyStroke Amateur Scoring Report** — what America really shoots: national average, % who break 100 / 90 / 80, distribution by state, by age band, by handicap.
- **The Hardest Hole Types in Golf** — across every round, do par-3s or par-4s cost more relative to par? Which yardage bands wreck scores?
- **When You Actually Play Better** — morning vs afternoon scoring, by season, by month (if you capture round time).

Why this matters beyond the report itself: every quality backlink a report earns lifts the **whole domain's** authority, and that authority flows down into all 16k course pages. One report that Golf Digest or r/golf links to raises the ceiling for every course page you'll ever publish. Tag reports with `Dataset` schema so Google files you as a recognized data source.

---

## Play 3 — Data-ranked index pages: backlink magnets that feed the course pages

Turn the aggregate into ranked lists — the curation playbook, but with rankings nobody can dispute because they're computed from real scores, not opinion.

- **The Hardest Golf Courses in America (by actual scores)** — ranked by strokes-over-rating. Refresh annually as "the 2026 SimplyStroke Difficulty Index."
- **Hardest / easiest courses in [each state]** and **easiest places to break 90 near [metro]**.
- **Most-played public courses in [state]**.
- **Best-value courses** — satisfaction and scoring vs green fee.

These do double duty: they rank for high-volume head terms ("hardest golf courses in America" is a real, linkable query) *and* they're the top of your internal-linking hub-and-spoke — each one links down into dozens of individual course pages, passing authority exactly where you want it. This is the site-architecture backbone, not just content.

---

## Play 4 — "How do your scores compare?": a data tool that earns links and installs

A free interactive tool built on your distribution data. Enter your score at a course; see your percentile against everyone who posted there.

> "You shot 88 at Torrey Pines South. That beats **61%** of golfers who've posted a round here."

Tools attract backlinks (people embed and reference them) far better than articles, they're inherently shareable, they answer a real question ("is my score any good?"), and the natural next tap is "post your round to see where you rank" — a direct funnel into the app. Variants: a "Can I break 90 here?" predictor by handicap, and a "how much harder does this course play for *my* handicap" calculator.

---

## Play 5 — Data-backed comparisons: the single most-cited format

Comparison content is ~33% of all AI citations — the highest of any format — because it's structured and high-intent. You can generate comparisons at scale, and yours are unique because the criteria are your data, not a writer's take.

- **[Course A] vs [Course B]** for rival/adjacent courses — compare average score, difficulty as played, and value. Targets real queries like "torrey pines north vs south."
- **Public alternatives to [famous private course]** — "Can't get on Augusta? Here's the closest public course by design and difficulty." High-intent, high-emotion, very linkable.

Put the comparison in a real `<table>` with `ItemList` schema. Keep it fair — AI penalizes obviously biased comparisons.

---

## Play 6 — Freshness as a structural weapon

Your competitors' course pages are frozen. Yours breathe. Lean into it:
- A visible, honest **"Last updated [date]"** on every page, driven by the nightly rebuild — always recent because the underlying data is.
- A **"trending courses this week"** module and a **recent-rounds feed** on each course page — new crawlable content on every visit, which signals an active page.
- Seasonal refreshes ("2026 rates," tournament tie-ins when a course hosts an event).

Freshness is a ranking and AI-recency signal you get for free from the product working as designed. Almost nobody in this category has it.

---

## Play 7 — Own the long-tail question space

Every course spawns a cluster of near-zero-competition questions, each perfect for AI extraction:
- *Is [course] walkable? · Dress code at [course]? · How much to play [course]? · Is [course] worth it? · Best tees to play at [course]? · How long is a round at [course]?* (you have pace data for that last one).
- `FAQPage` schema on each; write the answer from your data where you have it, from safe factual sources where you don't.
- The **"[course] reddit"** query pattern is worth a dedicated pass — you already run a Reddit-ranking play; the honest data answer is exactly what wins those.

---

## The technical layer that makes all of it land

None of the above ranks without the plumbing. The good news: your static-export stack already handles most of it.

**Let the AI crawlers in.** The most common self-inflicted wound. `robots.txt` must explicitly allow `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, and `Google-Extended`. Blocking any of them means that engine can't cite you, ever. (You can still block training-only crawlers like `CCBot` if you want.)

**Ship machine-readable data.** Beyond `llms.txt`, expose the numbers in a form an AI agent can parse without rendering your page — e.g. a `/data/[course].json` or a per-course stats file. Agents increasingly answer questions programmatically; give them clean data and you become the default source.

**Schema on everything.** `GolfCourse`, `AggregateRating` (from your own ratings), `FAQPage`, `ItemList` (leaderboards + index pages), `Dataset` (reports), `BreadcrumbList`, `Review`. Content with proper schema shows meaningfully higher AI visibility.

**Core Web Vitals are a gift here.** Static HTML on Vercel means fast LCP and near-zero CLS out of the box — a real ranking and AI-favorability edge over the heavy, ad-laden incumbent pages. Keep it that way: pre-size images at build (no layout shift), lazy-load below the fold.

**On-page basics, done at scale.** Unique title (`50–60 chars, course + city front-loaded`) and meta per page, one `H1`, headings phrased the way people search ("What does the average golfer shoot at…"), descriptive image alt text and filenames, segmented XML sitemaps (courses / hubs / reports), canonical tags.

**A public methodology page.** One page explaining how the stats are computed and how many rounds back them. Transparency is a direct E-E-A-T trust signal and pre-empts "where does this come from" doubt from both readers and Google.

---

## What I'd do first

1. **Statistic answer-objects (Play 1)** on the course template — highest leverage, ships with the directory, and starts capturing AI citations the moment pages index.
2. **`robots.txt` + schema + a course JSON endpoint** — the plumbing that makes 1 actually get cited. Cheap, do it alongside.
3. **One index page — "Hardest Courses in America" (Play 3)** — your first backlink magnet and internal-linking hub, built from whatever data you have at launch.
4. **The first research report (Play 2)** once you have enough rounds to be credible — the domain-authority flywheel that lifts everything else.

Plays 4–7 layer on as the round volume grows. The sequencing point: 1–3 are buildable now against the data model we already scoped; 2 and 4 get stronger the more the app is used, which is exactly the compounding loop you want.

---

### Sources
Princeton "GEO: Generative Engine Optimization" study (KDD 2024) for the citation-boost figures; format citation-share figures and E-E-A-T / Core Web Vitals guidance per current Google Search guidance.
