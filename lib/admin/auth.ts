import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";

export const ADMIN_COOKIE = "f247_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

/**
 * Signs a short payload (expiry timestamp) with HMAC so we can hand the
 * value to the browser as a cookie and trust it when it comes back.
 * Format: `<expiry_seconds>.<hex_hmac>`.
 */
function sign(payload: string) {
  return crypto
    .createHmac("sha256", env.adminCookieSecret)
    .update(payload, "utf8")
    .digest("hex");
}

export function issueAdminToken() {
  const exp = Math.floor(Date.now() / 1000) + ADMIN_COOKIE_MAX_AGE;
  const payload = String(exp);
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expStr, mac] = token.split(".");
  if (!expStr || !mac) return false;
  const expected = sign(expStr);
  if (
    expected.length !== mac.length ||
    !crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(mac, "hex")
    )
  ) {
    return false;
  }
  const exp = Number(expStr);
  if (!Number.isFinite(exp)) return false;
  if (exp < Math.floor(Date.now() / 1000)) return false;
  return true;
}

export function checkAdminPassword(submitted: string) {
  if (!env.adminPassword) return false;
  const a = Buffer.from(env.adminPassword);
  const b = Buffer.from(submitted);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function isAdminPasswordConfigured() {
  return env.adminPassword.length > 0;
}

/**
 * Server-side guard. Call at the top of every /admin route that requires
 * auth. If ADMIN_PASSWORD is not configured it gates the entire panel as
 * "503 setup required" rather than exposing a passwordless admin.
 */
export function requireAdmin() {
  if (!isAdminPasswordConfigured()) {
    return { ok: false as const, reason: "no_password" as const };
  }
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!verifyAdminToken(token)) {
    redirect("/admin/login");
  }
  return { ok: true as const };
}
