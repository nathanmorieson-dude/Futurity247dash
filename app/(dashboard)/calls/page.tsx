import { Topbar } from "@/components/dashboard/Topbar";
import { CallRow } from "@/components/dashboard/CallRow";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CALLS, closedThisMonth, monthToDateMetrics } from "@/lib/mock/data";
import { formatCurrency } from "@/lib/utils";
import { Filter } from "lucide-react";

export default function CallsPage() {
  const mtd = monthToDateMetrics();
  const totalValue = CALLS.reduce(
    (a, c) => a + (c.estimated_value ?? 0),
    0
  );

  return (
    <>
      <Topbar
        title="Calls"
        subtitle="Every inbound call Billie has answered. Click any row for full transcript and audio."
      />

      <div className="px-6 py-6 space-y-6">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 animate-fade-in-1">
          <StatCard
            label="This month"
            value={mtd.calls.toString()}
            hint={`${mtd.minutes} minutes used`}
          />
          <StatCard
            label="Booking rate"
            value={`${(mtd.bookingRate * 100).toFixed(0)}%`}
            accent="lime"
            hint="Industry average: 38%"
          />
          <StatCard
            label="Closed revenue"
            value={formatCurrency(closedThisMonth())}
            accent="good"
            hint={`Pipeline ${formatCurrency(totalValue)}`}
          />
          <StatCard
            label="Emergencies"
            value={mtd.emergencies.toString()}
            accent="warn"
            hint="All escalated under 30s"
          />
        </div>

        <Card className="p-0 overflow-hidden animate-fade-in-2">
          <div className="flex items-center justify-between p-5 pb-3">
            <div className="flex items-center gap-2">
              <CardLabel>All calls</CardLabel>
              <Badge tone="muted">{CALLS.length}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <FilterChip label="All" active />
              <FilterChip label="Booked" />
              <FilterChip label="Emergencies" />
              <FilterChip label="Spam" />
              <button className="ml-2 grid h-8 w-8 place-items-center rounded-md border border-white/[0.06] bg-white/[0.02] text-text-muted interactive-border">
                <Filter className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-3 px-4 py-2 text-[10px] uppercase tracking-widest2 text-text-dim border-t border-b border-white/[0.04]">
            <div className="col-span-1 hidden md:block" />
            <div className="col-span-5 md:col-span-3">Caller</div>
            <div className="col-span-3 hidden md:block">Job · summary</div>
            <div className="col-span-2 text-right md:text-left">Value</div>
            <div className="col-span-2 hidden md:block">Outcome</div>
            <div className="col-span-3 md:col-span-1 text-right">Length</div>
          </div>
          <div>
            {CALLS.map((call) => (
              <CallRow key={call.id} call={call} />
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`h-8 rounded-md border px-3 text-xs interactive-border ${
        active
          ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
          : "border-white/[0.06] bg-white/[0.02] text-text-muted"
      }`}
    >
      {label}
    </button>
  );
}
