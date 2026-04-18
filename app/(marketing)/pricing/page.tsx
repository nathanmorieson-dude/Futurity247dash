import Link from "next/link";
import { pricingPlanList } from "@/lib/pricing";

export default function PricingPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <header className="fade-in-1 space-y-4">
        <p className="font-mono-alt text-xs text-[var(--accent-cyan)]">Pricing</p>
        <h1 className="font-display text-5xl text-[var(--text-primary)]">Transparent monthly plans.</h1>
        <p className="max-w-2xl text-[var(--text-muted)]">
          Pick a plan based on call volume. Overage minutes are metered automatically through Stripe.
        </p>
      </header>

      <section className="fade-in-2 grid gap-5 md:grid-cols-3">
        {pricingPlanList.map((plan) => (
          <article key={plan.id} className="glass-card rounded-xl p-6">
            <p className="font-mono-alt text-xs text-[var(--text-muted)]">{plan.target}</p>
            <h2 className="mt-3 text-2xl font-display text-[var(--text-primary)]">{plan.name}</h2>
            <p className="mt-2 text-lg text-[var(--accent-cyan)]">{plan.monthlyLabel}</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
              <li>{plan.includedMinutes} included minutes</li>
              <li>{plan.overageLabel} overage</li>
            </ul>
          </article>
        ))}
      </section>

      <div className="fade-in-3">
        <Link
          href="/auth/login"
          className="rounded-lg border border-[var(--accent-lime)] bg-[var(--accent-lime)]/10 px-5 py-3 text-sm font-medium text-[var(--accent-lime)] hover:bg-[var(--accent-lime)]/20"
        >
          Start onboarding
        </Link>
      </div>
    </main>
  );
}
