import type { Course } from "@/lib/courses";

// Full hole-by-hole scorecard: par row, one row per tee set with per-hole
// yardages, and the handicap-index row. Out/In/Total columns computed from the
// data. Tees without per-hole yardages (some championship tees are rated but
// not printed hole-by-hole) are shown as a totals-only row.
function sum(nums: number[], from: number, to: number): number {
  let s = 0;
  for (let i = from; i < to; i++) s += nums[i] ?? 0;
  return s;
}

export default function Scorecard({ course }: { course: Course }) {
  const holes = course.holes_count;
  const half = Math.floor(holes / 2);
  const par = course.par_per_hole;
  const hcp = course.handicap_per_hole;

  const headNums = Array.from({ length: holes }, (_, i) => i + 1);

  return (
    <div className="tbl-wrap">
      <table className="card">
        <thead>
          <tr>
            <th>Hole</th>
            {headNums.slice(0, half).map((n) => (
              <th key={n}>{n}</th>
            ))}
            <th className="tot">Out</th>
            {headNums.slice(half).map((n) => (
              <th key={n}>{n}</th>
            ))}
            <th className="tot">In</th>
            <th className="tot">Tot</th>
          </tr>
        </thead>
        <tbody>
          <tr className="par-row">
            <td>Par</td>
            {par.slice(0, half).map((p, i) => (
              <td key={i}>{p}</td>
            ))}
            <td className="tot">{sum(par, 0, half)}</td>
            {par.slice(half).map((p, i) => (
              <td key={i}>{p}</td>
            ))}
            <td className="tot">{sum(par, half, holes)}</td>
            <td className="tot">{course.par_total}</td>
          </tr>

          {course.tees
            .filter((t) => Array.isArray(t.holes) && t.holes.length === holes)
            .map((tee) => {
              const y = tee.holes as number[];
              return (
                <tr key={tee.name}>
                  <td>
                    <span className="tee-dot" style={{ background: tee.color, border: "1px solid rgba(0,0,0,0.15)" }} />
                    {tee.name}
                  </td>
                  {y.slice(0, half).map((yd, i) => (
                    <td key={i}>{yd}</td>
                  ))}
                  <td className="tot">{sum(y, 0, half)}</td>
                  {y.slice(half).map((yd, i) => (
                    <td key={i}>{yd}</td>
                  ))}
                  <td className="tot">{sum(y, half, holes)}</td>
                  <td className="tot">{tee.yardage}</td>
                </tr>
              );
            })}

          {hcp && hcp.length === holes ? (
            <tr className="idx">
              <td>Handicap</td>
              {hcp.slice(0, half).map((h, i) => (
                <td key={i}>{h}</td>
              ))}
              <td className="tot" />
              {hcp.slice(half).map((h, i) => (
                <td key={i}>{h}</td>
              ))}
              <td className="tot" />
              <td className="tot" />
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
