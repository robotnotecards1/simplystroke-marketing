// Public waitlist endpoint for the SimplyStroke marketing site.
// POST { email, source, website? } — `website` is a honeypot field; bots
// that fill it get a fake success and no row. Duplicate emails are
// idempotent successes. Only the service role touches the table (RLS has
// no policies), so this function is the single write path.
//
// Deployed to the `simplystroke` Supabase project (uqlrfzzszfsnjepuppdk)
// as `waitlist` with verify_jwt=false (public form endpoint; the JWT would
// only ever be the public anon key, so it adds no protection here).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const ALLOWED_ORIGINS = new Set([
  "https://www.simplystroke.app",
  "https://simplystroke.app",
  "http://localhost:3000",
  "http://localhost:3399",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function headersFor(origin: string | null) {
  const allow = origin && ALLOWED_ORIGINS.has(origin)
    ? origin
    : "https://www.simplystroke.app";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Content-Type": "application/json",
  };
}

Deno.serve(async (req: Request) => {
  const headers = headersFor(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method not allowed" }), {
      status: 405,
      headers,
    });
  }

  let body: { email?: unknown; source?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid json" }), {
      status: 400,
      headers,
    });
  }

  // Honeypot: real users never fill this hidden field.
  if (typeof body.website === "string" && body.website.length > 0) {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return new Response(JSON.stringify({ error: "invalid email" }), {
      status: 400,
      headers,
    });
  }
  const source = String(body.source ?? "site").slice(0, 40);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { error } = await supabase.from("waitlist").insert({ email, source });
  if (error && !/duplicate key|unique/i.test(error.message)) {
    console.error("waitlist insert failed:", error.message);
    return new Response(JSON.stringify({ error: "storage failed" }), {
      status: 500,
      headers,
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
});
