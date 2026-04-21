import { AmbientBackground } from "@/components/ambient-background";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminNotConfigured } from "@/components/admin/AdminNotConfigured";

export const dynamic = "force-dynamic";

export default function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gate = requireAdmin();
  if (!gate.ok) {
    return (
      <div className="relative min-h-screen">
        <AmbientBackground />
        <div className="relative z-10 grid min-h-screen place-items-center px-6">
          <AdminNotConfigured reason={gate.reason} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <div className="relative z-10 flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 min-w-0 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
