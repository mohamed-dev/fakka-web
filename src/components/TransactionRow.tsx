import { Transaction, calcRoundUp, formatSAR } from "@/lib/types";
import MerchantLogo from "./MerchantLogo";

export default function TransactionRow({
  txn,
  showDate,
}: {
  txn: Transaction;
  showDate?: string;
}) {
  const roundUp = calcRoundUp(txn.amount);

  return (
    <div className="flex items-center gap-3 rounded-xl px-1.5 py-3.5 transition-colors hover:bg-background md:py-3">
      <MerchantLogo bg={txn.logoBg} text={txn.logoText} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-ink">{txn.merchantAr}</div>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <span>{txn.category}</span>
          {showDate && (
            <>
              <span>·</span>
              <span>{showDate}</span>
            </>
          )}
        </div>
      </div>
      <div className="text-left">
        <div className="text-sm font-semibold text-ink">{formatSAR(txn.amount)} ر.س</div>
        <div className="mt-0.5 inline-block rounded-full bg-gold/10 px-2 py-0.5 text-xs font-bold text-gold">
          +{formatSAR(roundUp)} فكة
        </div>
      </div>
    </div>
  );
}
