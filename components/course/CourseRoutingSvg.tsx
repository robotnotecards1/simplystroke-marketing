import type { CourseMap } from "@/lib/courses";

// Pure, static SVG of the course routing, drawn from OpenStreetMap golf
// geometry (data/maps/<slug>.json, built by scripts/build-course-maps.mjs).
// No client JS: it renders at build time into the HTML. ODbL requires OSM
// attribution wherever this shows (handled by the hero caption + footer).
function poly(points: number[][]): string {
  if (!points.length) return "";
  return (
    "M" + points.map(([x, y], i) => `${i ? "L" : ""}${x} ${y}`).join(" ") + "Z"
  );
}
function line(points: number[][]): string {
  if (!points.length) return "";
  return "M" + points.map(([x, y], i) => `${i ? "L" : ""}${x} ${y}`).join(" ");
}

export default function CourseRoutingSvg({
  map,
  courseName,
}: {
  map: CourseMap;
  courseName: string;
}) {
  const [w, h] = map.view;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Course routing map of ${courseName}, generated from OpenStreetMap data`}
    >
      <rect width={w} height={h} fill="#eef1e6" />
      {map.water.map((p, i) => (
        <path key={`w${i}`} d={poly(p)} fill="#cfe4ec" />
      ))}
      {map.fairways.map((p, i) => (
        <path key={`f${i}`} d={poly(p)} fill="#b9cfa0" opacity={0.85} />
      ))}
      {map.bunkers.map((p, i) => (
        <path key={`b${i}`} d={poly(p)} fill="#e4d3a4" />
      ))}
      {map.greens.map((p, i) => (
        <path key={`g${i}`} d={poly(p)} fill="#7fb069" />
      ))}
      {/* hole routing lines */}
      <g fill="none" stroke="#1b4332" strokeWidth={2.2} strokeDasharray="7 5" opacity={0.75}>
        {map.holes.map((hole, i) => (
          <path key={`h${i}`} d={line(hole.line)} />
        ))}
      </g>
      {/* numbered hole markers at the green end */}
      <g fontFamily="var(--font-display), 'Bebas Neue', sans-serif" fontSize={16} fill="#1b4332">
        {map.holes.map((hole, i) => {
          const [x, y] = hole.label;
          return (
            <g key={`n${i}`}>
              <circle cx={x} cy={y} r={12} fill="#fff" stroke="#1b4332" strokeWidth={2} />
              <text x={x} y={y + 5} textAnchor="middle">
                {hole.ref}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
