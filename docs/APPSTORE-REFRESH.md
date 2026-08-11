# Keeping the App Store rating & reviews fresh

The homepage shows a live **rating badge** ("★ N · M App Store ratings"), a matching
`aggregateRating` in the JSON-LD, and **5-star testimonials** — all fetched at
**build time** by `lib/appStore.ts`. Because the site is a static export
(`output: "export"`), those numbers are only as current as the **last deploy**.

Every deploy already refreshes them. This adds a **daily automatic** refresh so
they track the store even on days nobody ships.

## How it works

`.github/workflows/refresh-appstore.yml` runs once a day (12:00 UTC) and POSTs to
a **Vercel Deploy Hook**, which triggers a production rebuild. The rebuild re-runs
the App Store fetch, so the rating/reviews update. The fetch is fail-safe: if
Apple is slow or unreachable it times out at 6s and falls back to the committed
snapshot, so a refresh can never break the site.

## One-time setup (2 steps)

**1. Create a Vercel Deploy Hook**
- Vercel → **simplystroke-marketing** → **Settings → Git → Deploy Hooks**
- Create a hook: name `daily-appstore-refresh`, branch `main`
- Copy the generated URL (looks like `https://api.vercel.com/v1/integrations/deploy/prj_…/…`)

**2. Add it to GitHub as a secret**
- GitHub → repo → **Settings → Secrets and variables → Actions → New repository secret**
- Name: `VERCEL_DEPLOY_HOOK_URL`
- Value: the hook URL from step 1

That's it. Until the secret exists, the workflow still runs but safely no-ops.

## Test / control it

- **Run now:** GitHub → **Actions → Refresh App Store rating & reviews → Run workflow**.
- **Change cadence:** edit the `cron:` line in the workflow (e.g. `0 */12 * * *` for twice daily).
- **Turn it off:** disable the workflow in the Actions tab, or delete the file.

## Related

- `lib/appStore.ts` — the build-time fetch (rating + 5-star reviews, 6s timeout, snapshot fallback).
- `docs/SCHEMA-DECISION.md` — why the rating is fetched, not hard-coded.
