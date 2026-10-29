import type { HamooPose } from "@/content/schema";
import { cn } from "@/lib/utils";

/**
 * Central pose → asset map. Every Hamoo appearance renders through here.
 *
 * Real Hamoo assets are supplied by Hamid and replace these files
 * file-for-file (same name = same pose), so swapping art never touches code.
 * A pose without a supplied asset yet renders a clearly documented
 * placeholder — never random panda artwork, never CSS-drawn substitutes.
 */
const POSE_ASSETS: Partial<Record<HamooPose, string>> = {
  idle: "/images/hamoo/hamoo-idle.png",
  peek: "/images/hamoo/hamoo-peek.png",
  wave: "/images/hamoo/hamoo-wave.png",
  happy: "/images/hamoo/hamoo-happy.png",
  // sad, carrying-cake, dropped-cake, placing-cake, lighting-candles,
  // offering-slice, eating-cake — assets pending, placeholders until supplied.
};

export type HamooAnimation = "none" | "bounce" | "peek";

const DEFAULT_ANIMATION: Partial<Record<HamooPose, HamooAnimation>> = {
  idle: "bounce",
  wave: "bounce",
  happy: "bounce",
  peek: "peek",
};

export interface HamooCharacterProps {
  pose: HamooPose;
  alt?: string;
  /** Rendered height in px. Width keeps the asset's square frame. */
  size?: number;
  animation?: HamooAnimation;
  /** Seconds to wait before Hamoo appears. */
  entranceDelay?: number;
  className?: string;
}

export function HamooCharacter({
  pose,
  alt = "Hamoo the panda",
  size = 180,
  animation,
  entranceDelay = 0,
  className,
}: HamooCharacterProps) {
  const asset = POSE_ASSETS[pose];
  const resolvedAnimation = animation ?? DEFAULT_ANIMATION[pose] ?? "none";

  if (!asset) {
    // Documented placeholder for poses whose art has not been supplied yet.
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-full border border-dashed border-gold/50 text-center",
          className,
        )}
        style={{ width: size, height: size, animationDelay: `${entranceDelay}s` }}
        role="img"
        aria-label={`Hamoo — ${pose} pose placeholder`}
      >
        <span className="font-display text-sm text-gold">Hamoo</span>
        <span className="px-2 text-[10px] leading-tight text-muted-foreground">
          {pose} pose — asset coming soon
        </span>
      </div>
    );
  }

  const animationClass =
    resolvedAnimation === "bounce"
      ? "animate-hamoo-bounce"
      : resolvedAnimation === "peek"
        ? "animate-hamoo-peek"
        : "";

  return (
    <img
      src={asset}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className={cn("animate-fade-up object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)]", animationClass, className)}
      style={{
        height: size,
        width: size,
        animationDelay: `${entranceDelay}s`,
      }}
    />
  );
}
