// Turn raw OSM golf geometry (data/osm/<slug>.json) into a compact, SVG-ready
// routing map (data/maps/<slug>.json) the page renders with zero runtime deps.
// Run at curation time; the build never touches OSM.
//
//   node scripts/build-course-maps.mjs
//
// Why pre-render: keeping the geo math out of `next build` keeps the static
// export deterministic and Core-Web-Vitals-clean (no layout shift, no client
// geo libs). The output is normalized to an 800x560 viewBox so the hero can
// reserve the exact aspect ratio.
//
// Course isolation: the Overpass radius pulls in neighboring courses. Because
// each course's coordinate in data/research is curated to that specific
// course, we take the 18 holes with distinct refs nearest that point. The one
// ambiguous case is a shared-coordinate pair (Torrey North/South), handled by
// POLYGON_OVERRIDES which names the exact leisure=golf_course way to clip to.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const osmDir = join(root, "data", "osm");
const outDir = join(root, "data", "maps");
mkdirSync(outDir, { recursive: true });

const VIEW_W = 800;
const VIEW_H = 560;
const PAD = 40;

// slug -> exact leisure=golf_course way name to clip holes to, for facilities
// where the nearest-18 heuristic can't separate co-located courses.
const POLYGON_OVERRIDES = {
  "torrey-pines-south": "Torrey Pines South Course",
  "torrey-pines-north": "Torrey Pines North Course",
};

function toRad(d) { return (d * Math.PI) / 180; }

// Equirectangular projection is accurate to well under a pixel at course
// scale. Returns raw (x, y) in a local meters-ish frame; scaled to the
// viewBox afterward. y is negated so north is up.
function project(lat, lng, lat0) {
  const x = toRad(lng) * Math.cos(toRad(lat0));
  const y = -toRad(lat);
  return [x, y];
}

function centroid(points) {
  let x = 0, y = 0;
  for (const p of points) { x += p[0]; y += p[1]; }
  return [x / points.length, y / points.length];
}

