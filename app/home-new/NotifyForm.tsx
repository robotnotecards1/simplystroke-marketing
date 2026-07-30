"use client";

import { useState } from "react";
import { WAITLIST_ENDPOINT } from "@/lib/site";

// Secondary conversion on /home-new: the native-app launch notify list. Mirrors
// the shared WaitlistForm POST contract but stamps source "home-new" (so signups
// from this experiment are distinguishable in the waitlist table) and fires a
// notify_signup event so the secondary funnel is measurable alongside the play CTAs.
type TrackingWindow = Window & {
  umami?: { track?: (event: string, data?: Record<string, unknown>) => void };
  gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
};

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "home-new", website }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("done");
      const w = window as TrackingWindow;
      try {
        w.umami?.track?.("notify_signup", { route: "/home-new", variant: "redesign" });
      } catch {}
      try {
        w.gtag?.("event", "notify_signup", { route: "/home-new", variant: "redesign" });
      } catch {}
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="hn-notify" onSubmit={onSubmit}>
      <label className="hn-notify-label" htmlFor="hn-notify-email">
        Prefer the native app? Get one email when it lands.
      </label>
      <div className="hn-notify-row">
        <input
          id="hn-notify-email"
          type="email"
          required
          placeholder="you@email.com"
          aria-label="Email address for native-app launch notification"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
        />
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hn-hp"
        />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Adding you…" : "Notify me"}
        </button>
      </div>
      {status === "done" && (
        <p className="hn-notify-msg" role="status">
          You&apos;re on the list. We&apos;ll email you once, at launch.
        </p>
      )}
      {status === "error" && (
        <p className="hn-notify-msg" role="status">
          That didn&apos;t go through. Try again in a minute.
        </p>
      )}
    </form>
  );
}
