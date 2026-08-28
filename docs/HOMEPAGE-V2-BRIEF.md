# SimplyStroke Homepage V2 Brief

*Status: Approved strategy; implemented on `codex/homepage-v2` for visual review*
*Last updated: August 28, 2026*

## Implementation Notes

- The first implementation preserves the existing metadata, canonical URL, brand colors, logo, and typography.
- The hero uses a stable representative product state; the interactive demo below it is the signature motion moment. This removes the two-video loop seam that made the previous device presentation flash and desynchronize.
- Public Watch copy intentionally excludes the upcoming HealthKit workout keep-alive and Double Tap additions until the reviewed native build is released.
- Group hosting is free during launch today. The future `hostGroup` Pro gate in the app still needs to be removed or revised separately to match the approved long-term growth strategy.
- The unrelated third-party StartupBar promotion was removed from the global layout because it competed with the homepage conversion path and displayed off-brand promotions above the navigation.

## Objective

Rebuild the homepage into one coherent conversion story that moves a recreational golfer from recognition—“I lose count”—to confidence—“this will stay out of my way”—to the App Store.

The page should feel substantially shorter, more intentional, and more premium without changing the SimplyStroke brand, logo, or color system.

## Primary Conversion

**Download SimplyStroke from the App Store and record a first stroke.**

The browser app is not a competing hero action. On desktop it may appear as a quiet “Sign in” or “View your rounds” link. On mobile it should be confined to the menu or footer.

## Audience

The primary visitor is a recreational golfer who wants to enjoy the round, keep pace, and stop mentally rehearsing the stroke count. He may play with the same friends, wear an Apple Watch, and carry his phone in a bag or cart. He is not shopping for a swing coach, GPS rangefinder, or data platform.

## Core Story

1. **Recognition:** Losing count is a normal consequence of golf asking too much of working memory.
2. **Promise:** One tap moves the number out of the golfer’s head.
3. **Demonstration:** The visitor experiences the core interaction immediately.
4. **Proof:** The Watch makes the behavior fit naturally into a round.
5. **Emotional payoff:** Attention returns to the shot, the game, and the group.
6. **Expansion:** The same simplicity works for a foursome.
7. **Trust:** Real reviews, explicit product boundaries, and clear answers remove doubt.
8. **Action:** Download before the next round.

## Structural Target

- Reduce the mobile page from roughly 15,700 pixels to approximately 7,500–9,000 pixels, subject to real-device QA.
- Replace the repeated four-cell, four-phone, divider, and six-card sequences with one product demonstration and one concise anti-complexity section.
- Move Apple Watch from the lower half into the first three substantive sections.
- Remove Tournament from the homepage.
- Do not use an equal-weight card grid as the default layout pattern.
- Use fewer background changes. Each transition should mark a new part of the story, not decorate it.

## Page Wireframe and Final Copy

### 0. Navigation

**Left:** SimplyStroke logo
**Desktop links:** How it works · Apple Watch · Play together · Guides
**Quiet utility link:** Sign in
**Primary action:** Download free

**Mobile:** Logo, Download icon/button, menu. Do not place “Play in browser” beside the App Store action.

---

### 1. Hero

**Eyebrow**

> FREE GOLF SCORECARD · IPHONE + APPLE WATCH

**H1**

> Golf’s simplest stroke counter.

**Body**

> Tap once after every shot. SimplyStroke keeps the count on your iPhone or Apple Watch so you can stop doing math and keep your head in the game.

**Primary CTA**

> Download free on the App Store

**Reassurance line**

> No account required to start · Solo rounds work offline

**Visual direction**

- Retain the existing branded hero atmosphere and device presentation.
- Replace the current phone/Watch synchronization logic with a single designed loop or two clips with identical duration and one shared loop boundary.
- The loop should demonstrate: tap → haptic/visual confirmation → score updates → next hole.
- Avoid fading the entire device composition nearly away at the loop seam.
- Pause motion for `prefers-reduced-motion` and provide a representative poster state.

**CRO rationale**

The headline preserves the strongest category phrase. The body carries the emotional differentiation. One CTA prevents the App Store and browser product from competing above the fold.

---

### 2. Compact Proof Rail

Use a single horizontal rail on desktop and a compact two-by-two arrangement on mobile. It should not become four full-width mobile sections.

**Proof items**

> 5.0 on the App Store
> Apple Watch built in
> Start without an account
> 40,000+ courses ready

**Implementation note:** Pull the rating and rating count from the existing verified source when practical. Never hard-code a rating count indefinitely without an update process.

---

### 3. Interactive Product Demonstration

**Anchor:** `#how-it-works`

**Eyebrow**

> TRY THE WHOLE IDEA

**H2**

> Go ahead. Count a stroke.

**Body before interaction**

> Tap the ball like you would after a shot. No form. No math. No tiny scorecard boxes.

**Interactive control**

> COUNT THIS STROKE

The control should resemble the app’s large golf-ball target rather than a generic website button. An adjacent phone and Watch state update together.

**State copy**

