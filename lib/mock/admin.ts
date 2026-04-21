import { PLANS } from "@/lib/pricing";
import type { PricingPlan } from "@/lib/types";

export type BillingStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "churned";

export type ChurnRisk = "low" | "medium" | "high";

export interface AdminClient {
  id: string;
  business_name: string;
  owner_name: string;
  owner_email: string;
  phone: string;
  suburb: string;
  plan: PricingPlan;
  status: BillingStatus;
  churn_risk: ChurnRisk;
  active_since: string;
  minutes_used_mtd: number;
  minutes_included: number;
  calls_mtd: number;
  bookings_mtd: number;
  pipeline_value_mtd: number;
  revenue_closed_mtd: number;
  emergencies_mtd: number;
  last_call_at?: string;
  retell_agent_id: string;
  stripe_customer_id: string;
  stripe_subscription_id?: string;
  next_invoice_amount: number;
  next_invoice_at: string;
  last_payment_amount?: number;
  last_payment_at?: string;
  last_payment_failed?: boolean;
}

const now = new Date("2026-04-20T17:32:00+10:00");

function iso(offsetDays: number) {
  return new Date(now.getTime() + offsetDays * 86_400_000).toISOString();
}

export const ADMIN_CLIENTS: AdminClient[] = [
  {
    id: "client_keystone",
    business_name: "Keystone Electrical",
    owner_name: "Marcus Reilly",
    owner_email: "marcus@keystoneelectrical.com.au",
    phone: "+61412550144",
    suburb: "Brisbane",
    plan: "pro",
    status: "active",
    churn_risk: "low",
    active_since: iso(-220),
    minutes_used_mtd: 312,
    minutes_included: PLANS.pro.minutes,
    calls_mtd: 184,
    bookings_mtd: 118,
    pipeline_value_mtd: 34820,
    revenue_closed_mtd: 23600,
    emergencies_mtd: 3,
    last_call_at: iso(-0.01),
    retell_agent_id: "agent_2f73f9fb424dda892460cedc60",
    stripe_customer_id: "cus_QyMxKeystone01",
    stripe_subscription_id: "sub_1RsXKeystone0001",
    next_invoice_amount: PLANS.pro.price,
    next_invoice_at: iso(11),
    last_payment_amount: PLANS.pro.price,
    last_payment_at: iso(-19),
  },
  {
    id: "client_brightspark",
    business_name: "Brightspark Electrical",
    owner_name: "Jess Palmer",
    owner_email: "jess@brightspark.com.au",
    phone: "+61432118090",
    suburb: "Newstead",
    plan: "premium",
    status: "active",
    churn_risk: "low",
    active_since: iso(-145),
    minutes_used_mtd: 1124,
    minutes_included: PLANS.premium.minutes,
    calls_mtd: 441,
    bookings_mtd: 284,
    pipeline_value_mtd: 112500,
    revenue_closed_mtd: 78400,
    emergencies_mtd: 8,
    last_call_at: iso(-0.04),
    retell_agent_id: "agent_93b3f7a1d5c8e90e7113fa21cd",
    stripe_customer_id: "cus_QyMxBrightspk02",
    stripe_subscription_id: "sub_1RsXBrightspk0002",
    next_invoice_amount: PLANS.premium.price,
    next_invoice_at: iso(6),
    last_payment_amount: PLANS.premium.price,
    last_payment_at: iso(-24),
  },
  {
    id: "client_reef_electrical",
    business_name: "Reef Coast Electrical",
    owner_name: "Dylan Ng",
    owner_email: "dylan@reefcoastelec.com.au",
    phone: "+61409441227",
    suburb: "Gold Coast",
    plan: "pro",
    status: "active",
    churn_risk: "medium",
    active_since: iso(-86),
    minutes_used_mtd: 468,
    minutes_included: PLANS.pro.minutes,
    calls_mtd: 231,
    bookings_mtd: 104,
    pipeline_value_mtd: 18200,
    revenue_closed_mtd: 9100,
    emergencies_mtd: 1,
    last_call_at: iso(-0.3),
    retell_agent_id: "agent_76be214f89a0bdd94d3fe2cc11",
    stripe_customer_id: "cus_QyMxReef03",
    stripe_subscription_id: "sub_1RsXReef0003",
    next_invoice_amount: PLANS.pro.price,
    next_invoice_at: iso(3),
    last_payment_amount: PLANS.pro.price,
    last_payment_at: iso(-27),
  },
  {
    id: "client_hillside",
    business_name: "Hillside Sparkies",
    owner_name: "Tom Pereira",
    owner_email: "tom@hillsidesparkies.com.au",
    phone: "+61418223340",
    suburb: "Chermside",
    plan: "pro",
    status: "past_due",
    churn_risk: "high",
    active_since: iso(-104),
    minutes_used_mtd: 142,
    minutes_included: PLANS.pro.minutes,
    calls_mtd: 71,
    bookings_mtd: 29,
    pipeline_value_mtd: 7400,
    revenue_closed_mtd: 3100,
    emergencies_mtd: 0,
    last_call_at: iso(-2.1),
    retell_agent_id: "agent_c59b3ea0477d8f1b221a9833bc",
    stripe_customer_id: "cus_QyMxHillside04",
    stripe_subscription_id: "sub_1RsXHillside0004",
    next_invoice_amount: PLANS.pro.price,
    next_invoice_at: iso(-2),
    last_payment_amount: PLANS.pro.price,
    last_payment_at: iso(-34),
    last_payment_failed: true,
  },
  {
    id: "client_lumen",
    business_name: "Lumen Commercial",
    owner_name: "Sam Okafor",
    owner_email: "sam@lumencommercial.com.au",
    phone: "+61422556677",
    suburb: "Fortitude Valley",
    plan: "premium",
    status: "active",
    churn_risk: "low",
    active_since: iso(-52),
    minutes_used_mtd: 863,
    minutes_included: PLANS.premium.minutes,
    calls_mtd: 318,
    bookings_mtd: 198,
    pipeline_value_mtd: 89200,
    revenue_closed_mtd: 41700,
    emergencies_mtd: 4,
    last_call_at: iso(-0.09),
    retell_agent_id: "agent_0d82f67caac4bb9f772119bde4",
    stripe_customer_id: "cus_QyMxLumen05",
    stripe_subscription_id: "sub_1RsXLumen0005",
    next_invoice_amount: PLANS.premium.price,
    next_invoice_at: iso(18),
    last_payment_amount: PLANS.premium.price,
    last_payment_at: iso(-12),
  },
  {
    id: "client_southside",
    business_name: "Southside Electrical Co",
    owner_name: "Priya Wardell",
    owner_email: "priya@southsideelec.com.au",
    phone: "+61403771229",
    suburb: "Mt Gravatt",
    plan: "pro",
    status: "trialing",
    churn_risk: "medium",
    active_since: iso(-9),
    minutes_used_mtd: 67,
    minutes_included: PLANS.pro.minutes,
    calls_mtd: 38,
    bookings_mtd: 12,
    pipeline_value_mtd: 4200,
    revenue_closed_mtd: 0,
    emergencies_mtd: 0,
    last_call_at: iso(-0.2),
    retell_agent_id: "agent_ae2ffb7641b61a23bff00bfd11",
    stripe_customer_id: "cus_QyMxSouth06",
    next_invoice_amount: PLANS.pro.price,
    next_invoice_at: iso(21),
  },
  {
    id: "client_ridgeline",
    business_name: "Ridgeline Power",
    owner_name: "Kate Ó Briain",
    owner_email: "kate@ridgelinepower.com.au",
    phone: "+61407882155",
    suburb: "Toowoomba",
    plan: "pro",
    status: "active",
    churn_risk: "low",
    active_since: iso(-188),
    minutes_used_mtd: 273,
    minutes_included: PLANS.pro.minutes,
    calls_mtd: 149,
    bookings_mtd: 93,
    pipeline_value_mtd: 24100,
    revenue_closed_mtd: 15400,
    emergencies_mtd: 2,
    last_call_at: iso(-0.05),
    retell_agent_id: "agent_b71205ec4392f4dd900ea4c521",
    stripe_customer_id: "cus_QyMxRidge07",
    stripe_subscription_id: "sub_1RsXRidge0007",
    next_invoice_amount: PLANS.pro.price,
    next_invoice_at: iso(9),
    last_payment_amount: PLANS.pro.price,
    last_payment_at: iso(-21),
  },
  {
    id: "client_greenline",
    business_name: "Greenline Trades",
    owner_name: "Josh Denholm",
    owner_email: "josh@greenlinetrades.com.au",
    phone: "+61413005590",
    suburb: "Sunshine Coast",
    plan: "pro",
    status: "churned",
    churn_risk: "high",
    active_since: iso(-310),
    minutes_used_mtd: 0,
    minutes_included: PLANS.pro.minutes,
    calls_mtd: 0,
    bookings_mtd: 0,
    pipeline_value_mtd: 0,
    revenue_closed_mtd: 0,
    emergencies_mtd: 0,
    last_call_at: iso(-42),
    retell_agent_id: "agent_dcf4e3c28116e99f44f7701885",
    stripe_customer_id: "cus_QyMxGreenline08",
    next_invoice_amount: 0,
    next_invoice_at: iso(365),
  },
];

