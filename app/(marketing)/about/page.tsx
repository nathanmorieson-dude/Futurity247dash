export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <header className="fade-in-1 space-y-4">
        <p className="font-mono-alt text-xs text-[var(--accent-cyan)]">About Futurity247</p>
        <h1 className="font-display text-5xl text-[var(--text-primary)]">Purpose-built for electrician growth.</h1>
      </header>

      <section className="fade-in-2 glass-card rounded-xl p-6 text-[var(--text-muted)]">
        <p>
          Futurity247 exists to help electrical contractors capture every qualified lead without expanding admin headcount. Billie answers every call, keeps conversations short, and pushes the correct next action: booked appointment, emergency escalation, or owner follow-up.
        </p>
        <p className="mt-4">
          Our architecture is intentionally vertical: Retell voice agent, Twilio telephony, Google Calendar booking, and Supabase analytics tuned for electrical workflows.
        </p>
      </section>
    </main>
  );
}
