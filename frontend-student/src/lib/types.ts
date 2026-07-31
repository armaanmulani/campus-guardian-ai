export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export type IncidentCategory =
  | "theft"
  | "assault"
  | "harassment"
  | "suspicious_activity"
  | "medical"
  | "fire"
  | "infrastructure"
  | "other";

export interface Incident {
  id: string;
  title: string;
  description: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  lat: number;
  lng: number;
  location: string;
  timestamp: Date;
  status: "pending" | "approved" | "rejected";
  reportedBy: string;
}

export interface RoutePoint {
  lat: number;
  lng: number;
  label: string;
}

export interface Route {
  id: string;
  name: string;
  points: RoutePoint[];
  distance: string;
  duration: string;
  safetyScore: number; // 0-100
  alerts: string[];
}

export interface AlertBanner {
  id: string;
  message: string;
  severity: IncidentSeverity;
  incidentId: string;
}

export interface ReportForm {
  category: IncidentCategory;
  title: string;
  description: string;
  location: string;
  photo?: File;
}
