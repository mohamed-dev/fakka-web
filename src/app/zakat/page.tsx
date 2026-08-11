import { ZAKAT_STATE } from "@/lib/mock-data";
import { formatSAR } from "@/lib/types";
import PayZakatButton from "@/components/PayZakatButton";
import AnimatedBar from "@/components/AnimatedBar";

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export default function ZakatPage() {
  const today = new Date("2026-08-10");
  const start = new Date(ZAKAT_STATE.hawlStartDate);
  const end = new Date(ZAKAT_STATE.hawlEndDate);

  const totalDays = daysBetween(start, end);
  const elapsedDays = daysBetween(start, today);
  const remainingDays = daysBetween(today, end);
  const hawlPct = Math.min(100, Math.round((elapsedDays / totalDays) * 100));

  const isAboveNisab = ZAKAT_STATE.eligibleBalance >= ZAKAT_STATE.nisabThreshold;
  const remaining = Math.max(0, ZAKAT_STATE.zakatDue - ZAKAT_STATE.savedTowardZakat);
  const savedPct = Math.min(100, Math.round((ZAKAT_STATE.savedTowardZakat / ZAKAT_STATE.zakatDue) * 100));
  const nisabBarPct = Math.min(100, (ZAKAT_STATE.eligibleBalance / (ZAKAT_STATE.nisabThreshold * 1.5)) * 100);

  const dueDateLabel = end.toLocaleDateString("ar-SA-u-ca-gregory", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6 md:gap-7">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">متتبع الزكاة</h1>
        <p className="mt-1 text-sm text-muted">احسب استحقاقك تلقائيًا وتابع دورة الحول</p>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-6 text-white shadow-elevated md:p-7">
        <div
          className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full bg-gold/20 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm text-white/70">الرصيد المزكّى (الخاضع للزكاة)</div>
            <div className="mt-1 text-3xl font-extrabold tracking-tight text-gold-light md:text-4xl">
              {formatSAR(ZAKAT_STATE.eligibleBalance, { decimals: 2 })} ر.س
            </div>
          </div>
          <div className="text-left">
            <div className="text-sm text-white/70">نصاب الزكاة الحالي</div>
            <div className="mt-1 text-lg font-bold">{formatSAR(ZAKAT_STATE.nisabThreshold, { decimals: 0 })} ر.س</div>
          </div>
        </div>

        <div className="relative mt-5">
          <AnimatedBar pct={nisabBarPct} colorClass="bg-gold" trackClass="bg-white/15" heightClass="h-2.5" />
        </div>

        <div
          className={`relative mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
            isAboveNisab ? "bg-gold/20 text-gold-light" : "bg-white/10 text-white/70"
          }`}
        >
          {isAboveNisab ? "✓ رصيدك أعلى من النصاب — الزكاة واجبة" : "رصيدك أقل من النصاب"}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-card p-6 shadow-card md:p-7">
          <h2 className="text-sm font-bold text-ink">تقدّم الحول</h2>
          <p className="mt-1 text-xs text-muted">
            بدأ الحول في {start.toLocaleDateString("ar-SA-u-ca-gregory", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <div className="mt-5">
            <AnimatedBar pct={hawlPct} colorClass="bg-primary-light" heightClass="h-3" />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted">
            <span>{hawlPct}٪ مكتمل</span>
            <span>{remainingDays} يومًا متبقيًا</span>
          </div>

          <div className="mt-5 rounded-2xl bg-background p-4">
            <div className="text-xs text-muted">تاريخ استحقاق الزكاة</div>
            <div className="mt-1 text-lg font-bold text-ink">{dueDateLabel}</div>
          </div>
        </div>

        <div className="rounded-3xl bg-card p-6 shadow-card md:p-7">
          <h2 className="text-sm font-bold text-ink">مبلغ الزكاة المستحق</h2>
          <p className="mt-1 text-xs text-muted">٢.٥٪ من الرصيد المزكّى</p>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-ink">{formatSAR(ZAKAT_STATE.zakatDue, { decimals: 2 })}</span>
            <span className="text-sm text-muted">ر.س</span>
          </div>

          <div className="mt-4">
            <AnimatedBar pct={savedPct} colorClass="bg-gold" heightClass="h-2.5" />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted">
            <span>تم توفير {formatSAR(ZAKAT_STATE.savedTowardZakat, { decimals: 2 })} ر.س من الفكة</span>
            <span>{savedPct}٪</span>
          </div>

          <div className="mt-4 rounded-2xl bg-background p-3.5 text-center text-sm">
            <span className="text-muted">المتبقي لإتمام المبلغ: </span>
            <span className="font-bold text-ink">{formatSAR(remaining, { decimals: 2 })} ر.س</span>
          </div>

          <div className="mt-5">
            <PayZakatButton amount={ZAKAT_STATE.zakatDue} />
          </div>
        </div>
      </div>
    </div>
  );
}
