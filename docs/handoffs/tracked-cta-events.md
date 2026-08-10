# Handoff: Tracked CTA Analytics Events — SimplyStroke marketing site

**For:** Claude Cowork (implementation agent)
**Scope:** One focused task — add GA4 custom events to the site's call-to-action buttons so App Store and web-app intent become measurable. Nothing else.
**Owner to approve/merge:** Jared. **Do not deploy.**

---

## 0. Repo location — read this first

Work in **exactly** this repo (note: **`SimplyStroke`, no space**):

```
/Users/jaredmoore/Documents/Claude/Projects/SimplyStroke/marketing-site
```

⚠️ There is a near-identical decoy folder `.../Projects/Simply Stroke/marketing-site` (**with a space**) that contains only a stray `LAUNCH-TODO.md` and **no site**. Do not touch it. If your working directory doesn't contain `app/`, `components/`, `lib/site.ts`, and `package.json` with `next` in it, you are in the wrong folder.

- **Framework:** Next.js **16, static export** (`output: "export"` → plain HTML/CSS/JS in `out/`, no server, no runtime hydration data). All interactivity must be client-side (`"use client"`).
- **Styling:** custom CSS design system in `app/globals.css` (no Tailwind).
- Read **`AGENTS.md`** before coding — this Next.js has breaking changes vs. training data; consult `node_modules/next/dist/docs/` and heed deprecations.
- **Branch discipline:** never commit to `main`. **Base your branch on the current `origin/main` — run `git fetch origin` first.** `origin/main` is the launched, live state (App Store badge, `APP_STORE_URL`/`APP_URL`, `/tournament`). Do **not** branch off a stale local `main`, and do **not** branch off `claude/app-store-live` — its launch content is already in `origin/main`, it lacks the later hero-CTA layout (PR #5), and **every file:line reference below is keyed to `origin/main`.** Create `growth/cta-events`, open a PR; preview builds are auto-noindexed.

---

## 1. Goal & why

Google Search Console shows `/golf-stroke-counter/` earning the most organic impressions, but GA4 currently has **zero key events** — so we cannot tell whether any organic visitor ever clicks through to the App Store. This task makes that click measurable.

**North-star funnel:** organic landing session → **App Store click** → first round started → first round completed. We can only instrument the first arrow from the website; App Store Connect remains the source of truth for installs.

## 2. Current state (verified — build on this, don't reinvent)

Analytics is **already installed**; only the events are missing.

- **GA4 (gtag.js)** is loaded in `app/layout.tsx` (`<Script strategy="afterInteractive">`), configured with `GA_ID = "G-M00J122TYL"` (defined in `lib/site.ts`). `gtag('config', ...)` already fires the pageview.
- **Umami** (privacy-first, self-hosted) is also loaded in `app/layout.tsx` (`data-website-id="20c6bcc0-8be5-429f-be45-51d4f57600cf"`). Mirroring events to Umami is optional/nice-to-have.
- **CTA destinations** live as constants in `lib/site.ts`:
  - `APP_STORE_URL = "https://apps.apple.com/app/simplystroke-golf-scorecard/id6792327238"`
  - `APP_URL = "https://app.simplystroke.app"` (the browser/web app)
- **`components/StoreBadges.tsx`** is the primary App Store badge: the Apple badge is a live `<a href={APP_STORE_URL}>`; Google Play is a non-link "coming soon" `<div>` (leave it non-tracked until Android ships).

There is **no analytics helper module yet** — you'll create one.

## 3. Events to implement

| Event | When it fires | Params (all events) |
|---|---|---|
| `app_store_click` | user activates any CTA whose destination is `APP_STORE_URL` | `page_path`, `cta_location`, `cta_copy`, `device_category`, `destination` |
| `web_app_click` | user activates any CTA whose destination is `APP_URL` (`app.simplystroke.app`) | same five params |
| `guide_engaged` | once per page load on guide/article pages, after **both** ≥60s on page **and** ≥50% scroll depth | `page_path` (others optional) |

**Param definitions:**
- `page_path` — `window.location.pathname` at click time (e.g. `/golf-stroke-counter`).
- `cta_location` — a stable slug identifying *where* the CTA is (taxonomy in §5). This is the key analysis dimension.
- `cta_copy` — the button's visible text (e.g. `Download free on the App Store`).
- `device_category` — `"mobile" | "tablet" | "desktop"`, computed at click time (viewport width: <768 mobile, <1024 tablet, else desktop).
- `destination` — the resolved target URL.

**Mark `app_store_click` as a GA4 _key event_** — this is a manual step in the GA4 admin UI that only Jared can do; call it out in your deliverables (see §8), don't attempt it in code.

## 4. Implementation approach (recommended)

Keep it small, typed, and static-export-safe.

**a) `lib/analytics.ts`** — a tiny client-safe helper:
```ts
type CtaParams = {
  page_path: string;
  cta_location: string;
  cta_copy: string;
  device_category: "mobile" | "tablet" | "desktop";
  destination: string;
};

declare global { interface Window { gtag?: (...args: unknown[]) => void; umami?: { track: (e: string, d?: Record<string, unknown>) => void } } }

export function deviceCategory(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
}

export function trackCta(event: "app_store_click" | "web_app_click", p: Omit<CtaParams, "page_path" | "device_category"> & Partial<CtaParams>) {
  if (typeof window === "undefined") return;
  const params: CtaParams = {
    page_path: window.location.pathname,
    device_category: deviceCategory(),
    ...p,
  } as CtaParams;
  // transport_type 'beacon' so the event survives the external navigation.
  window.gtag?.("event", event, { ...params, transport_type: "beacon" });
  window.umami?.track(event, params); // optional mirror
}
```

