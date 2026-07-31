"use client";

import { useState } from "react";
import { X, AlertTriangle, Siren } from "lucide-react";
import type { AlertBanner } from "@/lib/types";

interface RouteAlertBannerProps {
  alert: AlertBanner;
  extraCount?: number;
  onDismiss: () => void;
}

const config = {
  critical: {
    bg: "bg-red-600",
    text: "text-white",
    border: "border-red-700",
    icon: <Siren className="w-4 h-4 flex-shrink-0" />,
    badge: "bg-red-800/40 text-red-100",
    label: "CRITICAL",
  },
  high: {
    bg: "bg-orange-500",
    text: "text-white",
    border: "border-orange-600",
    icon: <AlertTriangle className="w-4 h-4 flex-shrink-0" />,
    badge: "bg-orange-700/40 text-orange-100",
    label: "HIGH",
  },
  medium: {
    bg: "bg-yellow-400",
    text: "text-yellow-900",
    border: "border-yellow-500",
    icon: <AlertTriangle className="w-4 h-4 flex-shrink-0" />,
    badge: "bg-yellow-600/20 text-yellow-800",
    label: "MEDIUM",
  },
  low: {
    bg: "bg-blue-100",
    text: "text-blue-900",
    border: "border-blue-200",
    icon: <AlertTriangle className="w-4 h-4 flex-shrink-0" />,
    badge: "bg-blue-200 text-blue-800",
    label: "INFO",
  },
};

export default function RouteAlertBanner({
  alert,
  extraCount = 0,
  onDismiss,
}: RouteAlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const c = config[alert.severity];

  const handleDismiss = () => {
    setDismissed(true);
    setTimeout(onDismiss, 200);
  };

  if (dismissed) return null;

  return (
    <div
      className={`banner-enter flex h-9 w-fit max-w-[560px] items-center gap-2 rounded-md border px-3 shadow-sm ${c.bg} ${c.text} ${c.border}`}
    >
      {c.icon}
      <span
        className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide ${c.badge}`}
      >
        {c.label}
      </span>
      <p className="flex-1 truncate text-xs font-semibold leading-none">{alert.message}</p>
      {extraCount > 0 && (
        <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${c.badge}`}>
          +{extraCount}
        </span>
      )}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss alert"
        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity rounded p-0.5 hover:bg-black/10"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
