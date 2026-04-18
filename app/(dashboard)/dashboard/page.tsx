import { Topbar } from "@/components/dashboard/Topbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { ROICard } from "@/components/dashboard/ROICard";
import { CallVolumeChart } from "@/components/dashboard/CallVolumeChart";
import { JobMixChart } from "@/components/dashboard/JobMixChart";
import { LeadFunnelChart } from "@/components/dashboard/LeadFunnelChart";
import { UpcomingJobs } from "@/components/dashboard/UpcomingJobs";
import { CallRow } from "@/components/dashboard/CallRow";
import { EmergencyAlertBanner } from "@/components/dashboard/EmergencyAlertBanner";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  CALLS,
  CURRENT_CLIENT,
  DAILY_METRICS,
  activeRoi,
  callsByHour,
  closedThisMonth,
  jobTypeBreakdown,
  leadFunnel,
  monthToDateMetrics,
} from "@/lib/mock/data";
import { formatCurrency } from "@/lib/utils";
import { HourlyHeatmap } from "@/components/dashboard/HourlyHeatmap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const mtd = monthToDateMetrics();
  const roi = activeRoi();
  const closed = closedThisMonth();
  const todaysCalls = CALLS.slice(0, 6);

  return (
    <>
      <Topbar
        title={`Good afternoon, ${CURRENT_CLIENT.owner_name.split(" ")[0]}.`}
        subtitle="Billie has been answering since 6:00 AM. Here's how today is going."
      />

      <div className="px-6 py-6 space-y-6">
        <div className="animate-fade-in-1">
          <EmergencyAlertBanner />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 animate-fade-in-1">
          <StatCard
            label="Calls answered · MTD"
            value={mtd.calls.toString()}
            delta={12.4}
            hint={`${mtd.minutes} min of ${CURRENT_CLIENT.included_minutes}`}
          />
          <StatCard
            label="Booked jobs"
            value={mtd.booked.toString()}
            delta={8.1}
            accent="lime"
            hint={`${(mtd.bookingRate * 100).toFixed(0)}% booking rate`}
          />
          <StatCard
            label="Pipeline value"
            value={formatCurrency(mtd.pipeline_value)}
            delta={21.6}
            accent="cyan"
            hint="Quoted value of qualified leads"
          />
          <StatCard
            label="Closed revenue"
            value={formatCurrency(closed)}
            delta={14.7}
            accent="good"
            hint="Confirmed jobs · $200 avg close"
          />
          <StatCard
            label="Emergencies handled"
            value={mtd.emergencies.toString()}
            delta={-2.3}
            accent="warn"
            hint="All escalated within 30s"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 animate-fade-in-2">
          <Card className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardLabel>Call volume · last 30 days</CardLabel>
                <div className="text-display text-xl mt-1">
                  Calls vs. booked jobs
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Badge tone="cyan" dot>
                  Calls
                </Badge>
                <Badge tone="lime" dot>
                  Booked
                </Badge>
              </div>
            </div>
            <CallVolumeChart data={DAILY_METRICS} />
          </Card>

          <ROICard
            pipeline={roi.pipeline}
            fee={roi.fee}
            multiple={roi.multiple}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 animate-fade-in-3">
          <Card className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardLabel>Pipeline by job type</CardLabel>
                <div className="text-display text-xl mt-1">
                  Where the dollars are coming from
                </div>
              </div>
            </div>
            <JobMixChart data={jobTypeBreakdown()} />
          </Card>

          <Card>
            <div className="mb-4">
              <CardLabel>Lead funnel</CardLabel>
              <div className="text-display text-xl mt-1">This month</div>
            </div>
            <LeadFunnelChart stages={leadFunnel()} />
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 animate-fade-in-3">
          <UpcomingJobs />

          <Card className="xl:col-span-2 p-0 overflow-hidden">
            <div className="flex items-center justify-between p-5 pb-3">
              <div>
                <CardLabel>Recent calls</CardLabel>
                <div className="text-display text-xl mt-1">
                  Today's activity
                </div>
              </div>
              <Link
                href="/calls"
                className="text-xs text-text-muted hover:text-accent-cyan inline-flex items-center gap-1"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="border-t border-white/[0.04]">
              {todaysCalls.map((call) => (
                <CallRow key={call.id} call={call} />
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 animate-fade-in-4">
          <Card className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardLabel>When customers call</CardLabel>
                <div className="text-display text-xl mt-1">
                  Hourly call distribution
                </div>
                <div className="text-xs text-text-dim mt-1">
                  Billie picks up 24/7. After-hours calls are{" "}
                  <span className="text-accent-cyan">38% of pipeline value</span>.
                </div>
              </div>
            </div>
            <HourlyHeatmap data={callsByHour()} />
          </Card>

          <Card>
            <CardLabel>Billie&apos;s wins this month</CardLabel>
            <ul className="mt-4 space-y-3 text-sm">
              <Win
                value={`${mtd.booked} jobs`}
                label="Booked without you lifting a finger"
              />
              <Win
                value={`${mtd.emergencies} emergencies`}
                label="Routed to you in under 30 seconds"
              />
              <Win
                value="0 missed"
                label="Zero hot leads dropped"
              />
              <Win
                value={`${Math.round((mtd.minutes / 60) * 10) / 10} hrs`}
                label="Of your phone time, returned"
              />
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}

function Win({ value, label }: { value: string; label: string }) {
  return (
    <li className="flex items-start gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
      <div className="text-display text-lg text-accent-cyan w-24 shrink-0">
        {value}
      </div>
      <div className="text-text-muted text-xs leading-relaxed pt-1">
        {label}
      </div>
    </li>
  );
}
