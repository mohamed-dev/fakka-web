import { nextUnachievedImpact } from "@/lib/mock-data";
import { CharityCause, formatSAR } from "@/lib/types";
import ImpactTierGrid from "./ImpactTierGrid";

export default function CauseImpactPanel({ cause }: { cause: CharityCause }) {
  const next = nextUnachievedImpact(cause.id, cause.yourContribution);

  return (
    <div className="flex flex-col gap-5">
      {next ? (
        <div className="flex items-center gap-2 rounded-xl bg-gold/10 px-4 py-2.5 text-sm font-semibold text-gold">
          <span>🎯</span>
          باقي لك {formatSAR(next.amountNeeded, { decimals: 2 })} ر.س عشان توصل لـ: {next.unit.unit}
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl bg-gold/10 px-4 py-2.5 text-sm font-semibold text-gold">
          <span>🏆</span>
          حققت أعلى مستوى أثر لهذه الجهة، رائع منك! 🎉
        </div>
      )}

      <ImpactTierGrid causeId={cause.id} contribution={cause.yourContribution} />
    </div>
  );
}
