# Supabase Security-Advisor Handoff — SimplyStroke DB

**Project:** `uqlrfzzszfsnjepuppdk` (prod)
**Prepared from:** the marketing-site session, after verifying every item against the **live** database on 2026-07-27.
**State:** nothing has been changed. The DB is untouched. This is a plan, not a report.

## Why this landed on you
The marketing-site session was handed a batch of advisor flags "to fix in this repo." On inspection, they aren't the marketing site's to change — it only **reads** `public_rounds` / `course_stats` with the anon key. The flagged objects were created by the `course_directory` and `course_release_ramp` migrations, and **those migration files exist in no repo** — the live DB is ahead of every tracked migration set. One flagged table (`analytics_events`) is defined in the **admin** repo but is **empty and superseded by `app_events`** (nothing writes it). So this routes to whoever owns the DB schema (you) plus a small piece for the admin session.

## Ground truth (verified against live DB)

| Object | Advisor | Reality on prod | Owner |
|---|---|---|---|
| `public_rounds` (view) | ERROR `security_definer_view` | Non-invoker view (`security_barrier=true`, owner `postgres`) over `rounds LEFT JOIN profiles`. anon+authenticated hold **ALL** privileges (incl. write). Marketing **reads** it (anon SELECT). | course_directory (orphaned migration) |
| `released_courses` (view) | ERROR `security_definer_view` | Non-invoker view over `courses` + `course_is_publishable()`. Only `authenticated` granted; anon has none. **Unused by the marketing site** (it reads `courses` directly). | course_release_ramp (orphaned) |
| `release_next_course_batch(int)` | WARN ×2 (anon + authenticated executable) | `SECURITY DEFINER`, PUBLIC has EXECUTE. It's a **cron** function (writes `release_runs`, pings the Vercel deploy hook via vault + pg_net). No client should call it. | course_release_ramp (orphaned) |
| `course_is_publishable(courses)` | WARN `function_search_path_mutable` | IMMUTABLE SQL, no `search_path` set. Used by `released_courses` + `release_next_course_batch`. | course_release_ramp (orphaned) |
| `analytics_events` (table) | WARN `rls_policy_always_true` (INSERT) | **Empty (0 rows), no writer** — the app writes `app_events` (migration 0010), not this; superseded/vestigial. INSERT policy `WITH CHECK (true)` for anon+authenticated. | **admin repo** (`admin/supabase/migrations/0001_analytics_events.sql`) |

## ⚠️ Two traps — do NOT apply the linter's stock fixes blindly

1. **Do not just flip `public_rounds` to `SECURITY INVOKER`.** The only policy on `rounds` is `own rounds` (`auth.uid() = user_id`) — there is **no anon SELECT policy**. As an invoker view it would run as the anon caller, RLS would hide every row, and **the public course leaderboards go blank** (the marketing site refreshes them live from `public_rounds`). The `profiles` join is RLS-gated too, so even a partial fix collapses every golfer's name to "Anonymous."
2. **`analytics_events` has no writer — don't tighten a policy for a client that doesn't exist.** Verified empty (0 rows); the app writes `app_events`, the marketing site uses Umami. The permissive INSERT sits on a dead table, so the honest fix is to **drop it** (or lock the policy) — not to tighten `with check` for a nonexistent writer.

## Safe fixes — verified non-breaking, ready to apply
Record as one migration (e.g. `0017_advisor_hardening.sql`) wherever your DB migrations are tracked.

```sql
-- (1) release_next_course_batch: cron/service_role only. Clears 2 WARNs.
--     service_role keeps its explicit grant, so the cron is unaffected.
revoke execute on function public.release_next_course_batch(integer)
  from public, anon, authenticated;

-- (2) course_is_publishable: pin search_path. Clears 1 WARN.
alter function public.course_is_publishable(public.courses)
  set search_path = public, pg_temp;

-- (3) public_rounds: strip phantom write grants; KEEP anon/authenticated SELECT
--     (these writes fail anyway on a non-updatable view, but this is correct
--      least-privilege and removes the confusing surface).
revoke insert, update, delete, truncate, references, trigger
  on public.public_rounds from anon, authenticated;

-- (4) released_courses: strip write grants; keep authenticated SELECT (anon had none).
revoke insert, update, delete, truncate, references, trigger
  on public.released_courses from authenticated;
```

