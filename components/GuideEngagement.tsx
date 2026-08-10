"use client";

import { useEffect } from "react";
import { trackGuideEngaged } from "@/lib/analytics";

/**
 * Fires `guide_engaged` exactly once per page load, when BOTH conditions are
 * met: >= 60s on the page AND scrolled past 50% depth. Renders nothing.
 * Mount on guide / long-form article pages.
 */
export default function GuideEngagement() {
  useEffect(() => {
    let fired = false;
    let timeReached = false;
    let scrollReached = false;
    const fireIfReady = () => {
      if (fired || !timeReached || !scrollReached) return;
      fired = true;
      trackGuideEngaged();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // A page too short to scroll counts as "read past 50%" immediately.
      const depth = scrollable <= 0 ? 1 : window.scrollY / scrollable;
      if (depth >= 0.5) {
        scrollReached = true;
        fireIfReady();
      }
    };
    const timer = setTimeout(() => {
      timeReached = true;
      fireIfReady();
    }, 60000);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // evaluate once in case the page is already scrolled / too short
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);
  return null;
}
