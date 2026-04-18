"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PALETTE = ["#22d3ee", "#a3e635", "#34d399", "#fb923c", "#60a5fa", "#c084fc", "#f472b6"];

export function JobMixChart({
  data,
}: {
  data: { key: string; label: string; value: number; count: number }[];
}) {
  const top = data.slice(0, 7);
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={top}
          layout="vertical"
          margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
        >
          <XAxis
            type="number"
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) =>
              v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`
            }
          />
          <YAxis
            type="category"
            dataKey="label"
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={140}
          />
          <Tooltip
            cursor={{ fill: "rgba(34,211,238,0.06)" }}
            contentStyle={{
              backgroundColor: "rgba(10,14,20,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value: number, _name, ctx) => [
              `$${value.toLocaleString()} (${ctx.payload.count} jobs)`,
              "Pipeline",
            ]}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {top.map((_, i) => (
              <Cell
                key={i}
                fill={PALETTE[i % PALETTE.length]}
                opacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
