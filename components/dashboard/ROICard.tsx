type ROICardProps = {
  monthlyFee: number;
  pipelineValue: number;
  roiRatio: number;
};

export function ROICard({ monthlyFee, pipelineValue, roiRatio }: ROICardProps) {
  return (
    <article className="glass-card rounded-2xl p-5">
      <p className="font-mono-alt text-xs text-[var(--text-muted)]">Client ROI</p>
      <p className="mt-3 font-display text-4xl text-[var(--accent-lime)]">{roiRatio.toFixed(2)}x</p>
      <dl className="mt-5 space-y-2 text-sm text-[var(--text-muted)]">
        <div className="flex justify-between">
          <dt>Monthly fee</dt>
          <dd>${monthlyFee.toLocaleString()}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Pipeline value</dt>
          <dd>${pipelineValue.toLocaleString()}</dd>
        </div>
      </dl>
    </article>
  );
}
