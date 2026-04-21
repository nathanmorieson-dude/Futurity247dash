import Link from "next/link";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  ADMIN_CLIENTS,
  failedPayments,
  portfolioTotals,
  upcomingInvoices,
} from "@/lib/mock/admin";
import { PLANS } from "@/lib/pricing";
import { formatCurrency, relativeTime, shortDate } from "@/lib/utils";
import { ArrowRight, CreditCard } from "lucide-react";

export default function AdminBillingPage() {
  const t = portfolioTotals();
  const failed = failedPayments();
  const upcoming = upcomingInvoices().slice(0, 8);

  return (
    <>
      <AdminTopbar
        title="Billing"
        subtitle="Stripe-shaped view of the portfolio. Live Stripe wiring is next up."
      />

      <div className="px-6 py-6 space-y-6">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 animate-fade-in-1">
          <StatCard
            label="MRR"
            value={formatCurrency(t.mrr)}
            accent="cyan"
            delta={12.4}
            hint="Recurring on active + past-due"
          />
          <StatCard
            label="ARR (run-rate)"
            value={formatCurrency(t.arr)}
            accent="lime"
          />
          <StatCard
            label="Overage · MTD"
            value={formatCurrency(t.overageRevenue)}
            accent="good"
            hint={`${t.overageMinutes.toLocaleString()} min over`}
          />
          <StatCard
            label="Failed payments"
            value={failed.length.toString()}
            accent="warn"
            hint="Retry automatically; escalate after 2 days"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 animate-fade-in-2">
          <Card className="p-0 overflow-hidden xl:col-span-2">
            <div className="flex items-center justify-between p-5 pb-3">
              <div>
                <CardLabel>Upcoming renewals</CardLabel>
                <div className="text-display text-xl mt-1">
                  Next 30 days
                </div>
              </div>
              <Link
                href="/admin/clients"
                className="text-xs text-text-muted hover:text-accent-cyan inline-flex items-center gap-1"
              >
                All clients <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-12 gap-3 px-4 py-2 text-[10px] uppercase tracking-widest2 text-text-dim border-t border-b border-white/[0.04]">
              <div className="col-span-4">Client</div>
              <div className="col-span-3 hidden md:block">Plan</div>
              <div className="col-span-3">Renews</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            {upcoming.map((u) => {
              const plan = PLANS[u.client.plan];
              return (
                <Link
                  key={u.client.id}
                  href={`/admin/clients/${u.client.id}`}
                  className="grid grid-cols-12 gap-3 items-center px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                >
                  <div className="col-span-4 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">
                      {u.client.business_name}
                    </div>
                    <div className="text-[11px] text-text-dim truncate">
                      {u.client.suburb}
                    </div>
                  </div>
                  <div className="col-span-3 hidden md:block">
                    <Badge tone={u.client.plan === "premium" ? "lime" : "cyan"}>
                      {plan.name}
                    </Badge>
                  </div>
                  <div className="col-span-3 text-sm text-text-primary">
                    <div>{shortDate(u.date)}</div>
                    <div className="text-[11px] text-text-dim">
                      {relativeTime(u.date)}
                    </div>
                  </div>
                  <div className="col-span-2 text-right text-sm tabular-nums">
                    {formatCurrency(u.amount)}
                  </div>
                </Link>
              );
            })}
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <CardLabel>Failed payments</CardLabel>
              <Badge tone="warn" dot>
                {failed.length}
              </Badge>
            </div>
            {failed.length === 0 ? (
              <div className="text-sm text-text-muted py-6 text-center">
                No failed payments right now. 🎯 would normally go here but you
                asked nicely.
              </div>
            ) : (
              <ul className="space-y-3 text-sm">
                {failed.map((c) => (
                  <li
                    key={c.id}
                    className="rounded-lg border border-accent-warn/25 bg-accent-warn/[0.04] p-3"
                  >
                    <Link
                      href={`/admin/clients/${c.id}`}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-text-primary">
                          {c.business_name}
                        </div>
                        <div className="text-[11px] text-text-dim">
                          {c.owner_name} · {PLANS[c.plan].name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-accent-warn tabular-nums">
                          {formatCurrency(c.next_invoice_amount)}
                        </div>
                        <div className="text-[11px] text-text-dim">
                          Past due
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <Card className="animate-fade-in-3">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-4 w-4 text-text-muted" />
            <CardLabel>Stripe wiring · not live yet</CardLabel>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            These numbers come from the portfolio mock. When Stripe is wired in
            the next commit this view will read from the real API — same
            components, same layout. Expect{" "}
            <code className="text-accent-cyan">customer.subscription.updated</code>,{" "}
            <code className="text-accent-cyan">invoice.payment_failed</code>, and{" "}
            <code className="text-accent-cyan">invoice.paid</code> webhooks to
            populate the Past-Due and Upcoming panels.
          </p>
        </Card>
      </div>
    </>
  );
}
