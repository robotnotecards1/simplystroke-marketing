# SimplyStroke Site Audit

**Date:** July 11, 2026
**Scope:** simplystroke.app — design, copy, SEO, em-dash sweep, hero title options
**Status:** Report only. No files changed.

---

## 1. The headline problem

Your H1 is the weakest sentence on the site:

> **Master your round, effortlessly.**

Three things wrong with it:

1. **It doesn't say what the app is.** No "golf." No "score." No "stroke." A stranger who lands here from a Reddit link has to read the subhead and study the phone mock to figure out what they're looking at. Google and the LLMs have the same problem, and they're less patient.
2. **"Master your round" promises the wrong thing.** SimplyStroke does not improve your golf. It counts your strokes. The headline writes a check the product doesn't cash, which is a trust leak on a pre-launch page whose only job is to win an email.
3. **"Effortlessly" is an adverb doing a noun's job.** It's the exact word every app on the App Store uses.

Meanwhile, the best line on the entire site is buried in a decorative band two-thirds of the way down:

> **Keep your head in the round. We'll keep the count.**

That's the product, the benefit, and the voice, in nine words. It's sitting where nobody who bounces will ever read it.

**The core recommendation of this audit:** your H1 should carry the category (so Google and a stranger both get it in two seconds) and your subhead should carry the pain. Right now you have it backwards.

---

## 2. Hero titles, ranked

Ten options across the three angles you asked for. Ranked by what I'd actually ship.

### Tier 1 — ship one of these

**1. Golf's simplest scorecard. One tap per swing.**
*Angle: clarity.* Says the category, the mechanic, and the differentiator. "Golf's simplest scorecard" is a claim you can defend. Works as a title tag nearly verbatim. Unsexy and correct, which is what a pre-launch hero should be.

**2. Keep your head in the round. We'll keep the count.**
*Angle: pain + clarity.* You already wrote this. Promote it. It says what the app does without naming a feature, and "keep the count" tells anyone who's ever lost count exactly who this is for. Weakness: no "golf" or "scorecard" in it, so pair it with an eyebrow (`THE ONE-TAP GOLF SCORECARD`) to feed the crawlers.

**3. Was that your third or your fourth?**
*Angle: pain.* The single most-qualified visitor on your site is the person who reads this and feels called out. It's also the exact phrasing people type into Google and Reddit. Weakness: a question H1 is a gamble, and it says nothing to a golfer who *doesn't* have the problem. Highest ceiling, lowest floor.

### Tier 2 — strong, more specific

**4. One tap. That's the whole scorecard.**
*Clarity.* Tightest expression of the product. The second sentence does the work of a subhead.

**5. Stop counting. Start playing.**
*Pain.* Clean, classic construction. Slightly generic, but it beats "master your round" by a mile and it reads well over a photograph.

**6. The golf app that remembers so you don't have to.**
*ADHD.* Names the benefit in ADHD language without excluding anyone. This is the best of the ADHD-leaning options because it doesn't require the visitor to self-identify before it makes sense.

**7. Your brain has better things to hold.**
*ADHD.* You're already using this as the /adhd-golf waitlist heading, and it's excellent. As a homepage H1 it narrows the funnel hard. If ADHD golfers are your beachhead and you're fine with that, this is the one.

### Tier 3 — good lines, wrong job

**8. Never lose count again.** — clear, but the negative framing makes the product sound like a fix rather than a joy.
**9. The scorecard that fills itself in.** — nice, but it's a feature, not a hook.
**10. Golf, minus the arithmetic.** — charming; too clever for the top of a page where clarity pays.

### What I'd actually do

Combine, and use the whole hero as one unit rather than making the H1 carry everything:

```
EYEBROW:   The one-tap golf scorecard
H1:        Keep your head in the round.
           We'll keep the count.
SUBHEAD:   One giant button counts every stroke. The scorecard does its
           own math. No menus, no ads, no wondering whether that was your
           third or your fourth.
CTA:       Join the waitlist →     Launching 2026
```

