const emergencyKeywords = [
  "sparking",
  "smoke",
  "burning smell",
  "electrical fire",
  "panel hot",
  "arcing",
  "power line down",
  "outlet melting",
  "breaker keeps tripping",
  "buzzing panel",
];

export function detectEmergencyKeyword(text: string) {
  const lowerText = text.toLowerCase();
  return emergencyKeywords.find((keyword) => lowerText.includes(keyword)) ?? null;
}
