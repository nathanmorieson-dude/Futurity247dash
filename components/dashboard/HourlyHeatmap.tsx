"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function HourlyHeatmap({
  data,
}: {
  data: { hour: number; calls: number }[];
}) {
  const formatted = data.map((d) => ({
    ...d,
    label:
      d.hour === 0
        ? "12a"
        : d.hour < 12
        ? `${d.hour}a`
        : d.hour === 12
        ? "12p"
        : `${d.hour - 12}p`,
  }));

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formatted}
          margin={{ left: 0, right: 0, top: 4, bottom: 0 }}
        >
          <CartesianGrid
            stroke="rgba(255,255,255,0.04)"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            stroke="#64748b"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            interval={2}
          />
          <YAxis
            stroke="#64748b"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            width={24}
          />
          <Tooltip
            cursor={{ fill: "rgba(34,211,238,0.06)" }}
            contentStyle={{
              backgroundColor: "rgba(10,14,20,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="calls"
            fill="#22d3ee"
            radius={[3, 3, 0, 0]}
            opacity={0.8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
