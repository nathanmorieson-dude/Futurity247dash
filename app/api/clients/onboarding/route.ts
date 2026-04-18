import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const onboardingSchema = z.object({
  business_name: z.string().min(2),
  owner_name: z.string().min(2),
  owner_phone: z.string().min(10),
  pricing_plan: z.enum(["starter", "pro", "premium"]),
  google_calendar_id: z.string().min(3).optional(),
  twilio_number: z.string().min(4).optional(),
  retell_agent_id: z.string().min(3).optional(),
});

export async function POST(request: Request) {
  try {
    const input = onboardingSchema.parse(await request.json());
    const supabase = await createServerSupabaseClient();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase.from("clients").upsert(
      {
        owner_user_id: session.user.id,
        business_name: input.business_name,
        owner_name: input.owner_name,
        owner_phone: input.owner_phone,
        owner_email: session.user.email ?? null,
        pricing_plan: input.pricing_plan,
        google_calendar_id: input.google_calendar_id ?? null,
        twilio_number: input.twilio_number ?? null,
        retell_agent_id: input.retell_agent_id ?? null,
      },
      { onConflict: "owner_user_id" },
    );

    if (error) {
      console.error("Failed to save onboarding data", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Invalid onboarding payload", error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
