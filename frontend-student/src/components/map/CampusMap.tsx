"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Incident, Route } from "@/lib/types";
import { CAMPUS_CENTER } from "@/lib/mock-data";
import IncidentMarker from "./IncidentMarker";
import RoutePolyline from "./RoutePolyline";

interface CampusMapProps {
  incidents: Incident[];
  activeRoute: Route | null;
  selectedIncident: Incident | null;
  onIncidentClick: (incident: Incident) => void;
}

function MapController({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, {
      padding: [48, 48],
      maxZoom: 15,
    });
  }, [bounds, map]);
  return null;
}

export default function CampusMap({
  incidents,
  activeRoute,
  selectedIncident,
  onIncidentClick,
}: CampusMapProps) {
  const campusBounds = useMemo(() => 
    L.latLngBounds(
      L.latLng(23.0700, 76.8360), // SouthWest
      L.latLng(23.0910, 76.8620)  // NorthEast
    ), 
  []);

  return (
    <MapContainer
      center={[CAMPUS_CENTER.lat, CAMPUS_CENTER.lng]}
      zoom={14}
      minZoom={13}
      maxBounds={campusBounds}
      maxBoundsViscosity={0.35}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
      className="z-0"
    >
      {/* Clean light map tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {/* Incident markers */}
      {incidents
        .filter((inc) => inc.status === "approved" || inc.status === "pending")
        .map((incident) => (
          <IncidentMarker
            key={incident.id}
            incident={incident}
            isSelected={selectedIncident?.id === incident.id}
            onClick={() => onIncidentClick(incident)}
          />
        ))}

      {/* Active route polyline */}
      {activeRoute && <RoutePolyline route={activeRoute} />}

      <MapController bounds={campusBounds} />
    </MapContainer>
  );
}
