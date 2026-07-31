"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Incident, IncidentSeverity } from "@/lib/types";

const severityColors: Record<IncidentSeverity, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
  low: "#60a5fa",
};

const categoryLabels: Record<string, string> = {
  theft: "Theft",
  assault: "Assault",
  harassment: "Harassment",
  suspicious_activity: "Watch",
  medical: "Medical",
  fire: "Fire",
  infrastructure: "Maintenance",
  other: "Report",
};

function createIncidentIcon(severity: IncidentSeverity, isSelected: boolean) {
  const color = severityColors[severity];
  const size = isSelected ? 36 : 28;
  const ringOpacity = severity === "critical" ? "0.3" : "0.15";

  const svg = `
    <svg width="${size + 12}" height="${size + 12}" viewBox="0 0 ${size + 12} ${size + 12}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${(size + 12) / 2}" cy="${(size + 12) / 2}" r="${(size + 12) / 2 - 2}" fill="${color}" fill-opacity="${ringOpacity}"/>
      <circle cx="${(size + 12) / 2}" cy="${(size + 12) / 2}" r="${size / 2}" fill="${color}" stroke="white" stroke-width="2.5"/>
      <circle cx="${(size + 12) / 2}" cy="${(size + 12) / 2}" r="${size / 4}" fill="white" fill-opacity="0.5"/>
    </svg>
  `;

  const iconSize = size + 12;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize / 2],
    popupAnchor: [0, -(iconSize / 2) - 4],
  });
}

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const severityLabels: Record<IncidentSeverity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const severityStyles: Record<IncidentSeverity, { background: string; color: string }> = {
  critical: { background: "#fef2f2", color: "#dc2626" },
  high: { background: "#fff7ed", color: "#ea580c" },
  medium: { background: "#fefce8", color: "#ca8a04" },
  low: { background: "#eff6ff", color: "#2563eb" },
};

interface IncidentMarkerProps {
  incident: Incident;
  isSelected: boolean;
  onClick: () => void;
}

export default function IncidentMarker({
  incident,
  isSelected,
  onClick,
}: IncidentMarkerProps) {
  const icon = createIncidentIcon(incident.severity, isSelected);

  return (
    <Marker
      position={[incident.lat, incident.lng]}
      icon={icon}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <div style={{ minWidth: "220px", fontFamily: "var(--font-geist, sans-serif)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span
              style={{
                borderRadius: "6px",
                background: "#eff6ff",
                color: "#1d4ed8",
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 6px",
              }}
            >
              {categoryLabels[incident.category]}
            </span>
          </div>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 3px" }}>
            {incident.title}
          </p>
          <p style={{ fontSize: "11px", color: "#64748b", margin: "0 0 9px" }}>
            {incident.location}
          </p>
          <span
            style={{
              display: "inline-block",
              padding: "2px 8px",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: 700,
              marginBottom: "8px",
              ...severityStyles[incident.severity],
            }}
          >
            {severityLabels[incident.severity]}
          </span>
          <p style={{ fontSize: "12px", color: "#334155", lineHeight: "1.5", margin: "0 0 8px" }}>
            {incident.description}
          </p>
          <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>
            Reported {timeAgo(incident.timestamp)}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}
