import { IMPACT_UNITS, formatImpactSentence } from "@/lib/mock-data";
import { CharityCauseId, formatSAR } from "@/lib/types";

export default function ImpactTierGrid({
  causeId,
  contribution,
}: {
  causeId: CharityCauseId;
  contribution: number;
}) {
  const units = IMPACT_UNITS[causeId];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {units.map((unit) => {
        const count = Math.floor(contribution / unit.cost);
        const achieved = count >= 1;
        return (
          <div
            key={unit.unit}
            className={`flex flex-col items-center gap-1.5 rounded-2xl p-4 text-center transition-transform duration-200 ${
              achieved ? "bg-gold/10 hover:-translate-y-0.5" : "bg-background opacity-60"
            }`}
          >
            <span className="text-2xl">{unit.emoji}</span>
            {achieved ? (
              <span className="text-xs font-semibold leading-snug text-ink">
                {formatImpactSentence(unit, count)}
              </span>
            ) : (
              <>
                <span className="text-xs font-medium text-muted">{unit.unit}</span>
                <span className="text-[11px] font-semibold text-muted">
                  يحتاج {formatSAR(unit.cost - contribution, { decimals: 2 })} ر.س
                </span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
