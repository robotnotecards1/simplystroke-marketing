"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackCta, type CtaEvent } from "@/lib/analytics";

type TrackedCtaProps = {
  event: CtaEvent;
  ctaLocation: string;
  href: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Drop-in replacement for an <a> that fires a GA4 (and Umami) event on click.
 * Passes through every other prop (className, style, aria-label, target…) so
 * the visual design and accessibility are unchanged. Navigation is NOT blocked;
 * trackCta uses transport_type 'beacon' so the hit survives the page unload.
 */
export default function TrackedCta({
  event,
  ctaLocation,
  href,
  children,
  onClick,
  ...rest
}: TrackedCtaProps) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        const cta_copy = (e.currentTarget.textContent || "").trim().slice(0, 100);
        trackCta(event, { cta_location: ctaLocation, cta_copy, destination: href });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
