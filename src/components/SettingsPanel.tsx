"use client";

import { useState } from "react";
import { BANK_ACCOUNT } from "@/lib/mock-data";
import { DESTINATIONS, DestinationType } from "@/lib/types";

function ToggleRow({
  title,
  desc,
  defaultOn,
}: {
  title: string;
  desc: string;
  defaultOn: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div>
        <div className="text-sm font-semibold text-ink">{title}</div>
        <div className="mt-0.5 text-xs text-muted">{desc}</div>
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-black/15"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            on ? "left-0.5" : "right-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPanel() {
  const [connected, setConnected] = useState(true);
  const [preferredDestination, setPreferredDestination] = useState<DestinationType>("zakat");
  const [confirmingDisconnect, setConfirmingDisconnect] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Bank connection */}
      <div className="rounded-xl2 bg-card p-6 shadow-card">
        <h2 className="text-sm font-bold text-ink">الحساب البنكي المتصل</h2>

        {connected ? (
          <>
            <div className="mt-4 flex items-center gap-4 rounded-xl bg-background p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-lg font-bold text-gold">
                AR
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-ink">{BANK_ACCOUNT.bankName}</div>
                <div className="text-xs text-muted">
                  {BANK_ACCOUNT.accountType} · {BANK_ACCOUNT.accountMasked}
                </div>
              </div>
              <span className="rounded-full bg-primary-light/10 px-3 py-1 text-xs font-semibold text-primary-light">
                {BANK_ACCOUNT.status}
              </span>
            </div>
            <div className="mt-2 text-xs text-muted">
              تم الربط بتاريخ {BANK_ACCOUNT.connectedDate.split("-").reverse().join("/")}
            </div>

            {!confirmingDisconnect ? (
              <button
                onClick={() => setConfirmingDisconnect(true)}
                className="mt-4 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                فصل الحساب
              </button>
            ) : (
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-red-50 p-4">
                <span className="text-sm text-red-700">هل أنت متأكد من فصل الحساب؟ سيتوقف تجميع الفكة.</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setConnected(false);
                      setConfirmingDisconnect(false);
                    }}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    تأكيد الفصل
                  </button>
                  <button
                    onClick={() => setConfirmingDisconnect(false)}
                    className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-semibold text-ink"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-3 rounded-xl bg-background p-6 text-center">
            <span className="text-sm text-muted">لا يوجد حساب بنكي متصل حاليًا</span>
            <button
              onClick={() => setConnected(true)}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white"
            >
              ربط حساب بنكي
            </button>
          </div>
        )}
      </div>

      {/* Destination preference */}
      <div className="rounded-xl2 bg-card p-6 shadow-card">
        <h2 className="text-sm font-bold text-ink">الوجهة الافتراضية للفكة</h2>
        <p className="mt-1 text-xs text-muted">اختر أين تذهب فكتك المجمّعة تلقائيًا بشكل افتراضي</p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {DESTINATIONS.map((d) => {
            const isActive = d.id === preferredDestination;
            return (
              <button
                key={d.id}
                onClick={() => setPreferredDestination(d.id)}
                className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive ? "border-primary bg-primary/5 text-ink" : "border-black/5 text-muted hover:border-black/10"
                }`}
              >
                <span>{d.icon}</span>
                {d.label}
                {isActive && <span className="mr-auto text-primary">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Privacy / consent (Saudi PDPL) */}
      <div className="rounded-xl2 bg-card p-6 shadow-card">
        <h2 className="text-sm font-bold text-ink">الخصوصية والموافقة</h2>
        <p className="mt-1 text-xs text-muted">
          وفقًا لنظام حماية البيانات الشخصية السعودي (PDPL)، نلتزم بمعالجة بياناتك بشفافية وبموافقتك الصريحة.
        </p>

        <div className="mt-2 divide-y divide-black/5">
          <ToggleRow
            title="مشاركة بيانات المعاملات"
            desc="السماح بقراءة تفاصيل عملياتك البنكية لحساب الفكة تلقائيًا"
            defaultOn={true}
          />
          <ToggleRow
            title="التخزين لأغراض تحليل الإنفاق"
            desc="حفظ سجل معاملاتك لعرض الإحصائيات والاتجاهات الشهرية"
            defaultOn={true}
          />
          <ToggleRow
            title="التسويق والعروض"
            desc="استقبال إشعارات حول ميزات وعروض جديدة من فكة"
            defaultOn={false}
          />
        </div>

        <div className="mt-4 rounded-xl bg-background p-4 text-xs leading-relaxed text-muted">
          يحق لك في أي وقت طلب الاطلاع على بياناتك أو تصحيحها أو حذفها، وذلك بما يتوافق مع نظام حماية البيانات
          الشخصية الصادر عن الهيئة السعودية لتنظيم البيانات (سدايا). بياناتك مشفّرة ولا تتم مشاركتها مع أي جهة
          خارجية دون موافقتك الصريحة.
        </div>

        <button className="mt-4 text-xs font-semibold text-primary-light hover:underline">
          عرض سياسة الخصوصية الكاملة
        </button>
      </div>
    </div>
  );
}