This gets the category into the eyebrow (crawlable, scannable), the emotional hook into the H1, and the pain into the subhead where it belongs. It also lets you retire the "secret caddy" line, which I'd do regardless (see §4).

---

## 3. Em-dash sweep

**32 user-facing em dashes** across 6 files (plus 8 more in code comments, which are fine to leave). Every one of them is a tell. Here's the full list with replacements.

### `app/page.tsx` (13)

| Line | Current | Replace with |
|---|---|---|
| 19, 24 | `SimplyStroke — The One-Tap Golf Scorecard App` | `SimplyStroke: The One-Tap Golf Scorecard App` (or restructure per §5) |
| 21, 25 | `One tap counts your strokes — no math...Coming 2026 — join the waitlist.` | `One tap counts your strokes. No math, no menus, no losing count mid-hole. Built for ADHD golfers and anyone who forgets. Join the waitlist for 2026.` |
| 55 | `No mid-fairway brain freezes — just tap, walk, repeat.` | `No mid-fairway brain freezes. Tap, walk, repeat.` |
| 76 | `than a rogue cart on the fairway — menus, handicaps, GPS overlays, ads, sign-ups.` | `than a rogue cart on the fairway. Menus, handicaps, GPS overlays, ads, sign-ups.` |
| 108 | `No adding, no remembering — your head stays on the next shot.` | `No adding, no remembering. Your head stays on the next shot.` |
| 118 | `with the math already done — ready to share` | `with the math already done, ready to share` |
| 139 | `Tap, forget, move on — your focus stays where it belongs: the next shot.` | `Tap, forget, move on. Your focus stays where it belongs: the next shot.` |
| 170 | `a noble effort — but be honest, it never makes it` | `a noble effort. Be honest though: it never makes it` |
| 214 | `no mis-taps — even with a glove on.` | `no mis-taps, even with a glove on.` |
| 350 | `Or skip it and just count — your call` | `Or skip it and just count. Your call.` |
| 377 | `Every hole, math done — pure and simple` | `Every hole, math done` |

### `app/adhd-golf/page.tsx` (9)

| Line | Fix |
|---|---|
| 26 | `"Yes — SimplyStroke is..."` → `"Yes. SimplyStroke is..."` |
| 30 | `It's a design problem, not a discipline problem — the fix is moving...` → `It's a design problem, not a discipline problem. The fix is moving...` |
| 75 | `hands you a finished scorecard — so your head is free...` → `hands you a finished scorecard, so your head is free...` |
| 95 | `hit again — and the whole time, silently increment` → `hit again. And the whole time, silently increment` |
| 107 | `fails for the same reason — it's one more boring thing` → `fails for the same reason: it's one more boring thing` |
| 122 | `Swing, tap, done — the app holds your stroke count` → `Swing, tap, done. The app holds your stroke count` |
| 132 | `without looking — or from your wrist on Apple Watch.` → `without looking, or from your wrist on Apple Watch.` |
| 142 | `colour-coded holes — math already done.` → `color-coded holes, math already done.` |
| 181 | `Read: ADHD and golf — how to stop losing count` → `Read: ADHD and golf, and how to stop losing count` |

### `app/blog/adhd-and-golf-losing-count/page.tsx` (11)

Same treatment throughout. The two that matter most, because they're in the metadata and get quoted by search engines and LLMs:

- Lines 8, 12, 23 (description ×3): `...lose the count mid-round — and what actually helps.` → `...lose the count mid-round, and what actually helps.`
- Line 167 (the callout, your most quotable line): `You were never supposed to be the scorekeeper — your job is the shot.` → `You were never supposed to be the scorekeeper. Your job is the shot.`

The rest (59, 83, 89, 112, 122, 143, 174) all resolve to either a period or a colon.

### `app/features/page.tsx` (5), `app/download/page.tsx` (2), `app/layout.tsx` (2 user-facing), `components/` (3)

