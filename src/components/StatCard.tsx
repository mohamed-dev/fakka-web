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
    <div className="rounded-xl2 bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold text-ink">{value}</span>
        {suffix && <span className="text-sm text-muted">{suffix}</span>}
      </div>
      {trend && <div className="mt-1 text-xs font-medium text-primary-light">{trend}</div>}
    </div>
  );
}
