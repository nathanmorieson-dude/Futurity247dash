import type { Metadata } from "next";
import { AmbientBackground } from "@/components/ambient-background";
import { PilotForm } from "@/components/marketing/PilotForm";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Start your 14-day pilot — Futurity247",
  description:
    "Spin up your own Billie agent in under a day. Tell us about your shop and we'll book a 15-minute setup call.",
  alternates: { canonical: "https://futurity247.com.au/pilot" },
};

const CHECKLIST = [
  "Your own dedicated Billie agent, trained on your shop",
  "A dedicated business number customers ring (or forward your existing one)",
  "Google Calendar + SMS confirmations wired up",
  "Emergency escalation to your mobile under 30 seconds",
  "14 days, no credit card, cancel any time",
];

export default function PilotPage({
  searchParams,
}: {
  searchParams?: { plan?: string };
}) {
  const requestedPlan =
    searchParams?.plan === "premium" ? "premium" : "pro";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-white/[0.05] bg-[#0a0e14]/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center">
              <span className="text-display text-xl leading-none">
                Futurity<span className="text-accent-cyan italic">247</span>
              </span>
            </Link>
            <Link
              href="/"
              className="text-xs text-text-muted hover:text-text-primary inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="h-3 w-3" /> Back to home
            </Link>
          </div>
        </header>

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="font-mono-alt text-accent-cyan">
                14-day pilot
              </div>
              <h1 className="text-display text-4xl sm:text-5xl leading-[1.02]">
                Meet the <span className="italic text-accent-cyan">Billie</span>{" "}
                who&apos;ll answer your shop.
              </h1>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                Fill in the form and Marcus will ring you back within one
                business day to walk through setup. Most shops are live and
                taking real calls inside 24 hours.
              </p>
              <ul className="space-y-2 text-sm text-text-muted">
                {CHECKLIST.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-good shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-text-muted leading-relaxed">
                Already have your answers? Call us on{" "}
                <a
                  href="tel:+61405510693"
                  className="text-accent-cyan hover:underline"
                >
                  0405 510 693
                </a>{" "}
                or email{" "}
                <a
                  href="mailto:hello@futurity247.com.au"
                  className="text-accent-cyan hover:underline"
                >
                  hello@futurity247.com.au
                </a>
                . AU business hours, AEST.
              </div>
            </div>

            <div className="lg:col-span-3">
              <PilotForm initialPlan={requestedPlan} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
