"use client";

import { Bell, Search } from "lucide-react";
import { CURRENT_CLIENT } from "@/lib/mock/data";
import { Badge } from "@/components/ui/Badge";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-white/[0.05] bg-[#0a0e14]/70 px-6 py-4 backdrop-blur-xl">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h1 className="text-display text-2xl truncate">{title}</h1>
          <Badge tone="cyan" dot className="hidden sm:inline-flex">
            Billie online
          </Badge>
        </div>
        {subtitle ? (
          <p className="text-sm text-text-muted truncate">{subtitle}</p>
        ) : null}
      </div>

      <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 w-72 interactive-border">
        <Search className="h-3.5 w-3.5 text-text-dim" />
        <input
          placeholder="Search calls, leads, customers"
          className="bg-transparent text-sm placeholder:text-text-dim outline-none flex-1"
        />
        <kbd className="font-mono-alt text-text-dim">⌘K</kbd>
      </div>

      <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-text-muted interactive-border">
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-warn animate-pulse-dot" />
      </button>

      <div className="hidden md:flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-1 pr-3 interactive-border">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-accent-cyan/30 to-accent-lime/20 text-xs font-medium text-text-primary">
          {CURRENT_CLIENT.owner_name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="leading-tight">
          <div className="text-xs font-medium">{CURRENT_CLIENT.business_name}</div>
          <div className="text-[10px] text-text-dim">
            {CURRENT_CLIENT.city}, {CURRENT_CLIENT.state}
          </div>
        </div>
      </div>
    </header>
  );
}
