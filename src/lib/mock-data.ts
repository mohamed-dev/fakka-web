import { Transaction, Subscription, CharityCause, CharityCauseId, ImpactUnit, calcRoundUp } from "./types";

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
  goal: { balance: 1240.0, target: 4500.0, note: "نحو هدف الادخار" },
  charity: { balance: 741.0, target: 2000.0, note: "صدقة جارية هذا الشهر" },
};

// ---- Charity impact (charity destination) ----
// yourContribution values sum to DESTINATION_BALANCES.charity.balance (741),
// keeping the per-cause split consistent with the home jar total.
export const CHARITY_CAUSES: CharityCause[] = [
  {
    id: "hajj_umrah",
    title: "دفع تكلفة حج أو عمرة لمحتاج",
    description: "المساهمة في تغطية تكاليف رحلة حج أو عمرة لمن لا يستطيع تحمّل تكلفتها",
    icon: "🕋",
    yourContribution: 650,
    totalCommunityRaised: 142300,
  },
  {
    id: "water",
    title: "١٠٠ زجاجة سقيا ماء",
    description: "توفير مياه شرب نظيفة للمحتاجين في المناطق الأكثر فقراً",
    icon: "💧",
    yourContribution: 26.0,
    totalCommunityRaised: 96210,
  },
  {
    id: "feeding",
    title: "٣٠ إطعام مسكين",
    description: "توفير وجبات طعام للمحتاجين والمساكين في الأحياء الأكثر احتياجًا",
    icon: "🍚",
    yourContribution: 65,
    totalCommunityRaised: 88420,
  },
  {
    id: "sadaqah_jariyah",
    title: "١٥ صدقة جارية",
    description: "دعم مشاريع خيرية دائمة الأثر مثل زراعة الأشجار ونشر المصاحف والوقف الخيري",
    icon: "🌳",
    yourContribution: 0,
    totalCommunityRaised: 71900,
  },
  {
    id: "medical",
    title: "٣٠ حالة علاج لغير القادرين",
    description: "المساهمة في تغطية تكاليف العلاج الطبي والعمليات الجراحية للمرضى غير القادرين",
    icon: "⚕️",
    yourContribution: 0,
    totalCommunityRaised: 105600,
  },
];

// shared default cause selection for /goal's cause picker and the home
// page's هدف ادخاري tab, so both agree on which cause to show by default
export const DEFAULT_CAUSE_ID: CharityCauseId = "hajj_umrah";

export const IMPACT_UNITS: Record<CharityCauseId, ImpactUnit[]> = {
  hajj_umrah: [
    { cost: 100, unit: "مساهمة في تكاليف التنقل", emoji: "🚌", sentence: "ساهمت بـ {count} في تكاليف تنقل معتمر" },
    { cost: 500, unit: "مساهمة في تذكرة الطيران", emoji: "✈️", sentence: "وفّرت {count} مساهمة في تذكرة طيران معتمر" },
    { cost: 1500, unit: "نصف تكلفة رحلة عمرة", emoji: "🕋", sentence: "غطّيت {count} من نصف تكلفة رحلة عمرة" },
    { cost: 3500, unit: "تكلفة رحلة عمرة كاملة", emoji: "🕌", sentence: "غطّيت {count} تكلفة رحلة عمرة كاملة لمحتاج" },
  ],
  water: [
    { cost: 4.5, unit: "زجاجة سقيا ماء", emoji: "💧", sentence: "وفّرت {count} زجاجة سقيا ماء" },
    { cost: 15, unit: "يوم ماء لعائلة", emoji: "🚰", sentence: "وفّرت مياه نظيفة لـ {count} يوم لعائلة" },
    { cost: 45, unit: "شهر ماء لأسرة", emoji: "💦", sentence: "وفّرت مياه نظيفة لأسرة لمدة {count} شهر" },
    { cost: 150, unit: "مساهمة في حفر بئر", emoji: "⛏️", sentence: "ساهمت في حفر {count} بئر" },
  ],
  feeding: [
    { cost: 15, unit: "وجبة إطعام لمسكين", emoji: "🍚", sentence: "أطعمت {count} مسكينًا" },
    { cost: 50, unit: "سلة غذائية", emoji: "🧺", sentence: "وفّرت {count} سلة غذائية لأسرة محتاجة" },
    { cost: 100, unit: "إطعام مسكين لأسبوع", emoji: "📅", sentence: "أطعمت مسكينًا لمدة {count} أسبوع" },
    { cost: 300, unit: "إطعام مسكين لشهر كامل", emoji: "🗓️", sentence: "أطعمت مسكينًا لمدة {count} شهر" },
  ],
  sadaqah_jariyah: [
    { cost: 10, unit: "غرسة شجرة صدقة جارية", emoji: "🌱", sentence: "غرست {count} شجرة صدقة جارية" },
    { cost: 30, unit: "نسخة مصحف صدقة جارية", emoji: "📖", sentence: "أهديت {count} مصحف صدقة جارية" },
    { cost: 100, unit: "سهم في وقف خيري", emoji: "🕌", sentence: "ساهمت بـ {count} سهم في وقف خيري" },
    { cost: 500, unit: "مشروع صدقة جارية كامل", emoji: "🌳", sentence: "أوقفت {count} مشروع صدقة جارية دائم الأثر" },
  ],
  medical: [
    { cost: 30, unit: "جلسة علاج طبيعي", emoji: "💊", sentence: "وفّرت {count} جلسة علاج لمريض" },
    { cost: 150, unit: "كشفية طبيب مختص", emoji: "🩺", sentence: "غطّيت {count} كشفية طبيب لمريض" },
    { cost: 600, unit: "تكلفة أدوية شهرية لمريض", emoji: "💉", sentence: "وفّرت {count} علاج أدوية شهري لمريض" },
    { cost: 2500, unit: "مساهمة في تكلفة عملية جراحية", emoji: "⚕️", sentence: "ساهمت بـ {count} في تكلفة عملية جراحية" },
  ],
};

