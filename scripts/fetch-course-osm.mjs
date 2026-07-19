// Fetch OpenStreetMap golf geometry for each course in data/research/ and
// store it as data/osm/<slug>.json. Run at curation time, not at build time:
// the build must never depend on the Overpass API being up.
//
//   node scripts/fetch-course-osm.mjs            # all courses missing a file
//   node scripts/fetch-course-osm.mjs <slug>     # one course, refetch
//
// Output shape per course: { fetched_at, elements: [{type, tags, geometry}] }
// where geometry is the Overpass `out geom` lat/lon array for ways, and
// relations carry their member ways' geometry. The renderer (lib/courseMap.ts)
// draws leisure=golf_course, golf=fairway/green/tee/bunker/water_hazard and
// golf=hole (with ref = hole number). OSM data is ODbL: every rendered map
// must carry OpenStreetMap attribution.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const researchDir = join(root, "data", "research");
const outDir = join(root, "data", "osm");
mkdirSync(outDir, { recursive: true });

// overpass-api.de 406s requests without a descriptive User-Agent; kumi is the
// fallback mirror when the primary is overloaded.
const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];
const USER_AGENT =
  "SimplyStroke-CourseDirectory/1.0 (https://www.simplystroke.app; hello@simplystroke.app)";

// Golf features within this radius (meters) of the course point. Wide enough
// to cover a full routing from a clubhouse-ish coordinate; multi-course
// facilities are separated later by the renderer's hole filter.
const RADIUS = 2200;

const only = process.argv[2];
const slugs = readdirSync(researchDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .filter((slug) => (only ? slug === only : true));

for (const slug of slugs) {
  const outPath = join(outDir, `${slug}.json`);
  if (!only && existsSync(outPath)) {
    console.log(`skip ${slug} (already fetched)`);
    continue;
  }
  const course = JSON.parse(readFileSync(join(researchDir, `${slug}.json`), "utf8"));
  const { lat, lng } = course;
  if (!lat || !lng) {
    console.warn(`no coordinates for ${slug}, skipping`);
    continue;
  }

  const query = `
[out:json][timeout:90];
(
  way["leisure"="golf_course"](around:${RADIUS},${lat},${lng});
  relation["leisure"="golf_course"](around:${RADIUS},${lat},${lng});
  way["golf"](around:${RADIUS},${lat},${lng});
  relation["golf"](around:${RADIUS},${lat},${lng});
  way["natural"="coastline"](around:${RADIUS},${lat},${lng});
  way["natural"="water"](around:${RADIUS},${lat},${lng});
);
out tags geom;`;

  console.log(`fetching ${slug} ...`);
  let data = null;
  for (const endpoint of OVERPASS_ENDPOINTS) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": USER_AGENT,
      },
      body: `data=${encodeURIComponent(query)}`,
    });
    if (res.ok) {
      data = await res.json();
      break;
    }
    console.warn(`  ${endpoint} -> ${res.status}, trying next`);
  }
  if (!data) {
    console.error(`  all Overpass endpoints failed for ${slug}`);
    process.exitCode = 1;
    continue;
  }
  const elements = (data.elements ?? []).map((el) => ({
    type: el.type,
    id: el.id,
    tags: el.tags ?? {},
    geometry: el.geometry ?? null,
    members: el.members?.map((m) => ({
      role: m.role,
      type: m.type,
      geometry: m.geometry ?? null,
    })),
  }));
  writeFileSync(
    outPath,
    JSON.stringify({ fetched_at: new Date().toISOString(), lat, lng, elements })
  );
  const counts = {};
  for (const el of elements) {
    const key = el.tags.golf ?? el.tags.leisure ?? el.tags.natural ?? "other";
    counts[key] = (counts[key] ?? 0) + 1;
  }
  console.log(`  saved ${elements.length} elements:`, JSON.stringify(counts));
  // Be polite to the public Overpass instance.
  await new Promise((r) => setTimeout(r, 2000));
}
