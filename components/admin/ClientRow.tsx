import Link from "next/link";
import type { AdminClient } from "@/lib/mock/admin";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatPhone, relativeTime } from "@/lib/utils";
import { PLANS } from "@/lib/pricing";
import { ChevronRight } from "lucide-react";

const statusTone = {
  active: "good",
  trialing: "cyan",
  past_due: "warn",
  canceled: "muted",
  churned: "danger",
} as const;

const statusLabel: Record<AdminClient["status"], string> = {
  active: "Active",
  trialing: "Trialing",
  past_due: "Past due",
  canceled: "Canceled",
  churned: "Churned",
};

const riskTone = {
  low: "good",
  medium: "warn",
  high: "danger",
} as const;

export function ClientRow({ client }: { client: AdminClient }) {
  const plan = PLANS[client.plan];
  const usagePct = Math.min(
    100,
    Math.round((client.minutes_used_mtd / client.minutes_included) * 100)
  );
  const overBy = Math.max(0, client.minutes_used_mtd - client.minutes_included);

  return (
    <Link
      href={`/admin/clients/${client.id}`}
      className="group grid grid-cols-12 gap-3 items-center px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
    >
      <div className="col-span-3 min-w-0">
        <div className="font-medium text-sm truncate text-text-primary">
          {client.business_name}
        </div>
        <div className="text-[11px] text-text-dim truncate">
          {client.owner_name} · {client.suburb}
        </div>
      </div>
      <div className="col-span-2 hidden md:flex items-center gap-2">
        <Badge tone={client.plan === "premium" ? "lime" : "cyan"}>
          {plan.name}
        </Badge>
        <span className="text-xs text-text-muted tabular-nums">
          ${plan.price}
        </span>
      </div>
      <div className="col-span-2 hidden md:block">
        <Badge tone={statusTone[client.status]} dot>
          {statusLabel[client.status]}
        </Badge>
      </div>
      <div className="col-span-3 hidden lg:block">
        <div className="flex items-center justify-between text-[11px] text-text-dim mb-1">
          <span>
            {client.minutes_used_mtd} / {client.minutes_included} min
          </span>
          <span className={overBy ? "text-accent-warn" : "text-text-dim"}>
            {overBy > 0 ? `+${overBy} over` : `${usagePct}%`}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
          <div
            className={
              overBy > 0
                ? "h-full rounded-full bg-gradient-to-r from-accent-cyan via-accent-warn to-accent-warn"
                : "h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-lime"
            }
            style={{ width: `${usagePct}%` }}
          />
        </div>
      </div>
      <div className="col-span-4 md:col-span-2 text-right">
        <div className="text-sm tabular-nums text-text-primary">
          {formatCurrency(client.pipeline_value_mtd)}
        </div>
        <div className="text-[11px] text-text-dim">
          MTD pipeline
        </div>
      </div>
      <div className="col-span-5 md:col-span-1 flex items-center justify-end gap-2">
        <Badge tone={riskTone[client.churn_risk]} className="hidden xl:inline-flex">
          {client.churn_risk}
        </Badge>
        <ChevronRight className="h-4 w-4 text-text-dim group-hover:text-accent-cyan transition-colors" />
      </div>
    </Link>
  );
}

export function ClientStatusBadge({ status }: { status: AdminClient["status"] }) {
  return (
    <Badge tone={statusTone[status]} dot>
      {statusLabel[status]}
    </Badge>
  );
}
