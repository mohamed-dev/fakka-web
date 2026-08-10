"use client";

import { useState } from "react";
import { CHARITY_CAUSES, IMPACT_UNITS, DESTINATION_BALANCES } from "@/lib/mock-data";
import { CharityCauseId, formatSAR } from "@/lib/types";

export default function CharityImpact() {
  const [selectedId, setSelectedId] = useState<CharityCauseId>("orphans");
  const selected = CHARITY_CAUSES.find((c) => c.id === selectedId)!;
  const units = IMPACT_UNITS[selectedId];
  const balance = DESTINATION_BALANCES.charity.balance;

  const headlineUnit = units[0];
  const headlineCount = Math.floor(balance / headlineUnit.cost);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl2 bg-primary p-5 text-white shadow-soft">
        <div className="text-sm text-white/70">أثر فكتك المتوقع</div>
        <div className="mt-1 text-lg font-extrabold text-gold-light">
          يمكن أن تساهم فكتك تقريبًا في {headlineCount} {headlineUnit.unit} {headlineUnit.emoji}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-bold text-ink">اختر جهة التبرع</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CHARITY_CAUSES.map((cause) => {
            const isActive = cause.id === selectedId;
            return (
              <button
                key={cause.id}
                onClick={() => setSelectedId(cause.id)}
                className={`flex items-start gap-3 rounded-xl2 border-2 p-4 text-right transition-colors ${
                  isActive ? "border-primary bg-primary/5" : "border-transparent bg-card shadow-card hover:border-black/5"
                }`}
              >
                <span className="text-2xl">{cause.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-ink">{cause.title}</div>
                  <div className="mt-0.5 text-xs text-muted">{cause.description}</div>
                </div>
                {isActive && <span className="text-primary">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl2 bg-card p-6 shadow-card">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl2 bg-background text-2xl">
            {selected.icon}
          </span>
          <div>
            <div className="text-lg font-extrabold text-ink">{selected.title}</div>
            <div className="text-xs text-muted">رصيدك الحالي: {formatSAR(balance, { decimals: 2 })} ر.س</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {units.map((unit) => {
            const count = Math.floor(balance / unit.cost);
            const achieved = count >= 1;
            return (
              <div
                key={unit.unit}
                className={`flex flex-col items-center gap-1.5 rounded-xl p-4 text-center ${
                  achieved ? "bg-gold/10" : "bg-background opacity-60"
                }`}
              >
                <span className="text-2xl">{unit.emoji}</span>
                {achieved ? (
                  <>
                    <span className="text-lg font-extrabold text-gold">{count}</span>
                    <span className="text-xs font-medium text-ink">{unit.unit}</span>
                  </>
                ) : (
                  <>
                    <span className="text-xs font-medium text-muted">{unit.unit}</span>
                    <span className="text-xs font-semibold text-muted">
                      يحتاج {formatSAR(unit.cost - balance, { decimals: 2 })} ر.س
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-xl bg-background p-4 text-sm text-muted">
          يتم توجيه فكة كل عملية شراء تلقائيًا نحو {selected.title} حتى تحقيق أكبر أثر ممكن.
        </div>
      </div>
    </div>
  );
}
