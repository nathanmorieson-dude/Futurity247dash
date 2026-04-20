import type {
  Call,
  Client,
  DailyMetric,
  Lead,
  TranscriptTurn,
} from "@/lib/types";
import { JOB_VALUE_ESTIMATES, PLANS } from "@/lib/pricing";

export const CURRENT_CLIENT: Client = {
  id: "client_keystone",
  business_name: "Keystone Electric",
  owner_name: "Marcus Reilly",
  plan: "pro",
  phone_number: "+15125550144",
  twilio_number: "+15125550190",
  city: "Austin",
  state: "TX",
  monthly_fee: PLANS.pro.price,
  included_minutes: PLANS.pro.minutes,
  overage_rate: PLANS.pro.overage,
  active_since: "2025-09-12T00:00:00.000Z",
};

const now = new Date("2026-04-18T17:32:00-05:00");

function isoMinusMinutes(min: number) {
  return new Date(now.getTime() - min * 60_000).toISOString();
}
function isoPlusMinutes(min: number) {
  return new Date(now.getTime() + min * 60_000).toISOString();
}

function turn(speaker: TranscriptTurn["speaker"], text: string, ts: number): TranscriptTurn {
  return { speaker, text, ts_seconds: ts };
}

export const LEADS: Lead[] = [
  {
    id: "lead_01",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Diane Whitlow",
    caller_phone: "+15125557721",
    job_type: "no_power",
    job_description: "Half the house lost power after a breaker keeps tripping. Needs same-day.",
    urgency: "emergency",
    temperature: "hot",
    status: "qualified",
    estimated_value: 850,
    amount_closed: 200,
    address: "4129 Bouldin Ave, Austin TX",
    created_at: isoMinusMinutes(18),
  },
  {
    id: "lead_02",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Jorge Medina",
    caller_phone: "+15125550021",
    job_type: "panel_upgrade",
    job_description: "200A panel upgrade quote — adding ADU in backyard.",
    urgency: "standard",
    temperature: "hot",
    status: "booked",
    estimated_value: 3400,
    amount_closed: 200,
    scheduled_for: isoPlusMinutes(60 * 22),
    address: "1909 E 12th St, Austin TX",
    created_at: isoMinusMinutes(95),
  },
  {
    id: "lead_03",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Priya Subramanian",
    caller_phone: "+15125557334",
    job_type: "ev_charger",
    job_description: "Tesla wall connector install in garage. Has Model Y on order.",
    urgency: "standard",
    temperature: "warm",
    status: "booked",
    estimated_value: 1650,
    amount_closed: 200,
    scheduled_for: isoPlusMinutes(60 * 48),
    address: "8211 Mesa Dr, Austin TX",
    created_at: isoMinusMinutes(60 * 4),
  },
  {
    id: "lead_04",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Rebecca Olsen",
    caller_phone: "+15125559912",
    job_type: "outlet_repair",
    job_description: "Two GFCI outlets in kitchen not resetting after storm.",
    urgency: "urgent",
    temperature: "warm",
    status: "booked",
    estimated_value: 320,
    amount_closed: 200,
    scheduled_for: isoPlusMinutes(60 * 4),
    address: "2207 Travis Heights Blvd, Austin TX",
    created_at: isoMinusMinutes(60 * 6),
  },
  {
    id: "lead_05",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Hank Voss",
    caller_phone: "+15125554180",
    job_type: "generator",
    job_description: "Whole-home Generac install. Has the unit, needs transfer switch + tie-in.",
    urgency: "standard",
    temperature: "hot",
    status: "qualified",
    estimated_value: 5200,
    amount_closed: 200,
    address: "12 Bee Cave Rd, Austin TX",
    created_at: isoMinusMinutes(60 * 9),
  },
  {
    id: "lead_06",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Lena Park",
    caller_phone: "+15125557098",
    job_type: "ceiling_fan",
    job_description: "Replace 2 ceiling fans in master + guest bedroom.",
    urgency: "standard",
    temperature: "cold",
    status: "new",
    estimated_value: 380,
    amount_closed: 200,
    created_at: isoMinusMinutes(60 * 11),
  },
  {
    id: "lead_07",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Marcus Tate",
    caller_phone: "+15125558844",
    job_type: "lighting",
    job_description: "Recessed can lights for new kitchen reno (about 12 cans).",
    urgency: "standard",
    temperature: "warm",
    status: "qualified",
    estimated_value: 1100,
    amount_closed: 200,
    created_at: isoMinusMinutes(60 * 14),
  },
  {
    id: "lead_08",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Brittany Cho",
    caller_phone: "+15125551122",
    job_type: "smoke_detector",
    job_description: "Hardwired smoke detectors — 3 chirping all night.",
    urgency: "urgent",
    temperature: "warm",
    status: "completed",
    estimated_value: 240,
    amount_closed: 200,
    scheduled_for: isoMinusMinutes(60 * 19),
    address: "511 W 32nd St, Austin TX",
    created_at: isoMinusMinutes(60 * 20),
  },
  {
    id: "lead_09",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Tom Garrett",
    caller_phone: "+15125559001",
    job_type: "rewire",
    job_description: "1940s craftsman, knob & tube. Wants quote for full rewire.",
    urgency: "standard",
    temperature: "hot",
    status: "qualified",
    estimated_value: 9800,
    amount_closed: 200,
    address: "604 Hyde Park Ave, Austin TX",
    created_at: isoMinusMinutes(60 * 24),
  },
  {
    id: "lead_10",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Sandra Liu",
    caller_phone: "+15125550407",
    job_type: "inspection",
    job_description: "Pre-purchase electrical inspection on 1980s ranch.",
    urgency: "standard",
    temperature: "warm",
    status: "booked",
    estimated_value: 320,
    amount_closed: 200,
    scheduled_for: isoPlusMinutes(60 * 30),
    address: "9020 Oak Trail, Austin TX",
    created_at: isoMinusMinutes(60 * 26),
  },
  {
    id: "lead_11",
    client_id: CURRENT_CLIENT.id,
    caller_name: "David Kohn",
    caller_phone: "+15125555512",
    job_type: "wiring",
    job_description: "Adding a 240V circuit for new dryer.",
    urgency: "standard",
    temperature: "warm",
    status: "completed",
    estimated_value: 480,
    amount_closed: 200,
    scheduled_for: isoMinusMinutes(60 * 30),
    created_at: isoMinusMinutes(60 * 32),
  },
  {
    id: "lead_12",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Ana Ferreira",
    caller_phone: "+15125559980",
    job_type: "lighting",
    job_description: "Pendant lights over kitchen island — 3 fixtures, customer-supplied.",
    urgency: "standard",
    temperature: "cold",
    status: "lost",
    estimated_value: 280,
    amount_closed: 200,
    created_at: isoMinusMinutes(60 * 38),
  },
];

