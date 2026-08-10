"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "الرئيسية" },
  { href: "/transactions", label: "الحركات" },
  { href: "/zakat", label: "الزكاة" },
  { href: "/goal", label: "أهداف الادخار" },
  { href: "/settings", label: "الإعدادات" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden sticky top-0 z-30 border-b border-black/5 bg-card">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-gold">
            ف
          </div>
          <span className="text-base font-bold text-ink">فكة</span>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="القائمة"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink hover:bg-background"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/5 px-4 py-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive ? "bg-primary text-white" : "text-muted hover:bg-background hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
