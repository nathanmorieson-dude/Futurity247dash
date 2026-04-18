import { NextResponse } from "next/server";
import { checkAvailabilitySchema } from "@/lib/retell/schemas";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getOpenSlots } from "@/lib/calendar/google-calendar";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const input = checkAvailabilitySchema.parse(await request.json());
    const supabase = createAdminSupabaseClient();

    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("google_calendar_id")
      .eq("id", input.client_id)
      .single();

    if (clientError || !client?.google_calendar_id) {
      console.error("Missing Google Calendar config", clientError);
      return NextResponse.json({ error: "Calendar is not configured." }, { status: 400 });
    }

    const start = new Date(`${input.preferred_date}T00:00:00.000Z`);
    const end = new Date(`${input.preferred_date}T23:59:59.999Z`);

    const busy = await getOpenSlots({
      calendarId: client.google_calendar_id,
      start: start.toISOString(),
      end: end.toISOString(),
    });

    return NextResponse.json({ busy });
  } catch (error) {
    console.error("check_availability failed", error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
