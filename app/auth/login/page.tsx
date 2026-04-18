import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6 py-16">
      <section className="glass-card fade-in-2 w-full max-w-md rounded-2xl p-8">
        <p className="font-mono-alt text-xs text-[var(--accent-cyan)]">Client Access</p>
        <h1 className="mt-3 font-display text-4xl text-[var(--text-primary)]">Sign in to dashboard</h1>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Use a magic link or Google OAuth. Need details first? <Link href="/pricing" className="text-[var(--accent-cyan)] hover:underline">View plans</Link>.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
