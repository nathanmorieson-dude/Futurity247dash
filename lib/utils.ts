import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  options: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-AU").format(value);
}

/**
 * Formats AU mobile/landline numbers. Accepts +61..., 0..., or digits-only.
 * Mobile (04xx) → 04xx xxx xxx. Landline → 0x xxxx xxxx.
 * Falls back to the raw string if nothing sensible can be formatted.
 */
export function formatPhone(raw: string) {
  if (!raw) return raw;
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("61")) digits = "0" + digits.slice(2);
  if (!digits.startsWith("0")) digits = "0" + digits;
  digits = digits.slice(0, 10);
  if (digits.length !== 10) return raw;
  if (digits.startsWith("04") || digits.startsWith("05")) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
}

export function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function relativeTime(input: string | Date) {
  const date = typeof input === "string" ? new Date(input) : input;
  const diffMs = date.getTime() - Date.now();
  const diffMin = Math.round(diffMs / 60000);
  const abs = Math.abs(diffMin);

  const rtf = new Intl.RelativeTimeFormat("en-AU", { numeric: "auto" });
  if (abs < 60) return rtf.format(diffMin, "minute");
  const diffHr = Math.round(diffMin / 60);
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, "hour");
  const diffDay = Math.round(diffHr / 24);
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, "day");
  const diffMon = Math.round(diffDay / 30);
  return rtf.format(diffMon, "month");
}

export function timeOfDay(input: string | Date) {
  const date = typeof input === "string" ? new Date(input) : input;
  return new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function shortDate(input: string | Date) {
  const date = typeof input === "string" ? new Date(input) : input;
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
  }).format(date);
}