const transcript01: TranscriptTurn[] = [
  turn("billie", "Keystone Electric, this is Billie. How can I help you today?", 0),
  turn(
    "caller",
    "Hi, half my house just lost power. The breaker for the kitchen and living room keeps tripping when I reset it.",
    4
  ),
  turn(
    "billie",
    "Okay, that sounds serious — I want to get someone out to you today. Before anything else, are you smelling burning, or do you see any sparks or scorch marks at the panel?",
    11
  ),
  turn("caller", "No burning smell. The panel looks normal but it's warm.", 19),
  turn(
    "billie",
    "Got it. Please don't try to reset that breaker again — leave it in the off position. I'm going to flag this to Marcus right now and get you on the schedule. Can I grab your name and the best callback number?",
    24
  ),
  turn("caller", "Diane Whitlow. The number you have is fine — 512-555-7721.", 34),
  turn(
    "billie",
    "Just to confirm — 512, 555, 7721. Is that right?",
    41
  ),
  turn("caller", "Yes that's correct.", 46),
  turn(
    "billie",
    "Perfect. And what's the service address?",
    49
  ),
  turn("caller", "4129 Bouldin Ave in Austin.", 52),
  turn(
    "billie",
    "Thank you Diane. I have a same-day slot at 6:15 PM today. Marcus is already getting a text alert about your situation. Does 6:15 work?",
    58
  ),
  turn("caller", "Yes, please. Thank you so much.", 70),
  turn(
    "billie",
    "You're booked. You'll get a text confirmation in just a moment. If anything changes — burning smell, smoke, anything — call 911 first, then call us back. Take care, Diane.",
    73
  ),
];

