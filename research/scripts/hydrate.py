#!/usr/bin/env python3
"""
PHASE 2 -- HYDRATE. Pull the full comment tree for every thread in the priority set.

The post index tells us where the conversation is; the comments are the conversation.
All of the verbatim customer language -- the competitor complaints, the "I lost count
on 7 and just wrote a 6", the FAQ phrasing -- lives here.

/api/comments/tree is on the fast "global" rate-limit scope, so this parallelises.
Resumable: posts.hydrated flips to 1 once its tree is stored.
"""
import json, os, re, sqlite3, threading, time, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

BASE = "https://arctic-shift.photon-reddit.com/api"
UA = "SimplyStroke-research/0.1 (customer research; jared@jaredmoore.com)"
DATA = os.environ.get("SS_DATA", "/tmp/ss-reddit")
DB = os.path.join(DATA, "corpus.db")
TIME_BUDGET = float(os.environ.get("TIME_BUDGET", 36))
WORKERS = int(os.environ.get("WORKERS", 48))
START = time.time()
db_lock = threading.Lock()

# --- priority regexes (\badd\b removed: it matched the verb "add" 7k times) ---
APPS = re.compile(r"18\s?birdies|the\s?grint|\bgrint\b|golfshot|hole\s?19|arccos|golflogix|"
                  r"swing\s?u\b|swingu|shot\s?scope|garmin\s?golf|\bghin\b|golf\s?pad|"
                  r"golf app|scoring app|scorecard app|handicap app", re.I)
NEURO = re.compile(r"\badhd\b|\badd\b(?=\s*(/|or|,)?\s*(adhd|inattentive|diagnos))|attention deficit|"
                   r"neurodiverg|neurodivers|dyscalculia|executive function|\bautis", re.I)
PAIN = re.compile(r"lost count|lose count|lost track of|forg[eo]t.{0,25}(score|stroke|count|how many)|"
                  r"keep(ing)? (track of )?(my |the )?score|count(ing)? (my )?strokes?|stroke count|"
                  r"mental math|can'?t remember.{0,25}(score|how many)|scorecard", re.I)
GOLF = re.compile(r"\bgolf|\bputt|driving range|\btee off\b", re.I)


def log(m):
    print(f"[{datetime.now():%H:%M:%S}] {m}", flush=True)


def budget_left():
    return TIME_BUDGET - (time.time() - START)


def build_queue(con):
    con.execute("""CREATE TABLE IF NOT EXISTS queue(
        post_id TEXT PRIMARY KEY, tier TEXT, nc INT, done INT DEFAULT 0)""")
    if con.execute("SELECT COUNT(*) FROM queue").fetchone()[0]:
        return
    rows = con.execute("SELECT id,subreddit,title,selftext,score,num_comments FROM posts").fetchall()
    tiers = {"adhd_golf": [], "apps": [], "pain": [], "neuro_in_golf": []}
    for pid, sub, t, s, sc, nc in rows:
        txt = f"{t or ''}\n{s or ''}"
        nc = nc or 0
        golfsub = sub.lower() in ("golf", "golftips")
        if golfsub and NEURO.search(txt):
            tiers["neuro_in_golf"].append((pid, nc))
        elif not golfsub and GOLF.search(txt):
            # substantive only: golf in the title, or a real discussion
            if GOLF.search(t or "") or nc >= 5:
                tiers["adhd_golf"].append((pid, nc))
        elif golfsub and APPS.search(txt) and nc >= 3:
            tiers["apps"].append((pid, nc))
        elif golfsub and PAIN.search(txt) and nc >= 3:
            tiers["pain"].append((pid, nc))

    caps = {"neuro_in_golf": 700, "adhd_golf": 700, "apps": 900, "pain": 700}
    for tier, items in tiers.items():
        items.sort(key=lambda x: -x[1])                     # busiest threads first
        for pid, nc in items[:caps[tier]]:
            con.execute("INSERT OR IGNORE INTO queue(post_id,tier,nc) VALUES(?,?,?)", (pid, tier, nc))
    con.commit()
    for tier in tiers:
        n = con.execute("SELECT COUNT(*) FROM queue WHERE tier=?", (tier,)).fetchone()[0]
        log(f"  queued {tier}: {n}")


def flatten(children, out):
    """Arctic Shift returns Reddit's native Listing format; replies nest under data.replies."""
    for node in children or []:
        d = node.get("data") or {}
        if d.get("body"):
            out.append(d)
        rep = d.get("replies")
        if isinstance(rep, dict):
            flatten((rep.get("data") or {}).get("children"), out)


def fetch_tree(pid):
    url = f"{BASE}/comments/tree?" + urllib.parse.urlencode({"link_id": f"t3_{pid}", "limit": 300})
    for i in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=35) as r:
                p = json.loads(r.read().decode("utf-8", "replace"))
            if p.get("error"):
                raise RuntimeError(p["error"])
            out = []
            flatten(p.get("data") or [], out)
            return out, True
        except Exception:
            if i == 2 or budget_left() < 6:
                return [], False
            time.sleep(2 * (i + 1))
    return [], False


def work(con, pid):
    if budget_left() < 6:
        return 0
    tree, ok = fetch_tree(pid)
    if not ok:
        return 0
    rows = [(c["id"], pid, c.get("subreddit"), c.get("author"), c.get("created_utc"),
             c.get("body"), c.get("score"), c.get("parent_id"),
             "https://www.reddit.com" + (c.get("permalink") or ""))
            for c in tree]
    with db_lock:
        con.executemany("""INSERT INTO comments(id,post_id,subreddit,author,created_utc,body,
            score,parent_id,permalink) VALUES(?,?,?,?,?,?,?,?,?)
            ON CONFLICT(id) DO NOTHING""", rows)
        con.execute("UPDATE queue SET done=1 WHERE post_id=?", (pid,))
        con.commit()
    return len(rows)


def main():
    con = sqlite3.connect(DB, check_same_thread=False)
    build_queue(con)
    todo = [r[0] for r in con.execute("SELECT post_id FROM queue WHERE done=0 ORDER BY nc DESC")]
    log(f"{con.execute('SELECT COUNT(*) FROM queue WHERE done=1').fetchone()[0]}/"
        f"{con.execute('SELECT COUNT(*) FROM queue').fetchone()[0]} threads hydrated")
    if todo:
        with ThreadPoolExecutor(max_workers=WORKERS) as ex:
            list(ex.map(lambda p: work(con, p), todo[:WORKERS * 25]))
    n = con.execute("SELECT COUNT(*) FROM comments").fetchone()[0]
    left = con.execute("SELECT COUNT(*) FROM queue WHERE done=0").fetchone()[0]
    log(f"comments: {n:,} | threads left: {left}")
    if left == 0:
        log("HYDRATION COMPLETE")
    con.close()


if __name__ == "__main__":
    main()
