import { PhoneCall } from "lucide-react";
import type { CallRecord } from "@/lib/supabase/types";

type CallRowProps = {
  call: CallRecord;
};

export function CallRow({ call }: CallRowProps) {
  return (
    <article className="rounded-lg border border-[var(--border)] p-3 hover:border-[var(--accent-cyan)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <PhoneCall className="h-4 w-4 text-[var(--accent-cyan)]" />
          <p className="text-sm text-[var(--text-primary)]">{call.caller_phone ?? "Unknown caller"}</p>
        </div>
        <p className="text-xs text-[var(--text-muted)]">{new Date(call.started_at).toLocaleString()}</p>
      </div>
      <p className="mt-2 text-xs text-[var(--text-muted)]">{call.summary ?? "No summary yet."}</p>
    </article>
  );
}
