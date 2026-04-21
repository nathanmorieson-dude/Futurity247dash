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
    panel_upgrade: { low: 2600, high: 6500, label: "Switchboard upgrade" },
    ev_charger: { low: 1400, high: 3600, label: "EV charger install" },
    outlet_repair: { low: 280, high: 680, label: "Powerpoint repair" },
    lighting: { low: 380, high: 1800, label: "Lighting" },
    wiring: { low: 900, high: 5200, label: "Cabling / circuits" },
    no_power: { low: 380, high: 2200, label: "No power / outage" },
    rewire: { low: 7500, high: 22000, label: "Whole-home rewire" },
    inspection: { low: 320, high: 720, label: "Safety inspection" },
    smoke_detector: { low: 260, high: 620, label: "Smoke alarm" },
    generator: { low: 5200, high: 14000, label: "Backup generator" },
    ceiling_fan: { low: 320, high: 780, label: "Ceiling fan" },
    other: { low: 380, high: 1250, label: "Other" },
  };

export function planFromId(id: PricingPlan) {
  return PLANS[id];
}
