// Generate the course-directory PREVIEW fixtures: a random 1-12 rounds per
// course, male display names only, plausible scores scaled to each course's
// difficulty. Output:
//
//   data/demo/<slug>.json — build-time fixtures the PREVIEW uses (so a preview
//     build shows the populated design with no Vercel/Supabase config). Never
//     used in production; production reads real public_rounds/course_stats.
//
// The production leaderboards are now driven by the Course Directory Data Engine
// (opt-in posting -> public_rounds -> course_stats). This script no longer emits
// any SQL: real seeding lives in the mobile repo
// (scripts/generate-demo-rounds.mjs), which writes through the engine (hole
// cards + trigger-maintained stats) instead of INSERTing course_stats directly.
// Do NOT resurrect a SQL writer here — it must never run against prod.
//
// Deterministic (seeded PRNG) so re-runs don't churn the diff.
//
//   node scripts/generate-demo-data.mjs
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const researchDir = join(root, "data", "research");
const outDir = join(root, "data", "demo");
mkdirSync(outDir, { recursive: true });

// Deterministic PRNG (mulberry32) seeded from a string.
function seeded(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A fixed pool of male golfers (name + home city). Bucket-list courses draw
// players from across the country, so cities are varied, not course-local.
const GOLFERS = [
  { name: "Marcus R.", city: "San Diego, CA" },
  { name: "Kevin T.", city: "Charlotte, NC" },
  { name: "Tom Sullivan", city: "Boston, MA" },
  { name: "Diego Alvarez", city: "Scottsdale, AZ" },
  { name: "Ben Walsh", city: "Chicago, IL" },
  { name: "Wes Parker", city: "Austin, TX" },
  { name: "Cole Reyes", city: "Denver, CO" },
  { name: "Nate Brooks", city: "Nashville, TN" },
  { name: "Ryan O'Neil", city: "Seattle, WA" },
  { name: "Greg Tanaka", city: "San Jose, CA" },
  { name: "Dave Ellis", city: "Columbus, OH" },
  { name: "Paul Kim", city: "Portland, OR" },
  { name: "Mike Frye", city: "Tampa, FL" },
  { name: "Rob Bauer", city: "Kansas City, MO" },
  { name: "Jack Sutton", city: "Raleigh, NC" },
  { name: "Luke Diaz", city: "Dallas, TX" },
  { name: "Owen Cho", city: "Minneapolis, MN" },
  { name: "Carl Nguyen", city: "Atlanta, GA" },
  { name: "Vince Grant", city: "Phoenix, AZ" },
  { name: "Doug Hayes", city: "Carlsbad, CA" },
  { name: "Brett Cole", city: "St. Louis, MO" },
  { name: "Sean Murphy", city: "Philadelphia, PA" },
];

const LO = [0, 75, 80, 85, 90, 95, 100, 105];
const HI = [74, 79, 84, 89, 94, 99, 104, 200];

for (const file of readdirSync(researchDir).filter((f) => f.endsWith(".json"))) {
  const c = JSON.parse(readFileSync(join(researchDir, file), "utf8"));
  const rnd = seeded(c.slug);
  const par = c.par_total;
  const slope = c.slope_rating ?? 130;

  // Random 1-12 rounds for this course (at least one).
  const n = 1 + Math.floor(rnd() * 12);

  // Distinct golfers for this course's board.
  const idxPool = GOLFERS.map((_, i) => i);
  for (let i = idxPool.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [idxPool[i], idxPool[j]] = [idxPool[j], idxPool[i]];
  }
  const chosen = idxPool.slice(0, Math.min(n, GOLFERS.length));

  // A mid-handicap plays a hard course ~14-20 over; scale by slope, add noise.
  const toParBase = 12 + ((slope - 113) / 42) * 8;
  const teeNames = c.tees.map((t) => t.name);

  const rounds = chosen.map((gi, k) => {
    const toPar = Math.max(2, Math.round(toParBase + (rnd() - 0.5) * 12));
    const score = par + toPar;
    return {
      gi,
      score,
      toPar,
      tee: teeNames[Math.min(teeNames.length - 1, Math.floor(rnd() * 2))],
      verified: rnd() > 0.55,
      // Retained only to keep the PRNG draw sequence — and therefore every
      // committed data/demo fixture — identical to before the SQL seed was
      // removed (this draw previously fed the retired 'dayOffset' field). Not
      // otherwise used.
      _seq: 1 + k * 2 + Math.floor(rnd() * 3),
    };
  });
  rounds.sort((a, b) => a.score - b.score);

  const scores = rounds.map((r) => r.score);
  const low = scores[0];
  const avg = +(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  const avgToPar = +(avg - par).toFixed(1);
  const lowGolfer = GOLFERS[rounds[0].gi];

  // Distribution across the 8 buckets, as percentages of these N rounds.
  const counts = new Array(8).fill(0);
  for (const s of scores) {
    for (let b = 0; b < 8; b++) {
      if (s >= LO[b] && s <= HI[b]) { counts[b]++; break; }
    }
  }
  const dist = counts.map((ct) => Math.round((ct / scores.length) * 100));
  const drift = 100 - dist.reduce((a, b) => a + b, 0);
  if (drift !== 0) {
    const maxi = dist.indexOf(Math.max(...dist));
    dist[maxi] += drift;
  }

  // Hardest holes: the four lowest handicap-index holes, synthetic over-par.
  const hcp = c.handicap_per_hole ?? c.par_per_hole.map((_, i) => i + 1);
  const hardest = hcp
    .map((si, i) => ({ hole: i + 1, si, par: c.par_per_hole[i] }))
    .sort((a, b) => a.si - b.si)
    .slice(0, 4)
    .map((h, i) => ({ hole: h.hole, par: h.par, over_par: +(0.9 - i * 0.11 - rnd() * 0.05).toFixed(2) }));

  const leaders = rounds.map((r) => ({
    display_name: GOLFERS[r.gi].name,
    home_city: GOLFERS[r.gi].city,
    tees: r.tee,
    gross_score: r.score,
    score_to_par: r.toPar,
    verified: r.verified,
  }));

  const stats = {
    rounds_count: n,
    avg_score: avg,
    avg_to_par: avgToPar,
    low_round: low,
    low_round_label: `${lowGolfer.name}, ${lowGolfer.city}`,
    hardest_holes: hardest,
    distribution: dist,
    updated_at: "2026-07-18",
  };

  writeFileSync(join(outDir, `${c.slug}.json`), JSON.stringify({ stats, leaders }, null, 2));
  console.log(`${c.slug}: ${n} rounds, avg ${avg} (+${avgToPar}), low ${low}`);
}
