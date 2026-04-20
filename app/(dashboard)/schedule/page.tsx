import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LEADS } from "@/lib/mock/data";
import { JOB_VALUE_ESTIMATES } from "@/lib/pricing";
import { formatCurrency, shortDate, timeOfDay } from "@/lib/utils";
import { CalendarRange, MapPin } from "lucide-react";

export default function SchedulePage() {
  const upcoming = LEADS.filter(
    (l) => l.scheduled_for && new Date(l.scheduled_for) >= new Date()
  ).sort(
    (a, b) =>
      new Date(a.scheduled_for!).getTime() -
      new Date(b.scheduled_for!).getTime()
  );

  const byDay: Record<string, typeof upcoming> = {};
  for (const lead of upcoming) {
    const key = shortDate(lead.scheduled_for!);
    byDay[key] ??= [];
    byDay[key].push(lead);
  }

  return (
    <>
      <Topbar
        title="Schedule"
        subtitle="Everything Billie has booked into your Google Calendar."
      />
      <div className="px-6 py-6 space-y-4 animate-fade-in-1">
        {Object.keys(byDay).length === 0 ? (
          <Card>
            <div className="text-center py-12 text-text-muted text-sm">
              No upcoming jobs scheduled.
            </div>
          </Card>
        ) : null}

        {Object.entries(byDay).map(([day, items]) => {
          const dayValue = items.reduce((a, l) => a + l.estimated_value, 0);
          return (
            <Card key={day} className="p-0 overflow-hidden">
              <div className="flex items-center justify-between p-5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.02]">
                    <CalendarRange className="h-4 w-4 text-text-muted" />
                  </div>
                  <div>
                    <div className="text-display text-lg">{day}</div>
                    <div className="text-xs text-text-dim">
                      {items.length} jobs · {formatCurrency(dayValue)} potential
                    </div>
                  </div>
                </div>
                <CardLabel>{items.length} jobs</CardLabel>
              </div>
              <ul className="divide-y divide-white/[0.04] border-t border-white/[0.04]">
                {items.map((lead) => (
                  <li
                    key={lead.id}
                    className="grid grid-cols-12 items-center gap-3 px-5 py-3 text-sm hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="col-span-2">
                      <div className="text-display text-xl leading-none">
                        {timeOfDay(lead.scheduled_for!)}
                      </div>
                      <div className="font-mono-alt text-text-dim mt-1">
                        {lead.urgency}
                      </div>
                    </div>
                    <div className="col-span-6 min-w-0">
                      <div className="font-medium truncate">
                        {lead.caller_name}
                      </div>
                      <div className="text-xs text-text-muted truncate">
                        {JOB_VALUE_ESTIMATES[lead.job_type].label}
                      </div>
                      {lead.address ? (
                        <div className="text-[11px] text-text-dim mt-0.5 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {lead.address}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-span-2 text-right">
                      <div className="tabular-nums">
                        {formatCurrency(lead.estimated_value)}
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <Badge
                        tone={
                          lead.temperature === "hot"
                            ? "warn"
                            : lead.temperature === "warm"
                            ? "cyan"
                            : "muted"
                        }
                        dot
                      >
                        {lead.temperature}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </>
  );
}
