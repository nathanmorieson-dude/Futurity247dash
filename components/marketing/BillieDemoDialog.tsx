"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PhoneOff, X, Mic, AlertTriangle, Loader2 } from "lucide-react";
import { RetellWebClient } from "retell-client-js-sdk";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type TranscriptEntry = { role: "agent" | "user"; content: string };

type Stage = "form" | "connecting" | "connected" | "ended" | "error";

export function BillieDemoDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [stage, setStage] = useState<Stage>("form");
  const [callerName, setCallerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [agentTalking, setAgentTalking] = useState(false);
  const [micLevel, setMicLevel] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const clientRef = useRef<RetellWebClient | null>(null);
  const tickRef = useRef<number | null>(null);

  const reset = useCallback(() => {
    setStage("form");
    setError(null);
    setTranscript([]);
    setAgentTalking(false);
    setMicLevel(0);
    setElapsed(0);
  }, []);

  const stopCall = useCallback(() => {
    if (clientRef.current) {
      try {
        clientRef.current.stopCall();
      } catch {
        // ignore
      }
      clientRef.current = null;
    }
    if (tickRef.current) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!open) {
      stopCall();
      reset();
    }
    return () => stopCall();
  }, [open, stopCall, reset]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const startCall = useCallback(async () => {
    const name = callerName.trim();
    const biz = businessName.trim();
    console.log("[BillieDemoDialog] startCall clicked", { name, biz });
    if (!name || !biz) return;

    setStage("connecting");
    setError(null);
    setTranscript([]);
    setElapsed(0);

    try {
      console.log("[BillieDemoDialog] requesting access_token…");
      const res = await fetch("/api/retell/web-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caller_name: name,
          business_name: biz,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg =
          body?.message ??
          body?.error ??
          `Server returned ${res.status}. Check server logs.`;
        throw new Error(msg);
      }

      const { access_token, call_id } = (await res.json()) as {
        access_token: string;
        call_id?: string;
      };
      console.log("[BillieDemoDialog] got access_token; starting WebRTC…", {
        call_id,
      });

      const client = new RetellWebClient();
      clientRef.current = client;

      client.on("call_started", () => {
        setStage("connected");
        tickRef.current = window.setInterval(
          () => setElapsed((s) => s + 1),
          1000
        );
      });

      client.on("call_ended", () => {
        stopCall();
        setStage("ended");
      });

      client.on("error", (err: unknown) => {
        const msg =
          (err as { message?: string })?.message ??
          (typeof err === "string" ? err : "Call failed unexpectedly.");
        console.warn("Retell web-client error:", err);
        stopCall();
        setError(msg);
        setStage("error");
      });

      client.on("agent_start_talking", () => setAgentTalking(true));
      client.on("agent_stop_talking", () => setAgentTalking(false));

      client.on(
        "update",
        (update: {
          transcript?: TranscriptEntry[];
          [key: string]: unknown;
        }) => {
          if (Array.isArray(update.transcript)) {
            setTranscript(
              update.transcript.map((t) => ({
                role: t.role,
                content: t.content ?? "",
              }))
            );
          }
        }
      );

      client.on(
        "audio",
        (audio: Float32Array | Int16Array | Uint8Array | number[]) => {
          // Not all SDK versions emit this shape; if they do, compute RMS
          // across the buffer for a simple mic-level meter.
          try {
            let sum = 0;
            const len = (audio as ArrayLike<number>).length ?? 0;
            if (!len) return;
            for (let i = 0; i < len; i++) {
              const v = (audio as ArrayLike<number>)[i];
              sum += v * v;
            }
            const rms = Math.sqrt(sum / len);
            setMicLevel(Math.min(1, rms * 2));
          } catch {
            // no-op
          }
        }
      );

      await client.startCall({
        accessToken: access_token,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Start-call failed:", msg);
      setError(msg);
      setStage("error");
    }
  }, [callerName, businessName, stopCall]);

  const hangUp = useCallback(() => {
    stopCall();
    setStage("ended");
  }, [stopCall]);

  if (!open) return null;

  const canStart = callerName.trim().length > 0 && businessName.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 animate-fade-in-1"
      role="dialog"
      aria-modal="true"
      aria-label="Talk to Billie demo"
    >
      <button
        className="absolute inset-0 bg-base/70 backdrop-blur-sm"
        aria-label="Close demo"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-card-solid/95 shadow-[0_30px_80px_-30px_rgba(34,211,238,0.25)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-cyan/30 to-accent-lime/20 ring-1 ring-accent-cyan/40",
                  agentTalking && "animate-pulse-dot"
                )}
              >
                <span className="text-display text-lg text-accent-cyan">B</span>
              </div>
              {stage === "connected" ? (
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent-good ring-4 ring-accent-good/20" />
              ) : null}
            </div>
            <div className="leading-tight">
              <div className="text-display text-lg">Talk to Billie</div>
              <div className="text-[10px] uppercase tracking-widest2 text-text-dim">
                {stage === "form" && "Live web-call demo"}
                {stage === "connecting" && "Connecting…"}
                {stage === "connected" && `In call · ${formatDuration(elapsed)}`}
                {stage === "ended" && "Call ended"}
                {stage === "error" && "Call failed"}
              </div>
            </div>
          </div>
          <button
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-text-muted interactive-border"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {stage === "form" ? (
          <FormStep
            callerName={callerName}
            setCallerName={setCallerName}
            businessName={businessName}
            setBusinessName={setBusinessName}
            canStart={canStart}
            onStart={startCall}
          />
        ) : null}

        {stage === "connecting" ? (
          <div className="px-6 py-10 flex flex-col items-center gap-3 text-center">
            <Loader2 className="h-6 w-6 text-accent-cyan animate-spin" />
            <div className="text-sm text-text-primary">
              Connecting you to Billie…
            </div>
            <div className="text-xs text-text-dim">
              Allow microphone access when your browser asks.
            </div>
          </div>
        ) : null}

        {stage === "connected" ? (
          <ConnectedStep
            agentTalking={agentTalking}
            micLevel={micLevel}
            transcript={transcript}
            callerName={callerName}
            businessName={businessName}
            onHangUp={hangUp}
          />
        ) : null}

        {stage === "ended" ? (
          <EndedStep onRestart={reset} onClose={onClose} />
        ) : null}

        {stage === "error" ? (
          <ErrorStep error={error} onRetry={reset} onClose={onClose} />
        ) : null}
      </div>
    </div>
  );
}

