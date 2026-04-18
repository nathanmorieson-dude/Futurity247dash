import Link from "next/link";
import { Headphones, PhoneIncoming } from "lucide-react";
import type { Call } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { JOB_VALUE_ESTIMATES } from "@/lib/pricing";
import {
  formatCurrency,
  formatDuration,
  formatPhone,
  relativeTime,
} from "@/lib/utils";

const outcomeTone = {
  booked: "good",
  escalated: "warn",
  qualified: "cyan",
  messaged: "neutral",
  spam: "muted",
  missed: "danger",
} as const;

const outcomeLabel = {
  booked: "Booked",
  escalated: "Escalated",
  qualified: "Qualified",
  messaged: "Messaged",
  spam: "Spam",
  missed: "Missed",
} as const;

export function CallRow({ call }: { call: Call }) {
  const isEmergency = call.urgency === "emergency";
  const jobLabel = call.job_type ? JOB_VALUE_ESTIMATES[call.job_type].label : "—";

  return (
    <Link
      href={`/calls/${call.id}`}
      className="group grid grid-cols-12 gap-3 items-center px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
    >
      <div className="col-span-1 hidden md:flex items-center justify-center">
        <div
          className={`grid h-8 w-8 place-items-center rounded-md border ${
            isEmergency
              ? "border-accent-warn/40 bg-accent-warn/10 text-accent-warn"
              : "border-white/10 bg-white/[0.03] text-text-muted"
          }`}
        >
          {isEmergency ? (
            <Headphones className="h-4 w-4" />
          ) : (
            <PhoneIncoming className="h-4 w-4" />
          )}
        </div>
      </div>

      <div className="col-span-5 md:col-span-3 min-w-0">
        <div className="flex items-center gap-2">
          <div className="font-medium text-sm truncate">
            {call.caller_name ?? "Unknown caller"}
          </div>
          {isEmergency ? (
            <Badge tone="warn" dot className="shrink-0">
              Emergency
            </Badge>
          ) : null}
        </div>
        <div className="text-xs text-text-dim truncate">
          {formatPhone(call.caller_phone)}
        </div>
      </div>

      <div className="col-span-3 hidden md:block min-w-0">
        <div className="text-sm text-text-primary truncate">{jobLabel}</div>
        <div className="text-xs text-text-dim line-clamp-1">
          {call.summary}
        </div>
      </div>

      <div className="col-span-2 text-right md:text-left">
        <div className="text-sm tabular-nums text-text-primary">
          {call.estimated_value
            ? formatCurrency(call.estimated_value)
            : "—"}
        </div>
        <div className="font-mono-alt text-text-dim">value</div>
      </div>

      <div className="col-span-2 hidden md:block">
        <Badge tone={outcomeTone[call.outcome]}>
          {outcomeLabel[call.outcome]}
        </Badge>
      </div>

      <div className="col-span-3 md:col-span-1 text-right text-xs text-text-muted">
        <div className="tabular-nums">{formatDuration(call.duration_seconds)}</div>
        <div className="text-text-dim">{relativeTime(call.started_at)}</div>
      </div>
    </Link>
  );
}
