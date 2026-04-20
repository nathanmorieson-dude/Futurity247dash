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
  business_name: "Keystone Electrical",
  owner_name: "Marcus Reilly",
  plan: "pro",
  phone_number: "+61412550144",
  twilio_number: "+61731119900",
  city: "Brisbane",
  state: "QLD",
  monthly_fee: PLANS.pro.price,
  included_minutes: PLANS.pro.minutes,
  overage_rate: PLANS.pro.overage,
  active_since: "2025-09-12T00:00:00.000Z",
};

const now = new Date("2026-04-18T17:32:00+10:00");

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
    caller_name: "Diane Whitlam",
    caller_phone: "+61431557721",
    job_type: "no_power",
    job_description: "Half the house lost power after the safety switch keeps tripping. Needs same-day.",
    urgency: "emergency",
    temperature: "hot",
    status: "qualified",
    estimated_value: 1280,
    amount_closed: 200,
    address: "412 Boundary St, West End QLD 4101",
    created_at: isoMinusMinutes(18),
  },
  {
    id: "lead_02",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Jorge Medina",
    caller_phone: "+61412550021",
    job_type: "panel_upgrade",
    job_description: "Switchboard upgrade quote — adding granny flat out the back, needs three-phase check.",
    urgency: "standard",
    temperature: "hot",
    status: "booked",
    estimated_value: 4900,
    amount_closed: 200,
    scheduled_for: isoPlusMinutes(60 * 22),
    address: "19 Latrobe Tce, Paddington QLD 4064",
    created_at: isoMinusMinutes(95),
  },
  {
    id: "lead_03",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Priya Subramanian",
    caller_phone: "+61404557334",
    job_type: "ev_charger",
    job_description: "Tesla wall connector install in garage. Has Model Y on order.",
    urgency: "standard",
    temperature: "warm",
    status: "booked",
    estimated_value: 2400,
    amount_closed: 200,
    scheduled_for: isoPlusMinutes(60 * 48),
    address: "82 Mesa Dr, Toowong QLD 4066",
    created_at: isoMinusMinutes(60 * 4),
  },
  {
    id: "lead_04",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Rebecca Olsen",
    caller_phone: "+61438559912",
    job_type: "outlet_repair",
    job_description: "Two kitchen powerpoints not working after the storm last night.",
    urgency: "urgent",
    temperature: "warm",
    status: "booked",
    estimated_value: 480,
    amount_closed: 200,
    scheduled_for: isoPlusMinutes(60 * 4),
    address: "22 Hardgrave Rd, West End QLD 4101",
    created_at: isoMinusMinutes(60 * 6),
  },
  {
    id: "lead_05",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Hank Voss",
    caller_phone: "+61419554180",
    job_type: "generator",
    job_description: "Backup generator install for home office. Has the unit, needs changeover switch + tie-in.",
    urgency: "standard",
    temperature: "hot",
    status: "qualified",
    estimated_value: 7500,
    amount_closed: 200,
    address: "12 Moggill Rd, Taringa QLD 4068",
    created_at: isoMinusMinutes(60 * 9),
  },
  {
    id: "lead_06",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Lena Park",
    caller_phone: "+61423557098",
    job_type: "ceiling_fan",
    job_description: "Replace 2 ceiling fans in master + spare bedroom.",
    urgency: "standard",
    temperature: "cold",
    status: "new",
    estimated_value: 560,
    amount_closed: 200,
    created_at: isoMinusMinutes(60 * 11),
  },
  {
    id: "lead_07",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Marcus Tate",
    caller_phone: "+61403558844",
    job_type: "lighting",
    job_description: "Downlights for new kitchen reno — about 12 LEDs.",
    urgency: "standard",
    temperature: "warm",
    status: "qualified",
    estimated_value: 1650,
    amount_closed: 200,
    created_at: isoMinusMinutes(60 * 14),
  },
  {
    id: "lead_08",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Brittany Cho",
    caller_phone: "+61431551122",
    job_type: "smoke_detector",
    job_description: "Hardwired smoke alarms — 3 chirping all night. Needs to meet QLD 2022 compliance.",
    urgency: "urgent",
    temperature: "warm",
    status: "completed",
    estimated_value: 360,
    amount_closed: 200,
    scheduled_for: isoMinusMinutes(60 * 19),
    address: "51 Enoggera Tce, Red Hill QLD 4059",
    created_at: isoMinusMinutes(60 * 20),
  },
  {
    id: "lead_09",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Tom Garrett",
    caller_phone: "+61427559001",
    job_type: "rewire",
    job_description: "1930s Queenslander, old VIR cabling. Wants a quote for a full rewire.",
    urgency: "standard",
    temperature: "hot",
    status: "qualified",
    estimated_value: 14500,
    amount_closed: 200,
    address: "60 Wellington St, Clayfield QLD 4011",
    created_at: isoMinusMinutes(60 * 24),
  },
  {
    id: "lead_10",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Sandra Liu",
    caller_phone: "+61414550407",
    job_type: "inspection",
    job_description: "Pre-purchase electrical inspection on 1980s lowset in Carindale.",
    urgency: "standard",
    temperature: "warm",
    status: "booked",
    estimated_value: 480,
    amount_closed: 200,
    scheduled_for: isoPlusMinutes(60 * 30),
    address: "90 Creek Rd, Carindale QLD 4152",
    created_at: isoMinusMinutes(60 * 26),
  },
  {
    id: "lead_11",
    client_id: CURRENT_CLIENT.id,
    caller_name: "David Kohn",
    caller_phone: "+61408555512",
    job_type: "wiring",
    job_description: "Adding a dedicated 15A circuit for new heat-pump dryer.",
    urgency: "standard",
    temperature: "warm",
    status: "completed",
    estimated_value: 720,
    amount_closed: 200,
    scheduled_for: isoMinusMinutes(60 * 30),
    created_at: isoMinusMinutes(60 * 32),
  },
  {
    id: "lead_12",
    client_id: CURRENT_CLIENT.id,
    caller_name: "Ana Ferreira",
    caller_phone: "+61416559980",
    job_type: "lighting",
    job_description: "Pendant lights over the kitchen island — 3 fittings, customer-supplied.",
    urgency: "standard",
    temperature: "cold",
    status: "lost",
    estimated_value: 420,
    amount_closed: 200,
    created_at: isoMinusMinutes(60 * 38),
  },
];

