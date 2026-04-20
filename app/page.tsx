import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  PhoneIncoming,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import { AmbientBackground } from "@/components/ambient-background";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HearBillieButton } from "@/components/marketing/HearBillieButton";
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
        <Link href="/" className="flex items-center">
          <span className="text-display text-xl leading-none">
            Futurity<span className="text-accent-cyan italic">247</span>
          </span>
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
            Built for Australian electricians
          </Badge>
        </div>
        <h1 className="mt-6 text-display text-5xl sm:text-7xl text-text-primary leading-[0.95] animate-fade-in-1">
          Billie answers the phone
          <br />
          <span className="text-accent-cyan italic">while you&apos;re up the ladder.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed animate-fade-in-2">
          Futurity247 is a 24/7 AI receptionist built for Brisbane sparkies. She
          books jobs straight into your Google Calendar, escalates real
          emergencies to your mobile in under 30 seconds, and never quotes a
          price she shouldn&apos;t.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-in-3">
          <Link href="/dashboard">
            <Button variant="primary" size="lg">
              See the dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <HearBillieButton />
        </div>
        <div className="mt-3 text-xs text-text-dim">
          No credit card · 14-day pilot · Average ROI{" "}
          <span className="text-accent-lime">11×</span> in month one · Prices in AUD, inc. GST.
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
            keystoneelectrical.futurity247.com.au
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
    { who: "billie" as const, text: "Keystone Electrical, this is Billie. How can I help?" },
    { who: "caller" as const, text: "Half my house lost power. The safety switch keeps tripping." },
    { who: "billie" as const, text: "Got it — I'm flagging this to Marcus right now. Any burning smell or sparks?" },
    { who: "caller" as const, text: "No burning smell. Switchboard feels warm." },
    { who: "billie" as const, text: "Don't reset that safety switch again. I've got a 6:15 PM same-day slot — does that work?" },
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
      <Stat label="MTD pipeline" value="$34,820" accent="text-accent-cyan" />
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
    { v: "24/7", l: "Coverage. Even Sunday arvo and public holidays." },
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
      body: "Billie checks your Google Calendar, offers real availability, and writes the booking with the customer's address, job description, and SMS confirmation.",
    },
    {
      icon: ShieldAlert,
      title: "Knows what's an emergency",
      body: "An electrical-specific keyword classifier flags burning smells, sparks, warm switchboards, and downed lines. Owner gets an SMS in under 30 seconds — and callers are told to ring Triple Zero if it's life-threatening.",
    },
    {
      icon: Zap,
      title: "Quotes only what's safe",
      body: "Won't promise prices, won't diagnose, won't guess. The only number she'll name is your call-out fee — the electrician gives the quote on-site.",
    },
    {
      icon: Sparkles,
      title: "Tuned for Aussie sparkies",
      body: "Job-duration estimates, lead scoring, and pipeline maths all built around switchboard upgrades, EV chargers, Queenslander rewires, and three-phase — not a generic SaaS chatbot.",
    },
  ];
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="font-mono-alt text-accent-cyan">What Billie does</div>
          <h2 className="text-display text-4xl sm:text-5xl mt-3">
            A receptionist who knows the difference between
            <span className="italic text-accent-cyan"> a flickering downlight</span> and
            <span className="italic text-accent-warn"> a hot switchboard.</span>
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
            Pick the plan that matches the size of your run. All prices in AUD,
            inc. GST. Overage minutes are billed monthly — never a surprise.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto items-stretch">
          {Object.values(PLANS).map((p) => {
            const featured = p.id === "pro";
            return (
              <div
                key={p.id}
                className={`relative rounded-2xl border overflow-hidden flex flex-col ${
                  featured
                    ? "border-accent-cyan/50 bg-card-solid/90 shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_30px_80px_-30px_rgba(34,211,238,0.35)]"
                    : "glass"
                }`}
              >
                {featured ? (
                  <div className="bg-gradient-to-r from-accent-cyan/25 via-accent-cyan/15 to-accent-lime/15 border-b border-accent-cyan/30 px-6 py-2 flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse-dot" />
                    <span className="font-mono-alt text-accent-cyan">
                      Most popular
                    </span>
                  </div>
                ) : null}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="font-mono-alt text-text-dim">{p.name}</div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-display text-5xl">
                      {formatCurrency(p.price)}
                    </span>
                    <span className="text-sm text-text-muted">/ month</span>
                  </div>
                  <div className="text-xs text-text-muted mt-1">{p.target}</div>
                  <ul className="mt-6 space-y-2 text-sm text-text-muted flex-1">
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
                    Overage: ${p.overage.toFixed(2)} / minute (AUD, ex. GST)
                  </div>
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
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="text-display text-lg">
            Futurity<span className="text-accent-cyan italic">247</span>
          </div>
          <p className="text-xs text-text-dim mt-2 max-w-md leading-relaxed">
            Australia&apos;s 24/7 AI receptionist for electricians. Billie
            answers your line around the clock, books jobs straight into your
            Google Calendar, and escalates real emergencies to your mobile in
            under thirty seconds. Built for sole-trader sparkies and small
            commercial crews across Brisbane, the Gold Coast, Sunshine Coast,
            Sydney, Melbourne, and beyond — on Retell AI, Twilio, Google
            Calendar, and Anthropic&apos;s Claude. All pricing in AUD,
            inclusive of GST.
          </p>
          <p className="text-[11px] text-text-dim mt-3">
            Servicing Brisbane electricians from West End to Chermside and
            everywhere in between. Available in every Australian state and
            territory.
          </p>
        </div>
        <div className="text-xs text-text-dim space-y-2">
          <div className="font-mono-alt text-text-muted">Futurity247 Pty Ltd</div>
          <div>Brisbane, Queensland 4000</div>
          <div>
            <a
              href="mailto:hello@futurity247.com.au"
              className="hover:text-accent-cyan transition-colors"
            >
              hello@futurity247.com.au
            </a>
          </div>
          <div>
            <a
              href="tel:+61405510693"
              className="hover:text-accent-cyan transition-colors"
            >
              0405 510 693
            </a>
          </div>
          <div className="pt-3 text-text-dim">
            © {new Date().getFullYear()} Futurity247 · ABN 95 154 050 712
          </div>
        </div>
      </div>
    </footer>
  );
}
