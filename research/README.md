# research/

Source material from the r/golf corpus scrape (July 2026).

**Corpus:** 1,789,082 posts scanned across r/golf, r/golftips, r/ADHD, r/ADD,
r/neurodiversity, r/Neurodivergent, r/adhd_anxiety, from each subreddit's
inception (r/golf back to April 2010) through July 2026. 36,218 matched the
relevance filter. 2,437 threads hydrated to full comment trees →
**238,854 comments**. Gathered via the Arctic Shift archive (Pushshift
successor).

| File | What's in it |
|---|---|
| `CUSTOMER-KNOWLEDGEBASE.md` | The headline findings. What golfers actually complain about, the ADHD null result, the behavioural threads, positioning implications. |
| `COMPETITOR-TEARDOWN.md` | Share of voice by app, the five complaint clusters with verbatim quotes and upvote counts, what competitors are genuinely praised for. |
| `SEO-FAQ.md` | Real question-form thread titles with comment counts as a demand proxy, clustered by intent. |

## The raw data is NOT in this repo

These three files are **summaries**. The underlying data lives outside the repo:

```
data/posts_index.csv       36,218 threads: title, sub, date, score, comments, permalink
data/pain_quotes.csv       15,279 comments tagged adhd / lost_count, with upvotes + permalink
data/competitor_quotes.csv competitor mentions split complaints/praise, upvotes + permalink
data/seo_questions.csv     1,109 question-form post titles
data/corpus.db             full SQLite corpus (36,218 posts / 238,854 comments)
```

**If you need a quote or a permalink that isn't in these three summaries, ask
Jared for the CSVs. Do not invent one.** Every quote published on the site must
trace to a real comment with a real permalink. A fabricated Reddit quote on a
page *about* Reddit is the one mistake that cannot be walked back.

## What this material is used for

- `../CONTENT-STRATEGY-V2.md` — the repositioning it triggered
- `../MARKETING-PLAN.md` — the six plays it surfaced
- `../REDDIT-SEO-PLAY.md` — the Reddit-modifier content system
