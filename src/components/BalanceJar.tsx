import { formatSAR } from "@/lib/types";

export default function BalanceJar({
  balance,
  target,
  label,
  icon,
  note,
}: {
  balance: number;
  target: number;
  label: string;
  icon: string;
  note: string;
}) {
  const pct = Math.min(100, Math.round((balance / target) * 100));
  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct / 100);

  return (
    <div className="flex flex-col items-center rounded-xl2 bg-card p-8 shadow-card">
      <div className="mb-1 text-sm font-medium text-muted">
        {icon} رصيدك في {label}
      </div>

      <div className="relative my-4 h-52 w-52">
        <svg viewBox="0 0 192 192" className="h-full w-full -rotate-90">
          <circle cx="96" cy="96" r={radius} fill="none" stroke="#F7F3EA" strokeWidth="14" />
          <circle
            cx="96"
            cy="96"
            r={radius}
            fill="none"
            stroke="#C6963C"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-extrabold text-primary">{formatSAR(balance, { decimals: 2 })}</div>
          <div className="text-xs font-medium text-muted">ريال سعودي</div>
          <div className="mt-2 rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-gold">
            {pct}٪ من {formatSAR(target, { decimals: 0 })} ر.س
          </div>
        </div>
      </div>

      <div className="text-sm text-muted">{note}</div>
    </div>
  );
}