**b) `components/TrackedCta.tsx`** — a `"use client"` anchor wrapper that preserves the existing markup (same `className`, `aria-label`, `href`, children) and fires on click. Because these anchors navigate to external sites, rely on `transport_type: 'beacon'` (above) rather than blocking navigation. Example:
```tsx
"use client";
import { trackCta } from "@/lib/analytics";

export default function TrackedCta({ event, ctaLocation, href, children, ...rest }: {
  event: "app_store_click" | "web_app_click";
  ctaLocation: string;
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} {...rest} onClick={(e) => {
      const cta_copy = (e.currentTarget.textContent || "").trim().slice(0, 100);
      trackCta(event, { cta_location: ctaLocation, cta_copy, destination: href });
    }}>{children}</a>
  );
}
```
Swap the existing `<a href={APP_STORE_URL}>`/`<a href={APP_URL}>` CTAs for `<TrackedCta>` (or, for `StoreBadges`, wrap just the Apple `<a>`). **Keep every className, style, and aria-label identical** so visual design and accessibility are unchanged.

**c) `components/GuideEngagement.tsx`** — a `"use client"` component that mounts on guide/article pages, sets a 60s timer and a scroll listener, and fires `guide_engaged` **once** when both conditions are met (then removes its listeners). Mount it on `/guides/*`, `/adhd-golf`, and `/golf-stroke-counter` pages.

