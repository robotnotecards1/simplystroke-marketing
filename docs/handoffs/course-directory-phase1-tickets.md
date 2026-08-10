# Course Directory — Phase 1 Build Tickets ("light up the existing 10")

**Goal:** the 10 already-published course pages show **real** leaderboards + stats from opted-in posted rounds. **No new pages.** This proves the whole loop on known-good curated courses.
**Repos:** DB → mobile `supabase/migrations/`. App → mobile `src/`. Marketing → this repo (mostly no change; it already reads `public_rounds`/`course_stats`).
**⚠️ Security-critical tickets are marked — the RLS/isolation must be tested against `0005_audit_rls_hardening.sql`'s standard before merge.**

---

## T1 — DB: opt-in flag + `public_rounds` projection  ⚠️ security-critical

Add the opt-in flag and a **projection table** the anon key reads *instead of* `rounds` (so there is no anon path to a raw round). Draft migration:

```sql
-- 00XX_public_leaderboards.sql

-- 1. Opt-in + coarse public identity on rounds.
alter table public.rounds
  add column if not exists is_public boolean not null default false,
  add column if not exists public_display_name text,  -- full / "First L." / null=Anonymous
  add column if not exists public_home_city  text;     -- coarse only, never precise

-- 2. Projection table: opted-in rounds only, safe columns only. Anon reads THIS.
create table if not exists public.public_rounds (
  round_id     text primary key references public.rounds(id) on delete cascade,
  course_id    text not null,
  display_name text not null default 'Anonymous',
  home_city    text,
  gross_score  integer not null,
  score_to_par integer not null,
  holes_played integer not null,
  played_on    timestamptz,
  verified     boolean not null default false
);
create index if not exists public_rounds_course_idx on public.public_rounds (course_id, gross_score);
alter table public.public_rounds enable row level security;
drop policy if exists "public_rounds readable" on public.public_rounds;
create policy "public_rounds readable" on public.public_rounds for select using (true);

-- 3. Keep the projection in sync. Posting/unposting flips a row in/out.
create or replace function public.sync_public_round()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (new.is_public and new.status = 'complete' and new.total_strokes is not null) then
    insert into public.public_rounds as p
      (round_id, course_id, display_name, home_city, gross_score, score_to_par, holes_played, played_on)
    values (new.id, new.course_id, coalesce(new.public_display_name,'Anonymous'),
            new.public_home_city, new.total_strokes,
            new.total_strokes - coalesce(new.total_par,0), new.holes_count, new.completed_at)
    on conflict (round_id) do update set
      course_id=excluded.course_id, display_name=excluded.display_name, home_city=excluded.home_city,
      gross_score=excluded.gross_score, score_to_par=excluded.score_to_par,
      holes_played=excluded.holes_played, played_on=excluded.played_on;
  else
    delete from public.public_rounds where round_id = new.id;  -- unpost / incomplete
  end if;
  return new;
end $$;

drop trigger if exists trg_sync_public_round on public.rounds;
create trigger trg_sync_public_round
  after insert or update of is_public, status, total_strokes, public_display_name, public_home_city
  on public.rounds for each row execute function public.sync_public_round();
```

**Acceptance:** anon key can `select` from `public_rounds` but **not** from `rounds`/`hole_scores`; a round only appears when `is_public=true`; setting `is_public=false` removes it. Add these as RLS harness cases.

**⚠️ The course_id linkage is the crux.** `rounds.course_id` is a free `text` value from the app's course search — for stats to land on the right marketing page it must equal the marketing course id/slug (e.g. `torrey-pines-south`). Confirm/normalize the mapping (T3), or the leaderboard shows on no page.

---

## T2 — DB: `course_stats` rollup + refresh

