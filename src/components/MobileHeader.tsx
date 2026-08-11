import { BANK_ACCOUNT } from "@/lib/mock-data";
import { BankIcon } from "./icons";

export default function MobileHeader() {
  return (
    <header
      className="sticky top-0 z-30 border-b border-black/5 bg-background/90 backdrop-blur-lg md:hidden"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-gold shadow-card">
            ف
          </div>
          <span className="text-base font-extrabold text-ink">فكة</span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-primary-light/10 px-3 py-1.5 text-xs font-semibold text-primary-light">
          <BankIcon />
          {BANK_ACCOUNT.status}
        </div>
      </div>
    </header>
  );
}
