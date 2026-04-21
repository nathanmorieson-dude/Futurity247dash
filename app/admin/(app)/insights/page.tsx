import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Card, CardLabel } from "@/components/ui/Card";
import { StatCard } from "@/components/dashboard/StatCard";
import { MrrChart } from "@/components/admin/MrrChart";
import {
  ADMIN_CLIENTS,
  mrrTrend,
  portfolioTotals,
} from "@/lib/mock/admin";
import { formatCurrency } from "@/lib/utils";

export default function AdminInsightsPage() {
  const t = portfolioTotals();
  const trend = mrrTrend();

  const utilisation =
    t.callsMtd > 0
      ? Math.round((t.bookingsMtd / t.callsMtd) * 100)
      : 0;

  const avgArpu =
    t.activeCount > 0 ? Math.round(t.mrr / t.activeCount) : 0;

  return (
    <>
      <AdminTopbar
        title="Insights"
        subtitle="Portfolio-level metrics to keep an eye on."
      />
      <div className="px-6 py-6 space-y-6">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 animate-fade-in-1">
          <StatCard
            label="ARPU (active)"
            value={formatCurrency(avgArpu)}
            accent="cyan"
            hint="MRR ÷ active clients"
          />
          <StatCard
            label="Portfolio booking rate"
            value={`${utilisation}%`}
            accent="lime"
            hint={`${t.bookingsMtd.toLocaleString()} of ${t.callsMtd.toLocaleString()} calls`}
          />
          <StatCard
            label="Pipeline generated"
            value={formatCurrency(t.pipelineMtd)}
            accent="good"
            hint="For clients, MTD"
          />
          <StatCard
            label="Closed revenue"
            value={formatCurrency(t.revenueClosedMtd)}
            accent="good"
            hint="Confirmed jobs, MTD"
          />
        </div>

        <Card>
          <CardLabel>MRR trajectory</CardLabel>
          <div className="text-display text-xl mt-1 mb-4">
            {formatCurrency(t.mrr)} recurring · {t.activeCount + t.trialingCount} clients
          </div>
          <MrrChart data={trend} />
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card>
            <CardLabel>Top pipeline clients · MTD</CardLabel>
            <ul className="mt-4 space-y-3 text-sm">
              {[...ADMIN_CLIENTS]
                .sort(
                  (a, b) => b.pipeline_value_mtd - a.pipeline_value_mtd
                )
                .slice(0, 5)
                .map((c, i) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between border-b border-white/[0.04] last:border-0 pb-2 last:pb-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono-alt text-text-dim w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <div className="text-text-primary truncate">
                          {c.business_name}
                        </div>
                        <div className="text-[11px] text-text-dim">
                          {c.suburb}
                        </div>
                      </div>
                    </div>
                    <div className="tabular-nums text-accent-cyan">
                      {formatCurrency(c.pipeline_value_mtd)}
                    </div>
                  </li>
                ))}
            </ul>
          </Card>

          <Card>
            <CardLabel>Highest usage clients · MTD</CardLabel>
            <ul className="mt-4 space-y-3 text-sm">
              {[...ADMIN_CLIENTS]
                .sort((a, b) => b.minutes_used_mtd - a.minutes_used_mtd)
                .slice(0, 5)
                .map((c, i) => {
                  const pct = Math.round(
                    (c.minutes_used_mtd / c.minutes_included) * 100
                  );
                  return (
                    <li
                      key={c.id}
                      className="flex items-center justify-between border-b border-white/[0.04] last:border-0 pb-2 last:pb-0"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono-alt text-text-dim w-6">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <div className="text-text-primary truncate">
                            {c.business_name}
                          </div>
                          <div className="text-[11px] text-text-dim">
                            {c.minutes_used_mtd} / {c.minutes_included} min
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          "tabular-nums " +
                          (pct >= 100 ? "text-accent-warn" : "text-accent-lime")
                        }
                      >
                        {pct}%
                      </div>
                    </li>
                  );
                })}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
