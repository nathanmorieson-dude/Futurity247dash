import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  CircleDashed,
  Headphones,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { env } from "@/lib/env";
import { HearBillieButton } from "@/components/marketing/HearBillieButton";

const RULES = [
  {
    title: "Never quotes prices",
    body: "Always says \"the electrician will give you a quote on-site.\" The only number Billie will name is the $149 call-out fee.",
  },
  {
    title: "Never diagnoses",
    body: "Asked what's wrong with the wiring? She says \"I don't want to guess — that's what the electrician is for.\"",
  },
  {
    title: "Confirms phone numbers digit-by-digit",
    body: "Hallucinated digits = a missed customer. She always reads back to confirm.",
  },
  {
    title: "Short, useful turns",
    body: "One or two sentences per response. No monologues. No upselling. Get the caller off the phone with the right outcome.",
  },
];

const FUNCTIONS = [
  {
    name: "check_availability",
    path: "/api/functions/check_availability",
    body: "Queries Google Calendar for open slots given job type and preferred date.",
  },
  {
    name: "book_appointment",
    path: "/api/functions/book_appointment",
    body: "Creates the calendar event, inserts a lead, sends SMS confirmation, alerts owner if urgent.",
  },
  {
    name: "triage_emergency",
    path: "/api/functions/triage_emergency",
    body: "Alerts owner immediately, logs the call, returns safety instructions to the caller.",
  },
  {
    name: "qualify_lead",
    path: "/api/functions/qualify_lead",
    body: "Scores the lead hot / warm / cold, flags hot leads to owner.",
  },
  {
    name: "call_ended (webhook)",
    path: "/api/webhooks/call_ended",
    body: "Retell posts the full transcript + analysis here when Billie hangs up. Persists the call to our database.",
  },
];

export default function BilliePage() {
  return (
    <>
      <Topbar
        title="Billie"
        subtitle="Your 24/7 AI receptionist, tuned for electrical work."
      />

      <div className="px-6 py-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4 animate-fade-in-1">
          <Card className="relative overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-70"
              style={{
                background:
                  "radial-gradient(50% 80% at 100% 0%, rgba(34,211,238,0.12), transparent 60%)",
              }}
            />
            <div className="flex items-start gap-5">
              <div className="grid h-16 w-16 place-items-center rounded-xl bg-gradient-to-br from-accent-cyan/30 to-accent-lime/20 ring-1 ring-accent-cyan/40">
                <Headphones className="h-7 w-7 text-accent-cyan" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-display text-3xl">Billie</h2>
                  <Badge tone="cyan" dot>
                    Online
                  </Badge>
                </div>
                <p className="text-sm text-text-muted mt-1 leading-relaxed">
                  Female voice, warm + efficient. Trained on 12,000+ electrician
                  calls. Powered by Claude Sonnet 4.5 inside Retell AI.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <HearBillieButton
                    variant="primary"
                    size="sm"
                    icon="volume"
                    label="Hear sample"
                  />
                  <Button size="sm" variant="secondary">
                    <MessageSquare className="h-3.5 w-3.5" /> Test in chat
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <CardLabel>Hard rules Billie follows</CardLabel>
              <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
            </div>
            <ul className="space-y-3">
              {RULES.map((r) => (
                <li
                  key={r.title}
                  className="flex items-start gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] p-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent-good mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-medium">{r.title}</div>
                    <div className="text-xs text-text-muted mt-0.5 leading-relaxed">
                      {r.body}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <CardLabel>Functions Billie can call</CardLabel>
              <Badge tone={env.retellLive ? "good" : "muted"} dot>
                {env.retellLive ? "Live wiring" : "Mock mode"}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FUNCTIONS.map((f) => (
                <div
                  key={f.name}
                  className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3"
                >
                  <div className="flex items-center gap-2">
                    <CircleDashed className="h-3.5 w-3.5 text-accent-cyan" />
                    <code className="text-xs text-accent-cyan">{f.name}</code>
                  </div>
                  <code className="block text-[10px] text-text-dim mt-1 font-mono-alt normal-case tracking-normal">
                    POST {f.path}
                  </code>
                  <div className="text-xs text-text-muted mt-1.5 leading-relaxed">
                    {f.body}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4 animate-fade-in-2">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <CardLabel>Retell connection</CardLabel>
              <Badge tone={env.retellLive ? "good" : "warn"} dot>
                {env.retellLive ? "Live" : "Mock"}
              </Badge>
            </div>
            <div className="text-xs text-text-muted leading-relaxed">
              {env.retellLive
                ? "All five function endpoints are hitting real Google Calendar, Supabase, and Twilio. Signature verification is enforced."
                : "Endpoints are wired and signature-verified, but return mock data until RETELL_API_KEY and RETELL_LIVE=1 are set."}
            </div>
            <div className="mt-3 space-y-2 text-xs">
              <Row
                k="API key"
                v={env.retellApiKey ? "Configured" : "Not set"}
              />
              <Row
                k="Webhook secret"
                v={env.retellWebhookSecret ? "Configured" : "Not set"}
              />
              <Row
                k="Agent ID"
                v={env.retellAgentId || "—"}
              />
              <Row k="App URL" v={env.appUrl} />
            </div>
          </Card>

          <Card>
            <CardLabel>Voice</CardLabel>
            <div className="mt-3 space-y-3 text-sm">
              <Row k="Voice ID" v="billie_v3" />
              <Row k="Provider" v="ElevenLabs" />
              <Row k="Speaking rate" v="1.0×" />
              <Row k="Latency" v="380 ms p50" />
            </div>
          </Card>

          <Card>
            <CardLabel>Brain</CardLabel>
            <div className="mt-3 space-y-3 text-sm">
              <Row k="LLM" v="Claude Sonnet 4.5" />
              <Row k="Temperature" v="0.4" />
              <Row k="Context" v="32k tokens" />
              <Row k="Function calls" v="4 enabled" />
            </div>
          </Card>

          <Card>
            <CardLabel>Telephony</CardLabel>
            <div className="mt-3 space-y-3 text-sm">
              <Row k="Provider" v="Twilio" />
              <Row k="DID" v="07 3111 9900" />
              <Row k="Recording" v="Stereo, retained 90d" />
              <Row k="STIR/SHAKEN" v="A-attested" />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.04] last:border-0 pb-2 last:pb-0">
      <span className="text-text-dim text-xs">{k}</span>
      <span className="text-text-primary tabular-nums">{v}</span>
    </div>
  );
}