**Guardrails inside the code:**
- **No double-firing.** One handler per anchor. Do not also add a document-level delegated click listener — pick one mechanism (the per-component `onClick` above).
- **Static-export safe.** All of this is client-only; guard every `window` access. No server components call these.
- **Privacy parity.** There is currently no consent gate on the site; match that (don't add new tracking that behaves differently). If a consent banner is introduced later, these events should be gated behind it — leave a code comment noting that.
- **Don't centralize-refactor beyond scope.** Several web-app CTAs hardcode `"https://app.simplystroke.app"` instead of importing `APP_URL` — you may pass the literal through `TrackedCta`; a broader cleanup is out of scope for this task.

## 5. `cta_location` taxonomy (use these exact slugs)

App Store CTAs:
| Slug | Site |
|---|---|
| `nav_appstore` | `components/Nav.tsx:25` (`btn btn-nav`) |
| `home_hero_appstore` | `app/page.tsx:123` (`btn btn-hero`) |
| `home_hero_badge_appstore` | `app/page.tsx:127` `<StoreBadges/>` (Apple badge) |
| `home_watch_appstore` | `app/page.tsx:284` (`btn btn-watch`) |
| `download_hero_appstore` | `app/download/page.tsx:38` (`btn btn-hero`) |
| `download_badge_appstore` | `app/download/page.tsx:49` `<StoreBadges/>` (Apple badge) |
| `tournament_appstore` | `app/tournament/page.tsx:193` |

Web-app CTAs (`web_app_click`):
| Slug | Site |
|---|---|
| `home_fold_webapp` | `app/page.tsx:311` (`btn btn-fold`) |
| `features_hero_webapp` | `app/features/page.tsx:77` (`btn btn-hero`) |
| `adhd_hero_webapp` | `app/adhd-golf/page.tsx:159` (`btn btn-hero`) |
| `tournament_webapp` | `app/tournament/page.tsx:194` |

Notes:
- `components/StoreBadges.tsx` is reused on both the homepage and `/download/`, so it must accept a `ctaLocation` prop rather than hardcoding one (pass `home_hero_badge_appstore` vs `download_badge_appstore` from each caller).
- `components/WaitlistSection.tsx:35` also has an App Store button, but the waitlist section is pre-launch legacy — **confirm whether it still renders anywhere** before wiring it. If it's dead, skip it and note it.
- **Reserved for a later task (do not add now):** the `/golf-stroke-counter/` rebuild will introduce `stroke_hero`, `stroke_demo`, `stroke_comparison`, `stroke_final`, `stroke_mobile_sticky`. Keep the taxonomy pattern extensible.

## 6. Files you'll likely touch

- **New:** `lib/analytics.ts`, `components/TrackedCta.tsx`, `components/GuideEngagement.tsx`
- **Edit:** `components/StoreBadges.tsx` (accept `ctaLocation` prop, wrap Apple `<a>`), `components/Nav.tsx`, `app/page.tsx`, `app/download/page.tsx`, `app/features/page.tsx`, `app/adhd-golf/page.tsx`, `app/tournament/page.tsx`
- **Mount `GuideEngagement`:** `app/guides/adhd-and-golf-losing-count/page.tsx`, `app/guides/lost-count-of-strokes-what-to-do/page.tsx`, `app/adhd-golf/page.tsx`, `app/golf-stroke-counter/page.tsx`

## 7. Validation (run all; don't claim a pass you didn't run)

Baseline before you start (for comparison): **lint = 0 errors / 15 pre-existing warnings, `tsc --noEmit` clean, `next build` succeeds.**

1. `npm run lint` — no **new** errors (pre-existing warnings OK).
2. `npx tsc --noEmit` — clean.
3. `npm run build` — static export still succeeds.
4. **Runtime (dev):** `npm run dev`, then click each wired CTA and confirm in the browser Network tab a single GA `collect` request per click with `en=app_store_click`/`web_app_click` and the correct `ep.*` params — **no duplicates**. GA4 **DebugView** should show the events.
5. `guide_engaged`: scroll past 50% and wait 60s on a guide page; confirm it fires exactly once.

## 8. Deliverables (report back to Jared)

1. List of changed/created files.
2. The final event schema and the exact `cta_location` slugs used.
3. Console/Network proof (screenshot) of each event firing once with correct params.
4. Confirmation the build stayed green (with the commands you ran).
5. **Manual GA4 steps only Jared can do:** (a) mark `app_store_click` as a **key event** in GA4 Admin → Events; (b) link **Search Console** to the correct GA4 web stream if not already linked.
6. Anything you skipped (e.g. the WaitlistSection button) and why.

## 9. Out of scope (do not do)

- No deploys, no `main` commits.
- No GA4 admin changes (that's Jared's manual step).
- No copy rewrites, no page restructuring, no mobile-app changes.
- No new analytics vendors, no consent-banner build.
