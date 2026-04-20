"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type Speaker = "billie" | "caller";

interface Turn {
  who: Speaker;
  text: string;
  voice?: "feminine" | "masculine";
}

const DEMO_SCRIPT: Turn[] = [
  {
    who: "billie",
    text: "Keystone Electric, this is Billie. How can I help you today?",
    voice: "feminine",
  },
  {
    who: "caller",
    text: "Hi, half my house just lost power and the breaker keeps tripping when I reset it.",
    voice: "masculine",
  },
  {
    who: "billie",
    text:
      "Okay, that sounds serious. Before anything else — are you smelling burning, or do you see sparks at the panel?",
    voice: "feminine",
  },
  { who: "caller", text: "No burning smell. Panel feels warm though.", voice: "masculine" },
  {
    who: "billie",
    text:
      "Got it. Please don't reset that breaker again. I'm texting Marcus right now and getting you on the schedule. What's the best callback number?",
    voice: "feminine",
  },
  {
    who: "caller",
    text: "Five one two, five five five, seven seven two one.",
    voice: "masculine",
  },
  {
    who: "billie",
    text: "Just to confirm — 512, 555, 7721. Is that right?",
    voice: "feminine",
  },
  { who: "caller", text: "Yes, that's correct.", voice: "masculine" },
  {
    who: "billie",
    text:
      "Perfect. I have a same-day slot at 6:15 PM today. Does that work for you?",
    voice: "feminine",
  },
  { who: "caller", text: "Yes please. Thank you.", voice: "masculine" },
  {
    who: "billie",
    text:
      "You're booked. You'll get a text confirmation in just a moment. Take care.",
    voice: "feminine",
  },
];

const SAMPLE_MP3_PATH = "/audio/billie-sample.mp3";

