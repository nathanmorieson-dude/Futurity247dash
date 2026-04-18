import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { getAuthenticatedClientContext } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const { client } = await getAuthenticatedClientContext();

  if (!client) {
    return <p className="text-sm text-[var(--text-muted)]">Complete onboarding before changing settings.</p>;
  }

  return (
    <main className="space-y-6">
      <header>
        <h1 className="font-display text-4xl text-[var(--text-primary)]">Business settings</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">Configure hours, service fee, and escalation contacts.</p>
      </header>

      <SettingsForm client={client} />
    </main>
  );
}
