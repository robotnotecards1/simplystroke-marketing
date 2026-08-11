# Course Directory Data Engine — Spec ("turn the engine on")

**Written:** 2026-08-09 · **Status:** Phases 1–2 BUILT (2026-08-11): engine + posting flow live (mobile 0023–0027), marketing gate swapped to `released_courses` + `ROUNDS_THRESHOLD` in `lib/courses.ts`. Still open: §E facts licensing (Phase 3).
**Repos:** DB + app work → mobile monorepo `~/Documents/Claude/Projects/SimplyStroke`. Marketing gate → this repo (`marketing-site`).
**Context:** `COURSE-DIRECTORY-PLAN.md` (the strategy) + `lib/courses.ts` (the marketing data layer).

---

## 1. What's built vs. missing (from the trace, 2026-08-09)

**Built ✅**
- `courses` table (`0001_init.sql`) — public-readable (`for select using (true)`), seeded (`supabase/seed/courses.sql`), and **extended by later migrations** with `slug, status, geo (lat/lng), tees, course_rating/slope_rating, designer, year_opened`, plus a **release ramp** (`release_priority`, `release_at`) seeded in `course_release_priority.sql` (marquee courses = priority 100).
- Course **search cache** (`0017_course_search_cache.sql`) — the app can find/select a course when starting a round.
- `rounds` table synced to Supabase (`src/lib/sync.ts` → `from('rounds').upsert`) with `course_id (text)` + `course_name`, `total_strokes`, `total_par`, `holes_count`, `completed_at`. **RLS: owner-only** (`"own rounds"`).
- `hole_scores` per round (owner-only). Group rounds (`0002`) and tournaments (`0018`) are live.

**Missing ❌ (this is the engine)**
- `rounds.is_public` — the opt-in flag. **Does not exist.**
- `public_rounds` — the anon-safe public-read surface. **Exists only in `supabase/seed/demo_rounds.sql`**, not as a real view/table.
- `course_stats` — the rollup (avg, hardest hole, distribution, low round). **Demo-only.**
- **In-app "Post to leaderboard" flow** — nothing in the app writes a public flag; the only in-app leaderboards are **tournament** (private/group), not the public directory.
- **Marketing publish gate** ignores the DB ramp: `lib/courses.ts` builds a hardcoded `PUBLISHED_SLUGS` allowlist (the 10) and reads `public_rounds`/`course_stats`, which return **empty in production** → the 10 live pages show **empty leaderboards** today.
- **Rebuild trigger** — no webhook/nightly hook to regenerate static pages when a round posts.

**Net:** course *facts* + a *ramp* + private *round capture* exist. The public **bridge** (opt-in → public_rounds → stats → page) and the **in-app posting UI** do not.

---

## 2. Workstreams to close the gap

### A. Supabase migrations (mobile repo, `supabase/migrations/00XX_*.sql`)

1. **`rounds`:** add `is_public boolean not null default false`; add display prefs (`public_display_name text`, `public_home_city text`). Consider resolving `course_id (text)` to a real FK / normalized key against `courses.id` (today it's a loose text value — aggregation needs a reliable join key; the course-search cache can map it).
2. **`public_rounds`** — a **view** (or projection table) exposing *only* opted-in rounds with **coarse identity**: `round_id, course_id, display_name, home_city, gross_score, score_to_par, holes_played, played_on, verified`. No email, no precise location, no to-the-minute timestamp.
3. **`course_stats`** — rollup: `course_id, rounds_count, avg_score, avg_to_par, low_round, low_round_label, hardest_holes (jsonb), distribution (int[8]), updated_at`. Refresh via a scheduled function (pg_cron) or a trigger on public-round insert. (Shapes already defined in `lib/courses.ts` — match them exactly.)
4. **RLS / grants:** anon key may `select` **only** `public_rounds`, `courses`, `course_stats`. Never raw `rounds`/`hole_scores`. This must meet the `0005_audit_rls_hardening.sql` standard.
5. **Verified flag:** `verified = true` when the round was scored inside a group round (multiple scorers). Sanity-check implausible scores; rate-limit posting.

### B. In-app posting flow (React Native — **new app feature → new build + App Store review, not OTA**)

- On round completion: an opt-in **"Post to the SimplyStroke leaderboard"** (default OFF).
- **Identity choice:** full name / first name + initial / anonymous; coarse `home_city` only.
- Writes `rounds.is_public = true` + display prefs. **One-tap "unpost"** (sets false; row leaves `public_rounds` and the rollup).
- Requires the round's course resolved to a real `courses.id` (reuse the existing course search) so it aggregates to the correct page.

### C. Marketing site (this repo — **small**)

- `lib/courses.ts` already reads `public_rounds` + `course_stats` and is built for a client-side leaderboard refresh — so it's mostly ready.
- **Switch the publish gate:** replace the hardcoded `PUBLISHED_SLUGS` with the DB ramp — build courses where `release_at <= now()` **AND** facts are complete **AND** `rounds_count >= THRESHOLD`.
- **Exclude sub-threshold courses from BOTH `generateStaticParams` and `sitemap.ts`** (noindex is a fallback, not the default). This is the anti-thin-content gate.

### D. Rebuild cadence

- Nightly Vercel deploy hook **+** a debounced webhook on public-round insert, so indexed static content stays fresh (static export = freshness comes from rebuilds; the client refresh covers between-build gaps).

### E. Facts at scale (the hard gate for going past curated courses)

- A course a user *plays* only auto-generates a good page if you have its **scorecard/tees/ratings**. Beyond the curated 10 that needs a **licensed course-data source** (GolfCourseAPI / golfapi.io) with **written redistribution rights** — the plan's Phase-0 hard gate — or restrict auto-publish to courses that already have complete curated facts.

---

## 3. Recommended sequencing

1. **Phase 1 — light up the existing 10.** Ship `is_public` + `public_rounds` + `course_stats` + the in-app posting flow. The 10 live pages start showing **real** leaderboards. **No new pages yet** — this validates the whole loop on known-good curated courses and is the smallest slice that proves the engine.
2. **Phase 2 — auto-qualify.** Flip the marketing gate to the ramp + thresholds; courses with complete facts + ≥N rounds auto-publish in **cohorts**; watch index retention 6–8 weeks. *This is the "auto-generate as courses get played" behavior — gated, not per-first-play.*
3. **Phase 3 — scale facts.** License course data; expand the long tail as rounds fill in; add city/state hubs + "best courses in [city]" curation.

**Never** auto-publish on the *first* play — a 1-round, no-editorial, maybe-no-scorecard page is the thin-content bomb (`COURSE-DIRECTORY-PLAN.md` §4, §8).

---

## 4. Guardrails (non-negotiable, from the plan)

Opt-in only · coarse identity · one-tap unpost · anon key sees only `public_rounds`/`courses`/`course_stats` · exclude thin pages from build **and** sitemap · verified vs. self-reported split · sanity-check + rate-limit scores · attribute OSM map data (ODbL).

## 5. Effort snapshot

- DB migrations + RLS: ~moderate, self-contained.
- In-app posting flow: ~the biggest piece; needs design + a new binary submission.
- Marketing gate switch: ~small (a few functions in `lib/courses.ts` + `sitemap.ts`).
- Rebuild webhook: ~small.
- Facts licensing: ~procurement, not code — but blocks anything past the curated set.
