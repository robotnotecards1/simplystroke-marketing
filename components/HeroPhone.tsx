"use client";

import { useEffect, useRef, useState } from "react";

const LOOP_MS = 1700;
const HOLE_OUT = 5; // strokes per demo hole before auto-advancing

/**
 * Hero phone mockup of the Active Round screen, running a two-hole demo
 * loop: counts to 5 on hole 1, advances to hole 2 and counts again, then
 * resets. TOTAL and the vs-par banner track the holes played (hole 1 = 5
 * on a par 4 → "+1 OVER PAR" during hole 2). The ball is really tappable —
 * a visitor's click counts a stroke and restarts the auto loop.
 */
export default function HeroPhone() {
  const [hole, setHole] = useState(1);
  const [strokes, setStrokes] = useState(3);
  const [tapKey, setTapKey] = useState(0);
  const [tapped, setTapped] = useState(false); // ripple only on strokes, not hole changes
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = () => {
    setStrokes((s) => {
      if (s < HOLE_OUT) {
        setTapped(true);
        return s + 1;
      }
      // hole finished: advance (or wrap the demo back to hole 1)
      setTapped(false);
      setHole((h) => (h === 1 ? 2 : 1));
      return 0;
    });
    setTapKey((k) => k + 1);
  };

  const startLoop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(advance, LOOP_MS);
  };

  useEffect(() => {
    // Runs under prefers-reduced-motion too: the count is the demo content;
    // decorative ripple/pop/float effects are suppressed in globals.css.
    startLoop();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const onTap = () => {
    advance();
    startLoop(); // restart so an auto-tap doesn't fire right after a real one
  };

  const carried = hole === 2 ? HOLE_OUT : 0; // strokes from completed hole 1
  const total = carried + strokes;
  const overPar = hole === 2; // hole 1 was 5 on a par 4

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
                <div className="ph-hole-num">{hole} / 18</div>
              </div>
              <div className="ph-edit">Edit</div>
            </div>
            <div className="ph-subbar">
              <div>
                <div className="sub-label">Par</div>
                <div className="sub-num">4</div>
              </div>
              <div className="ph-dots">
                <span className={`ph-dot ${hole === 1 ? "current" : ""}`} />
                <span className={`ph-dot ${hole === 2 ? "current" : "upcoming"}`} />
                <span className="ph-dot upcoming" />
                <span className="ph-dot upcoming" />
                <span className="ph-dot upcoming" />
                <span className="ph-dot upcoming" />
                <span className="ph-dot upcoming" />
                <span className="ph-dot upcoming" />
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="sub-label">Total</div>
                <div className="sub-num">{total}</div>
              </div>
            </div>
            <div className="ph-scorebanner">
              <div className={`ph-overpar ${overPar ? "" : "even"}`}>
                {overPar ? "+1" : "E"}
              </div>
              <div className="ph-overpar-label">
                {overPar ? "Over Par" : "Even"}
              </div>
            </div>
            <div className="ph-main">
              <div className="ph-ballwrap">
                <span className="ph-pulse" />
                {tapped && <span key={`r${tapKey}`} className="ph-ripple" />}
                <button
                  type="button"
                  className="ph-ball"
                  onClick={onTap}
                  aria-label="Tap the ball to count a stroke (demo)"
                >
                  {tapped && <span key={`t${tapKey}`} className="ph-tapdot" />}
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
