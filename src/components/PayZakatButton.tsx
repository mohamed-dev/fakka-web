"use client";

import { useState } from "react";
import { formatSAR } from "@/lib/types";

export default function PayZakatButton({ amount }: { amount: number }) {
  const [paid, setPaid] = useState(false);

  if (paid) {
    return (
      <div className="flex animate-pop-in items-center justify-center gap-2 rounded-2xl bg-primary-light/10 px-5 py-3.5 text-sm font-semibold text-primary-light">
        <span>✓</span>
        تم إرسال طلب دفع الزكاة بنجاح
      </div>
    );
  }

  return (
    <button
      onClick={() => setPaid(true)}
      className="w-full rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-soft transition-all duration-200 hover:shadow-glow hover:brightness-110 active:scale-[0.98]"
    >
      ادفع الزكاة الآن — {formatSAR(amount, { decimals: 2 })} ر.س
    </button>
  );
}
