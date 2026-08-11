export default function StatCard({
  label,
  value,
  suffix,
  trend,
  icon,
}: {
  label: string;
  value: string;
  suffix?: string;
  trend?: string;
  icon?: string;
}) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-card transition-shadow duration-200 hover:shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted">{label}</span>
        {icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 text-base">
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold tracking-tight text-ink">{value}</span>
        {suffix && <span className="text-sm text-muted">{suffix}</span>}
      </div>
      {trend && (
        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-light/10 px-2 py-0.5 text-xs font-semibold text-primary-light">
          {trend}
        </div>
      )}
    </div>
  );
}
