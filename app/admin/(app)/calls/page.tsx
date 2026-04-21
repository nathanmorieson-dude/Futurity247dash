import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Card, CardLabel } from "@/components/ui/Card";
import { ADMIN_CLIENTS } from "@/lib/mock/admin";
import Link from "next/link";
import { relativeTime } from "@/lib/utils";

export default function AdminCallsPage() {
  const recent = ADMIN_CLIENTS.filter((c) => c.last_call_at)
    .sort(
      (a, b) =>
        new Date(b.last_call_at ?? 0).getTime() -
        new Date(a.last_call_at ?? 0).getTime()
    )
    .slice(0, 10);

  return (
    <>
      <AdminTopbar
        title="Calls"
        subtitle="Portfolio-wide call feed. A consolidated view lands with the Supabase cutover."
      />
      <div className="px-6 py-6 space-y-4">
        <Card>
          <CardLabel>Latest activity</CardLabel>
          <ul className="mt-4 space-y-3 text-sm">
            {recent.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between border-b border-white/[0.04] last:border-0 pb-3 last:pb-0"
              >
                <div>
                  <Link
                    href={`/admin/clients/${c.id}`}
                    className="text-text-primary hover:text-accent-cyan transition-colors"
                  >
                    {c.business_name}
                  </Link>
                  <div className="text-[11px] text-text-dim">
                    {c.owner_name} · {c.suburb}
                  </div>
                </div>
                <div className="text-right text-xs text-text-muted">
                  <div>{c.calls_mtd} calls MTD</div>
                  <div className="text-text-dim">
                    {c.last_call_at
                      ? relativeTime(c.last_call_at)
                      : "no calls yet"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardLabel>Coming with Supabase</CardLabel>
          <p className="text-sm text-text-muted leading-relaxed mt-2">
            A global transcript search, sentiment rollups by client, and an
            emergency-escalation feed land when the Supabase schema ships.
          </p>
        </Card>
      </div>
    </>
  );
}
