import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Tone =
  | "neutral"
  | "cyan"
  | "lime"
  | "warn"
  | "good"
  | "danger"
  | "muted";

const toneStyles: Record<Tone, string> = {
  neutral:
    "bg-white/5 text-text-primary border-white/10",
  cyan: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30",
  lime: "bg-accent-lime/10 text-accent-lime border-accent-lime/30",
  warn: "bg-accent-warn/10 text-accent-warn border-accent-warn/30",
  good: "bg-accent-good/10 text-accent-good border-accent-good/30",
  danger:
    "bg-accent-danger/10 text-accent-danger border-accent-danger/30",
  muted: "bg-white/[0.03] text-text-muted border-white/5",
};

export function Badge({
  tone = "neutral",
  className,
  dot,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-none",
        toneStyles[tone],
        className
      )}
      {...rest}
    >
      {dot ? (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            tone === "warn" && "bg-accent-warn animate-pulse-dot",
            tone === "danger" && "bg-accent-danger animate-pulse-dot",
            tone === "good" && "bg-accent-good",
            tone === "lime" && "bg-accent-lime",
            tone === "cyan" && "bg-accent-cyan animate-pulse-dot",
            tone === "neutral" && "bg-text-muted",
            tone === "muted" && "bg-text-dim"
          )}
        />
      ) : null}
      {rest.children}
    </span>
  );
}
