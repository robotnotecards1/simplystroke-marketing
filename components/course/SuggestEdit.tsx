"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// The "Suggest an edit" banner + modal. Because the site is a static export
// there is no server to post to directly: the form sends to the
// submit-course-edit edge function, which verifies the Cloudflare Turnstile
// token server-side, inserts into course_edit_suggestions with the service
// role, and emails jared@jaredmoore.com. Nothing is inserted from the client.
const ENDPOINT =
  process.env.NEXT_PUBLIC_SUBMIT_EDIT_ENDPOINT ??
  "https://uqlrfzzszfsnjepuppdk.supabase.co/functions/v1/submit-course-edit";
// The real Cloudflare Turnstile site key for simplystroke.app (public by
// design; it appears in the rendered widget). NEXT_PUBLIC_TURNSTILE_SITE_KEY
// can override it, e.g. with Cloudflare's test key for local runs.
// `||` (not `??`) so an empty or unset env value still falls back to the real
// key, rather than shipping a blank sitekey that renders no widget.
const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAD5-aqL7sQBr8NYV";

// Account-level analytics marker so Cloudflare can attribute this integration.
const TURNSTILE_ACTION = "turnstile-spin-v2";

const FIELDS = [
  "Phone number",
  "Address",
  "Website",
  "Green fees / pricing",
  "Amenities",
  "Hours / season",
  "Scorecard or par",
  "Course name",
  "Permanently closed",
  "Something else",
];

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export default function SuggestEdit({
  courseId,
  courseName,
  courseLabel,
}: {
  courseId: string;
  courseName: string;
  courseLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string>("");

  const widgetHost = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  // Escape closes the modal.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Load the Turnstile script once, and render the widget while the form is up.
  useEffect(() => {
    if (!open || done || !SITE_KEY) return;

    const render = () => {
      if (!window.turnstile || !widgetHost.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(widgetHost.current, {
        sitekey: SITE_KEY,
        action: TURNSTILE_ACTION,
        callback: (t: string) => setToken(t),
        "error-callback": () => setToken(""),
        "expired-callback": () => setToken(""),
      });
    };

    if (window.turnstile) {
      render();
    } else if (!document.getElementById("cf-turnstile-script")) {
      const s = document.createElement("script");
      s.id = "cf-turnstile-script";
      // render=explicit: we call turnstile.render() ourselves (for the token
      // callback + action), so the auto-render must be off or the cf-turnstile
      // div would render a second, duplicate widget.
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      s.onload = render;
      document.head.appendChild(s);
    } else {
      const t = setInterval(() => {
        if (window.turnstile) {
          clearInterval(t);
          render();
        }
      }, 200);
      return () => clearInterval(t);
    }
  }, [open, done]);

  const openModal = () => {
    setOpen(true);
    setDone(false);
    setError(null);
    setToken("");
    widgetId.current = null;
    document.body.style.overflow = "hidden";
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const field = (form.elements.namedItem("field") as HTMLSelectElement).value;
    const value = (form.elements.namedItem("value") as HTMLTextAreaElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();

    if (!value) {
      setError("Please describe what needs fixing.");
      return;
    }
    if (SITE_KEY && !token) {
      setError("Please complete the verification check.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_id: courseId,
          field,
          suggested_value: value,
          submitter_email: email || null,
          page_url: typeof window !== "undefined" ? window.location.href : null,
          turnstile_token: token,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current);
      setToken("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="suggest">
        <div className="st">
          <b>See something out of date?</b>
          <p>
            Course details change: fees go up, phone numbers move, hours shift with the season. If
            anything on this page looks wrong, tell us and we will check it.
          </p>
        </div>
        <button type="button" className="btn-outline" onClick={openModal}>
          ✎ Suggest an edit
        </button>
      </div>

      {open && (
        <div
          className="cd-modal-overlay open"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="cd-modal" role="dialog" aria-modal="true" aria-labelledby="cd-edit-title">
            {!done ? (
              <form onSubmit={submit}>
                <div className="cd-modal-head">
                  <div>
                    <h3 id="cd-edit-title">Suggest an edit</h3>
                    <p>{courseLabel}. Thanks for helping keep this accurate.</p>
                  </div>
                  <button type="button" className="cd-modal-close" onClick={close} aria-label="Close">
                    &times;
                  </button>
                </div>
                <div className="cd-modal-body">
                  <div className="cd-field">
                    <label htmlFor="cd-field-select">What needs fixing?</label>
                    <select id="cd-field-select" name="field">
                      {FIELDS.map((f) => (
                        <option key={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div className="cd-field">
                    <label htmlFor="cd-value">The correct information</label>
                    <textarea
                      id="cd-value"
                      name="value"
                      placeholder="e.g. The weekend non-resident rate is now $265, not $220."
                    />
                  </div>
                  <div className="cd-field">
                    <label htmlFor="cd-email">
                      Your email <span className="opt">(optional, so we can follow up)</span>
                    </label>
                    <input id="cd-email" name="email" type="email" placeholder="you@email.com" />
                  </div>
                  {SITE_KEY ? (
                    <div
                      className="cf-turnstile cd-turnstile"
                      ref={widgetHost}
                      data-action={TURNSTILE_ACTION}
                    />
                  ) : null}
                  <button className="btn" type="submit" disabled={submitting}>
                    {submitting ? "Sending…" : "Submit suggestion"}
                  </button>
                  {error ? <div className="cd-modal-error">{error}</div> : null}
                  <div className="cd-modal-note">
                    Suggestions are reviewed before anything on the page changes.
                  </div>
                </div>
              </form>
            ) : (
              <div className="cd-modal-success">
                <div className="chk">✓</div>
                <h3>Thanks, got it</h3>
                <p>
                  Your suggestion for {courseName} is in. We review every edit before it goes live,
                  usually within a day or two.
                </p>
                <button className="btn" type="button" onClick={close} style={{ marginTop: 20 }}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
