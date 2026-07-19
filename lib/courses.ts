// The course-directory data layer. One rule: this module is the only place
// that knows where course data comes from. Pages ask for a Course / stats /
// leaderboard and never learn whether it came from Supabase, the committed
// research JSON, or the demo fixtures.
//
// Sources, in priority order:
//   1. Supabase (published courses + course_stats) — the live path the
//      handoff specifies. Read at build time with the anon key.
//   2. Committed research JSON (data/research/*.json) — the hand-curated
//      source the courses were seeded FROM. Guarantees a clean checkout builds
//      even with no Supabase env, and is the source of truth for facts.
//   3. Demo fixtures (data/demo/*.json) — synthetic stats + leaderboard shown
//      only when NEXT_PUBLIC_DEMO_DATA=true, so reviewers can see the
//      populated design WITHOUT writing fake rounds into the shared prod DB.
import fs from "node:fs";
import path from "node:path";
import { supabase } from "./supabase";
import { CONTENT } from "@/data/content";

export type Tee = {
  name: string;
  color: string;
  rating: number;
  slope: number;
  yardage: number;
  holes: number[] | null;
};

export type Course = {
  id: string;
  slug: string;
  name: string;
  club_name?: string;
  city: string;
  state: string;
  zip?: string;
  country: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
  designer?: string;
  year_opened?: number;
  access_type: "public" | "muni" | "private" | "resort";
  green_fee_tier: string;
  green_fee_notes?: string;
  holes_count: number;
  par_total: number;
  par_per_hole: number[];
  handicap_per_hole?: number[] | null;
  course_rating?: number;
  slope_rating?: number;
  rating_tee?: string;
  tees: Tee[];
  amenities: string[];
  walkable?: boolean;
  walkable_note?: string;
  notable?: string[];
};

export type HardestHole = { hole: number; par: number; over_par: number };

export type CourseStats = {
  rounds_count: number;
  avg_score: number;
  avg_to_par: number;
  low_round: number;
  low_round_label: string;
  hardest_holes: HardestHole[];
  // 8 buckets: <75, 75-79, 80-84, 85-89, 90-94, 95-99, 100-104, 105+
  distribution: number[];
  updated_at: string;
};

export type LeaderRow = {
  display_name: string;
  home_city?: string;
  tees?: string;
  gross_score: number;
  score_to_par: number;
  verified?: boolean;
};

const RESEARCH_DIR = path.join(process.cwd(), "data", "research");
const DEMO_DIR = path.join(process.cwd(), "data", "demo");
const MAPS_DIR = path.join(process.cwd(), "data", "maps");

// The 10 courses published in phase 1, in directory order. Anything not here
// stays out of generateStaticParams even if it exists in Supabase.
export const PUBLISHED_SLUGS = [
  "torrey-pines-south",
  "torrey-pines-north",
  "bethpage-black",
  "pebble-beach",
  "tpc-sawgrass-stadium",
  "chambers-bay",
  "pinehurst-no-2",
  "bandon-dunes",
  "kiawah-island-ocean",
  "whistling-straits",
];

// Show the fully-populated design with synthetic stats/leaderboards when
// explicitly enabled, and by default on Vercel PREVIEW builds so reviewers see
// the populated page without any config. Never on production (VERCEL_ENV
// "production"), and an explicit "false" always wins. When on, the page shows a
// "sample data" banner so nothing reads as real posted rounds.
export const DEMO_DATA =
  process.env.NEXT_PUBLIC_DEMO_DATA === "true" ||
  (process.env.VERCEL_ENV === "preview" &&
    process.env.NEXT_PUBLIC_DEMO_DATA !== "false");
const DEMO = DEMO_DATA;

export const STATE_NAMES: Record<string, string> = {
  CA: "California", NY: "New York", FL: "Florida", WA: "Washington",
  NC: "North Carolina", OR: "Oregon", SC: "South Carolina", WI: "Wisconsin",
};

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function stateName(abbr: string): string {
  return STATE_NAMES[abbr] ?? abbr;
}

/** Canonical URL path for a course page, with trailing slash (export config). */
export function coursePath(c: Course): string {
  return `/courses/${slugify(stateName(c.state))}/${slugify(c.city)}/${c.slug}/`;
}

export const ACCESS_LABEL: Record<string, string> = {
  muni: "Municipal / Public",
  public: "Public",
  private: "Private",
  resort: "Resort",
};

/** Mapbox Static satellite image URL, or null when no token is configured. */
export function satelliteUrl(c: Course, w = 800, h = 560): string | null {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) return null;
  return (
    `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/` +
    `${c.lng},${c.lat},14.4,0/${w}x${h}@2x?access_token=${token}`
  );
}

function haversineMiles(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 3959 * 2 * Math.asin(Math.sqrt(s));
}

