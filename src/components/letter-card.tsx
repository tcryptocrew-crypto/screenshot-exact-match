import { cn } from "@/lib/utils";

export interface LetterCardProps {
  heading?: string;
  /** Paragraphs. Newlines inside a paragraph render as line breaks. */
  paragraphs: string[];
  signature?: string;
  /** Small footer note under the signature, e.g. a date. */
  footerNote?: string;
  className?: string;
}

/**
 * A parchment keepsake letter: warm cream surface, elegant serif, subtle
 * gold frame. Used for personal letters and letter-style scenes.
 */
export function LetterCard({ heading, paragraphs, signature, footerNote, className }: LetterCardProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Gold frame accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -top-px -left-px h-6 w-6 border-t border-l border-gold/70" />
        <span className="absolute -top-px -right-px h-6 w-6 border-t border-r border-gold/70" />
        <span className="absolute -bottom-px -left-px h-6 w-6 border-b border-l border-gold/70" />
        <span className="absolute -bottom-px -right-px h-6 w-6 border-b border-r border-gold/70" />
      </div>

      <div className="letter-paper relative rounded-sm border border-gold/40 px-6 py-10 sm:px-10 sm:py-12">
        {heading ? (
          <h2 className="font-display text-center text-3xl font-semibold tracking-wide text-card-foreground sm:text-4xl">
            {heading}
          </h2>
        ) : null}

        <div className="gold-rule mx-auto mt-4 mb-6 h-px w-24 opacity-80" />

        <div className="space-y-5">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="font-display text-lg leading-relaxed whitespace-pre-line text-card-foreground/90 sm:text-xl"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {signature ? (
          <p className="font-display mt-8 text-right text-lg text-card-foreground/80 italic">{signature}</p>
        ) : null}
        {footerNote ? <p className="mt-2 text-center text-xs text-gold-deep">{footerNote}</p> : null}
      </div>
    </div>
  );
}
