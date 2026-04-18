import { BarChart3, CalendarDays, PhoneCall, TrendingUp } from "lucide-react";
import { ROICard } from "@/components/dashboard/ROICard";
import { StatCard } from "@/components/dashboard/StatCard";
import { UsageChart } from "@/components/dashboard/UsageChart";
import {
  getAuthenticatedClientContext,
  getDashboardOverview,
  getMonthlyUsageSeries,
} from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { client } = await getAuthenticatedClientContext();

  if (!client) {
    return (
      <section className="glass-card rounded-2xl p-8">
        <h1 className="font-display text-3xl text-[var(--text-primary)]">Finish onboarding</h1>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          No client profile is attached to this account yet. Use Setup Wizard to connect calendar, Twilio, and Retell.
        </p>
      </section>
    );
  }

  const [overview, usageSeries] = await Promise.all([
    getDashboardOverview(client.id),
    getMonthlyUsageSeries(client.id),
  ]);

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <p className="font-mono-alt text-xs text-[var(--accent-cyan)]">{client.business_name}</p>
        <h1 className="font-display text-4xl text-[var(--text-primary)]">Operations dashboard</h1>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={PhoneCall} label="Calls this month" value={overview.callsThisMonth.toString()} />
        <StatCard icon={CalendarDays} label="Booked jobs" value={overview.bookedJobs.toString()} />
        <StatCard
          icon={TrendingUp}
          label="Pipeline value"
          value={`$${overview.pipelineValue.toLocaleString()}`}
        />
        <StatCard icon={BarChart3} label="Hot leads" value={overview.hotLeads.toString()} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <UsageChart data={usageSeries} />
        <ROICard
          monthlyFee={overview.monthlyFee}
          pipelineValue={overview.pipelineValue}
          roiRatio={overview.roiRatio}
        />
      </section>
    </main>
  );
}