function formatDuration(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

function FormStep({
  callerName,
  setCallerName,
  businessName,
  setBusinessName,
  canStart,
  onStart,
}: {
  callerName: string;
  setCallerName: (v: string) => void;
  businessName: string;
  setBusinessName: (v: string) => void;
  canStart: boolean;
  onStart: () => void;
}) {
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && canStart) {
      e.preventDefault();
      onStart();
    }
  };

  return (
    <div className="px-5 py-5 space-y-4">
      <p className="text-sm text-text-muted leading-relaxed">
        Billie will call you as if she were answering the phone at your shop.
        Tell us who you are and what your business is called — she&apos;ll use
        your details during the call.
      </p>

      <label className="block">
        <div className="font-mono-alt text-text-dim mb-1.5">Your name</div>
        <input
          autoFocus
          type="text"
          value={callerName}
          onChange={(e) => setCallerName(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Marcus"
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-sm text-text-primary placeholder:text-text-dim outline-none focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/20 transition-colors"
          maxLength={120}
        />
      </label>

      <label className="block">
        <div className="font-mono-alt text-text-dim mb-1.5">
          Business name
        </div>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Keystone Electric"
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-sm text-text-primary placeholder:text-text-dim outline-none focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/20 transition-colors"
          maxLength={120}
        />
      </label>

      <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[11px] text-text-dim">
        <Mic className="h-3.5 w-3.5 shrink-0" />
        Uses your mic. Audio runs peer-to-peer through Retell — we never record
        the demo call.
      </div>

      <button
        type="button"
        onClick={() => {
          console.log("[BillieDemoDialog] Start button click", { canStart });
          if (canStart) onStart();
        }}
        disabled={!canStart}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 h-12 px-5 text-sm border",
          canStart
            ? "bg-accent-cyan text-[#0a0e14] border-accent-cyan hover:bg-accent-cyan/90 cursor-pointer"
            : "bg-white/5 text-text-dim border-white/10 cursor-not-allowed"
        )}
      >
        Start live call with Billie
      </button>
    </div>
  );
}

