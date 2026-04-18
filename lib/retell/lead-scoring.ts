import { estimateJobValue } from "@/lib/pricing";

export type LeadTier = "hot" | "warm" | "cold";

export function scoreLead({
  urgency,
  jobType,
  estimatedValue,
}: {
  urgency: "low" | "medium" | "high" | "emergency";
  jobType: string;
  estimatedValue?: number;
}) {
  const value = estimatedValue ?? estimateJobValue(jobType);

  if (urgency === "emergency") {
    return { tier: "hot" as LeadTier, value };
  }

  if (urgency === "high" || value >= 2000) {
    return { tier: "hot" as LeadTier, value };
  }

  if (urgency === "medium" || value >= 800) {
    return { tier: "warm" as LeadTier, value };
  }

  return { tier: "cold" as LeadTier, value };
}
