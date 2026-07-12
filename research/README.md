# research/

Source material from the r/golf corpus scrape (July 2026). **The raw data is
here.** Every quote published on the site must trace to a row in `data/`.

## The corpus

1,789,082 posts scanned across r/golf, r/golftips, r/ADHD, r/ADD,
r/neurodiversity, r/Neurodivergent and r/adhd_anxiety, from each subreddit's
inception (r/golf back to April 2010) through July 2026. 36,218 matched the
relevance filter. 2,437 threads hydrated to full comment trees →
**238,854 comments**. Gathered via the Arctic Shift archive (the Pushshift
successor), because Reddit's own search cannot page back this far.

## `data/` — the real thing. 100% permalink coverage.

| File | Rows | Columns |
|---|---:|---|
| `competitor_quotes.csv` | 709 | `app, sentiment, upvotes, quote, permalink` |
| `pain_quotes.csv` | 15,279 | `theme, subreddit, upvotes, quote, permalink` |
| `seo_questions.csv` | 250 | `question_title, subreddit, num_comments, permalink` |
| `posts_index.csv` | 36,218 | `id, subreddit, date, score, num_comments, title, matched_term, permalink` |

**Every row in every file has a real permalink.** There is no reason to publish
an unsourced quote, and therefore no excuse for one.

`corpus.db` (the full 174MB SQLite corpus — all 36,218 posts and 238,854
comments, re-queryable) is **gitignored**. It lives at
`../reddit-research/data/corpus.db`.

## `scripts/` — how it was gathered

`scrape.py`, `enumerate_posts.py`, `hydrate.py`, `analyze.py`. These are the
methodology. Anyone asking "how do you know that?" gets pointed here.

## The summaries

`CUSTOMER-KNOWLEDGEBASE.md`, `COMPETITOR-TEARDOWN.md`, `SEO-FAQ.md` — readable
digests of the above. Useful for orientation. **They are not the source of
truth; `data/` is.** Several quotes in the summaries omit their permalink. The
CSVs have it. Always go back to the CSV.

## The rule

> **Never publish a quote, an upvote count or a statistic that you cannot point
> at a row in `data/` for.**

A fabricated Reddit quote on a page whose whole premise is *"we read the
Reddit"* is the one mistake that cannot be walked back. There is no need to
take the risk: the data is right here, and it is complete.

## What this material is used for

- `../CONTENT-STRATEGY-V2.md` — the repositioning it triggered
- `../MARKETING-PLAN.md` — the six plays it surfaced
- `../REDDIT-SEO-PLAY.md` — the Reddit-modifier content system
- `../REDDIT-RESOURCE-PAGE-BRIEF.md` — the build brief for `/reddit/`
