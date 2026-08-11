"use client";

import { useState } from "react";
import Link from "next/link";
import { formatSAR } from "@/lib/types";
import { DESTINATION_BALANCES, TRANSACTIONS, weeklyRoundUp, monthlyRoundUp } from "@/lib/mock-data";
import DestinationTabs, { HOME_TABS, HomeTabId } from "./DestinationTabs";
import BalanceJar from "./BalanceJar";
import StatCard from "./StatCard";
import SubscriptionCard from "./SubscriptionCard";
import TransactionRow from "./TransactionRow";
import { ChevronIcon } from "./icons";

const TOTAL_BALANCE = DESTINATION_BALANCES.zakat.balance + DESTINATION_BALANCES.goal.balance;
const TOTAL_TARGET = DESTINATION_BALANCES.zakat.target + DESTINATION_BALANCES.goal.target;

export default function HomeDashboard() {
  const [active, setActive] = useState<HomeTabId>("total");
  const activeTab = HOME_TABS.find((t) => t.id === active)!;

  const recent = TRANSACTIONS.slice(0, 6);
  const weekly = weeklyRoundUp();
  const monthly = monthlyRoundUp();

  return (
    <div className="flex flex-col gap-6 md:gap-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">أهلًا بك 👋</h1>
          <p className="mt-1 text-sm text-muted">تابع فكتك المجمّعة تلقائيًا من كل عملية شراء</p>
        </div>
        <DestinationTabs active={active} onChange={setActive} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-3 lg:col-span-1">
          {active === "transactions" ? (
            <div className="flex flex-col rounded-3xl bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-muted">
                <span>{activeTab.icon}</span> آخر حركاتك
              </div>
              <div className="divide-y divide-black/5">
                {recent.slice(0, 5).map((t) => (
                  <TransactionRow key={t.id} txn={t} />
                ))}
              </div>
              <Link
                href="/transactions"
                className="mt-3 text-center text-xs font-semibold text-primary-light hover:underline"
              >
                عرض كل الحركات
              </Link>
            </div>
          ) : active === "total" ? (
            <BalanceJar
              balance={TOTAL_BALANCE}
              target={TOTAL_TARGET}
              label={activeTab.label}
              icon={activeTab.icon}
              caption="إجمالي فكتك من كل الوجهات"
              note="مجموع ما جمعته للزكاة وهدف الادخار"
            />
          ) : (
            <>
              <BalanceJar
                balance={DESTINATION_BALANCES[active].balance}
                target={DESTINATION_BALANCES[active].target}
                label={activeTab.label}
                icon={activeTab.icon}
                caption={active === "goal" ? "رصيدك في هدف الادخار" : undefined}
                note={DESTINATION_BALANCES[active].note}
              />
              {active === "goal" && (
                <Link
                  href="/goal"
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-card px-4 py-3.5 text-sm font-bold text-primary-light shadow-card transition-all duration-200 active:scale-[0.98] hover:shadow-soft"
                >
                  تفاصيل الهدف
                  <ChevronIcon />
                </Link>
              )}
            </>
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

      <div className="rounded-2xl bg-card p-5 shadow-card md:p-6">
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
