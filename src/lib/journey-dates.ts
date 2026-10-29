/**
 * Journey date logic — the single source of truth for which days are unlocked.
 *
 * All calculations use the Asia/Karachi timezone (UTC+5, no DST), never the
 * visitor's device timezone and never naive UTC date parsing. Every function
 * is pure and takes a `now: Date` so tests can pin any moment, including the
 * midnight rollover in Karachi.
 *
 * NOTE: These locks are an experience feature for Mifra, not tamper-proof
 * security. A visitor who edits client state can preview days early.
 */

/** UTC+5 year-round — Pakistan abolished DST in 2009. */
export const KARACHI_OFFSET_MINUTES = 300;

export const JOURNEY_YEAR = 2026;
/** November */
export const JOURNEY_MONTH = 11;
export const JOURNEY_DAYS = 30;

export interface KarachiDate {
  year: number;
  month: number;
  day: number;
}

/** Calendar date "right now" in Karachi, derived from the UTC instant. */
export function toKarachiDate(now: Date): KarachiDate {
  const shifted = new Date(now.getTime() + KARACHI_OFFSET_MINUTES * 60_000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
  };
}

function compareKarachiDates(a: KarachiDate, b: KarachiDate): number {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
}

export type JourneyPhase = "before" | "during" | "after";

export function getJourneyPhase(now: Date): JourneyPhase {
  const karachi = toKarachiDate(now);
  const start: KarachiDate = { year: JOURNEY_YEAR, month: JOURNEY_MONTH, day: 1 };
  const end: KarachiDate = { year: JOURNEY_YEAR, month: JOURNEY_MONTH, day: JOURNEY_DAYS };
  if (compareKarachiDates(karachi, start) < 0) return "before";
  if (compareKarachiDates(karachi, end) > 0) return "after";
  return "during";
}

/**
 * Days 1..N are unlocked, where N is today's date in Karachi during the
 * journey. Returns 0 before November 1 and 30 from November 30 onward.
 */
export function getUnlockedDayCount(now: Date): number {
  const phase = getJourneyPhase(now);
  if (phase === "before") return 0;
  if (phase === "after") return JOURNEY_DAYS;
  return toKarachiDate(now).day;
}

export function isDayUnlocked(day: number, now: Date): boolean {
  if (!Number.isInteger(day) || day < 1 || day > JOURNEY_DAYS) return false;
  return day <= getUnlockedDayCount(now);
}

/** Today's day number during the journey, or null before/after it. */
export function getCurrentDay(now: Date): number | null {
  if (getJourneyPhase(now) !== "during") return null;
  return toKarachiDate(now).day;
}

export function isJourneyComplete(now: Date): boolean {
  return getUnlockedDayCount(now) >= JOURNEY_DAYS;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

/** "1 November" label for a day's unlock date. */
export function getDayUnlockLabel(day: number): string {
  if (!Number.isInteger(day) || day < 1 || day > JOURNEY_DAYS) return "";
  return `${day} ${MONTH_NAMES[JOURNEY_MONTH - 1]}`;
}

/** Full "1 November 2026" label. */
export function getDayUnlockLabelLong(day: number): string {
  if (!Number.isInteger(day) || day < 1 || day > JOURNEY_DAYS) return "";
  return `${day} ${MONTH_NAMES[JOURNEY_MONTH - 1]} ${JOURNEY_YEAR}`;
}

/**
 * Hidden testing override: `?day=N` lets Hamid preview any day before its
 * real unlock date. Normal visitors never pass this, so the experience still
 * follows the real Karachi calendar.
 */
export function parseDayOverride(search: Record<string, unknown>): number | null {
  const raw = typeof search.day === "string" ? search.day : undefined;
  if (!raw || !/^\d+$/.test(raw)) return null;
  const parsed = Number.parseInt(raw, 10);
  if (parsed < 1 || parsed > JOURNEY_DAYS) return null;
  return parsed;
}
