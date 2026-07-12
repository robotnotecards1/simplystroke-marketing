# SimplyStroke — Reddit Customer Knowledgebase

**Corpus:** 1,789,082 posts scanned across r/golf, r/golftips, r/ADHD, r/ADD, r/neurodiversity, r/Neurodivergent, r/adhd_anxiety — every post from each subreddit's inception (r/golf back to April 2010) through July 2026. 36,218 matched the relevance filter. 2,437 threads hydrated to full comment trees → **238,854 comments**.

Method: Arctic Shift archive (Pushshift successor). Reddit's own search can't page back this far; see `README.md`.

---

## The headline you need to read first

**The ADHD-golfer-can't-hold-the-count thesis is not supported by the data.**

I went looking for it specifically. Across 238,854 comments:

- 197 comments in the golf subs mention ADHD.
- 84 comments describe losing count of strokes.
- **Comments doing both: 0.**

The closest thing in the entire corpus is one comment *inside* the "Golfers with ADHD" thread that mentions losing count — *"I lose count of score and need to re[check]"* ([+15](https://www.reddit.com/r/golf/comments/1p45e7m/golfers_with_adhd_what_is_the_most_frustrating/nq9icx6/)) — and even that commenter never connects it to ADHD. He's talking about not being able to groove a swing feel.

Not one person in a quarter-million comments has said "I have ADHD and I can't keep my stroke count." That's not a gap in the data; that's the answer.

This is the single most useful thing the scrape produced, because it's cheap to learn now and expensive to learn after you've built the positioning around it.

### What ADHD golfers actually complain about

There *is* a real, passionate ADHD-golf community — the threads are high-engagement and the top comments are heavily upvoted. They just aren't talking about arithmetic. Ranked by upvotes, from *"Golfers with ADHD, what is the most frustrating..."*:

| Upvotes | Complaint |
|---|---|
| 311 | *"Anyone see where that landed?"* |
| 280 | *"Pace of play, I struggle to play anything other then ready golf"* |
| 147 | *"Losing clubs and rangefinders is really fucking annoying and expensive"* |
| 103 | *"I'll watch my ball, see it land, and go 'it's over there by the two trees'. After finding my partners ball, I can't remember where the hell my ball landed."* |
| 67 | *"if the course is backed up and we have to wait... I lose all focus and my tee shot is usually fucked"* |

The ADHD golf pain is **object permanence and attention during dead time**, not math. They lose the *ball*, the *club*, and the *thread of focus between shots*. Nobody says they can't add to five.

Also worth knowing: the ADHD-golf sentiment is overwhelmingly **positive about golf**. *"I have adhd and find a round of golf is often the most 'zen' or calmly focused I'll be all week"* (+88). *"hyperfixation has helped me groove a good swing quickly."* Golf is framed as the therapy, not the affliction. Marketing that tells ADHD golfers their brain is a problem to be fixed will land badly with this crowd.

**Key ADHD-golf threads (all high engagement, all worth reading in full):**
- [Golfers with ADHD, what is the most frustrating part of the game](https://www.reddit.com/r/golf/comments/1p45e7m/)
- [ADHD and Golf](https://www.reddit.com/r/golf/comments/1m1bo7u/)
- [How do I stop my ADD/ADHD during golf](https://www.reddit.com/r/golf/comments/ydhz4q/)
- [Thank you golf for giving my ADHD brain...](https://www.reddit.com/r/golf/comments/1fx3vxt/)

On the ADHD side of the fence, golf barely registers: ~40 posts across all five ADHD subs mention golf in the title, mostly disc golf, mini golf, and "can I take my meds before a round." **Do not expect to acquire customers in r/ADHD.** The golfers with ADHD are in r/golf.

---

## What golfers DO say — the pain that's actually there

Here's the thing: **losing count is real, it's just not an ADHD story. It's a normal-golfer story.**

> *"I got the sensors and used app to help me start documenting my club distances and keep up with strokes per hole. When I first started out this year I was shooting so poorly that I would lose count and just go with a dou[ble]"* — [r/golf](https://www.reddit.com/r/golf/comments/opbyfb/arccos_no_good_for_high_handicaps/h649woa/) (+10)

That's your customer. Not "I have a disorder." Just: *the number got away from me, so I wrote down something plausible.*

### Theme 1 — Scorekeeping is a chore people actively avoid

The behavioural threads are enormous and they're all about *not* keeping score properly:

- [**How many of you don't keep score?**](https://www.reddit.com/r/golf/comments/1nx4skj/) — 314 comments
- [**Anyone else reuse scorecards?**](https://www.reddit.com/r/golf/comments/1gane9z/) — 306 comments
- [**Does anyone else prefer to score this way?**](https://www.reddit.com/r/golf/) — 574 comments
- **How I keep score** — 271 comments

The most upvoted honest answer in "How many of you don't keep score?":

> *"I keep score until I don't. I usually don't take a scorecard and just keep a mental note of my running +1, even, +1, +2 score. When it's a good day, great, I had a fun score. When it's a bad day, great, I had a fun practice round."* (+103)

And the self-aware one:

> *"It's a little funny that most everyone keeps score and yet most of us are very liberal and vary round by round in terms of how we enforce or apply the rules of scoring."* (+97)

Counter-signal you must respect — the score matters emotionally:

> *"The score is why I play, why I curse, why I smile and why I cry."* (+442)

So: people care deeply about the score **and** routinely fail to record it accurately. That gap is the product.

### Theme 2 — The phone is the enemy on the course

> *"I don't bring my phone on the golf course."* (+26)

This is a recurring, upvoted sentiment and it's a direct threat to any phone-first scoring app. Whatever SimplyStroke's input model is, it has to survive a golfer who resents pulling out a phone. Anything requiring 5 taps per hole loses to a pencil.

### Theme 3 — Data entry after the round is a known tax

> *"It's really annoying, I end up have[ing] to use pen/paper and entering on GHIN after."*

> *"...reconciling rounds is a chore"* (on Shot Scope)

People are already doing double entry: paper on the course, app afterwards. That's a workflow with an obvious hole in it.

### Theme 4 — Score integrity is a live, emotional topic

The biggest scorecard thread in the entire corpus is [*"According to their scorecard this group shot an Ace on a par 4, 1 albatross, 4 eagles and the rest birdies"*](https://www.reddit.com/r/golf/comments/zcvn87/) — **1,013 comments** of people arguing about fake scores. Add [*"The DQ rule for signing a wrong scorecard is the dumbest rule in sports"*](https://www.reddit.com/r/golf/comments/1at64nm/) (554 comments) and [*"Guess who just got DQd for an incorrect scorecard today"*](https://www.reddit.com/r/golf/comments/1m9eheh/) (302 comments).

Accuracy of the recorded score is something golfers get genuinely worked up about. An app that makes the honest number effortless is arguing on the popular side of a fight people are already having.

---

## Positioning implications

**Lead with:** simple, fast, accurate scorekeeping that doesn't make you think. No subscription. Minimal taps. Works for the guy who'd otherwise lose count and write down a double.

**Do not lead with ADHD.** The evidence isn't there, the community would find it presumptuous, and it narrows a universal pain into a niche one. Losing count isn't a disorder — it's Tuesday.

**Keep ADHD as a secondary content play.** The r/golf ADHD threads are high-engagement and underserved. A genuinely useful piece of content for golfers with ADHD — about *focus between shots and not losing your ball*, the things they actually complain about — would land. That's a top-of-funnel content angle and a community-goodwill play, not a positioning pillar.

**The competitive wedge is subscription fatigue + bloat.** See `COMPETITOR-TEARDOWN.md` — this is where the loudest, most upvoted pain in the entire corpus lives, and it's not close.

---

## Source data

| File | What |
|---|---|
| `data/posts_index.csv` | All 36,218 matched threads: title, sub, date, score, comments, matched term, permalink |
| `data/pain_quotes.csv` | 15,279 comments tagged `adhd` / `lost_count` with upvotes + permalink |
| `data/competitor_quotes.csv` | Competitor mentions split into complaints/praise with upvotes + permalink |
| `data/seo_questions.csv` | 1,109 question-form post titles → see `SEO-FAQ.md` |
| `data/corpus.db` | Full SQLite corpus (36,218 posts / 238,854 comments) — re-query any slice |
