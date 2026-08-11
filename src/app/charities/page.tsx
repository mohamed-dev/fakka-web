import Link from "next/link";
import { CHARITY_CAUSES } from "@/lib/mock-data";
import { formatSAR } from "@/lib/types";

export default function CharitiesPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-7">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">الجمعيات</h1>
        <p className="mt-1 text-sm text-muted">اختر جهة ووجّه فكتك نحو أثر حقيقي</p>
      </div>

      <div className="flex flex-col gap-3.5">
        {CHARITY_CAUSES.map((cause) => {
          const hasContributed = cause.yourContribution > 0;
          return (
            <div
              key={cause.id}
              className="rounded-2xl bg-card p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft md:p-5"
            >
              <Link href={`/charities/${cause.id}`} className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-background text-2xl">
                  {cause.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-ink">{cause.title}</div>
                  <div className="mt-0.5 truncate text-xs text-muted">{cause.description}</div>
                </div>
              </Link>

              <div className="mt-3 flex items-center justify-between gap-3">
                {hasContributed ? (
                  <span className="inline-flex items-center rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-bold text-gold">
                    ساهمت بـ {formatSAR(cause.yourContribution, { decimals: 2 })} ر.س حتى الآن
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-background px-2.5 py-0.5 text-xs font-semibold text-muted">
                    لم تبدأ بعد
                  </span>
                )}

                <Link
                  href={`/charities/${cause.id}`}
                  className="shrink-0 rounded-full bg-gold px-4 py-2 text-xs font-bold text-white shadow-card transition-all duration-200 hover:brightness-110 active:scale-95"
                >
                  تبرع الآن
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
