import Link from "next/link";
import { CheckCircle2, PhoneCall, Zap } from "lucide-react";
import { pricingPlans } from "@/lib/pricing";

const highlights = [
  {
    icon: PhoneCall,
    title: "24/7 Call Answering",
    description:
      "Billie answers every inbound call, captures the lead, and routes urgent cases immediately.",
  },
  {
    icon: Zap,
    title: "Electrician-Specific Triage",
    description:
      "Prompts, lead scoring, and emergency logic are tuned for electrical jobs, not generic support scripts.",
  },
  {
    icon: CheckCircle2,
    title: "Calendar + SMS + ROI",
    description:
      "Bookings hit Google Calendar, confirmations are sent over SMS, and monthly ROI stays visible in dashboard.",
  },
];

export default function MarketingHomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16">
      <section className="fade-in-1 grid gap-8 md:grid-cols-[2fr_1fr] md:items-end">
        <div className="space-y-6">
          <p className="font-mono-alt text-xs text-[var(--accent-cyan)]">AI Receptionist for Electricians</p>
          <h1 className="font-display text-5xl leading-tight text-[var(--text-primary)] md:text-6xl">
            Never miss another high-value electrical lead.
          </h1>
          <p className="max-w-2xl text-lg text-[var(--text-muted)]">
            Futurity247 answers calls 24/7, books jobs directly to your calendar, escalates emergencies, and surfaces revenue impact in real time.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg border border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 px-5 py-3 text-sm font-medium text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/20"
            >
              Enter Client Dashboard
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent-cyan)]"
            >
              View Pricing
            </Link>
          </div>
        </div>
        <div className="glass-card fade-in-2 rounded-2xl p-6">
          <p className="font-mono-alt text-xs text-[var(--text-muted)]">Current best fit</p>
          <p className="mt-3 text-3xl font-display text-[var(--text-primary)]">{pricingPlans.pro.monthlyLabel}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            For 2-5 truck shops that need reliable after-hours booking and emergency triage.
          </p>
        </div>
      </section>

      <section className="fade-in-3 grid gap-5 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="glass-card rounded-xl p-5">
            <item.icon className="h-5 w-5 text-[var(--accent-lime)]" />
            <h2 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">{item.title}</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="fade-in-4 glass-card rounded-2xl p-8">
        <p className="font-mono-alt text-xs text-[var(--text-muted)]">The moat</p>
        <p className="mt-3 max-w-3xl text-xl text-[var(--text-primary)]">
          Every integration, prompt, and scoring rule is built for electricians. You own the customer relationship while Billie handles intake, scheduling, and urgency routing.
        </p>
      </section>
    </main>
  );
}