export function portfolioTotals() {
  const paying = ADMIN_CLIENTS.filter(
    (c) => c.status === "active" || c.status === "past_due"
  );
  const trialing = ADMIN_CLIENTS.filter((c) => c.status === "trialing");
  const churned = ADMIN_CLIENTS.filter((c) => c.status === "churned");
  const mrr = paying.reduce((a, c) => a + PLANS[c.plan].price, 0);

  const overageMinutes = paying.reduce(
    (a, c) => a + Math.max(0, c.minutes_used_mtd - c.minutes_included),
    0
  );
  const overageRevenue = paying.reduce((a, c) => {
    const over = Math.max(0, c.minutes_used_mtd - c.minutes_included);
    return a + over * PLANS[c.plan].overage;
  }, 0);

  const pastDue = paying.filter((c) => c.status === "past_due");
  const highRisk = paying.filter((c) => c.churn_risk === "high");

  const callsMtd = ADMIN_CLIENTS.reduce((a, c) => a + c.calls_mtd, 0);
  const bookingsMtd = ADMIN_CLIENTS.reduce((a, c) => a + c.bookings_mtd, 0);
  const pipelineMtd = ADMIN_CLIENTS.reduce(
    (a, c) => a + c.pipeline_value_mtd,
    0
  );
  const revenueClosedMtd = ADMIN_CLIENTS.reduce(
    (a, c) => a + c.revenue_closed_mtd,
    0
  );

  return {
    activeCount: paying.length,
    trialingCount: trialing.length,
    churnedCount: churned.length,
    mrr,
    arr: mrr * 12,
    overageMinutes,
    overageRevenue,
    pastDue,
    highRisk,
    callsMtd,
    bookingsMtd,
    pipelineMtd,
    revenueClosedMtd,
  };
}

