import Link from "next/link";
import {
  CHARITY_CAUSES,
  highestAchievedImpact,
  formatImpactSentence,
  groupImpactHistoryByMonth,
  formatImpactMonthLabel,
} from "@/lib/mock-data";
import { formatSAR } from "@/lib/types";

export default function ImpactPage() {
  const fundedCauses = CHARITY_CAUSES.filter((c) => c.yourContribution > 0).sort(
    (a, b) => b.yourContribution - a.yourContribution
  );
  const totalSAR = fundedCauses.reduce((sum, c) => sum + c.yourContribution, 0);
  const topCause = fundedCauses[0];
  const topImpact = topCause ? highestAchievedImpact(topCause.id, topCause.yourContribution) : null;
  const monthlyGroups = groupImpactHistoryByMonth();

  return (
    <div className="flex flex-col gap-6 md:gap-7">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">أثرك</h1>
        <p className="mt-1 text-sm text-muted">هذا ما تحقق فعليًا بفضل فكتك</p>
      </div>

      {/* Hero: real-world unit first, SAR as supporting text */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-6 text-white shadow-elevated md:p-8">
        <div
          className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full bg-gold/20 blur-3xl"
          aria-hidden
        />
        {topImpact && topCause ? (
          <>
            <div className="relative text-sm text-white/70">أبرز أثر حققته حتى الآن</div>
            <div className="relative mt-1 text-2xl font-extrabold text-gold-light md:text-3xl">
              {formatImpactSentence(topImpact.unit, topImpact.count)} {topImpact.unit.emoji}
            </div>
            <div className="relative mt-3 text-xs font-medium text-white/60">
              بإجمالي {formatSAR(totalSAR, { decimals: 2 })} ر.س من فكتك موجّهة للخير
            </div>
          </>
        ) : (
          <>
            <div className="relative text-sm text-white/70">لم تبدأ رحلتك بعد</div>
            <div className="relative mt-1 text-xl font-extrabold text-gold-light">
              وجّه فكتك الأولى لترى أثرك الحقيقي هنا
            </div>
          </>
        )}
      </div>

      {/* Per-cause breakdown */}
      <div className="rounded-3xl bg-card p-6 shadow-card md:p-7">
        <h2 className="text-sm font-bold text-ink">أثرك حسب الجهة</h2>

        {fundedCauses.length > 0 ? (
          <div className="mt-3 divide-y divide-black/5">
            {fundedCauses.map((cause) => {
              const impact = highestAchievedImpact(cause.id, cause.yourContribution)!;
              return (
                <Link
                  key={cause.id}
                  href={`/charities/${cause.id}`}
                  className="flex items-center gap-3.5 rounded-xl px-1.5 py-3.5 transition-colors hover:bg-background"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background text-xl">
                    {cause.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-ink">
                      {formatImpactSentence(impact.unit, impact.count)} {impact.unit.emoji}
                    </div>
                    <div className="mt-0.5 text-xs text-muted">
                      {cause.title} · {formatSAR(cause.yourContribution, { decimals: 2 })} ر.س
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-3 rounded-2xl bg-background p-5 text-center text-sm text-muted">
            لا يوجد أثر مسجّل بعد. وجّه فكتك لأول جهة لتبدأ.
          </div>
        )}
      </div>

      {/* Monthly history, real-world units first */}
      <div className="rounded-3xl bg-card p-6 shadow-card md:p-7">
        <h2 className="text-sm font-bold text-ink">سجل الأثر الشهري</h2>

        <div className="mt-4 flex flex-col gap-5">
          {monthlyGroups.map((group) => (
            <div key={group.month}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-muted">{formatImpactMonthLabel(group.month)}</span>
                <span className="text-xs text-muted">{formatSAR(group.total, { decimals: 2 })} ر.س</span>
              </div>
              <div className="flex flex-col gap-2">
                {group.entries.map((entry, idx) => {
                  const cause = CHARITY_CAUSES.find((c) => c.id === entry.causeId)!;
                  const impact = highestAchievedImpact(entry.causeId, entry.amount)!;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-background px-3.5 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="text-lg">{cause.icon}</span>
                        <span className="truncate text-sm font-semibold text-ink">
                          {formatImpactSentence(impact.unit, impact.count)} {impact.unit.emoji}
                        </span>
                      </div>
                      <span className="shrink-0 text-xs font-medium text-muted">
                        {formatSAR(entry.amount, { decimals: 2 })} ر.س
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/charities"
        className="text-center text-xs font-semibold text-primary-light hover:underline"
      >
        استكشف الجمعيات ووجّه فكتك
      </Link>
    </div>
  );
}
