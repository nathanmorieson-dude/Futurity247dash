import { env, requireRetellKey } from "@/lib/env";

const BASE_URL = "https://api.retellai.com";

async function retellFetch(
  path: string,
  init: RequestInit & { method?: "GET" | "POST" | "PATCH" | "DELETE" } = {}
) {
  const key = requireRetellKey();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Retell ${init.method ?? "GET"} ${path} failed: ${res.status} ${body}`
    );
  }

  if (res.status === 204) return null;
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;
  return res.json();
}

export interface RetellAgentConfig {
  agent_name: string;
  voice_id: string;
  language: string;
  response_engine: {
    type: "retell-llm";
    llm_id: string;
  };
}

export interface RetellFunctionDefinition {
  type: "custom";
  name: string;
  description: string;
  url: string;
  speak_during_execution?: boolean;
  parameters: Record<string, unknown>;
}

export const retell = {
  live: () => env.retellLive,

  async listCalls(params: { agent_id?: string; limit?: number } = {}) {
    const qs = new URLSearchParams();
    if (params.agent_id) qs.set("agent_id", params.agent_id);
    if (params.limit) qs.set("limit", String(params.limit));
    return retellFetch(`/list-calls?${qs.toString()}`);
  },

  async getCall(callId: string) {
    return retellFetch(`/get-call/${callId}`);
  },

  async getAgent(agentId: string) {
    return retellFetch(`/get-agent/${agentId}`);
  },

  async updateAgent(agentId: string, patch: Partial<RetellAgentConfig>) {
    return retellFetch(`/update-agent/${agentId}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
  },

  async createPhoneNumber(areaCode: string, agentId: string) {
    return retellFetch(`/create-phone-number`, {
      method: "POST",
      body: JSON.stringify({
        area_code: Number(areaCode),
        inbound_agent_id: agentId,
      }),
    });
  },

  /**
   * Creates a short-lived browser web call. The returned `access_token`
   * is what the browser-side RetellWebClient uses to establish WebRTC
   * audio with Billie. We pass `retell_llm_dynamic_variables` so the
   * agent prompt can use {{CALLER_NAME}} / {{BUSINESS_NAME}}.
   */
  async createWebCall(params: {
    agent_id: string;
    metadata?: Record<string, unknown>;
    retell_llm_dynamic_variables?: Record<string, string>;
  }) {
    return retellFetch("/v2/create-web-call", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },
};
