import {
  jsonOk,
  parseRetellRequest,
} from "@/lib/retell/route-helpers";
import {
  CheckAvailabilityRequest,
  type CheckAvailabilityArgsT,
} from "@/lib/retell/schemas";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const result = await parseRetellRequest(req, CheckAvailabilityRequest);
  if (!result.ok) return result.response;

  const { args } = result.data;

  const slots = env.retellLive
    ? await liveSlots(args)
    : mockSlots(args);

  const message =
    slots.length === 0
      ? "I'm looking at the calendar and don't see anything open in that window. Want me to try a different day?"
      : `I've got ${slots.length} openings — how about ${slots[0].label}?`;

  return jsonOk({ slots, message });
}

function mockSlots(args: CheckAvailabilityArgsT) {
  const base = new Date();
  const isEmergency = args.urgency === "emergency";
  const isUrgent = args.urgency === "urgent";

  const offsets = isEmergency
    ? [1, 2, 4]
    : isUrgent
    ? [3, 5, 20]
    : [22, 28, 46];

  return offsets.map((hours) => {
    const start = new Date(base.getTime() + hours * 60 * 60 * 1000);
    start.setMinutes(start.getMinutes() < 30 ? 0 : 30);
    start.setSeconds(0);
    start.setMilliseconds(0);
    const end = new Date(start.getTime() + 90 * 60 * 1000);
    return {
      starts_at: start.toISOString(),
      ends_at: end.toISOString(),
      label: start.toLocaleString("en-US", {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
      }),
    };
  });
}

async function liveSlots(_args: CheckAvailabilityArgsT) {
  // TODO(live): Call Google Calendar with the service account linked to this
  // client (resolve from req -> agent_id -> clients.calendar_id) and return
  // real free/busy windows. Mock path covers the same shape for now.
  return mockSlots(_args);
}