| File | Fix |
|---|---|
| features 17, 21 | `no GPS clutter — just simple score tracking` → `no GPS clutter. Just simple score tracking.` |
| features 30 | `no mis-taps mid-swing — tap it with a glove on` → `no mis-taps mid-swing. Tap it with a glove on` |
| features 40 | `just as quick — no menu spelunking.` → `just as quick. No menu spelunking.` |
| features 71 | `searching for a golf shot tracking app — but there's no GPS hardware` → `searching for a golf shot tracking app, but there's no GPS hardware` |
| download 10, 15 | `Get SimplyStroke — Free Golf Stroke Counter App (2026)` → `Get SimplyStroke: Free Golf Stroke Counter App (2026)` |
| layout 22, 24 | Same fixes as page.tsx metadata |
| WaitlistForm 69 | `that didn't go through — try again in a minute.` → `that didn't go through. Try again in a minute.` |
| WaitlistSection 20 | `just one message — we respect your inbox as much as your swing.` | `just one message. We respect your inbox as much as your swing.` |

One thing worth knowing: `·` (middle dot) appears in "Launching 2026 · iPhone · Android · Apple Watch" and the pills. That's a different character and it's fine. Leave it.

---

## 4. Other AI-writing tells and copy problems

The em dashes are the obvious symptom. These are the ones underneath.

**The rule of three is a tic.** You use it constantly:
- "No counting. No math. No stress."
- "no menus, no upsells, no distractions"
- "No fumbling, no squinting, no mis-taps"
- "Tap, forget, move on"
- "Open it, count your round, close it"
- "no ads, no feeds, no menus"

Any one of these lands. Six of them on one page reads like a template. Cut half of them to two items. Two beats three, and it also sounds more like a person.

**"We've all been there."** Textbook throat-clearing. Delete the sentence; the paragraph starts fine without it.

**"more distracting than a rogue cart on the fairway."** Strained. Cut the simile, keep the list.

**"Seamless progression."** This is a step title on your homepage and it means nothing. All three step titles should be verbs describing what *you* do: *Tap the ball* / *Keep walking* / *Get your card*. "Tap with confidence" and "Instant scorecard" have the same problem in milder form.

**"You'll wonder how you played without it."** and **"your partners will wonder if you've got a secret caddy."** Both are advertising puffery, and the caddy line implies you're now scoring better, which the app doesn't do. Cut both. The secret-caddy sentence is the single line I'd remove first, because it's the second thing anyone reads.

**"Everything you need. Nothing you don't."** One of the most-used lines in software marketing. Suggest: *Four things. That's the app.* Or just delete the H2 and let the four cards speak.

**Adverbs to kill:** "genuinely unsure," "truly matters," "seamlessly," "effortlessly," "absolutely no idea," "famously limited," "quietly asks."

**British vs. American spelling.** You write "colour-coded" (three places) but your app screenshots show courses in Huntersville and Cornelius, NC, and you're launching on the US App Store. Pick American. Also "muni" in the features copy is US golf slang, so you've already half-committed.

**"Launching 2026" is doing you no favors.** It's twelve months wide. A waitlist converts on urgency, and "Launching 2026" reads as "someday." If you can commit to a quarter, say *Spring 2026* or *Q1 2026*. If you can't, at least try *Launching early 2026*.

---

## 5. SEO

**The H1 is your biggest on-page miss.** "Master your round, effortlessly" contains none of your target keywords. Google weights the H1 heavily, and AI answer engines lean on it even harder when deciding what a page *is*. Fixing the hero (§2) fixes this for free.

**Title tag leads with a brand nobody's searching for.** Pre-launch, "SimplyStroke" has zero search volume. Lead with the category:

- Current: `SimplyStroke — The One-Tap Golf Scorecard App`
- Better: `Golf Stroke Counter & One-Tap Scorecard App | SimplyStroke`

**Add an FAQ block to the homepage.** You have FAQ schema on /adhd-golf and nothing on the page that actually ranks. An FAQ section on the homepage answering *"Is there a golf app that just counts strokes?"* / *"Do I need GPS or a subscription?"* / *"Does it work offline?"* is the single highest-leverage SEO addition available, and it's exactly the format ChatGPT and Perplexity quote from.

