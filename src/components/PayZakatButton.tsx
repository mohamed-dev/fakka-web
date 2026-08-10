"use client";

import { useState } from "react";
import { formatSAR } from "@/lib/types";

export default function PayZakatButton({ amount }: { amount: number }) {
  const [paid, setPaid] = useState(false);

  if (paid) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl bg-primary-light/10 px-5 py-3 text-sm font-semibold text-primary-light">
        <span>✓</span>
        تم إرسال طلب دفع الزكاة بنجاح
      </div>
    );
  }

  return (
    <button
      onClick={() => setPaid(true)}
      className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.01] active:scale-[0.99]"
    >
      ادفع الزكاة الآن — {formatSAR(amount, { decimals: 2 })} ر.س
    </button>
  );
}
