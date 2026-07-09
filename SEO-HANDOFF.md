# SimplyStroke — SEO Handoff for Claude Code

## 1. Positioning call (read this before touching title tags)

SimplyStroke should rank as a **golf stroke counter / scorecard app**, not a **shot tracking app**. Those are different categories with different competitors:

- "Shot tracking app" / "strokes gained app" is owned by GPS + hardware analytics platforms — Arccos, Shot Scope, 18Birdies, Golf Pad, mScorecard. Big budgets, hardware tie-ins, a completely different value prop (performance analytics vs. simple counting). Going after this phrase as a primary target means competing head-on with 2M+ monthly-user incumbents.
- "Golf stroke counter app" / "golf scorecard app" is a much smaller, thinner field: Stroke Counter for Golf, Golf Strokes Scorecard, Stroke Keeper, Easy Stroke Counter, EasyStroke Golf Scorecard, Golf Counter - StrokeTap. Mostly single-developer App Store listings, no real content marketing or SEO presence.
- **Nobody in either category owns an ADHD angle.** Searched directly — no dedicated ADHD golf app exists. This is the actual wedge: SimplyStroke can own "ADHD golf app" / "golf app for ADHD" outright with almost no competition, rather than fighting for scraps of "shot tracking."

**Name collision to watch:** there's an existing Apple Watch app called **SimpleStroke** (different spelling, same category — plastic-clicker replacement) and **EasyStroke Golf Scorecard**. Titles and meta descriptions need to work hard to disambiguate "SimplyStroke" from "SimpleStroke" — lead with the ADHD hook, not just the name, so search results don't blur together.

**Recommendation:** primary keyword target = stroke counting + ADHD. Treat "shot tracking app" as a secondary/long-tail term only (people do search it loosely to mean "an app that tracks my strokes"), never the h1 or title tag anchor.

## 2. Keyword clusters (6 Circles)

**Pillar: golf stroke counter app for ADHD golfers**

Sub-cluster A — ADHD & golf (the wedge, low competition, own this)
1. ADHD golf app → homepage / dedicated `/adhd-golf` page
2. golf app for ADHD → same page, secondary phrasing
3. how ADHD affects your golf score → blog post

Sub-cluster B — stroke counting & scorecard (core category, thin competition)
4. golf stroke counter app → homepage
5. simple golf scorecard app → `/features`
6. free golf counter app no subscription → `/download`

Sub-cluster C — shot/score tracking (adjacent, high competition — long-tail only, never primary)
7. golf shot tracking app → mention once on `/features`, do not title-tag this
8. golf score tracker app → secondary phrase on homepage
9. one tap golf score app → supporting phrase in body copy, not a title target

## 3. Prioritized targets

| Priority | Page | Primary keyword | Secondary keywords | Competition | Why |
|---|---|---|---|---|---|
| 1 | Homepage `/` | golf stroke counter app | ADHD golf app, one-tap golf scoring | Low-Med | Core value prop + the wedge, both in one page |
| 2 | `/adhd-golf` (new page) | ADHD golf app | golf app for ADHD, losing count golf | Very low | Zero direct competitors found — quick win |
| 3 | `/features` | simple golf scorecard app | golf shot tracking app, undo golf score | Low-Med | Captures loose "shot tracking" searchers without over-indexing on it |
| 4 | `/download` | free golf stroke counter app | download golf app iOS Android | Low | Conversion page, not a discovery page — keep it simple |
| 5 | `/blog/adhd-and-golf-losing-count` | ADHD and golf | golf and forgetfulness, focus and golf | Very low | Supporting content, internally links to `/adhd-golf` |

## 4. Title tags & meta descriptions (ready to implement)

**Homepage `/`**
- Title (58 chars): `SimplyStroke: The Golf Stroke Counter App for ADHD Golfers`
- Meta (157 chars): `One tap counts your strokes — no math, no menus, no losing count mid-hole. The golf scorecard app built for ADHD golfers and anyone who forgets. Free to try.`

**`/adhd-golf`** (dedicated page — see note below)
- Title (54 chars): `ADHD and Golf: Why You Keep Losing Count (and the Fix)`
- Meta (152 chars): `Golf asks you to remember a number while doing ten other things. ADHD brains have other plans. See how SimplyStroke counts strokes so you don't have to.`

**`/features`**
- Title (58 chars): `SimplyStroke Features: One-Tap Scoring, Undo, Offline Golf`
- Meta (155 chars): `Every SimplyStroke feature, from the one-tap stroke counter to instant shareable scorecards. No subscriptions, no GPS clutter — just simple score tracking.`

**`/download`**
- Title (52 chars): `Download SimplyStroke — Free Golf Stroke Counter App`
- Meta (141 chars): `Get SimplyStroke free on iOS and Android. Tap to count strokes, undo mistakes instantly, and get a clean scorecard at the end of every round.`

