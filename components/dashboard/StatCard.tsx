import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardLabel } from "@/components/ui/Card";

export function StatCard({
  label,
  value,
  delta,
  hint,
  accent = "cyan",
  className,
}: {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  accent?: "cyan" | "lime" | "warn" | "good";
  className?: string;
}) {
  const isUp = (delta ?? 0) >= 0;
  const accentColor: Record<typeof accent, string> = {
    cyan: "text-accent-cyan",
    lime: "text-accent-lime",
    warn: "text-accent-warn",
    good: "text-accent-good",
  };

  return (
    <Card className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <CardLabel>{label}</CardLabel>
        {typeof delta === "number" ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-[11px] font-medium",
              isUp ? "text-accent-good" : "text-accent-warn"
            )}
          >
            {isUp ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(delta).toFixed(1)}%
          </span>
        ) : null}
      </div>
      <div className={cn("text-display text-4xl", accentColor[accent])}>
        {value}
      </div>
      {hint ? <div className="text-xs text-text-dim">{hint}</div> : null}
    </Card>
  );
}
