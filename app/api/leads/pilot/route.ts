import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PilotLead = z.object({
  first_name: z.string().trim().min(1).max(80),
  last_name: z.string().trim().min(1).max(80),
  business_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(180),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(25)
    .regex(/^[+()\- 0-9]+$/, "Enter a valid phone number"),
  suburb: z.string().trim().min(1).max(120),
  team_size: z.enum(["solo", "2-3", "4-10", "10+"]),
  plan: z.enum(["pro", "premium"]).default("pro"),
  hear_about_us: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = PilotLead.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_request", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const lead = {
    ...parsed.data,
    source: "landing_pilot_form",
    user_agent: req.headers.get("user-agent") ?? undefined,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined,
    created_at: new Date().toISOString(),
  };

  // TODO(live): persist to Supabase `pilot_leads`, notify owner via Twilio SMS,
  // push to sales inbox (hello@futurity247.com.au), and optionally auto-fire a
  // welcome email via Resend. For now, log — the frontend gets a clean ack so
  // QA + marketing can smoke-test the flow end-to-end with zero backend wiring.
  console.info("[pilot_lead]", lead);

  return NextResponse.json({
    ok: true,
    message: "Pilot signup received. Nathan will ring you back within one business day.",
  });
}
