"use client";

import { useEffect } from "react";

const SELECTOR = "[data-home-motion]";

export default function HomeMotionGate() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (sections.length === 0) return;

    const loadSections = sections.filter((section) => section.dataset.homeMotion === "load");
    const scrollSections = sections.filter((section) => section.dataset.homeMotion !== "load");
    const activateLoadSections = () => {
      loadSections.forEach((section) => section.setAttribute("data-home-motion-active", "true"));
    };

    if (document.readyState === "complete") {
      activateLoadSections();
    } else {
      window.addEventListener("load", activateLoadSections, { once: true });
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      scrollSections.forEach((section) => section.setAttribute("data-home-motion-active", "true"));
      return () => window.removeEventListener("load", activateLoadSections);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = entry.target as HTMLElement;
          section.setAttribute("data-home-motion-active", "true");
          observer.unobserve(section);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.08 }
    );

    scrollSections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      window.removeEventListener("load", activateLoadSections);
    };
  }, []);

  return null;
}
