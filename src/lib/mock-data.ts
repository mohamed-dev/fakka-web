import { Transaction, Subscription, SavingsGoal, calcRoundUp } from "./types";

// raw transaction seed: merchant, category, date, amount
const RAW: Array<[string, Transaction["category"], string, number, string, string]> = [
  ["Starbucks", "طعام وشراب", "2026-08-10", 27.5, "#00704A", "S"],
  ["Panda", "بقالة", "2026-08-10", 143.25, "#E4002B", "P"],
  ["Uber", "مواصلات", "2026-08-09", 34.9, "#000000", "U"],
  ["HungerStation", "طعام وشراب", "2026-08-09", 68.75, "#FF6600", "H"],
  ["Jarir", "تسوق", "2026-08-08", 219.0, "#0056A3", "ج"],
  ["Starbucks", "طعام وشراب", "2026-08-08", 19.0, "#00704A", "S"],
  ["STC", "فواتير", "2026-08-07", 199.0, "#7B1FA2", "STC"],
  ["Panda", "بقالة", "2026-08-07", 87.6, "#E4002B", "P"],
  ["Careem", "مواصلات", "2026-08-06", 22.35, "#5AC8AF", "C"],
  ["Netflix", "ترفيه", "2026-08-06", 45.0, "#E50914", "N"],
  ["HungerStation", "طعام وشراب", "2026-08-05", 52.4, "#FF6600", "H"],
  ["Extra", "تسوق", "2026-08-05", 356.9, "#004C97", "E"],
  ["Starbucks", "طعام وشراب", "2026-08-04", 31.75, "#00704A", "S"],
  ["Danube", "بقالة", "2026-08-04", 176.15, "#00A651", "د"],
  ["Uber", "مواصلات", "2026-08-03", 41.2, "#000000", "U"],
  ["Al Rajhi Bank", "فواتير", "2026-08-03", 15.0, "#00693E", "AR"],
  ["Jarir", "تسوق", "2026-08-02", 89.5, "#0056A3", "ج"],
  ["Panda", "بقالة", "2026-08-02", 64.35, "#E4002B", "P"],
  ["Spotify", "ترفيه", "2026-08-01", 21.0, "#1DB954", "SP"],
  ["Starbucks", "طعام وشراب", "2026-08-01", 24.5, "#00704A", "S"],
  ["HungerStation", "طعام وشراب", "2026-07-31", 45.9, "#FF6600", "H"],
  ["Careem", "مواصلات", "2026-07-31", 18.75, "#5AC8AF", "C"],
  ["Panda", "بقالة", "2026-07-30", 112.4, "#E4002B", "P"],
  ["Jarir", "تسوق", "2026-07-30", 47.25, "#0056A3", "ج"],
  ["Netflix", "ترفيه", "2026-07-06", 45.0, "#E50914", "N"],
  ["STC", "فواتير", "2026-07-07", 199.0, "#7B1FA2", "STC"],
  ["Spotify", "ترفيه", "2026-07-01", 21.0, "#1DB954", "SP"],
];

export const TRANSACTIONS: Transaction[] = RAW.map(
  ([merchant, category, date, amount, logoBg, logoText], i) => ({
    id: `txn_${i + 1}`,
    merchant,
    merchantAr: merchant,
    category,
    date,
    amount,
    logoBg,
    logoText,
  })
);

export const SUBSCRIPTIONS: Subscription[] = [
  {
    id: "sub_1",
    merchant: "Netflix",
    category: "ترفيه",
    amount: 45.0,
    cadence: "شهري",
    lastCharge: "2026-08-06",
    occurrences: 6,
  },
  {
    id: "sub_2",
    merchant: "STC",
    category: "فواتير",
    amount: 199.0,
    cadence: "شهري",
    lastCharge: "2026-08-07",
    occurrences: 8,
  },
  {
    id: "sub_3",
    merchant: "Spotify",
    category: "ترفيه",
    amount: 21.0,
    cadence: "شهري",
    lastCharge: "2026-08-01",
    occurrences: 5,
  },
];

export const SAVINGS_GOALS: SavingsGoal[] = [
  { id: "umrah", title: "عمرة", icon: "🕋", targetAmount: 3500, currentAmount: 890, color: "#163527" },
  { id: "phone", title: "جوال جديد", icon: "📱", targetAmount: 4500, currentAmount: 1240, color: "#C6963C" },
  { id: "aqiqah", title: "عقيقة", icon: "🐑", targetAmount: 1800, currentAmount: 620, color: "#25503B" },
  { id: "emergency", title: "صندوق طوارئ", icon: "🛟", targetAmount: 10000, currentAmount: 2350, color: "#6C7568" },
];

export function totalRoundUpFor(txns: Transaction[]): number {
  return txns.reduce((sum, t) => sum + calcRoundUp(t.amount), 0);
}

export function weeklyRoundUp(): number {
  const cutoff = new Date("2026-08-10");
  cutoff.setDate(cutoff.getDate() - 7);
  const weekTxns = TRANSACTIONS.filter((t) => new Date(t.date) >= cutoff);
  return totalRoundUpFor(weekTxns);
}

export function monthlyRoundUp(): number {
  const monthTxns = TRANSACTIONS.filter((t) => t.date.startsWith("2026-08"));
  return totalRoundUpFor(monthTxns);
}

export function groupByDate(txns: Transaction[]): Array<{ date: string; items: Transaction[] }> {
  const map = new Map<string, Transaction[]>();
  for (const t of txns) {
    if (!map.has(t.date)) map.set(t.date, []);
    map.get(t.date)!.push(t);
  }
  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([date, items]) => ({ date, items }));
}

export function formatArabicDate(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date("2026-08-10");
  const yesterday = new Date("2026-08-09");
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  if (isSameDay(d, today)) return "اليوم";
  if (isSameDay(d, yesterday)) return "أمس";

  return d.toLocaleDateString("ar-SA-u-ca-gregory", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ---- Zakat mock state ----
export const ZAKAT_STATE = {
  eligibleBalance: 24680.5,
  nisabThreshold: 17595.0, // ~85g gold equivalent, mock value in SAR
  hawlStartDate: "2025-11-15",
  hawlEndDate: "2026-11-15",
  zakatDue: 617.01, // 2.5% of eligible balance
  savedTowardZakat: 342.75,
};

// ---- Per-destination jar balances (home page) ----
export const DESTINATION_BALANCES: Record<"zakat" | "goal" | "charity", { balance: number; target: number; note: string }> = {
  zakat: { balance: 342.75, target: 617.01, note: "نحو استحقاق الزكاة القادم" },
  goal: { balance: 1240.0, target: 4500.0, note: "نحو هدف: جوال جديد" },
  charity: { balance: 428.9, target: 1000.0, note: "صدقة جارية هذا الشهر" },
};

// ---- Bank connection mock state ----
export const BANK_ACCOUNT = {
  bankName: "مصرف الراجحي",
  bankNameEn: "Al Rajhi Bank",
  accountMasked: "**** **** **** 4821",
  accountType: "حساب جاري",
  connectedDate: "2026-05-12",
  status: "متصل",
};
