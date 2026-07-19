import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// One anon-key client, shared by build-time Server Components and the
// client-side leaderboard refresh. The anon key only ever sees public-SELECT
// tables (courses, course_stats) and the public_rounds view — never a raw
// round, an email, or the service role. Missing env is not fatal: the course
// loaders fall back to the committed research JSON so a clean checkout still
// builds.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  if (client) return client;
  if (!url || !key) return null;
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export const SUPABASE_READY = Boolean(url && key);
