import { SUBSCRIPTIONS } from "@/lib/mock-data";
import { formatSAR } from "@/lib/types";

export default function SubscriptionCard() {
  const monthlyTotal = SUBSCRIPTIONS.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="rounded-xl2 bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-base">🔁</span>
          <div>
            <div className="text-sm font-bold text-ink">اشتراكات متكررة مكتشفة</div>
            <div className="text-xs text-muted">{SUBSCRIPTIONS.length} اشتراكات نشطة</div>
          </div>
        </div>
        <div className="text-left">
          <div className="text-sm font-bold text-ink">{formatSAR(monthlyTotal, { decimals: 0 })} ر.س</div>
          <div className="text-xs text-muted">شهريًا</div>
        </div>
      </div>

      <div className="mt-4 divide-y divide-black/5">
        {SUBSCRIPTIONS.map((s) => (
          <div key={s.id} className="flex items-center justify-between py-2.5">
            <div>
              <div className="text-sm font-semibold text-ink">{s.merchant}</div>
              <div className="text-xs text-muted">
                {s.cadence} · آخر خصم {s.lastCharge.slice(5).split("-").reverse().join("/")}
              </div>
            </div>
            <div className="text-sm font-semibold text-ink">{formatSAR(s.amount, { decimals: 0 })} ر.س</div>
          </div>
        ))}
      </div>
    </div>
  );
}
