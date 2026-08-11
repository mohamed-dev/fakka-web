export type HomeTabId = "total" | "transactions" | "goal" | "zakat";

interface HomeTab {
  id: HomeTabId;
  label: string;
  icon: string;
}

// DOM order matters for RTL flex layout: the first item renders at the
// screen's right edge, the last at the left edge (same pattern as
// BottomTabBar.tsx). This order yields the left-to-right screen sequence:
// الزكاة، هدف ادخاري، اخر الحركات، الفكة.
export const HOME_TABS: HomeTab[] = [
  { id: "total", label: "الفكة", icon: "🪙" },
  { id: "transactions", label: "اخر الحركات", icon: "🧾" },
  { id: "goal", label: "هدف ادخاري", icon: "🎯" },
  { id: "zakat", label: "الزكاة", icon: "🕌" },
];

export default function DestinationTabs({
  active,
  onChange,
}: {
  active: HomeTabId;
  onChange: (id: HomeTabId) => void;
}) {
  return (
    <div className="inline-flex gap-1 rounded-2xl bg-card p-1.5 shadow-card">
      {HOME_TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 ${
              isActive ? "bg-primary text-white shadow-soft" : "text-muted hover:bg-background hover:text-ink"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
