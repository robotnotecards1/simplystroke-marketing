"use client";

import { useState, type ReactNode } from "react";

// The hero image toggle. Two generated visuals, never stock photos:
//   - Course map: the OSM routing SVG (always available, passed as `routing`).
//   - Satellite: a Mapbox Static image, only when NEXT_PUBLIC_MAPBOX_TOKEN is
//     set at build time (passed as `satelliteUrl`). With no token we show the
//     routing map alone and hide the toggle, so there is never a broken tile.
export default function HeroMedia({
  routing,
  satelliteUrl,
  courseName,
}: {
  routing: ReactNode;
  satelliteUrl: string | null;
  courseName: string;
}) {
  const hasSatellite = Boolean(satelliteUrl);
  const [view, setView] = useState<"map" | "sat">(hasSatellite ? "sat" : "map");

  const showingSat = hasSatellite && view === "sat";

  return (
    <div className="hero-media">
      {showingSat ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={satelliteUrl!}
          alt={`Satellite view of ${courseName}, generated from its coordinates`}
          width={800}
          height={560}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        routing
      )}

      <span className="media-badge">
        {showingSat ? "🛰️ Satellite · from coordinates" : "🗺️ Course map · OpenStreetMap"}
      </span>

      {hasSatellite && (
        <div className="media-toggle" role="group" aria-label="Choose hero image">
          <button
            type="button"
            className={showingSat ? "on" : ""}
            aria-pressed={showingSat}
            onClick={() => setView("sat")}
          >
            Satellite
          </button>
          <button
            type="button"
            className={!showingSat ? "on" : ""}
            aria-pressed={!showingSat}
            onClick={() => setView("map")}
          >
            Course map
          </button>
        </div>
      )}

      <div className="media-cap">
        {showingSat
          ? "Satellite tile generated from the course coordinates. No stock photos."
          : "Hole routing drawn from OpenStreetMap golf data (ODbL), unique to this course. No stock photos."}
      </div>
    </div>
  );
}
