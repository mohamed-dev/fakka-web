"use client";

import { useState } from "react";
import { CHARITY_CAUSES, IMPACT_UNITS } from "@/lib/mock-data";
import { CharityCauseId, formatSAR } from "@/lib/types";
import { CustomGoal, CustomGoalTimeframe, TIMEFRAME_OPTIONS } from "@/lib/customGoals";

const inputClass =
  "rounded-xl border border-black/10 bg-card px-3 py-2.5 text-sm text-ink focus:border-primary focus:outline-none";
const labelClass = "flex flex-col gap-1.5 text-xs font-semibold text-muted";

export default function CustomGoalForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: CustomGoal;
  onSave: (goal: CustomGoal) => void;
  onCancel: () => void;
}) {
  const [causeId, setCauseId] = useState<CharityCauseId>(initial?.causeId ?? CHARITY_CAUSES[0].id);
  const [unitCost, setUnitCost] = useState<number>(initial?.unitCost ?? IMPACT_UNITS[CHARITY_CAUSES[0].id][0].cost);
  const [targetCount, setTargetCount] = useState<string>(initial ? String(initial.targetCount) : "");
  const [timeframe, setTimeframe] = useState<CustomGoalTimeframe>(initial?.timeframe ?? "");

  const units = IMPACT_UNITS[causeId];

  const handleCauseChange = (id: CharityCauseId) => {
    setCauseId(id);
    setUnitCost(IMPACT_UNITS[id][0].cost);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(targetCount, 10);
    if (!count || count <= 0) return;
    const unit = units.find((u) => u.cost === unitCost) ?? units[0];

    onSave({
      id: initial?.id ?? `cg_${Date.now()}`,
      causeId,
      unitCost: unit.cost,
      unitLabel: unit.unit,
      unitEmoji: unit.emoji,
      targetCount: count,
      timeframe,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex animate-pop-in flex-col gap-4 rounded-2xl border-2 border-primary/20 bg-primary/5 p-4"
    >
      <div className="text-sm font-bold text-ink">{initial ? "تعديل الهدف" : "هدف جديد"}</div>

      <label className={labelClass}>
        الجهة
        <select
          value={causeId}
          onChange={(e) => handleCauseChange(e.target.value as CharityCauseId)}
          className={inputClass}
        >
          {CHARITY_CAUSES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon} {c.title}
            </option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        نوع الوحدة
        <select
          value={unitCost}
          onChange={(e) => setUnitCost(Number(e.target.value))}
          className={inputClass}
        >
          {units.map((u) => (
            <option key={u.cost} value={u.cost}>
              {u.emoji} {u.unit} ({formatSAR(u.cost, { decimals: 2 })} ر.س)
            </option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        العدد المستهدف
        <input
          type="number"
          inputMode="numeric"
          min={1}
          value={targetCount}
          onChange={(e) => setTargetCount(e.target.value)}
          placeholder="مثال: ١٠٠"
          className={inputClass}
          required
        />
      </label>

      <label className={labelClass}>
        المدة (اختياري)
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as CustomGoalTimeframe)}
          className={inputClass}
        >
          {TIMEFRAME_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-soft transition-all duration-200 hover:shadow-glow hover:brightness-110 active:scale-[0.98]"
        >
          حفظ الهدف
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold text-ink transition-transform active:scale-95"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
