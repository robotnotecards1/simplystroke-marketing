// Generate synthetic scoreboard + leaderboard fixtures (data/demo/<slug>.json)
// so a preview build with NEXT_PUBLIC_DEMO_DATA=true shows the fully-populated
// course-page design. This writes NOTHING to the shared Supabase project the
// app and admin use — the numbers are clearly synthetic and live only in the
// repo. Deterministic (seeded PRNG) so re-runs don't churn the diff.
//
//   node scripts/generate-demo-data.mjs
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const researchDir = join(root, "data", "research");
const outDir = join(root, "data", "demo");
mkdirSync(outDir, { recursive: true });

// Deterministic PRNG (mulberry32) seeded from the slug.
function seeded(slug) {
  let h = 1779033703 ^ slug.length;
  for (let i = 0; i < slug.length; i++) {
    h = Math.imul(h ^ slug.charCodeAt(i), 3432918353);
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

const CITY_POOL = {
  CA: ["San Diego", "La Jolla", "Carlsbad", "Encinitas", "Los Angeles", "Irvine"],
  NY: ["Farmingdale", "Massapequa", "Huntington", "Garden City", "Brooklyn", "Bethpage"],
  FL: ["Ponte Vedra Beach", "Jacksonville", "St. Augustine", "Orlando", "Tampa"],
  WA: ["Tacoma", "University Place", "Seattle", "Gig Harbor", "Olympia"],
  NC: ["Pinehurst", "Southern Pines", "Raleigh", "Charlotte", "Aberdeen"],
  OR: ["Bandon", "Coos Bay", "Portland", "Eugene", "Bend"],
  SC: ["Kiawah Island", "Charleston", "Mount Pleasant", "Johns Island", "Seabrook"],
  WI: ["Sheboygan", "Kohler", "Milwaukee", "Madison", "Green Bay"],
};
const FIRST = ["Marcus", "Danielle", "Kevin", "Alex", "Jordan", "Priya", "Tom", "Sara", "Diego", "Grace", "Ben", "Nia", "Wes", "Ivy", "Cole"];
const LAST = ["R.", "P.", "T.", "Nguyen", "Moore", "K.", "S.", "Alvarez", "O'Neil", "Park", "H.", "Diaz", "W.", "L."];

for (const file of readdirSync(researchDir).filter((f) => f.endsWith(".json"))) {
  const c = JSON.parse(readFileSync(join(researchDir, file), "utf8"));
  const rnd = seeded(c.slug);
  const par = c.par_total;
  const slope = c.slope_rating ?? 130;

  // Harder course (higher slope) => higher average to par for a mid handicap.
  const toParBase = 12 + ((slope - 113) / 42) * 8; // ~12 to ~20
  const avgToPar = +(toParBase + (rnd() - 0.5) * 1.5).toFixed(1);
  const avgScore = +(par + avgToPar).toFixed(1);
  const roundsCount = 150 + Math.floor(rnd() * 280);
  const lowToPar = 2 + Math.floor(rnd() * 4);
  const lowRound = par + lowToPar;

  // Score distribution across 8 buckets, roughly bell-shaped around avgScore.
  const bucketLo = [0, 75, 80, 85, 90, 95, 100, 105];
  const bucketHi = [74, 79, 84, 89, 94, 99, 104, 200];
  const weights = bucketLo.map((_, i) => {
    const mid = i === 0 ? 72 : i === 7 ? 110 : (bucketLo[i] + bucketHi[i]) / 2;
    return Math.exp(-((mid - avgScore) ** 2) / (2 * 8 ** 2));
  });
  const wSum = weights.reduce((a, b) => a + b, 0);
  let dist = weights.map((w) => Math.round((w / wSum) * 100));
  // Force the buckets to sum to 100.
  const diff = 100 - dist.reduce((a, b) => a + b, 0);
  dist[3] += diff;
  dist = dist.map((d) => Math.max(0, d));

  // Hardest holes: the four lowest handicap-index holes play the most over par.
  const hcp = c.handicap_per_hole ?? c.par_per_hole.map((_, i) => i + 1);
  const ordered = hcp
    .map((si, i) => ({ hole: i + 1, si, par: c.par_per_hole[i] }))
    .sort((a, b) => a.si - b.si)
    .slice(0, 4);
  const hardest = ordered.map((h, i) => ({
    hole: h.hole,
    par: h.par,
    over_par: +(0.95 - i * 0.09 - rnd() * 0.05).toFixed(2),
  }));

  // Leaderboard: eight rounds ascending from the low round.
  const cities = CITY_POOL[c.state] ?? [c.city];
  const teeNames = c.tees.map((t) => t.name);
  const leaders = [];
  let score = lowRound;
  const usedNames = new Set();
  for (let i = 0; i < 8; i++) {
    let name;
    do {
      name = `${FIRST[Math.floor(rnd() * FIRST.length)]} ${LAST[Math.floor(rnd() * LAST.length)]}`;
    } while (usedNames.has(name));
    usedNames.add(name);
    leaders.push({
      display_name: name,
      home_city: `${cities[Math.floor(rnd() * cities.length)]}, ${c.state}`,
      tees: teeNames[Math.min(teeNames.length - 1, Math.floor(rnd() * 2))],
      gross_score: score,
      score_to_par: score - par,
      verified: rnd() > 0.55,
    });
    score += 1 + Math.floor(rnd() * 3);
  }

  const stats = {
    rounds_count: roundsCount,
    avg_score: avgScore,
    avg_to_par: avgToPar,
    low_round: lowRound,
    low_round_label: `${leaders[0].display_name}, ${leaders[0].home_city}`,
    hardest_holes: hardest,
    distribution: dist,
    updated_at: "2026-07-18",
  };

  writeFileSync(join(outDir, `${c.slug}.json`), JSON.stringify({ stats, leaders }, null, 2));
  console.log(`${c.slug}: avg ${avgScore} (+${avgToPar}), ${roundsCount} rounds, low ${lowRound}`);
}
