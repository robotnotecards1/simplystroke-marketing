#!/usr/bin/env python3
"""
PHASE 1 -- ENUMERATE. Bulk-pull the *entire* post history of all 7 subreddits
from the Arctic Shift archive, filter locally, keep only what's relevant.

WHY THIS SHAPE
  Two rate-limit scopes exist, and the difference dictates the architecture:
    * text search (query=/body=)  -> scope "slow":   5 requests / minute. Useless at scale.
    * plain listing (no text arg) -> scope "global": ~1000 / window, 8-way parallel OK.
  So we do NOT search. We enumerate everything since subreddit inception via plain
  listing (which pages by created_utc back to 2008) and apply the keyword filter on
  our own machine, where it's free. This is also the only way to reach threads that
  Reddit's own search will never surface.

Year-sharded so the pull parallelises; every shard checkpoints, so the 45s shell-call
cap is survivable. Re-run until it prints ENUMERATION COMPLETE.
"""
import json, os, re, sqlite3, threading, time, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone

BASE = "https://arctic-shift.photon-reddit.com/api"
UA = "SimplyStroke-research/0.1 (customer research; jared@jaredmoore.com)"
DATA = os.environ.get("SS_DATA", "/tmp/ss-reddit")
os.makedirs(DATA, exist_ok=True)
DB = os.path.join(DATA, "corpus.db")

TIME_BUDGET = float(os.environ.get("TIME_BUDGET", 36))
WORKERS = 8
PAGE = 100
START = time.time()

GOLF_SUBS = ["golf", "golftips"]
ADHD_SUBS = ["ADHD", "ADD", "neurodiversity", "Neurodivergent", "adhd_anxiety"]
SUBS = GOLF_SUBS + ADHD_SUBS

# ---- local filters (free, unlike the API's search) --------------------------
APPS = (r"18\s?birdies|the\s?grint|\bgrint\b|golfshot|hole\s?19|arccos|golflogix|"
        r"swing\s?u\b|swingu|shot\s?scope|garmin\s?golf|\bghin\b|golf\s?pad|golfpad|"
        r"mscore|tag\s?marshal|v1\s?game|birdie\s?apps?")
CATEGORY = r"golf app|scoring app|scorecard app|handicap app|score.{0,12}app|app.{0,12}keep.{0,10}score"
PAIN = (r"keep(ing)?\s+(track\s+of\s+)?(my\s+|the\s+)?score|lost\s+count|lose\s+count|"
        r"lost\s+track\s+of\s+(my\s+)?(score|strokes?)|forg[eo]t\s+(my\s+|how many\s+)?"
        r"(score|strokes?)|how\s+many\s+(strokes?|shots?)\s+(i|did)|count(ing)?\s+(my\s+)?"
        r"strokes?|stroke\s+count|scorecard|mental\s+math|add(ing)?\s+up\s+(my\s+)?score|"
        r"can'?t\s+remember\s+(my\s+)?(score|how many)")
NEURO = r"\badhd\b|\badd\b|attention\s+deficit|neurodiverg|neurodivers|dyscalculia|executive\s+function|\bautis"
GOLF = r"\bgolf|\bgolfing\b|\bgolfer\b|driving\s+range|\bputt|\btee\s+(time|box|off)\b|\bcaddie\b|\bfairway\b"

GOLF_SUB_RE = re.compile(f"({APPS})|({CATEGORY})|({PAIN})|({NEURO})", re.I)
ADHD_SUB_RE = re.compile(GOLF, re.I)

FIELDS = "id,title,selftext,created_utc,score,num_comments,subreddit,author,link_flair_text"
EPOCH_START = 1180000000          # mid-2007, before any of these subs existed
NOW = int(time.time())
YEAR = 365 * 24 * 3600

db_lock = threading.Lock()


def log(m):
    print(f"[{datetime.now():%H:%M:%S}] {m}", flush=True)


def budget_left():
    return TIME_BUDGET - (time.time() - START)


def get(params, tries=3):
    url = f"{BASE}/posts/search?" + urllib.parse.urlencode(params)
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=35) as r:
                p = json.loads(r.read().decode("utf-8", "replace"))
            if p.get("error"):
                raise RuntimeError(p["error"])
            return p.get("data") or [], True
        except Exception as e:
            if i == tries - 1 or budget_left() < 6:
                return [], False
            time.sleep(3 * (i + 1))
    return [], False


