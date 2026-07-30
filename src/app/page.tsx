"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import RoutePanel from "@/components/navigation/RoutePanel";
import RouteAlertBanner from "@/components/navigation/RouteAlertBanner";
import ReportDrawer from "@/components/incidents/ReportDrawer";
import { MOCK_INCIDENTS, MOCK_ROUTES } from "@/lib/mock-data";
import type { AlertBanner, Incident } from "@/lib/types";
import { ShieldCheck, Plus, Bell } from "lucide-react";

// Dynamically import the map to prevent SSR issues with Leaflet
const CampusMap = dynamic(() => import("@/components/map/CampusMap"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-slate-400">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
        <span className="text-xs font-mono uppercase tracking-widest">Loading map…</span>
      </div>
    </div>
  ),
});

const INITIAL_ALERTS: AlertBanner[] = [
  {
    id: "alert-001",
    message: "Incident reported near Campus Gym — Medical emergency in progress.",
    severity: "critical",
    incidentId: "inc-005",
  },
  {
    id: "alert-002",
    message: "High severity: Verbal harassment reported near Campus Cafe.",
    severity: "high",
    incidentId: "inc-004",
  },
];

const SEVERITY_LEGEND = [
  { color: "bg-red-500", label: "Critical" },
  { color: "bg-orange-500", label: "High" },
  { color: "bg-amber-400", label: "Medium" },
  { color: "bg-sky-400", label: "Low" },
];

export default function HomePage() {
  const [alerts, setAlerts] = useState<AlertBanner[]>(INITIAL_ALERTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);

  const dismissAlert = (id: string) =>
    setAlerts((prev) => prev.filter((a) => a.id !== id));

  const activeRoute = MOCK_ROUTES.find((r) => r.id === activeRouteId) ?? null;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      {/* ── Top Nav Bar ─────────────────────────────────── */}
      <header className="relative flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 z-50">
        {/* signature accent rule */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-indigo-600" />

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-indigo-600 flex items-center justify-center">
            <ShieldCheck className="w-[18px] h-[18px] text-white" strokeWidth={2.25} />
          </div>
          <div>
            <h1 className="text-[1.3rem] font-bold text-slate-900 leading-none tracking-tight">
              Campus Guardian 
            </h1>
            <p className="text-[10px] font-mono font-medium text-slate-400 mt-1 uppercase tracking-[0.15em]">
              Student Safety Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* live status */}
          

          {/* Alert badge */}
          <button
            aria-label="Notifications"
            className="relative flex items-center justify-center w-9 h-9 rounded-md text-slate-500 border border-transparent hover:border-slate-200 hover:bg-slate-50 active:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <Bell className="w-[18px] h-[18px]" />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Report incident */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1.5 pl-3.5 pr-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Report Incident
          </button>
        </div>
      </header>

      {/* ── Alert Banners ────────────────────────────────── */}
      <div className="flex flex-col z-40">
        {alerts.map((alert) => (
          <RouteAlertBanner
            key={alert.id}
            alert={alert}
            onDismiss={() => dismissAlert(alert.id)}
          />
        ))}
      </div>

      {/* ── Main Content ─────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Route Navigation Panel */}
        <RoutePanel
          routes={MOCK_ROUTES}
          incidents={MOCK_INCIDENTS}
          activeRouteId={activeRouteId}
          onRouteSelect={setActiveRouteId}
        />

        {/* Map */}
        <div className="flex-1 relative">
          <CampusMap
            incidents={MOCK_INCIDENTS}
            activeRoute={activeRoute}
            selectedIncident={selectedIncident}
            onIncidentClick={setSelectedIncident}
          />

          {/* Floating map legend */}
          <div className="absolute bottom-5 right-5 bg-white border border-slate-200 rounded-md shadow-md z-[1000] overflow-hidden">
            <p className="text-[10px] font-mono font-semibold text-slate-500 px-3.5 pt-3 pb-2 uppercase tracking-[0.15em] border-b border-slate-100">
              Severity
            </p>
            <div className="flex flex-col px-3.5 py-2.5 gap-2">
              {SEVERITY_LEGEND.map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-xs font-medium text-slate-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Report Drawer ────────────────────────────────── */}
      <ReportDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}