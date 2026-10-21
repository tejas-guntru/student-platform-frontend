import { cn } from "./utils";

export function PhotoFrame({
  src,
  alt,
  index = "01",
  label = "Desk",
  meta = "F/1.8 · ISO 400",
  live = "Live proof",
  className,
  aspect = "portrait",
}: {
  src: string;
  alt: string;
  index?: string;
  label?: string;
  meta?: string;
  live?: string;
  className?: string;
  aspect?: "portrait" | "wide";
}) {
  return (
    <figure
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[28px] border border-white/20 shadow-[var(--shadow-glass)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          aspect === "portrait"
            ? "aspect-[4/5] sm:aspect-[5/6]"
            : "aspect-[5/4] sm:aspect-[16/11]",
        )}
      >
        <img
          src={src}
          alt={alt}
          className="hero-photo framed absolute inset-0 h-full w-full object-cover object-[52%_42%]"
        />
        <div className="absolute inset-0 bg-[#0054c7]/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand)] via-[var(--color-brand)]/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-15 grid-fade" />

        <div
          aria-hidden="true"
          className="photo-scan pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-transparent via-[var(--color-cyan-mist)]/20 to-transparent"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 sm:inset-5"
        >
          <span className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-[var(--color-snow)]/80" />
          <span className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-[var(--color-snow)]/80" />
          <span className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-[var(--color-snow)]/80" />
          <span className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-[var(--color-snow)]/80" />
        </div>

        <div className="absolute inset-x-0 top-0 flex items-start justify-between px-5 py-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-snow)]/90">
            Frame {index} · {label}
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-cyan-mist)]">
            <span className="live-dot size-1.5 rounded-full bg-[var(--color-cyan-mist)]" />
            {live}
          </span>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none absolute bottom-16 left-5 font-mono text-[clamp(3.6rem,12vw,6.4rem)] leading-none tracking-[-0.08em] text-[var(--color-snow)]/18"
        >
          {index}
        </p>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 py-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-snow)]/75">
            Grade · #0877E8
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-snow)]/55">
            {meta}
          </span>
        </div>
      </div>
    </figure>
  );
}
