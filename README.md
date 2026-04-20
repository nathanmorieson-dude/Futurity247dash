# Futurity247

24/7 AI receptionist for electrical contractors. Built around **Billie**, an AI agent that answers customer calls, books jobs into Google Calendar, and escalates emergencies to the owner in real time.

This repo currently contains the **front-end dashboard and marketing site**. It runs entirely on rich mock data (see `lib/mock/data.ts`) so the product team can iterate on UI/UX before the live API integrations land. When the Retell / Twilio / Supabase wiring is ready, the mock data layer will be swapped out behind the same component interfaces.

## Stack

- **Next.js 14** (App Router) + React 18 + TypeScript (strict)
- **Tailwind CSS** for styling
- **Recharts** for charts
- **lucide-react** for icons
- **Geist** (body) + **Instrument Serif** (display) — the only two fonts allowed by the design system
- Hand-rolled UI primitives in `components/ui` (Card, Badge, Button)

## Quick start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

- `/` — marketing landing page
- `/dashboard` — the operator dashboard (linked from "See live demo")
- `/calls` — call history (click a row for the detail view + transcript)
- `/leads` — Kanban-style pipeline view
- `/schedule` — upcoming jobs grouped by day
- `/billie` — Billie's profile, rules, voice/brain config
- `/insights` — trend charts
- `/settings` — business config, hours, emergency keywords, plan

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Design system

Colors and tokens live in `tailwind.config.ts`. Component conventions:

- Cards use the `glass` utility from `app/globals.css` (deep-navy + 14px backdrop-blur)
- Display text uses `text-display` (Instrument Serif, light, tight tracking)
- Small caps labels use `font-mono-alt` — Geist with wide tracking + uppercase, **never** a monospace font
- Page entrance is staggered with `animate-fade-in-{1,2,3,4}`
- Background ambience is the spotlight + grid in `components/ambient-background.tsx`

## Mock data

All dashboard data is sourced from `lib/mock/data.ts`. It includes:

- A current "Keystone Electric" client (Pro plan, Austin TX)
- 12 leads spanning the full status pipeline
- 12 calls (with realistic transcripts, including an emergency)
- 30-day daily metrics rollup
- Helper rollups (`monthToDateMetrics`, `jobTypeBreakdown`, `leadFunnel`, etc.)

When the Supabase backend lands, replace the helpers in `lib/mock/data.ts` with real queries from `lib/supabase` — components don't need to change.

## File layout

```
app/
  page.tsx                    Marketing landing page
  layout.tsx                  Root layout (fonts, metadata)
  globals.css                 Design tokens + utility classes
  (dashboard)/                All authenticated dashboard routes
    layout.tsx                Sidebar + ambient background shell
    dashboard/page.tsx        Operator overview
    calls/page.tsx            Call list
    calls/[callId]/page.tsx   Call detail (transcript + audio + override)
    leads/page.tsx            Pipeline kanban
    schedule/page.tsx         Upcoming jobs grouped by day
    billie/page.tsx           Agent profile & rules
    insights/page.tsx         Trend charts
    settings/page.tsx         Business config

components/
  ambient-background.tsx      Mouse-following spotlight + grid
  ui/                         Card, Badge, Button primitives
  dashboard/                  StatCard, ROICard, charts, CallRow,
                              LeadCard, LeadFunnelChart, Sidebar, Topbar,
                              UpcomingJobs, EmergencyAlertBanner

lib/
  types.ts                    Domain types (Client, Lead, Call, etc.)
  pricing.ts                  Plan definitions + job-value estimates
  utils.ts                    cn(), formatters
  mock/data.ts                All seed data + rollups
```

## Next up (per CLAUDE.md priorities)

- [ ] Wire dashboard to real Supabase data (replace `lib/mock/data.ts` callers)
- [ ] Supabase Auth + magic-link flow
- [ ] Onboarding wizard (business info → calendar → Twilio → forwarding)
- [ ] Stripe subscription + usage metering
- [ ] Call detail audio playback
- [ ] Admin panel
