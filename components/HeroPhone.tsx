"use client";

import { useEffect, useRef, useState } from "react";

const BASE_TOTAL = 35; // completed holes 1–6, so 3 strokes reads TOTAL 38 (design's static frame)
const LOOP_MS = 1700;

/**
 * Hero phone mockup of the Active Round screen. Runs the autonomous tap
 * loop (ripple + press dot + count pop, ~1.7s) and the ball is really
 * tappable — a visitor's click counts a stroke and restarts the loop.
 * Initial SSR frame matches the design's static state (3 / HITTING 4).
 */
export default function HeroPhone() {
  const [strokes, setStrokes] = useState(3);
  const [tapKey, setTapKey] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = () => {
    setStrokes((s) => (s >= 5 ? 0 : s + 1));
    setTapKey((k) => k + 1);
  };

  const startLoop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(advance, LOOP_MS);
  };

  useEffect(() => {
    // Runs under prefers-reduced-motion too: the count is the demo content;
    // the decorative ripple/pop/float effects are suppressed in globals.css.
    startLoop();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const onTap = () => {
    advance();
    startLoop(); // restart so an auto-tap doesn't fire right after a real one
  };

  return (
    <div className="ss-hero-phonewrap">
      <div className="ss-hero-float">
        <div className="ph-frame">
          <div className="ph-screen">
            <div className="ph-notchbar">
              <div className="ph-notch" />
            </div>
            <div className="ph-topbar">
              <div>
                <div className="ph-hole-label">HOLE</div>
                <div className="ph-hole-num">7 / 18</div>
              </div>
              <div className="ph-edit">Edit</div>
            </div>
            <div className="ph-subbar">
              <div>
                <div className="sub-label">Par</div>
                <div className="sub-num">4</div>
              </div>
              <div className="ph-dots">
                <span className="ph-dot" />
                <span className="ph-dot" />
                <span className="ph-dot" />
                <span className="ph-dot" />
                <span className="ph-dot" />
                <span className="ph-dot" />
                <span className="ph-dot current" />
                <span className="ph-dot upcoming" />
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="sub-label">Total</div>
                <div className="sub-num">{BASE_TOTAL + strokes}</div>
              </div>
            </div>
            <div className="ph-scorebanner">
              <div className="ph-overpar">+2</div>
              <div className="ph-overpar-label">Over Par</div>
            </div>
            <div className="ph-main">
              <div className="ph-ballwrap">
                <span className="ph-pulse" />
                {tapKey > 0 && <span key={`r${tapKey}`} className="ph-ripple" />}
                <button
                  type="button"
                  className="ph-ball"
                  onClick={onTap}
                  aria-label="Tap the ball to count a stroke (demo)"
                >
                  {tapKey > 0 && (
                    <span key={`t${tapKey}`} className="ph-tapdot" />
                  )}
                  <span className="ph-dimples" />
                  <span key={tapKey} className="ph-strokes ph-strokes-pop">
                    {strokes}
                  </span>
                  <span className="ph-strokes-label">STROKES</span>
                  <span className="ph-hitting">
                    HITTING <span className="num">{strokes + 1}</span>
                  </span>
                </button>
              </div>
              <div className="ph-caption">Tap the ball to count a stroke</div>
            </div>
            <div className="ph-actions">
              <div className="ph-btn-undo">↶ Undo</div>
              <div className="ph-btn-next">Next hole →</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
