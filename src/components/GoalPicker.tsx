"use client";

import { useState } from "react";
import { SAVINGS_GOALS } from "@/lib/mock-data";
import { formatSAR } from "@/lib/types";

export default function GoalPicker() {
  const [selectedId, setSelectedId] = useState(SAVINGS_GOALS[1].id);
  const selected = SAVINGS_GOALS.find((g) => g.id === selectedId)!;
  const pct = Math.min(100, Math.round((selected.currentAmount / selected.targetAmount) * 100));
  const remaining = Math.max(0, selected.targetAmount - selected.currentAmount);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SAVINGS_GOALS.map((g) => {
          const isActive = g.id === selectedId;
          const goalPct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
          return (
            <button
              key={g.id}
              onClick={() => setSelectedId(g.id)}
              className={`flex flex-col items-center gap-2 rounded-xl2 border-2 p-4 text-center transition-colors ${
                isActive ? "border-primary bg-primary/5" : "border-transparent bg-card shadow-card hover:border-black/5"
              }`}
            >
              <span className="text-3xl">{g.icon}</span>
              <span className="text-sm font-bold text-ink">{g.title}</span>
              <span className="text-xs text-muted">{goalPct}٪ مكتمل</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl2 bg-card p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl2 bg-background text-2xl">
              {selected.icon}
            </span>
            <div>
              <div className="text-lg font-extrabold text-ink">{selected.title}</div>
              <div className="text-xs text-muted">هدف الادخار النشط</div>
            </div>
          </div>
          <div className="text-left">
            <div className="text-2xl font-extrabold text-primary">{formatSAR(selected.currentAmount, { decimals: 2 })} ر.س</div>
            <div className="text-xs text-muted">من أصل {formatSAR(selected.targetAmount, { decimals: 0 })} ر.س</div>
          </div>
        </div>

        <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, backgroundColor: selected.color }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span>{pct}٪ مكتمل</span>
          <span>متبقي {formatSAR(remaining, { decimals: 2 })} ر.س</span>
        </div>

        <div className="mt-5 rounded-xl bg-background p-4 text-sm text-muted">
          يتم تحويل فكة كل عملية شراء تلقائيًا نحو هذا الهدف حتى اكتماله.
        </div>
      </div>
    </div>
  );
}
