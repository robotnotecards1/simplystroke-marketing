#!/usr/bin/env python3
"""
SimplyStroke Reddit knowledgebase builder -- Phase 1 (enumerate).

WHY ARCTIC SHIFT, NOT FIRECRAWL / REDDIT DIRECTLY
  Reddit's search and .json endpoints cap out long before "everything ever", and
  return 403 from a datacenter IP regardless. You cannot enumerate a subreddit's
  full history by crawling -- Reddit will not serve you the list of URLs.
  Arctic Shift is the Pushshift-successor archive built for exactly this: it pages
  by created_utc back to subreddit inception. Crawling is only good for hydration.

HARD-WON API NOTES (do not rediscover these)
  - 'permalink' is not a valid field  -> HTTP 400. Rebuild links from the id.
  - Text search (query=/body=) caps at limit=50. limit=100 -> HTTP 422.
  - 'after=0' -> HTTP 400. Omit 'after' on the first page.
  - Concurrency of even 4 -> every request returns "Timeout. Maybe slow down a bit".
    Stay strictly sequential.

RUNTIME MODEL
  The sandbox kills background processes when the shell call returns and caps calls
  at 45s, so this script is designed to be run repeatedly. It checkpoints a cursor
  after every page and exits when TIME_BUDGET is hit. Re-run until it prints
  "PHASE 1 COMPLETE". Nothing is redone.
"""
import json, os, sqlite3, time, urllib.parse, urllib.request
from datetime import datetime

BASE = "https://arctic-shift.photon-reddit.com/api"
UA = "SimplyStroke-research/0.1 (customer research; jared@jaredmoore.com)"
DATA = os.environ.get("SS_DATA", "/tmp/ss-reddit")
os.makedirs(DATA, exist_ok=True)
DB = os.path.join(DATA, "corpus.db")

TIME_BUDGET = float(os.environ.get("TIME_BUDGET", 36))
SLEEP = 0.4           # the API's own ~2.5s latency does most of the pacing
MAX_RETRIES = 3
BACKOFF = 6
PER_QUERY_CAP = 600
SEARCH_LIMIT = 50

GOLF_SUBS = ["golf", "golftips"]
ADHD_SUBS = ["ADHD", "ADD", "neurodiversity", "Neurodivergent", "adhd_anxiety"]

GOLF_QUERY_TERMS = [
    "18birdies", "thegrint", "grint", "golfshot", "hole 19", "arccos",
    "golflogix", "swingu", "shot scope", "garmin golf", "ghin",
    "golf app", "scorecard app", "handicap app",
    "scorecard", "keeping score", "lost count", "stroke count", "mental math",
    "count my strokes", "forgot my score",
    "adhd", "attention deficit", "neurodivergent", "dyscalculia",
]
ADHD_QUERY_TERMS = ["golf", "golfing", "golfer", "driving range"]

QUERIES = (
    [(s, t, k) for s in GOLF_SUBS for t in GOLF_QUERY_TERMS for k in ("posts", "comments")]
    + [(s, t, k) for s in ADHD_SUBS for t in ADHD_QUERY_TERMS for k in ("posts", "comments")]
)

POST_FIELDS = "id,title,selftext,created_utc,score,num_comments,subreddit,author,link_flair_text,url"
COMMENT_FIELDS = "id,body,created_utc,score,link_id,parent_id,subreddit,author"

START = time.time()


def log(m):
    print(f"[{datetime.now():%H:%M:%S}] {m}", flush=True)


def budget_left():
    return TIME_BUDGET - (time.time() - START)


def post_link(sub, pid):
    return f"https://www.reddit.com/r/{sub}/comments/{pid}/"


def comment_link(sub, link_id, cid):
    return f"https://www.reddit.com/r/{sub}/comments/{(link_id or '').replace('t3_','')}/_/{cid}/"


def get(path, params):
    url = f"{BASE}/{path}?" + urllib.parse.urlencode(params)
    for attempt in range(MAX_RETRIES):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=40) as r:
                payload = json.loads(r.read().decode("utf-8", "replace"))
            if payload.get("error"):
                raise RuntimeError(payload["error"])
            return payload.get("data") or [], True
        except Exception as e:
            if attempt == MAX_RETRIES - 1 or budget_left() < 8:
                log(f"    stall ({e})")
                return [], False
            time.sleep(BACKOFF)
    return [], False


