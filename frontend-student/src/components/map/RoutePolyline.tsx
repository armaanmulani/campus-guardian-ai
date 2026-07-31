"use client";

import { Polyline, CircleMarker } from "react-leaflet";
import type { Route } from "@/lib/types";

interface RoutePolylineProps {
  route: Route;
}

export default function RoutePolyline({ route }: RoutePolylineProps) {
  const positions = route.points.map(
    (p) => [p.lat, p.lng] as [number, number]
  );

  const safetyColor =
    route.safetyScore >= 85
      ? "#2563eb"
      : route.safetyScore >= 65
      ? "#f97316"
      : "#ef4444";

  return (
    <>
      {/* Main route line */}
      <Polyline
        positions={positions}
        pathOptions={{
          color: safetyColor,
          weight: 5,
          opacity: 0.85,
          dashArray: route.safetyScore < 85 ? "10, 6" : undefined,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
      {/* Waypoint dots */}
      {positions.map((pos, i) => (
        <CircleMarker
          key={i}
          center={pos}
          radius={i === 0 || i === positions.length - 1 ? 7 : 4}
          pathOptions={{
            color: safetyColor,
            fillColor: "white",
            fillOpacity: 1,
            weight: 2.5,
          }}
        />
      ))}
    </>
  );
}
