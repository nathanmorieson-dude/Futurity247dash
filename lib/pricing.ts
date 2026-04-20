import type { JobType, PricingPlan } from "./types";

export const PLANS: Record<
  PricingPlan,
  {
    id: PricingPlan;
    name: string;
    price: number;
    minutes: number;
    overage: number;
    target: string;
    features: string[];
  }
> = {
  pro: {
    id: "pro",
    name: "Pro",
    price: 499,
    minutes: 500,
    overage: 0.25,
    target: "Solo · up to 3 trucks",
    features: [
      "24/7 Billie answering",
      "Google Calendar booking",
      "SMS confirmations",
      "Emergency escalation",
      "Lead scoring + hot-lead alerts",
      "Up to 500 minutes / mo",
    ],
  },
  premium: {
    id: "premium",
    name: "Premium",
    price: 999,
    minutes: 1500,
    overage: 0.2,
    target: "4+ trucks · commercial",
    features: [
      "Everything in Pro",
      "Multi-tech routing",
      "Custom emergency keywords",
      "Commercial intake flow",
      "Service contract tagging",
      "Priority support",
      "Up to 1,500 minutes / mo",
    ],
  },
};

export const JOB_VALUE_ESTIMATES: Record<JobType, { low: number; high: number; label: string }> =
  {
    panel_upgrade: { low: 1800, high: 4200, label: "Panel upgrade" },
    ev_charger: { low: 900, high: 2400, label: "EV charger install" },
    outlet_repair: { low: 180, high: 450, label: "Outlet repair" },
    lighting: { low: 250, high: 1200, label: "Lighting" },
    wiring: { low: 600, high: 3500, label: "Wiring" },
    no_power: { low: 250, high: 1500, label: "No power / outage" },
    rewire: { low: 4500, high: 12000, label: "Whole-home rewire" },
    inspection: { low: 220, high: 480, label: "Safety inspection" },
    smoke_detector: { low: 180, high: 400, label: "Smoke detector" },
    generator: { low: 3500, high: 9500, label: "Generator install" },
    ceiling_fan: { low: 220, high: 520, label: "Ceiling fan" },
    other: { low: 250, high: 850, label: "Other" },
  };

export function planFromId(id: PricingPlan) {
  return PLANS[id];
}
