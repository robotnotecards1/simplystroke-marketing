"use client";

import type { ReactNode } from "react";

// One primary CTA style, instrumented so the /home-new experiment's clicks can
// be compared against the live "/" homepage. umami fires via the
// data-umami-event* attributes (its script auto-binds the click and uses a
// keepalive beacon, so the event survives the outbound navigation); GA4 fires
// on click. Pageview analytics in app/layout.tsx are left untouched.
type TrackingWindow = Window & {
  gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
};

export default function TrackedCTA({
  event,
  href = "https://app.simplystroke.app",
  className = "btn btn-hero",
  children,
}: {
  event: string;
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  function fire() {
    try {
      (window as TrackingWindow).gtag?.("event", event, {
        route: "/home-new",
        variant: "redesign",
      });
    } catch {
      /* analytics must never block navigation */
    }
  }

  return (
    <a
      href={href}
      className={className}
      onClick={fire}
      data-umami-event={event}
      data-umami-event-route="/home-new"
      data-umami-event-variant="redesign"
    >
      {children}
    </a>
  );
}
