"use client";

import { useEffect, useRef } from "react";

/**
 * Hero device pair: the real iPhone screen recording (active round) with the
 * real Apple Watch recording tucked alongside. The two clips are separate
 * recordings of different lengths, so this keeps them coordinated: the watch
 * is pinned to the phone's timeline (they restart the round together), and a
 * soft fade across the loop seam hides the cut and the re-sync so the reset
 * does not read as a hard jump.
 */
export default function HeroDevices() {
  const phoneRef = useRef<HTMLVideoElement>(null);
  const watchRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = phoneRef.current;
    const w = watchRef.current;
    if (!p || !w) return;

    let raf = 0;

    const prep = (v: HTMLVideoElement) => {
      v.muted = true;
      v.setAttribute("muted", "");
      v.play().catch(() => {});
    };
    prep(p);
    prep(w);

    const tick = () => {
      if (p.paused) p.play().catch(() => {});
      if (w.paused) w.play().catch(() => {});
      const t = p.currentTime;
      // Phone is the master clock; keep the watch pinned so both loop together.
      if (Number.isFinite(t) && Math.abs(w.currentTime - t) > 0.15) {
        try {
          w.currentTime = t;
        } catch {
          /* seek can throw before metadata is ready; ignore */
        }
      }
      const d = p.duration;
      const wrap = wrapRef.current;
      if (wrap && Number.isFinite(d) && d > 0) {
        wrap.classList.toggle("at-seam", t > d - 0.3 || t < 0.3);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const kick = () => {
      p.play().catch(() => {});
      w.play().catch(() => {});
    };
    window.addEventListener("pointerdown", kick);
    window.addEventListener("scroll", kick, { passive: true, once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("scroll", kick);
    };
  }, []);

  return (
    <div className="ss-hero-phonewrap">
      <div ref={wrapRef} className="ss-hero-devices ss-hero-float">
        <div className="hero-phone">
          <div className="hero-phone-screen">
            <video
              ref={phoneRef}
              src="/videos/phone-active-round.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="SimplyStroke on iPhone: tapping the giant golf ball counts a stroke, live"
            />
          </div>
        </div>
        <div className="hero-watch" aria-hidden="true">
          <div className="hero-watch-body">
            <div className="hero-watch-screen">
              <video
                ref={watchRef}
                src="/videos/watch-live-round.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="SimplyStroke on Apple Watch"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
