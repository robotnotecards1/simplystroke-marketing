"use client";

import { useMemo, useState } from "react";

// "How does your score compare?" percentile tool. Computes the percentile of
// golfers a score beats from the course's own posted-round distribution. Pure
// client math over the distribution passed from the build. Hidden behind an
// empty state until the course has rounds.
type Props = {
  courseName: string;
  par: number;
  distribution: number[] | null; // 8 buckets, percentages summing to ~100
};

// Bucket lower/upper score bounds matching CourseScoreboard's labels.
const LO = [55, 75, 80, 85, 90, 95, 100, 105];
const HI = [74, 79, 84, 89, 94, 99, 104, 140];

function percentileBeaten(score: number, dist: number[]): number {
  let beat = 0;
  for (let i = 0; i < dist.length; i++) {
    if (score < LO[i]) {
      beat += dist[i]; // you beat everyone in this (higher) bucket
    } else if (score >= LO[i] && score <= HI[i]) {
      // partial credit within the bucket: lower score beats more of it
      beat += dist[i] * ((HI[i] - score) / (HI[i] - LO[i] + 1));
    }
  }
  return Math.max(1, Math.min(99, Math.round(beat)));
}

export default function ScoreCompare({ courseName, par, distribution }: Props) {
  const startScore = par + 16;
  const [input, setInput] = useState(String(startScore));
  const [score, setScore] = useState(startScore);

  const pct = useMemo(
    () => (distribution ? percentileBeaten(score, distribution) : 0),
    [score, distribution]
  );

  if (!distribution || distribution.length === 0) {
    return (
      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">Free tool</span>
          <h2 className="h2-display" style={{ marginTop: 8 }}>
            How does your score compare?
          </h2>
          <p className="section-lede">
            Once golfers start posting rounds at {courseName}, this tool tells you exactly where your
            score lands against the field. Post the first round and you set the benchmark.
          </p>
        </div>
      </section>
    );
  }

  const toPar = score - par;
  let sub: string;
  if (pct >= 85) sub = `A ${score} is a genuinely great score here, near the top of the field.`;
  else if (pct >= 60)
    sub = `A ${score} (${toPar >= 0 ? "+" : ""}${toPar}) beats most rounds posted at ${courseName}.`;
  else if (pct >= 35) sub = `A ${score} sits right around the middle of the pack here.`;
  else sub = `A ${score} is a tough day, but this course humbles almost everyone.`;

  const submit = () => {
    const n = parseInt(input, 10);
    if (!Number.isNaN(n)) setScore(Math.max(55, Math.min(160, n)));
  };

  return (
    <section className="section">
      <div className="section-inner">
        <span className="eyebrow">Free tool</span>
        <h2 className="h2-display" style={{ marginTop: 8 }}>
          How does your score compare?
        </h2>
        <p className="section-lede">
          Enter what you shot at {courseName} and see where you land against everyone who has posted
          here.
        </p>
        <div className="tool">
          <div className="tool-grid">
            <div>
              <label htmlFor="scoreIn">Your {18}-hole score</label>
              <div className="inrow">
                <input
                  id="scoreIn"
                  type="number"
                  value={input}
                  min={55}
                  max={160}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                />
                <button type="button" onClick={submit}>
                  Rank me
                </button>
              </div>
              <div className="hint">Enter your gross score for 18 holes.</div>
            </div>
            <div className="result">
              <div className="headline">
                You&rsquo;d beat <span className="pct">{pct}%</span> of golfers here
              </div>
              <div className="sub2">{sub}</div>
              <div className="gauge">
                <div className="you" style={{ left: `${pct}%` }} />
              </div>
              <div className="gauge-x">
                <span>Toughest days</span>
                <span>Better than the field →</span>
              </div>
              <div className="cta-line">
                Beat your number here?{" "}
                <a href="#cta">Post it and claim your spot on the leaderboard →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
