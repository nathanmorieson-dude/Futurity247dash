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
import type { DailyMetric } from "@/lib/types";

export function CallVolumeChart({ data }: { data: DailyMetric[] }) {
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={formatted}
          margin={{ left: 0, right: 8, top: 8, bottom: 0 }}
        >
          <defs>
            <linearGradient id="callsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="bookedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a3e635" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#a3e635" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="rgba(255,255,255,0.04)"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            interval={Math.floor(formatted.length / 6)}
          />
          <YAxis
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={28}
          />
          <Tooltip
            cursor={{
              stroke: "rgba(34,211,238,0.3)",
              strokeWidth: 1,
            }}
            contentStyle={{
              backgroundColor: "rgba(10,14,20,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "#94a3b8" }}
          />
          <Area
            type="monotone"
            dataKey="calls"
            stroke="#22d3ee"
            strokeWidth={1.5}
            fill="url(#callsGrad)"
            name="Calls"
          />
          <Area
            type="monotone"
            dataKey="booked"
            stroke="#a3e635"
            strokeWidth={1.5}
            fill="url(#bookedGrad)"
            name="Booked"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
