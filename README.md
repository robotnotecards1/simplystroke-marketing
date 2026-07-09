# Handoff: SimplyStroke Marketing Home Page

> **Also see `SEO-HANDOFF.md`** in this repo for title tags, meta descriptions, keyword strategy, and technical SEO notes (schema, sitemap, OG tags) to implement alongside this design.

## Overview
Marketing / pre-launch landing page for **SimplyStroke**, a one-tap golf scoring app ("No counting. No math. No stress. Just Stroke."). The page introduces the product, shows the app UI in a phone mockup, explains the value prop, includes an ADHD-focused section, and drives users to a waitlist. App is "Coming soon" (launching 2026).

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing intended look and behavior, not production code to ship directly. The `.dc.html` file is authored in a custom "Design Component" format (inline styles, a small template runtime); **do not copy it verbatim**. The task is to **recreate this design in the target codebase's environment** (React/Next, Vue, plain HTML/CSS, etc.) using its established patterns. If no front-end exists yet, pick an appropriate framework and implement there.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and layout are specified below and should be matched closely. Recreate pixel-close using the codebase's own component/styling conventions.

## Sections (top to bottom)

### 1. Sticky Nav
- Full-width, `position: sticky; top:0`, translucent off-white background `rgba(250,250,248,0.85)` with `backdrop-filter: blur(14px)`, bottom border `rgba(27,67,50,0.1)`.
- Inner container: `max-width:1200px; margin:0 auto; padding:0 clamp(20px,5vw,64px)`, flex space-between. **Logo left edge must align with hero copy left edge** (same container + padding as hero).
- Left: SimplyStroke logo (`assets/logo-color.png`, transparent PNG), `height:70px`.
- Right: text links "Features", "Apple Watch", "Screens" (15px, weight 600, color `#1A1A1A`) + green CTA button "Get notified" (bg `#96C41E`, text `#1B4332`, weight 700, padding 11px 22px).

### 2. Hero (deep green)
- Background: linear-gradient(165deg, `#1B4332` 0%, `#2D6A4F` 62%, `#40916C` 130%). Two soft radial blobs (lime + white) as decoration.
- Container `max-width:1200px`, flex-wrap, `gap:clamp(32px,5vw,64px)`, vertical padding `clamp(44px,6vw,80px)`.
- **Left column** (flex 1 1 420px):
  - "COMING SOON" pill: lime-tinted bg `rgba(150,196,30,0.14)`, border `rgba(150,196,30,0.4)`, text `#C7E77A`, uppercase 13px/700, leading dot `#96C41E`.
  - H1 (Bebas Neue, weight 400, `clamp(54px,7.4vw,108px)`, line-height 0.9): "No counting. / No math. / No stress. / **Just Stroke.**" — "Just Stroke." in `#96C41E`, rest `#FAFAF8`.
  - Body p (`clamp(17px,1.5vw,20px)`, line-height 1.55, `rgba(255,255,255,0.82)`, max-width 520px).
  - Two "coming soon" store badges (App Store / Google Play): translucent bg `rgba(255,255,255,0.06)`, border `rgba(255,255,255,0.16)`, small label + bold store name, inline SVG glyphs.
  - "Join the waitlist →" lime text link + "Launching 2026 · Works fully offline".
- **Right column** — phone mockup of the app (see App UI Mockup below).

### App UI Mockup (inside hero phone)
Recreates the actual product screen:
- Top bar: "HOLE 7 / 18" + "Edit" chip.
- Sub-bar (`#2D6A4F`): PAR 4 · progress dots (6 lime filled, 1 white current, rest faded) · TOTAL 38.
- Score banner (`#1B4332`): big "+2" in coral `#FF6B6B`, "OVER PAR" caption.
- **Main tap target**: golf-ball button — radial white gradient `#ffffff→#E9ECE4`, dimple pattern (radial-gradient dots), pulsing lime ring animation. Center shows big number **3** (Bebas Neue, `#1B4332`), "STROKES" label, and a dark pill "HITTING 4" (bg `#1B4332`, "4" in `#96C41E`). Caption "Tap the ball to count a stroke".
- Footer buttons: "↶ Undo" (outline) + "Next hole →" (green gradient `#2D6A4F→#40916C`).

