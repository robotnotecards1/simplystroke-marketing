/**
 * Static phone mockup of the Active Round screen (hero, right column).
 * Frozen at 3 strokes / hitting 4 with a CSS pulsing ring, per the design.
 */
export default function HeroPhone() {
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
                <div className="sub-num">38</div>
              </div>
            </div>
            <div className="ph-scorebanner">
              <div className="ph-overpar">+2</div>
              <div className="ph-overpar-label">Over Par</div>
            </div>
            <div className="ph-main">
              <div className="ph-ballwrap">
                <span className="ph-pulse" />
                <div className="ph-ball">
                  <span className="ph-dimples" />
                  <span className="ph-strokes">3</span>
                  <span className="ph-strokes-label">STROKES</span>
                  <span className="ph-hitting">
                    HITTING <span className="num">4</span>
                  </span>
                </div>
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
