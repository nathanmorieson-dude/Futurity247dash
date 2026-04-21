"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stage === "submitting") return;
    setStage("submitting");
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body?.message ??
            (res.status === 401
              ? "Wrong password."
              : `Sign-in failed (${res.status}).`)
        );
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setStage("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block">
        <div className="font-mono-alt text-text-dim mb-1.5">Password</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-sm text-text-primary placeholder:text-text-dim outline-none focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/20 transition-colors"
          placeholder="Enter the admin password"
        />
      </label>

      {error ? (
        <div className="flex items-start gap-2 rounded-lg border border-accent-warn/30 bg-accent-warn/5 px-3 py-2.5 text-xs text-accent-warn">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={stage === "submitting" || password.length === 0}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 h-11 px-5 text-sm border",
          stage === "submitting" || password.length === 0
            ? "bg-white/10 text-text-muted border-white/10 cursor-not-allowed"
            : "bg-accent-cyan text-[#0a0e14] border-accent-cyan hover:bg-accent-cyan/90"
        )}
      >
        {stage === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
          </>
        ) : (
          <>Sign in</>
        )}
      </button>
    </form>
  );
}
