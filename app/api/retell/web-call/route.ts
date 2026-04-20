import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { retell } from "@/lib/retell/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  caller_name: z.string().trim().min(1).max(120),
  business_name: z.string().trim().min(1).max(120),
});

export async function POST(req: Request) {
  if (!env.hasRetellWebCall) {
    return NextResponse.json(
      {
        error: "retell_not_configured",
        message:
          "Set RETELL_API_KEY and RETELL_AGENT_ID in Cursor Cloud Agent secrets to enable the live Billie web-call demo.",
      },
      { status: 503 }
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = Body.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_request", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { caller_name, business_name } = parsed.data;

  try {
    const call = await retell.createWebCall({
      agent_id: env.retellAgentId,
      retell_llm_dynamic_variables: {
        CALLER_NAME: caller_name,
        BUSINESS_NAME: business_name,
      },
      metadata: {
        source: "futurity247_web_demo",
        caller_name,
        business_name,
        started_at: new Date().toISOString(),
      },
    });

    const token =
      (call as { access_token?: string } | null)?.access_token ?? null;
    const callId =
      (call as { call_id?: string } | null)?.call_id ?? null;

    if (!token) {
      console.error("Retell createWebCall missing access_token:", call);
      return NextResponse.json(
        { error: "missing_access_token" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      access_token: token,
      call_id: callId,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Retell createWebCall failed:", msg);
    return NextResponse.json(
      { error: "upstream_error", message: msg },
      { status: 502 }
    );
  }
}
