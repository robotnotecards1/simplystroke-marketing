# Course directory: ramp-release activation runbook

Turnkey steps to activate the automated ramp-up release system. Everything on
the DB side is already built and **inert** — this runbook flips it on. Do NOT
start until you actually want to gate publishing by `release_at` (with only 10
courses today, the ramp releases all 10 at once and then has nothing to ramp
into until the ~16k import pipeline exists; see "Reality check" at the bottom).

## Already done (no action)
- Migration `0007_course_release_ramp.sql` applied: `courses.release_at` +
  `release_priority`, `release_runs` audit table, `course_is_publishable()`,
  the `released_courses` view (not granted to anon), and
  `release_next_course_batch(n)`.
- Priority seeded: all 10 marquee courses at `release_priority = 100`.
- Extensions `pg_cron`, `pg_net`, `supabase_vault` are installed.
- The build code is on branch **`course-ramp-activation`** (adds
  `lib/supabaseAdmin.ts` and a ramp branch in `getPublishedCourses()`). It is a
  **no-op until `COURSE_RAMP=1`** — merging it changes nothing on its own.

## Activation order (avoids any empty-directory window)

Do these in this exact order. The trap to avoid: setting `COURSE_RAMP=1` while
zero courses are released makes the production build render **zero** course
pages. Releasing first prevents that.

**1. Merge `course-ramp-activation` → main.** Safe: with `COURSE_RAMP` unset,
the build still uses the current `status='published'` path.

**2. Create a Vercel Deploy Hook** (Project → Settings → Git → Deploy Hooks) on
the production branch. Copy the URL.

**3. Store the hook + service key.**
- In the Supabase SQL editor:
  ```sql
  select vault.create_secret(
    'https://api.vercel.com/v1/integrations/deploy/prj_XXXX/YYYY',  -- your hook URL
    'vercel_deploy_hook'
  );
  ```
- In Vercel → Settings → Environment Variables (Production), add
  `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service role key (Supabase →
  Settings → API → `service_role`). **Do NOT set `COURSE_RAMP` yet.**

**4. Canary-release the first batch** (still on the status path, so this just
stamps rows and pings the hook for a normal rebuild):
```sql
select public.release_next_course_batch(500);   -- with 10 courses, releases all 10
select * from public.release_runs order by ran_at desc;   -- audit
```

**5. Flip the flag.** In Vercel add `COURSE_RAMP=1` (Production). Saving it (and
the redeploy it triggers) switches the build to the `released_courses` path.
Because step 4 already released the 10, the ramp build renders them — no gap.

**6. Verify** the production build's course pages equal exactly the released set
(`select slug from public.released_courses order by slug;`).

## (Optional, do at scale) Truly hide the unreleased queue
`public.courses` is still anon-readable today, so a competitor could read the
whole queue directly via the anon key. Once you rely on the ramp for staged
rollout, tighten the anon SELECT policy so only released rows are visible.
Safe ONLY after step 5 (the build no longer reads `courses` via anon):
```sql
drop policy if exists "courses readable" on public.courses;
create policy "courses readable" on public.courses
  for select using (release_at is not null and release_at <= now());
```

## Cron (schedule AFTER a 2-3 week canary watch)
Times are UTC. `pg_net` + the Vault hook are already available.
```sql
-- Nightly rebuild (~4am ET): picks up freshness + newly eligible courses.
select cron.schedule('nightly-rebuild', '0 8 * * *', $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets
             where name = 'vercel_deploy_hook'),
    body := '{}'::jsonb);
$$);

-- Weekly release (~9am ET Monday): next N courses. Pick N for your pace.
select cron.schedule('weekly-release', '0 13 * * 1', $$
  select public.release_next_course_batch(200);
$$);
```
Pace controls: change N by rescheduling; pause with
`select cron.unschedule('weekly-release');`; resume by re-running the schedule.

## Monitoring
- Release audit: `select * from public.release_runs order by ran_at desc;`
- Indexation: Search Console coverage on the canary slugs.
- Green after 2-3 weeks → enable `weekly-release`. Thin/flat → hold, enrich data.

## Reality check (why this is inert today)
- **Only 10 courses exist**, and there is no ~16k import pipeline yet. The
  canary releases all 10; `weekly-release` then has nothing to release until
  the bulk import lands. **Don't schedule `weekly-release` until there's a
  queue.**
- **No real rounds flow yet** (the in-app "post to leaderboard" feature is not
  built), so the `nightly-rebuild` won't change any stats until it is. The
  demo rounds are static.
- Net: this system is the rails; the train (bulk import + app posting) is the
  prerequisite for it to do anything visible. Activating it now is fine (it
  just gates the 10), but the payoff comes with those two pieces.
