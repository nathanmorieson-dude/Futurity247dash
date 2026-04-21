import { NextResponse } from "next/server";
import agentConfig from "@/config/retell_agent_config.json";
import { env, requireRetellKey } from "@/lib/env";
import { retell } from "@/lib/retell/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Pushes the Billie config from /config/retell_agent_config.json to Retell.
 *
 * Retell splits the configuration between two resources:
 *   - Agent        (voice, ambient sound, interruption, post-call analysis,
 *                   boosted keywords, call timeouts)
 *   - Retell LLM   (prompt, model, temperature, functions, begin_message)
 *
 * We PATCH both, using the agent's `response_engine.llm_id` to locate the
 * LLM. APP_URL and BUSINESS_NAME placeholders in the JSON are substituted
 * per request so dev/staging/prod each wire to their own webhook host.
 *
 * Returns the updated agent + llm JSON so you can see the merge result.
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

  const { searchParams } = new URL(req.url);
  const businessName = searchParams.get("business_name") ?? "Keystone Electric";
  const appUrl = env.appUrl;

  type AgentCfg = typeof agentConfig;
  const src = JSON.parse(JSON.stringify(agentConfig)) as AgentCfg & {
    response_engine?: { llm_id?: string; llm_model?: string; type?: string };
    general_prompt?: string;
    begin_message?: string;
    general_tools?: Array<Record<string, unknown>>;
  };

  const substitute = (s: string) =>
    s.replaceAll("{{BUSINESS_NAME}}", businessName).replaceAll("{{APP_URL}}", appUrl);

  if (src.general_prompt) src.general_prompt = substitute(src.general_prompt);
  if (src.begin_message) src.begin_message = substitute(src.begin_message);

  const tools = (src.general_tools ?? []).map((t) => {
    const copy: Record<string, unknown> = { ...t };
    if (typeof copy.url === "string") copy.url = substitute(copy.url as string);
    return copy;
  });

  // 1. Fetch current agent → find the linked Retell LLM id
  const currentAgent = (await retell.getAgent(env.retellAgentId)) as {
    response_engine?: { llm_id?: string; type?: string };
    agent_id?: string;
  };
  const llmId = currentAgent?.response_engine?.llm_id;
  if (!llmId) {
    return NextResponse.json(
      {
        error: "no_linked_llm",
        message:
          "The agent has no response_engine.llm_id. Create a Retell LLM in the dashboard and attach it to the agent first.",
        agent: currentAgent,
      },
      { status: 422 }
    );
  }

  // 2. Patch the LLM with Billie's prompt, tools, and begin message
  const llmPatch: Record<string, unknown> = {
    general_prompt: src.general_prompt,
    begin_message: src.begin_message,
    general_tools: tools,
  };
  if (src.response_engine?.llm_model) {
    llmPatch.model = src.response_engine.llm_model;
  }
  const updatedLlm = await retell.updateRetellLlm(llmId, llmPatch);

  // 3. Patch the agent — intentionally skip voice_id so the voice the agent
  //    already has configured in the Retell dashboard stays put.
  const voice = (src as unknown as {
    voice?: {
      voice_id?: string | null;
      voice_temperature?: number;
      voice_speed?: number;
      volume?: number;
      enable_backchannel?: boolean;
      backchannel_frequency?: number;
      backchannel_words?: string[];
    };
  }).voice;

  const agentPatch: Record<string, unknown> = {
    agent_name: src.agent_name,
    voice_temperature: voice?.voice_temperature,
    voice_speed: voice?.voice_speed,
    volume: voice?.volume,
    enable_backchannel: voice?.enable_backchannel,
    backchannel_frequency: voice?.backchannel_frequency,
    backchannel_words: voice?.backchannel_words,
    ambient_sound: (src as unknown as { ambient_sound?: string }).ambient_sound,
    ambient_sound_volume: (src as unknown as { ambient_sound_volume?: number })
      .ambient_sound_volume,
    interruption_sensitivity: (src as unknown as {
      interruption_sensitivity?: number;
    }).interruption_sensitivity,
    end_call_after_silence_ms: (src as unknown as {
      end_call_after_silence_ms?: number;
    }).end_call_after_silence_ms,
    max_call_duration_ms: (src as unknown as { max_call_duration_ms?: number })
      .max_call_duration_ms,
    boosted_keywords: (src as unknown as { boosted_keywords?: string[] })
      .boosted_keywords,
    language: (src as unknown as { language?: string }).language,
    post_call_analysis_data: (src as unknown as {
      post_call_analysis_data?: unknown;
    }).post_call_analysis_data,
  };

  // Only include voice_id if the config explicitly pins one (value != null)
  if (voice?.voice_id) {
    agentPatch.voice_id = voice.voice_id;
  }

  for (const k of Object.keys(agentPatch))
    if (agentPatch[k] === undefined) delete agentPatch[k];

  const updatedAgent = await retell.updateAgent(env.retellAgentId, agentPatch);

  return NextResponse.json({
    ok: true,
    business_name: businessName,
    app_url: appUrl,
    agent_id: env.retellAgentId,
    llm_id: llmId,
    functions_synced: tools.map((t) => ({
      name: (t as { name?: string }).name,
      url: (t as { url?: string }).url,
    })),
    agent: updatedAgent,
    llm: updatedLlm,
  });
}
