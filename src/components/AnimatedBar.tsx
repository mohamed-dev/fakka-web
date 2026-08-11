"use client";

import { useEffect, useState } from "react";

export default function AnimatedBar({
  pct,
  colorClass,
  colorHex,
  trackClass = "bg-background",
  heightClass = "h-3",
}: {
  pct: number;
  colorClass?: string;
  colorHex?: string;
  trackClass?: string;
  heightClass?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`w-full overflow-hidden rounded-full ${trackClass} ${heightClass}`}>
      <div
        className={`h-full rounded-full ${colorClass ?? ""}`}
        style={{
          width: `${mounted ? Math.min(100, Math.max(0, pct)) : 0}%`,
          backgroundColor: colorHex,
          transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}
