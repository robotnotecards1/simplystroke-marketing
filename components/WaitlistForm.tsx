"use client";

import { useState } from "react";
import { WAITLIST_ENDPOINT } from "@/lib/site";

/**
 * Waitlist email capture. If NEXT_PUBLIC_WAITLIST_ENDPOINT is configured it
 * POSTs { email, source } there; otherwise it shows the local confirmation
 * (the endpoint should be wired before real traffic is driven to the site).
 */
export default function WaitlistForm({ source = "site" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (WAITLIST_ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(WAITLIST_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source }),
        });
        setStatus(res.ok ? "done" : "error");
      } catch {
        setStatus("error");
      }
    } else {
      setStatus("done");
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
