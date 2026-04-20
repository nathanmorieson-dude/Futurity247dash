import { z } from "zod";

/**
 * Retell wraps every function-call invocation with metadata about the current
 * call, plus the arguments Billie extracted from the caller. Shape matches
 * Retell's custom-function protocol:
 *
 *   {
 *     "name": "book_appointment",
 *     "args": { ... },
 *     "call": { "call_id": "...", "from_number": "+1...", "to_number": "+1..." }
 *   }
 */
const callContext = z.object({
  call_id: z.string(),
  from_number: z.string().optional(),
  to_number: z.string().optional(),
  agent_id: z.string().optional(),
});

function functionEnvelope<T extends z.ZodTypeAny>(name: string, args: T) {
  return z.object({
    name: z.literal(name),
    args: args,
    call: callContext.optional(),
  });
}

export const JOB_TYPE_VALUES = [
  "panel_upgrade",
  "ev_charger",
  "outlet_repair",
  "lighting",
  "wiring",
  "no_power",
  "rewire",
  "inspection",
  "smoke_detector",
  "generator",
  "ceiling_fan",
  "other",
] as const;

export const JobTypeSchema = z.enum(JOB_TYPE_VALUES);

export const UrgencySchema = z.enum([
  "emergency",
  "urgent",
  "standard",
  "informational",
]);

// check_availability
export const CheckAvailabilityArgs = z.object({
  job_type: JobTypeSchema,
  preferred_date: z
    .string()
    .describe("YYYY-MM-DD or natural language like 'tomorrow'")
    .optional(),
  urgency: UrgencySchema.default("standard"),
});

export const CheckAvailabilityRequest = functionEnvelope(
  "check_availability",
  CheckAvailabilityArgs
);

export const CheckAvailabilityResponse = z.object({
  slots: z
    .array(
      z.object({
        starts_at: z.string(),
        ends_at: z.string(),
        label: z.string(),
      })
    )
    .min(0)
    .max(5),
  message: z.string(),
});

// book_appointment
export const BookAppointmentArgs = z.object({
  caller_name: z.string().min(1).max(120),
  caller_phone: z.string().min(7).max(25),
  job_type: JobTypeSchema,
  job_description: z.string().min(1).max(2000),
  urgency: UrgencySchema.default("standard"),
  address: z.string().max(240).optional(),
  starts_at: z.string().describe("ISO 8601 timestamp of the booked slot"),
});

export const BookAppointmentRequest = functionEnvelope(
  "book_appointment",
  BookAppointmentArgs
);

export const BookAppointmentResponse = z.object({
  booked: z.boolean(),
  confirmation_id: z.string(),
  message: z.string(),
});

// triage_emergency
export const TriageEmergencyArgs = z.object({
  caller_name: z.string().min(1).max(120).optional(),
  caller_phone: z.string().min(7).max(25),
  address: z.string().max(240).optional(),
  keywords_matched: z.array(z.string()).default([]),
  description: z.string().max(2000),
});

export const TriageEmergencyRequest = functionEnvelope(
  "triage_emergency",
  TriageEmergencyArgs
);

export const TriageEmergencyResponse = z.object({
  owner_alerted: z.boolean(),
  safety_instructions: z.array(z.string()),
  message: z.string(),
});

// qualify_lead
export const QualifyLeadArgs = z.object({
  caller_name: z.string().min(1).max(120).optional(),
  caller_phone: z.string().min(7).max(25),
  job_type: JobTypeSchema,
  job_description: z.string().min(1).max(2000),
  urgency: UrgencySchema.default("standard"),
  timeline_mentioned: z.string().max(120).optional(),
  homeowner: z.boolean().optional(),
});

export const QualifyLeadRequest = functionEnvelope(
  "qualify_lead",
  QualifyLeadArgs
);

export const QualifyLeadResponse = z.object({
  temperature: z.enum(["hot", "warm", "cold"]),
  estimated_value: z.number(),
  alert_owner: z.boolean(),
  message: z.string(),
});

// Post-call webhook (call_ended)
export const CallEndedWebhook = z.object({
  event: z.literal("call_ended"),
  call: z.object({
    call_id: z.string(),
    agent_id: z.string().optional(),
    from_number: z.string().optional(),
    to_number: z.string().optional(),
    start_timestamp: z.number().optional(),
    end_timestamp: z.number().optional(),
    duration_ms: z.number().optional(),
    transcript: z.string().optional(),
    transcript_object: z
      .array(
        z.object({
          role: z.enum(["agent", "user", "tool_call_invocation", "tool_call_result"]),
          content: z.string().optional(),
        })
      )
      .optional(),
    recording_url: z.string().url().optional(),
    call_analysis: z
      .object({
        call_summary: z.string().optional(),
        user_sentiment: z.enum(["positive", "neutral", "negative"]).optional(),
        call_successful: z.boolean().optional(),
        custom_analysis_data: z.record(z.unknown()).optional(),
      })
      .optional(),
  }),
});

export type CheckAvailabilityArgsT = z.infer<typeof CheckAvailabilityArgs>;
export type BookAppointmentArgsT = z.infer<typeof BookAppointmentArgs>;
export type TriageEmergencyArgsT = z.infer<typeof TriageEmergencyArgs>;
export type QualifyLeadArgsT = z.infer<typeof QualifyLeadArgs>;
export type CallEndedWebhookT = z.infer<typeof CallEndedWebhook>;
