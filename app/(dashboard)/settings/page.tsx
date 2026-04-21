import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardLabel } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CURRENT_CLIENT } from "@/lib/mock/data";
import { PLANS } from "@/lib/pricing";
import { formatCurrency, formatPhone } from "@/lib/utils";
import {
  Building2,
  CalendarCheck,
  CreditCard,
  Phone,
  ShieldAlert,
} from "lucide-react";

const HOURS = [
  { day: "Monday", open: "7:00 AM", close: "6:00 PM" },
  { day: "Tuesday", open: "7:00 AM", close: "6:00 PM" },
  { day: "Wednesday", open: "7:00 AM", close: "6:00 PM" },
  { day: "Thursday", open: "7:00 AM", close: "6:00 PM" },
  { day: "Friday", open: "7:00 AM", close: "5:00 PM" },
  { day: "Saturday", open: "8:00 AM", close: "2:00 PM" },
  { day: "Sunday", open: "Emergencies only", close: "" },
];

const KEYWORDS = [
  "smoke",
  "fire",
  "burning",
  "sparks",
  "shock",
  "no power",
  "switchboard hot",
  "safety switch tripping",
  "RCD won't reset",
  "wires exposed",
  "flooded switchboard",
  "pole down",
];

export default function SettingsPage() {
  const plan = PLANS[CURRENT_CLIENT.plan];

  return (
    <>
      <Topbar
        title="Settings"
        subtitle="Tune Billie for your business. Changes take effect on the next call."
      />

      <div className="px-6 py-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4 animate-fade-in-1">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-text-muted" />
                <CardLabel>Business</CardLabel>
              </div>
              <Button size="sm" variant="secondary">
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <Field label="Business name" value={CURRENT_CLIENT.business_name} />
              <Field label="Owner" value={CURRENT_CLIENT.owner_name} />
              <Field
                label="Owner mobile"
                value={formatPhone(CURRENT_CLIENT.phone_number)}
                hint="Where Billie escalates emergencies"
              />
              <Field
                label="Service area"
                value={`${CURRENT_CLIENT.city}, ${CURRENT_CLIENT.state}`}
              />
              <Field label="Call-out fee" value="$149 inc. GST" hint="Only number Billie will quote" />
              <Field label="Electrical licence #" value="QLD EC 88294 (ERAC)" />
              <Field label="ABN" value="95 154 050 712" />
              <Field label="Public liability" value="$20M · QBE" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-text-muted" />
                <CardLabel>Business hours</CardLabel>
              </div>
              <Badge tone="cyan" dot>
                Billie answers 24/7
              </Badge>
            </div>
            <ul className="divide-y divide-white/[0.04] text-sm">
              {HOURS.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between py-2.5"
                >
                  <span className="text-text-muted">{h.day}</span>
                  <span className="tabular-nums text-text-primary">
                    {h.close ? `${h.open} – ${h.close}` : h.open}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-accent-warn" />
                <CardLabel>Emergency keywords</CardLabel>
              </div>
              <Button size="sm" variant="secondary">
                Add keyword
              </Button>
            </div>
            <p className="text-xs text-text-muted mb-3 leading-relaxed">
              When a caller uses any of these phrases, Billie immediately texts
              you and skips the booking flow. Tuned for electrical hazards.
            </p>
            <div className="flex flex-wrap gap-2">
              {KEYWORDS.map((k) => (
                <Badge key={k} tone="warn">
                  {k}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4 animate-fade-in-2">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-text-muted" />
                <CardLabel>Phone number</CardLabel>
              </div>
              <Badge tone="good" dot>
                Live
              </Badge>
            </div>
            <div className="text-display text-2xl">
              {formatPhone(CURRENT_CLIENT.twilio_number)}
            </div>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Forward your business line to this Twilio number. Your customers
              never know it isn&apos;t you.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button size="sm">Forwarding instructions</Button>
              <Button size="sm" variant="secondary">
                Test call
              </Button>
            </div>
          </Card>

          <Card className="relative overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-60"
              style={{
                background:
                  "radial-gradient(60% 60% at 100% 0%, rgba(163,230,53,0.10), transparent 60%)",
              }}
            />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-text-muted" />
                <CardLabel>Plan</CardLabel>
              </div>
              <Badge tone="lime">{plan.name}</Badge>
            </div>
            <div className="text-display text-3xl">
              {formatCurrency(plan.price)}
              <span className="text-sm text-text-muted ml-2 font-sans">
                / month
              </span>
            </div>
            <div className="mt-3 text-xs text-text-muted">
              {plan.minutes} minutes included · ${plan.overage.toFixed(2)}/min
              over
            </div>
            <ul className="mt-4 space-y-1.5 text-xs text-text-muted">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent-lime" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button size="sm" variant="secondary">
                Manage billing
              </Button>
              <Button size="sm">Upgrade plan</Button>
            </div>
          </Card>

          <Card>
            <CardLabel>Calendar</CardLabel>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-sm text-text-primary">
                  marcus@keystoneelec.com
                </div>
                <div className="text-xs text-text-dim">
                  Google Calendar · 4 calendars synced
                </div>
              </div>
              <Badge tone="good" dot>
                Connected
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="font-mono-alt text-text-dim mb-1">{label}</div>
      <div className="text-text-primary">{value}</div>
      {hint ? <div className="text-[11px] text-text-dim mt-1">{hint}</div> : null}
    </div>
  );
}