const transcript01: TranscriptTurn[] = [
  turn("billie", "Keystone Electrical, this is Billie. How can I help you today?", 0),
  turn(
    "caller",
    "Hi, half my house just lost power. The safety switch for the kitchen and lounge keeps tripping when I reset it.",
    4
  ),
  turn(
    "billie",
    "Okay, that sounds serious — I want to get someone out to you today. Before anything else, are you smelling burning, or do you see any scorch marks around the switchboard?",
    11
  ),
  turn("caller", "No burning smell. The board looks normal but it's warm to touch.", 19),
  turn(
    "billie",
    "Got it. Please don't try to reset that safety switch again — leave it in the off position. I'm going to flag this to Marcus right now and get you on the schedule. Can I grab your name and the best callback number?",
    24
  ),
  turn("caller", "Diane Whitlam. The number you have is fine — 0431 557 721.", 34),
  turn(
    "billie",
    "Just to confirm — 0431, 557, 721. Is that right?",
    41
  ),
  turn("caller", "Yes that's correct.", 46),
  turn(
    "billie",
    "Perfect. And what's the service address?",
    49
  ),
  turn("caller", "412 Boundary Street, West End.", 52),
  turn(
    "billie",
    "Thanks Diane. I have a same-day slot at 6:15 PM today. Marcus is already getting a text alert about your situation. Does 6:15 work?",
    58
  ),
  turn("caller", "Yes, please. Thank you so much.", 70),
  turn(
    "billie",
    "You're booked. You'll get a text confirmation in just a moment. If anything changes — burning smell, smoke, anything — call Triple Zero first, then call us back. Take care, Diane.",
    73
  ),
];

