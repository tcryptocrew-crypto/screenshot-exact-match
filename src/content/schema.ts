/**
 * Typed content schema for the 30-day experience.
 * Content (src/content/days.ts) stays separate from presentation and logic.
 */

/** Every pose maps to a file in /public/images/hamoo/. Poses without a
 * supplied asset yet render a documented placeholder — never random art. */
export type HamooPose =
  | "idle"
  | "peek"
  | "wave"
  | "happy"
  | "sad"
  | "carrying-cake"
  | "dropped-cake"
  | "placing-cake"
  | "lighting-candles"
  | "offering-slice"
  | "eating-cake";

export type SceneKind = "message" | "letter" | "hamoo" | "calendar-reveal" | "choice";

export interface ChoiceOption {
  id: string;
  label: string;
  response: string;
}

export interface Scene {
  id: string;
  kind: SceneKind;
  /** Small kicker line above the title, e.g. "Scene" or a date. */
  kicker?: string;
  title?: string;
  body?: string[];
  signature?: string;
  hamooPose?: HamooPose;
  /** Which side of the screen Hamoo sits on. */
  hamooPosition?: "left" | "right" | "center";
  /** For choice scenes. */
  choices?: ChoiceOption[];
}

export interface Letter {
  heading: string;
  paragraphs: string[];
  signature?: string;
}

export interface DayContent {
  dayNumber: number;
  title: string;
  /** Per-day nickname — configurable per day, never a global constant. */
  nickname?: string;
  introText?: string;
  scenes: Scene[];
  /** A separate letter shown after (or within) the day's scenes. */
  letter?: Letter;
  hamooAssets?: HamooPose[];
  completionMessage?: string;
}

export function getDayContent(days: readonly DayContent[], dayNumber: number): DayContent | undefined {
  return days.find((d) => d.dayNumber === dayNumber);
}
