"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero device pair for /new — a DOM phone + Apple Watch driven by ONE shared
 * stroke count, so the two are synced by construction (no video drift). The
 * phone increments, then the watch follows WATCH_LAG ms later so it reads as
 * "the tap lands on the phone and syncs to the wrist." The count uses a soft
 * fade (no bouncy pop), per design feedback that the counting felt too harsh.
 * The ball is really tappable — a click counts a stroke and restarts the loop.
 */
const LOOP_MS = 2100;   // gentle cadence between auto-counts
const WATCH_LAG = 320;  // watch trails the phone by this, reading as a sync
const HOLE_OUT = 5;     // strokes before the demo advances the hole

const CARD = [5, 4, 6, 4, 5, 3, 4]; // completed holes on the scorecard strip

export default function NewHeroDevice() {
  const [strokes, setStrokes] = useState(2);
  const [watchStrokes, setWatchStrokes] = useState(2);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const lag = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = () => {
    setStrokes((s) => {
      const next = s < HOLE_OUT ? s + 1 : 2;
      // watch mirrors the phone a beat later (soft sync)
      if (lag.current) clearTimeout(lag.current);
      lag.current = setTimeout(() => setWatchStrokes(next), WATCH_LAG);
      return next;
    });
  };

  const startLoop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(advance, LOOP_MS);
  };

  useEffect(() => {
    startLoop();
    return () => {
      if (timer.current) clearInterval(timer.current);
      if (lag.current) clearTimeout(lag.current);
    };
  }, []);

  const onTap = () => {
    advance();
    startLoop();
  };

  return (
    <div className="nhd" aria-label="SimplyStroke on iPhone and Apple Watch">
      <style>{`
        .nhd { position:relative; display:flex; justify-content:center; }
        .nhd-phone { width:clamp(248px,27vw,320px); background:#0c0d0c; border-radius:44px; padding:11px;
          box-shadow:0 50px 90px rgba(0,0,0,.55), inset 0 0 0 2px rgba(255,255,255,.07); }
        .nhd-screen { border-radius:34px; overflow:hidden; background:#0f241b; color:#fff; display:flex; flex-direction:column; }
        .nhd-bar { display:flex; align-items:center; justify-content:space-between; padding:14px 18px 10px; }
        .nhd-hole { text-align:center; flex:1; }
        .nhd-hole .k { font-size:9px; letter-spacing:.2em; color:rgba(255,255,255,.5); font-weight:700; }
        .nhd-hole .v { font-family:var(--font-display); font-size:22px; line-height:.9; margin-top:2px; }
        .nhd-quit,.nhd-menu { font-size:12px; color:rgba(255,255,255,.7); width:42px; }
        .nhd-menu { text-align:right; }
        .nhd-sub { display:flex; justify-content:space-between; padding:9px 20px; background:rgba(0,0,0,.22); font-size:10px; }
        .nhd-sub .k { color:rgba(255,255,255,.5); letter-spacing:.12em; font-weight:700; }
        .nhd-sub .v { font-weight:800; margin-top:3px; font-size:13px; }
        .nhd-sub .over { color:#FF8A8A; }
        .nhd-ball-zone { position:relative; padding:26px 18px 20px; display:flex; flex-direction:column; align-items:center; justify-content:center;
          background:linear-gradient(180deg, rgba(15,36,27,.15), rgba(15,36,27,.55)), url("/images/photos/green.jpg"); background-size:cover; background-position:center 55%; min-height:200px; }
        .nhd-ball { position:relative; width:150px; height:150px; border-radius:50%; border:0; cursor:pointer;
          background:radial-gradient(circle at 38% 32%, #fff, #dfe4df 78%, #c3ccc4);
          box-shadow:0 18px 34px rgba(0,0,0,.35), inset 0 -10px 20px rgba(0,0,0,.12), inset 0 6px 14px rgba(255,255,255,.7);
          display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .nhd-count { font-family:var(--font-display); font-size:66px; line-height:.8; color:var(--green-deep); }
        .nhd-count-anim { display:inline-block; animation:nhdSoft .5s cubic-bezier(.22,.61,.36,1); }
        .nhd-strokes-lbl { font-size:10px; letter-spacing:.22em; color:var(--green-mid); font-weight:800; margin-top:2px; }
        .nhd-hitting { margin-top:12px; display:inline-flex; gap:6px; align-items:center; background:#fff; color:var(--green-deep);
          font-size:11px; font-weight:800; letter-spacing:.05em; padding:5px 14px; border-radius:999px; box-shadow:0 6px 14px rgba(0,0,0,.18); }
        .nhd-hitting .n { color:var(--lime-ink,#5C7A12); }
        .nhd-actions { display:flex; gap:8px; padding:12px 16px 14px; background:#0f241b; }
        .nhd-act { flex:1; border-radius:12px; background:#fff; color:var(--green-deep); font-weight:700; font-size:13px; padding:12px; text-align:center; }
        .nhd-act.dim { flex:0 0 44px; background:rgba(255,255,255,.12); color:rgba(255,255,255,.7); }
        .nhd-act.go { flex:1.7; background:linear-gradient(135deg,var(--green-mid),var(--green-light)); color:#fff; }
        .nhd-card { display:flex; gap:5px; padding:12px 16px 16px; background:#0b1a13; overflow:hidden; }
        .nhd-cell { flex:1; text-align:center; font-size:12px; font-weight:800; color:rgba(255,255,255,.85); background:rgba(255,255,255,.06); border-radius:7px; padding:8px 0; }
        .nhd-cell.now { background:var(--lime); color:#14240E; }

        .nhd-watch { position:absolute; left:clamp(-30px,-3vw,-64px); bottom:14%; }
        .nhd-watch-body { width:clamp(120px,13vw,150px); background:linear-gradient(160deg,#2b2b2e,#111113); border-radius:36px; padding:10px;
          box-shadow:0 26px 54px rgba(0,0,0,.6), inset 0 0 0 2px rgba(255,255,255,.06); }
        .nhd-watch-screen { background:#0a0a0a; border-radius:26px; padding:12px 10px; text-align:center; }
        .nhd-w-top { font-size:8px; color:rgba(255,255,255,.55); letter-spacing:.06em; font-weight:700; display:flex; justify-content:space-between; }
        .nhd-w-ball { width:70px; height:70px; margin:8px auto 6px; border-radius:50%;
          background:radial-gradient(circle at 38% 32%, #fff, #dfe4df 80%); display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .nhd-w-count { font-family:var(--font-display); font-size:34px; line-height:.8; color:var(--green-deep); }
        .nhd-w-lbl { font-size:7px; letter-spacing:.16em; font-weight:800; color:var(--green-mid); }
        .nhd-w-btns { display:flex; gap:4px; margin-top:6px; }
        .nhd-w-btn { flex:1; font-size:7px; font-weight:800; color:rgba(255,255,255,.75); background:rgba(255,255,255,.1); border-radius:8px; padding:6px 2px; letter-spacing:.04em; }
        .nhd-w-btn.p { color:var(--lime); }

        @keyframes nhdSoft { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
        @keyframes nhdFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .nhd-float { animation:nhdFloat 6.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .nhd-float{animation:none} .nhd-count-anim{animation:none} }
        @media (max-width:900px){ .nhd-watch{ left:-14px; bottom:10%; } }
      `}</style>

      <div className="nhd-float" style={{ position: "relative" }}>
        <div className="nhd-phone">
          <div className="nhd-screen">
            <div className="nhd-bar">
              <span className="nhd-quit">‹ Quit</span>
              <span className="nhd-hole"><span className="k">HOLE</span><span className="v">8 / 18</span></span>
              <span className="nhd-menu">☰</span>
            </div>
            <div className="nhd-sub">
              <span><span className="k">PAR</span><div className="v">4</div></span>
              <span style={{ textAlign: "center" }}><span className="k">VS PAR</span><div className="v over">+3</div></span>
              <span style={{ textAlign: "right" }}><span className="k">ROUND TOTAL</span><div className="v">33</div></span>
            </div>
            <div className="nhd-ball-zone">
              <button type="button" className="nhd-ball" onClick={onTap} aria-label="Tap the ball to count a stroke">
                <span className="nhd-count"><span key={strokes} className="nhd-count-anim">{strokes}</span></span>
                <span className="nhd-strokes-lbl">STROKES</span>
              </button>
              <span className="nhd-hitting">HITTING <span className="n">{strokes + 1}</span></span>
            </div>
            <div className="nhd-actions">
              <div className="nhd-act dim">•••</div>
              <div className="nhd-act">↶ Undo</div>
              <div className="nhd-act go">Next Hole →</div>
            </div>
            <div className="nhd-card">
              {CARD.map((v, i) => (<div key={i} className="nhd-cell">{v}</div>))}
              <div className="nhd-cell now">{strokes}</div>
            </div>
          </div>
        </div>

        <div className="nhd-watch" aria-hidden="true">
          <div className="nhd-watch-body">
            <div className="nhd-watch-screen">
              <div className="nhd-w-top"><span>HOLE 8</span><span>PAR 4</span></div>
              <div className="nhd-w-ball">
                <span className="nhd-w-count"><span key={watchStrokes} className="nhd-count-anim">{watchStrokes}</span></span>
                <span className="nhd-w-lbl">STROKES</span>
              </div>
              <div className="nhd-w-btns">
                <span className="nhd-w-btn p">+1</span>
                <span className="nhd-w-btn">NEXT</span>
                <span className="nhd-w-btn">UNDO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
