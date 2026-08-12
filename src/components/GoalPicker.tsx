"use client";

import { useState } from "react";
import { CHARITY_CAUSES, DEFAULT_CAUSE_ID } from "@/lib/mock-data";
import { CharityCauseId, formatSAR } from "@/lib/types";
import CauseImpactPanel from "./CauseImpactPanel";

export default function GoalPicker() {
  const [selectedId, setSelectedId] = useState<CharityCauseId>(DEFAULT_CAUSE_ID);
  const selected = CHARITY_CAUSES.find((c) => c.id === selectedId)!;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {CHARITY_CAUSES.map((cause) => {
          const isActive = cause.id === selectedId;
          const hasContributed = cause.yourContribution > 0;
          return (
            <button
              key={cause.id}
              onClick={() => setSelectedId(cause.id)}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all duration-200 active:scale-[0.97] ${
                isActive
                  ? "border-primary bg-primary/5 shadow-soft"
                  : "border-transparent bg-card shadow-card hover:-translate-y-0.5 hover:shadow-soft"
              }`}
            >
              <span className="text-3xl">{cause.icon}</span>
              <span className="text-sm font-bold text-ink">{cause.title}</span>
              <span className="text-xs text-muted">
                {hasContributed ? `${formatSAR(cause.yourContribution, { decimals: 0 })} ر.س` : "لم تبدأ بعد"}
              </span>
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
              <div className="text-xs text-muted">{selected.description}</div>
            </div>
          </div>
          <div className="text-left">
            <div className="text-2xl font-extrabold tracking-tight text-primary">
              {formatSAR(selected.yourContribution, { decimals: 2 })} ر.س
            </div>
            <div className="text-xs text-muted">مساهمتك حتى الآن</div>
          </div>
        </div>

        <div className="mt-5">
          <CauseImpactPanel cause={selected} />
        </div>

        <div className="mt-5 rounded-2xl bg-background p-4 text-sm text-muted">
          يتم تحويل فكة كل عملية شراء تلقائيًا نحو هذه الجهة حتى تحقيق أكبر أثر ممكن.
        </div>
      </div>
    </div>
  );
}
