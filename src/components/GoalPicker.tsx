"use client";

import { useState } from "react";
import { SAVINGS_GOALS } from "@/lib/mock-data";
import { formatSAR } from "@/lib/types";
import AnimatedBar from "./AnimatedBar";

export default function GoalPicker() {
  const [selectedId, setSelectedId] = useState(SAVINGS_GOALS[1].id);
  const selected = SAVINGS_GOALS.find((g) => g.id === selectedId)!;
  const pct = Math.min(100, Math.round((selected.currentAmount / selected.targetAmount) * 100));
  const remaining = Math.max(0, selected.targetAmount - selected.currentAmount);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {SAVINGS_GOALS.map((g) => {
          const isActive = g.id === selectedId;
          const goalPct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
          return (
            <button
              key={g.id}
              onClick={() => setSelectedId(g.id)}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all duration-200 active:scale-[0.97] ${
                isActive
                  ? "border-primary bg-primary/5 shadow-soft"
                  : "border-transparent bg-card shadow-card hover:-translate-y-0.5 hover:shadow-soft"
              }`}
            >
              <span className="text-3xl">{g.icon}</span>
              <span className="text-sm font-bold text-ink">{g.title}</span>
              <span className="text-xs text-muted">{goalPct}٪ مكتمل</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl bg-card p-6 shadow-card md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-2xl">
              {selected.icon}
            </span>
            <div>
              <div className="text-lg font-extrabold text-ink">{selected.title}</div>
              <div className="text-xs text-muted">هدف الادخار النشط</div>
            </div>
          </div>
          <div className="text-left">
            <div className="text-2xl font-extrabold tracking-tight text-primary">{formatSAR(selected.currentAmount, { decimals: 2 })} ر.س</div>
            <div className="text-xs text-muted">من أصل {formatSAR(selected.targetAmount, { decimals: 0 })} ر.س</div>
          </div>
        </div>

        <div className="mt-5">
          <AnimatedBar pct={pct} colorHex={selected.color} heightClass="h-3" />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span>{pct}٪ مكتمل</span>
          <span>متبقي {formatSAR(remaining, { decimals: 2 })} ر.س</span>
        </div>

        <div className="mt-5 rounded-2xl bg-background p-4 text-sm text-muted">
          يتم تحويل فكة كل عملية شراء تلقائيًا نحو هذا الهدف حتى اكتماله.
        </div>
      </div>
    </div>
  );
}
