import Link from "next/link";
import { redirect } from "next/navigation";
import { Building2, LayoutDashboard, Phone, Settings, Users } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calls", label: "Calls", icon: Phone },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/admin", label: "Admin", icon: Building2 },
];

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="relative z-10 min-h-screen">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-6 px-6 py-6 md:grid-cols-[220px_1fr]">
        <aside className="glass-card fade-in-1 h-fit rounded-2xl p-4">
          <p className="font-display text-2xl text-[var(--text-primary)]">Futurity247</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Client operations</p>
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm text-[var(--text-muted)] hover:border-[var(--accent-cyan)] hover:text-[var(--text-primary)]"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <Link
              href="/onboarding"
              className="mt-2 flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm text-[var(--text-muted)] hover:border-[var(--accent-cyan)] hover:text-[var(--text-primary)]"
            >
              Setup Wizard
            </Link>
          </nav>
          <form action="/api/auth/signout" method="post" className="mt-6">
            <button
              type="submit"
              className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-primary)] hover:border-[var(--accent-cyan)]"
            >
              Sign out
            </button>
          </form>
        </aside>

        <div className="fade-in-2 min-w-0">{children}</div>
      </div>
    </div>
  );
}
