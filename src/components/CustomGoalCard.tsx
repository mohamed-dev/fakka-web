import { CHARITY_CAUSES } from "@/lib/mock-data";
import { CustomGoal, customGoalTitle } from "@/lib/customGoals";
import AnimatedBar from "./AnimatedBar";
import { EditIcon, TrashIcon } from "./icons";

export default function CustomGoalCard({
  goal,
  onEdit,
  onDelete,
}: {
  goal: CustomGoal;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const cause = CHARITY_CAUSES.find((c) => c.id === goal.causeId)!;
  const targetAmount = goal.targetCount * goal.unitCost;
  const pct = Math.min(100, Math.round((cause.yourContribution / targetAmount) * 100));

  return (
    <div className="relative flex flex-col items-center gap-2 rounded-2xl border-2 border-transparent bg-card p-4 text-center shadow-card">
      <div className="absolute left-2 top-2 flex gap-1">
        <button
          onClick={onEdit}
          aria-label="تعديل الهدف"
          className="flex h-6 w-6 items-center justify-center rounded-full bg-background text-muted transition-colors hover:bg-black/10 hover:text-ink"
        >
          <EditIcon />
        </button>
        <button
          onClick={onDelete}
          aria-label="حذف الهدف"
          className="flex h-6 w-6 items-center justify-center rounded-full bg-background text-muted transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <TrashIcon />
        </button>
      </div>

      <span className="text-3xl">{cause.icon}</span>
      <span className="text-sm font-bold leading-snug text-ink">{customGoalTitle(goal)}</span>
      <div className="w-full">
        <AnimatedBar pct={pct} colorClass="bg-gold" heightClass="h-1.5" />
        <span className="mt-1.5 block text-xs text-muted">{pct}٪ مكتمل</span>
      </div>
    </div>
  );
}
