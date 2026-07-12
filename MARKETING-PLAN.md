# SimplyStroke — Marketing Plan

**Date:** July 11, 2026
**Source:** the Reddit corpus (238,854 comments / 2,437 threads / r/golf back to 2010)
**Companion to:** `CONTENT-STRATEGY-V2.md` (SEO + content), `COMPARISON-PAGE-SPEC.md` (comparison pages)
**Status:** Plan. Nothing here is built yet.

---

## 0. What this covers

`CONTENT-STRATEGY-V2.md` handled the SEO half of the scrape: lead with price, build the alternatives pages, own the scoring-rules cluster. This doc is everything *else* the corpus surfaced — the product wedges, the channel, and the one decision that could undo the repositioning.

Six plays, ranked by evidence strength × cost to execute.

| # | Play | Evidence | Cost | Type |
|---|---|---|---|---|
| 1 | **Ship the GHIN hand-off** | 1,765 GHIN mentions, universally grudging | Low | Product + content |
| 2 | **Make the watch the headline, not a feature** | *"I don't bring my phone on the golf course"* | Low | Positioning |
| 3 | **Claim battery** | Garmin's entire reputation is "it doesn't die" | Free | Positioning |
| 4 | **A written free-forever pledge** | Subscription rage is the loudest thing in the corpus | Free | Trust asset |
| 5 | **Score integrity as a content/PR angle** | 1,013-comment thread on a faked scorecard | Low | Content |
| 6 | **r/golf, as a disclosed founder** | Hole19 precedent (see §7 caveat) | Time | Channel |

---

## 1. The GHIN hand-off — the most under-exploited thing in the corpus

### The pain, in their words

GHIN gets **1,765 mentions** and not one of them is affectionate. Golfers use it because the USGA leaves them no choice:

> *"any other app as crap as the GHIN app requiring a $50 ANNUAL subscription would be dead in the water if it wasn't for the USGA making it the only 'official' handicap app"*

And the workflow people have actually landed on is *manual double entry*:

> *"It's really annoying, I end up have[ing] to use pen/paper and entering on GHIN after."*

That's a person keeping score on paper during the round, then re-keying it into GHIN at home. Every round. Nobody is serving that workflow. **The gap between "I have my scores" and "GHIN has my scores" is an entirely unclaimed piece of ground.**

### What GHIN actually requires

Worth being precise, because it determines exactly how much work this is:

- **GHIN number**
- **Date of play**
- **Course + tees**, which resolve to a **Course Rating** and **Slope Rating**
- **The score**, in one of two ways:
  - **Hole-by-hole entry** — GHIN applies the Net Double Bogey cap itself, or
  - **Total adjusted gross** — *you* have to do the Net Double Bogey math before submitting

Net Double Bogey = par + 2 + any handicap strokes you get on that hole. It caps the damage from one blow-up hole.

### The feature

**A post-round "Post to GHIN" screen.** Not an integration. A *layout*.

- The date, the course name and the tees you entered.
- **All 18 numbers, in GHIN's order, in type large enough to read while your other thumb is in the GHIN app.**
- The gross total.
- Nothing else on screen.

That's the whole thing. No API. No USGA partnership. No course database to license. No permission from anybody. It converts a five-minute chore into about thirty seconds of thumb-work, and it is a layout problem, not an integration problem.

**Deliberately out of scope:** computing the Net Double Bogey adjusted gross for the user. That needs par and stroke index per hole, which needs a course database, which is the exact bloat we're defining ourselves against. Let GHIN do that math — it already does, on hole-by-hole entry. Our job is to hand them 18 clean numbers, not to become a handicap engine.

### 🚨 Do not charge for this

You asked whether this is a premium feature. **No.** And this is the one recommendation in this doc I'd argue hardest for.

Your `/about/` page now contains the phrase *"no premium tier holding your own scorecard hostage."* A paywalled export of the user's own score **is that sentence, literally**. You would be:

1. Building the entire new positioning on "free, no subscription, nothing gated," then
2. Gating the single thing golfers are most frustrated about, and
3. Doing it in the one community that catalogues this kind of thing and never forgets.

The gap between what you say and what you charge for is precisely where r/golf goes hunting. Don't hand them the story.

**Charge nothing. The GHIN hand-off is a trust asset, not a revenue line.** Its job is to be the thing people tell each other about.

### The content that goes with it

This feature has a natural content cluster, and it's all high-intent:

- `/guides/how-to-post-a-score-to-ghin/`
- `/guides/what-is-net-double-bogey/` — genuinely confusing, constantly asked
- `/guides/how-to-read-a-golf-scorecard/` — the handicap row. **481 comments on one thread.**
- `/guides/maximum-score-per-hole/`

