"use client";

import { useState } from "react";
import Link from "next/link";
import { IMPACT_UNITS, highestAchievedImpact, formatImpactSentence } from "@/lib/mock-data";
import { CharityCause, formatSAR } from "@/lib/types";

export default function CharityDetail({ cause }: { cause: CharityCause }) {
  const [justDirected, setJustDirected] = useState(false);
  const units = IMPACT_UNITS[cause.id];
  const hasContributed = cause.yourContribution > 0;
  const headlineImpact = hasContributed ? highestAchievedImpact(cause.id, cause.yourContribution) : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 rounded-3xl bg-card p-6 shadow-card md:p-7">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-background text-3xl">
          {cause.icon}
        </span>
        <div>
          <div className="text-lg font-extrabold text-ink">{cause.title}</div>
          <div className="mt-0.5 text-sm text-muted">{cause.description}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div className="rounded-2xl bg-card p-5 shadow-card">
          <div className="text-xs font-medium text-muted">إجمالي تبرعات المجتمع لهذه الجهة</div>
          <div className="mt-1.5 text-xl font-extrabold text-ink">
            {formatSAR(cause.totalCommunityRaised, { decimals: 0 })} ر.س
          </div>
        </div>
        <div className="rounded-2xl bg-card p-5 shadow-card">
          <div className="text-xs font-medium text-muted">مساهمتك الفعلية حتى الآن</div>
          <div className="mt-1.5 text-xl font-extrabold text-ink">
            {formatSAR(cause.yourContribution, { decimals: 2 })} ر.س
          </div>
        </div>
      </div>

      {hasContributed && headlineImpact ? (
        <>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-6 text-white shadow-elevated">
            <div
              className="pointer-events-none absolute -left-6 -top-6 h-32 w-32 rounded-full bg-gold/20 blur-3xl"
              aria-hidden
            />
            <div className="relative text-sm text-white/70">أثرك الفعلي حتى الآن</div>
            <div className="relative mt-1 text-lg font-extrabold text-gold-light md:text-xl">
              {formatImpactSentence(headlineImpact.unit, headlineImpact.count)} {headlineImpact.unit.emoji}
            </div>
          </div>

          <div className="rounded-3xl bg-card p-6 shadow-card md:p-7">
            <h2 className="text-sm font-bold text-ink">تفصيل الأثر المتحقق</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {units.map((unit) => {
                const count = Math.floor(cause.yourContribution / unit.cost);
                const achieved = count >= 1;
                return (
                  <div
                    key={unit.unit}
                    className={`flex flex-col items-center gap-1.5 rounded-2xl p-4 text-center transition-transform duration-200 ${
                      achieved ? "bg-gold/10 hover:-translate-y-0.5" : "bg-background opacity-60"
                    }`}
                  >
                    <span className="text-2xl">{unit.emoji}</span>
                    {achieved ? (
                      <>
                        <span className="text-lg font-extrabold text-gold">{count}</span>
                        <span className="text-xs font-medium text-ink">{unit.unit}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-medium text-muted">{unit.unit}</span>
                        <span className="text-xs font-semibold text-muted">
                          يحتاج {formatSAR(unit.cost - cause.yourContribution, { decimals: 2 })} ر.س
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-card p-8 text-center shadow-card md:p-10">
          <span className="text-4xl">{cause.icon}</span>
          <div>
            <div className="text-base font-extrabold text-ink">ابدأ التبرع لهذه الجهة</div>
            <div className="mt-1 text-sm text-muted">
              لم توجّه أي فكة لهذه الجهة بعد. وجّه فكتك الآن لتبدأ برؤية أثرك الحقيقي هنا.
            </div>
          </div>

          {justDirected ? (
            <div className="flex animate-pop-in items-center justify-center gap-2 rounded-2xl bg-primary-light/10 px-5 py-3.5 text-sm font-semibold text-primary-light">
              <span>✓</span>
              تم توجيه فكتك نحو {cause.title}
            </div>
          ) : (
            <button
              onClick={() => setJustDirected(true)}
              className="rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-all duration-200 hover:shadow-glow hover:brightness-110 active:scale-[0.98]"
            >
              وجّه فكتك هنا
            </button>
          )}
        </div>
      )}

      <Link
        href="/charities"
        className="text-center text-xs font-semibold text-primary-light hover:underline"
      >
        عرض جميع الجمعيات
      </Link>
    </div>
  );
}
