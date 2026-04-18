import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { LeadCard } from "@/components/dashboard/LeadCard";
import { LEADS, closedThisMonth } from "@/lib/mock/data";
import { formatCurrency } from "@/lib/utils";

const COLUMNS: { id: string; label: string; statuses: string[]; tone: "cyan" | "lime" | "good" | "muted" }[] = [
  { id: "new", label: "New", statuses: ["new"], tone: "cyan" },
  { id: "qualified", label: "Qualified", statuses: ["qualified"], tone: "lime" },
  { id: "booked", label: "Booked", statuses: ["booked"], tone: "good" },
  { id: "completed", label: "Completed", statuses: ["completed", "lost"], tone: "muted" },
];

export default function LeadsPage() {
  const totalPipeline = LEADS.filter((l) => l.status !== "lost").reduce(
    (a, l) => a + l.estimated_value,
    0
  );
  const hotCount = LEADS.filter((l) => l.temperature === "hot").length;
  const bookedCount = LEADS.filter((l) =>
    ["booked", "completed"].includes(l.status)
  ).length;
  const totalClosed = closedThisMonth();

  return (
    <>
      <Topbar
        title="Leads"
        subtitle="Every qualified caller becomes a lead. Drag to update status (coming soon)."
      />

      <div className="px-6 py-6 space-y-6">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 animate-fade-in-1">
          <StatCard
            label="Open pipeline"
            value={formatCurrency(totalPipeline)}
            accent="cyan"
            hint={`${LEADS.length} total leads`}
          />
          <StatCard
            label="Hot leads"
            value={hotCount.toString()}
            accent="warn"
            hint="High intent, ready to book"
          />
          <StatCard
            label="Booked"
            value={bookedCount.toString()}
            accent="good"
            hint="On the calendar"
          />
          <StatCard
            label="Closed revenue"
            value={formatCurrency(totalClosed)}
            accent="good"
            hint={`${LEADS.length} jobs × $200 avg close`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 animate-fade-in-2">
          {COLUMNS.map((col) => {
            const items = LEADS.filter((l) => col.statuses.includes(l.status));
            const sum = items.reduce((a, l) => a + l.estimated_value, 0);
            const closed = items.reduce((a, l) => a + l.amount_closed, 0);
            return (
              <Card key={col.id} className="p-0 overflow-hidden flex flex-col">
                <div className="flex items-start justify-between p-4 border-b border-white/[0.04]">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge tone={col.tone} dot>
                        {col.label}
                      </Badge>
                      <span className="text-text-dim text-xs">
                        {items.length}
                      </span>
                    </div>
                    <div className="font-mono-alt text-text-dim mt-2">
                      Pipeline · {formatCurrency(sum)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono-alt text-text-dim">Closed</div>
                    <div className="text-display text-base text-accent-good leading-none mt-1">
                      {formatCurrency(closed)}
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-3 p-3 max-h-[640px] overflow-y-auto">
                  {items.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                  ))}
                  {items.length === 0 ? (
                    <div className="text-center text-xs text-text-dim py-12">
                      No leads in this stage yet.
                    </div>
                  ) : null}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
