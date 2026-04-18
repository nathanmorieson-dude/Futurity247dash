-- Futurity247 demo seed data for local/dev environments
-- Replace the UUIDs if needed. Keep the same client_id across rows for dashboard visibility.

insert into public.clients (
  id,
  owner_user_id,
  business_name,
  owner_name,
  owner_phone,
  owner_email,
  twilio_number,
  twilio_phone_number_sid,
  retell_agent_id,
  google_calendar_id,
  pricing_plan,
  service_call_fee,
  business_hours_start,
  business_hours_end,
  timezone
)
values (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'North Star Electric',
  'Alex Rivera',
  '+15555550111',
  'owner@northstarelectric.com',
  '+15555550100',
  'PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  'agent_billie_demo_001',
  'northstarelectric@gmail.com',
  'pro',
  99,
  '08:00',
  '17:00',
  'America/Los_Angeles'
)
on conflict (id) do update set
  business_name = excluded.business_name,
  owner_name = excluded.owner_name,
  owner_phone = excluded.owner_phone,
  owner_email = excluded.owner_email,
  twilio_number = excluded.twilio_number,
  pricing_plan = excluded.pricing_plan,
  service_call_fee = excluded.service_call_fee,
  business_hours_start = excluded.business_hours_start,
  business_hours_end = excluded.business_hours_end,
  timezone = excluded.timezone,
  updated_at = now();

insert into public.calls (
  id,
  client_id,
  retell_call_id,
  caller_phone,
  transcript,
  summary,
  sentiment,
  outcome,
  duration_seconds,
  recording_url,
  started_at,
  ended_at
)
values
(
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  'retell_call_demo_001',
  '+15555550201',
  'Caller needs a panel upgrade for an older home and asks for earliest appointment this week.',
  'Qualified panel upgrade lead, requested morning slot.',
  'positive',
  'booked',
  346,
  null,
  now() - interval '12 days',
  now() - interval '12 days' + interval '346 seconds'
),
(
  '33333333-3333-3333-3333-333333333332',
  '11111111-1111-1111-1111-111111111111',
  'retell_call_demo_002',
  '+15555550202',
  'Caller reports burning smell near breaker panel and flickering lights.',
  'Emergency triage triggered and owner alerted immediately.',
  'urgent',
  'escalated_emergency',
  214,
  null,
  now() - interval '5 days',
  now() - interval '5 days' + interval '214 seconds'
),
(
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  'retell_call_demo_003',
  '+15555550203',
  'Caller needs troubleshooting for intermittent outlet outages in garage.',
  'Lead captured and marked for owner follow-up.',
  'neutral',
  'message_taken',
  188,
  null,
  now() - interval '2 days',
  now() - interval '2 days' + interval '188 seconds'
)
on conflict (id) do update set
  transcript = excluded.transcript,
  summary = excluded.summary,
  sentiment = excluded.sentiment,
  outcome = excluded.outcome,
  duration_seconds = excluded.duration_seconds,
  ended_at = excluded.ended_at;

insert into public.leads (
  id,
  client_id,
  call_id,
  customer_name,
  customer_phone,
  customer_address,
  job_description,
  job_type,
  urgency,
  lead_tier,
  estimated_value,
  booking_status,
  appointment_start,
  appointment_end
)
values
(
  '44444444-4444-4444-4444-444444444441',
  '11111111-1111-1111-1111-111111111111',
  '33333333-3333-3333-3333-333333333331',
  'Jamie Cole',
  '+15555550201',
  '231 Harbor Ave',
  'Main panel upgrade requested for 1950s property.',
  'panel_upgrade',
  'high',
  'hot',
  3800,
  'booked',
  now() + interval '2 days',
  now() + interval '2 days' + interval '2 hours'
),
(
  '44444444-4444-4444-4444-444444444442',
  '11111111-1111-1111-1111-111111111111',
  '33333333-3333-3333-3333-333333333332',
  'Morgan Lee',
  '+15555550202',
  '778 Cedar St',
  'Burning smell near panel and active arcing sound.',
  'emergency',
  'emergency',
  'hot',
  1400,
  'escalated',
  null,
  null
),
(
  '44444444-4444-4444-4444-444444444443',
  '11111111-1111-1111-1111-111111111111',
  '33333333-3333-3333-3333-333333333333',
  'Taylor Brooks',
  '+15555550203',
  '412 Oak Ridge Rd',
  'Garage outlet failures, likely circuit troubleshooting needed.',
  'troubleshooting',
  'medium',
  'warm',
  650,
  'new',
  null,
  null
)
on conflict (id) do update set
  customer_name = excluded.customer_name,
  customer_phone = excluded.customer_phone,
  customer_address = excluded.customer_address,
  job_description = excluded.job_description,
  job_type = excluded.job_type,
  urgency = excluded.urgency,
  lead_tier = excluded.lead_tier,
  estimated_value = excluded.estimated_value,
  booking_status = excluded.booking_status,
  appointment_start = excluded.appointment_start,
  appointment_end = excluded.appointment_end,
  updated_at = now();
