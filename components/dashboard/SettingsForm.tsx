"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ClientRecord } from "@/lib/supabase/types";

const settingsSchema = z.object({
  business_hours_start: z.string().min(4),
  business_hours_end: z.string().min(4),
  service_call_fee: z.number().min(0),
  emergency_contact_phone: z.string().min(10),
});

type SettingsValues = z.infer<typeof settingsSchema>;

type SettingsFormProps = {
  client: ClientRecord;
};

export function SettingsForm({ client }: SettingsFormProps) {
  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      business_hours_start: client.business_hours_start ?? "08:00",
      business_hours_end: client.business_hours_end ?? "17:00",
      service_call_fee: client.service_call_fee ?? 99,
      emergency_contact_phone: client.owner_phone ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const response = await fetch("/api/clients/settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      form.setError("root", { message: payload?.error ?? "Failed to update settings." });
      return;
    }

    form.clearErrors();
  });

  return (
    <form onSubmit={onSubmit} className="glass-card max-w-xl space-y-4 rounded-2xl p-6">
      <div>
        <label className="mb-1 block text-xs text-[var(--text-muted)]">Business hours start</label>
        <input className="w-full rounded-lg border bg-transparent px-3 py-2" {...form.register("business_hours_start")} />
      </div>

      <div>
        <label className="mb-1 block text-xs text-[var(--text-muted)]">Business hours end</label>
        <input className="w-full rounded-lg border bg-transparent px-3 py-2" {...form.register("business_hours_end")} />
      </div>

      <div>
        <label className="mb-1 block text-xs text-[var(--text-muted)]">Service call fee</label>
        <input
          type="number"
          className="w-full rounded-lg border bg-transparent px-3 py-2"
          {...form.register("service_call_fee", { valueAsNumber: true })}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-[var(--text-muted)]">Emergency contact phone</label>
        <input className="w-full rounded-lg border bg-transparent px-3 py-2" {...form.register("emergency_contact_phone")} />
      </div>

      {form.formState.errors.root ? (
        <p className="text-sm text-[var(--accent-warn)]">{form.formState.errors.root.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="rounded-lg border border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 px-4 py-2 text-sm text-[var(--accent-cyan)]"
      >
        {form.formState.isSubmitting ? "Saving..." : "Save settings"}
      </button>
    </form>
  );
}
