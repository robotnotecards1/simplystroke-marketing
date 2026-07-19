"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { LeaderRow } from "@/lib/courses";

// Course leaderboard. The `initial` rows are baked into the HTML at build time
// (that is the SEO asset Google indexes). On mount we refresh from the
// public_rounds view with the anon key so a human always sees the current
// board between rebuilds. public_rounds only ever exposes opted-in rounds with
// a coarse display name, never a raw round, user id, or email.
export default function CourseLeaderboard({
  courseId,
  courseName,
  initial,
}: {
  courseId: string;
  courseName: string;
  initial: LeaderRow[];
}) {
  const [rows, setRows] = useState<LeaderRow[]>(initial);

  useEffect(() => {
    const sb = supabase();
    if (!sb) return;
    let cancelled = false;
    sb.from("public_rounds")
      .select("display_name, gross_score, score_to_par")
      .eq("course_id", courseId)
      .order("gross_score", { ascending: true })
      .limit(8)
      .then(({ data, error }) => {
        // Only replace the baked rows if the live query actually returns some;
        // a transient error or empty result must not blank a populated board.
        if (!cancelled && !error && data && data.length > 0) {
          setRows(data as LeaderRow[]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [courseId]);

  if (rows.length === 0) {
    return (
      <section className="section alt-section">
        <div className="section-inner">
          <span className="eyebrow">Course leaderboard</span>
          <h2 className="h2-display" style={{ marginTop: 8 }}>
            Best rounds at {courseName}
          </h2>
          <div className="cd-empty light">
            <b>The board is open.</b> No rounds have been posted at {courseName} yet. Post the first
            one from the SimplyStroke app and your name sits at the top of this page for every golfer
            who searches this course.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section alt-section">
      <div className="section-inner">
        <span className="eyebrow">Course leaderboard</span>
        <h2 className="h2-display" style={{ marginTop: 8 }}>
          Best rounds at {courseName}
        </h2>
        <p className="section-lede">
          Baked into the page for search engines, refreshed live in your browser so you always see
          the current board.
        </p>
        <div className="tbl-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>#</th>
                <th>Golfer</th>
                <th>Tees</th>
                <th style={{ textAlign: "right" }}>Score</th>
                <th style={{ textAlign: "right" }}>To par</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.display_name}-${i}`}>
                  <td className={`rank${i === 0 ? " first" : ""}`}>{i + 1}</td>
                  <td className="who">
                    {r.display_name}
                    {r.verified ? <span className="verified">Verified</span> : null}
                    {r.home_city ? <small>{r.home_city}</small> : null}
                  </td>
                  <td>{r.tees ?? ""}</td>
                  <td className="score">{r.gross_score}</td>
                  <td className={`topar${r.score_to_par < 0 ? " under" : ""}`}>
                    {r.score_to_par >= 0 ? `+${r.score_to_par}` : r.score_to_par}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
