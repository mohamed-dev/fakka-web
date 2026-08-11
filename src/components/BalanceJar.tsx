"use client";

import { useEffect, useState } from "react";
import { formatSAR } from "@/lib/types";

const JAR_PATH =
  "M70,34 C55,34 40,50 40,70 L40,196 C40,208 50,216 62,216 L138,216 C150,216 160,208 160,196 L160,70 C160,50 145,34 130,34 Z";

const JAR_TOP = 42;
const JAR_BOTTOM = 214;

export default function BalanceJar({
  balance,
  target,
  label,
  icon,
  note,
  caption,
}: {
  balance: number;
  target: number;
  label: string;
  icon: string;
  note: string;
  caption?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const pct = Math.min(100, Math.round((balance / target) * 100));
  const fillPct = mounted ? pct : 0;
  const liquidY = JAR_BOTTOM - ((JAR_BOTTOM - JAR_TOP) * fillPct) / 100;

  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-3xl bg-card p-8 shadow-soft">
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-2xl"
        aria-hidden
      />

      <div className="relative mb-1 flex items-center gap-1.5 text-sm font-semibold text-muted">
        <span>{icon}</span> {caption ?? `رصيدك في ${label}`}
      </div>

      <div className="relative my-3 h-64 w-56">
        {/* floating coin decorations */}
        <span className="absolute right-2 top-6 animate-float text-xl" style={{ animationDelay: "0.2s" }} aria-hidden>
          🪙
        </span>
        <span className="absolute left-3 top-16 animate-float text-base" style={{ animationDelay: "0.9s" }} aria-hidden>
          🪙
        </span>

        <svg viewBox="0 0 200 240" className="h-full w-full">
          <defs>
            <clipPath id="jarClip">
              <path d={JAR_PATH} />
            </clipPath>
            <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DCB262" />
              <stop offset="100%" stopColor="#C6963C" />
            </linearGradient>
          </defs>

          {/* jar glass base tint */}
          <path d={JAR_PATH} fill="#F7F3EA" />

          {/* liquid fill, clipped to jar silhouette */}
          <g clipPath="url(#jarClip)">
            <rect
              x="0"
              y={liquidY}
              width="200"
              height={Math.max(0, 240 - liquidY)}
              fill="url(#liquidGrad)"
              style={{ transition: "y 1.1s cubic-bezier(0.16,1,0.3,1), height 1.1s cubic-bezier(0.16,1,0.3,1)" }}
            />
            <rect
              x="0"
              y={liquidY}
              width="200"
              height="5"
              fill="#F7EFDD"
              opacity="0.55"
              className="animate-wave"
              style={{ transition: "y 1.1s cubic-bezier(0.16,1,0.3,1)" }}
            />
          </g>

          {/* glass outline */}
          <path d={JAR_PATH} fill="none" stroke="#17201A" strokeOpacity="0.1" strokeWidth="3" />
          {/* glossy highlight streak */}
          <path
            d="M64 66 C 59 118 59 168 64 202"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.55"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* lid */}
          <rect x="70" y="10" width="60" height="17" rx="6" fill="#163527" />
          <rect x="76" y="23" width="48" height="11" rx="3" fill="#25503B" />
          <rect x="82" y="14" width="36" height="4" rx="2" fill="#DCB262" opacity="0.7" />
        </svg>

        <div className="absolute inset-x-0 bottom-5 flex justify-center">
          <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-gold shadow-card">
            {pct}٪
          </div>
        </div>
      </div>

      <div className="relative mt-1 text-center">
        <div className="text-3xl font-extrabold tracking-tight text-primary">{formatSAR(balance, { decimals: 2 })}</div>
        <div className="mt-0.5 text-xs font-medium text-muted">
          ريال سعودي · هدف {formatSAR(target, { decimals: 0 })} ر.س
        </div>
      </div>

      <div className="relative mt-4 text-sm text-muted">{note}</div>
    </div>
  );
}
