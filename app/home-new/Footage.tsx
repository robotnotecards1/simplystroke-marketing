"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

// Real-app footage for the hero. Respects prefers-reduced-motion via
// useSyncExternalStore (SSR-safe: the server snapshot is "not reduced", so the
// clip renders by default and swaps to the poster still only when the visitor
// asks for less motion). The <video> carries a poster + a fixed aspect (from
// CSS) so there is no layout shift, and preload="metadata" keeps the full clip
// from downloading until it is needed. Kept separate from the shared AppClip so
// the experiment owns its own reduced-motion behavior.

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function getReducedMotion() {
  return window.matchMedia(REDUCE_QUERY).matches;
}
function getReducedMotionServer() {
  return false;
}

export default function Footage({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer
  );

  useEffect(() => {
    if (reduced) return;
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute("muted", "");
    const tryPlay = () => {
      if (v.paused) v.play().catch(() => {});
    };
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
  }, [reduced]);

  if (reduced) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt={label} />;
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
