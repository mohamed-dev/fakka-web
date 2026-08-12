export type DestinationType = "zakat" | "goal" | "charity";

export interface Destination {
  id: DestinationType;
  label: string;
  icon: string;
}

export type TransactionCategory =
  | "طعام وشراب"
  | "بقالة"
  | "مواصلات"
  | "تسوق"
  | "ترفيه"
  | "فواتير";

export interface Transaction {
  id: string;
  merchant: string;
  merchantAr: string;
  category: TransactionCategory;
  date: string; // ISO date
  amount: number; // original amount, SAR
  logoBg: string;
  logoText: string;
}

export interface Subscription {
  id: string;
  merchant: string;
  category: TransactionCategory;
  amount: number;
  cadence: "شهري" | "أسبوعي" | "سنوي";
  lastCharge: string;
  occurrences: number;
}

export type CharityCauseId = "orphans" | "water" | "education" | "mosques";

export interface CharityCause {
  id: CharityCauseId;
  title: string;
  description: string;
  icon: string;
  // real, already-routed fakka amount for this cause (SAR) — 0 means the
  // user hasn't directed any round-ups here yet
  yourContribution: number;
  // real, community-wide accumulated total for this cause (SAR)
  totalCommunityRaised: number;
}

export interface ImpactUnit {
  cost: number;
  unit: string;
  emoji: string;
  // action sentence template with a {count} placeholder, e.g. "أطعمت {count} يتيمًا"
  sentence: string;
}

export const DESTINATIONS: Destination[] = [
  { id: "zakat", label: "زكاة", icon: "🕌" },
  { id: "goal", label: "هدف ادخار", icon: "🎯" },
  { id: "charity", label: "صدقة", icon: "🤲" },
];

// round up to next riyal, return the fakka (round-up) amount
export function calcRoundUp(amount: number): number {
  const rounded = Math.ceil(amount);
  const fakka = rounded - amount;
  return Math.round(fakka * 100) / 100;
}

export function formatSAR(amount: number, opts?: { decimals?: number }): string {
  const decimals = opts?.decimals ?? 2;
  return amount.toLocaleString("ar-SA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