def relevant(sub, title, selftext):
    text = f"{title or ''}\n{selftext or ''}"
    rx = GOLF_SUB_RE if sub.lower() in ("golf", "golftips") else ADHD_SUB_RE
    m = rx.search(text)
    return m.group(0).lower().strip() if m else None


def run_shard(con, sub, lo, hi):
    """Page one (sub, year) window to exhaustion, checkpointing as we go."""
    key = f"{sub}|{lo}"
    with db_lock:
        row = con.execute("SELECT after, scanned, kept FROM shard WHERE k=?", (key,)).fetchone()
    after, scanned, kept = row if row else (lo, 0, 0)

    while budget_left() > 6:
        params = {"subreddit": sub, "limit": PAGE, "sort": "asc",
                  "after": after, "before": hi, "fields": FIELDS}
        batch, ok = get(params)
        if not ok:
            return "stall", scanned, kept
        if not batch:
            with db_lock:
                con.execute("INSERT OR REPLACE INTO shard VALUES(?,?,?,?,1)",
                            (key, after, scanned, kept))
                con.commit()
            return "done", scanned, kept

        rows = []
        for r in batch:
            hit = relevant(sub, r.get("title"), r.get("selftext"))
            if hit:
                rows.append((r["id"], r.get("subreddit"), r.get("author"), r.get("created_utc"),
                             r.get("title"), r.get("selftext"), r.get("score"),
                             r.get("num_comments"),
                             f"https://www.reddit.com/r/{r.get('subreddit')}/comments/{r['id']}/",
                             r.get("link_flair_text"), hit))
        scanned += len(batch)
        kept += len(rows)
        newest = max(x["created_utc"] for x in batch)
        after = newest + 1 if newest <= after else newest
        finished = 1 if len(batch) < PAGE else 0

        with db_lock:
            con.executemany("""INSERT INTO posts(id,subreddit,author,created_utc,title,selftext,
                score,num_comments,permalink,flair,matched) VALUES(?,?,?,?,?,?,?,?,?,?,?)
                ON CONFLICT(id) DO NOTHING""", rows)
            con.execute("INSERT OR REPLACE INTO shard VALUES(?,?,?,?,?)",
                        (key, after, scanned, kept, finished))
            con.commit()
        if finished:
            return "done", scanned, kept
    return "budget", scanned, kept


def main():
    con = sqlite3.connect(DB, check_same_thread=False)
    con.executescript("""
      CREATE TABLE IF NOT EXISTS posts(
        id TEXT PRIMARY KEY, subreddit TEXT, author TEXT, created_utc INT,
        title TEXT, selftext TEXT, score INT, num_comments INT, permalink TEXT,
        flair TEXT, matched TEXT, hydrated INT DEFAULT 0);
      CREATE TABLE IF NOT EXISTS shard(
        k TEXT PRIMARY KEY, after INT, scanned INT, kept INT, done INT DEFAULT 0);
      CREATE TABLE IF NOT EXISTS comments(
        id TEXT PRIMARY KEY, post_id TEXT, subreddit TEXT, author TEXT, created_utc INT,
        body TEXT, score INT, parent_id TEXT, permalink TEXT);
      CREATE INDEX IF NOT EXISTS c_post ON comments(post_id);
    """)
    con.commit()

    shards = []
    for sub in SUBS:
        t = EPOCH_START
        while t < NOW:
            shards.append((sub, t, min(t + YEAR, NOW)))
            t += YEAR
    done = {r[0] for r in con.execute("SELECT k FROM shard WHERE done=1")}
    todo = [s for s in shards if f"{s[0]}|{s[1]}" not in done]
    log(f"shards: {len(shards) - len(todo)}/{len(shards)} complete, working {len(todo)}")

    if todo:
        with ThreadPoolExecutor(max_workers=WORKERS) as ex:
            list(ex.map(lambda s: run_shard(con, *s), todo[:WORKERS * 6]))

    sc = con.execute("SELECT COALESCE(SUM(scanned),0), COALESCE(SUM(kept),0) FROM shard").fetchone()
    p = con.execute("SELECT COUNT(*) FROM posts").fetchone()[0]
    left = len(shards) - con.execute("SELECT COUNT(*) FROM shard WHERE done=1").fetchone()[0]
    log(f"scanned {sc[0]:,} posts | kept {p:,} relevant | {left} shards left")
    if left == 0:
        log("ENUMERATION COMPLETE")
    con.close()


if __name__ == "__main__":
    main()
