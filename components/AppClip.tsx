"use client";

import { useEffect, useRef } from "react";

/**
 * Autoplaying real-app footage. React sets `muted` as a DOM property only —
 * the attribute is missing when the browser judges autoplay eligibility, so
 * `<video autoPlay muted>` stays paused. This sets the attribute for real and
 * nudges play() (a no-op when the browser already started it).
 */
export default function AppClip({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute("muted", "");

    const tryPlay = () => {
      if (v.paused) v.play().catch(() => {});
    };

    // Mount-time play can lose to loading; retry when the clip is ready, when
    // it scrolls into view, and on the first interaction (covers iOS Low
    // Power Mode, where even muted autoplay waits for a gesture).
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && tryPlay()),
      { threshold: 0.2 }
    );
    io.observe(v);
    window.addEventListener("pointerdown", tryPlay);
    window.addEventListener("scroll", tryPlay, { passive: true, once: true });

    return () => {
      v.removeEventListener("canplay", tryPlay);
      io.disconnect();
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("scroll", tryPlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
