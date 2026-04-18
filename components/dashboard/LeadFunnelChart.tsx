"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { LeadRecord } from "@/lib/supabase/types";

type LeadFunnelChartProps = {
  leads: LeadRecord[];
};

function countByTier(leads: LeadRecord[]) {
  return ["hot", "warm", "cold"].map((tier) => ({
    tier,
    total: leads.filter((lead) => (lead.lead_tier ?? "cold") === tier).length,
  }));
}

export function LeadFunnelChart({ leads }: LeadFunnelChartProps) {
  const data = countByTier(leads);

  return (
    <article className="glass-card rounded-2xl p-5">
      <p className="font-mono-alt text-xs text-[var(--text-muted)]">Lead tier distribution</p>
      <div className="mt-5 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis dataKey="tier" stroke="var(--text-muted)" tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#121821", border: "1px solid var(--border)", borderRadius: 8 }}
            />
            <Bar dataKey="total" fill="var(--accent-lime)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
