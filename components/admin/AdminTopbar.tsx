import { Badge } from "@/components/ui/Badge";

export function AdminTopbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-white/[0.05] bg-[#0a0e14]/70 px-6 py-4 backdrop-blur-xl">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h1 className="text-display text-2xl truncate">{title}</h1>
          <Badge tone="cyan" dot className="hidden sm:inline-flex">
            Admin
          </Badge>
        </div>
        {subtitle ? (
          <p className="text-sm text-text-muted truncate">{subtitle}</p>
        ) : null}
      </div>
    </header>
  );
}
