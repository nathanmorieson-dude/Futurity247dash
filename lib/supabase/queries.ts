import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { pricingPlans } from "@/lib/pricing";
import type { CallRecord, ClientRecord, LeadRecord } from "@/lib/supabase/types";

function toIsoDate(date: Date) {
  return date.toISOString();
}

export async function getAuthenticatedClientContext(): Promise<{
  session: { user: { id: string; email?: string | null } } | null;
  client: ClientRecord | null;
}> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { session: null, client: null };
  }

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("owner_user_id", session.user.id)
    .maybeSingle();

  return { session, client };
}

export async function getDashboardOverview(clientId: string) {
  const supabase = await createServerSupabaseClient();

  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());

  const [callsRes, leadsRes, roiRes, clientRes] = await Promise.all([
    supabase
      .from("calls")
      .select("id", { count: "exact", head: true })
      .eq("client_id", clientId)
      .gte("started_at", toIsoDate(monthStart))
      .lte("started_at", toIsoDate(monthEnd)),
    supabase
      .from("leads")
      .select("id, booking_status, lead_tier, estimated_value")
      .eq("client_id", clientId)
      .gte("created_at", toIsoDate(monthStart))
      .lte("created_at", toIsoDate(monthEnd)),
    supabase
      .from("client_roi")
      .select("monthly_fee, pipeline_value, roi_ratio")
      .eq("client_id", clientId)
      .order("roi_month", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from("clients").select("pricing_plan").eq("id", clientId).maybeSingle(),
  ]);

  const leads = leadsRes.data ?? [];
  const bookedJobs = leads.filter((lead) => lead.booking_status === "booked").length;
  const hotLeads = leads.filter((lead) => lead.lead_tier === "hot").length;
  const pipelineValue =
    roiRes.data?.pipeline_value ??
    leads.reduce((sum, lead) => sum + (lead.estimated_value ?? 0), 0);

  const plan = clientRes.data?.pricing_plan ?? "starter";
  const fallbackMonthlyFee = pricingPlans[plan].monthlyCents / 100;

  const monthlyFee = roiRes.data?.monthly_fee ?? fallbackMonthlyFee;
  const roiRatio = roiRes.data?.roi_ratio ?? (monthlyFee ? pipelineValue / monthlyFee : 0);

  return {
    callsThisMonth: callsRes.count ?? 0,
    bookedJobs,
    hotLeads,
    pipelineValue,
    monthlyFee,
    roiRatio,
  };
}

export async function getMonthlyUsageSeries(clientId: string) {
  const supabase = await createServerSupabaseClient();
  const sixMonthsAgo = subMonths(new Date(), 5);

  const { data } = await supabase
    .from("monthly_usage")
    .select("usage_month, total_minutes")
    .eq("client_id", clientId)
    .gte("usage_month", sixMonthsAgo.toISOString().slice(0, 10))
    .order("usage_month", { ascending: true });

  return (data ?? []).map((row) => ({
    month: new Date(row.usage_month).toLocaleString("en-US", { month: "short" }),
    minutes: row.total_minutes,
  }));
}

export async function getRecentCalls(clientId: string, limit: number): Promise<CallRecord[]> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("calls")
    .select("*")
    .eq("client_id", clientId)
    .order("started_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}

export async function getCallById(clientId: string, callId: string): Promise<CallRecord | null> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("calls")
    .select("*")
    .eq("client_id", clientId)
    .eq("id", callId)
    .maybeSingle();

  return data;
}

export async function getLeadPipeline(clientId: string, limit: number): Promise<LeadRecord[]> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("leads")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}
