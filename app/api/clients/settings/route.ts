import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const settingsSchema = z.object({
  business_hours_start: z.string().min(4),
  business_hours_end: z.string().min(4),
  service_call_fee: z.number().min(0),
  emergency_contact_phone: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const input = settingsSchema.parse(await request.json());
    const supabase = await createServerSupabaseClient();

    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
      .from("clients")
      .update({
        business_hours_start: input.business_hours_start,
        business_hours_end: input.business_hours_end,
        service_call_fee: input.service_call_fee,
        owner_phone: input.emergency_contact_phone,
      })
      .eq("owner_user_id", session.user.id);

    if (error) {
      console.error("Failed to update client settings", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Invalid settings payload", error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
