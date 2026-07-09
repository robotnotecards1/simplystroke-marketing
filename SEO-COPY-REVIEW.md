# SEO Copy Review — brand/voice pass on SEO-HANDOFF.md

Reviewed the title tags & meta descriptions in the repo's `SEO-HANDOFF.md` against the SimplyStroke brand voice (confident, minimal, playful) and the pre-launch rules (app is **Coming soon / launching 2026**, waitlist framing, no availability claims). Strategy and keyword clusters are strong and unchanged. Two things to fix before implementing.

## 1. Availability framing contradicts pre-launch status (must fix)
Several metas describe a live, downloadable product. Pre-launch there is nothing to download or "try" yet — this misleads searchers and breaks the "join the waitlist" promise everywhere else on the site.

**Homepage `/` meta** — drop "Free to try."
- Before: `…built for ADHD golfers and anyone who forgets. Free to try.`
- After: `One tap counts your strokes — no math, no menus, no losing count mid-hole. The golf scorecard app built for ADHD golfers and anyone who forgets. Coming 2026 — join the waitlist.`

**`/download`** — until launch this is a waitlist/notify page, not a download page. Keep the URL (it's a good keyword target) but reframe the copy; swap to real store-link copy on launch day.
- Title before: `Download SimplyStroke — Free Golf Stroke Counter App`
- Title after: `Get SimplyStroke — Free Golf Stroke Counter App (2026)`
- Meta after: `SimplyStroke is a free, one-tap golf stroke counter for iPhone, Android and Apple Watch, launching 2026. Join the waitlist and we'll tell you the moment it's live.`

(`/features`, `/adhd-golf` metas are fine as-is — they describe capability, not availability.)

## 2. ADHD tone — good, one small softening
The ADHD copy is on-brand: playful, never clinical ("ADHD brains have other plans", "anyone who forgets" are exactly right). One phrase leans faintly toward deficit framing:

**`/blog/adhd-and-golf-losing-count` meta** — "struggle with stroke counting" → keep the "it's the app's fault, not yours" angle the same sentence already sets up.
- Before: `…Here's why ADHD brains struggle with stroke counting — and what actually helps.`
- After: `…Here's why ADHD brains lose the count mid-round — and what actually helps.`

## Everything else: keep
- Positioning (own "ADHD golf app", treat "shot tracking" as long-tail only) — correct and well-argued.
- Disambiguation from the existing **SimpleStroke** app by leading with the ADHD hook — smart, keep it.
- OG image = Active Round screen on brand green — good; that screen is the strongest single visual.
- `SoftwareApplication` JSON-LD, sitemap/robots, flat URLs — all fine.

## Note for launch
Do a find-and-replace pass at launch to flip every "coming 2026 / join the waitlist" phrase to live download CTAs, and add the real App Store / Play Store URLs to the store badges and `/download`.
