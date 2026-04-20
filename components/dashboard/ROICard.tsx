import { Sparkles } from "lucide-react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

export function ROICard({
  pipeline,
  fee,
  multiple,
}: {
  pipeline: number;
  fee: number;
  multiple: number;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 100% 0%, rgba(34,211,238,0.12), transparent 60%)",
        }}
      />
      <div className="flex items-center justify-between">
        <CardLabel>ROI · Month to date</CardLabel>
        <Badge tone="cyan" dot>
          Live
        </Badge>
      </div>
      <div className="mt-4 flex items-end gap-3">
        <div className="text-display text-6xl text-accent-cyan">
          {multiple.toFixed(1)}×
        </div>
        <div className="text-sm text-text-muted pb-2">
          on ${fee} platform fee
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
        <div>
          <div className="font-mono-alt text-text-dim">Pipeline generated</div>
          <div className="text-display text-2xl mt-1 text-text-primary">
            {formatCurrency(pipeline)}
          </div>
        </div>
        <div>
          <div className="font-mono-alt text-text-dim">Platform fee</div>
          <div className="text-display text-2xl mt-1 text-text-primary">
            {formatCurrency(fee)}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-lg border border-accent-lime/20 bg-accent-lime/5 px-3 py-2 text-xs text-accent-lime">
        <Sparkles className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        Billie has generated more pipeline than your subscription cost in every
        month she's been live.
      </div>
    </Card>
  );
}
