"use client";

import { useState } from "react";
import { DESTINATIONS, DestinationType, formatSAR } from "@/lib/types";
import { DESTINATION_BALANCES, TRANSACTIONS, weeklyRoundUp, monthlyRoundUp } from "@/lib/mock-data";
import DestinationTabs from "./DestinationTabs";
import BalanceJar from "./BalanceJar";
import StatCard from "./StatCard";
import SubscriptionCard from "./SubscriptionCard";
import TransactionRow from "./TransactionRow";
import Link from "next/link";

export default function HomeDashboard() {
  const [active, setActive] = useState<DestinationType>("zakat");
  const destination = DESTINATIONS.find((d) => d.id === active)!;
  const jar = DESTINATION_BALANCES[active];

  const recent = TRANSACTIONS.slice(0, 6);
  const weekly = weeklyRoundUp();
  const monthly = monthlyRoundUp();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">أهلًا بك 👋</h1>
          <p className="mt-1 text-sm text-muted">تابع فكتك المجمّعة تلقائيًا من كل عملية شراء</p>
        </div>
        <DestinationTabs active={active} onChange={setActive} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-3 lg:col-span-1">
          <BalanceJar
            balance={jar.balance}
            target={jar.target}
            label={destination.label}
            icon={destination.icon}
            note={jar.note}
          />
          {active === "charity" && (
            <Link
              href="/charity"
              className="flex items-center justify-center gap-2 rounded-xl2 bg-card px-4 py-3 text-sm font-semibold text-primary-light shadow-card transition-colors hover:bg-background"
            >
              شاهد أثرك
              <span>‹</span>
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="فكة هذا الأسبوع" value={`${formatSAR(weekly, { decimals: 2 })}`} suffix="ر.س" icon="📅" trend="+12٪ عن الأسبوع الماضي" />
            <StatCard label="فكة هذا الشهر" value={`${formatSAR(monthly, { decimals: 2 })}`} suffix="ر.س" icon="🗓️" trend="+8٪ عن الشهر الماضي" />
          </div>
          <SubscriptionCard />
        </div>
      </div>

      <div className="rounded-xl2 bg-card p-5 shadow-card">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-bold text-ink">آخر الحركات</h2>
          <Link href="/transactions" className="text-xs font-semibold text-primary-light hover:underline">
            عرض الكل
          </Link>
        </div>
        <div className="divide-y divide-black/5">
          {recent.map((t) => (
            <TransactionRow key={t.id} txn={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
