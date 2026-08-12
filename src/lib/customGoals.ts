import { CharityCauseId } from "./types";

export type CustomGoalTimeframe = "" | "week" | "month" | "3months" | "year";

export interface CustomGoal {
  id: string;
  causeId: CharityCauseId;
  unitCost: number;
  unitLabel: string;
  unitEmoji: string;
  targetCount: number;
  timeframe: CustomGoalTimeframe;
  createdAt: string;
}

const STORAGE_KEY = "fakka_custom_goals";

// Local-device-only persistence: custom goals live in this browser's
// localStorage only, scoped to this device/profile. There's no
// backend/account sync yet — that would need a real database once user
// accounts exist. Every access is wrapped in try/catch since localStorage
// can throw (e.g. private browsing, storage disabled), in which case we
// just fall back to in-memory state for the session instead of crashing.

export function loadCustomGoals(): CustomGoal[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomGoals(goals: CustomGoal[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch {
    // storage unavailable — goal stays in memory for this session only
  }
}

const TIMEFRAME_LABELS: Record<Exclude<CustomGoalTimeframe, "">, string> = {
  week: "أسبوع",
  month: "شهر",
  "3months": "٣ أشهر",
  year: "سنة",
};

export const TIMEFRAME_OPTIONS: Array<{ value: CustomGoalTimeframe; label: string }> = [
  { value: "", label: "بدون مدة محددة" },
  { value: "week", label: "خلال أسبوع" },
  { value: "month", label: "خلال شهر" },
  { value: "3months", label: "خلال ٣ أشهر" },
  { value: "year", label: "خلال سنة" },
];

export function customGoalTitle(goal: CustomGoal): string {
  const countLabel = goal.targetCount.toLocaleString("ar-SA");
  const timeframeSuffix = goal.timeframe ? ` خلال ${TIMEFRAME_LABELS[goal.timeframe]}` : "";
  return `${countLabel} ${goal.unitLabel}${timeframeSuffix}`;
}
