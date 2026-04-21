import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ClientRow } from "@/components/admin/ClientRow";
import { ADMIN_CLIENTS } from "@/lib/mock/admin";
import Link from "next/link";

type Filter = "all" | "active" | "trialing" | "past_due" | "risk" | "churned";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "trialing", label: "Trialing" },
  { id: "past_due", label: "Past due" },
  { id: "risk", label: "High risk" },
  { id: "churned", label: "Churned" },
];

export default function AdminClientsPage({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  const active: Filter = (FILTERS.find(
    (f) => f.id === searchParams?.filter
  )?.id ?? "all") as Filter;

  const list = ADMIN_CLIENTS.filter((c) => {
    switch (active) {
      case "active":
        return c.status === "active";
      case "trialing":
        return c.status === "trialing";
      case "past_due":
        return c.status === "past_due";
      case "risk":
        return c.churn_risk === "high" && c.status !== "churned";
      case "churned":
        return c.status === "churned";
      default:
        return true;
    }
  });

  return (
    <>
      <AdminTopbar
        title="Clients"
        subtitle="Every Futurity247 customer. Click a row for usage + billing + agent details."
      />

      <div className="px-6 py-6 space-y-4">
        <Card className="p-0 overflow-hidden animate-fade-in-1">
          <div className="flex items-center justify-between p-5 pb-3">
            <div className="flex items-center gap-2">
              <CardLabel>Portfolio</CardLabel>
              <Badge tone="muted">{list.length}</Badge>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <Link
                  key={f.id}
                  href={f.id === "all" ? "/admin/clients" : `/admin/clients?filter=${f.id}`}
                  className={
                    "h-8 rounded-md border px-3 text-xs transition-colors inline-flex items-center " +
                    (active === f.id
                      ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
                      : "border-white/[0.08] bg-white/[0.02] text-text-muted hover:text-text-primary hover:border-white/20")
                  }
                >
                  {f.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-3 px-4 py-2 text-[10px] uppercase tracking-widest2 text-text-dim border-t border-b border-white/[0.04]">
            <div className="col-span-3">Client</div>
            <div className="col-span-2 hidden md:block">Plan</div>
            <div className="col-span-2 hidden md:block">Status</div>
            <div className="col-span-3 hidden lg:block">Usage (MTD)</div>
            <div className="col-span-4 md:col-span-2 text-right">Pipeline</div>
            <div className="col-span-5 md:col-span-1 text-right">Risk</div>
          </div>
          <div>
            {list.length > 0 ? (
              list.map((c) => <ClientRow key={c.id} client={c} />)
            ) : (
              <div className="text-center text-sm text-text-muted py-16">
                No clients match this filter.
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
