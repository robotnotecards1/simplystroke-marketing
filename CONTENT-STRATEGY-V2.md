# SimplyStroke — Content Strategy v2

**Date:** July 11, 2026
**Supersedes:** the pillar architecture in `CONTENT-STRATEGY-2026-07.md` (the AI-SEO mechanics, schema plan and answer-block spec in that doc all still hold — only the *topic* hierarchy changes)
**Trigger:** the Reddit corpus (238,854 comments, 2,437 threads)

---

## 0. The short version

The scrape did the one thing research is supposed to do: it told me I was wrong before it got expensive.

**I built the site around the ADHD wedge. The data says ADHD is not a wedge — it's a content angle.** Meanwhile the loudest, most-upvoted pain in a quarter-million comments is one SimplyStroke already wins on outright and buried on a pricing page: **subscription fatigue.**

The correction, in one line: **stop leading with who can't count, and start leading with what it costs.**

| | v1 (built) | v2 (correct) |
|---|---|---|
| **Lead wedge** | ADHD golfers who lose count | Free, one tap, no subscription |
| **Pillar A** | Golf apps (landscape) | **No-subscription / alternatives** |
| **Pillar B** | Golf stroke counter | **Golf stroke counter** *(unchanged — validated)* |
| **Pillar C** | ADHD & golf | **How to keep score in golf** (the rules cluster) |
| **ADHD** | The positioning | A supporting page + a community play, reframed |

Nothing built this week gets thrown away. Two pages get repositioned and one gets its tone rewritten.

---

## 1. What the data actually proves — and what it doesn't

I want to separate these carefully, because the scrape overreaches in one place and I don't want us over-correcting on a bad inference.

### Proven, and I accept it

**ADHD golfers do not talk about losing count.** This is the strong finding. It isn't merely "ADHD is absent from the corpus" — it's that the ADHD-golf threads *exist*, are high-engagement, and are full of people describing their frustrations in detail. And in those threads, the complaints are:

- *"Anyone see where that landed?"* (+311)
- Pace of play, can't play anything but ready golf (+280)
- Losing clubs and rangefinders (+147)
- *"I'll watch my ball, see it land... after finding my partner's ball, I can't remember where the hell my ball landed."* (+103)
- Losing focus when the course backs up (+67)

**The ADHD golf pain is object permanence and attention during dead time. It is not arithmetic.** That's the population most likely to say "I can't keep count," they were asked directly what frustrates them, and they said something else. That's not a data gap. That's an answer.

**And the tone finding is worse for us than the demand finding.** *"I have ADHD and find a round of golf is often the most 'zen' or calmly focused I'll be all week"* (+88). Golf is framed by this community as **the therapy, not the affliction.**

Now read our live H1:

> **Golf asks you to remember one number. Your brain has other plans.**

That tells an ADHD golfer their brain is the problem, in a place they go to feel like it isn't. This crowd has spent their lives being sold fixes for themselves and they have a very good detector. That headline is a bigger liability than the traffic it was ever going to earn.

### Not proven — don't over-correct

**"There's no search demand for `golf app for ADHD`."** The scrape asserts this and the scrape cannot know it. Reddit comment frequency is not search volume. People don't post "I have ADHD and I lose count" to r/golf — that's a confession, and r/golf is a room full of strangers. They might still type it into Google at 11pm. Absence of a Reddit complaint is weak evidence of absence of a search.

**But the burden of proof has flipped**, and that's what matters. "Zero competition" was never the same thing as "a wedge." Zero competition plus zero demand equals zero traffic, and I conflated the two. The ADHD angle now has to earn its place, and there is a cheap way to make it prove itself — see §6.

### The finding I should have led with

> *"When I first started out this year I was shooting so poorly that I would lose count and just go with a double."* (+10)

That is the customer. Not a diagnosis. Just: **the number got away from me, so I wrote down something plausible.** Losing count is real and it is *universal*. I took a universal pain and narrowed it to a clinical one, which is the opposite of what positioning is for.

---

## 2. The new lead wedge: subscription fatigue

This is not a close call. It is the loudest agreement in the entire corpus, and the upvote numbers are unlike anything else in the data:

> **+493** — *"when I saw the price for a full year subscription, I just replaced the whole thing with shot scope instead."*
> **+160** — *"I had arccos for 3 years but now at the $200 annual cost I cancelled."*
> **+120** — *"their subscription price is ridiculously expensive and it keeps going up."*
> **+120** — *"For a one time $150 price I now use Shot Scope..."*
> **+107** — *"You think I'm just going to pocket that money from cancelling the Arccos subscription?"*
> **+84 / +70** — *"No subscription is why I went with ShotScope."*

