import { cn } from "@/lib/utils";

export function LeadFunnelChart({
  stages,
}: {
  stages: { stage: string; value: number; accent: "cyan" | "lime" | "good" }[];
}) {
  const max = Math.max(...stages.map((s) => s.value), 1);
  const colors: Record<"cyan" | "lime" | "good", string> = {
    cyan: "from-accent-cyan/70 to-accent-cyan/30",
    lime: "from-accent-lime/70 to-accent-lime/30",
    good: "from-accent-good/70 to-accent-good/30",
  };
  const dot: Record<"cyan" | "lime" | "good", string> = {
    cyan: "bg-accent-cyan",
    lime: "bg-accent-lime",
    good: "bg-accent-good",
  };

  return (
    <div className="space-y-3">
      {stages.map((s) => {
        const pct = (s.value / max) * 100;
        return (
          <div key={s.stage}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2 text-text-muted">
                <span className={cn("h-1.5 w-1.5 rounded-full", dot[s.accent])} />
                {s.stage}
              </div>
              <div className="tabular-nums text-text-primary">{s.value}</div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.04]">
              <div
                className={cn(
                  "h-full rounded-full bg-gradient-to-r",
                  colors[s.accent]
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
