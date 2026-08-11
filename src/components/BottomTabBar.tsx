"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ListIcon, MosqueIcon, HeartIcon, SettingsIcon } from "./icons";

const TABS = [
  { href: "/", label: "الرئيسية", icon: HomeIcon },
  { href: "/transactions", label: "المعاملات", icon: ListIcon },
  { href: "/zakat", label: "الزكاة", icon: MosqueIcon },
  { href: "/charity", label: "الأثر", icon: HeartIcon },
  { href: "/settings", label: "الإعدادات", icon: SettingsIcon },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-card/95 shadow-nav backdrop-blur-lg md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 pt-1.5">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex min-w-[64px] flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 transition-transform active:scale-90"
            >
              <span
                className={`flex h-8 w-11 items-center justify-center rounded-full transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted"
                }`}
              >
                <Icon active={isActive} />
              </span>
              <span
                className={`text-[10.5px] font-semibold transition-colors ${
                  isActive ? "text-primary" : "text-muted"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
