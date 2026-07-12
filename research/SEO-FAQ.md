# SimplyStroke — SEO & FAQ Asset (mined from real Reddit questions)

Everything here is a **real question golfers actually asked**, with the thread's comment count as a demand proxy. No invented keywords. Full list: `data/seo_questions.csv` (1,109 question-form titles).

The strategic point: golfers aren't searching *"golf scoring app for ADHD."* They're searching *"how do I score a lost ball"* and *"what apps do you use for keeping track of score."* Rank for the questions they're already asking.

---

## Cluster 1 — "Which app should I use?" (highest commercial intent)

Real titles, with engagement:

| Comments | Verbatim question | URL |
|---:|---|---|
| 256 | **What's the most important features of a golf app?** | [link](https://www.reddit.com/r/golf/comments/1i0gxwh/) |
| 214 | **Best App?** | [link](https://www.reddit.com/r/golf/comments/1ke6t28/) |
| 147 | **How many of you keep your score via an app?** | [link](https://www.reddit.com/r/golf/comments/1upuooc/) |
| 114 | **What apps do you use for keeping track of score?** | [link](https://www.reddit.com/r/golf/comments/1geqnb0/) |
| — | **Which Golf App Is Actually Worth the Subscription?** | [link](https://www.reddit.com/r/golf/comments/1uklnb1/) |

**Target keywords:** `best golf scoring app`, `golf app to keep score`, `simple golf scorecard app`, `golf app no subscription`, `free golf scorecard app`, `18birdies alternative`, `arccos alternative no subscription`, `cheapest golf handicap app`

**Build these pages:**
1. `/best-golf-scoring-apps` — honest comparison. Include competitors' real strengths; this crowd smells a rigged table instantly.
2. `/18birdies-alternative` — the bloat complaint is documented and quotable.
3. `/arccos-alternative` — capture subscription refugees. Highest-volume complaint in the corpus.
4. `/golf-app-without-subscription` — this phrasing *is* the buying trigger. See the teardown.

---

## Cluster 2 — Scoring rules confusion (highest search volume, best FAQ material)

Golfers are genuinely confused about how to record a score, and they ask constantly. This is evergreen, high-intent, low-competition content — and it's a natural fit for a scoring app.

| Comments | Verbatim question |
|---:|---|
| 222 | **How do you score a lost ball when it's a decent shot, no real trouble, but you gotta keep pace?** |
| 215 | **How are you counting strokes on the greens?** |
| 142 | **What do you count as chips on your scorecard?** |
| 142 | **What do these dots mean on scorecard (Garmin)** |
| 115 | **Can I hide my scores from public view on GHIN?** |
| 110 | **How many of you keep track/care about a handicap?** |
| 481 | **Can someone explain what the handicap means on the scorecard?** |

**Target keywords:** `how to score a lost ball`, `how to count strokes in golf`, `what counts as a stroke in golf`, `penalty stroke rules`, `how to fill out a golf scorecard`, `what does the handicap row mean on a scorecard`, `maximum score per hole for handicap`, `net double bogey`

---

## Cluster 3 — "I don't keep score properly" (the emotional core)

These are the threads where your customer confesses. Enormous engagement, zero commercial content serving it.

| Comments | Verbatim question |
|---:|---|
| 574 | **Does anyone else prefer to score this way?** |
| 314 | **How many of you don't keep score?** |
| 306 | **Anyone else reuse scorecards?** |
| 271 | **How I keep score** |
| 273 | **What's the most frustrating thing to happen when golfing?** |
| 130 | **What is your personal rule? (Mine is: Never keep score at a course you've never played at.)** |

**Target keywords:** `keeping score in golf`, `i lose count of my strokes`, `how to keep score without a scorecard`, `should i keep score in golf`, `keeping score as a beginner golfer`, `how to remember your golf score`

---

## Draft FAQ (in customers' own language)

Use these near-verbatim. The phrasing is theirs, not marketing's.

**Q: I lose count of my strokes on a hole. What do I do?**
A: You're not alone — golfers do this constantly, and the usual fix is a bad one: writing down a plausible number. ("I would lose count and just go with a double" is a real quote from r/golf.) SimplyStroke logs each stroke as it happens, so there's no count to lose and nothing to reconstruct on the next tee.

**Q: How do I score a lost ball?**
A: Stroke and distance — one penalty stroke, replay from the previous spot. Under the modern local rule many casual rounds use, you can instead drop near where the ball was lost for two penalty strokes, which keeps pace of play. [Expand into full article — 222 comments of debate on this one thread alone.]

**Q: How do I count strokes on the green?**
A: Every putt is a stroke. It's the most common place people undercount, because tap-ins feel free. [Expand.]

**Q: Do I need a subscription?**
A: No. [If true, this is your single strongest marketing claim — the loudest, most upvoted complaint in 238,854 comments is recurring app fees.]

**Q: Do I have to take my phone out on every shot?**
A: [Answer this honestly and prominently. "I don't bring my phone on the golf course" is an upvoted sentiment, and every competitor loses users to data-entry friction: "I hate that I can't just tell it I missed the green, it demands to know if I was long, short, left, right..."]

**Q: How is this different from 18Birdies / Arccos / TheGrint?**
A: [Lean on the documented complaints: bloat, subscription cost, taps per hole. See `COMPETITOR-TEARDOWN.md` for quotable evidence.]

**Q: Will this update my handicap / GHIN?**
A: [Must answer. GHIN gets 1,765 mentions, universally grudging — "I end up having to use pen/paper and entering on GHIN after." Solving that double entry is a real feature.]

---

## What NOT to optimise for

**`golf app for ADHD`** and its variants. The search demand isn't there and the corpus proves it: 1 comment in 238,854 connects ADHD to losing count. Writing this page would be writing for an audience of one.

If you want the ADHD audience, write the article they'd actually read — *how to stay focused between shots*, *how not to lose your ball*, *what to do when the course backs up* — because that's what they complain about ("Anyone see where that landed?", +311). That earns goodwill in r/golf. It doesn't sell a scorecard.
