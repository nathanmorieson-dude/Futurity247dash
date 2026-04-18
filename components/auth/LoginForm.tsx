"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    setMessage(null);

    const response = await fetch("/api/auth/magic-link", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = (await response.json().catch(() => null)) as { error?: string; message?: string } | null;

    if (!response.ok) {
      setError(payload?.error ?? "Unable to send magic link.");
      return;
    }

    setMessage(payload?.message ?? "Check your email for sign in link.");
  });

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs text-[var(--text-muted)]">Email</span>
          <input
            type="email"
            className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm"
            placeholder="owner@shop.com"
            {...form.register("email")}
          />
        </label>
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full rounded-lg border border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 px-4 py-2 text-sm font-medium text-[var(--accent-cyan)]"
        >
          {form.formState.isSubmitting ? "Sending..." : "Send magic link"}
        </button>
      </form>

      <form action="/api/auth/google" method="post">
        <button
          type="submit"
          className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-primary)] hover:border-[var(--accent-cyan)]"
        >
          Continue with Google
        </button>
      </form>

      {message ? <p className="text-sm text-[var(--accent-good)]">{message}</p> : null}
      {error ? <p className="text-sm text-[var(--accent-warn)]">{error}</p> : null}
    </div>
  );
}
