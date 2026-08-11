"use client";

import Link from "next/link";
import { useEffect } from "react";
import { SettingsIcon, CloseIcon } from "./icons";

// Extend this list to add more drawer links later (About, legal, etc.)
const DRAWER_LINKS = [{ href: "/settings", label: "الإعدادات", icon: SettingsIcon }];

export default function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute inset-y-0 right-0 flex w-72 max-w-[80%] flex-col bg-card shadow-elevated transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <span className="text-base font-extrabold text-ink">القائمة</span>
          <button
            onClick={onClose}
            aria-label="إغلاق القائمة"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-background active:scale-90"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4">
          {DRAWER_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-ink transition-all duration-150 hover:bg-background active:scale-[0.98]"
              >
                <Icon active={false} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