export function BillieDemoDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"idle" | "audio" | "synth">("idle");
  const [currentIdx, setCurrentIdx] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasMp3, setHasMp3] = useState<boolean | null>(null);
  const [synthAvailable, setSynthAvailable] = useState<boolean | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const idxRef = useRef(-1);
  const stoppedRef = useRef(false);

  const selectedVoices = useVoices();

  // probe for the bundled MP3 once per open
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    fetch(SAMPLE_MP3_PATH, { method: "HEAD" })
      .then((r) => {
        if (cancelled) return;
        setHasMp3(r.ok);
      })
      .catch(() => !cancelled && setHasMp3(false));
    setSynthAvailable(
      typeof window !== "undefined" && "speechSynthesis" in window
    );
    return () => {
      cancelled = true;
    };
  }, [open]);

  const stopAll = useCallback(() => {
    stoppedRef.current = true;
    setIsPlaying(false);
    setCurrentIdx(-1);
    idxRef.current = -1;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    if (!open) stopAll();
  }, [open, stopAll]);

  useEffect(() => () => stopAll(), [stopAll]);

  const playSynth = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    stoppedRef.current = false;
    setMode("synth");
    setIsPlaying(true);

    const step = (i: number) => {
      if (stoppedRef.current) return;
      if (i >= DEMO_SCRIPT.length) {
        setIsPlaying(false);
        setCurrentIdx(-1);
        idxRef.current = -1;
        return;
      }
      const turn = DEMO_SCRIPT[i];
      setCurrentIdx(i);
      idxRef.current = i;

      const u = new SpeechSynthesisUtterance(turn.text);
      const voice =
        turn.voice === "feminine"
          ? selectedVoices.feminine
          : selectedVoices.masculine;
      if (voice) u.voice = voice;
      u.rate = turn.who === "billie" ? 1.05 : 1.0;
      u.pitch = turn.who === "billie" ? 1.05 : 0.95;
      u.volume = 1;
      u.onend = () => {
        if (stoppedRef.current) return;
        setTimeout(() => step(i + 1), 320);
      };
      u.onerror = () => {
        if (stoppedRef.current) return;
        setTimeout(() => step(i + 1), 320);
      };
      utterRef.current = u;
      window.speechSynthesis.speak(u);
    };

    step(0);
  }, [selectedVoices]);

  const playAudio = useCallback(() => {
    if (!audioRef.current) return;
    stoppedRef.current = false;
    setMode("audio");
    setIsPlaying(true);
    setCurrentIdx(0);
    idxRef.current = 0;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      setIsPlaying(false);
    });
  }, []);

  const handlePlay = useCallback(() => {
    if (hasMp3) playAudio();
    else if (synthAvailable) playSynth();
  }, [hasMp3, synthAvailable, playAudio, playSynth]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    if (mode === "audio" && audioRef.current) audioRef.current.pause();
    if (mode === "synth" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
    }
  }, [mode]);

  const handleResume = useCallback(() => {
    setIsPlaying(true);
    if (mode === "audio" && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else if (mode === "synth" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
    }
  }, [mode]);

  const handleReplay = useCallback(() => {
    stopAll();
    setTimeout(handlePlay, 60);
  }, [handlePlay, stopAll]);

  // Audio element timeupdate → approximate current transcript turn by progress
  const onAudioTimeUpdate = useCallback(() => {
    const a = audioRef.current;
    if (!a || !a.duration || isNaN(a.duration)) return;
    const progress = a.currentTime / a.duration;
    const i = Math.min(
      DEMO_SCRIPT.length - 1,
      Math.floor(progress * DEMO_SCRIPT.length)
    );
    setCurrentIdx(i);
  }, []);

  const onAudioEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentIdx(DEMO_SCRIPT.length - 1);
  }, []);

  const disabled = hasMp3 === null || synthAvailable === null;

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 animate-fade-in-1"
      role="dialog"
      aria-modal="true"
      aria-label="Hear Billie demo"
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
                  isPlaying && "animate-pulse-dot"
                )}
              >
                <span className="text-display text-lg text-accent-cyan">B</span>
              </div>
              {isPlaying ? (
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent-good ring-4 ring-accent-good/20" />
              ) : null}
            </div>
            <div className="leading-tight">
              <div className="text-display text-lg">Hear Billie</div>
              <div className="text-[10px] uppercase tracking-widest2 text-text-dim">
                Scripted emergency-call demo
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

        <div className="px-5 pt-4">
          {hasMp3 === false ? (
            <Badge tone="muted">
              Browser voice · drop an MP3 at /audio/billie-sample.mp3 to use
              the real recording
            </Badge>
          ) : hasMp3 === true ? (
            <Badge tone="cyan" dot>
              Playing recorded sample
            </Badge>
          ) : null}
        </div>

        <audio
          ref={audioRef}
          src={SAMPLE_MP3_PATH}
          onTimeUpdate={onAudioTimeUpdate}
          onEnded={onAudioEnded}
          preload="none"
        />

        <ol className="max-h-[320px] overflow-y-auto px-5 py-4 space-y-2">
          {DEMO_SCRIPT.map((t, i) => {
            const isActive = i === currentIdx && isPlaying;
            const isPast = i < currentIdx;
            return (
              <li
                key={i}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm leading-relaxed transition-colors",
                  t.who === "billie"
                    ? "border-accent-cyan/20 bg-accent-cyan/[0.04] text-text-primary"
                    : "border-white/[0.06] bg-white/[0.02] text-text-primary",
                  isActive && "ring-1 ring-accent-cyan/50",
                  !isActive && !isPast && currentIdx !== -1 && "opacity-60"
                )}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className={cn(
                      "font-mono-alt",
                      t.who === "billie"
                        ? "text-accent-cyan"
                        : "text-text-dim"
                    )}
                  >
                    {t.who === "billie" ? "Billie" : "Caller"}
                  </span>
                  {isActive ? (
                    <span className="flex items-center gap-0.5">
                      <Bar />
                      <Bar delay={120} />
                      <Bar delay={240} />
                    </span>
                  ) : null}
                </div>
                {t.text}
              </li>
            );
          })}
        </ol>

        <div className="flex items-center gap-2 border-t border-white/[0.06] px-5 py-4">
          {!isPlaying && currentIdx === -1 ? (
            <Button
              variant="primary"
              onClick={handlePlay}
              disabled={disabled || (hasMp3 === false && !synthAvailable)}
              className="flex-1"
            >
              <Play className="h-4 w-4" /> Play demo
            </Button>
          ) : isPlaying ? (
            <Button variant="secondary" onClick={handlePause} className="flex-1">
              <Pause className="h-4 w-4" /> Pause
            </Button>
          ) : (
            <Button variant="primary" onClick={handleResume} className="flex-1">
              <Play className="h-4 w-4" /> Resume
            </Button>
          )}
          <Button variant="ghost" onClick={handleReplay} disabled={disabled}>
            <RotateCcw className="h-4 w-4" /> Replay
          </Button>
        </div>

        <div className="px-5 pb-4 text-[11px] text-text-dim leading-relaxed">
          This is the scripted emergency-escalation flow Billie actually runs
          when a caller mentions a warm panel, sparks, or burning smell. In
          production she uses an ElevenLabs voice over Retell AI; this demo
          uses your browser&apos;s speech synthesis when no recorded sample
          is present so you can hear the pacing and script.
        </div>
      </div>
    </div>
  );
}

function Bar({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="block w-0.5 bg-accent-cyan rounded-full animate-pulse-dot"
      style={{
        height: 10,
        animationDelay: `${delay}ms`,
      }}
    />
  );
}

/**
 * Picks the best-sounding male + female voices the browser happens to have.
 * Chrome / Safari / Firefox all ship a handful; we bias toward English,
 * non-novelty voices.
 */
function useVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const update = () => setVoices(window.speechSynthesis.getVoices());
    update();
    window.speechSynthesis.onvoiceschanged = update;
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  return useMemo(() => {
    const english = voices.filter((v) => /^en(-|_|$)/i.test(v.lang));
    const byName = (...needles: string[]) =>
      english.find((v) =>
        needles.some((n) => v.name.toLowerCase().includes(n))
      );

    const feminine =
      byName("samantha", "jenny", "ava", "zira", "susan", "female") ??
      english.find((v) => !/alex|daniel|fred|male|man/i.test(v.name)) ??
      english[0] ??
      voices[0];

    const masculine =
      byName("daniel", "alex", "david", "fred", "mark", "male") ??
      english.find((v) => /alex|daniel|david|fred|mark|male/i.test(v.name)) ??
      english[1] ??
      english[0] ??
      voices[0];

    return { feminine, masculine };
  }, [voices]);
}