function ConnectedStep({
  agentTalking,
  micLevel,
  transcript,
  callerName,
  businessName,
  onHangUp,
}: {
  agentTalking: boolean;
  micLevel: number;
  transcript: TranscriptEntry[];
  callerName: string;
  businessName: string;
  onHangUp: () => void;
}) {
  const latest = transcript.length > 0 ? transcript[transcript.length - 1] : null;
  return (
    <div>
      <div className="px-5 pt-4 flex items-center justify-between text-xs">
        <Badge tone="good" dot>
          Live
        </Badge>
        <div className="text-text-dim">
          {callerName} · {businessName}
        </div>
      </div>

      <div className="px-5 py-4 flex items-center justify-center gap-2 min-h-[72px]">
        {[...Array(24)].map((_, i) => {
          const bar = agentTalking
            ? Math.abs(Math.sin((Date.now() / 120 + i * 0.6) % Math.PI))
            : Math.max(0.05, micLevel * (0.5 + ((i * 37) % 50) / 100));
          const height = 8 + bar * 46;
          return (
            <div
              key={i}
              className={cn(
                "w-1 rounded-full transition-[height] duration-150",
                agentTalking ? "bg-accent-cyan" : "bg-accent-lime/70"
              )}
              style={{ height }}
            />
          );
        })}
      </div>

      <div className="px-5 pb-3">
        <div className="font-mono-alt text-text-dim mb-2">
          {agentTalking ? "Billie is speaking" : "Billie is listening"}
        </div>
        <div className="min-h-[120px] max-h-[200px] overflow-y-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
          {transcript.length === 0 ? (
            <div className="text-xs text-text-dim italic">
              Transcript will appear as the call progresses…
            </div>
          ) : (
            transcript.slice(-6).map((t, i) => (
              <div
                key={i}
                className={cn(
                  "text-sm leading-relaxed",
                  t.role === "agent" ? "text-text-primary" : "text-text-muted",
                  latest === t && "font-medium"
                )}
              >
                <span
                  className={cn(
                    "font-mono-alt mr-2",
                    t.role === "agent" ? "text-accent-cyan" : "text-text-dim"
                  )}
                >
                  {t.role === "agent" ? "Billie" : callerName || "You"}
                </span>
                {t.content}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-5 py-4">
        <Button
          variant="danger"
          size="lg"
          className="w-full"
          onClick={onHangUp}
        >
          <PhoneOff className="h-4 w-4" /> Hang up
        </Button>
      </div>
    </div>
  );
}

function EndedStep({
  onRestart,
  onClose,
}: {
  onRestart: () => void;
  onClose: () => void;
}) {
  return (
    <div className="px-5 py-8 flex flex-col items-center gap-3 text-center">
      <div className="text-display text-2xl">Thanks for testing.</div>
      <p className="text-sm text-text-muted max-w-sm leading-relaxed">
        That&apos;s the same Billie who&apos;ll answer your line 24/7. On your
        real account she books straight into your calendar, texts you on
        emergencies, and scores leads the moment they hang up.
      </p>
      <div className="mt-2 flex items-center gap-2">
        <Button variant="secondary" onClick={onRestart}>
          Call again
        </Button>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

function ErrorStep({
  error,
  onRetry,
  onClose,
}: {
  error: string | null;
  onRetry: () => void;
  onClose: () => void;
}) {
  return (
    <div className="px-5 py-8 flex flex-col items-center gap-3 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-warn/10 ring-1 ring-accent-warn/30">
        <AlertTriangle className="h-6 w-6 text-accent-warn" />
      </div>
      <div className="text-display text-xl">We couldn&apos;t start the call.</div>
      {error ? (
        <div className="max-w-sm text-xs text-text-muted leading-relaxed rounded-lg border border-accent-warn/20 bg-accent-warn/5 px-3 py-2 text-left">
          {error}
        </div>
      ) : null}
      <p className="text-xs text-text-dim max-w-sm leading-relaxed">
        If this keeps happening, make sure the site has microphone permission
        in your browser and that the <code>RETELL_API_KEY</code> +{" "}
        <code>RETELL_AGENT_ID</code> secrets are set.
      </p>
      <div className="mt-2 flex items-center gap-2">
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
