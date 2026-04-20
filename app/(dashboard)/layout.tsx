import { Sidebar } from "@/components/dashboard/Sidebar";
import { AmbientBackground } from "@/components/ambient-background";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <div className="relative z-10 flex min-h-screen">
        <Sidebar />
        <main className="flex-1 min-w-0 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
