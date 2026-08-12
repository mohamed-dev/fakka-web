"use client";

import { useEffect, useState } from "react";
import { CHARITY_CAUSES, DEFAULT_CAUSE_ID, IMPACT_UNITS } from "@/lib/mock-data";
import { CharityCauseId, formatSAR } from "@/lib/types";
import { CustomGoal, loadCustomGoals, saveCustomGoals } from "@/lib/customGoals";
import AnimatedBar from "./AnimatedBar";
import CauseImpactPanel from "./CauseImpactPanel";
import CustomGoalForm from "./CustomGoalForm";
import CustomGoalCard from "./CustomGoalCard";
import { PlusIcon } from "./icons";

export default function GoalPicker() {
  const [selectedId, setSelectedId] = useState<CharityCauseId>(DEFAULT_CAUSE_ID);
  const selected = CHARITY_CAUSES.find((c) => c.id === selectedId)!;

  const [customGoals, setCustomGoals] = useState<CustomGoal[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<CustomGoal | null>(null);

  useEffect(() => {
    setCustomGoals(loadCustomGoals());
  }, []);

  const openAddForm = () => {
    setEditingGoal(null);
    setFormOpen(true);
  };

  const openEditForm = (goal: CustomGoal) => {
    setEditingGoal(goal);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingGoal(null);
  };

  const handleSaveGoal = (goal: CustomGoal) => {
    setCustomGoals((prev) => {
      const exists = prev.some((g) => g.id === goal.id);
      const next = exists ? prev.map((g) => (g.id === goal.id ? goal : g)) : [...prev, goal];
      saveCustomGoals(next);
      return next;
    });
    closeForm();
  };

  const handleDeleteGoal = (id: string) => {
    setCustomGoals((prev) => {
      const next = prev.filter((g) => g.id !== id);
      saveCustomGoals(next);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {formOpen ? (
        <CustomGoalForm initial={editingGoal ?? undefined} onSave={handleSaveGoal} onCancel={closeForm} />
      ) : (
        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-1.5 rounded-2xl bg-primary px-4 py-3.5 text-sm font-bold text-white shadow-soft transition-all duration-200 hover:shadow-glow hover:brightness-110 active:scale-[0.98]"
        >
          <PlusIcon />
          إضافة هدف
        </button>
      )}

      <div className="grid grid-cols-2 gap-3.5">
        {CHARITY_CAUSES.map((cause) => {
          const isActive = cause.id === selectedId;
          const tiers = IMPACT_UNITS[cause.id];
          const topTierCost = tiers[tiers.length - 1].cost;
          const pct = Math.min(100, Math.round((cause.yourContribution / topTierCost) * 100));
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
              <span className="text-sm font-bold leading-snug text-ink">{cause.title}</span>
              <div className="w-full">
                <AnimatedBar pct={pct} colorClass="bg-gold" heightClass="h-1.5" />
                <span className="mt-1.5 block text-xs text-muted">{pct}٪ مكتمل</span>
              </div>
            </button>
          );
        })}

        {customGoals.map((goal) => (
          <CustomGoalCard
            key={goal.id}
            goal={goal}
            onEdit={() => openEditForm(goal)}
            onDelete={() => handleDeleteGoal(goal.id)}
          />
        ))}
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
