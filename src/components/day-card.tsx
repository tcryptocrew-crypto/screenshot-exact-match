import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Heart, Lock } from "lucide-react";

import { JOURNEY_DAYS, getDayUnlockLabel } from "@/lib/journey-dates";
import { cn } from "@/lib/utils";

export type DayStatus = "locked" | "unlocked" | "current" | "complete";

export interface DayCardData {
  dayNumber: number;
  status: DayStatus;
  title?: string;
}

export function DayCard({ data }: { data: DayCardData }) {
  const { dayNumber, status, title } = data;
  const [showUnlock, setShowUnlock] = useState(false);

  if (status === "locked") {
    return (
      <button
        type="button"
        aria-label={`Day ${dayNumber} — locked`}
        aria-expanded={showUnlock}
        onClick={() => setShowUnlock((v) => !v)}
        className="wine-panel group relative flex aspect-square flex-col items-center justify-center gap-1 rounded-lg text-center transition-colors hover:border-gold/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Lock aria-hidden="true" className="h-3.5 w-3.5 text-muted-foreground/70" />
        <span className="font-display text-lg text-muted-foreground/80">{dayNumber}</span>
        {showUnlock ? (
          <span className="animate-fade-in absolute inset-x-1 bottom-1 text-[9px] leading-tight text-gold-soft">
            Unlocks on {getDayUnlockLabel(dayNumber)}
          </span>
        ) : null}
      </button>
    );
  }

  const inner = (
    <>
      <span className="font-display text-xl font-semibold sm:text-2xl">{dayNumber}</span>
      {title ? <span className="line-clamp-1 px-1 text-[10px] text-card-foreground/70">{title}</span> : null}
      {status === "current" ? (
        <span className="mt-1 rounded-full bg-primary px-2 py-0.5 text-[9px] font-semibold tracking-widest text-primary-foreground uppercase">
          Today
        </span>
      ) : null}
      {status === "complete" ? (
        <Check aria-hidden="true" className="mt-1 h-3 w-3 text-gold-deep" />
      ) : null}
    </>
  );

  if (status === "locked") return null;

  return (
    <Link
      to="/day/$day"
      params={{ day: dayNumber }}
      aria-label={`Day ${dayNumber}${title ? ` — ${title}` : ""}${status === "current" ? " — today" : ""}`}
      className={cn(
        "relative flex aspect-square flex-col items-center justify-center gap-0.5 rounded-lg border text-center transition-transform hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        status === "current"
          ? "border-gold bg-gradient-to-b from-cream to-cream-dim shadow-[0_0_28px_-4px_oklch(0.733_0.085_79.8/0.55)]"
          : "border-gold/50 bg-card/95",
        status === "complete" && "opacity-90",
      )}
    >
      {status === "complete" ? (
        <Heart aria-hidden="true" className="absolute top-1.5 right-1.5 h-2.5 w-2.5 text-rose-muted" fill="currentColor" />
      ) : null}
      {inner}
    </Link>
  );
}

export interface JourneyCalendarProps {
  /** Total days in the journey. */
  totalDays?: number;
  unlockedThrough: number;
  currentDay: number | null;
  /** Day numbers marked complete (localStorage, applied after hydration). */
  completedDays?: number[];
  titles?: Record<number, string | undefined>;
}

export function JourneyCalendar({
  totalDays = JOURNEY_DAYS,
  unlockedThrough,
  currentDay,
  completedDays = [],
  titles = {},
}: JourneyCalendarProps) {
  return (
    <div
      className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-10 md:gap-2.5"
      role="list"
      aria-label="30 day journey calendar"
    >
      {Array.from({ length: totalDays }, (_, i) => {
        const day = i + 1;
        const status: DayStatus =
          completedDays.includes(day) && day <= unlockedThrough
            ? "complete"
            : day === currentDay && day <= unlockedThrough
              ? "current"
              : day <= unlockedThrough
                ? "unlocked"
                : "locked";
        return (
          <div role="listitem" key={day}>
            <DayCard data={{ dayNumber: day, status, title: titles[day] }} />
          </div>
        );
      })}
    </div>
  );
}
