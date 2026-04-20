import { z } from "zod";

const schema = z.object({
  RETELL_API_KEY: z.string().optional(),
  RETELL_WEBHOOK_SECRET: z.string().optional(),
  RETELL_AGENT_ID: z.string().optional(),
  RETELL_LIVE: z
    .enum(["0", "1", "true", "false"])
    .optional()
    .default("0"),
  APP_URL: z.string().url().optional(),
});

const parsed = schema.safeParse({
  RETELL_API_KEY: process.env.RETELL_API_KEY,
  RETELL_WEBHOOK_SECRET: process.env.RETELL_WEBHOOK_SECRET,
  RETELL_AGENT_ID: process.env.RETELL_AGENT_ID,
  RETELL_LIVE: process.env.RETELL_LIVE,
  APP_URL: process.env.APP_URL,
});

if (!parsed.success) {
  console.error("Invalid environment:", parsed.error.flatten());
  throw new Error("Invalid environment variables");
}

const raw = parsed.data;

function truthy(v: string | undefined) {
  return v === "1" || v === "true";
}

export const env = {
  retellApiKey: raw.RETELL_API_KEY ?? "",
  retellWebhookSecret: raw.RETELL_WEBHOOK_SECRET ?? "",
  retellAgentId: raw.RETELL_AGENT_ID ?? "",
  retellLive: truthy(raw.RETELL_LIVE) && Boolean(raw.RETELL_API_KEY),
  appUrl: raw.APP_URL ?? "http://localhost:3000",
};

export function requireRetellKey() {
  if (!env.retellApiKey) {
    throw new Error(
      "RETELL_API_KEY is not set. Add it as a secret to enable live mode."
    );
  }
  return env.retellApiKey;
}
