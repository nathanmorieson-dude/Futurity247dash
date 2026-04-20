import {
  jsonOk,
  parseRetellRequest,
} from "@/lib/retell/route-helpers";
import {
  TriageEmergencyRequest,
  type TriageEmergencyArgsT,
} from "@/lib/retell/schemas";
import { classifyCallerInput } from "@/lib/emergency-classifier";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SAFETY_INSTRUCTIONS: Record<string, string[]> = {
  fire: [
    "If you see flames or heavy smoke, get everyone out and call 911 right now.",
    "Do not try to fight an electrical fire with water.",
  ],
  shock: [
    "Do not touch the person if they're still in contact with a live wire.",
    "If it's safe, turn off the main breaker. Then call 911.",
  ],
  water: [
    "Stay away from the panel and any standing water.",
    "If you can reach the main cutoff dry-handed with rubber-soled shoes, cut it. Otherwise wait for the electrician.",
  ],
  panel: [
    "Leave that breaker in the off position — do not reset it.",
    "Stay away from the panel until the electrician arrives.",
  ],
  default: [
    "Stop using the affected circuit.",
    "Stay clear of the area until the electrician arrives.",
  ],
};

export async function POST(req: Request) {
  const result = await parseRetellRequest(req, TriageEmergencyRequest);
  if (!result.ok) return result.response;

  const { args, call } = result.data;

  const classification = classifyCallerInput(args.description);
  const keywords = Array.from(
    new Set([...(args.keywords_matched ?? []), ...classification.keywords])
  );
  const instructions = pickInstructions(keywords);

  if (env.retellLive) {
    await alertOwnerLive(args, call?.call_id, keywords);
  } else {
    console.warn("[mock] triage_emergency — owner alert SMS", {
      call_id: call?.call_id,
      keywords,
      caller: args.caller_name,
      phone: args.caller_phone,
      address: args.address,
    });
  }

  return jsonOk({
    owner_alerted: true,
    safety_instructions: instructions,
    message:
      "Help is on the way. I'm texting Marcus right now. Please stay clear of the area until he calls you back.",
  });
}

function pickInstructions(keywords: string[]): string[] {
  const k = keywords.join(" ").toLowerCase();
  if (k.includes("fire") || k.includes("smoke") || k.includes("burning"))
    return SAFETY_INSTRUCTIONS.fire;
  if (k.includes("shock") || k.includes("electrocuted"))
    return SAFETY_INSTRUCTIONS.shock;
  if (k.includes("water") || k.includes("flood"))
    return SAFETY_INSTRUCTIONS.water;
  if (k.includes("panel") || k.includes("breaker"))
    return SAFETY_INSTRUCTIONS.panel;
  return SAFETY_INSTRUCTIONS.default;
}

async function alertOwnerLive(
  _args: TriageEmergencyArgsT,
  _callId: string | undefined,
  _keywords: string[]
) {
  // TODO(live): Resolve owner phone from clients table via call.to_number and
  // send an SMS through Twilio with caller name, phone, address, and keywords.
}