- Initial: `Your stroke count: 0`
- After first tap: `1 stroke. Zero math.`
- After second tap: `That’s pretty much the whole app—which is the point.`
- Supporting payoff: `The number stays here. Your head stays in the game.`
- Undo action: `Tapped twice? Undo it.`

**CTA after interaction**

> Put it on my phone

**Behavior notes**

- The demo is local and clearly illustrative; it must never imply real user activity.
- Use subtle scale/depth response and optional browser vibration where supported and appropriate.
- Never require the visitor to interact before continuing.
- The demo must remain fully usable by keyboard and screen reader.
- Respect reduced-motion preferences.

---

### 4. Deliberate Simplicity

This replaces “The whole app,” the horizontal divider, and most of the six white feature cards.

**Eyebrow**

> SIMPLE ON PURPOSE

**H2**

> A scorecard, not a cockpit.

**Body**

> If you want GPS yardages, green maps, club recommendations, and swing analysis, there are excellent apps for that. SimplyStroke is for the count and the card.

**Compact benefit copy**

**Glove-friendly**
> One oversized target you can hit with one hand.

**Saved immediately**
> Every tap is stored as it happens, with undo when a finger gets ambitious.

**Works through dead zones**
> Solo scoring keeps going when the back nine loses signal.

**Visual direction**

Do not put these in three identical white cards. Use one strong product composition with the three statements aligned around it or set as a restrained editorial list.

---

### 5. Apple Watch

**Anchor:** `#apple-watch`

**Eyebrow**

> ON YOUR WRIST

**H2**

> Leave your phone in the bag.

**Body**

> Tap the Watch after every shot and feel a haptic tick confirm the count. The scoring screen stays ready through the round, while the phone can stay nearby in your bag or cart.

**Supporting details**

- Full-face, glove-friendly tap target.
- Always-On round experience powered by a Golf workout.
- Undo, penalties, and next hole from the Watch.
- Double Tap support on compatible watches.
- The completed card syncs back to iPhone.

**CTA**

> Download for iPhone + Apple Watch

**Visual direction**

- Create or crop a close, believable wrist image where the Watch UI is the focal point.
- Reduce empty grass and distant landscape.
- Keep the hand, glove, and course context, but make the Watch legible without zooming.
- Pair the photograph with a real UI capture rather than generating the interface inside an AI image.

---

### 6. Emotional Payoff

**H2**

> Keep your head in the game.

**Body**

> Golf already gives you enough to think about. Your lie. Your club. The water you’re pretending not to see. The last thing you need is a number bouncing around in your head on the walk to the green.

> SimplyStroke holds the count so you can get back to the shot in front of you.

**Featured verified review**

> “It makes keeping score incredibly easy, especially with the watch app. I can stay focused on my game rather than trying to remember how many strokes I shot on a hole.”

> — VIGNDOG, App Store

**Visual direction**

Retain the strong golf photograph from the current section if it remains visually credible. Let the quote and image carry the section; avoid adding another grid of supporting cards.

---

### 7. Group Scoring

**Anchor:** `#play-together`

**Eyebrow**

> PLAY TOGETHER

**H2**

> Invite your bros. Lose the scorekeeper.

**Body**

> Start a group round, share the code, and let everyone count their own shots. Every phone updates the same live scorecard, so nobody gets stuck doing the whole group’s math.

**Three-step process**

**1. Start the round**
> One golfer chooses the course and opens the group.

**2. Share the code**
> Friends join from the link or six-character code. No account required.

**3. Play your own ball**
> Everyone taps their own strokes. The live card handles the rest.

**Trust line**

> Live group scoring needs a connection. Solo scoring works offline.

**CTA**

> Start a group round

**Visual direction**

- Show the process, not a single generic scorecard.
- Use one continuous visual sequence: host screen → invite code → three participant states → live group card.
- Use the correct current group scorecard UI.
- Avoid an opaque screenshot floating on a flat background.

---

### 8. App Store Proof

**Eyebrow**

> 5.0 ON THE APP STORE

**H2**

> Golfers who stopped losing count.

Use three reviews, not a seven-card wall.

**Review 1 — mental relief**

> “I’ve tried so many live scoring golf apps, but like the name says, it’s super simple. I got enough crazy thoughts in my head on the course—this app is a total value add.”

> — Chris Devonshire, App Store

**Review 2 — ease and course setup**

> “Made keeping score a breeze, easy to navigate and enter shots, including unfortunately a penalty. Quickly found the course I was playing so no set-up required. Will be in my bag from now on.”

> — ontj, App Store

**Review 3 — Watch**

> “It makes keeping score incredibly easy, especially with the watch app. I can stay focused on my game rather than trying to remember how many strokes I shot on a hole.”

> — VIGNDOG, App Store

**CTA below reviews**

> Download the app golfers are describing

---

### 9. FAQ

**Eyebrow**

> FIRST-TEE QUESTIONS

**H2**

> Before you put it in the bag.

