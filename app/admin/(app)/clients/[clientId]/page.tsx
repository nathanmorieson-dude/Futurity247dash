import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarClock,
  Headphones,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ClientStatusBadge } from "@/components/admin/ClientRow";
import { ADMIN_CLIENTS, getAdminClient } from "@/lib/mock/admin";
import { PLANS } from "@/lib/pricing";
import {
  formatCurrency,
  formatPhone,
  relativeTime,
  shortDate,
  timeOfDay,
} from "@/lib/utils";

export function generateStaticParams() {
  return ADMIN_CLIENTS.map((c) => ({ clientId: c.id }));
}

export default function AdminClientDetail({
  params,
}: {
  params: { clientId: string };
}) {
  const client = getAdminClient(params.clientId);
  if (!client) notFound();

  const plan = PLANS[client.plan];
  const overBy = Math.max(
    0,
    client.minutes_used_mtd - client.minutes_included
  );
  const overageAmt = overBy * plan.overage;

  return (
    <>
      <AdminTopbar
        title={client.business_name}
        subtitle={`${client.owner_name} · ${client.suburb} · since ${shortDate(client.active_since)}`}
      />

      <div className="px-6 py-6 space-y-6">
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-accent-cyan"
        >
          <ArrowLeft className="h-3 w-3" /> All clients
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 space-y-4 animate-fade-in-1">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <CardLabel>Account</CardLabel>
                <div className="flex items-center gap-2">
                  <Badge tone={client.plan === "premium" ? "lime" : "cyan"}>
                    {plan.name}
                  </Badge>
                  <ClientStatusBadge status={client.status} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <Detail
                  icon={<Mail className="h-3.5 w-3.5" />}
                  label="Owner email"
                  value={client.owner_email}
                />
                <Detail
                  icon={<Phone className="h-3.5 w-3.5" />}
                  label="Owner mobile"
                  value={formatPhone(client.phone)}
                />
                <Detail
                  icon={<MapPin className="h-3.5 w-3.5" />}
                  label="Suburb"
                  value={client.suburb}
                />
                <Detail
                  icon={<CalendarClock className="h-3.5 w-3.5" />}
                  label="Active since"
                  value={shortDate(client.active_since)}
                  hint={relativeTime(client.active_since)}
                />
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <CardLabel>Usage · MTD</CardLabel>
                <div className="text-xs text-text-muted">
                  {client.minutes_used_mtd} of {client.minutes_included} included
                </div>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
                <div
                  className={
                    overBy > 0
                      ? "h-full rounded-full bg-gradient-to-r from-accent-cyan via-accent-warn to-accent-warn"
                      : "h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-lime"
                  }
                  style={{
                    width: `${Math.min(100, (client.minutes_used_mtd / client.minutes_included) * 100)}%`,
                  }}
                />
              </div>
              <div className="grid grid-cols-4 gap-3 mt-5">
                <Stat label="Calls" value={client.calls_mtd.toString()} />
                <Stat label="Bookings" value={client.bookings_mtd.toString()} />
                <Stat
                  label="Pipeline"
                  value={formatCurrency(client.pipeline_value_mtd)}
                  accent="cyan"
                />
                <Stat
                  label="Closed"
                  value={formatCurrency(client.revenue_closed_mtd)}
                  accent="good"
                />
              </div>
              {overBy > 0 ? (
                <div className="mt-5 rounded-lg border border-accent-warn/30 bg-accent-warn/5 px-3 py-2.5 text-xs text-accent-warn leading-relaxed flex items-start gap-2">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                  Currently{" "}
                  <span className="font-semibold">
                    {overBy} minutes over
                  </span>{" "}
                  included bucket · overage invoice{" "}
                  <span className="font-semibold">
                    {formatCurrency(overageAmt)}
                  </span>{" "}
                  will be added to next month&apos;s renewal.
                </div>
              ) : null}
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-3">
                <CardLabel>Billing</CardLabel>
                <Badge tone={client.status === "past_due" ? "warn" : "good"} dot>
                  Stripe
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <Detail
                  label="Stripe customer"
                  value={client.stripe_customer_id}
                  mono
                />
                <Detail
                  label="Subscription"
                  value={client.stripe_subscription_id ?? "—"}
                  mono
                />
                <Detail
                  label="Next invoice"
                  value={`${formatCurrency(client.next_invoice_amount)} on ${shortDate(client.next_invoice_at)}`}
                  hint={relativeTime(client.next_invoice_at)}
                />
                <Detail
                  label="Last payment"
                  value={
                    client.last_payment_at
                      ? `${formatCurrency(client.last_payment_amount ?? 0)} · ${shortDate(client.last_payment_at)}`
                      : "—"
                  }
                  hint={
                    client.last_payment_failed
                      ? "Failed · retry pending"
                      : client.last_payment_at
                        ? relativeTime(client.last_payment_at)
                        : undefined
                  }
                  tone={client.last_payment_failed ? "warn" : undefined}
                />
              </div>
            </Card>
          </div>

          <div className="space-y-4 animate-fade-in-2">
            <Card>
              <div className="flex items-center justify-between mb-3">
                <CardLabel>Billie agent</CardLabel>
                <Badge tone="cyan" dot>
                  Online
                </Badge>
              </div>
              <div className="space-y-3 text-sm">
                <Detail
                  icon={<Headphones className="h-3.5 w-3.5" />}
                  label="Retell agent ID"
                  value={client.retell_agent_id}
                  mono
                />
                <Detail
                  label="Last call"
                  value={
                    client.last_call_at
                      ? `${shortDate(client.last_call_at)} · ${timeOfDay(client.last_call_at)}`
                      : "—"
                  }
                  hint={
                    client.last_call_at ? relativeTime(client.last_call_at) : undefined
                  }
                />
                <Detail
                  label="Emergencies handled MTD"
                  value={client.emergencies_mtd.toString()}
                />
              </div>
            </Card>

            <Card>
              <CardLabel>Plan summary</CardLabel>
              <div className="text-display text-4xl mt-3">
                {formatCurrency(plan.price)}
                <span className="text-sm text-text-muted ml-2 font-sans">
                  / month
                </span>
              </div>
              <div className="text-xs text-text-muted mt-1">{plan.target}</div>
              <ul className="mt-4 space-y-1.5 text-xs text-text-muted">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Sparkles className="h-3 w-3 shrink-0 mt-0.5 text-accent-cyan" />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function Detail({
  icon,
  label,
  value,
  hint,
  mono,
  tone,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  mono?: boolean;
  tone?: "warn";
}) {
  return (
    <div>
      <div className="font-mono-alt text-text-dim mb-1 flex items-center gap-1.5">
        {icon}
        {label}
      </div>
      <div
        className={
          (mono ? "font-mono text-xs break-all " : "text-sm ") +
          (tone === "warn" ? "text-accent-warn" : "text-text-primary")
        }
      >
        {value}
      </div>
      {hint ? (
        <div className="text-[11px] text-text-dim mt-0.5">{hint}</div>
      ) : null}
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "cyan" | "good";
}) {
  return (
    <div>
      <div className="font-mono-alt text-text-dim">{label}</div>
      <div
        className={
          "text-display text-xl mt-1 " +
          (accent === "cyan"
            ? "text-accent-cyan"
            : accent === "good"
              ? "text-accent-good"
              : "text-text-primary")
        }
      >
        {value}
      </div>
    </div>
  );
}
