import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  PhoneIncoming,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import { AmbientBackground } from "@/components/ambient-background";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PLANS } from "@/lib/pricing";
import { formatCurrency } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Trusted />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.05] bg-[#0a0e14]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-accent-cyan/15 ring-1 ring-accent-cyan/40">
            <Sparkles className="h-4 w-4 text-accent-cyan" />
          </div>
          <div className="text-display text-lg">Futurity247</div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-text-muted">
          <a href="#features" className="hover:text-text-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-text-primary transition-colors">
            Pricing
          </a>
          <a href="#about" className="hover:text-text-primary transition-colors">
            About
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="sm">
              See live demo
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative px-6 pt-20 pb-24">
      <div className="mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2">
          <Badge tone="cyan" dot>
            Built for electrical contractors
          </Badge>
        </div>
        <h1 className="mt-6 text-display text-5xl sm:text-7xl text-text-primary leading-[0.95] animate-fade-in-1">
          Billie answers the phone
          <br />
          <span className="text-accent-cyan italic">while you're up the ladder.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed animate-fade-in-2">
          Futurity247 is a 24/7 AI receptionist tuned for electrical work. She
          books jobs into your calendar, escalates real emergencies to your
          phone in under 30 seconds, and never quotes a price she shouldn&apos;t.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-in-3">
          <Link href="/dashboard">
            <Button variant="primary" size="lg">
              See the dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="secondary" size="lg">
            <Headphones className="h-4 w-4" /> Hear Billie
          </Button>
        </div>
        <div className="mt-3 text-xs text-text-dim">
          No credit card · 14-day pilot · Average ROI{" "}
          <span className="text-accent-lime">11×</span> in month one.
        </div>
      </div>

      <DemoPreview />
    </section>
  );
}

function DemoPreview() {
  return (
    <div className="mx-auto mt-16 max-w-5xl animate-fade-in-4">
      <div className="relative rounded-2xl border border-white/[0.08] bg-card-solid/80 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(34,211,238,0.25)]">
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <div className="ml-3 font-mono-alt text-text-dim">
            keystone-electric.futurity247.com
          </div>
          <div className="ml-auto">
            <Badge tone="cyan" dot>
              Billie online
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-6">
          <CallReplay />
          <ImpactStrip />
        </div>
      </div>
    </div>
  );
}

