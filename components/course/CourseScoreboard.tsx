import type { Course, CourseStats } from "@/lib/courses";

// The dark scoreboard band. Renders real aggregates when the course has posted
// rounds, and a graceful "be the first" empty state when it has none (all 10
// seed courses start at zero real rounds).
const DIST_LABELS = ["<75", "75-79", "80-84", "85-89", "90-94", "95-99", "100-104", "105+"];

export default function CourseScoreboard({
  course,
  stats,
}: {
  course: Course;
  stats: CourseStats | null;
}) {
  if (!stats || !stats.rounds_count) {
    return (
      <section className="board" id="scoreboard">
        <div className="board-inner">
          <span className="eyebrow">What golfers actually shoot here</span>
          <h2>The SimplyStroke Scoreboard</h2>
          <div className="cd-empty">
            <b>No rounds posted here yet.</b> SimplyStroke golfers who play {course.name} can
            post their scorecard from the app, and this scoreboard fills in with the real average
            score, score distribution, and hardest holes. Be the first to put a number on the board.
          </div>
        </div>
      </section>
    );
  }

  const maxDist = Math.max(...stats.distribution, 1);
  const maxOver = Math.max(...stats.hardest_holes.map((h) => h.over_par), 0.01);
  const toParStr = stats.avg_to_par >= 0 ? `+${stats.avg_to_par}` : `${stats.avg_to_par}`;
  const [whole, frac] = toParStr.split(".");

  return (
    <section className="board" id="scoreboard">
      <div className="board-inner">
        <span className="eyebrow">What golfers actually shoot here</span>
        <h2>The SimplyStroke Scoreboard</h2>
        <div className="stat-grid">
          <div className="stat">
            <div className="k">{stats.avg_score}</div>
            <div className="l">Avg score ({course.holes_count})</div>
          </div>
          <div className="stat">
            <div className="k">
              {whole}
              {frac ? <span className="u">.{frac}</span> : null}
            </div>
            <div className="l">Avg to par</div>
          </div>
          <div className="stat">
            <div className="k">{stats.low_round}</div>
            <div className="l">Low round posted</div>
          </div>
          <div className="stat">
            <div className="k">{stats.rounds_count}</div>
            <div className="l">Rounds logged</div>
          </div>
        </div>
        <div className="board-foot">
          <div className="mini">
            <h4>Score distribution · all posted rounds</h4>
            <div className="dist">
              {stats.distribution.map((pct, i) => (
                <div key={i} className="bar" style={{ height: `${Math.round((pct / maxDist) * 100)}%` }}>
                  <span>{pct}%</span>
                </div>
              ))}
            </div>
            <div className="dist-x">
              {DIST_LABELS.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </div>
          <div className="mini">
            <h4>Hardest holes · strokes over par as played</h4>
            <div className="hard">
              {stats.hardest_holes.map((h) => (
                <div key={h.hole} className="hard-row">
                  <span className="hn">
                    {h.hole} · P{h.par}
                  </span>
                  <span className="track">
                    <span className="fill" style={{ width: `${Math.round((h.over_par / maxOver) * 100)}%` }} />
                  </span>
                  <span className="v">+{h.over_par.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
