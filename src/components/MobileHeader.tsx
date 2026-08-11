"use client";

import { useState } from "react";
import Image from "next/image";
import { BANK_ACCOUNT } from "@/lib/mock-data";
import { BankIcon, MenuIcon } from "./icons";
import MobileDrawer from "./MobileDrawer";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-30 border-b border-black/5 bg-background/90 backdrop-blur-lg md:hidden"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setOpen(true)}
              aria-label="فتح القائمة"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-ink transition-colors active:scale-90 hover:bg-black/5"
            >
              <MenuIcon />
            </button>
            <Image src="/logo.png" alt="فكة" width={88} height={49} priority className="h-auto w-20" />
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-primary-light/10 px-3 py-1.5 text-xs font-semibold text-primary-light">
            <BankIcon />
            {BANK_ACCOUNT.status}
          </div>
        </div>
      </header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
