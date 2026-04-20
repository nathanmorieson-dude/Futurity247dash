import { JOB_VALUE_ESTIMATES } from "@/lib/pricing";
import type { JobType, LeadTemperature, Urgency } from "@/lib/types";

/**
 * Heuristic scoring for leads Billie hands us. Three signals:
 *   1. Job type (panel upgrades / rewires / generators skew hot, ceiling fans skew cold)
 *   2. Urgency (emergency/urgent always at least warm)
 *   3. Homeowner + short timeline → hot
 *
 * Returns a temperature plus a mid-range estimated ticket value computed
 * from JOB_VALUE_ESTIMATES. The owner gets a push alert when temperature
 * is "hot".
 */

const HIGH_TICKET_JOBS = new Set<JobType>([
  "panel_upgrade",
  "rewire",
  "generator",
  "ev_charger",
]);

const LOW_TICKET_JOBS = new Set<JobType>([
  "ceiling_fan",
  "smoke_detector",
  "outlet_repair",
]);

const URGENT_TIMELINE_WORDS = [
  "today",
  "now",
  "right now",
  "tonight",
  "asap",
  "this week",
  "tomorrow",
  "immediately",
];

export function scoreLead({
  jobType,
  urgency,
  homeowner,
  timeline,
}: {
  jobType: JobType;
  urgency: Urgency;
  homeowner?: boolean;
  timeline?: string;
}): { temperature: LeadTemperature; estimatedValue: number } {
  const meta = JOB_VALUE_ESTIMATES[jobType];
  const estimatedValue = Math.round((meta.low + meta.high) / 2);

  if (urgency === "emergency") {
    return { temperature: "hot", estimatedValue };
  }

  let score = 0;

  if (HIGH_TICKET_JOBS.has(jobType)) score += 2;
  if (LOW_TICKET_JOBS.has(jobType)) score -= 1;

  if (urgency === "urgent") score += 2;
  if (urgency === "standard") score += 0;
  if (urgency === "informational") score -= 2;

  if (homeowner) score += 1;

  if (timeline) {
    const t = timeline.toLowerCase();
    if (URGENT_TIMELINE_WORDS.some((w) => t.includes(w))) score += 1;
    if (t.includes("just shopping") || t.includes("getting quotes")) score -= 2;
  }

  let temperature: LeadTemperature;
  if (score >= 3) temperature = "hot";
  else if (score >= 1) temperature = "warm";
  else temperature = "cold";

  return { temperature, estimatedValue };
}
