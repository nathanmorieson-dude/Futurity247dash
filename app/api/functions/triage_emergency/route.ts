import { NextResponse } from "next/server";
import { triageEmergencySchema } from "@/lib/retell/schemas";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { sendSmsMessage } from "@/lib/twilio/sms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const input = triageEmergencySchema.parse(await request.json());
    const supabase = createAdminSupabaseClient();

    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("business_name, owner_phone")
      .eq("id", input.client_id)
      .single();

    if (clientError || !client) {
      console.error("triage_emergency missing client", clientError);
      return NextResponse.json({ error: "Client not found." }, { status: 404 });
    }

    if (client.owner_phone) {
      await sendSmsMessage(
        client.owner_phone,
        `EMERGENCY CALL: ${input.caller_phone}. ${input.summary}`,
      );
    }

    await supabase.from("calls").insert({
      client_id: input.client_id,
      retell_call_id: input.call_id ?? null,
      caller_phone: input.caller_phone,
      summary: input.summary,
      outcome: "escalated_emergency",
    });

    return NextResponse.json({
      status: "escalated",
      safety_instructions:
        "Please turn off power at the breaker if safe, avoid exposed wiring, and wait for the electrician. If there is fire or immediate danger, call emergency services now.",
    });
  } catch (error) {
    console.error("triage_emergency failed", error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
