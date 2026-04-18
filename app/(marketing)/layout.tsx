import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/auth/login", label: "Client Login" },
];

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative z-10 min-h-screen">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-display text-2xl text-[var(--text-primary)]">
            Futurity247
          </Link>
          <nav className="flex items-center gap-5 text-sm text-[var(--text-muted)]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[var(--accent-cyan)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer className="mt-16 border-t border-[var(--border)]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-xs text-[var(--text-muted)]">
          <span>Futurity247</span>
          <span>Built for electrical contractors</span>
        </div>
      </footer>
    </div>
  );
}
