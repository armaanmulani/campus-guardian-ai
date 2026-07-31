"use client";

import { useState } from "react";
import type { Route, Incident } from "@/lib/types";
import {
  MapPin,
  Navigation,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Loader2,
} from "lucide-react";

interface RoutePanelProps {
  routes: Route[]; // We keep this as default fallback or initial state
  incidents: Incident[];
  activeRouteId: string | null;
  onRouteSelect: (id: string | null) => void;
}

function SafetyBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? "text-green-600  border-green-200" :
    score >= 65 ? "text-orange-600  border-orange-200" :
                  "text-red-600  border-red-200";

  return (
    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${color}`}>
      {score}%
    </span>
  );
}

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

const severityDot: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-blue-400",
};

export default function RoutePanel({
  routes: initialRoutes,
  incidents,
  activeRouteId,
  onRouteSelect,
}: RoutePanelProps) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [tab, setTab] = useState<"routes" | "incidents">("routes");
  
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [isRouting, setIsRouting] = useState(false);

  const nearbyIncidents = incidents
    .filter((i) => i.status === "approved")
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 6);

  const handleFindRoutes = async () => {
    if (!origin || !destination) return;
    setIsRouting(true);
    setTab("routes");
    
    try {
      const response = await fetch("/api/routes/safe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination }),
      });
      
      if (response.ok) {
        const fetchedRoutes = await response.json();
        setRoutes(fetchedRoutes);
        if (fetchedRoutes.length > 0) {
          onRouteSelect(fetchedRoutes[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch routes", error);
    } finally {
      setIsRouting(false);
    }
  };

  return (
    <aside className="w-80 flex flex-col bg-white border-r border-gray-400 z-10 shadow-sm overflow-hidden">
      {/* Panel header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Navigation className="w-4 h-4 text-blue-600" />
          <h2 className="text-3xl font-semibold text-gray-900">Safe Navigation</h2>
        </div>

        {/* Origin input */}
        <div className="relative mb-2">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-blue-100" />
          <input
            type="text"
            placeholder="Your location…"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full pl-8 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-gray-400 transition-colors"
          />
        </div>

        {/* Destination input */}
        <div className="relative mb-3">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Destination…"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full pl-8 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-gray-400 transition-colors"
          />
        </div>

        <button 
          onClick={handleFindRoutes}
          disabled={!origin || !destination || isRouting}
          className={`w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            !origin || !destination 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-gray-800 hover:bg-gray-700 text-white cursor-pointer"
          }`}
        >
          {isRouting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Search className="w-3.5 h-3.5" />
          )}
          {isRouting ? "Calculating routes..." : "Find Safe Routes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {(["routes", "incidents"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-xs font-semibold capitalize transition-colors ${
              tab === t
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {t}
            {t === "incidents" && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-2xl text-[10px] bg-red-100 text-red-600 font-bold">
                {nearbyIncidents.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {tab === "routes" ? (
          <div className="p-3 space-y-2">
            {routes.map((route) => {
              const isActive = route.id === activeRouteId;
              return (
                <button
                  key={route.id}
                  onClick={() => onRouteSelect(isActive ? null : route.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isActive
                      ? "border-gray-300 bg-gray-50 shadow-sm"
                      : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {route.name}
                      </p>
                    </div>
                    
                  </div>

                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" /> {route.distance}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" /> {route.duration}
                    </span>
                  </div>

                  {/* Waypoints */}
                  <div className="flex items-center gap-1 overflow-hidden">
                    {route.points.map((p, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <span className="text-xs text-gray-800 truncate max-w-14">{p.label}</span>
                        {i < route.points.length - 1 && (
                          <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
                        )}
                      </span>
                    ))}
                  </div>

                  {route.alerts.length > 0 && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-orange-600">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      {route.alerts.length} alert{route.alerts.length > 1 ? "s" : ""} on this route
                    </div>
                  )}

                  {isActive && (
                    <div className="mt-2.5 pt-2.5 border-t border-blue-200">
                      <p className="text-xs font-medium text-blue-600 flex items-center gap-1">
                        <Navigation className="w-3 h-3" /> Route active — shown on map
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {nearbyIncidents.map((incident) => (
              <div
                key={incident.id}
                className="p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex-shrink-0">
                    <div className={`w-2.5 h-2.5 rounded-full ${severityDot[incident.severity]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 leading-snug truncate">
                      {incident.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{incident.location}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {timeAgo(incident.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-gray-500">
            Live data · Updated just now
          </span>
        </div>
      </div>
    </aside>
  );
}