// Ray-casting point-in-polygon on raw lat/lng.
function inPolygon(lat, lng, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const yi = ring[i].lat, xi = ring[i].lon;
    const yj = ring[j].lat, xj = ring[j].lon;
    const intersect =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function haversine(aLat, aLng, bLat, bLng) {
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * Math.asin(Math.sqrt(s));
}

function ringCenter(geom) {
  let lat = 0, lng = 0;
  for (const p of geom) { lat += p.lat; lng += p.lon; }
  return { lat: lat / geom.length, lng: lng / geom.length };
}

for (const file of readdirSync(osmDir).filter((f) => f.endsWith(".json"))) {
  const slug = file.replace(/\.json$/, "");
  const osm = JSON.parse(readFileSync(join(osmDir, file), "utf8"));
  const { lat: cLat, lng: cLng, elements } = osm;

  const holeEls = elements.filter(
    (e) => e.tags.golf === "hole" && e.geometry && e.geometry.length >= 2 && e.tags.ref
  );

  // --- pick this course's 18 holes ------------------------------------------
  let selected;
  const overrideName = POLYGON_OVERRIDES[slug];
  if (overrideName) {
    const poly = elements.find(
      (e) => e.tags.leisure === "golf_course" && e.tags.name === overrideName && e.geometry
    );
    const ring = poly?.geometry ?? [];
    selected = holeEls.filter((h) => {
      const c = ringCenter(h.geometry);
      return inPolygon(c.lat, c.lng, ring);
    });
  } else {
    // Nearest distinct-ref holes to the curated course coordinate.
    const byRef = new Map();
    for (const h of holeEls) {
      const c = ringCenter(h.geometry);
      const d = haversine(cLat, cLng, c.lat, c.lng);
      const ref = h.tags.ref;
      if (!byRef.has(ref) || d < byRef.get(ref).d) byRef.set(ref, { h, d });
    }
    selected = [...byRef.values()].sort((a, b) => a.d - b.d).slice(0, 18).map((x) => x.h);
  }

  if (selected.length === 0) {
    console.warn(`${slug}: no holes selected, skipping map`);
    continue;
  }

  // Bounding box of the selected holes, expanded, is the clip for area
  // features (greens/fairways/bunkers/water) so we don't drag in neighbors.
  let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
  for (const h of selected) {
    for (const p of h.geometry) {
      minLat = Math.min(minLat, p.lat); maxLat = Math.max(maxLat, p.lat);
      minLng = Math.min(minLng, p.lon); maxLng = Math.max(maxLng, p.lon);
    }
  }
  const padLat = (maxLat - minLat) * 0.06;
  const padLng = (maxLng - minLng) * 0.06;
  minLat -= padLat; maxLat += padLat; minLng -= padLng; maxLng += padLng;
  const bboxCenter = (minLat + maxLat) / 2;
  const inBox = (p) => p.lat >= minLat && p.lat <= maxLat && p.lon >= minLng && p.lon <= maxLng;
  const mostlyInBox = (geom) => geom.filter(inBox).length >= geom.length * 0.5;

  // --- project + scale to viewBox -------------------------------------------
  const lat0 = cLat;
  const corners = [
    project(minLat, minLng, lat0),
    project(maxLat, maxLng, lat0),
  ];
  const rawMinX = Math.min(corners[0][0], corners[1][0]);
  const rawMaxX = Math.max(corners[0][0], corners[1][0]);
  const rawMinY = Math.min(corners[0][1], corners[1][1]);
  const rawMaxY = Math.max(corners[0][1], corners[1][1]);
  const spanX = rawMaxX - rawMinX || 1;
  const spanY = rawMaxY - rawMinY || 1;
  const scale = Math.min((VIEW_W - 2 * PAD) / spanX, (VIEW_H - 2 * PAD) / spanY);
  const offX = (VIEW_W - spanX * scale) / 2;
  const offY = (VIEW_H - spanY * scale) / 2;

  const toXY = (lat, lng) => {
    const [rx, ry] = project(lat, lng, lat0);
    return [
      +(offX + (rx - rawMinX) * scale).toFixed(1),
      +(offY + (ry - rawMinY) * scale).toFixed(1),
    ];
  };
  const pathOf = (geom) => geom.map((p) => toXY(p.lat, p.lon));

  // Drop points closer than `minPx` to the previous one — the maps are ~800px
  // wide, so sub-pixel detail is invisible but costs bytes.
  const simplify = (pts, minPx = 1.5) => {
    if (pts.length <= 4) return pts;
    const out = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const [px, py] = out[out.length - 1];
      const [x, y] = pts[i];
      if (Math.hypot(x - px, y - py) >= minPx || i === pts.length - 1) out.push(pts[i]);
    }
    return out.length >= 3 ? out : pts;
  };
  const bboxArea = (pts) => {
    let a = Infinity, b = -Infinity, c = Infinity, d = -Infinity;
    for (const [x, y] of pts) { a = Math.min(a, x); b = Math.max(b, x); c = Math.min(c, y); d = Math.max(d, y); }
    return (b - a) * (d - c);
  };
  const collect = (pred) =>
    elements
      .filter((e) => pred(e) && e.geometry && e.geometry.length >= 3 && mostlyInBox(e.geometry))
      .map((e) => simplify(pathOf(e.geometry)));

  const water = collect(
    (e) => e.tags.natural === "water" || e.tags.golf === "water_hazard" || e.tags.golf === "lateral_water_hazard"
  );
  const fairways = collect((e) => e.tags.golf === "fairway");
  const greens = collect((e) => e.tags.golf === "green");
  // Cap bunkers to the largest 90 by footprint — a course like Whistling
  // Straits has ~1000, which bloats the payload for no visual gain at this
  // scale. The biggest ones carry the routing's character.
  const bunkers = collect((e) => e.tags.golf === "bunker")
    .sort((a, b) => bboxArea(b) - bboxArea(a))
    .slice(0, 90);

  const holes = selected
    .map((h) => {
      const line = simplify(pathOf(h.geometry), 2);
      // Label at the green end (last point of the routing line).
      const label = line[line.length - 1];
      return { ref: h.tags.ref, par: h.tags.par ?? null, line, label };
    })
    .sort((a, b) => Number(a.ref) - Number(b.ref));

  const map = {
    slug,
    view: [VIEW_W, VIEW_H],
    attribution: "© OpenStreetMap contributors (ODbL)",
    counts: { holes: holes.length, greens: greens.length, fairways: fairways.length, bunkers: bunkers.length, water: water.length },
    water, fairways, greens, bunkers, holes,
  };
  writeFileSync(join(outDir, `${slug}.json`), JSON.stringify(map));
  console.log(`${slug}: ${holes.length} holes, ${greens.length} greens, ${fairways.length} fairways, ${bunkers.length} bunkers, ${water.length} water`);
}
