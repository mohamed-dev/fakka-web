import { DESTINATIONS, DestinationType } from "@/lib/types";

export default function DestinationTabs({
  active,
  onChange,
}: {
  active: DestinationType;
  onChange: (d: DestinationType) => void;
}) {
  return (
    <div className="inline-flex gap-1 rounded-2xl bg-card p-1.5 shadow-card">
      {DESTINATIONS.map((d) => {
        const isActive = d.id === active;
        return (
          <button
            key={d.id}
            onClick={() => onChange(d.id)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 ${
              isActive ? "bg-primary text-white shadow-soft" : "text-muted hover:bg-background hover:text-ink"
            }`}
          >
            <span>{d.icon}</span>
            {d.label}
          </button>
        );
      })}
    </div>
  );
}
