import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardLabel } from "@/components/ui/Card";
import { CallVolumeChart } from "@/components/dashboard/CallVolumeChart";
import { JobMixChart } from "@/components/dashboard/JobMixChart";
import { HourlyHeatmap } from "@/components/dashboard/HourlyHeatmap";
import { LeadFunnelChart } from "@/components/dashboard/LeadFunnelChart";
import {
  DAILY_METRICS,
  callsByHour,
  jobTypeBreakdown,
  leadFunnel,
  monthToDateMetrics,
} from "@/lib/mock/data";
import { StatCard } from "@/components/dashboard/StatCard";
import { formatCurrency } from "@/lib/utils";

export default function InsightsPage() {
  const mtd = monthToDateMetrics();

  return (
    <>
      <Topbar
        title="Insights"
        subtitle="Trends, patterns, and the metrics your competitors don't see."
      />

      <div className="px-6 py-6 space-y-6">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 animate-fade-in-1">
          <StatCard
            label="Avg call length"
            value="1m 04s"
            delta={-6.2}
            hint="Shorter is better — Billie gets to the point"
          />
          <StatCard
            label="After-hours capture"
            value="38%"
            accent="lime"
            delta={4.8}
            hint="% of pipeline value from nights/weekends"
          />
          <StatCard
            label="Hot lead → Booked"
            value="91%"
            accent="good"
            delta={1.4}
            hint="Conversion of hot leads to scheduled jobs"
          />
          <StatCard
            label="Spam blocked"
            value="14"
            accent="warn"
            hint="Robocalls Billie hung up on this month"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 animate-fade-in-2">
          <Card className="xl:col-span-2">
            <CardLabel>Call volume trend</CardLabel>
            <div className="text-display text-xl mt-1 mb-4">
              {mtd.calls} calls month-to-date · {formatCurrency(mtd.pipeline_value)} pipeline
            </div>
            <CallVolumeChart data={DAILY_METRICS} />
          </Card>
          <Card>
            <CardLabel>Funnel</CardLabel>
            <div className="text-display text-xl mt-1 mb-4">Conversion path</div>
            <LeadFunnelChart stages={leadFunnel()} />
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 animate-fade-in-3">
          <Card>
            <CardLabel>Pipeline by job type</CardLabel>
            <div className="text-display text-xl mt-1 mb-4">Where the money is</div>
            <JobMixChart data={jobTypeBreakdown()} />
          </Card>
          <Card>
            <CardLabel>Calls by hour of day</CardLabel>
            <div className="text-display text-xl mt-1 mb-4">
              Peak: 9 AM and 3 PM
            </div>
            <HourlyHeatmap data={callsByHour()} />
          </Card>
        </div>
      </div>
    </>
  );
}
