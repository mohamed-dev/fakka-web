"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ListIcon, MosqueIcon, HeartIcon, UsersIcon } from "./icons";

// DOM order matters for RTL flex layout: the first item renders at the
// screen's right edge, the last at the left edge. This order yields the
// left-to-right screen sequence: الزكاة، الجمعيات، أثرك، المعاملات، الرئيسية.
// "الجمعيات" (/charities, the cause list) and "أثرك" (/impact, the personal
// impact dashboard) are separate features and must not share a route.
const TABS = [
  { href: "/", label: "الرئيسية", icon: HomeIcon },
  { href: "/transactions", label: "المعاملات", icon: ListIcon },
  { href: "/impact", label: "أثرك", icon: HeartIcon },
  { href: "/charities", label: "الجمعيات", icon: UsersIcon },
  { href: "/zakat", label: "الزكاة", icon: MosqueIcon },
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
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
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
