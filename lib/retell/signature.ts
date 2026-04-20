import crypto from "node:crypto";
import { env } from "@/lib/env";

/**
 * Retell signs every webhook/function call with an HMAC-SHA256 over the raw
 * request body using the shared secret. We compare in constant time.
 *
 * In mock mode (no RETELL_WEBHOOK_SECRET set), verification is skipped so
 * local curl tests work. Live mode enforces strictly.
 */
export function verifyRetellSignature({
  rawBody,
  headerSignature,
}: {
  rawBody: string;
  headerSignature: string | null | undefined;
}): { ok: boolean; reason?: string } {
  if (!env.retellWebhookSecret) {
    return { ok: true, reason: "no-secret-configured" };
  }
  if (!headerSignature) {
    return { ok: false, reason: "missing-signature-header" };
  }

  const expected = crypto
    .createHmac("sha256", env.retellWebhookSecret)
    .update(rawBody, "utf8")
    .digest("hex");

  const provided = headerSignature.replace(/^sha256=/, "").trim();

  if (expected.length !== provided.length) {
    return { ok: false, reason: "signature-length-mismatch" };
  }

  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(provided, "hex");

  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: "signature-mismatch" };
  }

  return { ok: true };
}

export const RETELL_SIGNATURE_HEADER = "x-retell-signature";