Read what those people are doing. **They are buying $150–$300 of hardware, and accepting worse software, purely to escape a recurring charge.** That is not price sensitivity. That is a grudge.

SimplyStroke is free. We put that in a table cell.

**"No subscription" is not a feature in this market. It is the feature.** It belongs in the H1, the title tag, the OG image and the App Store subtitle — not in column seven of a comparison table.

The second-loudest is bloat, and it names our best target by name:

> *"18 birdies is a bloated mess these days."* · *"too expensive, too much going on"*

*"Too much going on"* is an unsolicited pitch for a product literally called **Simply**Stroke. 18Birdies was the category default and is now the category punchline. That is a soft target and it is standing still.

And the third validates the mechanic we already built:

> **+13** — *"I hate that I can't just tell it I missed the green, it demands to know if I was long, short, left, right, or didn't have a chance plus what club I used."*

That is a man describing precisely why he will quit his golf app. He wants to record a number. It wants a dataset. **Every competitor optimises for data richness; every golfer complains about data entry.** We already win this — "one tap per stroke" is the whole product — we just weren't shouting it.

---

## 3. Revised architecture

```
                    HOMEPAGE  /
        "Free. One tap. No subscription."
                         │
     ┌───────────────────┼───────────────────┐
     ▼                   ▼                   ▼
 PILLAR A            PILLAR B            PILLAR C
 /golf-app-          /golf-stroke-       /how-to-keep-
 without-            counter/            score-in-golf/
 subscription/       (unchanged)         (the rules cluster)
 "the grudge"        "the category"      "the volume"
     │                   │                   │
 /compare/          the guides          the scoring guides
 /18birdies-                            (lost ball, greens,
  alternative/                           chips, penalties,
 /arccos-                                handicap row)
  alternative/
     │                   │                   │
     └───────────────────┼───────────────────┘
                         ▼
                   /download/

     SUPPORTING (not a pillar):  /adhd-golf/  — reframed
```

### Pillar A — `/golf-app-without-subscription/` ★ **build first**

**Primary:** `golf app without subscription` · **Secondary:** `free golf app no subscription`, `golf app no monthly fee`, `cheapest golf scorecard app`

The scrape calls this phrasing "the buying trigger" and it's right — nobody types that unless they are actively angry at a renewal notice. This page catches people at the exact moment they are cancelling something else.

**Plus two alternative pages** — and note these obey the compare-up rule we already set, because both targets are large, well-known and searched:

- **`/18birdies-alternative/`** — the bloat complaint, quotable and documented.
- **`/arccos-alternative/`** — subscription refugees. *"Alternative"* + a named incumbent is one of the highest-intent query patterns that exists.

`/compare/` (already built) becomes the hub these three feed.

### Pillar B — `/golf-stroke-counter/` — **unchanged, and validated**

The corpus backs it: *"What apps do you use for keeping track of score?"* (114 comments), *"How many of you keep your score via an app?"* (147). The page stands as built. One edit: the answer block needs "free, no subscription" moved to the **first** sentence.

### Pillar C — `/how-to-keep-score-in-golf/` — **the sleeper, and the biggest of the three**

This is the cluster I under-rated and the data is emphatic. Golfers are constantly, genuinely confused about how to record a score, and they ask in enormous threads:

| Comments | The question |
|---:|---|
| 481 | Can someone explain what the handicap means on the scorecard? |
| 222 | How do you score a lost ball...? |
| 215 | How are you counting strokes on the greens? |
| 142 | What do you count as chips on your scorecard? |

This is evergreen, high-volume, low-competition, and it is a *perfect* fit: the person asking "how do I score a lost ball" is a person who needs a scoring app and does not yet know it. It's also the ideal AI-citation cluster — clean question → clean answer, exactly what the AnswerBlock was built for.

**Spokes (each its own guide):**

1. `/guides/how-to-score-a-lost-ball/` — stroke and distance vs. the two-stroke local rule
2. `/guides/counting-strokes-on-the-green/` — where everyone undercounts, because tap-ins feel free
3. `/guides/what-counts-as-a-stroke/` — whiffs, practice swings, chips
4. `/guides/penalty-strokes-explained/`
5. `/guides/how-to-read-a-golf-scorecard/` — the handicap row. 481 comments on one thread
6. `/guides/maximum-score-per-hole/` — net double bogey, ESC