function CallReplay() {
  const turns = [
    { who: "billie" as const, text: "Keystone Electric, this is Billie. How can I help?" },
    { who: "caller" as const, text: "Half my house lost power. The breaker keeps tripping." },
    { who: "billie" as const, text: "Got it — I'm flagging this to Marcus right now. Any burning smell or sparks?" },
    { who: "caller" as const, text: "No burning smell. Panel feels warm." },
    { who: "billie" as const, text: "Don't reset that breaker again. I have a 6:15 PM same-day slot — does that work?" },
  ];
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
      <div className="font-mono-alt text-text-dim mb-3 flex items-center justify-between">
        <span>Live transcript</span>
        <Badge tone="warn" dot>
          Emergency
        </Badge>
      </div>
      <ol className="space-y-2 text-xs">
        {turns.map((t, i) => (
          <li
            key={i}
            className={`rounded-md px-2.5 py-1.5 leading-relaxed ${
              t.who === "billie"
                ? "border border-accent-cyan/20 bg-accent-cyan/[0.04] text-text-primary"
                : "border border-white/[0.05] bg-white/[0.02] text-text-muted"
            }`}
          >
            <span
              className={`font-mono-alt mr-2 ${
                t.who === "billie" ? "text-accent-cyan" : "text-text-dim"
              }`}
            >
              {t.who === "billie" ? "Billie" : "Caller"}
            </span>
            {t.text}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ImpactStrip() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Stat label="MTD pipeline" value="$24,160" accent="text-accent-cyan" />
      <Stat label="Booking rate" value="64%" accent="text-accent-lime" />
      <Stat label="Emergencies handled" value="3" accent="text-accent-warn" />
      <Stat label="Hours of phone time returned" value="11.2" accent="text-accent-good" />
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
      <div className="font-mono-alt text-text-dim">{label}</div>
      <div className={`text-display text-3xl mt-1 ${accent}`}>{value}</div>
    </div>
  );
}

function Trusted() {
  const stats = [
    { v: "24/7", l: "Coverage. Even Sunday at 2 AM." },
    { v: "<30s", l: "Owner alerted on emergencies" },
    { v: "11×", l: "Average month-one ROI" },
    { v: "0", l: "Hot leads dropped" },
  ];
  return (
    <section className="border-y border-white/[0.05] bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="text-display text-3xl text-accent-cyan">{s.v}</div>
            <div className="text-xs text-text-muted mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: PhoneIncoming,
      title: "Books straight to your calendar",
      body: "Billie checks Google Calendar, offers real availability, and writes the event with the customer's address, job description, and SMS confirmation.",
    },
    {
      icon: ShieldAlert,
      title: "Knows what's an emergency",
      body: "An electrical-specific keyword classifier flags burning smells, sparks, panel heat, and downed lines. Owner gets a text in under 30 seconds.",
    },
    {
      icon: Zap,
      title: "Quotes only what's safe",
      body: "Won't promise prices, won't diagnose, won't guess. The only number she'll name is your service-call fee.",
    },
    {
      icon: Sparkles,
      title: "Tuned for electricians",
      body: "Job-duration estimates, lead scoring, and pipeline math all built around panel upgrades, EV chargers, rewires — not a generic SaaS chatbot.",
    },
  ];
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="font-mono-alt text-accent-cyan">What Billie does</div>
          <h2 className="text-display text-4xl sm:text-5xl mt-3">
            A receptionist who knows the difference between
            <span className="italic text-accent-cyan"> a flickering light</span> and
            <span className="italic text-accent-warn"> a hot panel.</span>
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-6 interactive-border"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-cyan/10 ring-1 ring-accent-cyan/30 shrink-0">
                  <f.icon className="h-5 w-5 text-accent-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{f.title}</h3>
                  <p className="text-sm text-text-muted mt-1.5 leading-relaxed">
                    {f.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24 border-t border-white/[0.05]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <div className="font-mono-alt text-accent-cyan">Pricing</div>
          <h2 className="text-display text-4xl sm:text-5xl mt-3">
            Pays for itself in <span className="italic text-accent-lime">one job</span>.
          </h2>
          <p className="text-text-muted mt-4">
            Pick the plan that matches your truck count. Overage minutes are
            billed monthly — never a surprise.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {Object.values(PLANS).map((p) => {
            const featured = p.id === "pro";
            return (
              <div
                key={p.id}
                className={`relative rounded-2xl border p-6 ${
                  featured
                    ? "border-accent-cyan/40 bg-card-solid/80 ring-glow-cyan"
                    : "glass"
                }`}
              >
                {featured ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge tone="cyan" dot>
                      Most popular
                    </Badge>
                  </div>
                ) : null}
                <div className="font-mono-alt text-text-dim">{p.name}</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-display text-5xl">
                    {formatCurrency(p.price)}
                  </span>
                  <span className="text-sm text-text-muted">/ month</span>
                </div>
                <div className="text-xs text-text-muted mt-1">{p.target}</div>
                <ul className="mt-6 space-y-2 text-sm text-text-muted">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 mt-0.5 ${
                          featured ? "text-accent-cyan" : "text-accent-good"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link href="/dashboard">
                    <Button
                      variant={featured ? "primary" : "secondary"}
                      className="w-full"
                    >
                      Start 14-day pilot
                    </Button>
                  </Link>
                </div>
                <div className="mt-4 text-[11px] text-text-dim text-center">
                  Overage: ${p.overage.toFixed(2)} / minute
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="about"
      className="border-t border-white/[0.05] px-6 py-12 bg-white/[0.01]"
    >
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-accent-cyan/15 ring-1 ring-accent-cyan/40">
              <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
            </div>
            <div className="text-display text-lg">Futurity247</div>
          </div>
          <p className="text-xs text-text-dim mt-2 max-w-md">
            Vertical AI receptionist for electricians. Built on Retell, Twilio,
            Google Calendar, and Claude.
          </p>
        </div>
        <div className="text-xs text-text-dim">
          © 2026 Futurity247 · Austin, TX
        </div>
      </div>
    </footer>
  );
}
