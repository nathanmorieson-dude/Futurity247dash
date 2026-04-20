import { MapPin, Phone } from "lucide-react";
import type { Lead } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { JOB_VALUE_ESTIMATES } from "@/lib/pricing";
import {
  formatCurrency,
  formatPhone,
  relativeTime,
  shortDate,
  timeOfDay,
} from "@/lib/utils";

const tempTone = {
  hot: "warn",
  warm: "cyan",
  cold: "muted",
} as const;

export function LeadCard({ lead }: { lead: Lead }) {
  const meta = JOB_VALUE_ESTIMATES[lead.job_type];
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 interactive-border">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-medium text-sm truncate">{lead.caller_name}</div>
          <div className="text-[11px] text-text-dim flex items-center gap-1 mt-0.5">
            <Phone className="h-3 w-3" /> {formatPhone(lead.caller_phone)}
          </div>
        </div>
        <Badge tone={tempTone[lead.temperature]} dot>
          {lead.temperature}
        </Badge>
      </div>

      <div className="mt-3">
        <div className="font-mono-alt text-text-dim mb-0.5">{meta.label}</div>
        <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
          {lead.job_description}
        </p>
      </div>

      {lead.address ? (
        <div className="mt-2 flex items-center gap-1 text-[11px] text-text-dim">
          <MapPin className="h-3 w-3" /> {lead.address}
        </div>
      ) : null}

      <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/[0.05] pt-3">
        <div>
          <div className="font-mono-alt text-text-dim">Quote</div>
          <div className="text-display text-lg text-accent-cyan leading-none mt-1">
            {formatCurrency(lead.estimated_value)}
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono-alt text-text-dim">Closed</div>
          <div
            className={`text-display text-lg leading-none mt-1 ${
              lead.amount_closed > 0 ? "text-accent-good" : "text-text-dim"
            }`}
          >
            {formatCurrency(lead.amount_closed)}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] text-text-dim">
        <span>{relativeTime(lead.created_at)}</span>
        {lead.scheduled_for ? (
          <span className="tabular-nums text-text-muted">
            {shortDate(lead.scheduled_for)} · {timeOfDay(lead.scheduled_for)}
          </span>
        ) : null}
      </div>
    </div>
  );
}
