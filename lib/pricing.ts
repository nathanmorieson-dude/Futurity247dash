export type PlanId = "starter" | "pro" | "premium";

type PricingPlan = {
  id: PlanId;
  name: string;
  monthlyCents: number;
  includedMinutes: number;
  overageCentsPerMinute: number;
  target: string;
};

export const pricingPlans: Record<PlanId, PricingPlan & { monthlyLabel: string; overageLabel: string }> = {
  starter: {
    id: "starter",
    name: "Starter",
    monthlyCents: 29900,
    includedMinutes: 300,
    overageCentsPerMinute: 30,
    target: "Solo electrician",
    monthlyLabel: "$299/mo",
    overageLabel: "$0.30/min",
  },
  pro: {
    id: "pro",
    name: "Pro",
    monthlyCents: 49900,
    includedMinutes: 500,
    overageCentsPerMinute: 25,
    target: "2-5 trucks",
    monthlyLabel: "$499/mo",
    overageLabel: "$0.25/min",
  },
  premium: {
    id: "premium",
    name: "Premium",
    monthlyCents: 89900,
    includedMinutes: 1500,
    overageCentsPerMinute: 20,
    target: "5+ trucks, commercial",
    monthlyLabel: "$899/mo",
    overageLabel: "$0.20/min",
  },
};

export const pricingPlanList = Object.values(pricingPlans);

const jobValueByType: Record<string, number> = {
  service_call: 250,
  panel_upgrade: 3500,
  rewiring: 4800,
  lighting: 750,
  troubleshooting: 450,
  emergency: 1200,
};

export function estimateJobValue(jobType: string) {
  return jobValueByType[jobType] ?? 500;
}
