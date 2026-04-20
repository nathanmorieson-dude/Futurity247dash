import { NextResponse } from "next/server";
import agentConfig from "@/config/retell_agent_config.json";
import { env, requireRetellKey } from "@/lib/env";
import { retell } from "@/lib/retell/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Pushes the Billie agent config from /config/retell_agent_config.json up to
 * Retell. Rewrites the function URLs so they point at this deployment's
 * APP_URL (so dev / staging / prod each get the right webhook targets).
 *
 * Auth: protected by RETELL_API_KEY presence (there's no self-service access
 * to this endpoint in the dashboard yet). Extend with an admin-bearer token
 * before exposing to clients.
 */
export async function POST(req: Request) {
  if (!env.retellApiKey) {
    return NextResponse.json(
      { error: "RETELL_API_KEY is not set" },
      { status: 503 }
    );
  }
  if (!env.retellAgentId) {
    return NextResponse.json(
      { error: "RETELL_AGENT_ID is not set" },
      { status: 503 }
    );
  }

  requireRetellKey();

  const appUrl = env.appUrl;

  const body = JSON.parse(JSON.stringify(agentConfig)) as {
    general_tools: Array<Record<string, unknown>>;
    general_prompt: string;
    begin_message: string;
  };

  const { searchParams } = new URL(req.url);
  const businessName = searchParams.get("business_name") ?? "Keystone Electric";

  body.general_prompt = body.general_prompt.replaceAll(
    "{{BUSINESS_NAME}}",
    businessName
  );
  body.begin_message = body.begin_message.replaceAll(
    "{{BUSINESS_NAME}}",
    businessName
  );

  for (const tool of body.general_tools) {
    if (typeof tool.url === "string") {
      tool.url = (tool.url as string).replaceAll("{{APP_URL}}", appUrl);
    }
  }

  const updated = await retell.updateAgent(env.retellAgentId, body as never);

  return NextResponse.json({ ok: true, agent: updated });
}
