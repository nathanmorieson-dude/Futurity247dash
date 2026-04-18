import type { Database } from "@/lib/supabase/database.types";

export type ClientRecord = Database["public"]["Tables"]["clients"]["Row"];
export type LeadRecord = Database["public"]["Tables"]["leads"]["Row"];
export type CallRecord = Database["public"]["Tables"]["calls"]["Row"];

export type MonthlyUsageRow = Database["public"]["Views"]["monthly_usage"]["Row"];
export type ClientRoiRow = Database["public"]["Views"]["client_roi"]["Row"];
