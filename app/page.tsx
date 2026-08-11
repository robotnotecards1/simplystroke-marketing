import type { Metadata } from "next";
import Link from "next/link";
import HeroDevices from "@/components/HeroDevices";
import StoreBadges from "@/components/StoreBadges";
import TrackedCta from "@/components/TrackedCta";
import { APP_STORE_URL, APP_URL, og } from "@/lib/site";
import { appNode, graph, organizationNode, websiteNode } from "@/lib/schema";
import { getAppStoreData } from "@/lib/appStore";

const PH = "/images/photos";
const SC = "/images/app-screens";

// Inline golf line-icons (purchased icon library) + a few drawn, for the stat
// strip and the "simple on purpose" grid.
const I = {
  ball: <svg viewBox="0 0 48 48" fill="currentColor"><path d="M36,17c0-6.62-5.38-12-12-12s-12,5.38-12,12c0,2.4.73,4.75,2.07,6.72-.65.55-1.07,1.36-1.07,2.28,0,1.65,1.35,3,3,3h.18c-.11.31-.18.65-.18,1,0,1.65,1.35,3,3,3h2v9c0,.55.45,1,1,1s1-.45,1-1v-9h2v9c0,.55.45,1,1,1s1-.45,1-1v-9h2c1.65,0,3-1.35,3-3,0-.35-.07-.69-.18-1h.18c1.65,0,3-1.35,3-3,0-.92-.42-1.73-1.07-2.28,1.34-1.97,2.07-4.32,2.07-6.72ZM14,17c0-5.51,4.49-10,10-10s10,4.49,10,10c0,2.17-.72,4.28-2.01,6h-15.98c-1.29-1.72-2.01-3.83-2.01-6ZM29,31h-10c-.55,0-1-.45-1-1s.45-1,1-1h10c.55,0,1,.45,1,1s-.45,1-1,1ZM32,27h-16c-.55,0-1-.45-1-1s.45-1,1-1h16c.55,0,1,.45,1,1s-.45,1-1,1Z"/></svg>,
  card: <svg viewBox="0 0 48 48" fill="currentColor"><path d="M40,15h-6.18c.11-.31.18-.65.18-1,0-1.65-1.35-3-3-3h-2.1c-.46-2.28-2.49-4-4.9-4s-4.44,1.72-4.9,4h-2.1c-1.65,0-3,1.35-3,3,0,.35.07.69.18,1h-6.18c-1.65,0-3,1.35-3,3v20c0,1.65,1.35,3,3,3h32c1.65,0,3-1.35,3-3v-20c0-1.65-1.35-3-3-3ZM17,13h3c.55,0,1-.45,1-1,0-1.65,1.35-3,3-3s3,1.35,3,3c0,.55.45,1,1,1h3c.55,0,1,.45,1,1s-.45,1-1,1h-14c-.55,0-1-.45-1-1s.45-1,1-1ZM41,38c0,.55-.45,1-1,1H8c-.55,0-1-.45-1-1v-20c0-.55.45-1,1-1h32c.55,0,1,.45,1,1v20Z"/><path d="M38,19H10c-.55,0-1,.45-1,1v16c0,.55.45,1,1,1h28c.55,0,1-.45,1-1v-16c0-.55-.45-1-1-1ZM25,35h-10v-10h10v10ZM31,35h-4v-10h4v10ZM37,35h-4v-10h4v10Z"/></svg>,
  course: <svg viewBox="0 0 48 48" fill="currentColor"><path d="M25.45,23.11l-14-7c-.31-.16-.68-.14-.98.04-.29.18-.47.5-.47.85v16.06c-2.87.31-5,1.93-5,3.94,0,2.24,2.64,4,6,4s6-1.76,6-4c0-2.01-2.13-3.63-5-3.94v-1.44l13.45-6.73c.34-.16.55-.51.55-.89s-.21-.73-.55-.89ZM12,29.38v-10.76l10.76,5.38-10.76,5.38Z"/><path d="M36,27c-3.859,0-7,3.14-7,7s3.141,7,7,7,7-3.14,7-7-3.141-7-7-7ZM36,39c-2.757,0-5-2.243-5-5s2.243-5,5-5,5,2.243,5,5-2.243,5-5,5Z"/></svg>,
  bag: <svg viewBox="0 0 48 48" fill="currentColor"><path d="M37,21h-5v-.18c1.16-.42,2-1.52,2-2.82,0-1.65-1.35-3-3-3h-1v-2h3c1.65,0,3-1.35,3-3v-2c0-1.65-1.35-3-3-3h-2c-3.86,0-7,3.14-7,7v3h-2v-3c0-3.86-3.14-7-7-7h-2c-1.65,0-3,1.35-3,3v2c0,1.65,1.35,3,3,3h3v2h-1c-1.65,0-3,1.35-3,3,0,1.3.84,2.4,2,2.82v15.18c0,1.3.84,2.4,2,2.82v1.18c0,1.65,1.35,3,3,3h8c1.65,0,3-1.35,3-3v-1.18c1.16-.42,2-1.52,2-2.82v-1h3c1.65,0,3-1.35,3-3v-10c0-.55-.45-1-1-1ZM28,40c0,.55-.45,1-1,1h-8c-.55,0-1-.45-1-1v-1h10v1ZM30,36c0,.55-.45,1-1,1h-12c-.55,0-1-.45-1-1v-15h14v15ZM31,19H15c-.55,0-1-.45-1-1s.45-1,1-1h16c.55,0,1,.45,1,1s-.45,1-1,1ZM36,32c0,.55-.45,1-1,1h-3v-10h4v9Z"/></svg>,
  tee: <svg viewBox="0 0 48 48" fill="currentColor"><path d="M32,23h-2.03c2.44-1.83,4.03-4.73,4.03-8,0-5.51-4.49-10-10-10s-10,4.49-10,10c0,3.27,1.59,6.17,4.03,8h-2.03c-1.65,0-3,1.35-3,3s1.35,3,3,3h.18c-.11.31-.18.65-.18,1,0,1.65,1.35,3,3,3h1.26l2.78,9.29c.13.42.52.71.96.71s.83-.29.96-.71l2.78-9.29h1.26c1.65,0,3-1.35,3-3,0-.35-.07-.69-.18-1h.18c1.65,0,3-1.35,3-3s-1.35-3-3-3ZM16,15c0-4.41,3.59-8,8-8s8,3.59,8,8-3.59,8-8,8-8-3.59-8-8ZM24,38.52l-1.66-5.52h3.32l-1.66,5.52ZM29,31h-10c-.55,0-1-.45-1-1s.45-1,1-1h10c.55,0,1,.45,1,1s-.45,1-1,1ZM32,27h-16c-.55,0-1-.45-1-1s.45-1,1-1h16c.55,0,1,.45,1,1s-.45,1-1,1Z"/></svg>,
  undo: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 22 L8 15 L15 10"/><path d="M8.5 15.5 H28 a12 12 0 0 1 0 24 H16"/></svg>,
  free: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"><path d="M24 7 H40 V23 L22 41 L7 26 Z"/><circle cx="33" cy="15" r="2.4" fill="currentColor" stroke="none"/></svg>,
  watch: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"><rect x="14" y="14" width="20" height="20" rx="6"/><path d="M18.5 14 L20 7 H28 L29.5 14"/><path d="M18.5 34 L20 41 H28 L29.5 34"/><path d="M24 20 V24 L27 26"/></svg>,
  group: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="15" r="5"/><circle cx="33" cy="18" r="4"/><path d="M8 39 v-2 a10 10 0 0 1 20 0 v2"/><path d="M30 31 a8 8 0 0 1 10 6 v2"/></svg>,
};