// picks the highest-cost tier the contribution actually reaches (not the
// cheapest tier), so e.g. a large hajj_umrah contribution reads as a
// flight-ticket contribution rather than the smallest transport unit
export function highestAchievedImpact(
  causeId: CharityCauseId,
  contribution: number
): { unit: ImpactUnit; count: number } | null {
  const tiers = IMPACT_UNITS[causeId];
  for (let i = tiers.length - 1; i >= 0; i--) {
    const count = Math.floor(contribution / tiers[i].cost);
    if (count >= 1) return { unit: tiers[i], count };
  }
  return null;
}

export function formatImpactSentence(unit: ImpactUnit, count: number): string {
  return unit.sentence.replace("{count}", count.toLocaleString("ar-SA"));
}

// cheapest tier not yet reached (ascending cost order), plus how much more
// is needed to unlock it — null once every tier is achieved
export function nextUnachievedImpact(
  causeId: CharityCauseId,
  contribution: number
): { unit: ImpactUnit; amountNeeded: number } | null {
  const tiers = IMPACT_UNITS[causeId];
  const next = tiers.find((t) => Math.floor(contribution / t.cost) < 1);
  if (!next) return null;
  return { unit: next, amountNeeded: Math.max(0, next.cost - contribution) };
}

// per-cause, per-month breakdown of yourContribution — amounts sum to each
// cause's CHARITY_CAUSES.yourContribution total
export const IMPACT_MONTHLY_HISTORY: Array<{ month: string; causeId: CharityCauseId; amount: number }> = [
  { month: "2026-05", causeId: "hajj_umrah", amount: 150.0 },
  { month: "2026-06", causeId: "hajj_umrah", amount: 150.0 },
  { month: "2026-06", causeId: "water", amount: 8.0 },
  { month: "2026-07", causeId: "hajj_umrah", amount: 200.0 },
  { month: "2026-07", causeId: "water", amount: 12.0 },
  { month: "2026-08", causeId: "hajj_umrah", amount: 150.0 },
  { month: "2026-08", causeId: "water", amount: 6.0 },
];

export function groupImpactHistoryByMonth() {
  const map = new Map<string, Array<{ causeId: CharityCauseId; amount: number }>>();
  for (const entry of IMPACT_MONTHLY_HISTORY) {
    if (!map.has(entry.month)) map.set(entry.month, []);
    map.get(entry.month)!.push({ causeId: entry.causeId, amount: entry.amount });
  }
  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([month, entries]) => ({
      month,
      entries,
      total: entries.reduce((s, e) => s + e.amount, 0),
    }));
}

export function formatImpactMonthLabel(month: string): string {
  return new Date(`${month}-01`).toLocaleDateString("ar-SA-u-ca-gregory", {
    month: "long",
    year: "numeric",
  });
}

// ---- Bank connection mock state ----
export const BANK_ACCOUNT = {
  bankName: "مصرف الراجحي",
  bankNameEn: "Al Rajhi Bank",
  accountMasked: "**** **** **** 4821",
  accountType: "حساب جاري",
  connectedDate: "2026-05-12",
  status: "متصل",
};
