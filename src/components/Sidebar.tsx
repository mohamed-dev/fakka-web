"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ListIcon, MosqueIcon, TargetIcon, HeartIcon, UsersIcon, SettingsIcon } from "./icons";

const NAV_ITEMS = [
  { href: "/", label: "الرئيسية", icon: HomeIcon },
  { href: "/transactions", label: "الحركات", icon: ListIcon },
  { href: "/zakat", label: "الزكاة", icon: MosqueIcon },
  { href: "/goal", label: "أهداف الادخار", icon: TargetIcon },
  { href: "/charities", label: "الجمعيات", icon: UsersIcon },
  { href: "/impact", label: "أثرك", icon: HeartIcon },
  { href: "/settings", label: "الإعدادات", icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed right-0 top-0 h-screen w-64 flex-col border-l border-black/5 bg-card px-4 py-6">
      <div className="px-2 pb-8">
        <Image src="/logo.png" alt="فكة" width={112} height={63} priority className="h-auto w-28" />
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-soft"
                  : "text-muted hover:bg-background hover:text-ink"
              }`}
            >
              {isActive && (
                <span className="absolute right-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-gold" />
              )}
              <Icon active={isActive} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-light p-4 shadow-soft">
        <div className="text-xs font-medium text-white/70">إجمالي فكتك المدخرة</div>
        <div className="mt-1 text-xl font-extrabold text-gold-light">١,٨٥٦.٤٠ ر.س</div>
      </div>
    </aside>
  );
}
