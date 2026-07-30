/**
 * Illustrative cross-group tournament leaderboard. Pure presentation, no data,
 * so it's aria-hidden and the real message lives in the surrounding copy. It
 * mirrors the group-round board (.ss-lb) but scaled to the whole field: team
 * rows drawn from many groups, plus the shareable web spectator link.
 *
 * Names, scores and the /t/ URL are placeholders in the same spirit as the
 * homepage group board (You/Marcus/Dave/Priya) — swap for a real capture when
 * one exists.
 */
const rows = [
  { rank: 1, initial: "L", color: "#96C41E", team: "Long Drivers", group: "Group 4", score: "−6", tone: "under" },
  { rank: 2, initial: "M", color: "#4A90D9", team: "The Mulligans", group: "Group 1", score: "−4", tone: "under" },
  { rank: 3, initial: "S", color: "#F5C451", team: "Sand Baggers", group: "Group 7", score: "−1", tone: "under" },
  { rank: 4, initial: "F", color: "#FF6B6B", team: "Fore Play", group: "Group 2", score: "+3", tone: "over" },
] as const;

export default function TournamentBoard() {
  return (
    <div className="ss-lb ss-tboard" aria-hidden="true">
      <div className="ss-lb-top">
        <span>Charity Scramble · 12 groups</span>
        <span className="ss-live">
          <i />
          Live
        </span>
      </div>
      {rows.map((r) => (
        <div className="ss-lb-row" key={r.rank}>
          <span className="ss-lb-who">
            <span className="ss-lb-rank">{r.rank}</span>
            <span className="ss-lb-dot" style={{ background: r.color }}>
              {r.initial}
            </span>
            <span className="ss-lb-name">
              {r.team}
              <span className="ss-lb-sub">{r.group}</span>
            </span>
          </span>
          <span className={`ss-lb-score ${r.tone}`}>{r.score}</span>
        </div>
      ))}
      <div className="ss-lb-foot">
        <span className="ss-lb-foot-url">simplystroke.app/t/SCRMBL</span>
        <span className="ss-lb-foot-tag">Spectator view</span>
      </div>
    </div>
  );
}
