import { TRANSACTIONS, groupByDate, formatArabicDate, totalRoundUpFor } from "@/lib/mock-data";
import { formatSAR } from "@/lib/types";
import TransactionRow from "@/components/TransactionRow";

export default function TransactionsPage() {
  const groups = groupByDate(TRANSACTIONS);
  const totalRoundUp = totalRoundUpFor(TRANSACTIONS);
  const totalSpent = TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="flex flex-col gap-6 md:gap-7">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">الحركات</h1>
        <p className="mt-1 text-sm text-muted">كل عملياتك وما تجمّع منها من فكة</p>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4">
        <div className="rounded-2xl bg-card p-5 shadow-card">
          <div className="text-xs font-medium text-muted">عدد العمليات</div>
          <div className="mt-1.5 text-xl font-extrabold text-ink">{TRANSACTIONS.length}</div>
        </div>
        <div className="rounded-2xl bg-card p-5 shadow-card">
          <div className="text-xs font-medium text-muted">إجمالي الإنفاق</div>
          <div className="mt-1.5 text-xl font-extrabold text-ink">{formatSAR(totalSpent, { decimals: 0 })} ر.س</div>
        </div>
        <div className="col-span-2 rounded-2xl bg-gradient-to-br from-primary to-primary-light p-5 shadow-soft sm:col-span-1">
          <div className="text-xs font-medium text-white/70">إجمالي الفكة المجمّعة</div>
          <div className="mt-1.5 text-xl font-extrabold text-gold-light">{formatSAR(totalRoundUp, { decimals: 2 })} ر.س</div>
        </div>
      </div>

      <div className="flex flex-col gap-5 md:gap-6">
        {groups.map((group) => {
          const groupRoundUp = totalRoundUpFor(group.items);
          return (
            <div key={group.date} className="rounded-3xl bg-card p-5 shadow-card md:p-6">
              <div className="mb-1 flex items-center justify-between">
                <h2 className="text-sm font-bold text-ink">{formatArabicDate(group.date)}</h2>
                <span className="rounded-full bg-gold/10 px-2.5 py-1 text-xs font-bold text-gold">
                  +{formatSAR(groupRoundUp, { decimals: 2 })} ر.س فكة
                </span>
              </div>
              <div className="divide-y divide-black/5">
                {group.items.map((t) => (
                  <TransactionRow key={t.id} txn={t} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
