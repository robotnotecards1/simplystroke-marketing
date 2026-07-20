import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// BUILD-TIME ONLY service-role client for the ramp-release system. It reads
// `released_courses` (a view NOT granted to anon) so the unreleased course
// queue never ships to the browser.
//
// NEVER import this into a client component. The key is server/build-only and
// must NOT be prefixed NEXT_PUBLIC. It is only referenced when COURSE_RAMP=1
// (see getPublishedCourses); absent the flag, nothing here runs and the build
// behaves exactly as it does today (anon key, status='published').
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let admin: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient | null {
  if (admin) return admin;
  if (!url || !serviceKey) return null;
  admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return admin;
}

// The ramp is active only when explicitly flagged AND the service key is set.
// Gating on an explicit flag (not just the key's presence) prevents the build
// from silently flipping to the release-gated path if the service key is ever
// added for some other reason.
export const COURSE_RAMP =
  process.env.COURSE_RAMP === "1" && Boolean(url && serviceKey);
