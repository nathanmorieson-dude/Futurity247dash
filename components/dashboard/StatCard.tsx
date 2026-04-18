import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <article className="glass-card rounded-xl p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono-alt text-xs text-[var(--text-muted)]">{label}</p>
        <Icon className="h-4 w-4 text-[var(--accent-cyan)]" />
      </div>
      <p className="mt-3 font-display text-4xl text-[var(--text-primary)]">{value}</p>
    </article>
  );
}