Use an accessible accordion on mobile and a two-column disclosure layout on desktop. Keep six questions on the homepage. Move broader scoring education into guides.

**Is SimplyStroke free?**

> Core scoring on iPhone and Apple Watch is free, and you can start a solo round without an account or credit card.

**Do I need an account?**

> Not to try a solo round. Create an account when you want your rounds connected to you across devices and future sessions.

**Does the Apple Watch work without holding my phone?**

> Yes. Start the round, then score from your Watch while the paired phone stays nearby in your bag or cart.

**How do friends join a group round?**

> Send the link or six-character code. Friends can join as guests, count their own strokes, and follow the same live scorecard.

**Does it work without signal?**

> Solo rounds keep working offline and sync when service returns. Live group scoring requires a connection.

**Does it include GPS yardages or swing analysis?**

> No. SimplyStroke deliberately focuses on stroke counting and scorecards. That simplicity is the product.

**Schema rule:** Only include FAQ structured data for questions and answers visibly rendered on the page. Do not retain schema for removed homepage questions.

---

### 10. Final CTA

**Eyebrow**

> PLAY YOUR NEXT ROUND WITH IT

**H2**

> Your next round has enough to think about.

**Body**

> The count doesn’t have to be one of those things. Put SimplyStroke on your iPhone and Apple Watch before the first tee.

**Primary CTA**

> Download free on the App Store

**Reassurance**

> Start without an account · No ads today · Android coming later

**Desktop-only utility link**

> Already use SimplyStroke? View your rounds →

---

### 11. Footer

Retain the essential product, company, legal, and SEO navigation. Include internal links to:

- Golf stroke counter
- Apple Watch feature content
- ADHD and golf
- Compare golf apps
- Scoring and rules guides
- Course directory
- Privacy
- Terms
- Support

Do not restore Tournament to the homepage hierarchy through a prominent footer promotion.

## Mobile Requirements

- The hero CTA and App Store destination must be visible without scrolling on common iPhone sizes.
- Touch targets must be at least 44 by 44 points.
- Do not stack every proof item into a full-width section.
- The interactive ball must not monopolize more than one viewport height.
- Phone/Watch media must load with explicit aspect ratios to prevent layout shift.
- Review copy must use readable body sizes; no miniature seven-column testimonial treatment.
- FAQ answer text should remain at least normal body size and never be compressed solely to shorten the page.
- Sticky download treatment may appear after the visitor passes the hero, but it should not obscure content or compete with the interactive demo.

## Visual-System Direction

- Keep the existing SimplyStroke colors, logo, and recognizable golf atmosphere.
- Use the current dark hero language as the visual anchor.
- Limit the page to a small number of purposeful section treatments: atmospheric dark, editorial light, Watch/photo, group process, proof, and final dark CTA.
- Replace repeated bordered card grids with asymmetrical editorial compositions, process visuals, and strong product media.
- Typography may evolve, but it must remain recreational and confident—not luxury-country-club, startup-generic, or sports-broadcast aggressive.
- Use playful language selectively. Literal body copy must always explain what the feature does.

## SEO Guardrails

- Preserve the homepage URL and canonical.
- Preserve one clear H1 containing “stroke counter.”
- Keep the current homepage title and meta description for the first visual/copy release unless a separate SEO review approves a change. Current homepage CTR is not the immediate problem.
- Preserve internal links to `/golf-stroke-counter/`, `/adhd-golf/`, comparison content, guides, and course pages.
- Do not move the dedicated nonbranded keyword burden from `/golf-stroke-counter/` back onto the homepage.
- Keep SoftwareApplication structured data accurate to the current product and pricing.
- Update FAQ schema to match visible content exactly.
- Removing visible sections means removing stale claims and schema, not hiding the old copy for search engines.
- The current HTTP-root redirect error should be fixed as a separate technical SEO task.

## Measurement

Every App Store CTA should emit the existing canonical CTA event with consistent properties:

| Property | Values |
|---|---|
| `page` | `home` |
| `destination` | `app_store` |
| `location` | `nav`, `hero`, `demo`, `watch`, `group`, `reviews`, `final` |
| `label` | Rendered CTA copy |

Additional homepage events:

- `homepage_demo_started`
- `homepage_demo_stroke_logged`
- `homepage_demo_undo_used`
- `faq_opened` with `question_id`
- `web_companion_clicked` with `location`

Do not launch a formal A/B test at current traffic. Compare descriptive behavior before and after launch, annotate the release date, and use session recordings or usability tests for qualitative confirmation.

## Acceptance Criteria

- A new visitor can explain the product within five seconds.
- The first screen contains one obvious primary action.
- The page tells one argument rather than repeating “simple” through multiple grids.
- Apple Watch appears before group scoring and reviews.
- Tournament is absent from the homepage.
- The interactive demonstration works with keyboard, screen reader, reduced motion, and touch.
- All product screenshots reflect the current app.
- Every testimonial is verified and attributed.
- No synthetic activity is presented as user behavior.
- SEO title, canonical, internal-link architecture, and visible structured-data content remain valid.
