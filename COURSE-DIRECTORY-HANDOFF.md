# Claude Code Handoff: Golf Course Directory (Phase 1, 10 courses)

Paste this to Claude Code from the repo root. It has the full context; read the referenced files before starting.

---

## Goal

Build a golf-course directory on the SimplyStroke marketing site. Each course gets a rich, SEO-optimized page driven by our own data. This is the same programmatic-SEO play as our other directory sites, with one differentiator: real amateur round data that no competitor has.

**Scope for this phase: ship 10 courses to a Vercel preview for internal review before we scale to ~16,000.** Do not bulk-import. Get the template, the data pipeline, and the "suggest an edit" flow right on 10 courses first.

## Read these first

- `marketing-site/COURSE-DIRECTORY-PLAN.md` — full strategy and data model.
- `marketing-site/DATA-SEO-PLAYBOOK.md` — the SEO plays each page must support.
- `marketing-site/prototypes/course-page.html` — the APPROVED visual design. Build the page to match this. It uses the real design system and our existing components.
- `marketing-site/app/globals.css`, `components/AnswerBlock.tsx`, `components/Breadcrumbs.tsx` — reuse these, do not reinvent them.
- `supabase/migrations/` — follow the existing migration style; latest is `0005`.

## Stack constraints (already true in this repo, do not change)

- Marketing site is **Next.js 16 App Router with `output: "export"`** (static export) on Vercel. **No server at runtime, no ISR.** All course pages are generated at build time via `generateStaticParams` reading Supabase. Freshness comes from scheduled rebuilds plus client-side fetches, not server rendering.
- Supabase is the database. RLS is enforced and actively hardened (see `0005`). Anything new must meet the same RLS standard.
- Edge functions exist (`supabase/functions/delete-account`). Resend is connected for email. There is an `admin/` surface at the repo root.

## Content rules (hard requirements)

- **Every piece of copy runs through the human-tone standard: no AI vocabulary (leverage, streamline, unlock, elevate, seamless, etc.), lead with specifics and numbers, active voice.**
- **Zero em dashes, ever.** Use commas, colons, periods, or restructure. A hyphen in compounds and ranges (par-4, 85-89) is fine.
- Each course's written overview must be unique. For these 10, write them by hand or generate then hand-edit. No duplicated template prose across pages (thin-content risk).

## The 10 seed courses (all publicly playable, high search volume — adjust if you prefer)

1. Torrey Pines South, La Jolla, CA
2. Torrey Pines North, La Jolla, CA
3. Bethpage Black, Farmingdale, NY
4. Pebble Beach Golf Links, Pebble Beach, CA
5. TPC Sawgrass (Stadium), Ponte Vedra Beach, FL
6. Chambers Bay, University Place, WA
7. Pinehurst No. 2, Pinehurst, NC
8. Bandon Dunes, Bandon, OR
9. Kiawah Island (Ocean Course), Kiawah Island, SC
10. Whistling Straits (Straits), Sheboygan, WI

Seed these into `courses` from a hand-curated JSON file in the repo (accurate facts, verified). Do not wire up the paid course-data API yet; that is a later phase and depends on a licensing sign-off.

## Data model (new migration `0006_course_directory.sql`)

Extend `courses` (it already exists from `0001`, currently: id, name, city, state, country, holes_count, par_total, par_per_hole, type, source). Add: `slug` (unique), `address`, `zip`, `lat`, `lng`, `designer`, `year_opened`, `course_rating`, `slope_rating`, `tees` (jsonb: array of {name, rating, slope, yardage, holes[]}), `website`, `phone`, `green_fee_tier`, `amenities` (text[]), `access_type` (public/muni/private/resort), `status` (draft/published), `claimed_by`.

Add to `rounds`: `is_public` (bool default false). (Rounds already have `course_id`.)

New `course_stats` (rollup, refreshed on a schedule): `course_id` (pk), `rounds_count`, `avg_score`, `avg_to_par`, `low_round`, `low_round_label`, `hardest_hole`, `distribution` (jsonb), `updated_at`.

New `course_edit_suggestions`: `id`, `course_id`, `field`, `suggested_value` (text), `submitter_email` (nullable), `page_url`, `status` (new/reviewed/applied/rejected, default new), `created_at`.

New `public_rounds` read surface: a view or policy exposing only rounds where `is_public = true`, safe for the anon key. No path from anon to a private round.

**RLS:** `courses` and `course_stats` public SELECT. `public_rounds` public SELECT (opted-in only). `course_edit_suggestions` NO public SELECT and NO public INSERT (insertion happens through the edge function below with the service role). Never expose raw `rounds` or emails to anon.

## The page (`app/courses/[state]/[city]/[slug]/page.tsx`)