Plus the two already built (`lost-count-of-strokes-what-to-do`, and the ADHD practical guide).

### Supporting — `/adhd-golf/` — **keep the URL, rewrite the frame**

Do **not** delete it. It costs nothing to keep, the research is real, and it may well capture low-volume high-intent search we can't see from Reddit. But it stops being the positioning, and the tone has to change:

- **Kill the H1.** *"Your brain has other plans"* is exactly the frame the community rejects.
- **Rewrite around what ADHD golfers actually complain about:** losing the ball, pace of play, dead-time focus, losing clubs. That's the article they'd actually read — and, per the scrape, it's the one that earns goodwill in r/golf.
- **Keep the research and the honest limits.** Still good E-E-A-T, still true.
- **Demote the count-offloading** to one section, not the thesis.
- The count section stays honest, because the pain *is* real — it's just not an ADHD story. It's a Tuesday story.

---

## 4. What changes on the live site, in order

**This week**

1. **Homepage H1 + title tag.** Lead with free / one tap / no subscription. This is the single highest-leverage edit in the whole plan and it's an afternoon's work.
2. **`/compare/`** — promote cost from a column to the argument. The verdict block should open on price.
3. **`/golf-stroke-counter/`** — "free, no subscription" into the first line of the answer block.
4. **`/adhd-golf/`** — replace the H1 and the deficit framing. Highest-urgency fix on the page, because right now it's actively working against us with the audience it's aimed at.

**Next**

5. Build `/golf-app-without-subscription/`, `/18birdies-alternative/`, `/arccos-alternative/`.
6. Build `/how-to-keep-score-in-golf/` + the first three scoring guides (lost ball, greens, what counts as a stroke).

**Then**

7. Rewrite `/adhd-golf/` fully around ball-finding, pace of play and dead-time focus.
8. Remaining scoring guides.

---

## 5. Reddit is a channel, not just a dataset

The scrape found the door open: **Hole19's staff post promo offers directly in r/golf threads and the sub tolerates it**, because they're transparent about who they are.

That is a live, free acquisition channel for a free app, and you have a better story than Hole19 does. The rules:

- **Post as the founder, disclosed, every time.** This crowd punishes astroturfing brutally and permanently. One sockpuppet and the brand is done in the only community that matters.
- **Answer the question first, mention the app second, or not at all.** The scoring-rules threads are the natural home — you can answer "how do I score a lost ball" genuinely and helpfully a hundred times without ever pitching.
- **The subscription threads are where the app belongs.** Someone announcing they just cancelled Arccos is someone who would like to hear about a free one-tap counter.
- **Do not post the ADHD angle to r/golf.** The corpus says it would land as presumptuous, and it's the one move that could turn a warm room cold.

Free app + genuine answers + disclosed founder is the cheapest download channel available to you, and it's sitting right there.

---

## 6. The 30-minute check that settles the ADHD question

Before we tear anything down further, get the one number Reddit cannot give us. Open **Google Keyword Planner** (free, no ad spend required) and pull volume for:

```
golf app for ADHD          vs.    golf app without subscription
ADHD golf                          free golf scorecard app
golf app for ADHD adults           18birdies alternative
                                   arccos alternative
                                   how to score a lost ball
```

I'd expect the right column to beat the left by one to two orders of magnitude. If it does, v2 is settled and `/adhd-golf/` stays as a reframed supporting page, permanently.

If the left column surprises us — genuine volume, no competition — then it earns its keep as a secondary pillar and we say so out loud. Either way we stop guessing, and it costs half an hour.

---

## 7. What I got wrong, for the record

I inherited "nobody owns ADHD golf, therefore own it" from the earlier handoff and I ran with it without ever asking the next question: *does anybody want it?* An uncontested position is only valuable if someone is standing on the other side of it wanting to buy.

The Reddit corpus asked that question and got a clear answer. Meanwhile the thing we're genuinely best at — free, one tap, nothing else on screen — maps exactly onto the loudest grievance in the market, and I had it sitting in column seven of a table.

The good news is that everything built this week still works. The stroke-counter pillar is validated. `/compare/` is the right page and just needs its argument reordered. The AnswerBlock, the entity graph, the schema and the guides structure are all channel-agnostic and all still correct.

We were pointing a good machine at the wrong target. That is the cheapest kind of wrong to be.