const transcript02: TranscriptTurn[] = [
  turn("billie", "Keystone Electric, this is Billie. How can I help?", 0),
  turn(
    "caller",
    "Hey, I'm building an ADU in my backyard and I think I need a panel upgrade. Probably 200 amp.",
    3
  ),
  turn(
    "billie",
    "Great — that's something we do a lot of. I can have an electrician come give you an on-site quote. Are you the homeowner?",
    10
  ),
  turn("caller", "Yeah, Jorge Medina. Address is 1909 East 12th Street.", 17),
  turn(
    "billie",
    "Perfect. And the best callback number for you?",
    23
  ),
  turn("caller", "512-555-0021.", 26),
  turn(
    "billie",
    "Just to confirm — 512, 555, 0021?",
    29
  ),
  turn("caller", "Yes.", 33),
  turn(
    "billie",
    "We have an opening Monday at 3:00 PM for a panel-upgrade quote. Does that work?",
    35
  ),
  turn("caller", "That works.", 41),
  turn(
    "billie",
    "Booked. You'll get a confirmation text in a minute. The electrician will give you the quote on-site. Thanks Jorge.",
    43
  ),
];

const transcript03: TranscriptTurn[] = [
  turn("billie", "Keystone Electric, this is Billie.", 0),
  turn("caller", "How much do you guys charge for a service call?", 2),
  turn(
    "billie",
    "Our service-call fee is $89, which gets the electrician on-site for diagnosis. Anything beyond that, they'll quote you before they start work. What's going on at the property?",
    5
  ),
  turn("caller", "Just shopping around right now. I'll call back.", 14),
  turn("billie", "Sounds good. Whenever you're ready, we're here. Have a good one.", 18),
];

const transcript04: TranscriptTurn[] = [
  turn("billie", "Keystone Electric, this is Billie.", 0),
  turn(
    "caller",
    "Yeah hi, my smoke detectors are chirping all over the house — like 3 of them. They're hardwired.",
    3
  ),
  turn(
    "billie",
    "That's a common one. Sounds like the backup batteries need swapping but if it keeps happening after that, the units themselves may be at end of life. I can get someone out to check. Best callback number?",
    11
  ),
  turn("caller", "Brittany Cho — 512-555-1122.", 22),
  turn(
    "billie",
    "Got it — 512, 555, 1122. And the address?",
    27
  ),
  turn("caller", "511 West 32nd Street, Austin.", 32),
  turn(
    "billie",
    "I have tomorrow at 9:30 AM. Does that work?",
    37
  ),
  turn("caller", "Yes please.", 41),
  turn("billie", "Booked. You'll get a text confirmation. Thanks Brittany.", 43),
];

