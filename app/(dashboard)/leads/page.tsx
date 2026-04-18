import { LeadFunnelChart } from "@/components/dashboard/LeadFunnelChart";
import { getAuthenticatedClientContext, getLeadPipeline } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const { client } = await getAuthenticatedClientContext();

  if (!client) {
    return <p className="text-sm text-[var(--text-muted)]">Complete onboarding before viewing lead pipeline.</p>;
  }

  const leads = await getLeadPipeline(client.id, 100);

  return (
    <main className="space-y-6">
      <header>
        <h1 className="font-display text-4xl text-[var(--text-primary)]">Lead pipeline</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">Qualified calls, urgency status, and estimated value.</p>
      </header>

      <LeadFunnelChart leads={leads} />

      <section className="glass-card rounded-2xl p-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-[var(--text-muted)]">
              <tr>
                <th className="py-2">Customer</th>
                <th className="py-2">Job type</th>
                <th className="py-2">Urgency</th>
                <th className="py-2">Tier</th>
                <th className="py-2">Value</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-[var(--border)]">
                  <td className="py-3">{lead.customer_name}</td>
                  <td className="py-3">{lead.job_type}</td>
                  <td className="py-3">{lead.urgency}</td>
                  <td className="py-3">{lead.lead_tier ?? "pending"}</td>
                  <td className="py-3">${Math.round(lead.estimated_value ?? 0).toLocaleString()}</td>
                  <td className="py-3">{lead.booking_status}</td>
                </tr>
              ))}
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-[var(--text-muted)]">
                    No leads have been captured yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
