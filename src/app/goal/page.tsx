import GoalPicker from "@/components/GoalPicker";

export default function GoalPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">أهداف الادخار</h1>
        <p className="mt-1 text-sm text-muted">اختر هدفًا ودع فكتك تجمّعه تلقائيًا</p>
      </div>
      <GoalPicker />
    </div>
  );
}
