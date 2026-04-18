"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type UsagePoint = {
  month: string;
  minutes: number;
};

type UsageChartProps = {
  data: UsagePoint[];
};

export function UsageChart({ data }: UsageChartProps) {
  return (
    <article className="glass-card rounded-2xl p-5">
      <p className="font-mono-alt text-xs text-[var(--text-muted)]">Usage by month</p>
      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="usageGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity={0.6} />
                <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="var(--text-muted)" tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ stroke: "var(--accent-cyan)", strokeWidth: 1 }}
              contentStyle={{ backgroundColor: "#121821", border: "1px solid var(--border)", borderRadius: 8 }}
            />
            <Area dataKey="minutes" type="monotone" stroke="var(--accent-cyan)" fill="url(#usageGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
