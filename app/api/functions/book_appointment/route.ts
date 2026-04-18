import { NextResponse } from "next/server";
import { bookAppointmentSchema } from "@/lib/retell/schemas";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createCalendarBooking } from "@/lib/calendar/google-calendar";
import { sendSmsMessage } from "@/lib/twilio/sms";
import { scoreLead } from "@/lib/retell/lead-scoring";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const input = bookAppointmentSchema.parse(await request.json());
    const supabase = createAdminSupabaseClient();

    const clientRes = await supabase
      .from("clients")
      .select("id, business_name, owner_phone, google_calendar_id")
      .eq("id", input.client_id)
      .single();

    const client = (clientRes.data as {
      id: string;
      business_name: string;
      owner_phone: string | null;
      google_calendar_id: string | null;
    } | null);

    if (clientRes.error || !client || !client.google_calendar_id) {
      console.error("book_appointment missing client config", clientRes.error);
      return NextResponse.json({ error: "Client calendar is not configured." }, { status: 400 });
    }

    const event = await createCalendarBooking({
      calendarId: client.google_calendar_id,
      summary: `${input.customer_name} - ${input.job_type}`,
      description: input.job_description ?? "Booked by Billie",
      start: input.appointment_start,
      end: input.appointment_end,
    });

    if (!event.id) {
      return NextResponse.json({ error: "Calendar booking failed." }, { status: 500 });
    }

    const scored = scoreLead({
      urgency: input.urgency,
      jobType: input.job_type,
    });

    const { error: leadError } = await supabase.from("leads").insert({
      client_id: input.client_id,
      call_id: input.call_id ?? null,
      customer_name: input.customer_name,
      customer_phone: input.customer_phone,
      customer_address: input.customer_address ?? null,
      job_description: input.job_description ?? null,
      job_type: input.job_type,
      urgency: input.urgency,
      lead_tier: scored.tier,
      estimated_value: scored.value,
      booking_status: "booked",
      appointment_start: input.appointment_start,
      appointment_end: input.appointment_end,
    });

    if (leadError) {
      console.error("Failed to persist booked lead", leadError);
      return NextResponse.json({ error: leadError.message }, { status: 500 });
    }

    const customerMessage = `Your appointment is confirmed for ${new Date(input.appointment_start).toLocaleString()}. ${client.business_name} will provide an on-site quote.`;

    await sendSmsMessage(input.customer_phone, customerMessage);

    if (input.urgency === "high" || input.urgency === "emergency") {
      if (client.owner_phone) {
        await sendSmsMessage(
          client.owner_phone,
          `Urgent booking: ${input.customer_name} (${input.customer_phone}) at ${new Date(input.appointment_start).toLocaleString()}`,
        );
      }
    }

    return NextResponse.json({
      ok: true,
      calendar_event_id: event.id,
    });
  } catch (error) {
    console.error("book_appointment failed", error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
