# SimplyStroke Course Directory + Leaderboards — Strategy & Build Plan

*Drafted July 18, 2026 · Updated against the real repo (`Projects/SimplyStroke`)*

## Grounded against the actual codebase

After reading the real repo, three things change — mostly in your favor:

**The marketing site is already Next.js 16 on Vercel — but it's a *static export* (`output: "export"`).** That's the one constraint that shapes everything. Static export means there is no server at runtime and no ISR: all pages, including the 16k course pages, are generated **at build time** by reading Supabase during `next build`, then served as pure static HTML. This is great for SEO (fast, cheap, crawlable) but it means **"fresh" leaderboard data comes from rebuilds, not live server rendering.** The recommended pattern under static export:
- *Build-time* — each course page is statically generated with its scoreboard/leaderboard baked into the HTML (this is what Google indexes; it's the SEO asset).
- *Client-side* — a small React component on the page fetches the *latest* leaderboard from Supabase on load (anon key + RLS) so a human visitor sees near-live data even between builds.
- *Rebuild cadence* — a nightly Vercel deploy hook (and/or a webhook when a round is posted) regenerates the static pages so the indexed content stays current.
- If you ever want true on-demand freshness without rebuilds, the alternative is dropping `output: "export"` and moving to ISR — but that changes the hosting model, and static export is the right call for a directory this size. Design around it.

**The `courses` table already exists** (migration `0001_init.sql`): `id, name, city, state, country, holes_count, par_total, par_per_hole (jsonb), type, source`. It's already `for select using (true)` — publicly readable — and the comment even says *"cached/shared course data … not written by the app yet."* So the directory backbone is already scaffolded and waiting. We extend it (add `slug, address, zip, lat, lng, tees jsonb, rating/slope, claimed_by`) rather than create it from scratch.

**`rounds` already has `course_id` and `course_name`.** Rounds are already linked to courses. What's missing is the opt-in public path: add `is_public`, and add a safe public-read surface (a `public_rounds` view/policy) so the anon key can read *only* opted-in rounds.

**RLS is actively being hardened** (`0005_audit_rls_hardening.sql`, dated 2026-07-17) — the group-round and hole_scores holes from the earlier audit are being closed. Good, because the directory exposes data to the public web and depends on that discipline. The new `public_rounds` surface must be written to the same standard.

The marketing site already runs a real SEO operation (compare pages, guides, `sitemap.ts`, `robots.ts`, ADHD-golf and stroke-counter landing pages) but **does not yet use Supabase** (`@supabase/supabase-js` isn't a marketing-site dependency). The directory is the first data-driven surface — adding the Supabase client to the marketing site is step one.

Everything below still holds; the sections on the data model and page architecture are now written against these real tables.

---

*Original strategy follows.*


## The one-paragraph version

You already run directory sites that rank (Undeez, TRTClinics). This is the same play with a weapon those don't have: **a live data engine**. Instead of a static directory of ~16,000 US golf courses that reads like every other directory Google has already seen, every course page becomes a living scoreboard — "here's what real golfers actually shoot at this course" — fed by rounds posted from the SimplyStroke app. That turns a thin-content liability into the single most defensible asset in golf-course SEO, and it closes a growth loop: **app round → post to leaderboard → populates the course page → ranks in Google → new golfer discovers SimplyStroke → installs the app → posts a round.** Build the directory and the gamification layer as one system, because each is what makes the other work.

---

## 1. Why this wins (the SEO thesis)

### Who ranks today, and the gap

The incumbents for "[course name]" and "golf courses near me" queries are:

- **GolfNow** (NBC Sports) — transactional, built to sell tee times. Course pages exist to funnel booking.
- **GolfPass / Golf Advisor** (NBC Sports) — editorial reviews and star ratings.
- **GolfLink** — an older, ad-heavy course directory.

Every one of them has the same structural weakness: their course pages are built from **public or licensed data** — address, phone, a stock description, maybe editorial star ratings. That's the weakest tier of data defensibility. It's the kind of page Google increasingly discounts because it's interchangeable with a hundred others.

None of them has **what real amateurs score at a given course, updated continuously**. That data doesn't exist anywhere on the web right now. You'd be the one creating it.

### The data-defensibility hierarchy (why you win)

Programmatic SEO lives and dies on how proprietary your page data is. Ranked from strongest to weakest:

1. **Proprietary** — you created it *(your leaderboards, aggregated scoring distributions)*
2. **Product-derived** — comes from your users' activity *(posted rounds, pace-of-play, difficulty-as-experienced)*
3. **User-generated** — your community *(tips, photos, comments on a course)*
4. **Licensed** — exclusive access
5. **Public** — anyone can scrape it *(← where all your competitors live)*

SimplyStroke can populate tiers 1–3 as a natural byproduct of the app already existing. That's the whole moat. A course page that says *"Average score here: 91 · 428 rounds posted · hardest hole: the par-4 7th, playing +0.8 to par · this week's low round: 74 by M.R. from Charlotte"* is content no competitor can replicate without building your app first.

### The count and the ceiling

There are **just over 16,000 golf courses in the US** (National Golf Foundation). That's your maximum page count for the core "course profile" playbook — a healthy, finite, high-intent universe. Layered playbooks (state hubs, city hubs, "best courses in [city]", leaderboard pages) push the total addressable page count materially higher without inventing fake demand.

---

## 2. Course data — the sourcing recommendation

This is the make-or-break input, so here's the landscape and a clear recommendation.

| Source | Coverage | Fields | Cost | License / catch |
|---|---|---|---|---|
| **GolfCourseAPI** (golfcourseapi.com) | ~30k worldwide | Course/club, location, scorecard, tees, par, rating/slope | Free (50 req/day) → $9.99/mo (10k/day) → $24.99/mo (100k/day) | Cheap and rich; **must confirm redistribution terms in writing** before publishing publicly |
| **golfapi.io** (mscorecard) | ~42k worldwide | Scorecards, stroke index, tees w/ distances, slope/course rating, green + POI coordinates | Custom (contact) | Most complete scorecard/geo data; pricing opaque; same redistribution question |
| **OpenStreetMap** (`leisure=golf_course`) | Global, community-mapped | Name, location, boundary polygons, sometimes holes | Free | **ODbL license** — free to use commercially but requires attribution + share-alike. Sparse on par/rating/scorecard. |
| **Government / open data** | Patchy (per-city, e.g. Open Data DC) | Varies | Free | Not national; not worth stitching together |

### Recommendation: import once, own your copy, enrich with UGC

1. **Seed from GolfCourseAPI as the primary import.** It's the best coverage-to-cost ratio and returns the scorecard/tee/rating fields you need for rich pages. Pull the full US set **once** into your own Supabase `courses` table — don't hit their API on every page load. You want to *own* a snapshot you control, both for page speed and to avoid a dependency that could change pricing or die.
2. **Confirm the redistribution right before you publish.** This is the one hard gate. A course directory publishes this data on public web pages — you must be licensed to do that. Email GolfCourseAPI (and golfapi.io as a backup) and get explicit written confirmation that displaying course data on public pages is permitted under a paid tier. If neither will grant it, fall back to **OSM (ODbL) for names/locations/boundaries** and build the rest of each page's value from *your own* posted-round data, which you unambiguously own.
3. **Use OSM regardless for the map layer** — course boundary polygons make your pages visually richer than competitors' pin-drops, and ODbL is fine as long as you attribute.
4. **Let UGC do the enrichment competitors can't buy.** The imported data is the skeleton (name, location, holes, par, ratings). Your posted rounds are the muscle. Over time the posted-round data becomes the primary reason each page ranks, which also de-risks you from the licensing question entirely.

> **Verify before building:** the free/paid API tiers and prices above are current as of this draft but change often, and none of the vendors publish redistribution terms on their homepage. Treat the written license confirmation as a hard prerequisite for Phase 1.

---

## 3. The integrated data model

Your app is **Expo / React Native + TypeScript + Supabase**. Critical architectural point up front:

> **A React Native app cannot be your SEO surface.** RN renders to native, not to crawlable HTML. The directory has to be a **separate server-rendered web property** (recommend **Next.js on Vercel**) that reads from the *same Supabase database* the app already uses. One database, two front-ends: the app writes rounds; the web directory renders them for Google. This is the single most important structural decision in the whole plan.

### New / changed Supabase tables

**`courses`** — the imported directory backbone.
```
id, slug, name, club_name,
address, city, state, zip, country,
lat, lng, boundary (geojson, from OSM),
num_holes, par, tees (jsonb: [{name, rating, slope, yardage}]),
source, external_id, imported_at, claimed_by (nullable → operator claims)
```

**`rounds`** (existing) — add two columns:
```
course_id (fk → courses.id)   -- link every round to a course
is_public (bool, default false) -- explicit opt-in to appear on the directory
```

**`public_rounds`** — the bridge between app and directory. Either a filtered view or a lightweight projection table, populated only when a user opts in:
```
round_id, course_id, user_id,
display_name,        -- opt-in: full name, first name + initial, or "Anonymous"
home_city,           -- coarse location only, never precise
gross_score, score_to_par, net_score (if handicap set),
holes_played, played_on, posted_at,
verified (bool)      -- true when scored via a group round (multiple scorers)
```

**`course_stats`** — a materialized/rollup table refreshed on a schedule so pages are fast:
```
course_id, rounds_count, avg_score, avg_to_par,
hardest_hole, easiest_hole, low_round_score, low_round_holder,
updated_at
```

Leaderboards are just **queries over `public_rounds`** sliced by scope (course / city / state / national), metric (gross, net, most rounds, biggest improvement, longest streak), and window (week / month / year / all-time). Cache the hot ones.

### Privacy & RLS — read this twice

Your own test harness already flagged RLS problems (the group-round join bug, and that *any* authed user can currently select all group rounds). The directory raises the stakes because you're now exposing data to the **public web via the anon key**. Non-negotiables:

- **Opt-in only.** A round is private until the user taps "Post to leaderboard." Default `is_public = false`.
- **The web front-end sees only `public_rounds`,** through an RLS policy that exposes a row solely when its source round is opted-in. No path from the anon key to a private round, a raw `rounds` row, or the over-permissive `group_rounds` select policy.
- **Coarse identity by default.** Let users post as full name, first-name-plus-initial, or anonymous. Never expose email, precise location, or the exact timestamp-to-the-minute.
- **Right to unpost.** One tap removes a round from the directory and the rollups.

---

## 4. Programmatic page architecture

Clean subfolders (not subdomains — subfolders consolidate domain authority). Hub-and-spoke internal linking so nothing is orphaned.

### Page types

**Course profile** (the money page) — `/courses/[state]/[city]/[course-slug]`
The one page per course. Contents, top to bottom:
- H1: course name + city, breadcrumbs with schema
- Map with OSM boundary polygon, address, holes, par, tee ratings/slope/yardage
- **The living scoreboard:** rounds posted, average score, average-to-par, hardest/easiest hole, this week's/all-time low round, score distribution
- **Leaderboard for this course** (top gross, top net, most rounds) — an `ItemList`
- Recent posted rounds feed (fresh, timestamped, unique content on every crawl)
- "Play here? Post your round" CTA → app install / deep link
- Nearby courses (internal links to spokes)

**State hub** — `/golf-courses/[state]` → all courses in a state, top-ranked by activity, links to city hubs.

**City hub** — `/golf-courses/[state]/[city]` → courses in a city + a city leaderboard.

**"Best golf courses in [city]"** — `/best-golf-courses-in-[city-state]` → curation playbook, ordered by *your* posted-round data (most-played, best-rated-by-scorers), which makes the ranking genuinely yours rather than a rehash.

**Leaderboard pages** — `/leaderboards`, `/leaderboards/[state]`, `/leaderboards/[metric]` → these are pure proprietary-data pages and will attract links/shares.

### Anti-thin-content strategy (critical)

16,000 pages where 15,000 have zero rounds = a thin-content bomb that can tank the whole domain. Manage indexation in tiers:

- **A course page earns full indexation once it clears a threshold** (e.g. has scorecard/rating data *and* ≥1 posted round, or ≥N rounds). Below that, keep it lighter or `noindex` until it fills in.
- **Pre-UGC value:** even a course with no rounds should carry real utility — accurate scorecard, tee ratings, map with boundary, weather, difficulty rating, nearby courses — so it isn't a bare template with a swapped name.
- **Roll out by tier,** not all 16k at once. Start with courses that already have rounds (your existing user base's home courses) plus the highest-search-volume names. Let Google see a quality signal before you scale the long tail.
- Unique title + meta per page, proper heading structure, segmented XML sitemaps (courses / hubs / leaderboards), breadcrumb + `GolfCourse`/`SportsActivityLocation` + `AggregateRating` + `ItemList` schema.

---

## 5. The gamification loop (built in from day one)

The gamification *is* the content engine — this is why you're building both together.

### The loop
```
Golfer finishes a round in the app
   → taps "Post to the SimplyStroke leaderboard"
      → round appears on that course's directory page + relevant leaderboards
         → page ranks / gets shared → a new golfer lands on it from Google
            → sees real scores + a CTA → installs the app
               → plays, posts a round → loop repeats
```

Every turn of the loop simultaneously (a) generates fresh unique content for SEO and (b) acquires a user. That's the compounding engine the static directories can't build.

### Leaderboard dimensions
- **Scope:** course · city · state · national
- **Metric:** best gross · best net (handicap-adjusted) · most rounds · biggest improvement · longest posting streak
- **Window:** this week · month · year · all-time
- **Cohort (later):** age brackets, handicap tiers

### Achievements / badges (retention + share triggers)
- *Course Conqueror* — first sub-par or personal-best round at a course
- *Hometown Hero* — #1 on your home course this month
- *Road Warrior* — posted rounds at N different courses
- *Streak* badges for consecutive weeks posting

Each badge is a natural social-share moment (screenshot → Instagram/Reddit → backlink + install), and it feeds the r/golf and community channels already in your launch TODO.

### Integrity (self-reported scores will get gamed)
- Distinguish **verified** rounds (scored inside a group round with multiple people on the card) from **self-reported** solo rounds; badge the verified ones and let leaderboards filter to verified-only.
- Sanity checks on implausible scores; a flag/report path; rate-limit posting.
- This also nudges users toward the group-round feature, which is your social/retention core.

---

## 6. Monetization

The directory's primary job is **top-of-funnel for app installs** — the app subscription is the real revenue. On top of that:

- **Gate premium leaderboard/stat views.** Net/handicap leaderboards and the deep stats dashboard (already on your premium roadmap) are natural paywall lines. Public gross leaderboards stay free as the hook.
- **Affiliate tee-time booking** on course pages (GolfNow / Supreme Golf affiliate) — monetize the transactional intent you'll capture without building booking yourself.
- **"Claim this course"** for operators — verified listing, respond to golfers, later an upsell to a promoted/enhanced listing. (`claimed_by` is already in the schema.)
- **Local lead gen** — lessons, club fitting, pro-shop offers on high-traffic course pages.

Keep money moves off the leaderboards themselves — your own launch notes already flag that real-money betting triggers App Store gambling rules. Leaderboards stay glory-only.

---

## 7. Phased rollout (integrated build)

**Phase 0 — Prerequisites (before any pages ship)**
- Get **written redistribution rights** from the course-data vendor. Hard gate.
- Fix the outstanding RLS issues from the test harness (esp. the over-broad group-round SELECT) so nothing private can leak through the public anon key.
- Stand up the **Next.js + Vercel** web property against the existing Supabase.

**Phase 1 — Directory skeleton + posting**
- Import the ~16k US courses into `courses`; add `course_id` + `is_public` to `rounds`; build `public_rounds` + RLS.
- Ship the **"Post to leaderboard"** flow in the app (opt-in, identity choice).
- Launch course profile pages + state/city hubs, **indexed in tiers** (courses with data/rounds first).
- Schema markup, segmented sitemaps, `llms.txt` (already on your launch list — the directory is the perfect body of content for AI-citation SEO).

**Phase 2 — Leaderboards + gamification**
- Course / city / state / national leaderboards; time windows; verified vs self-reported.
- Badges + share cards. Wire share moments into the Reddit/ProductHunt channels in your launch TODO.

**Phase 3 — Scale + monetize**
- Expand indexation across the long tail as rounds fill in; add "best courses in [city]" curation pages.
- Turn on affiliate booking, premium leaderboard gating, and "claim this course."

---

## 8. Risks & mitigations

- **Thin content across 16k pages** → tiered indexation; real pre-UGC utility per page; scale the long tail only as data fills in. *(Biggest SEO risk — take it seriously.)*
- **Data licensing** → written redistribution confirmation before Phase 1; OSM (ODbL) fallback; own your imported snapshot; let proprietary round data become the primary ranking asset.
- **Privacy leak via the public web** → opt-in only, `public_rounds`-only exposure to the anon key, coarse identity, one-tap unpost; fix known RLS holes first.
- **Leaderboard cheating** → verified-vs-self-reported split, sanity checks, reporting, rate limits.
- **Cold-start (empty leaderboards)** → seed with your existing users' home courses; import scorecard/rating data so pages have value at zero rounds; launch the directory where you already have density first.
- **Moderation** (display names, abuse) → constrained identity options, report path, profanity filter on names.

---

## 9. What I'd decide next

1. **Green-light the data vendor** — want me to draft the redistribution-rights email to GolfCourseAPI and golfapi.io?
2. **Confirm the web stack** — Next.js on Vercel against the existing Supabase is my recommendation; say the word if you'd rather Astro/other.
3. **Lock the Phase 1 slice** — which courses to index first (I'd start with your current users' home courses + top-search-volume names).

Once those are settled I can turn this into a concrete build ticket set: the SQL migrations for `courses` / `public_rounds` / `course_stats`, the RLS policies, the Next.js route + schema templates, and the in-app "Post to leaderboard" flow.

---

### Sources
- Course count: [National Golf Foundation](https://www.ngf.org/course-golfer-fact/u-s-map-of-golf-courses-by-state/)
- Data APIs: [GolfCourseAPI](https://golfcourseapi.com/), [golfapi.io](https://www.golfapi.io/), [OpenStreetMap golf tagging](https://wiki.openstreetmap.org/wiki/Tag:leisure=golf_course)
- Competitive landscape: [GolfLink](https://www.golflink.com/golf-courses/course-directory.aspx), [GolfNow](https://www.golfnow.com/course-directory), [GolfPass / Golf Advisor](https://www.golfpass.com/travel-advisor/)