**`/blog/adhd-and-golf-losing-count`**
- Title (49 chars): `ADHD and Golf: How to Stop Losing Count Mid-Round`
- Meta (157 chars): `Losing track of your score isn't a focus problem, it's a golf design problem. Here's why ADHD brains struggle with stroke counting — and what actually helps.`

**Note on `/adhd-golf` as a standalone page:** the ADHD content fold already written for the homepage should stay on the homepage — it's doing brand/conversion work there. But "ADHD golf app" has real, uncontested search demand, and a fold buried mid-homepage won't rank as well as a dedicated page can. Recommend Claude Code scaffold a real `/adhd-golf` page that expands on the fold copy (more detail, maybe an FAQ block), with the homepage fold linking to it via a "Read more" CTA. Cheap to build, meaningfully better for organic reach.

## 5. Technical implementation notes for Claude Code

**Stack context:** current repo is Expo Router (React Native for web, static export via `expo export --platform web`). This is fine for the app itself, but React Native Web ships a heavier JS bundle and has weaker out-of-the-box per-route metadata support than a normal static site — worth confirming whether the marketing site is being built inside this same Expo project or as a separate static/Next.js site. If it's separate (recommended for SEO), ignore the Expo-specific note below.

- **If inside Expo Router:** use `expo-router/head` to set per-route `<Head>` title/meta tags on each route file (`app/adhd-golf.tsx`, etc.). Verify tags actually render in the static HTML output (`dist/`), not just client-side — React Native Web can inject head tags after hydration, which crawlers may miss. Check rendered HTML directly.
- **If a separate static site:** standard `<title>` / `<meta name="description">` per page, no special handling needed.
- **Open Graph / Twitter cards:** every page needs `og:title`, `og:description`, `og:image` (use a screenshot of the Active Round screen or the logo on brand green), `twitter:card=summary_large_image`.
- **Structured data:** add `SoftwareApplication` JSON-LD on the homepage and `/download` (name, applicationCategory: SportsApplication, operatingSystem, offers/price: free).
- **Sitemap & robots:** generate `sitemap.xml` covering all 5 pages above, plus `robots.txt` allowing full crawl.
- **URL structure:** keep it flat — `/adhd-golf`, `/features`, `/download`, `/blog/[slug]`. No unnecessary nesting.
- **Image alt text:** tie alt text to the keyword clusters where genuinely descriptive — e.g. hero screenshot alt = "SimplyStroke golf stroke counter app showing the one-tap scoring screen," ADHD fold image alt referencing "ADHD golf app." Don't keyword-stuff decorative icons.
- **Performance:** Core Web Vitals matter for ranking — RN-web bundles can be large. Flag to Claude Code: confirm the marketing site isn't shipping the whole app's JS (auth, Supabase client, round-tracking logic) just to render a static homepage. If it's the same Expo bundle, that's a real risk worth checking with a Lighthouse pass before launch.

## 6. Next steps checklist

- [ ] Confirm marketing site build target (same Expo project vs. separate static site) before implementing head tags
- [ ] Implement title/meta pairs above on all 5 pages
- [ ] Scaffold `/adhd-golf` as its own indexable page, linked from the homepage fold
- [ ] Add OG/Twitter tags + SoftwareApplication schema
- [ ] Generate sitemap.xml + robots.txt
- [ ] Run Lighthouse/PageSpeed check, confirm no unused app JS is shipping to the marketing pages
- [ ] Write the `/blog/adhd-and-golf-losing-count` post (quick win, near-zero competition)

Sources referenced for competitive/keyword research:
- [Best Golf Shot Tracking Apps And Devices 2026 – Golf Monthly](https://www.golfmonthly.com/best-golf-deals/best-golf-shot-tracking-apps-and-devices-213502)
- [8 Best Strokes Gained Apps for Amateur Golfers](https://www.thediygolfer.com/roundups/best-strokes-gained-app)
- [Stroke Counter for Golf - App Store](https://apps.apple.com/us/app/stroke-counter-for-golf/id6751548616)
- [Golf Strokes Scorecard - App Store](https://apps.apple.com/us/app/golf-strokes-scorecard/id1492642824)
- [Stroke Keeper - App Store](https://apps.apple.com/us/app/stroke-keeper/id991591234)
- [Easy Stroke Counter - App Store](https://apps.apple.com/us/app/easy-stroke-counter/id6695752911)
- [SimpleStroke for iPhone - Softonic](https://simplestroke.en.softonic.com/iphone)
- [Golf & Mini-Golf Scorecard App (EasyStroke) - App Store](https://apps.apple.com/us/app/easystroke-golf-scorecard/id1484755764)
- [ADHD and Golf: Strategies for Success - Neurolaunch](https://neurolaunch.com/adhd-and-golf/)
- [ADHD & Golf! - MyGolfSpy Forum](https://forum.mygolfspy.com/topic/61798-adhd-golf/)