### 3. Problem / Promise (white)
- `max-width:1000px`, centered text, vertical padding `clamp(64px,8vw,110px)`.
- Eyebrow "THE PROBLEM WITH GOLF APPS" (13px/700, `#96C41E`), Bebas Neue H2 (`clamp(38px,5vw,68px)`, `#1B4332`).

### 4. Feature cards (white, 3-up)
- Three cards, each: white bg, 1px border `rgba(27,67,50,0.1)`, **4px top border `#96C41E`**, padding 28px 26px, subtle shadow. Big Bebas Neue number in `#96C41E`, bold title `#1B4332`, gray body `#6B7280`.
  - 1 "Tap the ball" · 2 "Next hole" · 3 "Get your card".

### 5. ADHD Fold (warm cream) — the distinctive section
- Full-width background **`#F4EFE4`** (warm paper cream) to separate from deep-green hero and white sections. Text color `#1B4332`. *(Was pale-lime `#E8F5C8`; changed to warm cream per client.)*
- **Two-column grid**: `grid-template-columns: repeat(auto-fit, minmax(340px,1fr)); gap:clamp(36px,5vw,80px); align-items:center` inside `max-width:1200px`. Collapses to one column on narrow screens.
- **Left column**:
  - Pill "FOR THE BEAUTIFULLY DISTRACTIBLE" (bg `rgba(27,67,50,0.08)`, dot `#96C41E`, text `#2D6A4F`).
  - Bebas Neue H2 (`clamp(46px,7vw,104px)`, line-height 0.9): "Wait… was that four shots or five?" (no forced line break — wraps naturally).
  - Body (DM Sans, `clamp(17px,1.6vw,22px)`, line-height 1.7, `#2D6A4F`): cheeky ADHD tangent copy — "If you've ever striped a lovely approach, started thinking about that one time in 2019 you almost made a hole-in-one, wondered whether you left the garage door open, and then arrived at the green with absolutely no idea what you're lying — this app was built for your brain. SimplyStroke holds the number so your head is free to wander. Tap, forget, move on. That's the whole trick."
  - CTA button "Let the app remember →" (bg `#96C41E`, text `#1B4332`, weight 700, padding 15px 30px).
- **Right column**: three "relatable moment" cards, loose stacked list (NOT feature-grid tiles). Each: solid white bg `#FFFFFF`, 1px border `rgba(27,67,50,0.08)`, soft shadow `0 2px 14px rgba(27,67,50,0.06)`, padding 22px 26px, flex row with a **56px lime `#96C41E` icon tile** holding a golf-set glyph (fill `#1B4332`) + bold-ish line (`clamp(16px,1.5vw,20px)`, weight 600). Icons come from the purchased golf SVG set (hole/green, scorecard, golf-ball-in-target) — matching the main feature icons, not the old doodle style. Copy:
  1. "You get to the green and genuinely cannot remember if this is your third or fourth stroke. Every. Single. Time."
  2. "The scorecard pencil is a tiny, boring commitment device. You will not use it. Be honest."
  3. "One giant button on the screen means there's nothing else to poke, tweak, or wander off into mid-round."
- **Tone rule (important):** warm and funny, poking fun at forgetfulness itself — never at ADHD as a condition, never clinical, never "disorder" framing. Reads like an inside joke with the reader.

### 6. App-screens strip ("A peek inside", white) `#screens`
- Eyebrow "A PEEK INSIDE", Bebas Neue H2 "A few taps, start to finish."
- Four uniform phone mockups (264px wide) in a centered wrapping flex row, left→right with captions:
  1. **Home** — caption "Start Your Round" / "Start a round in one tap". Static screenshot (`assets/app-screens/home.png`). "Good morning, Ryan" + stat tiles + START NEW ROUND.
  2. **Pick a course** — caption "Find your course". Static screenshot. Search + nearby course list.
  3. **Active round** — caption "Active round" / "The only screen that matters". **This one is a LIVE, animated HTML phone (not a screenshot).** It auto-plays a tap loop (~1.7s): a lime ripple ring (`@keyframes ssRipple`) expands from *behind* the golf ball, a press dot flashes, and the STROKES number pops (`@keyframes ssPop`) and increments; ROUND TOTAL and the bottom scorecard progress chip stay in sync. Ball has a radial-gradient dimple texture. In production, the tap is user-driven; here it's an autonomous demo loop driven by the logic class (`setInterval`).
  4. **Scorecard** — caption. Static screenshot. "Round complete" 86 / +14, per-hole color-coded chips, Share/Save.