**Dead footer links.** Terms, Privacy, and Cookie Policy are all `href="#"`. Three problems: it looks unfinished, it costs you trust on the page where you're asking for an email, and you legally need a privacy policy to collect emails (GDPR) and to submit to the App Store and Play Store. Fix this before launch regardless of SEO.

**No /blog index.** The footer links to a blog post that has no parent. Add `/blog/` (even with one post) and put it in the sitemap.

**Sitemap `lastModified` is hardcoded** to 2026-07-08. Fine for now, but it'll go stale silently.

**LCP image isn't prioritized.** The hero background is a CSS `url()` on `.ss-hero`, so the browser doesn't discover it until CSS parses. Add a `<link rel="preload" as="image" href="/images/hero-bg.webp">` in the head. The app-screen PNGs use raw `<img>` rather than `next/image`, so they're unoptimized and unsized-hinted; they're below the fold so it's a minor hit, but converting them is cheap.

---

## 6. Design and UX

**The store badges are hurting you.** Two non-clickable "Coming soon: App Store / Google Play" badges sit *above* your only CTA, pushing "Join the waitlist" further down the fold and giving the eye two dead targets to land on first. On a page with exactly one conversion goal, this is self-sabotage. Move them below the CTA, shrink them, or cut them entirely.

**No social proof anywhere on the site.** Zero. A pre-launch waitlist page lives on it. Even *"Join 200+ golfers on the waitlist"* under the email field will move signup rate more than any copy change in this document. If the number's embarrassing, use something else: a quote from a beta tester, a line from Reddit, anything human.

**The nav is empty.** Every link is commented out, leaving only the CTA button. That kills internal linking from your highest-traffic page to /features/ and /adhd-golf/, and it means a visitor who wants more detail has to scroll to the footer. I'd restore at least Features and ADHD & Golf. (Noted the comment says this was a client request — flagging the cost, not overruling it.)

**Screens strip breaks at common laptop widths.** `.ss-screens-row` is `display: flex; flex-wrap: wrap` with four items. At ~1200–1400px it wraps 3-and-1, orphaning the scorecard phone on its own row. Fix with a grid: 4 columns at ≥1400px, 2 at tablet, 1 at mobile. Related: item 3 (`ActiveRoundPhone`) is a live component while items 1, 2, 4 are `<img>` frames, so it renders at a different height and the captions don't line up across the row.

**Sticky nav ghosting.** `.ss-nav` is `rgba(250,250,248,0.85)` with a backdrop blur. When a dark section scrolls under it, the headline behind bleeds through and the dark logo loses contrast. Make it opaque, or swap to a dark variant when over dark sections.

**The cinematic band has a lot of dead air** above and below two lines of text. Tighten the vertical padding by roughly a third.

### Golf errors in the app screenshots

Golfers will spot these instantly, and they undercut the whole "we understand golf" premise:

- **Home screen, Recent Rounds: `78` tagged `−6`.** On a par-72 course, 78 is **+6**. The sign is inverted. It also contradicts the stats directly above it (avg 84, best 78) — a −6 would be six under par, which is tour-level.
- **Scorecard screen: `44 / +8` labeled "18 holes."** 44 with +8 implies par 36, which is nine holes. Either the total or the label is wrong.
- **Course list, Birkdale Golf Club:** the course icon tile has the word "green" overflowing it, visible as a rendering artifact in the PNG.

These are baked into the PNG assets, so they need re-exporting from the app, not a code fix.

---

## 7. If you only do five things

1. **Rewrite the hero.** New H1 + eyebrow + subhead per §2. Kill the secret-caddy sentence.
2. **Fix the app screenshot golf math** (78 as −6, 44 over 18 holes). Credibility.
3. **Add social proof** to the waitlist form. A count, a quote, anything.
4. **Ship a real privacy policy** and kill the three `href="#"` footer links.
5. **Run the em-dash sweep** (§3) and cut half the rule-of-three constructions (§4).

The em dashes are the easiest fix on this list and the least important one. The headline is the hardest and the most important. Do that one first.