def save(con, kind, rows, term):
    cur = con.cursor()
    for r in rows:
        if kind == "posts":
            cur.execute("""INSERT INTO posts(id,subreddit,author,created_utc,title,selftext,
                score,num_comments,permalink,flair,url,matched) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)
                ON CONFLICT(id) DO UPDATE SET matched = matched||','||excluded.matched""",
                (r["id"], r.get("subreddit"), r.get("author"), r.get("created_utc"),
                 r.get("title"), r.get("selftext"), r.get("score"), r.get("num_comments"),
                 post_link(r.get("subreddit"), r["id"]), r.get("link_flair_text"),
                 r.get("url"), term))
        else:
            cur.execute("""INSERT INTO comments(id,subreddit,author,created_utc,body,score,
                link_id,parent_id,permalink,matched) VALUES(?,?,?,?,?,?,?,?,?,?)
                ON CONFLICT(id) DO UPDATE SET matched = matched||','||excluded.matched""",
                (r["id"], r.get("subreddit"), r.get("author"), r.get("created_utc"),
                 r.get("body"), r.get("score"), r.get("link_id"), r.get("parent_id"),
                 comment_link(r.get("subreddit"), r.get("link_id"), r["id"]), term))


def main():
    con = sqlite3.connect(DB)
    con.executescript("""
      CREATE TABLE IF NOT EXISTS posts(
        id TEXT PRIMARY KEY, subreddit TEXT, author TEXT, created_utc INT,
        title TEXT, selftext TEXT, score INT, num_comments INT, permalink TEXT,
        flair TEXT, url TEXT, matched TEXT);
      CREATE TABLE IF NOT EXISTS comments(
        id TEXT PRIMARY KEY, subreddit TEXT, author TEXT, created_utc INT,
        body TEXT, score INT, link_id TEXT, parent_id TEXT, permalink TEXT,
        matched TEXT, hydrated INT DEFAULT 0);
      -- cursor: per-query paging checkpoint so a 45s shell call can resume mid-query
      CREATE TABLE IF NOT EXISTS cursor(
        k TEXT PRIMARY KEY, after INT, got INT DEFAULT 0, done INT DEFAULT 0);
      CREATE INDEX IF NOT EXISTS c_link ON comments(link_id);
    """)
    con.commit()

    state = {r[0]: (r[1], r[2], r[3]) for r in con.execute("SELECT k,after,got,done FROM cursor")}
    todo = [q for q in QUERIES if not state.get(f"{q[0]}|{q[1]}|{q[2]}", (0, 0, 0))[2]]
    log(f"{len(QUERIES) - len(todo)}/{len(QUERIES)} queries already complete")

    for sub, term, kind in todo:
        if budget_left() < 8:
            break
        key = f"{sub}|{term}|{kind}"
        after, got, _ = state.get(key, (None, 0, 0))
        field, fields = ("query", POST_FIELDS) if kind == "posts" else ("body", COMMENT_FIELDS)

        while budget_left() > 8 and got < PER_QUERY_CAP:
            params = {"subreddit": sub, field: term, "limit": SEARCH_LIMIT,
                      "sort": "asc", "fields": fields}
            if after:
                params["after"] = after
            batch, ok = get(f"{kind}/search", params)
            if not ok:
                break
            if not batch:
                con.execute("INSERT OR REPLACE INTO cursor VALUES(?,?,?,1)", (key, after, got))
                con.commit()
                log(f"  r/{sub} {kind} '{term}' -> {got} (complete)")
                break
            save(con, kind, batch, term)
            got += len(batch)
            newest = max(x["created_utc"] for x in batch)
            after = newest + 1 if (after is not None and newest <= after) else newest
            finished = 1 if len(batch) < SEARCH_LIMIT or got >= PER_QUERY_CAP else 0
            con.execute("INSERT OR REPLACE INTO cursor VALUES(?,?,?,?)", (key, after, got, finished))
            con.commit()
            if finished:
                log(f"  r/{sub} {kind} '{term}' -> {got} (complete)")
                break
            time.sleep(SLEEP)

    p = con.execute("SELECT COUNT(*) FROM posts").fetchone()[0]
    c = con.execute("SELECT COUNT(*) FROM comments").fetchone()[0]
    left = con.execute("SELECT COUNT(*) FROM cursor WHERE done=1").fetchone()[0]
    log(f"corpus: {p} posts, {c} comments | {left}/{len(QUERIES)} queries done")
    if left >= len(QUERIES):
        log("PHASE 1 COMPLETE")
    con.close()


if __name__ == "__main__":
    main()
