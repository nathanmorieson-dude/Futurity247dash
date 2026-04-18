export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          owner_user_id: string;
          business_name: string;
          owner_name: string | null;
          owner_phone: string | null;
          owner_email: string | null;
          twilio_number: string | null;
          twilio_phone_number_sid: string | null;
          retell_agent_id: string | null;
          google_calendar_id: string | null;
          pricing_plan: "starter" | "pro" | "premium";
          service_call_fee: number | null;
          business_hours_start: string | null;
          business_hours_end: string | null;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_user_id: string;
          business_name: string;
          owner_name?: string | null;
          owner_phone?: string | null;
          owner_email?: string | null;
          twilio_number?: string | null;
          twilio_phone_number_sid?: string | null;
          retell_agent_id?: string | null;
          google_calendar_id?: string | null;
          pricing_plan?: "starter" | "pro" | "premium";
          service_call_fee?: number | null;
          business_hours_start?: string | null;
          business_hours_end?: string | null;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["clients"]["Insert"]>;
      };
      calls: {
        Row: {
          id: string;
          client_id: string;
          retell_call_id: string | null;
          caller_phone: string | null;
          transcript: string | null;
          summary: string | null;
          sentiment: string | null;
          outcome: string | null;
          duration_seconds: number | null;
          recording_url: string | null;
          started_at: string;
          ended_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          retell_call_id?: string | null;
          caller_phone?: string | null;
          transcript?: string | null;
          summary?: string | null;
          sentiment?: string | null;
          outcome?: string | null;
          duration_seconds?: number | null;
          recording_url?: string | null;
          started_at?: string;
          ended_at?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["calls"]["Insert"]>;
      };
      billing_events: {
        Row: {
          id: string;
          client_id: string;
          stripe_event_id: string;
          event_type: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          stripe_event_id: string;
          event_type: string;
          payload: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["billing_events"]["Insert"]>;
      };
      leads: {
        Row: {
          id: string;
          client_id: string;
          call_id: string | null;
          customer_name: string;
          customer_phone: string;
          customer_address: string | null;
          job_description: string | null;
          job_type: string;
          urgency: "low" | "medium" | "high" | "emergency";
          lead_tier: "hot" | "warm" | "cold" | null;
          estimated_value: number | null;
          booking_status: "new" | "booked" | "escalated" | "closed";
          appointment_start: string | null;
          appointment_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          call_id?: string | null;
          customer_name: string;
          customer_phone: string;
          customer_address?: string | null;
          job_description?: string | null;
          job_type: string;
          urgency?: "low" | "medium" | "high" | "emergency";
          lead_tier?: "hot" | "warm" | "cold" | null;
          estimated_value?: number | null;
          booking_status?: "new" | "booked" | "escalated" | "closed";
          appointment_start?: string | null;
          appointment_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
    };
    Views: {
      monthly_usage: {
        Row: {
          client_id: string;
          usage_month: string;
          total_minutes: number;
          total_calls: number;
        };
      };
      client_roi: {
        Row: {
          client_id: string;
          roi_month: string;
          monthly_fee: number;
          pipeline_value: number;
          roi_ratio: number;
        };
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