const transcript02: TranscriptTurn[] = [
  turn("billie", "Keystone Electrical, this is Billie. How can I help?", 0),
  turn(
    "caller",
    "Hey, I'm building a granny flat out the back and reckon I need a switchboard upgrade. Probably looking at three-phase.",
    3
  ),
  turn(
    "billie",
    "Great — that's something we do a lot of. I can have an electrician come out and give you an on-site quote. Are you the owner of the property?",
    10
  ),
  turn("caller", "Yeah, Jorge Medina. Address is 19 Latrobe Terrace, Paddington.", 17),
  turn(
    "billie",
    "Perfect. And the best callback number?",
    23
  ),
  turn("caller", "0412 550 021.", 26),
  turn(
    "billie",
    "Just to confirm — 0412, 550, 021?",
    29
  ),
  turn("caller", "Yes.", 33),
  turn(
    "billie",
    "We've got an opening Monday at 3:00 PM for a switchboard-upgrade quote. Does that work?",
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
  turn("billie", "Keystone Electrical, this is Billie.", 0),
  turn("caller", "How much do you charge for a call-out?", 2),
  turn(
    "billie",
    "Our call-out fee is $149, which gets the electrician on-site for diagnosis. Anything beyond that, they'll quote you before they start work. What's going on at the property?",
    5
  ),
  turn("caller", "Just getting a few quotes at the moment. I'll call back.", 14),
  turn("billie", "No worries. Whenever you're ready, we're here. Have a good one.", 18),
];

const transcript04: TranscriptTurn[] = [
  turn("billie", "Keystone Electrical, this is Billie.", 0),
  turn(
    "caller",
    "Yeah hi, my smoke alarms are chirping all over the house — about 3 of them. They're hardwired.",
    3
  ),
  turn(
    "billie",
    "That's a common one. Sounds like the backup batteries need swapping but if it keeps happening after that, the units themselves may be end of life. I can get someone out to check. Best callback number?",
    11
  ),
  turn("caller", "Brittany Cho — 0431 551 122.", 22),
  turn(
    "billie",
    "Got it — 0431, 551, 122. And the address?",
    27
  ),
  turn("caller", "51 Enoggera Terrace, Red Hill.", 32),
  turn(
    "billie",
    "I've got tomorrow at 9:30 AM. Does that work?",
    37
  ),
  turn("caller", "Yes please.", 41),
  turn("billie", "Booked. You'll get a text confirmation. Thanks Brittany.", 43),
];

export const CALLS: Call[] = [
  {
    id: "call_01",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+61431557721",
    caller_name: "Diane Whitlam",
    duration_seconds: 88,
    outcome: "escalated",
    urgency: "emergency",
    job_type: "no_power",
    summary:
      "Recurring safety-switch trip on kitchen + lounge circuit, switchboard warm to touch. Escalated to Marcus immediately and booked same-day 6:15 PM service in West End.",
    transcript: transcript01,
    sentiment: "neutral",
    estimated_value: 1280,
    lead_id: "lead_01",
    started_at: isoMinusMinutes(18),
  },
  {
    id: "call_02",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+61412550021",
    caller_name: "Jorge Medina",
    duration_seconds: 52,
    outcome: "booked",
    urgency: "standard",
    job_type: "panel_upgrade",
    summary:
      "Owner building a granny flat in Paddington, needs switchboard + three-phase quote. Booked Monday 3:00 PM.",
    transcript: transcript02,
    sentiment: "positive",
    estimated_value: 4900,
    lead_id: "lead_02",
    started_at: isoMinusMinutes(95),
  },
  {
    id: "call_03",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+61414552004",
    duration_seconds: 22,
    outcome: "qualified",
    urgency: "informational",
    summary: "Quote-shopping caller. Quoted call-out fee. Did not book.",
    transcript: transcript03,
    sentiment: "neutral",
    started_at: isoMinusMinutes(140),
  },
  {
    id: "call_04",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+61431551122",
    caller_name: "Brittany Cho",
    duration_seconds: 47,
    outcome: "booked",
    urgency: "urgent",
    job_type: "smoke_detector",
    summary: "3 hardwired smoke alarms chirping in Red Hill. Booked next morning 9:30. Mentioned QLD 2022 compliance.",
    transcript: transcript04,
    sentiment: "positive",
    estimated_value: 360,
    lead_id: "lead_08",
    started_at: isoMinusMinutes(60 * 20),
  },
  {
    id: "call_05",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+61404557334",
    caller_name: "Priya Subramanian",
    duration_seconds: 71,
    outcome: "booked",
    urgency: "standard",
    job_type: "ev_charger",
    summary:
      "Tesla wall connector install for incoming Model Y. Booked Monday 11 AM. Mentioned wanting a dedicated 32A circuit.",
    transcript: transcript02,
    sentiment: "positive",
    estimated_value: 2400,
    lead_id: "lead_03",
    started_at: isoMinusMinutes(60 * 4),
  },
  {
    id: "call_06",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+61438559912",
    caller_name: "Rebecca Olsen",
    duration_seconds: 40,
    outcome: "booked",
    urgency: "urgent",
    job_type: "outlet_repair",
    summary: "Two kitchen powerpoints not working after last night's storm. Booked same-day 9 PM.",
    transcript: transcript04,
    sentiment: "positive",
    estimated_value: 480,
    lead_id: "lead_04",
    started_at: isoMinusMinutes(60 * 6),
  },
  {
    id: "call_07",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+61419554180",
    caller_name: "Hank Voss",
    duration_seconds: 96,
    outcome: "qualified",
    urgency: "standard",
    job_type: "generator",
    summary:
      "Backup generator install — owner has the unit, needs changeover switch + tie-in. Hot lead, owner alerted.",
    transcript: transcript02,
    sentiment: "positive",
    estimated_value: 7500,
    lead_id: "lead_05",
    started_at: isoMinusMinutes(60 * 9),
  },
  {
    id: "call_08",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+61423557098",
    caller_name: "Lena Park",
    duration_seconds: 33,
    outcome: "messaged",
    urgency: "standard",
    job_type: "ceiling_fan",
    summary: "Replace 2 ceiling fans. Wanted ballpark — declined to book.",
    transcript: transcript03,
    sentiment: "neutral",
    estimated_value: 560,
    lead_id: "lead_06",
    started_at: isoMinusMinutes(60 * 11),
  },
  {
    id: "call_09",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+61403558844",
    caller_name: "Marcus Tate",
    duration_seconds: 64,
    outcome: "qualified",
    urgency: "standard",
    job_type: "lighting",
    summary: "LED downlights for kitchen reno. Wants quote next week.",
    transcript: transcript02,
    sentiment: "positive",
    estimated_value: 1650,
    lead_id: "lead_07",
    started_at: isoMinusMinutes(60 * 14),
  },
  {
    id: "call_10",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+61414550407",
    caller_name: "Sandra Liu",
    duration_seconds: 38,
    outcome: "booked",
    urgency: "standard",
    job_type: "inspection",
    summary: "Pre-purchase electrical inspection on 1980s lowset in Carindale. Booked Sunday 11 AM.",
    transcript: transcript04,
    sentiment: "positive",
    estimated_value: 480,
    lead_id: "lead_10",
    started_at: isoMinusMinutes(60 * 26),
  },
  {
    id: "call_11",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+61427559001",
    caller_name: "Tom Garrett",
    duration_seconds: 119,
    outcome: "qualified",
    urgency: "standard",
    job_type: "rewire",
    summary:
      "1930s Queenslander with old VIR cabling. Hot lead — owner alerted. Will call to book walk-through.",
    transcript: transcript02,
    sentiment: "positive",
    estimated_value: 14500,
    lead_id: "lead_09",
    started_at: isoMinusMinutes(60 * 24),
  },
  {
    id: "call_12",
    client_id: CURRENT_CLIENT.id,
    caller_phone: "+61282550900",
    duration_seconds: 9,
    outcome: "spam",
    urgency: "informational",
    summary: "Robocall — dodgy solar-rebate solicitation.",
    transcript: [
      turn("billie", "Keystone Electrical, this is Billie.", 0),
      turn("caller", "[automated voice] Good news — you qualify for a government rebate on solar —", 2),
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