Every one of those is somebody in the middle of the exact chore this feature removes.

---

## 2. Monetization: the constraint nobody has spelled out

This deserves its own section because "free forever" and "makes money" look like a contradiction and aren't.

**The corpus grudge is against *recurring* charges. It is not against paying.**

The proof is sitting in the data: golfers are buying **Shot Scope at ~$150 one-time** specifically to escape **Arccos at ~$100–$200/year** — and they *say out loud* that they're accepting worse software to do it.

> **+120** — *"For a one time $150 price I now use Shot Scope, get most of the same data and it's not a subscription based service to get it."*

That is a market cheerfully paying money. It just refuses to pay it *again next year*.

**So the rule is:**

| ✅ Compatible with the positioning | ❌ Detonates it |
|---|---|
| Free core counter, forever | Any subscription, ever |
| A **one-time** unlock for genuinely additive extras | Gating the counter, the scorecard, or the GHIN hand-off |
| Paid league/season tools for organisers | A "premium tier" of the thing you already promised was free |
| Nothing at all | Ads |

If SimplyStroke ever charges, it charges **once**, for something **added**, never for something **withheld**. And it never touches the core loop: tap, count, card, GHIN.

Note: the repo already carries a commit that dropped "no upsells" from the hero *"before a premium tier makes it a lie."* That instinct was right. This section is the general form of it — and the good news is that a one-time unlock doesn't make it a lie at all.

---

## 3. Make the Apple Watch the headline

> **+26** — *"I don't bring my phone on the golf course."*

This is filed in the teardown as a competitor complaint. It isn't. It's a **category** complaint, and it limits everyone — including us.

A phone-first scoring app has a hard ceiling: some meaningful share of golfers have decided the phone stays in the bag, and no amount of one-tap elegance reaches them. For those golfers **the watch is not a feature of SimplyStroke. It is the only version of SimplyStroke that exists.**

Right now the watch is a fold on the homepage and a bullet on `/features/`. That undersells it.

**Do:**
- A dedicated **`/apple-watch-golf-scorecard/`** page. Real search demand, rising, and it's our natural form factor.
- Put the watch in the hero rotation, not just mid-page.
- Lead the watch copy on the thing that matters: **the phone never comes out of the bag.**

**Say plainly:** one tap on the wrist, a haptic tick to confirm, phone stays in the bag for eighteen holes. That sentence is aimed directly at a documented, upvoted objection to the entire category.

---

## 4. Claim battery — it's free and nobody can beat you

> *"The Grint sucked my watch battery dry."*
> *"I like Golfshot for feature richness... but it does drain the battery."*
> **+79** — *"I wouldn't get a dedicated watch but I'd get a Garmin just because of battery life."*

Garmin's entire competitive advantage in this corpus is **it doesn't die**.

An app whose only job is to increment an integer is, structurally, the lightest thing in the category. No GPS polling. No map tiles. No background sync. No sensors. **You win this by construction, and you're not saying it.**

Add it to the feature list, the comparison table and the watch page. It costs one line and it answers a top-five complaint.

*(One honest caveat: measure it before you claim a number. "Won't drain your battery" is safe; "18 holes on 4% battery" needs a test.)*

---

## 5. The free-forever pledge, in writing

TheGrint's loyalty mechanism is *grandfathered pricing*:

> *"I've just paid $20/yr for Grint since I got grandfathered in."*

People cling to that because they've been burned. Which tells you exactly how much a **credible, dated, public commitment not to charge** is worth in this market.

**Ship a `/pledge/` page.** Short, dated, signed by the team, and specific:

- The stroke counter is free. Forever. Not "free for now."
- No subscription. Ever.
- No ads. Ever.
- We will never gate your own scorecard, or your own score data, behind a payment.
- If we ever charge for anything, it will be **one time**, for something **new**, and this page will say so.
- No round data sold, to anyone.

Then **link it from the pricing section, the comparison page and the App Store description**, and never quietly edit it. A promise you can't walk back is a moat — and it's a moat every subscription competitor is structurally unable to copy, because their revenue model forbids it.

This is the cheapest trust asset available to you and it takes an afternoon.

---

## 6. Score integrity — an angle hiding in plain sight

The single **biggest scorecard thread in the entire corpus** is 1,013 comments of people arguing about a group that faked a scorecard. Add:

- *"The DQ rule for signing a wrong scorecard is the dumbest rule in sports"* — **554 comments**
- *"Guess who just got DQ'd for an incorrect scorecard today"* — **302 comments**

Golfers get genuinely, loudly worked up about the accuracy of a recorded score. And the counter-signal is just as strong:

