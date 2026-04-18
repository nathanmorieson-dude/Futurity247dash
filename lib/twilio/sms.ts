import { getServerEnv } from "@/lib/env";
import { getTwilioClient } from "@/lib/twilio/client";

export async function sendSmsMessage(to: string, body: string) {
  const env = getServerEnv();
  const client = getTwilioClient();

  try {
    await client.messages.create({
      to,
      body,
      from: env.TWILIO_SMS_FROM,
    });
  } catch (error) {
    console.error("Failed to send SMS", { to, body, error });
    throw error;
  }
}
