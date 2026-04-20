"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  CalendarRange,
  Headphones,
  LayoutDashboard,
  PhoneIncoming,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/calls", label: "Calls", icon: PhoneIncoming },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/schedule", label: "Schedule", icon: CalendarRange },
  { href: "/billie", label: "Billie", icon: Headphones },
  { href: "/insights", label: "Insights", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-white/[0.05] bg-[#0a0e14]/80 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="grid h-8 w-8 place-items-center rounded-md bg-accent-cyan/15 ring-1 ring-accent-cyan/40">
          <Sparkles className="h-4 w-4 text-accent-cyan" />
        </div>
        <div className="leading-tight">
          <div className="text-display text-lg">Futurity247</div>
          <div className="text-[10px] uppercase tracking-widest2 text-text-dim">
            Electrical · Pro
          </div>
        </div>
      </div>

      <nav className="px-3 py-2 flex-1">
        <ul className="space-y-0.5">
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150",
                    active
                      ? "bg-white/[0.06] text-text-primary"
                      : "text-text-muted hover:text-text-primary hover:bg-white/[0.03]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      active ? "text-accent-cyan" : "text-text-dim group-hover:text-text-muted"
                    )}
                  />
                  {item.label}
                  {active ? (
                    <span className="ml-auto h-1 w-1 rounded-full bg-accent-cyan" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="m-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="font-mono-alt text-text-dim mb-2">Plan usage</div>
        <div className="flex items-baseline gap-1">
          <span className="text-display text-2xl">312</span>
          <span className="text-xs text-text-muted">/ 500 min</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-lime"
            style={{ width: "62.4%" }}
          />
        </div>
        <div className="mt-2 text-[11px] text-text-dim">
          Resets May 1 · Pro plan
        </div>
      </div>
    </aside>
  );
}