export function planDistribution() {
  const paying = ADMIN_CLIENTS.filter(
    (c) => c.status !== "churned" && c.status !== "trialing"
  );
  return {
    pro: paying.filter((c) => c.plan === "pro").length,
    premium: paying.filter((c) => c.plan === "premium").length,
  };
}

export function mrrTrend() {
  const pts: { month: string; mrr: number; clients: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    const label = d.toLocaleString("en-AU", { month: "short" });
    const seed = (i * 9301 + 49297) % 233280;
    const rand = (n: number) =>
      Math.floor(((Math.sin(seed * (n + 1)) + 1) / 2) * 1000) / 1000;
    const base = 600 + (11 - i) * 380;
    const noise = rand(1) * 200;
    const mrr = Math.round(base + noise);
    const clients = Math.max(1, Math.round(mrr / 520));
    pts.push({ month: label, mrr, clients });
  }
  const current = portfolioTotals();
  pts[pts.length - 1].mrr = current.mrr;
  pts[pts.length - 1].clients = current.activeCount + current.trialingCount;
  return pts;
}

export function failedPayments() {
  return ADMIN_CLIENTS.filter(
    (c) => c.status === "past_due" || c.last_payment_failed
  );
}

export function upcomingInvoices() {
  return ADMIN_CLIENTS.filter(
    (c) => c.status === "active" || c.status === "trialing"
  )
    .map((c) => ({
      client: c,
      amount: c.next_invoice_amount,
      date: c.next_invoice_at,
    }))
    .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
}

export function getAdminClient(id: string) {
  return ADMIN_CLIENTS.find((c) => c.id === id);
}
