import { cn } from "@/lib/utils";

/**
 * Fixed, full-viewport atmospheric layers: candlelit gradients, vignette,
 * and slow-falling rose petals. Purely decorative (aria-hidden), rendered
 * behind all content.
 *
 * Petals use a fixed, deterministic config array — no Math.random at render
 * — so server and client render identically.
 */

const PETALS: Array<{
  left: string;
  size: number;
  duration: string;
  delay: string;
  drift: string;
  opacity: number;
}> = [
  { left: "6%", size: 9, duration: "16s", delay: "0s", drift: "34px", opacity: 0.4 },
  { left: "17%", size: 7, duration: "21s", delay: "4s", drift: "-26px", opacity: 0.3 },
  { left: "31%", size: 10, duration: "18s", delay: "9s", drift: "20px", opacity: 0.35 },
  { left: "44%", size: 6, duration: "24s", delay: "2s", drift: "-34px", opacity: 0.25 },
  { left: "57%", size: 8, duration: "19s", delay: "12s", drift: "28px", opacity: 0.4 },
  { left: "68%", size: 7, duration: "23s", delay: "6s", drift: "-22px", opacity: 0.3 },
  { left: "79%", size: 10, duration: "17s", delay: "15s", drift: "30px", opacity: 0.35 },
  { left: "90%", size: 6, duration: "22s", delay: "8s", drift: "-30px", opacity: 0.3 },
  { left: "50%", size: 5, duration: "26s", delay: "18s", drift: "18px", opacity: 0.2 },
];

export function BackgroundAmbience({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}>
      {/* Base candlelit room: warm wine glow rising from below, ink edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 108%, oklch(0.331 0.095 9.1 / 0.55) 0%, transparent 62%)," +
            "radial-gradient(ellipse 70% 50% at 12% -10%, oklch(0.28 0.088 6.2 / 0.5) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 45% at 92% 8%, oklch(0.28 0.088 6.2 / 0.4) 0%, transparent 55%)," +
            "linear-gradient(180deg, oklch(0.187 0.014 331.8) 0%, oklch(0.213 0.049 357.4) 55%, oklch(0.187 0.014 331.8) 100%)",
        }}
      />
      {/* Candle flame glow, lower left, gently breathing */}
      <div
        className="animate-glow-pulse absolute -bottom-24 -left-20 h-[45vh] w-[45vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.802 0.072 77 / 0.28) 0%, oklch(0.733 0.085 79.8 / 0.12) 40%, transparent 70%)",
        }}
      />
      {/* Soft rose counter-glow, upper right */}
      <div
        className="animate-glow-pulse absolute -top-28 -right-24 h-[40vh] w-[40vh] rounded-full"
        style={{
          animationDelay: "3s",
          background:
            "radial-gradient(circle, oklch(0.668 0.094 11.3 / 0.2) 0%, transparent 65%)",
        }}
      />
      {/* Falling rose petals */}
      {PETALS.map((petal, i) => (
        <span
          key={i}
          className="animate-petal-fall absolute top-0 rounded-[60%_40%_55%_45%/50%_60%_40%_50%]"
          style={
            {
              left: petal.left,
              width: petal.size,
              height: petal.size * 1.4,
              backgroundColor: "oklch(0.553 0.109 13)",
              "--petal-duration": petal.duration,
              "--petal-delay": petal.delay,
              "--petal-drift": petal.drift,
              "--petal-opacity": petal.opacity,
            } as React.CSSProperties
          }
        />
      ))}
      {/* Vignette to keep focus centered */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 45%, transparent 55%, oklch(0.187 0.014 331.8 / 0.55) 100%)",
        }}
      />
    </div>
  );
}