Static params from the 10 published courses. `generateMetadata` for a unique title (~55 chars, course + city front-loaded) and meta description per page. Section order matches the approved prototype:

1. Breadcrumbs (use `Breadcrumbs.tsx`) + a "featured in [hub]" link.
2. Hero: course name, location, our rating, freshness stamp, key-fact chips, and the generated imagery (see below).
3. "The short answer" (use `AnswerBlock.tsx`) plus two secondary Q&A cards. Source-and-date line under each, e.g. "From N posted rounds · updated [month year]". **No "AI-ready" label.**
4. Scoreboard (new `CourseScoreboard`): avg score, avg to par, low round, rounds logged, distribution, hardest holes. Dark green band.
5. Score-compare tool (new `ScoreCompare`, client component): enter a score, get a percentile from the distribution.
6. Leaderboard (new `CourseLeaderboard`, client component): baked-in top rounds at build time, refreshed client-side from `public_rounds`.
7. Unique prose overview with a sticky right rail ("At a glance" facts + a "Post your round" CTA).
8. South-vs-North style comparison where a sibling course exists.
9. Full scorecard table.
10. Contact, rates, amenities.
11. **Suggest an edit** section + modal (see below).
12. Nearby courses (internal links).
13. CTA band, FAQ (with `FAQPage` schema), footer with methodology link.

**Empty states matter:** these 10 courses have zero real rounds yet. Build graceful empty states for the scoreboard, leaderboard, percentile, and rating ("Be the first to post a round here"). Only render `AggregateRating` schema when `rounds_count > 0`. Also provide a dev-only seed script that inserts a small set of synthetic rounds for the 10 courses (clearly flagged, never in production) so reviewers can see the fully-populated design.

## Imagery (no stock photos, ever)

Two generated visuals per course, toggled in the hero:

- **Satellite/aerial** from the course coordinates via a static-map API (Mapbox Static Images or equivalent). Token via env.
- **Course routing map** rendered from OpenStreetMap golf data (fairways/greens as polygons, numbered holes). Attribute OSM (ODbL).

No Google/GMB photos (their terms forbid storing them). No AI-generated photos of the real course. Golfer-submitted photos come in a later phase.

## Suggest-an-edit flow (with Cloudflare Turnstile)

Because the site is static, the form must not insert directly. Route it through an edge function:

1. Form (client component `SuggestEditModal`) renders a **Cloudflare Turnstile** widget and collects: field, suggested value, optional email. Fields match the prototype.
2. On submit, POST the form data plus the Turnstile token to a new edge function `submit-course-edit`.
3. The edge function: (a) verifies the Turnstile token server-side against Cloudflare siteverify using the secret key, (b) on success inserts into `course_edit_suggestions` with the service role, (c) sends a notification email via **Resend to jared@jaredmoore.com** with the course, field, suggestion, and submitter. Reject and return an error if the token fails.
4. Add a basic per-IP rate limit in the function.

Env needed: `TURNSTILE_SITE_KEY` (client), `TURNSTILE_SECRET_KEY` (function), Resend API key, Supabase service role key (function only).

**Admin:** in `admin/`, add a list view of `course_edit_suggestions` (service role) with a status workflow (new → reviewed → applied/rejected). Applying an edit updates the `courses` row, which flows into the next rebuild.

## SEO plumbing

- `robots.txt`: explicitly allow `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`. Do not block them.
- Segmented sitemap entries for the course pages (extend the existing `app/sitemap.ts`).
- Schema per page: `GolfCourse`, `BreadcrumbList`, `FAQPage`, `ItemList` (leaderboard), and `AggregateRating` only when rounds exist.
- Optional but nice: a per-course JSON endpoint (`/courses/[...]/data.json`) so AI agents can read the stats without rendering.
- Keep Core Web Vitals clean: pre-size the generated images at build (no layout shift), lazy-load below the fold.

## Deliverables / acceptance criteria

- 10 course pages live on a Vercel preview URL (staging noindex until we approve).
- Every page renders all sections, with correct empty states given zero real rounds, and looks like `prototypes/course-page.html`.
- Suggest-an-edit works end to end: Turnstile blocks bots, a valid submission lands in `course_edit_suggestions`, an email arrives at jared@jaredmoore.com, and it shows in the admin list.
- All copy is human-tone and contains zero em dashes.
- Schema validates (Rich Results Test). robots.txt allows the AI crawlers. Lighthouse SEO 100.
- Migration `0006` is idempotent and follows the `0005` style. RLS verified: anon cannot read `course_edit_suggestions`, emails, or private rounds.

## Out of scope this phase

Bulk 16k import and the paid data API (needs licensing sign-off). The in-app "post to leaderboard" flow. Monetization and affiliate links. Do only the 10-course review build.
