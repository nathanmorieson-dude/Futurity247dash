import { NextResponse } from "next/server";
import { qualifyLeadSchema } from "@/lib/retell/schemas";
import { scoreLead } from "@/lib/retell/lead-scoring";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { sendSmsMessage } from "@/lib/twilio/sms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const input = qualifyLeadSchema.parse(await request.json());
    const supabase = createAdminSupabaseClient();

    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("owner_phone")
      .eq("id", input.client_id)
      .single();

    if (clientError || !client) {
      return NextResponse.json({ error: "Client not found." }, { status: 404 });
    }

    const scored = scoreLead({
      urgency: input.urgency,
      jobType: input.job_type,
      estimatedValue: input.estimated_value,
    });

    if (input.lead_id) {
      const { error } = await supabase
        .from("leads")
        .update({
          lead_tier: scored.tier,
          estimated_value: scored.value,
        })
        .eq("id", input.lead_id)
        .eq("client_id", input.client_id);

      if (error) {
        console.error("Failed to update lead", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    } else {
      const { error } = await supabase.from("leads").insert({
        client_id: input.client_id,
        customer_name: input.customer_name,
        customer_phone: input.customer_phone,
        job_type: input.job_type,
        urgency: input.urgency,
        lead_tier: scored.tier,
        estimated_value: scored.value,
        booking_status: "new",
        job_description: input.notes ?? null,
      });

      if (error) {
        console.error("Failed to insert lead", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    if (scored.tier === "hot" && client.owner_phone) {
      await sendSmsMessage(
        client.owner_phone,
        `Hot lead flagged: ${input.customer_name} (${input.customer_phone}) - ${input.job_type}`,
      );
    }

    return NextResponse.json({
      lead_tier: scored.tier,
      estimated_value: scored.value,
    });
  } catch (error) {
    console.error("qualify_lead failed", error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
