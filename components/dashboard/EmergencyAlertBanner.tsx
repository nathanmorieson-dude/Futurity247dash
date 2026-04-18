import Link from "next/link";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { CALLS } from "@/lib/mock/data";
import { formatPhone, relativeTime } from "@/lib/utils";

export function EmergencyAlertBanner() {
  const recent = CALLS.find((c) => c.urgency === "emergency");
  if (!recent) return null;

  return (
    <Link
      href={`/calls/${recent.id}`}
      className="group relative flex items-center gap-4 rounded-2xl border border-accent-warn/30 bg-accent-warn/5 px-5 py-4 overflow-hidden interactive-border"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(40% 80% at 0% 50%, rgba(251,146,60,0.18), transparent 60%)",
        }}
      />
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-warn/15 ring-1 ring-accent-warn/40 shrink-0">
        <AlertTriangle className="h-5 w-5 text-accent-warn" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono-alt text-accent-warn">Emergency · Escalated</span>
          <span className="text-text-dim text-xs">
            {relativeTime(recent.started_at)}
          </span>
        </div>
        <div className="text-sm text-text-primary mt-0.5 truncate">
          {recent.caller_name} ({formatPhone(recent.caller_phone)}) — {recent.summary}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-accent-warn transition-colors" />
    </Link>
  );
}
