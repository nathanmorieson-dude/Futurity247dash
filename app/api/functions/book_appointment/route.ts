import crypto from "node:crypto";
import {
  jsonOk,
  parseRetellRequest,
} from "@/lib/retell/route-helpers";
import {
  BookAppointmentRequest,
  type BookAppointmentArgsT,
} from "@/lib/retell/schemas";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const result = await parseRetellRequest(req, BookAppointmentRequest);
  if (!result.ok) return result.response;

  const { args, call } = result.data;

  const confirmation = env.retellLive
    ? await bookLive(args, call?.call_id)
    : mockBook(args, call?.call_id);

  const starts = new Date(args.starts_at);
  const timeLabel = starts.toLocaleString("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
  });

  return jsonOk({
    booked: true,
    confirmation_id: confirmation.id,
    message: `You're booked for ${timeLabel}. You'll get a text confirmation in just a moment.`,
  });
}

function mockBook(args: BookAppointmentArgsT, callId?: string) {
  const id = `appt_${crypto.randomBytes(5).toString("hex")}`;
  console.info("[mock] book_appointment", {
    confirmation_id: id,
    call_id: callId,
    caller: args.caller_name,
    phone: args.caller_phone,
    job: args.job_type,
    starts_at: args.starts_at,
  });
  return { id };
}

async function bookLive(args: BookAppointmentArgsT, callId?: string) {
  // TODO(live):
  //   1. Resolve client_id from call.to_number (our Twilio DID)
  //   2. Create Google Calendar event on that client's calendar
  //   3. Insert into leads table with external_job_id
  //   4. Send Twilio SMS confirmation to args.caller_phone
  //   5. If urgency === 'urgent' or estimated_value > hot_threshold, text the owner
  return mockBook(args, callId);
}
