export type PricingPlan = "starter" | "pro" | "premium";

export type Urgency = "emergency" | "urgent" | "standard" | "informational";

export type LeadTemperature = "hot" | "warm" | "cold";

export type LeadStatus =
  | "new"
  | "qualified"
  | "booked"
  | "completed"
  | "lost";

export type CallOutcome =
  | "booked"
  | "escalated"
  | "messaged"
  | "qualified"
  | "spam"
  | "missed";

export type JobType =
  | "panel_upgrade"
  | "ev_charger"
  | "outlet_repair"
  | "lighting"
  | "wiring"
  | "no_power"
  | "rewire"
  | "inspection"
  | "smoke_detector"
  | "generator"
  | "ceiling_fan"
  | "other";

export interface Client {
  id: string;
  business_name: string;
  owner_name: string;
  plan: PricingPlan;
  phone_number: string;
  twilio_number: string;
  city: string;
  state: string;
  monthly_fee: number;
  included_minutes: number;
  overage_rate: number;
  active_since: string;
}

export interface Lead {
  id: string;
  client_id: string;
  caller_name: string;
  caller_phone: string;
  job_type: JobType;
  job_description: string;
  urgency: Urgency;
  temperature: LeadTemperature;
  status: LeadStatus;
  estimated_value: number;
  amount_closed: number;
  scheduled_for?: string;
  address?: string;
  created_at: string;
}

export interface Call {
  id: string;
  client_id: string;
  caller_phone: string;
  caller_name?: string;
  duration_seconds: number;
  outcome: CallOutcome;
  urgency: Urgency;
  job_type?: JobType;
  summary: string;
  transcript: TranscriptTurn[];
  sentiment: "positive" | "neutral" | "negative";
  recording_url?: string;
  estimated_value?: number;
  lead_id?: string;
  started_at: string;
}

export interface TranscriptTurn {
  speaker: "billie" | "caller";
  text: string;
  ts_seconds: number;
}

export interface DailyMetric {
  date: string;
  calls: number;
  booked: number;
  emergencies: number;
  pipeline_value: number;
  minutes: number;
}
