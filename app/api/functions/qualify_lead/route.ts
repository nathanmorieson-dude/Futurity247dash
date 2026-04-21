import {
  jsonOk,
  parseRetellRequest,
} from "@/lib/retell/route-helpers";
import {
  QualifyLeadRequest,
  type QualifyLeadArgsT,
} from "@/lib/retell/schemas";
import { scoreLead } from "@/lib/retell/lead-scoring";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const result = await parseRetellRequest(req, QualifyLeadRequest);
  if (!result.ok) return result.response;

  const { args, call } = result.data;

  const { temperature, estimatedValue } = scoreLead({
    jobType: args.job_type,
    urgency: args.urgency,
    homeowner: args.homeowner,
    timeline: args.timeline_mentioned,
  });

  const alertOwner = temperature === "hot";

  if (env.retellLive) {
    await persistAndMaybeAlert({
      args,
      callId: call?.call_id,
      temperature,
      estimatedValue,
      alertOwner,
    });
  } else {
    console.info("[mock] qualify_lead", {
      call_id: call?.call_id,
      temperature,
      estimatedValue,
      alertOwner,
    });
  }

  return jsonOk({
    temperature,
    estimated_value: estimatedValue,
    alert_owner: alertOwner,
    message: "Lead scored and logged.",
  });
}

async function persistAndMaybeAlert({
  args: _args,
  callId: _callId,
  temperature: _temperature,
  estimatedValue: _estimatedValue,
  alertOwner: _alertOwner,
}: {
  args: QualifyLeadArgsT;
  callId?: string;
  temperature: string;
  estimatedValue: number;
  alertOwner: boolean;
}) {
  // TODO(live): Upsert a leads row and, if alertOwner, SMS the owner a hot-lead notice.
}
