import crypto from "node:crypto";
import { getServerEnv } from "@/lib/env";

export async function verifyRetellSignature(request: Request, rawBody: string) {
  const signature = request.headers.get("x-retell-signature");

  if (!signature) {
    return false;
  }

  const env = getServerEnv();
  const expected = crypto
    .createHmac("sha256", env.RETELL_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  const provided = Buffer.from(signature, "hex");
  const digest = Buffer.from(expected, "hex");

  if (provided.length !== digest.length) {
    return false;
  }

  return crypto.timingSafeEqual(provided, digest);
}
