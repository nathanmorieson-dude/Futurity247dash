import twilio from "twilio";
import { getServerEnv } from "@/lib/env";

let singletonClient: ReturnType<typeof twilio> | null = null;

export function getTwilioClient() {
  if (!singletonClient) {
    const env = getServerEnv();
    singletonClient = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  }

  return singletonClient;
}
