import type { Urgency } from "@/lib/types";

/**
 * Electrical-specific emergency keyword classifier. The list is tuned for
 * residential/light-commercial electrical hazards and is intentionally
 * broader than generic "fire/smoke" matchers so Billie catches soft signals
 * like "panel is warm" or "smells like plastic."
 *
 * Order within a severity band doesn't matter — we short-circuit on the
 * first match.
 */

export interface EmergencyMatch {
  matched: boolean;
  urgency: Urgency;
  keywords: string[];
  reason?: string;
}

const EMERGENCY_KEYWORDS = [
  "fire",
  "on fire",
  "smoke",
  "smoking",
  "burning smell",
  "smells like burning",
  "smells like plastic",
  "smells like fish",
  "sparks",
  "sparking",
  "shocked",
  "got shocked",
  "electrocuted",
  "panel is hot",
  "panel feels warm",
  "panel smells",
  "wires exposed",
  "exposed wires",
  "live wire",
  "downed line",
  "pole down",
  "line down",
  "flooded panel",
  "water in panel",
  "water on outlet",
  "wire in water",
  "arcing",
  "outlet melted",
  "melted outlet",
  "breaker won't reset",
  "breaker keeps tripping",
  "scorch",
  "scorched",
  "black marks on outlet",
];

const URGENT_KEYWORDS = [
  "no power",
  "no lights",
  "half the house",
  "whole house out",
  "power out",
  "outage",
  "flickering",
  "lights dim",
  "dimming",
  "elderly",
  "baby",
  "medical equipment",
  "oxygen",
  "cpap",
  "freezer full",
  "tenant",
  "landlord",
];

function findMatches(text: string, bank: string[]) {
  const lower = text.toLowerCase();
  const hits: string[] = [];
  for (const kw of bank) {
    if (lower.includes(kw)) hits.push(kw);
  }
  return hits;
}

export function classifyCallerInput(text: string): EmergencyMatch {
  if (!text || !text.trim()) {
    return { matched: false, urgency: "standard", keywords: [] };
  }

  const emergencyHits = findMatches(text, EMERGENCY_KEYWORDS);
  if (emergencyHits.length > 0) {
    return {
      matched: true,
      urgency: "emergency",
      keywords: emergencyHits,
      reason: `Matched ${emergencyHits.length} emergency keyword(s)`,
    };
  }

  const urgentHits = findMatches(text, URGENT_KEYWORDS);
  if (urgentHits.length > 0) {
    return {
      matched: true,
      urgency: "urgent",
      keywords: urgentHits,
      reason: `Matched ${urgentHits.length} urgent keyword(s)`,
    };
  }

  return { matched: false, urgency: "standard", keywords: [] };
}

export const EMERGENCY_KEYWORD_LIST = EMERGENCY_KEYWORDS;
export const URGENT_KEYWORD_LIST = URGENT_KEYWORDS;
