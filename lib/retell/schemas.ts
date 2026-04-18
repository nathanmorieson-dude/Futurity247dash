import { z } from "zod";

export const checkAvailabilitySchema = z.object({
  client_id: z.string().uuid(),
  job_type: z.string().min(2),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const bookAppointmentSchema = z.object({
  client_id: z.string().uuid(),
  call_id: z.string().optional(),
  customer_name: z.string().min(2),
  customer_phone: z.string().min(10),
  customer_address: z.string().optional(),
  job_type: z.string().min(2),
  job_description: z.string().optional(),
  urgency: z.enum(["low", "medium", "high", "emergency"]),
  appointment_start: z.string().datetime(),
  appointment_end: z.string().datetime(),
});

export const triageEmergencySchema = z.object({
  client_id: z.string().uuid(),
  call_id: z.string().optional(),
  caller_phone: z.string().min(10),
  summary: z.string().min(6),
  matched_keyword: z.string().optional(),
});

export const qualifyLeadSchema = z.object({
  client_id: z.string().uuid(),
  lead_id: z.string().uuid().optional(),
  customer_name: z.string().min(2),
  customer_phone: z.string().min(10),
  job_type: z.string().min(2),
  urgency: z.enum(["low", "medium", "high", "emergency"]),
  estimated_value: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export const callEndedSchema = z.object({
  call: z.object({
    id: z.string(),
    agent_id: z.string().optional(),
    from_number: z.string().optional(),
    to_number: z.string().optional(),
    transcript: z.string().optional(),
    summary: z.string().optional(),
    sentiment: z.string().optional(),
    disconnection_reason: z.string().optional(),
    duration_ms: z.number().optional(),
    recording_url: z.string().url().optional(),
    started_at: z.string().optional(),
    ended_at: z.string().optional(),
    metadata: z.record(z.string(), z.string()).optional(),
  }),
});
