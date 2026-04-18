import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getServerEnv } from "@/lib/env";

export async function POST() {
  const supabase = await createServerSupabaseClient();
  const env = getServerEnv();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error || !data.url) {
    console.error("Failed to start Google OAuth", error);
    return NextResponse.redirect(new URL("/auth/login?error=oauth_failed", env.NEXT_PUBLIC_APP_URL));
  }

  return NextResponse.redirect(data.url);
}
