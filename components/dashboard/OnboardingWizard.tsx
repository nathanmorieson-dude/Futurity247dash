"use client";

import { useState } from "react";

const steps = [
  {
    title: "Business Info",
    body: "Capture legal business name, owner contact, emergency escalation number, and service fee.",
  },
  {
    title: "Calendar Connect",
    body: "Share Google Calendar with Futurity247 service account and confirm booking windows.",
  },
  {
    title: "Twilio Number",
    body: "Provision dedicated call number and configure SMS sender identity.",
  },
  {
    title: "Forwarding Instructions",
    body: "Enable forwarding from existing line and perform live test call with Billie.",
  },
];

export function OnboardingWizard() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="grid gap-4 md:grid-cols-[220px_1fr]">
      <aside className="glass-card rounded-xl p-4">
        <ul className="space-y-2">
          {steps.map((step, index) => (
            <li key={step.title}>
              <button
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                  activeStep === index
                    ? "border border-[var(--accent-cyan)] text-[var(--accent-cyan)]"
                    : "border border-transparent text-[var(--text-muted)]"
                }`}
              >
                {index + 1}. {step.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <article className="glass-card rounded-xl p-6">
        <p className="font-mono-alt text-xs text-[var(--text-muted)]">Step {activeStep + 1}</p>
        <h2 className="mt-3 text-2xl font-display text-[var(--text-primary)]">{steps[activeStep].title}</h2>
        <p className="mt-3 text-sm text-[var(--text-muted)]">{steps[activeStep].body}</p>
      </article>
    </section>
  );
}
