import {
  jsonOk,
  parseRetellRequest,
} from "@/lib/retell/route-helpers";
import { CallEndedWebhook, type CallEndedWebhookT } from "@/lib/retell/schemas";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const result = await parseRetellRequest(req, CallEndedWebhook);
  if (!result.ok) return result.response;

  const payload = result.data;

  if (env.retellLive) {
    await persistCall(payload);
  } else {
    console.info("[mock] call_ended", {
      call_id: payload.call.call_id,
      duration_ms: payload.call.duration_ms,
      from: payload.call.from_number,
      sentiment: payload.call.call_analysis?.user_sentiment,
      booked: payload.call.call_analysis?.custom_analysis_data?.booked,
    });
  }

  return jsonOk({ received: true });
}

async function persistCall(_payload: CallEndedWebhookT) {
  // TODO(live):
  //   1. Resolve client_id from call.to_number (our Twilio DID)
  //   2. Insert into calls table: transcript, summary, sentiment, outcome,
  //      duration, recording_url, urgency, job_type
  //   3. Update monthly_usage view inputs
  //   4. If call_analysis.custom_analysis_data.booked === true, ensure a
  //      corresponding leads row exists (created by book_appointment function call)
  //   5. If urgency === 'emergency' and no lead was created, still write a
  //      minimal leads row so the emergency shows up on the dashboard
}