```sql
create table if not exists public.course_stats (
  course_id     text primary key,
  rounds_count  integer not null default 0,
  avg_score     numeric,
  avg_to_par    numeric,
  low_round     integer,
  low_round_label text,
  hardest_holes jsonb,        -- [{hole,par,over_par}]  (from hole_scores)
  distribution  integer[],    -- 8 buckets: <75,75-79,…,105+
  updated_at    timestamptz not null default now()
);
alter table public.course_stats enable row level security;
create policy "course_stats readable" on public.course_stats for select using (true);

create or replace function public.refresh_course_stats(p_course_id text)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.course_stats as cs
    (course_id, rounds_count, avg_score, avg_to_par, low_round, updated_at)
  select course_id, count(*), round(avg(gross_score),1), round(avg(score_to_par),1),
         min(gross_score), now()
  from public.public_rounds where course_id = p_course_id group by course_id
  on conflict (course_id) do update set
    rounds_count=excluded.rounds_count, avg_score=excluded.avg_score,
    avg_to_par=excluded.avg_to_par, low_round=excluded.low_round, updated_at=now();
  -- TODO: hardest_holes + distribution aggregate over hole_scores (definer reads all),
  -- joined via round_id ∈ public_rounds for this course.
end $$;
```

**Refresh cadence:** call `refresh_course_stats(course_id)` at the end of `sync_public_round`, **or** a `pg_cron` nightly pass over changed courses (debounce heavy recompute). Match the field shapes in `lib/courses.ts` (`CourseStats`) exactly — the marketing type is the contract.

**Acceptance:** stats populate for a course after a public round; a course with 0 public rounds has **no** `course_stats` row → marketing renders the existing empty state.

---

## T3 — App: "Post to the SimplyStroke leaderboard" flow  (biggest lift — **new build + App Store review**, not OTA)

On the round-complete / scorecard screen (`src/app/round/scorecard.tsx`):

- **Opt-in toggle**, default **OFF**: "Post this round to the SimplyStroke leaderboard."
- **Identity picker:** full name · first name + initial · Anonymous → sets `public_display_name`. Coarse `public_home_city` (city only, from profile, editable). **Never** email / precise location / exact time.
- On confirm: update the round row `is_public=true` + prefs (extends the existing `src/lib/sync.ts` upsert path).
- **One-tap "Remove from leaderboard"** on any past round → `is_public=false` (trigger deletes the projection + it drops from stats).
- **Course linkage:** resolve the round's course to the canonical `courses.id`/slug used by the directory (reuse `src/lib/courseSearch.ts`), so it aggregates to the right page. **This is the make-or-break integration point.**
- **Integrity:** flag `verified=true` for rounds scored inside a group round (multi-scorer); sanity-check implausible scores; rate-limit posting.

**Acceptance:** posting a round at Pebble Beach makes it appear on `/courses/california/pebble-beach/pebble-beach/`'s leaderboard after the next rebuild (and immediately via the client refresh); unposting removes it.

---

## T4 — Rebuild trigger + client refresh

- **Static export = indexed data comes from rebuilds.** Add a Vercel **Deploy Hook**; fire it (debounced, e.g. max once/hour) from a Supabase DB webhook / edge function on `public_rounds` insert, **plus** a nightly cron deploy.
- **Verify the client-side leaderboard refresh** already anticipated in `lib/courses.ts` (`getLeaderboard` comment: "refreshed client-side from public_rounds") actually fetches live `public_rounds` on load, so humans see near-live data between builds.

**Acceptance:** a posted round shows within the client refresh immediately, and is baked into static HTML by the next scheduled/triggered build.

---

## Not in Phase 1 (deliberately)
- **Auto-publishing new courses** (the ramp/threshold gate switch in `lib/courses.ts` + `sitemap.ts`) → Phase 2.
- **Course-data licensing** for facts beyond the curated 10 → Phase 3.

## Guardrails (carry from the plan)
Opt-in only · coarse identity · one-tap unpost · anon reads only `public_rounds`/`courses`/`course_stats` · verified vs. self-reported · sanity-check + rate-limit · thin pages excluded from build **and** sitemap.

## Suggested order
T1 → T2 (DB, together, one migration + one refresh fn) → T4 client-refresh verify → **T3 app flow** (the long pole) → T4 rebuild webhook. First real leaderboard lands the moment T1–T3 ship and one round is posted at a curated course.
