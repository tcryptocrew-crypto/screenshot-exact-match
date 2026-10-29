/**
 * Lightweight experience preferences, kept in localStorage.
 *
 * Every function guards `typeof window` so the module is safe to import from
 * SSR routes; callers still invoke these from effects and event handlers only.
 */

const INTRO_KEY = "mifra.introDone";
const DAY_COMPLETE_PREFIX = "mifra.dayComplete.";

function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable (private mode); the experience still works,
    // it just replays the intro and forgets completion marks.
  }
}

export function isIntroDone(): boolean {
  return safeGet(INTRO_KEY) === "1";
}

export function markIntroDone(): void {
  safeSet(INTRO_KEY, "1");
}

export function isDayComplete(day: number): boolean {
  return safeGet(`${DAY_COMPLETE_PREFIX}${day}`) === "1";
}

export function markDayComplete(day: number): void {
  safeSet(`${DAY_COMPLETE_PREFIX}${day}`, "1");
}
