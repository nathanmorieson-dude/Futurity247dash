import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { MrrChart } from "@/components/admin/MrrChart";
import { ClientRow } from "@/components/admin/ClientRow";
import {
  ADMIN_CLIENTS,
  mrrTrend,
  planDistribution,
  portfolioTotals,
} from "@/lib/mock/admin";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";

export default function AdminOverviewPage() {
  const t = portfolioTotals();
  const trend = mrrTrend();
  const dist = planDistribution();

  const recent = ADMIN_CLIENTS.filter((c) => c.status !== "churned")
    .sort(
      (a, b) =>
        new Date(b.last_call_at ?? 0).getTime() -
        new Date(a.last_call_at ?? 0).getTime()
    )
    .slice(0, 5);

  const at_risk = ADMIN_CLIENTS.filter(
    (c) => c.status === "past_due" || c.churn_risk === "high"
  )
    .filter((c) => c.status !== "churned")
    .slice(0, 5);

  return (
    <>
      <AdminTopbar
        title="Portfolio"
        subtitle={`${t.activeCount} paying · ${t.trialingCount} trialing · ${t.churnedCount} churned`}
      />

      <div className="px-6 py-6 space-y-6">
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 animate-fade-in-1">
          <StatCard
            label="MRR"
            value={formatCurrency(t.mrr)}
            delta={12.4}
            accent="cyan"
            hint="Active + past-due subscriptions"
          />
          <StatCard
            label="ARR (run-rate)"
            value={formatCurrency(t.arr)}
            accent="lime"
            hint="MRR × 12"
          />
          <StatCard
            label="Overage revenue"
            value={formatCurrency(t.overageRevenue)}
            accent="good"
            hint={`${t.overageMinutes.toLocaleString()} min over MTD`}
          />
          <StatCard
            label="Past due"
            value={t.pastDue.length.toString()}
            accent="warn"
            hint="Failed payments need attention"
          />
          <StatCard
            label="High churn risk"
            value={t.highRisk.length.toString()}
            accent="warn"
            hint="Reach out this week"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 animate-fade-in-2">
          <Card className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardLabel>MRR · Last 12 months</CardLabel>
                <div className="text-display text-xl mt-1">
                  {formatCurrency(t.mrr)} recurring
                </div>
              </div>
              <Badge tone="cyan" dot>
                Live
              </Badge>
            </div>
            <MrrChart data={trend} />
          </Card>

          <Card>
            <CardLabel>Plan mix</CardLabel>
            <div className="text-display text-xl mt-1 mb-4">Active customers</div>
            <div className="space-y-3">
              <PlanMix label="Pro · $499" count={dist.pro} total={dist.pro + dist.premium} tone="cyan" />
              <PlanMix label="Premium · $999" count={dist.premium} total={dist.pro + dist.premium} tone="lime" />
            </div>
            <div className="mt-5 pt-4 border-t border-white/[0.06] text-xs text-text-muted">
              Portfolio generated{" "}
              <span className="text-accent-cyan">
                {formatCurrency(t.pipelineMtd)}
              </span>{" "}
              in pipeline and{" "}
              <span className="text-accent-good">
                {formatCurrency(t.revenueClosedMtd)}
              </span>{" "}
              in closed revenue for clients this month.
            </div>
          </Card>
        </div>

        {at_risk.length > 0 ? (
          <Card className="animate-fade-in-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent-warn" />
                <CardLabel>Attention this week</CardLabel>
              </div>
              <Link
                href="/admin/clients?filter=risk"
                className="text-xs text-text-muted hover:text-accent-cyan inline-flex items-center gap-1"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="rounded-xl border border-white/[0.06] overflow-hidden">
              {at_risk.map((c) => (
                <ClientRow key={c.id} client={c} />
              ))}
            </div>
          </Card>
        ) : null}

        <Card className="p-0 overflow-hidden animate-fade-in-3">
          <div className="flex items-center justify-between p-5 pb-3">
            <div>
              <CardLabel>Recently active</CardLabel>
              <div className="text-display text-xl mt-1">Last few calls</div>
            </div>
            <Link
              href="/admin/clients"
              className="text-xs text-text-muted hover:text-accent-cyan inline-flex items-center gap-1"
            >
              All clients <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-12 gap-3 px-4 py-2 text-[10px] uppercase tracking-widest2 text-text-dim border-t border-b border-white/[0.04]">
            <div className="col-span-3">Client</div>
            <div className="col-span-2 hidden md:block">Plan</div>
            <div className="col-span-2 hidden md:block">Status</div>
            <div className="col-span-3 hidden lg:block">Usage</div>
            <div className="col-span-4 md:col-span-2 text-right">Pipeline</div>
            <div className="col-span-5 md:col-span-1 text-right">Risk</div>
          </div>
          <div>
            {recent.map((c) => (
              <ClientRow key={c.id} client={c} />
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function PlanMix({
  label,
  count,
  total,
  tone,
}: {
  label: string;
  count: number;
  total: number;
  tone: "cyan" | "lime";
}) {
  const pct = total === 0 ? 0 : (count / total) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="text-text-muted">{label}</span>
        <span className="tabular-nums text-text-primary">{count}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.04]">
        <div
          className={
            tone === "cyan"
              ? "h-full rounded-full bg-gradient-to-r from-accent-cyan/70 to-accent-cyan/30"
              : "h-full rounded-full bg-gradient-to-r from-accent-lime/70 to-accent-lime/30"
          }
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
