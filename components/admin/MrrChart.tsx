"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function MrrChart({
  data,
}: {
  data: { month: string; mrr: number; clients: number }[];
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="rgba(255,255,255,0.04)"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={52}
            tickFormatter={(v) =>
              v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`
            }
          />
          <Tooltip
            cursor={{ stroke: "rgba(34,211,238,0.3)", strokeWidth: 1 }}
            contentStyle={{
              backgroundColor: "rgba(10,14,20,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(v: number, name) =>
              name === "mrr"
                ? [`$${v.toLocaleString()} AUD`, "MRR"]
                : [v, "Clients"]
            }
            labelStyle={{ color: "#cbd5e1" }}
          />
          <Area
            type="monotone"
            dataKey="mrr"
            stroke="#22d3ee"
            strokeWidth={1.8}
            fill="url(#mrrGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
