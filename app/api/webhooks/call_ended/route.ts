import { NextResponse } from "next/server";
import { callEndedSchema } from "@/lib/retell/schemas";
import { verifyRetellSignature } from "@/lib/retell/signature";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const rawBody = await request.text();

  const isValidSignature = await verifyRetellSignature(request, rawBody);
  if (!isValidSignature) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  try {
    const payload = callEndedSchema.parse(JSON.parse(rawBody));
    const call = payload.call;

    const clientId = call.metadata?.client_id;
    if (!clientId) {
      return NextResponse.json({ error: "Missing client_id metadata." }, { status: 400 });
    }

    const supabase = createAdminSupabaseClient();

    const { error } = await supabase.from("calls").upsert(
      {
        client_id: clientId,
        retell_call_id: call.id,
        caller_phone: call.from_number ?? null,
        transcript: call.transcript ?? null,
        summary: call.summary ?? null,
        sentiment: call.sentiment ?? null,
        outcome: call.disconnection_reason ?? null,
        duration_seconds: call.duration_ms ? Math.round(call.duration_ms / 1000) : null,
        recording_url: call.recording_url ?? null,
        started_at: call.started_at ?? new Date().toISOString(),
        ended_at: call.ended_at ?? null,
      },
      { onConflict: "retell_call_id" },
    );

    if (error) {
      console.error("Failed to persist call_ended payload", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Invalid call_ended payload", error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
