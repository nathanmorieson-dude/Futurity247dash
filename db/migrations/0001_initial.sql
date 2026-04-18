create extension if not exists pgcrypto;

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null unique,
  business_name text not null,
  owner_name text,
  owner_phone text,
  owner_email text,
  twilio_number text,
  twilio_phone_number_sid text,
  retell_agent_id text,
  google_calendar_id text,
  pricing_plan text not null default 'starter' check (pricing_plan in ('starter', 'pro', 'premium')),
  service_call_fee numeric(10,2),
  business_hours_start time,
  business_hours_end time,
  timezone text not null default 'America/Los_Angeles',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.calls (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  retell_call_id text unique,
  caller_phone text,
  transcript text,
  summary text,
  sentiment text,
  outcome text,
  duration_seconds integer,
  recording_url text,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  call_id uuid references public.calls(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_address text,
  job_description text,
  job_type text not null,
  urgency text not null default 'low' check (urgency in ('low', 'medium', 'high', 'emergency')),
  lead_tier text check (lead_tier in ('hot', 'warm', 'cold')),
  estimated_value numeric(10,2),
  booking_status text not null default 'new' check (booking_status in ('new', 'booked', 'escalated', 'closed')),
  appointment_start timestamptz,
  appointment_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.billing_events (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  stripe_event_id text not null unique,
  event_type text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create or replace view public.monthly_usage as
select
  c.client_id,
  date_trunc('month', c.started_at)::date as usage_month,
  coalesce(sum(c.duration_seconds), 0) / 60.0 as total_minutes,
  count(*)::integer as total_calls
from public.calls c
group by c.client_id, date_trunc('month', c.started_at)::date;

create or replace view public.client_roi as
with lead_month as (
  select
    l.client_id,
    date_trunc('month', l.created_at)::date as roi_month,
    coalesce(sum(l.estimated_value), 0) as pipeline_value
  from public.leads l
  group by l.client_id, date_trunc('month', l.created_at)::date
)
select
  lm.client_id,
  lm.roi_month,
  case cl.pricing_plan
    when 'starter' then 299
    when 'pro' then 499
    when 'premium' then 899
    else 299
  end::numeric(10,2) as monthly_fee,
  lm.pipeline_value,
  case
    when case cl.pricing_plan
      when 'starter' then 299
      when 'pro' then 499
      when 'premium' then 899
      else 299
    end = 0 then 0
    else lm.pipeline_value / (case cl.pricing_plan
      when 'starter' then 299
      when 'pro' then 499
      when 'premium' then 899
      else 299
    end)
  end::numeric(10,2) as roi_ratio
from lead_month lm
join public.clients cl on cl.id = lm.client_id;

alter table public.clients enable row level security;
alter table public.calls enable row level security;
alter table public.leads enable row level security;
alter table public.billing_events enable row level security;

drop policy if exists "clients_select_own" on public.clients;
create policy "clients_select_own" on public.clients
for select using (auth.uid() = owner_user_id);

drop policy if exists "clients_update_own" on public.clients;
create policy "clients_update_own" on public.clients
for update using (auth.uid() = owner_user_id);

drop policy if exists "calls_select_own" on public.calls;
create policy "calls_select_own" on public.calls
for select using (
  exists (
    select 1
    from public.clients cl
    where cl.id = calls.client_id
      and cl.owner_user_id = auth.uid()
  )
);

drop policy if exists "leads_select_own" on public.leads;
create policy "leads_select_own" on public.leads
for select using (
  exists (
    select 1
    from public.clients cl
    where cl.id = leads.client_id
      and cl.owner_user_id = auth.uid()
  )
);

drop policy if exists "leads_update_own" on public.leads;
create policy "leads_update_own" on public.leads
for update using (
  exists (
    select 1
    from public.clients cl
    where cl.id = leads.client_id
      and cl.owner_user_id = auth.uid()
  )
);

create index if not exists idx_calls_client_started_at on public.calls(client_id, started_at desc);
create index if not exists idx_leads_client_created_at on public.leads(client_id, created_at desc);
create index if not exists idx_leads_client_tier on public.leads(client_id, lead_tier);
