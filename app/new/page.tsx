import type { Metadata } from "next";
import Link from "next/link";
import HeroDevices from "@/components/HeroDevices";
import StoreBadges from "@/components/StoreBadges";
import TrackedCta from "@/components/TrackedCta";
import { APP_STORE_URL, APP_URL } from "@/lib/site";

// Isolated homepage redesign preview. Noindexed — this is a review route, not a
// live page. All styling is namespaced .nh-* and scoped to this page via an
// inline <style>, so nothing here touches the live site.
export const metadata: Metadata = {
  title: "SimplyStroke — homepage redesign preview",
  description: "Preview of the redesigned SimplyStroke homepage.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/new/" },
};

const PH = "/images/photos";
const SC = "/images/app-screens";

export default function NewHome() {
  return (
    <main className="nh">
      <style>{`
        .nh { --pad: clamp(20px,5vw,64px); --wrap:1200px; color:var(--ink); overflow-x:clip; }
        .nh-wrap { max-width:var(--wrap); margin:0 auto; padding-inline:var(--pad); }
        .nh h1,.nh h2,.nh h3,.nh .disp { font-family:var(--font-display); font-weight:400; text-transform:uppercase; line-height:.9; letter-spacing:.01em; }
        .nh .ey { font-size:12px; letter-spacing:.16em; text-transform:uppercase; font-weight:700; color:var(--green-mid); }
        .nh p { line-height:1.65; }
        .nh a { text-decoration:none; }

        /* ---------- HERO ---------- */
        .nh-hero { position:relative; min-height:clamp(560px,82vh,860px); display:flex; align-items:center;
          background:
            linear-gradient(103deg, rgba(12,28,20,.92) 0%, rgba(15,36,27,.72) 42%, rgba(20,50,37,.30) 72%, rgba(20,50,37,.12) 100%),
            url("${PH}/golfball2.jpg"); background-size:cover; background-position:center 62%; }
        .nh-hero-inner { display:grid; grid-template-columns:1.15fr .85fr; gap:clamp(28px,4vw,64px); align-items:center; width:100%; padding-block:clamp(80px,10vw,120px); }
        .nh-hero-eyebrow { display:inline-flex; align-items:center; gap:9px; color:var(--lime-text); font-size:13px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; }
        .nh-hero-eyebrow::before { content:""; width:9px; height:9px; border-radius:50%; background:var(--lime); box-shadow:0 0 0 4px rgba(150,196,30,.25); }
        .nh-hero h1 { color:#fff; font-size:clamp(58px,9vw,128px); margin-top:20px; }
        .nh-hero h1 .li { color:var(--lime); }
        .nh-hero-p { color:rgba(255,255,255,.9); font-size:clamp(17px,1.6vw,21px); font-weight:500; max-width:44ch; margin-top:22px; }
        .nh-cta { display:flex; align-items:center; gap:18px; flex-wrap:wrap; margin-top:32px; }
        .nh-btn { display:inline-flex; align-items:center; gap:9px; background:var(--lime); color:#14240E; font-weight:800; font-size:17px; padding:16px 30px; box-shadow:0 14px 30px rgba(150,196,30,.32); }
        .nh-btn:hover { filter:brightness(1.04); }
        .nh-webcta { color:var(--lime-text); font-weight:700; font-size:16px; margin-top:16px; display:inline-block; }
        .nh-badges { margin-top:26px; }
        .nh-phonewrap { justify-self:center; position:relative; }
        .nh-phone { width:clamp(230px,26vw,310px); border-radius:40px; padding:11px; background:linear-gradient(160deg,#20241f,#0c0f0b); box-shadow:0 50px 90px rgba(0,0,0,.55), inset 0 0 0 2px rgba(255,255,255,.06); }
        .nh-phone img { width:100%; border-radius:30px; display:block; }
        .nh-phonetag { position:absolute; bottom:-14px; left:50%; transform:translateX(-50%); white-space:nowrap; background:#0E140F; color:var(--lime-text); font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:7px 14px; border-radius:999px; }

        /* ---------- STAT STRIP ---------- */
        .nh-stats { background:var(--green-deep); }
        .nh-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        .nh-stat { padding:clamp(30px,4vw,52px) 24px; text-align:center; border-left:1px solid rgba(255,255,255,.08); }
        .nh-stat:first-child { border-left:0; }
        .nh-stat svg { width:34px; height:34px; color:var(--lime); margin:0 auto; }
        .nh-stat .n { font-family:var(--font-display); font-size:clamp(40px,5vw,64px); color:#fff; line-height:.85; margin-top:14px; }
        .nh-stat .l { color:rgba(255,255,255,.65); font-size:13.5px; margin-top:10px; font-weight:500; }

        /* ---------- SECTION SHELL ---------- */
        .nh-sec { padding-block:var(--section-pad-y); }
        .nh-sec.cream { background:var(--cream); }
        .nh-head { max-width:720px; }
        .nh-head.center { margin-inline:auto; text-align:center; }
        .nh-head h2 { color:var(--green-deep); font-size:clamp(38px,5.4vw,76px); margin-top:14px; }
        .nh-head p { color:var(--gray-dark); font-size:clamp(16px,1.4vw,19px); font-weight:500; margin-top:18px; }

        /* ---------- HOW IT WORKS (phones) ---------- */
        .nh-steps { display:grid; grid-template-columns:repeat(2,1fr); gap:clamp(28px,5vw,72px) clamp(28px,6vw,96px); margin:56px auto 0; max-width:700px; }
        .nh-step { text-align:center; max-width:300px; margin-inline:auto; }
        .nh-step-frame { border-radius:34px; padding:10px; background:linear-gradient(160deg,#20241f,#0c0f0b); box-shadow:0 30px 56px rgba(20,50,37,.2); }
        .nh-step-frame img { width:100%; height:auto; aspect-ratio:270/540; object-fit:cover; border-radius:24px; display:block; }
        .nh-step .num { display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:var(--green-deep); color:#fff; font-size:13px; font-weight:800; margin-top:22px; }
        .nh-step h3 { font-size:24px; color:var(--green-deep); margin-top:12px; }
        .nh-step p { color:var(--gray-body); font-size:14.5px; margin-top:6px; }

        /* ---------- FULL-BLEED PHOTO DIVIDER ---------- */
        .nh-divider { position:relative; min-height:clamp(300px,40vw,480px); display:flex; align-items:center; background-size:cover; }
        .nh-divider.d1 { background-image:linear-gradient(90deg,rgba(12,28,20,.85),rgba(12,28,20,.15)); background-position:center 60%; }
        .nh-divider.d1::before { content:""; position:absolute; inset:0; z-index:-1; background:url("${PH}/green.jpg") center 55%/cover; }
        .nh-divider.d2 { background-position:center 40%; }
        .nh-divider.d2::before { content:""; position:absolute; inset:0; z-index:-1; background:url("${PH}/456454.jpg") center 35%/cover; }
        .nh-divider.d2 { background-image:linear-gradient(75deg,rgba(12,28,20,.88),rgba(12,28,20,.2)); }
        .nh-divider .q { position:relative; z-index:1; }
        .nh-divider .q .disp { color:#fff; font-size:clamp(34px,5vw,72px); max-width:18ch; }
        .nh-divider .q p { color:rgba(255,255,255,.82); font-size:18px; max-width:46ch; margin-top:18px; font-weight:500; }

        /* ---------- SIMPLE GRID ---------- */
        .nh-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; margin-top:52px; background:var(--hair,rgba(27,67,50,.1)); border:1px solid rgba(27,67,50,.1); }
        .nh-cell { background:var(--offwhite); padding:clamp(26px,3vw,40px); }
        .nh-cell svg { width:32px; height:32px; color:var(--green-mid); }
        .nh-cell h3 { font-size:26px; color:var(--green-deep); margin-top:16px; }
        .nh-cell p { color:var(--gray-body); font-size:15px; margin-top:8px; }

        /* ---------- SPLIT (image + copy) ---------- */
        .nh-split { display:grid; grid-template-columns:1fr 1fr; gap:clamp(30px,5vw,72px); align-items:center; }
        .nh-split.rev .nh-split-media { order:2; }
        .nh-split-media { border-radius:18px; overflow:hidden; box-shadow:0 30px 60px rgba(20,50,37,.2); aspect-ratio:4/5; }
        .nh-split-media img { width:100%; height:100%; object-fit:cover; }
        .nh-split-copy h2 { color:var(--green-deep); font-size:clamp(36px,4.6vw,64px); }
        .nh-split-copy p { color:var(--gray-dark); font-size:17px; font-weight:500; margin-top:20px; max-width:48ch; }
        .nh-list { list-style:none; padding:0; margin:26px 0 0; display:flex; flex-direction:column; gap:14px; }
        .nh-list li { position:relative; padding-left:30px; font-size:16px; color:var(--gray-dark); }
        .nh-list li::before { content:""; position:absolute; left:0; top:6px; width:14px; height:14px; background:var(--lime); }

        /* ---------- GROUP (dark) ---------- */
        .nh-group { background:linear-gradient(165deg,var(--green-deep),#123527); color:#fff; }
        .nh-group h2 { color:#fff; }
        .nh-group p { color:rgba(255,255,255,.85); }
        .nh-lb { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:16px; overflow:hidden; }
        .nh-lb-top { display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid rgba(255,255,255,.1); font-size:13px; color:rgba(255,255,255,.7); }
        .nh-live { display:inline-flex; align-items:center; gap:7px; color:var(--lime); font-weight:700; }
        .nh-live i { width:8px; height:8px; border-radius:50%; background:var(--lime); box-shadow:0 0 0 4px rgba(150,196,30,.25); }
        .nh-lb-row { display:flex; justify-content:space-between; align-items:center; padding:15px 20px; border-top:1px solid rgba(255,255,255,.06); }
        .nh-lb-who { display:flex; align-items:center; gap:12px; }
        .nh-lb-dot { width:34px; height:34px; border-radius:50%; display:grid; place-items:center; font-weight:800; color:#12241a; }
        .nh-lb-score { font-family:var(--font-display); font-size:26px; }
        .nh-lb-score.under { color:var(--lime); } .nh-lb-score.over { color:#FF8A8A; }

        /* ---------- FINAL CTA ---------- */
        .nh-final { position:relative; text-align:center; color:#fff;
          background:linear-gradient(180deg,rgba(12,28,20,.86),rgba(12,28,20,.92)), url("${PH}/43342.jpg"); background-size:cover; background-position:center 40%; }
        .nh-final h2 { color:#fff; font-size:clamp(46px,7vw,104px); }
        .nh-final p { color:rgba(255,255,255,.85); font-size:18px; max-width:46ch; margin:20px auto 0; font-weight:500; }
        .nh-final .nh-cta { justify-content:center; }
        .nh-note { color:rgba(255,255,255,.5); font-size:13px; margin-top:22px; }

        @media (max-width:900px){
          .nh-hero-inner{ grid-template-columns:1fr; text-align:center; }
          .nh-hero-p{ margin-inline:auto; } .nh-cta{ justify-content:center; }
          .nh-hero-eyebrow{ justify-content:center; }
          .nh-phonewrap{ margin-top:12px; }
          .nh-stats-grid{ grid-template-columns:repeat(2,1fr); } .nh-stat:nth-child(3){ border-left:0; }
          .nh-steps{ grid-template-columns:repeat(2,1fr); }
          .nh-grid{ grid-template-columns:1fr; }
          .nh-split{ grid-template-columns:1fr; } .nh-split.rev .nh-split-media{ order:0; }
          .nh-split-media{ aspect-ratio:16/10; max-height:340px; }
        }
        @media (max-width:520px){ .nh-steps{ grid-template-columns:1fr; max-width:320px; margin-inline:auto; } .nh-stats-grid{ grid-template-columns:1fr; } .nh-stat{ border-left:0; border-top:1px solid rgba(255,255,255,.08); } }
      `}</style>

      {/* ===== HERO ===== */}
      <header className="nh-hero">
        <div className="nh-wrap nh-hero-inner">
          <div>
            <span className="nh-hero-eyebrow">Free core scoring · One tap per shot</span>
            <h1>Golf&apos;s simplest<br /><span className="li">stroke counter.</span></h1>
            <p className="nh-hero-p">
              No math. No distraction. Just tap. Free core scoring, works offline,
              and no account needed to start.
            </p>
            <div className="nh-cta">
              <TrackedCta event="app_store_click" ctaLocation="new_hero" href={APP_STORE_URL} className="nh-btn" aria-label="Download SimplyStroke on the App Store">
                Download on the App Store →
              </TrackedCta>
            </div>
            <div className="nh-badges"><StoreBadges ctaLocation="new_hero_badge" /></div>
            <TrackedCta event="web_app_click" ctaLocation="new_hero" href={APP_URL} className="nh-webcta">
              or play free in your browser →
            </TrackedCta>
          </div>
          <HeroDevices />
        </div>
      </header>

      {/* ===== STAT STRIP ===== */}
      <section className="nh-stats">
        <div className="nh-wrap nh-stats-grid">
          <div className="nh-stat">
            <svg viewBox="0 0 48 48" fill="currentColor"><path d="M36,17c0-6.62-5.38-12-12-12s-12,5.38-12,12c0,2.4.73,4.75,2.07,6.72-.65.55-1.07,1.36-1.07,2.28,0,1.65,1.35,3,3,3h.18c-.11.31-.18.65-.18,1,0,1.65,1.35,3,3,3h2v9c0,.55.45,1,1,1s1-.45,1-1v-9h2v9c0,.55.45,1,1,1s1-.45,1-1v-9h2c1.65,0,3-1.35,3-3,0-.35-.07-.69-.18-1h.18c1.65,0,3-1.35,3-3,0-.92-.42-1.73-1.07-2.28,1.34-1.97,2.07-4.32,2.07-6.72ZM14,17c0-5.51,4.49-10,10-10s10,4.49,10,10c0,2.17-.72,4.28-2.01,6h-15.98c-1.29-1.72-2.01-3.83-2.01-6Z"/></svg>
            <div className="n">1 tap</div><div className="l">per shot — never do the math</div>
          </div>
          <div className="nh-stat">
            <svg viewBox="0 0 48 48" fill="currentColor"><path d="M25,26v-5.4l13.45-6.73c.34-.16.55-.51.55-.89s-.21-.73-.55-.89l-14-7c-.31-.16-.68-.14-.98.04-.29.18-.47.5-.47.85v20.04c-10.01.44-18,7.42-18,15.96,0,.55.45,1,1,1s1-.45,1-1c0-7.44,7.09-13.53,16-13.96v2.02c-2.87.31-5,1.93-5,3.94,0,2.24,2.64,4,6,4s6-1.76,6-4c0-2.01-2.13-3.63-5-3.94v-2.02c8.91.43,16,6.52,16,13.96,0,.55.45,1,1,1s1-.45,1-1c0-8.54-7.99-15.52-18-15.96ZM25,7.6l10.76,5.38-10.76,5.38V7.6Z"/></svg>
            <div className="n">Free</div><div className="l">core scoring, no subscription</div>
          </div>
          <div className="nh-stat">
            <svg viewBox="0 0 48 48" fill="currentColor"><path d="M25,26v-5.4l13.45-6.73c.34-.16.55-.51.55-.89s-.21-.73-.55-.89l-14-7c-.31-.16-.68-.14-.98.04-.29.18-.47.5-.47.85v20.04c-10.01.44-18,7.42-18,15.96,0,.55.45,1,1,1s1-.45,1-1c0-7.44,7.09-13.53,16-13.96v2.02c-2.87.31-5,1.93-5,3.94,0,2.24,2.64,4,6,4s6-1.76,6-4c0-2.01-2.13-3.63-5-3.94v-2.02c8.91.43,16,6.52,16,13.96,0,.55.45,1,1,1s1-.45,1-1c0-8.54-7.99-15.52-18-15.96Z"/></svg>
            <div className="n">Offline</div><div className="l">your solo round, no signal</div>
          </div>
          <div className="nh-stat">
            <svg viewBox="0 0 48 48" fill="currentColor"><path d="M40,15h-6.18c.11-.31.18-.65.18-1,0-1.65-1.35-3-3-3h-2.1c-.46-2.28-2.49-4-4.9-4s-4.44,1.72-4.9,4h-2.1c-1.65,0-3,1.35-3,3,0,.35.07.69.18,1h-6.18c-1.65,0-3,1.35-3,3v20c0,1.65,1.35,3,3,3h32c1.65,0,3-1.35,3-3v-20c0-1.65-1.35-3-3-3ZM41,38c0,.55-.45,1-1,1H8c-.55,0-1-.45-1-1v-20c0-.55.45-1,1-1h32c.55,0,1,.45,1,1v20Z"/></svg>
            <div className="n">No login</div><div className="l">no account needed to start</div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="nh-sec">
        <div className="nh-wrap">
          <div className="nh-head center">
            <span className="ey">A peek inside</span>
            <h2>A few taps, start to finish.</h2>
          </div>
          <div className="nh-steps">
            <div className="nh-step">
              <div className="nh-step-frame"><img src={`${SC}/home.png`} alt="SimplyStroke home screen with start new round" width={270} height={540} /></div>
              <div className="num">1</div><h3>Start your round</h3><p>Get going in one tap.</p>
            </div>
            <div className="nh-step">
              <div className="nh-step-frame"><img src={`${SC}/course.png`} alt="SimplyStroke course select screen" width={270} height={540} /></div>
              <div className="num">2</div><h3>Pick a course</h3><p>Or skip it and just count.</p>
            </div>
            <div className="nh-step">
              <div className="nh-step-frame"><img src={`${SC}/round.png`} alt="SimplyStroke active round, tap the golf ball" width={270} height={540} /></div>
              <div className="num">3</div><h3>Tap the ball</h3><p>One tap per shot. Undo fixes a mis-tap.</p>
            </div>
            <div className="nh-step">
              <div className="nh-step-frame"><img src={`${SC}/scorecard.png`} alt="SimplyStroke finished scorecard" width={270} height={540} /></div>
              <div className="num">4</div><h3>Get your card</h3><p>Every hole, math already done.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PHOTO DIVIDER 1 ===== */}
      <section className="nh-divider d1">
        <div className="nh-wrap q">
          <div className="disp">Count this stroke. That&apos;s the whole app.</div>
          <p>No GPS overlay, no feed to scroll, no setup wizard. One giant button on screen, and the number lives there instead of in your head.</p>
        </div>
      </section>

      {/* ===== SIMPLE ON PURPOSE ===== */}
      <section className="nh-sec cream">
        <div className="nh-wrap">
          <div className="nh-head">
            <span className="ey">Simple on purpose</span>
            <h2>Built to stay out of your way.</h2>
            <p>The whole app is a stroke counter and a scorecard. That is the point, not a limitation.</p>
          </div>
          <div className="nh-grid">
            <div className="nh-cell"><h3>No math, ever</h3><p>The running number lives on the screen, not in your head.</p></div>
            <div className="nh-cell"><h3>Gloves on, one hand</h3><p>Oversized buttons you can hit without looking.</p></div>
            <div className="nh-cell"><h3>Works with no signal</h3><p>Your solo round keeps going in a back-nine dead zone.</p></div>
            <div className="nh-cell"><h3>Never lose a round</h3><p>Every tap is saved the instant you make it.</p></div>
            <div className="nh-cell"><h3>Undo anything</h3><p>Fat-fingered a tap? One undo fixes it.</p></div>
            <div className="nh-cell"><h3>Set up in one tap</h3><p>Near Me finds your course and fills in the pars.</p></div>
          </div>
        </div>
      </section>

      {/* ===== GROUP SCORING ===== */}
      <section className="nh-sec nh-group">
        <div className="nh-wrap nh-split">
          <div className="nh-split-copy">
            <span className="ey" style={{ color: "var(--lime-text)" }}>Play with your group</span>
            <h2 style={{ color: "#fff" }}>One code. Everyone&apos;s scores. Live.</h2>
            <p>Start a round, share a 6-character code, and everyone taps their own strokes on their own phone. One scorecard, updating in real time.</p>
            <ul className="nh-list" style={{ color: "rgba(255,255,255,.85)" }}>
              <li>Friends join as guests — no sign-up.</li>
              <li>Every phone shows the same live leaderboard.</li>
              <li>Nobody waits until 18 to find out how it went.</li>
            </ul>
            <div className="nh-cta">
              <TrackedCta event="web_app_click" ctaLocation="new_group" href={APP_URL} className="nh-btn">Start a group round →</TrackedCta>
            </div>
          </div>
          <div className="nh-lb" aria-hidden="true">
            <div className="nh-lb-top"><span>Saturday · Front Nine</span><span className="nh-live"><i />Live</span></div>
            <div className="nh-lb-row"><span className="nh-lb-who"><span className="nh-lb-dot" style={{ background: "#96C41E" }}>Y</span>You</span><span className="nh-lb-score under">+2</span></div>
            <div className="nh-lb-row"><span className="nh-lb-who"><span className="nh-lb-dot" style={{ background: "#FF6B6B", color: "#fff" }}>M</span>Marcus</span><span className="nh-lb-score over">+5</span></div>
            <div className="nh-lb-row"><span className="nh-lb-who"><span className="nh-lb-dot" style={{ background: "#4A90D9", color: "#fff" }}>D</span>Dave</span><span className="nh-lb-score over">+7</span></div>
            <div className="nh-lb-row"><span className="nh-lb-who"><span className="nh-lb-dot" style={{ background: "#F5C451" }}>P</span>Priya</span><span className="nh-lb-score under">E</span></div>
          </div>
        </div>
      </section>

      {/* ===== TOURNAMENT (coming soon) ===== */}
      <section className="nh-sec cream">
        <div className="nh-wrap nh-split">
          <div className="nh-split-copy">
            <span className="ey">Tournament · Coming soon</span>
            <h2 style={{ color: "var(--green-deep)" }}>Run the whole outing on one board.</h2>
            <p>A scramble, a league night, a charity day — Tournament pulls every group onto one live, cross-group leaderboard, and players join by code from their own phones. When it lands, joining an outing will always be free.</p>
            <ul className="nh-list">
              <li>Every group&apos;s scores roll up to one live board.</li>
              <li>Join by code — no account, no setup.</li>
              <li>Spectators can follow along on the web.</li>
            </ul>
            <Link href="/tournament/" className="nh-webcta" style={{ color: "var(--green-mid)" }}>See how Tournament works →</Link>
          </div>
          <div className="nh-lb" aria-hidden="true">
            <div className="nh-lb-top"><span>Charity Scramble · 6 groups</span><span className="nh-live"><i />Live</span></div>
            <div className="nh-lb-row"><span className="nh-lb-who"><span className="nh-lb-dot" style={{ background: "#96C41E" }}>1</span>Team Bogey Boys</span><span className="nh-lb-score under">-4</span></div>
            <div className="nh-lb-row"><span className="nh-lb-who"><span className="nh-lb-dot" style={{ background: "#4A90D9", color: "#fff" }}>2</span>The Sandbaggers</span><span className="nh-lb-score under">-1</span></div>
            <div className="nh-lb-row"><span className="nh-lb-who"><span className="nh-lb-dot" style={{ background: "#F5C451" }}>3</span>Fairway to Heaven</span><span className="nh-lb-score over">+2</span></div>
            <div className="nh-lb-row"><span className="nh-lb-who"><span className="nh-lb-dot" style={{ background: "#FF6B6B", color: "#fff" }}>4</span>Grip It &amp; Sip It</span><span className="nh-lb-score over">+5</span></div>
          </div>
        </div>
      </section>

      {/* ===== WHY SIMPLE / SPLIT PHOTO ===== */}
      <section className="nh-sec">
        <div className="nh-wrap nh-split rev">
          <div className="nh-split-media"><img src={`${PH}/66454.jpg`} alt="A golfer crouched reading a putt at dusk" /></div>
          <div className="nh-split-copy">
            <span className="ey">Why a counter, not a coach</span>
            <h2>Keep your head in the game.</h2>
            <p>The big golf apps bury your score under GPS maps, strokes-gained charts, handicaps and a social feed — and charge $30 to $200 a year for it. If the only thing that keeps going wrong is the count, none of that helps.</p>
            <p>SimplyStroke does one thing and does it in a single tap, so the number is always right when you reach the green.</p>
            <Link href="/compare/" className="nh-webcta" style={{ color: "var(--green-mid)" }}>See how it compares to the big apps →</Link>
          </div>
        </div>
      </section>

      {/* ===== PHOTO DIVIDER 2 (Apple Watch companion) ===== */}
      <section className="nh-divider d2">
        <div className="nh-wrap q">
          <span className="nh-hero-eyebrow" style={{ color: "var(--lime-text)" }}>Apple Watch companion</span>
          <div className="disp" style={{ marginTop: 14 }}>Score from your wrist.</div>
          <p>Tap the watch face to log a shot with a haptic tick; every stroke syncs to your iPhone scorecard. The Apple Watch companion comes with the app.</p>
          <div className="nh-cta">
            <TrackedCta event="app_store_click" ctaLocation="new_watch" href={APP_STORE_URL} className="nh-btn">Download on the App Store →</TrackedCta>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="nh-sec nh-final">
        <div className="nh-wrap">
          <span className="nh-hero-eyebrow" style={{ color: "var(--lime-text)", justifyContent: "center" }}>Now on the App Store</span>
          <h2>Play your next round with it.</h2>
          <p>Free core scoring for iPhone and Apple Watch. No subscription, no ads, and no account to start. Android coming soon.</p>
          <div className="nh-cta">
            <TrackedCta event="app_store_click" ctaLocation="new_final" href={APP_STORE_URL} className="nh-btn" aria-label="Download SimplyStroke on the App Store">Download on the App Store →</TrackedCta>
          </div>
          <div className="nh-note">Preview build · not indexed. Prefer the browser? <TrackedCta event="web_app_click" ctaLocation="new_final" href={APP_URL} style={{ color: "var(--lime-text)", fontWeight: 700 }}>Play free in your browser →</TrackedCta></div>
        </div>
      </section>
    </main>
  );
}
