"use client";

import { useState } from "react";
import { WAITLIST_ENDPOINT } from "@/lib/site";

/**
 * Waitlist email capture. POSTs { email, source, website } to the waitlist
 * edge function (lib/site.ts WAITLIST_ENDPOINT). `website` is a honeypot —
 * hidden from real users; the endpoint silently drops submissions that
 * fill it. Duplicate emails come back as success (idempotent).
 */
export default function WaitlistForm({ source = "site" }: { source?: string }) {
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
        body: JSON.stringify({ email, source, website }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form className="ss-waitform" onSubmit={onSubmit}>
        <input
          type="email"
          required
          placeholder="you@email.com"
          aria-label="Email address"
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
          style={{ position: "absolute", left: "-9999px", height: 0, width: 0, border: 0, padding: 0 }}
        />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Adding you…" : "Notify me"}
        </button>
      </form>
      {status === "done" && (
        <div className="ss-wait-success" role="status">
          You&apos;re on the list. See you at launch. 🏌️
        </div>
      )}
      {status === "error" && (
        <div className="ss-wait-success" role="status">
          Hmm, that didn&apos;t go through — try again in a minute.
        </div>
      )}
    </>
  );
}
