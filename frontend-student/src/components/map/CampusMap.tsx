"use client";

import { useState } from "react";

interface CampusMapProps {
  /**
   * Path (relative to the Next.js `public` folder) to the folium-generated
   * HTML map file. Defaults to "/campusMap.html".
   */
  src?: string;
  /** Height of the map container. Defaults to "100vh". */
  height?: string | number;
  /** Optional extra className for the wrapper div. */
  className?: string;
}

export default function CampusMap({
  src = "/campusMap.html",
  height = "100vh",
  className = "",
}: CampusMapProps) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ height }}
    >
      {loading && !failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
          <span className="text-sm text-gray-500">Loading campus map…</span>
        </div>
      )}

      {failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
          <span className="text-sm text-red-500">
            Could not load the campus map. Make sure{" "}
            <code>{src}</code> exists in your <code>public</code> folder.
          </span>
        </div>
      )}

      <iframe
        title="Campus Map"
        src={src}
        className="w-full h-full border-0"
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setFailed(true);
        }}
      />
    </div>
  );
}