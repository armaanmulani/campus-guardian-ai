"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RoutePanel from "@/components/navigation/RoutePanel";
import RouteAlertBanner from "@/components/navigation/RouteAlertBanner";
import ReportDrawer from "@/components/incidents/ReportDrawer";
import { MOCK_INCIDENTS, MOCK_ROUTES } from "@/lib/mock-data";
import type { AlertBanner, Incident } from "@/lib/types";
import { ShieldCheck, Plus, Bell, LogIn, LogOut, X } from "lucide-react";

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
  const router = useRouter();

  const [alerts, setAlerts] = useState<AlertBanner[]>(INITIAL_ALERTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    // localStorage only exists client-side, so this must run in useEffect
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const name = localStorage.getItem("userName") || "";
    setIsLoggedIn(loggedIn);
    setUserName(name);
  }, []);

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserName("");
    setProfileOpen(false);
    router.push("/");
  };

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
            <h1 className="text-3xl font-bold text-slate-900 leading-none tracking-tight">
              Campus Guardian
            </h1>
            <p className="text-[10px] font-mono font-medium text-slate-400 mt-1 uppercase tracking-[0.15em]">
              Student Safety Portal
            </p>
          </div>
        </div>

        <div className="relative flex items-center gap-3">
          {/* Alert badge */}
          <button
            onClick={() => setNotificationsOpen((open) => !open)}
            aria-label="Notifications"
            className="relative flex items-center justify-center w-9 h-9 rounded-md text-slate-500 border border-transparent hover:border-slate-200 hover:bg-slate-50 active:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <Bell className="w-[18px] h-[18px]" />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-28 top-12 w-80 rounded-lg border border-slate-200 bg-white shadow-xl z-[1200] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Notifications</p>
                  <p className="text-xs text-slate-400">{alerts.length} active campus alert{alerts.length === 1 ? "" : "s"}</p>
                </div>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  aria-label="Close notifications"
                  className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto p-2">
                {alerts.length > 0 ? (
                  alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 rounded-md px-3 py-2.5 hover:bg-slate-50">
                      <span className={`mt-1.5 w-2 h-2 rounded-full ${alert.severity === "critical" ? "bg-red-500" : "bg-orange-500"}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800 leading-snug">{alert.message}</p>
                        <p className="mt-1 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          {alert.severity}
                        </p>
                      </div>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        aria-label="Dismiss notification"
                        className="p-1 rounded-md text-slate-300 hover:bg-slate-100 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-8 text-center">
                    <p className="text-sm font-medium text-slate-500">No active alerts</p>
                    <p className="mt-1 text-xs text-slate-400">Campus is quiet right now.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Report incident */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1.5 pl-3.5 pr-4 py-2 bg-red-600 border-black hover:bg-red-700 active:bg-red-800 text-white text-sm font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Report Incident
          </button>

          {/* Login button OR user avatar */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((open) => !open)}
                aria-label="Account menu"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:bg-indigo-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                {initials || "?"}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-11 w-48 rounded-lg border border-slate-200 bg-white shadow-xl z-[1200] overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900 truncate">{userName}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      </header>

      {/* ── Alert Banners ────────────────────────────────── */}
      <div className="z-40 bg-slate-50 px-6 py-2">
        {alerts[0] && (
          <RouteAlertBanner
            key={alerts[0].id}
            alert={alerts[0]}
            extraCount={Math.max(alerts.length - 1, 0)}
            onDismiss={() => dismissAlert(alerts[0].id)}
          />
        )}
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
          <div className="absolute bottom-5 right-5 flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-full shadow-sm px-4 py-2 z-[1000]">
            <span className="text-[11px] font-medium text-slate-400 pr-3 border-r border-slate-200">
              Severity
            </span>
            <div className="flex items-center gap-3">
              {SEVERITY_LEGEND.map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-[11px] font-medium text-slate-600">{label}</span>
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