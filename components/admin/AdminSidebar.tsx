"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  CreditCard,
  LayoutDashboard,
  LogOut,
  PhoneIncoming,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/clients", label: "Clients", icon: Building2 },
  { href: "/admin/billing", label: "Billing", icon: CreditCard },
  { href: "/admin/calls", label: "Calls", icon: PhoneIncoming },
  { href: "/admin/insights", label: "Insights", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    setSigningOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-white/[0.05] bg-[#0a0e14]/80 backdrop-blur-xl">
      <div className="px-5 py-5">
        <Link href="/admin" className="leading-tight">
          <div className="text-display text-xl">
            Futurity<span className="text-accent-cyan italic">247</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest2 text-accent-cyan mt-0.5">
            Admin · Portfolio
          </div>
        </Link>
      </div>

      <nav className="px-3 py-2 flex-1">
        <ul className="space-y-0.5">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");
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

      <div className="p-3 space-y-2">
        <Link
          href="/dashboard"
          className="block rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-text-muted hover:text-text-primary hover:border-white/20 transition-colors text-center"
        >
          Switch to client view →
        </Link>
        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-text-muted hover:text-accent-warn hover:border-accent-warn/30 transition-colors disabled:opacity-50"
        >
          <LogOut className="h-3.5 w-3.5" /> {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
