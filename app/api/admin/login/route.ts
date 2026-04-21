import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  checkAdminPassword,
  isAdminPasswordConfigured,
  issueAdminToken,
} from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  password: z.string().min(1).max(200),
});

export async function POST(req: Request) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      {
        error: "admin_not_configured",
        message:
          "Set ADMIN_PASSWORD in Cursor Cloud Agent secrets before signing in.",
      },
      { status: 503 }
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_request", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (!checkAdminPassword(parsed.data.password)) {
    // Small delay to slow down brute-force attempts.
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json(
      { error: "invalid_password" },
      { status: 401 }
    );
  }

  const token = issueAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}