> **+442** — *"The score is why I play, why I curse, why I smile and why I cry."*

So: **people care enormously about the score, and routinely fail to record it accurately.** That gap is the entire product, and it's an argument on the popular side of a fight the community is already having.

**The angle:** not *"scoring doesn't matter, relax."* The opposite. **"The honest number, without the effort."** An app that makes the true score the easy score.

**Content:**
- `/guides/how-to-keep-score-in-golf/` (already Pillar C in the content strategy)
- `/guides/lost-count-of-strokes-what-to-do/` ✅ **built** — and note it already leads with the Rules asymmetry: a score written too high stands; too low is a DQ. That framing is aimed straight at this fight.

**What NOT to do:** don't moralise, and don't imply your users are cheats. The winning tone is *"nobody's a liar, the pencil just showed up ten minutes late."*

---

## 7. r/golf as a channel

### The precedent, and its caveat

The teardown notes Hole19 staff soliciting directly in r/golf threads:

> *"Reach out to me via ad@hole19golf.com and let me know you came from Reddit and we'll hook you up"* — and r/golf tolerates it.

**Verify this before you build on it.** It is the one quote in the teardown with **no permalink and no upvote count**, unlike every other quote in that document. Hole19 also has the thinnest presence of any named app (224 mentions), so "r/golf tolerates it" is inferred from a small sample. Go read the actual thread first.

That said, the underlying read is right: r/golf tolerates **disclosed founders** far better than it tolerates anything that smells like a plant.

### The playbook

**Rule zero: post as the founder, disclosed, every single time.** One sockpuppet and you are finished in the only room that matters. This community catalogues astroturfing and it does not forgive. The upside of a free app posted honestly is large; the downside of one fake account is terminal. That's not a close call.

**Phase 1 — Be useful, for weeks, with the app unmentioned.**
The scoring-rules threads are your home. *"How do you score a lost ball"* (222 comments). *"How are you counting strokes on the greens"* (215). *"What do you count as chips"* (142). You can answer these genuinely, correctly, and often, without ever mentioning a product. Build the account. Earn the right to speak.

**Phase 2 — Show up where the app is the answer.**
- **Subscription-cancellation threads.** Someone announcing they just dumped Arccos is someone who would like to know a free one-tap counter exists. This is the single highest-conversion moment in the corpus.
- **"What app do you use for keeping score?"** threads (114–214 comments each). Answer honestly, including who you're *not* right for.
- **"I lost count / I just write down a plausible number"** confessions. This is your customer, describing your product's reason for existing, unprompted.

**Phase 3 — Ask, don't tell.**
A pre-launch founder asking *"I'm building a free one-tap counter — what would make you actually use it?"* is a post r/golf will engage with. A launch announcement is a post r/golf will ignore.

### Do not post the ADHD angle to r/golf

The corpus is unambiguous. ADHD golfers there describe golf as *"the most zen or calmly focused I'll be all week"* (+88). A product post telling that room their brains need fixing lands as presumptuous, and it is the one move that turns a warm room cold permanently.

The ADHD content stays on the website, where people arrive already searching for it. It does not get carried into the community.

---

## 8. Sequenced

**Now (free, days)**
1. `/pledge/` page. An afternoon. Highest trust-per-hour in the plan.
2. Battery claim added to features, comparison table, watch copy.
3. Start the r/golf account. Answer scoring-rules questions. Mention nothing.

**Next (weeks)**
4. `/apple-watch-golf-scorecard/` page; promote the watch in the hero.
5. `/golf-app-without-subscription/` + the alternatives pages *(from `CONTENT-STRATEGY-V2.md`)*.
6. The scoring-rules guide cluster — including the GHIN and Net Double Bogey guides.

**Product (a sprint)**
7. **The "Post to GHIN" screen.** Free. Never gated. Then write the guide that goes with it, and *then* it becomes a thing worth mentioning in the subscription-refugee threads.

**Ongoing**
8. Monthly AI-citation checks. Quarterly re-verification of every competitor price on `/compare/`.

---

## 9. The one number that would change all of this

Everything above rests on a Reddit corpus, and Reddit is a proxy, not a measurement. Two things worth buying certainty on, both nearly free:

1. **Google Keyword Planner** — `golf app for ADHD` vs `golf app without subscription` vs `arccos alternative` vs `how to score a lost ball`. This settles how hard to swing at each pillar. Half an hour.
2. **Verify the Hole19 thread** before treating r/golf posting as a sanctioned channel.

Reddit tells you *how people feel* and *what words they use*. It cannot tell you *how many people are searching*. We've now built a strategy that assumes the first is a good guide to the second. It usually is. It's worth thirty minutes to check.