export const CALLS: Call[] = [
  {
    id: "call_01",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+15125557721",
    caller_name: "Diane Whitlow",
    duration_seconds: 88,
    outcome: "escalated",
    urgency: "emergency",
    job_type: "no_power",
    summary:
      "Recurring breaker trip on main living-room circuit, panel feels warm. Escalated to Marcus immediately and booked same-day 6:15 PM service.",
    transcript: transcript01,
    sentiment: "neutral",
    estimated_value: 850,
    lead_id: "lead_01",
    started_at: isoMinusMinutes(18),
  },
  {
    id: "call_02",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+15125550021",
    caller_name: "Jorge Medina",
    duration_seconds: 52,
    outcome: "booked",
    urgency: "standard",
    job_type: "panel_upgrade",
    summary:
      "Homeowner building ADU, needs 200A panel upgrade quote. Booked Monday 3:00 PM.",
    transcript: transcript02,
    sentiment: "positive",
    estimated_value: 3400,
    lead_id: "lead_02",
    started_at: isoMinusMinutes(95),
  },
  {
    id: "call_03",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+15125552004",
    duration_seconds: 22,
    outcome: "qualified",
    urgency: "informational",
    summary: "Price-shopping caller. Quoted service-call fee. Did not book.",
    transcript: transcript03,
    sentiment: "neutral",
    started_at: isoMinusMinutes(140),
  },
  {
    id: "call_04",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+15125551122",
    caller_name: "Brittany Cho",
    duration_seconds: 47,
    outcome: "booked",
    urgency: "urgent",
    job_type: "smoke_detector",
    summary: "3 hardwired smoke detectors chirping. Booked next morning 9:30.",
    transcript: transcript04,
    sentiment: "positive",
    estimated_value: 240,
    lead_id: "lead_08",
    started_at: isoMinusMinutes(60 * 20),
  },
  {
    id: "call_05",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+15125557334",
    caller_name: "Priya Subramanian",
    duration_seconds: 71,
    outcome: "booked",
    urgency: "standard",
    job_type: "ev_charger",
    summary:
      "Tesla wall connector install for incoming Model Y. Booked Monday 11 AM. Mentioned 60A circuit.",
    transcript: transcript02,
    sentiment: "positive",
    estimated_value: 1650,
    lead_id: "lead_03",
    started_at: isoMinusMinutes(60 * 4),
  },
  {
    id: "call_06",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+15125559912",
    caller_name: "Rebecca Olsen",
    duration_seconds: 40,
    outcome: "booked",
    urgency: "urgent",
    job_type: "outlet_repair",
    summary: "Two kitchen GFCIs not resetting after storm. Booked same-day 9 PM.",
    transcript: transcript04,
    sentiment: "positive",
    estimated_value: 320,
    lead_id: "lead_04",
    started_at: isoMinusMinutes(60 * 6),
  },
  {
    id: "call_07",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+15125554180",
    caller_name: "Hank Voss",
    duration_seconds: 96,
    outcome: "qualified",
    urgency: "standard",
    job_type: "generator",
    summary:
      "Generac install — homeowner has the unit, needs transfer switch + tie-in. Hot lead, owner alerted.",
    transcript: transcript02,
    sentiment: "positive",
    estimated_value: 5200,
    lead_id: "lead_05",
    started_at: isoMinusMinutes(60 * 9),
  },
  {
    id: "call_08",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+15125557098",
    caller_name: "Lena Park",
    duration_seconds: 33,
    outcome: "messaged",
    urgency: "standard",
    job_type: "ceiling_fan",
    summary: "Replace 2 ceiling fans. Wanted ballpark price — declined to book.",
    transcript: transcript03,
    sentiment: "neutral",
    estimated_value: 380,
    lead_id: "lead_06",
    started_at: isoMinusMinutes(60 * 11),
  },
  {
    id: "call_09",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+15125558844",
    caller_name: "Marcus Tate",
    duration_seconds: 64,
    outcome: "qualified",
    urgency: "standard",
    job_type: "lighting",
    summary: "Recessed cans for kitchen reno. Wants quote next week.",
    transcript: transcript02,
    sentiment: "positive",
    estimated_value: 1100,
    lead_id: "lead_07",
    started_at: isoMinusMinutes(60 * 14),
  },
  {
    id: "call_10",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+15125550407",
    caller_name: "Sandra Liu",
    duration_seconds: 38,
    outcome: "booked",
    urgency: "standard",
    job_type: "inspection",
    summary: "Pre-purchase inspection on 1980s ranch. Booked Sunday 11 AM.",
    transcript: transcript04,
    sentiment: "positive",
    estimated_value: 320,
    lead_id: "lead_10",
    started_at: isoMinusMinutes(60 * 26),
  },
  {
    id: "call_11",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+15125559001",
    caller_name: "Tom Garrett",
    duration_seconds: 119,
    outcome: "qualified",
    urgency: "standard",
    job_type: "rewire",
    summary:
      "1940s craftsman with knob & tube. Hot lead — owner alerted. Will call to schedule walkthrough.",
    transcript: transcript02,
    sentiment: "positive",
    estimated_value: 9800,
    lead_id: "lead_09",
    started_at: isoMinusMinutes(60 * 24),
  },
  {
    id: "call_12",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+15125550900",
    duration_seconds: 9,
    outcome: "spam",
    urgency: "informational",
    summary: "Robocall — auto-warranty solicitation.",
    transcript: [
      turn("billie", "Keystone Electric, this is Billie.", 0),
      turn("caller", "[automated voice] We have important news about your vehicle warranty —", 2),
    ],
    sentiment: "neutral",
    started_at: isoMinusMinutes(60 * 28),
  },
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildDailyMetrics(): DailyMetric[] {
  const days: DailyMetric[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const seed = (i * 9301 + 49297) % 233280;
    const rand = (n: number) =>
      Math.floor(((Math.sin(seed * (n + 1)) + 1) / 2) * 1000) / 1000;
    const dayOfWeek = d.getDay();
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.55 : 1;
    const calls = Math.round(8 + rand(1) * 14 * weekendFactor);
    const booked = Math.round(calls * (0.45 + rand(2) * 0.25));
    const emergencies = Math.round(rand(3) * 3 * weekendFactor);
    const minutes = Math.round(calls * (1.6 + rand(4) * 1.2));
    const pipeline_value = Math.round(
      booked * (320 + rand(5) * 1800) +
        emergencies * (450 + rand(6) * 600)
    );
    days.push({
      date: d.toISOString().slice(0, 10),
      calls,
      booked,
      emergencies,
      minutes,
      pipeline_value,
    });
  }
  // overlay today with the actual call counts so it lines up with the call list
  const today = days[days.length - 1];
  const todaysCalls = CALLS.filter((c) =>
    isSameDay(new Date(c.started_at), now)
  );
  today.calls = todaysCalls.length;
  today.booked = todaysCalls.filter((c) => c.outcome === "booked").length;
  today.emergencies = todaysCalls.filter((c) => c.urgency === "emergency").length;
  today.minutes = Math.round(
    todaysCalls.reduce((acc, c) => acc + c.duration_seconds, 0) / 60
  );
  today.pipeline_value = todaysCalls.reduce(
    (acc, c) => acc + (c.estimated_value ?? 0),
    0
  );
  return days;
}

export const DAILY_METRICS: DailyMetric[] = buildDailyMetrics();

export function monthToDateMetrics() {
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const mtd = DAILY_METRICS.filter((d) => new Date(d.date) >= start);
  const calls = mtd.reduce((a, d) => a + d.calls, 0);
  const booked = mtd.reduce((a, d) => a + d.booked, 0);
  const emergencies = mtd.reduce((a, d) => a + d.emergencies, 0);
  const minutes = mtd.reduce((a, d) => a + d.minutes, 0);
  const pipeline_value = mtd.reduce((a, d) => a + d.pipeline_value, 0);
  const bookingRate = calls === 0 ? 0 : booked / calls;
  return { calls, booked, emergencies, minutes, pipeline_value, bookingRate };
}

export function lastNDaysMetrics(n: number) {
  return DAILY_METRICS.slice(-n);
}

export function jobTypeBreakdown() {
  const counts: Record<string, { value: number; count: number; label: string }> = {};
  for (const lead of LEADS) {
    const meta = JOB_VALUE_ESTIMATES[lead.job_type];
    if (!counts[lead.job_type]) {
      counts[lead.job_type] = { value: 0, count: 0, label: meta.label };
    }
    counts[lead.job_type].value += lead.estimated_value;
    counts[lead.job_type].count += 1;
  }
  return Object.entries(counts)
    .map(([key, v]) => ({ key, ...v }))
    .sort((a, b) => b.value - a.value);
}

export function leadFunnel() {
  const total = LEADS.length;
  const qualified = LEADS.filter((l) =>
    ["qualified", "booked", "completed"].includes(l.status)
  ).length;
  const booked = LEADS.filter((l) =>
    ["booked", "completed"].includes(l.status)
  ).length;
  const completed = LEADS.filter((l) => l.status === "completed").length;
  return [
    { stage: "Calls answered", value: CALLS.length, accent: "cyan" as const },
    { stage: "Leads qualified", value: total, accent: "cyan" as const },
    { stage: "Hot + warm", value: qualified, accent: "lime" as const },
    { stage: "Booked", value: booked, accent: "lime" as const },
    { stage: "Completed", value: completed, accent: "good" as const },
  ];
}

export function callsByHour() {
  const buckets: { hour: number; calls: number }[] = Array.from(
    { length: 24 },
    (_, h) => ({ hour: h, calls: 0 })
  );
  for (const c of CALLS) {
    const h = new Date(c.started_at).getHours();
    buckets[h].calls += 1;
  }
  // synthesize a small baseline so the chart doesn't look empty in early hours
  const synthetic = [
    1, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 5, 6, 7, 6, 5, 3, 2, 2, 1, 1, 1,
  ];
  return buckets.map((b, i) => ({
    hour: b.hour,
    calls: Math.max(b.calls, synthetic[i]),
  }));
}

export function pipelineThisMonth() {
  return LEADS.filter((l) => l.status !== "lost").reduce(
    (a, l) => a + l.estimated_value,
    0
  );
}

export function closedThisMonth() {
  return LEADS.reduce((a, l) => a + l.amount_closed, 0);
}

export function closedByStatus() {
  const map: Record<string, number> = {};
  for (const l of LEADS) {
    map[l.status] = (map[l.status] ?? 0) + l.amount_closed;
  }
  return map;
}

export function activeRoi() {
  const pipeline = pipelineThisMonth();
  return {
    pipeline,
    fee: CURRENT_CLIENT.monthly_fee,
    multiple: pipeline / CURRENT_CLIENT.monthly_fee,
  };
}