- Static screens are PNGs in `assets/app-screens/`; the active-round screen is hand-built HTML/CSS in the source — recreate it as a real component with the same animation.

### 6b. Cinematic band (between ADHD fold and screens strip)
- Full-bleed section, `min-height: clamp(320px,42vw,520px)`, a golf photograph (`assets/photos/`) as background with a dark green radial/linear overlay for legibility. Centered white Bebas Neue statement headline ("BE HERE…" style) — a visual breather between content blocks.

### 7. Photo backgrounds
Several sections use real golf photography from `assets/photos/` as backgrounds behind a translucent green gradient overlay (reduced-opacity image so text stays legible): the **hero** (player at address), the **cinematic band** (sunset silhouette), and accent areas in the ADHD fold. Recreate with a background image + a green gradient overlay layer.

### 8. Additional sections
Apple Watch, final CTA / waitlist, and footer (footer uses white logo `assets/logo-white.png` on dark bg). Match the same palette and type system.

## Interactions & Behavior
- **Hero** golf-ball tap target: continuous pulsing ring (`@keyframes ssPulse`, ~2.4s ease-out infinite). Static at 3 / HITTING 4 in the mock.
- **Screens strip → Active round phone**: autonomous tap-loop animation (see §6.3). Ripple ring `@keyframes ssRipple` behind ball, number pop `@keyframes ssPop`, driven by a `setInterval` in the logic class that increments strokes and updates total + scorecard chip. In production this is user tap-driven.
- Nav is sticky. Anchor links jump to `#features`, `#watch`, `#screens`, `#waitlist`, `#top`.
- Responsive: hero and ADHD fold collapse from two columns to one on narrow viewports (flex-wrap / auto-fit grid).

## Design Tokens
Colors:
- Deep green (primary dark): `#1B4332`
- Mid green: `#2D6A4F`
- Green (light accent): `#40916C`
- Brand lime (CTA / accent): `#96C41E`
- Lime tint text: `#C7E77A`
- Warm cream (ADHD fold bg): `#F4EFE4`
- Off-white page/nav bg: `#FAFAF8` / `rgba(250,250,248,0.85)`
- Coral (over-par): `#FF6B6B`
- Body gray: `#6B7280`
- Near-black text: `#1A1A1A`

Typography:
- Display / headlines: **Bebas Neue** (weight 400, tight line-heights ~0.9)
- Body / UI: **DM Sans**

Spacing: fluid `clamp()` throughout; section vertical padding ~`clamp(64px,8vw,110-120px)`; container `max-width:1200px` with horizontal padding `clamp(20px,5vw,64px)`.

## Assets
- `assets/logo-color.png` — SimplyStroke wordmark, black script + lime dot, **transparent background**, cropped to artwork (~1675×486). Used in nav at 70px height.
- `assets/logo-white.png` — white version for the dark footer.
- All icons (store badges, feature icons, ADHD-fold golf glyphs, golf ball) are inline SVG in the source — reference the HTML for exact paths, or redraw with the codebase's icon system. The golf glyphs come from a purchased professional golf SVG set (currentColor / single-fill).
- `assets/photos/` — **golf photography library (10 JPGs)** to draw from when adding real imagery (hero, ADHD fold, feature/lifestyle sections). Course, putting, swing, and macro golf-ball shots. Filenames are original upload IDs (`3242.jpg`, `green.jpg`, `golfball2.jpg`, etc.) — not yet placed in the layout; use as source material. Keep all of these in the build.

## Open / TODO
- App screen illustrations now cover: **Course selection, Home, Active round (scoring), Scorecard** (in the "A peek inside" strip, `#screens`). Additional screens (settings, round history/detail) could still be designed in the same phone-frame style and palette if needed.
- ADHD-fold body copy updated to a cheekier ADHD-tangent joke (2019 near-ace → garage door → arriving at the green clueless).

## Files
- `SimplyStroke Home.dc.html` — the full design (all sections). Authored in Design Component format; treat as reference, not shippable code.
- `assets/` — logo PNGs, `photos/` (golf photography), and `icon-library/` (purchased golf SVG/PNG icon sets: golf-country-club, golf-and-sports-a/b, golf-line-set). Feature-card glyphs are inlined from the golf-country-club set (single-fill, currentColor-style).
