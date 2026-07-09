"use client";

import { useEffect, useState } from "react";

/**
 * Live animated phone in the "A peek inside" strip. Autonomous demo loop
 * (~1.7s per tap): ripple ring expands from behind the ball, a press dot
 * flashes, the stroke number pops and increments; ROUND TOTAL and the
 * scorecard chip stay in sync. In the real app this is user tap-driven.
 */
export default function ActiveRoundPhone() {
  const [strokes, setStrokes] = useState(0);
  const [tapKey, setTapKey] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setStrokes((s) => (s >= 5 ? 0 : s + 1));
      setTapKey((k) => k + 1);
    }, 1700);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mini-wrap">
      <div className="mini-frame">
        <div className="mini-screen">
          <div className="mini-notch" />

          <div className="mini-header">
            <div className="mini-toprow">
              <span className="mini-quit">← Quit</span>
              <div className="mini-holeblock">
                <div className="lbl">HOLE</div>
                <div className="val">1 / 18</div>
              </div>
              <span className="mini-edit">Edit</span>
            </div>
            <div className="mini-subrow">
              <div className="mini-stat">
                <div className="lbl">PAR</div>
                <div className="val">4</div>
              </div>
              <div className="mini-dots">
                <span className="mini-dot current" />
                <span className="mini-dot" />
                <span className="mini-dot" />
                <span className="mini-dot" />
                <span className="mini-dot" />
                <span className="mini-dot" />
                <span className="mini-dot" />
              </div>
              <div className="mini-stat right">
                <div className="lbl">ROUND TOTAL</div>
                <div className="val">{strokes}</div>
              </div>
            </div>
            <div className="mini-even">
              <div className="big">E</div>
              <div className="lbl">EVEN</div>
            </div>
          </div>

          <div className="mini-body">
            <div className="mini-ballwrap">
              <div key={`r${tapKey}`} className="mini-ripple" />
              <div className="mini-ball">
                <div key={`t${tapKey}`} className="mini-tapdot" />
                <div className="mini-ballface">
                  <div key={tapKey} className="mini-strokenum">
                    {strokes}
                  </div>
                  <div className="mini-strokes-lbl">STROKES</div>
                  <div className="mini-hitting">
                    <span className="lbl">HITTING</span>
                    <span className="num">{strokes + 1}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mini-caption">TAP THE BALL TO COUNT A STROKE</div>
            <div className="mini-actions">
              <div className="mini-undo">↩ UNDO</div>
              <div className="mini-next">NEXT HOLE →</div>
            </div>
          </div>

          <div className="mini-scorecard">
            <div className="lbl">SCORECARD</div>
            <div className="mini-chips">
              <span className="mini-chip filled">{strokes}</span>
              <span className="mini-chip" />
              <span className="mini-chip" />
              <span className="mini-chip" />
              <span className="mini-chip" />
              <span className="mini-chip" />
              <span className="mini-chip" />
              <span className="mini-chip" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
