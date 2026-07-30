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

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 16);
  }, [center, map]);
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
      L.latLng(23.0750, 76.8400), // SouthWest
      L.latLng(23.0850, 76.8550)  // NorthEast
    ), 
  []);

  return (
    <MapContainer
      center={[CAMPUS_CENTER.lat, CAMPUS_CENTER.lng]}
      zoom={16}
      minZoom={15}
      maxBounds={campusBounds}
      maxBoundsViscosity={1.0}
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

      <MapController center={[CAMPUS_CENTER.lat, CAMPUS_CENTER.lng]} />
    </MapContainer>
  );
}
