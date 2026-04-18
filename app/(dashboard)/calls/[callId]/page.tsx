import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Headphones,
  MapPin,
  PhoneIncoming,
  Play,
  Sparkles,
  User,
} from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CALLS, LEADS } from "@/lib/mock/data";
import { JOB_VALUE_ESTIMATES } from "@/lib/pricing";
import {
  formatCurrency,
  formatDuration,
  formatPhone,
  relativeTime,
  shortDate,
  timeOfDay,
} from "@/lib/utils";

export function generateStaticParams() {
  return CALLS.map((c) => ({ callId: c.id }));
}

export default function CallDetailPage({
  params,
}: {
  params: { callId: string };
}) {
  const call = CALLS.find((c) => c.id === params.callId);
  if (!call) notFound();

  const lead = call.lead_id ? LEADS.find((l) => l.id === call.lead_id) : null;
  const isEmergency = call.urgency === "emergency";

  return (
    <>
      <Topbar
        title={call.caller_name ?? "Unknown caller"}
        subtitle={`${formatPhone(call.caller_phone)} · ${shortDate(
          call.started_at
        )} at ${timeOfDay(call.started_at)} · ${formatDuration(
          call.duration_seconds
        )}`}
      />

      <div className="px-6 py-6 space-y-6">
        <Link
          href="/calls"
          className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-accent-cyan animate-fade-in-1"
        >
          <ArrowLeft className="h-3 w-3" /> All calls
        </Link>

        {isEmergency ? (
          <div className="flex items-start gap-3 rounded-2xl border border-accent-warn/30 bg-accent-warn/5 px-5 py-4 animate-fade-in-1">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent-warn/15 ring-1 ring-accent-warn/40 shrink-0">
              <Headphones className="h-4 w-4 text-accent-warn" />
            </div>
            <div className="flex-1">
              <div className="font-mono-alt text-accent-warn">Escalation</div>
              <div className="text-sm text-text-primary mt-1">
                Owner notified by SMS at{" "}
                {timeOfDay(
                  new Date(new Date(call.started_at).getTime() + 25_000)
                )}
                . Same-day appointment confirmed during call.
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 space-y-4 animate-fade-in-2">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <CardLabel>Audio</CardLabel>
                <div className="flex items-center gap-2">
                  <Badge tone="muted">Stereo · 16kHz</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <button className="grid h-12 w-12 place-items-center rounded-full bg-accent-cyan text-base">
                  <Play className="h-5 w-5 fill-current" />
                </button>
                <div className="flex-1">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-lime"
                      style={{ width: "0%" }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-text-dim font-mono-alt">
                    <span>0:00</span>
                    <span>{formatDuration(call.duration_seconds)}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <CardLabel>Transcript</CardLabel>
                <div className="text-xs text-text-dim">
                  Sentiment ·{" "}
                  <span
                    className={
                      call.sentiment === "positive"
                        ? "text-accent-good"
                        : call.sentiment === "negative"
                        ? "text-accent-warn"
                        : "text-text-muted"
                    }
                  >
                    {call.sentiment}
                  </span>
                </div>
              </div>
              <ol className="space-y-3">
                {call.transcript.map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-12 shrink-0 pt-1 font-mono-alt text-text-dim">
                      {Math.floor(t.ts_seconds / 60)}:
                      {(t.ts_seconds % 60).toString().padStart(2, "0")}
                    </div>
                    <div
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm leading-relaxed ${
                        t.speaker === "billie"
                          ? "border-accent-cyan/20 bg-accent-cyan/[0.04] text-text-primary"
                          : "border-white/[0.06] bg-white/[0.02] text-text-primary"
                      }`}
                    >
                      <div className="text-[10px] font-mono-alt mb-0.5">
                        <span
                          className={
                            t.speaker === "billie"
                              ? "text-accent-cyan"
                              : "text-text-muted"
                          }
                        >
                          {t.speaker === "billie" ? "Billie" : call.caller_name ?? "Caller"}
                        </span>
                      </div>
                      {t.text}
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-3">
                <CardLabel>Billie&apos;s summary</CardLabel>
                <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
              </div>
              <p className="text-sm text-text-primary leading-relaxed">
                {call.summary}
              </p>
            </Card>
          </div>

          <div className="space-y-4 animate-fade-in-3">
            <Card>
              <CardLabel>Call</CardLabel>
              <ul className="mt-4 space-y-3 text-sm">
                <DetailRow
                  icon={<PhoneIncoming className="h-3.5 w-3.5" />}
                  label="Number"
                  value={formatPhone(call.caller_phone)}
                />
                <DetailRow
                  icon={<Clock className="h-3.5 w-3.5" />}
                  label="When"
                  value={`${shortDate(call.started_at)} · ${timeOfDay(
                    call.started_at
                  )}`}
                  hint={relativeTime(call.started_at)}
                />
                <DetailRow
                  icon={<Clock className="h-3.5 w-3.5" />}
                  label="Length"
                  value={formatDuration(call.duration_seconds)}
                />
                <DetailRow
                  icon={<User className="h-3.5 w-3.5" />}
                  label="Outcome"
                  value={
                    <Badge
                      tone={
                        call.outcome === "booked"
                          ? "good"
                          : call.outcome === "escalated"
                          ? "warn"
                          : call.outcome === "qualified"
                          ? "cyan"
                          : "muted"
                      }
                    >
                      {call.outcome}
                    </Badge>
                  }
                />
              </ul>
            </Card>

            {lead ? (
              <Card>
                <CardLabel>Linked lead</CardLabel>
                <div className="mt-3 space-y-3">
                  <div className="text-display text-2xl">
                    {formatCurrency(lead.estimated_value)}
                  </div>
                  <div className="text-sm text-text-primary">
                    {JOB_VALUE_ESTIMATES[lead.job_type].label}
                  </div>
                  <div className="text-xs text-text-muted leading-relaxed">
                    {lead.job_description}
                  </div>
                  {lead.address ? (
                    <div className="flex items-center gap-1.5 text-xs text-text-dim">
                      <MapPin className="h-3 w-3" />
                      {lead.address}
                    </div>
                  ) : null}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge tone={lead.temperature === "hot" ? "warn" : lead.temperature === "warm" ? "cyan" : "muted"} dot>
                      {lead.temperature} lead
                    </Badge>
                    <Badge tone="muted">{lead.status}</Badge>
                  </div>
                  {lead.scheduled_for ? (
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-text-muted">
                      Scheduled for{" "}
                      <span className="text-text-primary">
                        {shortDate(lead.scheduled_for)} ·{" "}
                        {timeOfDay(lead.scheduled_for)}
                      </span>
                    </div>
                  ) : null}
                </div>
              </Card>
            ) : null}

            <Card>
              <CardLabel>Override</CardLabel>
              <p className="text-xs text-text-muted mt-2 mb-3 leading-relaxed">
                If Billie misclassified this call, fix it here. Changes flow back
                into her training set.
              </p>
              <div className="space-y-2">
                <Button variant="secondary" size="sm" className="w-full justify-start">
                  Mark as booked
                </Button>
                <Button variant="secondary" size="sm" className="w-full justify-start">
                  Mark as spam
                </Button>
                <Button variant="danger" size="sm" className="w-full justify-start">
                  Flag for review
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function DetailRow({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="grid h-7 w-7 place-items-center rounded-md border border-white/[0.06] bg-white/[0.02] text-text-muted">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono-alt text-text-dim">{label}</div>
        <div className="mt-0.5 text-text-primary">{value}</div>
        {hint ? <div className="text-[11px] text-text-dim mt-0.5">{hint}</div> : null}
      </div>
    </li>
  );
}
