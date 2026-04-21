"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANS } from "@/lib/pricing";
import { Badge } from "@/components/ui/Badge";

type Plan = "pro" | "premium";
type TeamSize = "solo" | "2-3" | "4-10" | "10+";
type Stage = "form" | "submitting" | "ok" | "error";

interface FieldErrors {
  [key: string]: string[] | undefined;
}

export function PilotForm({ initialPlan = "pro" }: { initialPlan?: Plan }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [suburb, setSuburb] = useState("");
  const [teamSize, setTeamSize] = useState<TeamSize>("solo");
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [hearAboutUs, setHearAboutUs] = useState("");
  const [notes, setNotes] = useState("");

  const [stage, setStage] = useState<Stage>("form");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stage === "submitting") return;
    setErrorMsg(null);
    setFieldErrors({});
    setStage("submitting");

    try {
      const res = await fetch("/api/leads/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          business_name: businessName,
          email,
          phone,
          suburb,
          team_size: teamSize,
          plan,
          hear_about_us: hearAboutUs,
          notes,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (body?.issues?.fieldErrors) {
          setFieldErrors(body.issues.fieldErrors as FieldErrors);
        }
        throw new Error(
          body?.message ??
            body?.error ??
            `Couldn't submit — server returned ${res.status}.`
        );
      }
      setStage("ok");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg);
      setStage("error");
    }
  };

  if (stage === "ok") {
    return (
      <div className="glass rounded-2xl p-8 text-center space-y-4 animate-fade-in-1">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-accent-good/10 ring-1 ring-accent-good/40">
          <CheckCircle2 className="h-7 w-7 text-accent-good" />
        </div>
        <div className="text-display text-2xl">
          You&apos;re on the list, {firstName || "there"}.
        </div>
        <p className="text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
          Nathan will ring you on{" "}
          <span className="text-text-primary">{phone || "the number you gave us"}</span>{" "}
          within one business day. Usually faster. In the meantime, keep an eye
          on <span className="text-text-primary">{email}</span> for setup
          instructions.
        </p>
        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs text-accent-cyan hover:underline"
          >
            Back to home →
          </a>
        </div>
      </div>
    );
  }

  const selectedPlan = PLANS[plan];

  return (
    <form
      onSubmit={onSubmit}
      className="glass rounded-2xl p-5 sm:p-6 space-y-5"
      noValidate
    >
      <div className="flex items-center justify-between">
        <Badge tone="cyan" dot>
          30 days · No lock-in
        </Badge>
        <div className="text-[10px] uppercase tracking-widest2 text-text-dim">
          {selectedPlan.name} plan
        </div>
      </div>

      <Fieldset label="Plan">
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(PLANS) as Plan[]).map((p) => {
            const meta = PLANS[p];
            const active = plan === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPlan(p)}
                className={cn(
                  "text-left rounded-lg border px-3 py-2.5 transition-colors",
                  active
                    ? "border-accent-cyan/50 bg-accent-cyan/[0.06]"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                )}
              >
                <div
                  className={cn(
                    "font-mono-alt",
                    active ? "text-accent-cyan" : "text-text-dim"
                  )}
                >
                  {meta.name}
                </div>
                <div className="text-display text-lg mt-0.5">
                  ${meta.price}
                  <span className="text-xs text-text-muted ml-1 font-sans">
                    / mo
                  </span>
                </div>
                <div className="text-[11px] text-text-dim mt-0.5">
                  {meta.target}
                </div>
              </button>
            );
          })}
        </div>
      </Fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label="First name"
          value={firstName}
          onChange={setFirstName}
          placeholder="Your first name"
          autoComplete="given-name"
          error={fieldErrors.first_name?.[0]}
          required
        />
        <Field
          label="Last name"
          value={lastName}
          onChange={setLastName}
          placeholder="Your last name"
          autoComplete="family-name"
          error={fieldErrors.last_name?.[0]}
          required
        />
      </div>

      <Field
        label="Business name"
        value={businessName}
        onChange={setBusinessName}
        placeholder="Your business name"
        autoComplete="organization"
        error={fieldErrors.business_name?.[0]}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="marcus@yourshop.com.au"
          autoComplete="email"
          error={fieldErrors.email?.[0]}
          required
        />
        <Field
          label="Mobile"
          type="tel"
          value={phone}
          onChange={setPhone}
          placeholder="0412 345 678"
          autoComplete="tel"
          error={fieldErrors.phone?.[0]}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label="Suburb"
          value={suburb}
          onChange={setSuburb}
          placeholder="Brisbane CBD, Toowong, Paddington…"
          autoComplete="address-level2"
          error={fieldErrors.suburb?.[0]}
          required
        />
        <Fieldset label="Team size">
          <select
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value as TeamSize)}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/20 transition-colors"
          >
            <option value="solo">Solo sparky</option>
            <option value="2-3">2 – 3 utes</option>
            <option value="4-10">4 – 10 utes</option>
            <option value="10+">10+ utes / commercial</option>
          </select>
        </Fieldset>
      </div>

      <Field
        label="How did you hear about us?"
        value={hearAboutUs}
        onChange={setHearAboutUs}
        placeholder="Google, a mate, Instagram, etc. (optional)"
        error={fieldErrors.hear_about_us?.[0]}
      />

      <Fieldset label="Anything Billie should know? (optional)">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Typical jobs, after-hours preferences, existing CRM, etc."
          rows={3}
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-sm text-text-primary placeholder:text-text-dim outline-none focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/20 transition-colors resize-none"
          maxLength={2000}
        />
      </Fieldset>

      {stage === "error" && errorMsg ? (
        <div className="flex items-start gap-2 rounded-lg border border-accent-warn/30 bg-accent-warn/5 px-3 py-2.5 text-xs text-accent-warn">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={stage === "submitting"}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 h-12 px-5 text-sm border",
          stage === "submitting"
            ? "bg-white/10 text-text-muted border-white/10 cursor-not-allowed"
            : "bg-accent-cyan text-[#0a0e14] border-accent-cyan hover:bg-accent-cyan/90"
        )}
      >
        {stage === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>Start my 30-day pilot</>
        )}
      </button>

      <div className="text-[11px] text-text-dim text-center leading-relaxed">
        By submitting you agree Nathan can ring or SMS you about Futurity247. No
        marketing spam. AU privacy principles apply. You can cancel the pilot
        any time during the trial, no lock-in.
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  required,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <Fieldset label={label} error={error}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={cn(
          "w-full rounded-lg border bg-white/[0.02] px-3 py-2.5 text-sm text-text-primary placeholder:text-text-dim outline-none focus:ring-2 focus:ring-accent-cyan/20 transition-colors",
          error
            ? "border-accent-warn/50 focus:border-accent-warn/70"
            : "border-white/[0.08] focus:border-accent-cyan/50"
        )}
      />
    </Fieldset>
  );
}

function Fieldset({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="font-mono-alt text-text-dim mb-1.5">{label}</div>
      {children}
      {error ? (
        <div className="mt-1 text-[11px] text-accent-warn">{error}</div>
      ) : null}
    </label>
  );
}
