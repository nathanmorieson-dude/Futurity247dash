import { CalendarClock, MapPin } from "lucide-react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { JOB_VALUE_ESTIMATES } from "@/lib/pricing";
import { LEADS } from "@/lib/mock/data";
import { formatCurrency, shortDate, timeOfDay } from "@/lib/utils";

export function UpcomingJobs() {
  const upcoming = LEADS.filter(
    (l) => l.scheduled_for && new Date(l.scheduled_for) > new Date()
  )
    .sort(
      (a, b) =>
        new Date(a.scheduled_for!).getTime() -
        new Date(b.scheduled_for!).getTime()
    )
    .slice(0, 4);

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center justify-between p-5 pb-3">
        <div>
          <CardLabel>Next on the schedule</CardLabel>
          <div className="text-display text-xl mt-1">
            {upcoming.length} upcoming jobs
          </div>
        </div>
        <CalendarClock className="h-4 w-4 text-text-dim" />
      </div>
      <ul className="divide-y divide-white/[0.04]">
        {upcoming.map((lead) => (
          <li key={lead.id} className="grid grid-cols-12 items-center gap-3 px-5 py-3 text-sm">
            <div className="col-span-3">
              <div className="font-mono-alt text-text-dim">
                {shortDate(lead.scheduled_for!)}
              </div>
              <div className="text-display text-lg leading-none mt-1">
                {timeOfDay(lead.scheduled_for!)}
              </div>
            </div>
            <div className="col-span-6 min-w-0">
              <div className="font-medium truncate">{lead.caller_name}</div>
              <div className="text-xs text-text-muted truncate">
                {JOB_VALUE_ESTIMATES[lead.job_type].label}
              </div>
              {lead.address ? (
                <div className="text-[11px] text-text-dim truncate flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" />
                  {lead.address}
                </div>
              ) : null}
            </div>
            <div className="col-span-3 text-right">
              <div className="text-sm tabular-nums">
                {formatCurrency(lead.estimated_value)}
              </div>
              <Badge
                tone={
                  lead.urgency === "emergency"
                    ? "warn"
                    : lead.urgency === "urgent"
                    ? "cyan"
                    : "muted"
                }
                className="mt-1"
              >
                {lead.urgency}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
