import { getServerEnv } from "@/lib/env";
import type { PlanId } from "@/lib/pricing";

export function getStripePriceIdForPlan(plan: PlanId) {
  const env = getServerEnv();

  if (plan === "starter") return env.STRIPE_PRICE_STARTER;
  if (plan === "pro") return env.STRIPE_PRICE_PRO;
  return env.STRIPE_PRICE_PREMIUM;
}
