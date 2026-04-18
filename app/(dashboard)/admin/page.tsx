import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getServerEnv } from "@/lib/env";
import { getAuthenticatedClientContext } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { session } = await getAuthenticatedClientContext();
  const env = getServerEnv();

  const allowlist = env.ADMIN_EMAIL_ALLOWLIST
    ? env.ADMIN_EMAIL_ALLOWLIST.split(",").map((entry) => entry.trim().toLowerCase())
    : [];

  const email = session?.user.email?.toLowerCase() ?? "";
  const isAdmin = allowlist.includes(email);

  if (!isAdmin) {
    return (
      <main className="glass-card rounded-2xl p-6">
        <h1 className="font-display text-3xl">Admin access required</h1>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Add your account to ADMIN_EMAIL_ALLOWLIST to enable the internal control panel.
        </p>
      </main>
    );
  }

  const supabase = createAdminSupabaseClient();
  const [clientsRes, callsRes, leadsRes] = await Promise.all([
    supabase.from("clients").select("id, business_name, pricing_plan, created_at").order("created_at", { ascending: false }),
    supabase.from("calls").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }),
  ]);

  return (
    <main className="space-y-6">
      <header>
        <h1 className="font-display text-4xl text-[var(--text-primary)]">Internal admin panel</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="glass-card rounded-xl p-4">
          <p className="font-mono-alt text-xs text-[var(--text-muted)]">Clients</p>
          <p className="mt-2 text-3xl font-display">{clientsRes.data?.length ?? 0}</p>
        </article>
        <article className="glass-card rounded-xl p-4">
          <p className="font-mono-alt text-xs text-[var(--text-muted)]">Calls logged</p>
          <p className="mt-2 text-3xl font-display">{callsRes.count ?? 0}</p>
        </article>
        <article className="glass-card rounded-xl p-4">
          <p className="font-mono-alt text-xs text-[var(--text-muted)]">Leads captured</p>
          <p className="mt-2 text-3xl font-display">{leadsRes.count ?? 0}</p>
        </article>
      </section>

      <section className="glass-card rounded-2xl p-4">
        <h2 className="font-mono-alt text-xs text-[var(--text-muted)]">Newest clients</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="text-[var(--text-muted)]">
              <tr>
                <th className="py-2">Business</th>
                <th className="py-2">Plan</th>
                <th className="py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {(clientsRes.data ?? []).map((client) => (
                <tr key={client.id} className="border-t border-[var(--border)]">
                  <td className="py-3">{client.business_name}</td>
                  <td className="py-3 capitalize">{client.pricing_plan}</td>
                  <td className="py-3">{new Date(client.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
