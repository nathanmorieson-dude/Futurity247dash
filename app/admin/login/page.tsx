import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  isAdminPasswordConfigured,
  verifyAdminToken,
} from "@/lib/admin/auth";
import { AmbientBackground } from "@/components/ambient-background";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Card, CardLabel } from "@/components/ui/Card";
import { Lock } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin sign in — Futurity247",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  const configured = isAdminPasswordConfigured();
  const existing = cookies().get(ADMIN_COOKIE)?.value;
  if (configured && verifyAdminToken(existing)) {
    redirect("/admin");
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <div className="relative z-10 grid min-h-screen place-items-center px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-cyan/15 ring-1 ring-accent-cyan/40">
              <Lock className="h-5 w-5 text-accent-cyan" />
            </div>
            <div className="text-display text-2xl">
              Futurity<span className="text-accent-cyan italic">247</span>
              <span className="text-text-muted text-sm ml-2 font-sans">
                admin
              </span>
            </div>
          </div>

          <Card>
            <CardLabel>Sign in</CardLabel>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              The admin panel manages every Futurity247 client. Only share this
              password with founding-team operators.
            </p>
            {configured ? (
              <div className="mt-4">
                <AdminLoginForm />
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-accent-warn/30 bg-accent-warn/5 px-4 py-3 text-xs text-accent-warn leading-relaxed">
                <div className="font-mono-alt mb-1">Setup required</div>
                Set <code>ADMIN_PASSWORD</code> in Cursor Dashboard → Cloud
                Agents → Secrets, then restart the deployment. The login form
                is intentionally hidden until a password is configured.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
