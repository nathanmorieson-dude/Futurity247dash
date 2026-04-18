import Link from "next/link";
import { CallRow } from "@/components/dashboard/CallRow";
import { getAuthenticatedClientContext, getRecentCalls } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function CallsPage() {
  const { client } = await getAuthenticatedClientContext();

  if (!client) {
    return <p className="text-sm text-[var(--text-muted)]">Complete onboarding before viewing call logs.</p>;
  }

  const calls = await getRecentCalls(client.id, 50);

  return (
    <main className="space-y-4">
      <header>
        <h1 className="font-display text-4xl text-[var(--text-primary)]">Call history</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">Every inbound call with transcript and outcome.</p>
      </header>

      <section className="glass-card rounded-2xl p-4">
        <div className="space-y-3">
          {calls.map((call) => (
            <Link key={call.id} href={`/calls/${call.id}`}>
              <CallRow call={call} />
            </Link>
          ))}
          {calls.length === 0 ? (
            <p className="px-2 py-6 text-sm text-[var(--text-muted)]">No calls captured yet.</p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
