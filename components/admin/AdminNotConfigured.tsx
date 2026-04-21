import { Card, CardLabel } from "@/components/ui/Card";
import { ShieldAlert } from "lucide-react";

export function AdminNotConfigured({
  reason,
}: {
  reason: "no_password";
}) {
  return (
    <Card className="max-w-lg">
      <div className="flex items-start gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-warn/10 ring-1 ring-accent-warn/30">
          <ShieldAlert className="h-5 w-5 text-accent-warn" />
        </div>
        <div>
          <CardLabel>Admin panel · setup required</CardLabel>
          <h1 className="text-display text-2xl mt-2">
            One secret away.
          </h1>
          <p className="text-sm text-text-muted leading-relaxed mt-2">
            The admin panel is gated behind a password so nobody can browse
            your client portfolio. {reason === "no_password"
              ? "Set the ADMIN_PASSWORD secret to unlock it."
              : null}
          </p>
          <div className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.03] p-4 space-y-2">
            <div className="font-mono-alt text-text-dim">How to enable</div>
            <ol className="text-xs text-text-muted leading-relaxed list-decimal pl-4 space-y-1">
              <li>
                Open <span className="text-text-primary">Cursor Dashboard → Cloud Agents → Secrets</span>
              </li>
              <li>
                Add <code className="text-accent-cyan">ADMIN_PASSWORD</code>
                &nbsp;and (recommended) a long random
                &nbsp;<code className="text-accent-cyan">ADMIN_COOKIE_SECRET</code>
              </li>
              <li>
                Redeploy. Sign in at <code className="text-accent-cyan">/admin/login</code>.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Card>
  );
}
