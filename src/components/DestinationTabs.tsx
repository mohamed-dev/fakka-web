export type HomeTabId = "total" | "transactions" | "zakat";

interface HomeTab {
  id: HomeTabId;
  label: string;
  icon: string;
}

// DOM order matters for RTL flex layout: the first item renders at the
// screen's right edge, the last at the left edge (same pattern as
// BottomTabBar.tsx). This order yields the left-to-right screen sequence:
// الزكاة، اخر الحركات، الفكة. "هدف ادخاري" was removed from this switcher —
// it now has its own dedicated bottom tab and full /goal page, so it no
// longer needs a second, inconsistent entry point here.
export const HOME_TABS: HomeTab[] = [
  { id: "total", label: "الفكة", icon: "🪙" },
  { id: "transactions", label: "اخر الحركات", icon: "🧾" },
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
    <div className="scrollbar-hide overflow-x-auto md:overflow-visible">
      <div className="inline-flex gap-1 rounded-2xl bg-card p-1.5 shadow-card">
        {HOME_TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                isActive ? "bg-primary text-white shadow-soft" : "text-muted hover:bg-background hover:text-ink"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
