import { notFound } from "next/navigation";
import { getAuthenticatedClientContext, getCallById } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

type CallDetailPageProps = {
  params: { callId: string };
};

export default async function CallDetailPage({ params }: CallDetailPageProps) {
  const { callId } = params;
  const { client } = await getAuthenticatedClientContext();

  if (!client) {
    notFound();
  }

  const call = await getCallById(client.id, callId);
  if (!call) {
    notFound();
  }

  return (
    <main className="space-y-6">
      <header>
        <h1 className="font-display text-4xl text-[var(--text-primary)]">Call detail</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">Outcome: {call.outcome ?? "unknown"}</p>
      </header>

      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <article className="glass-card rounded-2xl p-6">
          <h2 className="font-mono-alt text-xs text-[var(--text-muted)]">Transcript</h2>
          <pre className="mt-4 whitespace-pre-wrap text-sm text-[var(--text-primary)]">{call.transcript ?? "No transcript available."}</pre>
        </article>

        <article className="glass-card rounded-2xl p-6">
          <h2 className="font-mono-alt text-xs text-[var(--text-muted)]">Summary</h2>
          <p className="mt-3 text-sm text-[var(--text-primary)]">{call.summary ?? "No summary available."}</p>
          {call.recording_url ? (
            <audio controls className="mt-4 w-full">
              <source src={call.recording_url} />
            </audio>
          ) : (
            <p className="mt-4 text-xs text-[var(--text-muted)]">No recording attached.</p>
          )}
        </article>
      </section>
    </main>
  );
}
