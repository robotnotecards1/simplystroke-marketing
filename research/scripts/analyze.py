#!/usr/bin/env python3
"""PHASE 3 -- MINE. Turn the corpus into the three deliverables' raw material."""
import json, os, re, sqlite3, collections

DATA = os.environ.get("SS_DATA", "/tmp/ss-reddit")
con = sqlite3.connect(os.path.join(DATA, "corpus.db"))
OUT = os.path.join(DATA, "mined")
os.makedirs(OUT, exist_ok=True)

COMPETITORS = {
    "18Birdies": r"18\s?birdies",
    "TheGrint":  r"the\s?grint|\bgrint\b",
    "Golfshot":  r"golf\s?shot\b",
    "Hole19":    r"hole\s?19",
    "Arccos":    r"arccos",
    "GolfLogix": r"golf\s?logix",
    "SwingU":    r"swing\s?u\b|swingu",
    "Shot Scope":r"shot\s?scope",
    "Garmin Golf":r"garmin",
    "GHIN":      r"\bghin\b",
    "Golf Pad":  r"golf\s?pad",
    "V1 Game":   r"v1\s?game",
}
COMPLAINT = re.compile(
    r"\b(clunky|bloated|buggy|bug|crash|slow|laggy|lag|ads?\b|advertis|paywall|expensive|pricey|"
    r"subscription|sub fee|rip ?off|overpriced|hate|annoying|frustrat|cluttered|confusing|"
    r"unusable|garbage|trash|awful|terrible|useless|battery|drains?|too many|too much|"
    r"stopped using|deleted|uninstall|switch(ed)? (away|from|to)|cancel(l?ed)?|worst|"
    r"doesn'?t work|not worth|waste of)", re.I)
PRAISE = re.compile(r"\b(love|great|awesome|excellent|best|simple|clean|easy|perfect|solid|recommend)\b", re.I)

ADHD = re.compile(r"\badhd\b|attention deficit|neurodiverg|neurodivers|dyscalculia|executive function", re.I)
COUNTLOSS = re.compile(
    r"lost count|lose count|losing count|lost track|forg[eo]t (my |the |how many)?(score|stroke|shot|count)|"
    r"can'?t remember (my |the |how many)|remember(ing)? (my |the )?(score|strokes?|how many)|"
    r"count(ing)? (my |the )?(strokes?|shots?)|keep(ing)? (track of )?(my |the )?score|"
    r"how many (strokes?|shots?) (i|did)|mental math|do the math|adding up|add up", re.I)
QUESTION = re.compile(r"^(how|what|why|is there|does anyone|anyone else|can i|which|any(one)? (know|use)|best )", re.I)


def rows(q, p=()):
    return con.execute(q, p).fetchall()


def clean(t):
    t = re.sub(r"\s+", " ", (t or "")).strip()
    return t


# ---------------------------------------------------------------- competitors
comp = {k: {"mentions": 0, "complaints": [], "praise": []} for k in COMPETITORS}
for cid, body, score, perm, sub in rows(
        "SELECT id, body, score, permalink, subreddit FROM comments WHERE body IS NOT NULL"):
    if not body or len(body) < 15:
        continue
    for name, rx in COMPETITORS.items():
        if re.search(rx, body, re.I):
            comp[name]["mentions"] += 1
            # isolate the sentence that names the app
            for sent in re.split(r"(?<=[.!?\n])\s+", body):
                if re.search(rx, sent, re.I) and len(sent) > 20:
                    rec = {"q": clean(sent)[:400], "score": score or 0, "url": perm, "sub": sub}
                    if COMPLAINT.search(sent):
                        comp[name]["complaints"].append(rec)
                    elif PRAISE.search(sent):
                        comp[name]["praise"].append(rec)
for name in comp:
    for k in ("complaints", "praise"):
        comp[name][k] = sorted(comp[name][k], key=lambda r: -r["score"])[:40]
json.dump(comp, open(f"{OUT}/competitors.json", "w"), indent=1)
print("=== competitor mentions ===")
for n, d in sorted(comp.items(), key=lambda x: -x[1]["mentions"]):
    print(f"  {n:12} {d['mentions']:5,} mentions | {len(d['complaints'])} complaint quotes")

# ---------------------------------------------------------- ADHD x golf x math
adhd_golf = []
for cid, body, score, perm, sub, pid in rows(
        "SELECT id, body, score, permalink, subreddit, post_id FROM comments WHERE body IS NOT NULL"):
    if not body or len(body) < 30:
        continue
    has_adhd = bool(ADHD.search(body))
    has_count = bool(COUNTLOSS.search(body))
    golfsub = (sub or "").lower() in ("golf", "golftips")
    if (golfsub and has_adhd) or (not golfsub and has_adhd and re.search(r"\bgolf", body, re.I)) \
       or (golfsub and has_count):
        adhd_golf.append({
            "q": clean(body)[:700], "score": score or 0, "url": perm, "sub": sub,
            "adhd": has_adhd, "countloss": has_count, "post": pid})
adhd_golf.sort(key=lambda r: (-(r["adhd"] and r["countloss"]), -r["score"]))
json.dump(adhd_golf[:400], open(f"{OUT}/adhd_golf.json", "w"), indent=1)
both = [r for r in adhd_golf if r["adhd"] and r["countloss"]]
print(f"\n=== ADHD x golf ===\n  {len(adhd_golf):,} relevant comments | {len(both)} mention ADHD *and* losing count")

# ------------------------------------------------------------------- SEO / FAQ
questions = collections.Counter()
qrecs = []
for t, perm, nc, sub in rows(
        "SELECT title, permalink, num_comments, subreddit FROM posts WHERE title IS NOT NULL"):
    t = clean(t)
    if QUESTION.match(t) and (re.search(r"app|score|scorecard|count|handicap|track", t, re.I)):
        questions[t.lower()] += 1
        qrecs.append({"q": t, "url": perm, "nc": nc or 0, "sub": sub})
qrecs.sort(key=lambda r: -r["nc"])
json.dump(qrecs[:250], open(f"{OUT}/questions.json", "w"), indent=1)
print(f"\n=== question-form post titles (FAQ/SEO seed) ===\n  {len(qrecs):,} found")
for r in qrecs[:12]:
    print(f"   [{r['nc']:4} comments] {r['q'][:88]}")
print("\nwrote:", OUT)
