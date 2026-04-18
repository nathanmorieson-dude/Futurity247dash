import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getServerEnv } from "@/lib/env";

const payloadSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const input = payloadSchema.parse(await request.json());
    const supabase = await createServerSupabaseClient();
    const env = getServerEnv();

    const { error } = await supabase.auth.signInWithOtp({
      email: input.email,
      options: {
        emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error("Failed to send magic link", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Magic link sent." });
  } catch (error) {
    console.error("Invalid magic link payload", error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