const TITLE = "Free Golf Scorecard App with One-Tap Scoring | SimplyStroke";
const DESCRIPTION =
  "One tap per shot and SimplyStroke keeps your score, par and round. A simple golf stroke counter and scorecard with live group scoring. Free, works offline.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: og(TITLE, DESCRIPTION, "/"),
};

// Homepage FAQ — the questions people type into Google and AI assistants, in the
// format answer engines quote. Rendered on-page AND as FAQPage schema; keep synced.
const faqs = [
  {
    q: "Is SimplyStroke free?",
    a: "Yes. Start counting your first round free, no account and no credit card to get going. If you just want the score, that is the whole app and it costs nothing to use.",
  },
  {
    q: "Is there a golf app that just counts strokes?",
    a: "That is the whole point of SimplyStroke. The screen is one giant golf ball. Tap it once per swing and the app holds your stroke count, your running total and your vs-par, then hands you a finished scorecard at the end. No GPS overlay, no feed to scroll.",
  },
  {
    q: "How do friends join my round?",
    a: "Share a 6-character code or a link. Friends join as a guest with no account, everyone taps their own strokes, and every score lands on one live scorecard.",
  },
  {
    q: "Does it work without signal on the course?",
    a: "Yes. Your solo round works offline, so a dead zone on the back nine never costs you your round. Your card syncs when you are back in range. (Live group scoring needs a connection.)",
  },
  {
    q: "Will I lose my round if my phone dies?",
    a: "No. Every stroke is saved the instant you tap it, so a force-quit or a dead battery mid-round never costs you the card. You pick up right where you left off.",
  },
  {
    q: "What if I tap twice by accident?",
    a: "Press undo. One tap, same screen, no hunting through a menu mid-hole. You can also edit any hole after the fact.",
  },
  {
    q: "Is SimplyStroke good for ADHD golfers?",
    a: "It was built with them in mind. Golf quietly asks you to hold a running number in working memory for ten-plus minutes a hole while doing nine other things, which is the exact task an ADHD brain drops first. SimplyStroke moves the number out of your head and into one tap.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default async function Home() {
  // App Store rating + 5-star reviews, fetched at build time (lib/appStore.ts).
  const { rating, reviews } = await getAppStoreData();

  // One @graph: the site, the company and the app. The app node carries the
  // real App Store rating when the build-time fetch succeeded; otherwise it
  // ships without aggregateRating rather than a stale or invented one.
  const entityJsonLd = graph(
    organizationNode,
    websiteNode,
    rating
      ? {
          ...appNode,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            ratingCount: rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : appNode
  );

  return (
    <main id="top" className="nh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(entityJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <style>{`
        .nh { --pad: clamp(20px,5vw,64px); --wrap:1200px; --fade: drop-shadow(0 30px 56px rgba(27,67,50,.30)); color:var(--ink); overflow-x:clip; }
        .nh-wrap { max-width:var(--wrap); margin:0 auto; padding-inline:var(--pad); }
        .nh h1,.nh h2,.nh h3,.nh .disp { font-family:var(--font-display); font-weight:400; text-transform:uppercase; line-height:.92; letter-spacing:.01em; text-wrap:balance; }
        .nh .ey { display:inline-block; font-size:15px; letter-spacing:.12em; text-transform:uppercase; font-weight:800; color:var(--green-mid); }
        .nh p { line-height:1.65; }
        .nh a { text-decoration:none; }

        /* ---------- HERO ---------- */
        .nh-hero { position:relative; min-height:clamp(560px,80vh,820px); display:flex; align-items:center;
          background:linear-gradient(103deg, rgba(12,28,20,.92) 0%, rgba(15,36,27,.72) 42%, rgba(20,50,37,.30) 72%, rgba(20,50,37,.12) 100%), url("${PH}/golfball2.jpg"); background-size:cover; background-position:center 62%; }
        .nh-hero-inner { display:grid; grid-template-columns:1.2fr .8fr; gap:clamp(28px,4vw,64px); align-items:center; width:100%; padding-block:clamp(72px,9vw,110px); }
        .nh-eyebrow { display:inline-flex; align-items:center; gap:9px; color:var(--lime-text); font-size:15px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
        .nh-eyebrow::before { content:""; width:9px; height:9px; border-radius:50%; background:var(--lime); box-shadow:0 0 0 4px rgba(150,196,30,.25); }
        .nh-hero h1 { color:#fff; font-size:clamp(46px,6.4vw,94px); margin-top:20px; }
        .nh-hero h1 .li { color:var(--lime); }
        .nh-hero-p { color:rgba(255,255,255,.9); font-size:clamp(17px,1.5vw,20px); font-weight:500; max-width:46ch; margin-top:22px; }
        .nh-cta { display:flex; align-items:center; gap:18px; flex-wrap:wrap; margin-top:32px; }
        .nh-btn { display:inline-flex; align-items:center; gap:9px; background:var(--lime); color:#14240E; font-weight:800; font-size:17px; padding:16px 30px; box-shadow:0 14px 30px rgba(150,196,30,.32); }
        .nh-btn:hover { filter:brightness(1.04); }
        .nh-webcta { color:var(--lime-text); font-weight:700; font-size:16px; margin-top:16px; display:inline-block; }
        .nh-badges { margin-top:26px; }
        .nh-rating { display:flex; align-items:center; gap:7px; margin-top:16px; color:rgba(255,255,255,.9); font-size:14px; font-weight:600; }
        .nh-rating .nh-rating-star { color:var(--lime); font-size:16px; }
        .nh-rating b { color:#fff; font-weight:800; }

        /* ---------- STAT STRIP ---------- */
        .nh-stats { background:var(--green-deep); }
        .nh-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        .nh-stat { padding:clamp(30px,4vw,52px) 24px; text-align:center; border-left:1px solid rgba(255,255,255,.08); }
        .nh-stat:first-child { border-left:0; }
        .nh-stat svg { width:36px; height:36px; color:var(--lime); margin:0 auto; }
        .nh-stat .n { font-family:var(--font-display); font-size:clamp(34px,4.2vw,54px); color:#fff; line-height:.85; margin-top:16px; }
        .nh-stat .l { color:rgba(255,255,255,.65); font-size:13.5px; margin-top:10px; font-weight:500; }

        /* ---------- SECTION SHELL ---------- */
        .nh-sec { padding-block:var(--section-pad-y); }
        .nh-sec.tex { background:linear-gradient(rgba(245,242,233,.62), rgba(241,238,229,.74)), url("${PH}/green.jpg"); background-size:cover; background-position:center; }
        .nh-sec.dark { background:linear-gradient(165deg,var(--green-deep),#123527); color:#fff; }
        .nh-sec.dark h2 { color:#fff; } .nh-sec.dark p, .nh-sec.dark .nh-split-copy p { color:rgba(255,255,255,.85); }
        .nh-sec.dark .nh-list li { color:rgba(255,255,255,.85); }
        .nh-head { max-width:720px; }
        .nh-head.center { margin-inline:auto; text-align:center; }
        .nh-head h2 { color:var(--green-deep); font-size:clamp(32px,4.2vw,58px); margin-top:14px; }
        .nh-head p { color:var(--gray-dark); font-size:clamp(16px,1.4vw,19px); font-weight:500; margin-top:18px; }

        /* ---------- HOW IT WORKS (phones) ---------- */
        .nh-steps { display:grid; grid-template-columns:repeat(2,1fr); gap:clamp(28px,5vw,72px) clamp(28px,6vw,96px); margin:56px auto 0; max-width:700px; }
        .nh-step { text-align:center; max-width:300px; margin-inline:auto; }
        .nh-devframe { padding:10px; background:linear-gradient(160deg,#20241f,#0c0f0b); border-radius:34px; filter:var(--fade); }
        .nh-devframe img { width:100%; height:auto; aspect-ratio:270/540; object-fit:cover; border-radius:24px; display:block; }
        .nh-step .num { display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:var(--green-deep); color:#fff; font-size:13px; font-weight:800; margin-top:24px; }
        .nh-step h3 { font-size:24px; color:var(--green-deep); margin-top:12px; }
        .nh-step p { color:var(--gray-body); font-size:14.5px; margin-top:6px; }

        /* ---------- FULL-BLEED DIVIDER ---------- */
        .nh-divider { position:relative; display:flex; align-items:center; padding-block:clamp(56px,8vw,110px); background-size:cover;
          background-image:linear-gradient(90deg,rgba(12,28,20,.88),rgba(12,28,20,.42)); background-position:center 58%; }
        .nh-divider::before { content:""; position:absolute; inset:0; z-index:-1; background:url("${PH}/green.jpg") center 55%/cover; }
        .nh-divider .q { position:relative; z-index:1; max-width:760px; }
        .nh-divider .q .ey { color:var(--lime-text); }
        .nh-divider .q .disp { color:#fff; font-size:clamp(28px,3.8vw,54px); margin-top:14px; max-width:none; white-space:nowrap; }
        .nh-divider .q p { color:rgba(255,255,255,.85); font-size:18px; max-width:52ch; margin-top:18px; font-weight:500; }
        .nh-nolist { display:flex; flex-wrap:wrap; gap:10px 12px; margin-top:26px; }
        .nh-nolist span { display:inline-flex; align-items:center; gap:8px; font-size:14px; font-weight:600; color:#fff; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.18); padding:8px 14px; }
        .nh-nolist span::before { content:"\\2715"; color:var(--lime); font-weight:800; }

        /* ---------- APPLE WATCH (wrist photo) ---------- */
        .nh-watch { position:relative; color:#fff; padding-block:clamp(72px,9vw,120px); min-height:clamp(440px,50vw,620px); display:flex; align-items:center;
          background:linear-gradient(90deg, rgba(12,28,20,.10) 0%, rgba(12,28,20,.30) 42%, rgba(12,28,20,.90) 100%), url("/images/watch-course-bg.webp"); background-size:cover; background-position:left center; }
        .nh-watch-copy { max-width:420px; margin-left:auto; margin-right:0; text-align:left; }
        .nh-watch-copy h2 { color:#fff; font-size:clamp(34px,4.4vw,62px); }
        .nh-watch-copy p { color:rgba(255,255,255,.88); font-size:17px; font-weight:500; margin-top:18px; max-width:44ch; }

        /* ---------- SIMPLE GRID (sharp cells, icons) ---------- */
        .nh-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; margin-top:52px; background:rgba(27,67,50,.18); border:1px solid rgba(27,67,50,.18); }
        .nh-cell { background:#FBFAF6; padding:clamp(26px,3vw,40px); }
        .nh-cell svg { width:34px; height:34px; color:var(--green-mid); margin-bottom:16px; }
        .nh-cell h3 { font-size:26px; color:var(--green-deep); }
        .nh-cell p { color:var(--gray-body); font-size:15px; margin-top:8px; }

        /* ---------- SPLIT ---------- */
        .nh-split { display:grid; grid-template-columns:1fr 1fr; gap:clamp(30px,5vw,80px); align-items:center; }
        .nh-split.rev .nh-media, .nh-split.rev .nh-devcol { order:2; }
        .nh-media { aspect-ratio:4/5; filter:var(--fade); }
        .nh-media img { width:100%; height:100%; object-fit:cover; display:block; }
        .nh-split-copy h2 { color:var(--green-deep); font-size:clamp(30px,3.6vw,52px); }
        .nh-sec.dark .nh-split-copy h2 { color:#fff; }
        .nh-split-copy p { color:var(--gray-dark); font-size:17px; font-weight:500; margin-top:20px; max-width:48ch; }
        .nh-list { list-style:none; padding:0; margin:26px 0 0; display:flex; flex-direction:column; gap:14px; }
        .nh-list li { position:relative; padding-left:30px; font-size:16px; color:var(--gray-dark); }
        .nh-list li::before { content:""; position:absolute; left:0; top:6px; width:14px; height:14px; background:var(--lime); }
        .nh-devcol { display:flex; justify-content:center; }
        .nh-devphone { width:clamp(230px,25vw,290px); padding:10px; background:linear-gradient(160deg,#20241f,#0c0f0b); border-radius:38px; filter:drop-shadow(0 30px 56px rgba(0,0,0,.42)); }
        .nh-devphone img { width:100%; height:auto; aspect-ratio:270/540; object-fit:cover; border-radius:28px; display:block; }

        /* ---------- LEADERBOARD (sharp) ---------- */
        .nh-lb { background:var(--green-deep); border:1px solid rgba(255,255,255,.12); }
        .nh-lb-top { display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid rgba(255,255,255,.12); font-size:13px; color:rgba(255,255,255,.7); }
        .nh-live { display:inline-flex; align-items:center; gap:7px; color:var(--lime); font-weight:700; }
        .nh-live i { width:8px; height:8px; border-radius:50%; background:var(--lime); box-shadow:0 0 0 4px rgba(150,196,30,.25); }
        .nh-lb-row { display:flex; justify-content:space-between; align-items:center; padding:15px 20px; border-top:1px solid rgba(255,255,255,.06); color:#fff; }
        .nh-lb-who { display:flex; align-items:center; gap:14px; }
        .nh-lb-rank { font-family:var(--font-display); font-size:22px; color:var(--lime); width:20px; text-align:center; }
        .nh-lb-score { font-family:var(--font-display); font-size:26px; }
        .nh-lb-score.under { color:var(--lime); } .nh-lb-score.over { color:#FF8A8A; }

        /* ---------- FAQ ---------- */
        .nh-faq { max-width:820px; margin-inline:auto; margin-top:44px; }
        .nh-faq-item { padding:24px 0; border-top:1px solid rgba(27,67,50,.16); }
        .nh-faq-item:first-child { border-top:0; padding-top:0; }
        .nh-faq-item h3 { font-family:var(--font-display); text-transform:uppercase; font-size:23px; color:var(--green-deep); letter-spacing:.01em; }
        .nh-faq-item p { color:var(--gray-dark); font-size:16px; margin-top:8px; }
        .nh-faq-links { color:var(--gray-dark); font-size:16px; margin-top:34px; }
        .nh-faq-links + .nh-faq-links { margin-top:14px; }
        .nh-faq-links a { color:var(--green-mid); font-weight:700; }

        /* ---------- TESTIMONIALS ---------- */
        .nh-revs { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:52px; }
        .nh-rev { background:#FBFAF6; padding:26px; display:flex; flex-direction:column; gap:12px; }
        .nh-rev-stars { color:var(--lime); letter-spacing:4px; font-size:15px; line-height:1; }
        .nh-rev-title { font-size:19px; color:var(--green-deep); }
        .nh-rev-body { color:var(--gray-dark); font-size:15px; line-height:1.6; margin:0; font-weight:500; }
        .nh-rev-author { color:var(--gray-body); font-size:12.5px; font-weight:700; margin-top:auto; letter-spacing:.03em; text-transform:uppercase; }
        @media (max-width:900px){ .nh-revs{ grid-template-columns:1fr; max-width:460px; margin-inline:auto; } }

        /* ---------- FINAL ---------- */
        .nh-final { position:relative; text-align:center; color:#fff;
          background:linear-gradient(180deg,rgba(12,28,20,.86),rgba(12,28,20,.92)), url("${PH}/43342.jpg"); background-size:cover; background-position:center 40%; }
        .nh-final h2 { color:#fff; font-size:clamp(38px,5vw,80px); }
        .nh-final p { color:rgba(255,255,255,.85); font-size:18px; max-width:46ch; margin:20px auto 0; font-weight:500; }
        .nh-final .nh-cta { justify-content:center; }
        .nh-note { color:rgba(255,255,255,.6); font-size:14px; margin-top:22px; }
        .nh-note a { color:var(--lime-text); font-weight:700; }

        @media (max-width:900px){
          .nh-hero-inner{ grid-template-columns:1fr; text-align:center; } .nh-hero-p{ margin-inline:auto; } .nh-cta{ justify-content:center; } .nh-eyebrow{ justify-content:center; }
          .nh-stats-grid{ grid-template-columns:repeat(2,1fr); } .nh-stat:nth-child(3){ border-left:0; }
          .nh-grid{ grid-template-columns:1fr; }
          .nh-split{ grid-template-columns:1fr; } .nh-split.rev .nh-media, .nh-split.rev .nh-devcol{ order:0; }
          .nh-media{ aspect-ratio:16/10; max-height:360px; }
        }
        @media (max-width:620px){
          .nh-watch{ background:linear-gradient(180deg, rgba(12,28,20,.55), rgba(12,28,20,.9)), url("/images/watch-course-bg.webp"); background-size:cover; background-position:center; }
          .nh-watch-copy{ margin-inline:auto; text-align:center; }
        }
        @media (max-width:520px){ .nh-steps{ grid-template-columns:1fr; max-width:320px; margin-inline:auto; } .nh-stats-grid{ grid-template-columns:1fr; } .nh-stat{ border-left:0; border-top:1px solid rgba(255,255,255,.08); } }
      `}</style>

      {/* ===== HERO ===== */}
      <header className="nh-hero">
        <div className="nh-wrap nh-hero-inner">
          <div>
            <span className="nh-eyebrow">Free golf scorecard · One tap per shot</span>
            <h1>Golf&apos;s simplest{" "}<br /><span className="li">stroke counter.</span></h1>
            <p className="nh-hero-p">No math. No distraction. Just tap. Free core scoring, works offline, and no account needed to start.</p>
            <div className="nh-cta">
              <TrackedCta event="app_store_click" ctaLocation="home_hero" href={APP_STORE_URL} className="nh-btn" aria-label="Download SimplyStroke on the App Store">Download on the App Store →</TrackedCta>
            </div>
            <div className="nh-badges"><StoreBadges ctaLocation="home_hero_badge" /></div>
            <TrackedCta event="web_app_click" ctaLocation="home_hero" href={APP_URL} className="nh-webcta">or play free in your browser →</TrackedCta>
            {rating ? (
              <div className="nh-rating"><span className="nh-rating-star">★</span> <b>{rating.value.toFixed(1)}</b> · {rating.count} App Store ratings</div>
            ) : null}
          </div>
          <HeroDevices />
        </div>
      </header>

      {/* ===== STAT STRIP ===== */}
      <section className="nh-stats">
        <div className="nh-wrap nh-stats-grid">
          <div className="nh-stat">{I.ball}<div className="n">One tap</div><div className="l">per shot — never do the math</div></div>
          <div className="nh-stat">{I.free}<div className="n">Free</div><div className="l">core scoring, no account to start</div></div>
          <div className="nh-stat">{I.watch}<div className="n">On your wrist</div><div className="l">Apple Watch companion</div></div>
          <div className="nh-stat">{I.group}<div className="n">Play together</div><div className="l">live group scorecards</div></div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="nh-sec">
        <div className="nh-wrap">
          <div className="nh-head center">
            <span className="ey">Track your score in 30 seconds</span>
            <h2>A few taps, start to finish.</h2>
          </div>
          <div className="nh-steps">
            <div className="nh-step"><div className="nh-devframe"><img src={`${SC}/home.png`} alt="SimplyStroke home screen" width={270} height={540} /></div><div className="num">1</div><h3>Start your round</h3><p>Get going in one tap.</p></div>
            <div className="nh-step"><div className="nh-devframe"><img src={`${SC}/course.png`} alt="SimplyStroke course select" width={270} height={540} /></div><div className="num">2</div><h3>Pick a course</h3><p>Or skip it and just count.</p></div>
            <div className="nh-step"><div className="nh-devframe"><img src={`${SC}/round.png`} alt="SimplyStroke active round" width={270} height={540} /></div><div className="num">3</div><h3>Tap the ball</h3><p>One tap per shot. Undo fixes a mis-tap.</p></div>
            <div className="nh-step"><div className="nh-devframe"><img src={`${SC}/scorecard.png`} alt="SimplyStroke scorecard" width={270} height={540} /></div><div className="num">4</div><h3>Get your card</h3><p>Every hole, math already done.</p></div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <section className="nh-divider">
        <div className="nh-wrap q">
          <span className="ey">The whole app</span>
          <div className="disp">Count this stroke. That&apos;s it.</div>
          <p>No GPS overlay, no feed to scroll, no setup wizard. One giant button on screen, and the number lives there instead of in your head — so nothing has to be remembered on the walk to the next tee.</p>
          <div className="nh-nolist">
            <span>No GPS maps</span><span>No social feed</span><span>No setup wizard</span><span>No account to start</span><span>No ads</span>
          </div>
        </div>
      </section>

      {/* ===== SIMPLE ON PURPOSE (textured, icons) ===== */}
      <section className="nh-sec tex">
        <div className="nh-wrap">
          <div className="nh-head"><span className="ey">Simple on purpose</span><h2>Built to stay out of your way.</h2><p>The whole app is a stroke counter and a scorecard. That is the point, not a limitation.</p></div>
          <div className="nh-grid">
            <div className="nh-cell">{I.card}<h3>No math, ever</h3><p>The running number lives on the screen, not in your head.</p></div>
            <div className="nh-cell">{I.ball}<h3>Gloves on, one hand</h3><p>Oversized buttons you can hit without looking.</p></div>
            <div className="nh-cell">{I.course}<h3>Works with no signal</h3><p>Your solo round keeps going in a back-nine dead zone.</p></div>
            <div className="nh-cell">{I.bag}<h3>Never lose a round</h3><p>Every tap is saved the instant you make it.</p></div>
            <div className="nh-cell">{I.undo}<h3>Undo anything</h3><p>Fat-fingered a tap? One undo fixes it.</p></div>
            <div className="nh-cell">{I.tee}<h3>Set up in one tap</h3><p>Near Me finds your course and fills in the pars.</p></div>
          </div>
        </div>
      </section>

      {/* ===== APPLE WATCH (wrist shot) ===== */}
      <section id="watch" className="nh-watch">
        <div className="nh-wrap">
          <div className="nh-watch-copy">
            <span className="ey" style={{ color: "var(--lime-text)" }}>Apple Watch companion</span>
            <h2>Score from your wrist.</h2>
            <p>Tap the watch face to log a shot with a haptic tick, undo a mis-tap, and every stroke syncs to your iPhone scorecard. The Apple Watch companion comes with the app.</p>
            <ul className="nh-list" style={{ color: "rgba(255,255,255,.88)" }}>
              <li style={{ color: "rgba(255,255,255,.88)" }}>Full-face tap target, glove-friendly.</li>
              <li style={{ color: "rgba(255,255,255,.88)" }}>A haptic tick confirms every stroke.</li>
              <li style={{ color: "rgba(255,255,255,.88)" }}>Syncs straight to your iPhone card.</li>
            </ul>
            <div className="nh-cta"><TrackedCta event="app_store_click" ctaLocation="home_watch" href={APP_STORE_URL} className="nh-btn">Download on the App Store →</TrackedCta></div>
          </div>
        </div>
      </section>

      {/* ===== GROUP (real scorecard) ===== */}
      <section id="group" className="nh-sec dark">
        <div className="nh-wrap nh-split">
          <div className="nh-split-copy">
            <span className="ey" style={{ color: "var(--lime-text)" }}>Play with your group</span>
            <h2>Invite your bros. Share a live scorecard.</h2>
            <p>Start a round, share a six-character code, and everyone taps their own strokes on their own phone. One scorecard, updating in real time — the scorekeeper&apos;s job, gone.</p>
            <ul className="nh-list">
              <li>Friends join as guests — no sign-up.</li>
              <li>Every phone shows the same live card.</li>
              <li>Nobody waits until 18 to see how it went.</li>
            </ul>
            <div className="nh-cta"><TrackedCta event="web_app_click" ctaLocation="home_group" href={APP_URL} className="nh-btn">Start a group round →</TrackedCta></div>
          </div>
          <div className="nh-devcol"><div className="nh-devphone"><img src={`${SC}/scorecard.png`} alt="SimplyStroke shared scorecard" width={270} height={540} /></div></div>
        </div>
      </section>

      {/* ===== TOURNAMENT ===== */}
      <section id="tournament" className="nh-sec tex">
        <div className="nh-wrap nh-split">
          <div className="nh-split-copy">
            <span className="ey">Tournament · Coming soon</span>
            <h2 style={{ color: "var(--green-deep)" }}>Run the whole outing on one board.</h2>
            <p>A scramble, a league night, a charity day — Tournament pulls every group onto one live, cross-group leaderboard, and players join by code from their own phones, with no account or setup.</p>
            <ul className="nh-list">
              <li>Every group&apos;s scores roll up to one live board.</li>
              <li>Join by code — no account, no setup.</li>
              <li>Spectators can follow along on the web.</li>
            </ul>
            <Link href="/tournament/" className="nh-webcta" style={{ color: "var(--green-mid)" }}>See how Tournament works →</Link>
          </div>
          <div className="nh-lb" aria-hidden="true">
            <div className="nh-lb-top"><span>Charity Scramble · 6 groups</span><span className="nh-live"><i />Live</span></div>
            <div className="nh-lb-row"><span className="nh-lb-who"><span className="nh-lb-rank">1</span>Team Bogey Boys</span><span className="nh-lb-score under">-4</span></div>
            <div className="nh-lb-row"><span className="nh-lb-who"><span className="nh-lb-rank">2</span>The Sandbaggers</span><span className="nh-lb-score under">-1</span></div>
            <div className="nh-lb-row"><span className="nh-lb-who"><span className="nh-lb-rank">3</span>Fairway to Heaven</span><span className="nh-lb-score over">+2</span></div>
            <div className="nh-lb-row"><span className="nh-lb-who"><span className="nh-lb-rank">4</span>Grip It &amp; Sip It</span><span className="nh-lb-score over">+5</span></div>
          </div>
        </div>
      </section>

      {/* ===== WHY SIMPLE ===== */}
      <section className="nh-sec">
        <div className="nh-wrap nh-split rev">
          <div className="nh-media"><img src={`${PH}/66454.jpg`} alt="A golfer reading a putt at dusk" /></div>
          <div className="nh-split-copy">
            <span className="ey">Why a counter, not a coach</span>
            <h2>Keep your head in the game.</h2>
            <p>The big golf apps bury your score under GPS maps, strokes-gained charts, handicaps and a social feed — and charge $30 to $200 a year for it. If the only thing that keeps going wrong is the count, none of that helps.</p>
            <p>SimplyStroke does one thing and does it in a single tap, so the number is always right when you reach the green.</p>
            <Link href="/compare/" className="nh-webcta" style={{ color: "var(--green-mid)" }}>See how it compares to the big apps →</Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS (5-star App Store reviews) ===== */}
      <section className="nh-sec dark">
        <div className="nh-wrap">
          <div className="nh-head center">
            <span className="ey" style={{ color: "var(--lime-text)" }}>★★★★★ on the App Store</span>
            <h2>Golfers who stopped losing count.</h2>
          </div>
          <div className="nh-revs">
            {reviews.map((r) => (
              <figure className="nh-rev" key={r.author}>
                <div className="nh-rev-stars" role="img" aria-label="Rated 5 out of 5 stars">★★★★★</div>
                <h3 className="nh-rev-title">{r.title}</h3>
                <blockquote className="nh-rev-body">{r.body}</blockquote>
                <figcaption className="nh-rev-author">{r.author} · App Store</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="nh-sec tex">
        <div className="nh-wrap">
          <div className="nh-head center">
            <span className="ey">Fair questions</span>
            <h2>The stuff you&apos;d ask on the first tee.</h2>
          </div>
          <div className="nh-faq">
            {faqs.map(({ q, a }) => (
              <div className="nh-faq-item" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
            <p className="nh-faq-links">
              Learning the ropes? Start with our{" "}
              <Link href="/guides/">golf scoring and rules guides</Link>, see{" "}
              <Link href="/golf-stroke-counter/">what a golf stroke counter is and how to pick one</Link>, or check{" "}
              <Link href="/compare/">how SimplyStroke compares to 18Birdies, Arccos and the rest</Link>.
            </p>
            <p className="nh-faq-links">
              Built for the beautifully distractible?{" "}
              <Link href="/adhd-golf/">See why SimplyStroke is the golf app for ADHD brains →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="nh-sec nh-final">
        <div className="nh-wrap">
          <span className="nh-eyebrow" style={{ color: "var(--lime-text)", justifyContent: "center" }}>Now on the App Store</span>
          <h2>Play your next round with it.</h2>
          <p>Free core scoring for iPhone and Apple Watch. No account needed to start, and no ads today. Android coming soon.</p>
          <div className="nh-cta"><TrackedCta event="app_store_click" ctaLocation="home_final" href={APP_STORE_URL} className="nh-btn" aria-label="Download SimplyStroke on the App Store">Download on the App Store →</TrackedCta></div>
          <div className="nh-note">Prefer the browser? <TrackedCta event="web_app_click" ctaLocation="home_final" href={APP_URL}>Play free in your browser →</TrackedCta></div>
        </div>
      </section>
    </main>
  );
}