/** Other published courses, nearest first, for internal linking. */
export function nearbyCourses(course: Course, all: Course[], n = 3): (Course & { miles: number })[] {
  return all
    .filter((c) => c.slug !== course.slug)
    .map((c) => ({ ...c, miles: Math.round(haversineMiles(course.lat, course.lng, c.lat, c.lng)) }))
    .sort((a, b) => a.miles - b.miles)
    .slice(0, n);
}

function readResearch(slug: string): Course | null {
  const file = path.join(RESEARCH_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  return { ...raw, id: slug };
}

let researchCache: Course[] | null = null;
function allResearch(): Course[] {
  if (researchCache) return researchCache;
  researchCache = PUBLISHED_SLUGS.map(readResearch).filter(Boolean) as Course[];
  return researchCache;
}

/** Every published course, directory order. Supabase first, research fallback. */
export async function getPublishedCourses(): Promise<Course[]> {
  const sb = supabase();
  if (sb) {
    const { data, error } = await sb
      .from("courses")
      .select("*")
      .eq("status", "published");
    if (!error && data && data.length > 0) {
      const bySlug = new Map(data.map((c) => [c.slug, c as Course]));
      // Keep directory order; fill any gap from research so a partially-seeded
      // DB never drops a page.
      return PUBLISHED_SLUGS.map(
        (slug) => bySlug.get(slug) ?? readResearch(slug)
      ).filter(Boolean) as Course[];
    }
  }
  return allResearch();
}

export async function getCourse(slug: string): Promise<Course | null> {
  const all = await getPublishedCourses();
  return all.find((c) => c.slug === slug) ?? null;
}

export function siblingSlug(slug: string): string | null {
  if (slug === "torrey-pines-south") return "torrey-pines-north";
  if (slug === "torrey-pines-north") return "torrey-pines-south";
  return null;
}

/** Course stats rollup, or null for the zero-rounds empty state. */
export async function getCourseStats(course: Course): Promise<CourseStats | null> {
  if (DEMO) return readDemoStats(course.slug);
  const sb = supabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("course_stats")
    .select("*")
    .eq("course_id", course.id)
    .maybeSingle();
  if (error || !data || !data.rounds_count) return null;
  return data as CourseStats;
}

/** Baked-in leaderboard (top gross). Refreshed client-side from public_rounds. */
export async function getLeaderboard(course: Course, limit = 8): Promise<LeaderRow[]> {
  if (DEMO) return readDemoLeaders(course.slug, limit);
  const sb = supabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("public_rounds")
    .select("display_name, gross_score, score_to_par")
    .eq("course_id", course.id)
    .order("gross_score", { ascending: true })
    .limit(limit);
  if (error || !data) return [];
  return data as LeaderRow[];
}

// --- demo fixtures ----------------------------------------------------------
function readDemo(slug: string): { stats: CourseStats; leaders: LeaderRow[] } | null {
  const file = path.join(DEMO_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
function readDemoStats(slug: string): CourseStats | null {
  return readDemo(slug)?.stats ?? null;
}
function readDemoLeaders(slug: string, limit: number): LeaderRow[] {
  return (readDemo(slug)?.leaders ?? []).slice(0, limit);
}

// --- routing map ------------------------------------------------------------
export type CourseMap = {
  slug: string;
  view: [number, number];
  attribution: string;
  water: number[][][];
  fairways: number[][][];
  greens: number[][][];
  bunkers: number[][][];
  holes: { ref: string; par: string | null; line: number[][]; label: number[] }[];
};

export function getCourseMap(slug: string): CourseMap | null {
  const file = path.join(MAPS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// --- editorial content (unique per course, hand-written) --------------------
// Facts come from Supabase/research; PROSE comes from here. Kept out of the DB
// because it is editorial, not data. Every field must be unique per course
// (thin-content risk) and pass the human-tone standard: no AI vocabulary, zero
// em dashes, lead with specifics.
export type CourseContent = {
  metaTitle: string;       // ~55 chars, course + city front-loaded
  metaDescription: string; // unique meta description
  heroTagline: string;     // hero-sub line; wrap emphasis in **double asterisks**
  overview: string[];      // unique prose paragraphs; **bold** supported
  faqs: { q: string; a: string }[]; // evergreen, factual, no fabricated stats
};

// A course with no content entry falls back to a minimal generated stub, so a
// half-written content file never breaks the build.
export function getCourseContent(course: Course): CourseContent {
  const entry = CONTENT[course.slug];
  if (entry) return entry;
  return {
    metaTitle: `${course.name}, ${course.city} ${course.state} | SimplyStroke`,
    metaDescription: `Scorecard, difficulty, and details for ${course.name} in ${course.city}, ${course.state}.`,
    heroTagline: `Par ${course.par_total} · ${course.holes_count} holes${course.designer ? ` · ${course.designer}` : ""}.`,
    overview: [],
    faqs: [],
  };
}
