import { OnboardingWizard } from "@/components/dashboard/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <main className="space-y-6">
      <header>
        <h1 className="font-display text-4xl text-[var(--text-primary)]">Client onboarding wizard</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Four-step setup: business profile, calendar connect, Twilio number, and forwarding instructions.
        </p>
      </header>
      <OnboardingWizard />
    </main>
  );
}
