"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { stages, type SnippetLine, type Stage } from "./content";
import { SectionLabel } from "./SectionLabel";
import { cn } from "./utils";

const STEP_DURATION_MS = 8000;
const STAGE_TRANSITION_MS = 320;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function HowWeTeach() {
  const [index, setIndex] = useState(0);
  const [previousStage, setPreviousStage] = useState<Stage | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const progressAnimationRef = useRef<Animation | null>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const indexRef = useRef(0);
  const baseId = useId();

  const changeStage = useCallback((nextIndex: number) => {
    if (nextIndex === indexRef.current) return;

    if (!prefersReducedMotion) {
      setPreviousStage(stages[indexRef.current] ?? null);
    }
    indexRef.current = nextIndex;
    setIndex(nextIndex);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const progressBar = progressBarRef.current;
    if (!progressBar || prefersReducedMotion) return;

    const animation = progressBar.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      { duration: STEP_DURATION_MS, easing: "linear", fill: "forwards" }
    );
    progressAnimationRef.current = animation;

    return () => {
      animation.cancel();
      if (progressAnimationRef.current === animation) {
        progressAnimationRef.current = null;
      }
    };
  }, [index, prefersReducedMotion]);

  useEffect(() => {
    const animation = progressAnimationRef.current;
    if (!animation || prefersReducedMotion) return;

    if (isPaused) animation.pause();
    else animation.play();
  }, [index, isPaused, prefersReducedMotion]);

  useEffect(() => {
    if (!previousStage) return;

    const timer = window.setTimeout(
      () => setPreviousStage(null),
      STAGE_TRANSITION_MS
    );

    return () => window.clearTimeout(timer);
  }, [previousStage, prefersReducedMotion]);

  // Schedule each step from the currently selected stage.
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const elapsed = progressAnimationRef.current?.currentTime;
    const remaining =
      typeof elapsed === "number"
        ? Math.max(0, STEP_DURATION_MS - elapsed)
        : STEP_DURATION_MS;
    const timer = window.setTimeout(
      () => changeStage((index + 1) % stages.length),
      remaining
    );

    return () => window.clearTimeout(timer);
  }, [changeStage, index, isPaused, prefersReducedMotion]);

  const stage = stages[index] ?? stages[0];
  if (!stage) return null;
  const visiblePreviousStage = prefersReducedMotion ? null : previousStage;

  function onTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const key = event.key;
    if (
      !["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(
        key
      )
    )
      return;
    event.preventDefault();
    const last = stages.length - 1;
    if (key === "Home") changeStage(0);
    else if (key === "End") changeStage(last);
    else if (key === "ArrowDown" || key === "ArrowRight")
      changeStage((indexRef.current + 1) % stages.length);
    else changeStage((indexRef.current + last) % stages.length);
  }

  return (
    <section
      id="how-we-teach"
      aria-labelledby="how-we-teach-title"
      className="scroll-mt-24 bg-[#f5f9ff] py-16 text-[#122a46] sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-[2fr_1fr] lg:gap-10">
          <div>
            <div className="[&_p]:!text-[#64748b]">
              <SectionLabel index="02" label="How we teach" />
            </div>
            <h2
              id="how-we-teach-title"
              className="mt-5 max-w-none text-3xl font-extrabold tracking-tight text-[#122a46] sm:text-4xl lg:text-5xl lg:leading-[1.1]"
            >
              Every concept goes through the same five-step loop.
            </h2>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <p className="max-w-md text-sm leading-6 text-[#64748b] lg:pb-1 lg:text-base">
              Lectures alone don&apos;t make engineers. So no topic ends at
              &ldquo;understood&rdquo;. It ends at built, broken, explained and
              shipped. Tap a step to see it.
            </p>
            {/* Visual looping indicator & subtle pause/play button */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#64748b]">
              <span className="relative flex h-2 w-2">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full rounded-full bg-[#1256af]",
                    !isPaused && !prefersReducedMotion
                      ? "animate-ping opacity-75"
                      : "opacity-0"
                  )}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1256af]" />
              </span>
              <span className="text-[11px] uppercase tracking-wider">
                {prefersReducedMotion
                  ? "Static view (reduced motion)"
                  : isPaused
                  ? "Loop paused on hover"
                  : "Auto-advancing loop"}
              </span>
              {!prefersReducedMotion && (
                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="ml-1 rounded px-1.5 py-0.5 text-[11px] font-semibold text-[#1256af] hover:bg-[#e7f1fc] transition-colors"
                  aria-label={isPaused ? "Resume teaching loop" : "Pause teaching loop"}
                >
                  {isPaused ? "Play" : "Pause"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid min-w-0 grid-cols-[minmax(0,1fr)] items-start gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-5">
          <div
            role="tablist"
            aria-label="Five-step teaching loop"
            aria-orientation="vertical"
            className="flex min-w-0 flex-col gap-3"
            onKeyDown={onTabsKeyDown}
          >
            {stages.map((item, itemIndex) => {
              const selected = itemIndex === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => changeStage(itemIndex)}
                  className={cn(
                    "relative overflow-hidden flex min-h-16 items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all duration-200 cursor-pointer",
                    selected
                      ? "bg-[#1256af] text-white shadow-[0_10px_30px_rgb(23_59_99_/_0.08)] scale-[1.01]"
                      : "border border-[#dce7f3] bg-white text-[#122a46] shadow-[0_10px_30px_rgb(23_59_99_/_0.08)] hover:border-[#1256af]/40 hover:bg-[#f8fbff]"
                  )}
                >
                  {/* Subtle progress indicator on active looping step */}
                  {selected && !prefersReducedMotion && (
                    <span
                      key={`progress-${index}`}
                      ref={progressBarRef}
                      className="stage-progress absolute bottom-0 left-0 h-1 w-full bg-[#ff6b35]"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      selected ? "bg-[#0d2744] text-white" : "bg-[#e7f1fc] text-[#1256af]"
                    )}
                  >
                    {item.number}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{item.name}</span>
                    <span
                      className={cn(
                        "block text-xs",
                        selected ? "text-white/75" : "text-[#64748b]"
                      )}
                    >
                      {item.short}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${stage.id}`}
            className="rounded-3xl border border-[#dce7f3] bg-white p-5 shadow-[0_10px_30px_rgb(23_59_99_/_0.08)] sm:p-8"
          >
            <div className="stage-stack">
              {visiblePreviousStage ? (
                <div className="stage-content stage-exit" aria-hidden="true">
                  <StageContent stage={visiblePreviousStage} />
                </div>
              ) : null}
              <div
                key={stage.id}
                className={cn(
                  "stage-content",
                  visiblePreviousStage && "stage-enter"
                )}
              >
                <StageContent stage={stage} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .stage-stack {
          display: grid;
        }

        .stage-content {
          grid-area: 1 / 1;
          min-width: 0;
        }

        .stage-enter {
          animation: teach-stage-enter ${STAGE_TRANSITION_MS}ms
            cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .stage-exit {
          animation: teach-stage-exit ${STAGE_TRANSITION_MS}ms
            cubic-bezier(0.2, 0.7, 0.2, 1) both;
          pointer-events: none;
        }

        .stage-progress {
          transform: scaleX(0);
          transform-origin: left center;
        }

        @keyframes teach-stage-enter {
          from {
            opacity: 0.35;
            transform: translateY(7px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes teach-stage-exit {
          to {
            opacity: 0;
            transform: translateY(-5px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stage-enter,
          .stage-exit {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

function StageContent({ stage }: { stage: Stage }) {
  return (
    <>
      <p className="text-sm text-[#64748b]">
        Step {stage.number} of 5 · {stage.name}
      </p>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-[#122a46] sm:text-3xl">
        {stage.headline}
      </h3>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <Info tone="brand" title="What happens" text={stage.happens} />
        <Info tone="accent" title="What you do" text={stage.youDo} />
        <Info tone="green" title="Why it works" text={stage.why} />
      </div>
      <Snippet file={stage.file} lines={stage.lines} />
    </>
  );
}

function Info({
  title,
  text,
  tone,
}: {
  title: string;
  text: string;
  tone: "brand" | "accent" | "green";
}) {
  const color =
    tone === "brand"
      ? "text-[#1256af]"
      : tone === "accent"
      ? "text-[#ff6b35]"
      : "text-[#00c97a]";
  return (
    <div>
      <h4 className={cn("text-xs font-bold tracking-widest uppercase", color)}>
        {title}
      </h4>
      <p className="mt-2 text-sm leading-6 text-[#64748b]">{text}</p>
    </div>
  );
}

function Snippet({ file, lines }: { file: string; lines: SnippetLine[] }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl bg-[#0d2744] text-[#d7e4f4]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#6e86a8]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[#6e86a8]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[#6e86a8]" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-[#9eb0c8]">{file}</span>
      </div>
      <pre className="overflow-x-auto px-5 py-4 font-mono text-xs leading-6 sm:text-sm">
        {lines.map((line, lineIndex) => {
          if (line.kind === "blank")
            return <div key={lineIndex} className="h-4" />;
          const color =
            line.kind === "comment"
              ? "text-[#9eb0c8]"
              : line.kind === "label"
              ? "text-[#ff6b35]"
              : line.kind === "prompt"
              ? "text-[#9ec0ea]"
              : "text-[#d7e4f4]";
          return (
            <div key={lineIndex} className={color}>
              {line.text}
            </div>
          );
        })}
      </pre>
    </div>
  );
}
