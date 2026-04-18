import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerEnv } from "@/lib/env";
import { getStripeClient } from "@/lib/stripe/client";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const env = getServerEnv();
  const stripe = getStripeClient();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error("Stripe webhook signature verification failed", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    const supabase = createAdminSupabaseClient();

    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      const clientId = invoice.metadata?.client_id;

      if (clientId) {
        await supabase.from("billing_events").insert({
          client_id: clientId,
          stripe_event_id: event.id,
          event_type: event.type,
          payload: invoice,
        });
      }
    }

    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice;
      const clientId = invoice.metadata?.client_id;

      if (clientId) {
        await supabase.from("billing_events").insert({
          client_id: clientId,
          stripe_event_id: event.id,
          event_type: event.type,
          payload: invoice,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook handling failed", error);
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
