# Futurity247

Vertical SaaS AI receptionist platform for electrical contractors.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS
- Supabase (Postgres/Auth/RLS)
- Retell AI + Twilio + Google Calendar + Stripe

## Local development

1. Copy `.env.example` to `.env.local` and provide real credentials.
2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Database

- Primary schema: `db/schema.sql`
- Initial migration: `db/migrations/0001_initial.sql`

Apply schema using your normal Supabase migration flow.

## Key routes

- Marketing: `/`, `/pricing`, `/about`
- Auth: `/auth/login`, `/auth/callback`
- Dashboard: `/dashboard`, `/calls`, `/leads`, `/settings`, `/onboarding`, `/admin`
- Retell functions: `/api/functions/*`
- Webhooks: `/api/webhooks/call_ended`, `/api/stripe/webhook`