This clears the three WARNs on `release_next_course_batch` and `course_is_publishable`, and removes the real least-privilege problem on both views. It does **not** clear the two view ERRORs (that needs the decision below) and does **not** touch `analytics_events`.

## Needs a decision — the two view ERRORs

**`public_rounds`** — pick one:
- **A. Projection table (privacy-preserving, recommended).** Replace the view with a table holding only the safe projected columns (`course_id`, coarse `display_name`, `gross_score`, `score_to_par`, `holes_count`, `played_on`), `SELECT` to anon, no write grants, kept in sync by a `SECURITY DEFINER` trigger on `rounds`. Clears the ERROR, keeps raw `rounds`/`profiles` invisible to anon, and is transparent to the marketing site (same column names). It's a small build (table + trigger + backfill).
- **B. Invoker + RLS (fast, but changes the privacy posture).** Add `SELECT` policies so anon can read the underlying rows, then flip the view:
  ```sql
  create policy "public opted-in rounds readable" on public.rounds
    for select to anon, authenticated
    using (is_public and status = 'complete');
  create policy "profiles of public rounds readable" on public.profiles
    for select to anon, authenticated
    using (id in (select user_id from public.rounds where is_public and status = 'complete'));
  alter view public.public_rounds set (security_invoker = on);
  ```
  Trade-off: anon can then query `rounds` and `profiles` **directly** and read `user_id`, `avatar_url`, `is_pro`, raw scores/timestamps for public rounds — which conflicts with the course-directory design principle ("coarse identity only; never raw round/user_id to anon"). Only choose this if you accept "public rounds are fully public at the row level."

**`released_courses`** — it's unused by the marketing site and reads only `courses` (already public-readable):
- If nothing else reads it → `drop view public.released_courses;` (cleanest, clears the ERROR).
- If something does → `alter view public.released_courses set (security_invoker = on);` is low-risk here (unlike `public_rounds`), since `courses` has a public SELECT policy and the caller has EXECUTE on `course_is_publishable`.

---
## → FORWARD THIS BLOCK TO THE ADMIN SESSION

`public.analytics_events` (defined in `admin/supabase/migrations/0001_analytics_events.sql`) has advisor WARN `rls_policy_always_true`: its INSERT policy `app can insert events` is `WITH CHECK (true)` for `anon, authenticated`. **Verified empty (0 rows) with no writer in any repo** — the mobile app writes `app_events` (migration 0010) and the marketing site uses Umami, so the migration's own comment (that the app writes this table) is stale. **Recommended: drop the dead table** (clears the flag and the object):
```sql
drop table public.analytics_events;
```
If you'd rather reserve it for future use, keep it and lock the policy instead (no live telemetry is affected either way):
```sql
alter policy "app can insert events" on public.analytics_events
  with check (user_id is null or user_id = (select auth.uid()));
```
---

## Also on the advisor, owned elsewhere (app repo — not course-directory)
Surfacing so nothing's a surprise when you re-run it:
- `contains_profanity(text)`, `is_group_round_member(text)`, `find_group_round_by_code(text)` — SECURITY DEFINER, anon/authenticated executable (group-rounds / profanity features). Decide per function: `revoke execute` if not meant to be called directly, else switch to invoker.
- `pg_net` extension installed in `public` (WARN) — move to another schema (infra).
- Leaked-password protection disabled (WARN) — a dashboard/auth toggle.
- INFO `rls_enabled_no_policy` on `waitlist`, `course_edit_suggestions`, `release_runs`, `edge_rate_limits`, `error_reports`, `profanity_words` — all intentionally service-role-only. Benign; safe to ignore or annotate.

## Drift note (recommended)
The `course_directory` and `course_release_ramp` migrations that created `public_rounds`, `released_courses`, `release_next_course_batch`, `course_is_publishable`, `course_stats`, `course_edit_suggestions`, `release_runs` are **in the live DB history but in no repo's `supabase/migrations/`**. Consider dumping their live definitions into tracked migration files so the repos and DB reconcile — otherwise the next person hits this same ambiguity.

## Verify after applying
Re-run the security advisor (`get_advisors` type `security`). Expect: the three `release_next_course_batch` / `course_is_publishable` WARNs gone immediately; the two `security_definer_view` ERRORs gone once the `public_rounds` / `released_courses` decisions land; `analytics_events` resolved or consciously accepted by the admin session.
