"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { collabCities, type CollabCollege } from "@/data/collabColleges";
import styles from "./CollabColleges.module.css";

const SKINS = [
  { backgroundColor: "#1e5aa8", color: "#ffffff" },
  { backgroundColor: "#0b2a55", color: "#ffffff" },
  { backgroundColor: "#2b3f9e", color: "#ffffff" },
  { backgroundColor: "#0f5c6e", color: "#ffffff" },
  { backgroundColor: "#f4b63f", color: "#14120a" },
] as const;

const AUTOPLAY_MS = 3200;

function offsetOf(i: number, index: number, n: number) {
  let d = i - index;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}

function spot(e: React.PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
}

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

function collegeLabel(college: CollabCollege) {
  return college.fullName ?? college.name;
}

function monogram(name: string) {
  const parts = name
    .replace(/['’]/g, "")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
  if (parts.length >= 2) {
    return parts
      .slice(0, 3)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }
  const word = parts[0] ?? name;
  return word.slice(0, 2).toUpperCase();
}

function LogoMark({
  college,
  large,
  roomy,
}: {
  college: CollabCollege;
  large?: boolean;
  roomy?: boolean;
}) {
  const mark = monogram(college.name);
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-white ring-1 ring-black/10 ${
        large
          ? "h-36 w-36 rounded-2xl p-3 shadow-md sm:h-40 sm:w-40"
          : roomy
            ? "h-12 w-16 rounded-lg p-1"
            : "h-8 w-8 rounded-md p-0.5 sm:h-10 sm:w-14"
      }`}
      aria-hidden="true"
    >
      {college.logo ? (
        <img
          src={college.logo}
          alt=""
          loading="lazy"
          className="h-full w-full object-contain"
        />
      ) : (
        <span
          className={`text-center font-bold leading-none tracking-tight text-[#1e5aa8] ${
            large ? "text-lg" : "text-[9px] sm:text-[10px]"
          }`}
        >
          {large ? college.name : mark}
        </span>
      )}
    </div>
  );
}

function LogoTile({
  college,
  roomy,
}: {
  college: CollabCollege;
  roomy?: boolean;
}) {
  const label = collegeLabel(college);

  return (
    <div
      title={label}
      className="flex min-w-0 items-center gap-2 rounded-lg bg-white/95 px-2 py-1 text-left text-[#0b2a55] shadow-sm"
    >
      <LogoMark college={college} roomy={roomy} />
      <span className="line-clamp-2 min-w-0 flex-1 text-[11px] leading-tight font-semibold break-words sm:text-xs">
        <span className="sm:hidden">{college.name}</span>
        <span className="hidden sm:inline">{label}</span>
      </span>
    </div>
  );
}

function LogoGrid({ colleges }: { colleges: CollabCollege[] }) {
  const count = colleges.length;

  if (count <= 1) {
    const college = colleges[0];
    if (!college) return null;
    const label = collegeLabel(college);
    return (
      <div className="mt-6 flex flex-col items-center text-center">
        <LogoMark college={college} large />
        <p className="mt-4 max-w-[18rem] text-lg leading-snug font-semibold">
          {label}
        </p>
      </div>
    );
  }

  const gridClass =
    count >= 8
      ? "mt-4 grid grid-cols-2 gap-1.5"
      : count >= 4
        ? "mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2"
        : "mt-5 grid grid-cols-1 gap-2";

  return (
    <div className={gridClass}>
      {colleges.map((college) => (
        <LogoTile key={college.name} college={college} roomy={count < 4} />
      ))}
    </div>
  );
}

export default function CollabColleges() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = collabCities.length;
  const totalColleges = collabCities.reduce(
    (sum, city) => sum + city.colleges.length,
    0,
  );
  const totalCities = collabCities.length;
  const suppressClick = useRef(false);
  const pauseReasons = useRef({ hover: false, drag: false, nudge: false });
  const nudgeTimer = useRef<number | null>(null);
  const active = collabCities[index];
  const skin = SKINS[index % SKINS.length];

  const syncPause = () => {
    const reasons = pauseReasons.current;
    setPaused(reasons.hover || reasons.drag || reasons.nudge);
  };

  const setReason = (key: "hover" | "drag" | "nudge", value: boolean) => {
    pauseReasons.current[key] = value;
    syncPause();
  };

  const nudge = () => {
    setReason("nudge", true);
    if (nudgeTimer.current) window.clearTimeout(nudgeTimer.current);
    nudgeTimer.current = window.setTimeout(() => setReason("nudge", false), 7000);
  };

  const go = (dir: number, fromUser = false) => {
    setIndex((i) => (i + dir + n) % n);
    if (fromUser) nudge();
  };

  useEffect(() => {
    return () => {
      if (nudgeTimer.current) window.clearTimeout(nudgeTimer.current);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || paused) return;

    let timer = 0;
    const arm = () => {
      timer = window.setTimeout(() => {
        if (document.hidden) {
          arm();
          return;
        }
        setIndex((i) => (i + 1) % n);
      }, AUTOPLAY_MS);
    };
    arm();
    return () => window.clearTimeout(timer);
  }, [index, n, paused]);

  const onStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    const startX = e.clientX;
    const pointerId = e.pointerId;
    let dx = 0;
    let settled = false;
    setReason("drag", true);

    const finish = (cancelled: boolean) => {
      if (settled) return;
      settled = true;
      setReason("drag", false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      if (cancelled) return;
      if (dx > 56) go(-1, true);
      else if (dx < -56) go(1, true);
      else if (Math.abs(dx) > 8) nudge();
      if (Math.abs(dx) > 8) {
        suppressClick.current = true;
        const swallow = (ev: MouseEvent) => {
          suppressClick.current = false;
          ev.preventDefault();
          ev.stopPropagation();
          window.removeEventListener("click", swallow, true);
        };
        window.addEventListener("click", swallow, true);
        window.setTimeout(() => {
          suppressClick.current = false;
          window.removeEventListener("click", swallow, true);
        }, 400);
      }
    };

    const onMove = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      dx = ev.clientX - startX;
    };
    const onUp = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      finish(false);
    };
    const onCancel = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      finish(true);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
  };

  const onCardClick = (i: number, d: number) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    if (d !== 0) {
      setIndex(i);
      nudge();
    }
  };

  return (
    <section
      aria-label="Collaborations"
      aria-roledescription="carousel"
      tabIndex={0}
      onMouseEnter={() => setReason("hover", true)}
      onMouseLeave={() => setReason("hover", false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1, true);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1, true);
        }
      }}
      className={`${styles.collaborations} relative overflow-hidden py-16 transition-colors duration-500 sm:py-24`}
      style={skin}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-4 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs tracking-[0.22em] uppercase opacity-70">
              Collaborations
            </p>
            <h2 className="mt-2 text-4xl leading-none font-semibold tracking-tight sm:text-6xl">
              Partnering with {totalColleges} institutions across {totalCities}{" "}
              cities.
            </h2>
          </div>
          <p className="hidden shrink-0 text-sm md:block">
            {pad2(index + 1)} / {pad2(n)} · {active.city}
          </p>
        </div>

        <div
          className={`${styles.stage} relative mx-auto h-[36rem] w-full max-w-[1100px] sm:h-[40rem]`}
          onPointerDown={onStagePointerDown}
        >
          {collabCities.map((city, i) => {
            const d = offsetOf(i, index, n);
            const slot = Math.abs(d) > 1 ? "far" : String(d);
            const count = city.colleges.length;
            const citySkin = SKINS[i % SKINS.length];

            return (
              <article
                key={city.city}
                data-offset={slot}
                onPointerMove={spot}
                onClick={d === 0 ? undefined : () => onCardClick(i, d)}
                onKeyDown={
                  d === 0
                    ? undefined
                    : (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onCardClick(i, d);
                        }
                      }
                }
                role={d === 0 ? undefined : "button"}
                tabIndex={d === 0 ? undefined : 0}
                aria-label={d === 0 ? undefined : `Show ${city.city}`}
                className={`${styles.card} flex flex-col overflow-hidden border border-current/15 p-5 text-left sm:p-8 ${
                  d === 0 ? "" : "cursor-pointer"
                }`}
                style={citySkin}
              >
                <div
                  className={`${styles.spot} pointer-events-none absolute inset-0`}
                  aria-hidden="true"
                />
                <div className="relative flex items-start justify-between gap-3">
                  <p className="text-xs tracking-[0.18em] uppercase opacity-70">
                    {city.state}
                  </p>
                  <p className="text-xs tracking-[0.18em] opacity-70">
                    {pad2(i + 1)}
                  </p>
                </div>
                <div className="relative flex min-h-0 flex-1 flex-col">
                  <h3 className="shrink-0 text-3xl leading-[0.95] font-semibold tracking-tight sm:text-5xl">
                    {city.city}
                  </h3>
                  <div className={`${styles.logos} min-h-0 flex-1 overflow-y-auto`}>
                    <LogoGrid colleges={city.colleges} />
                  </div>
                </div>
                <div className="relative mt-3 shrink-0 text-sm">
                  {d === 0 ? (
                    <p>
                      {count} partner institution{count === 1 ? "" : "s"}
                    </p>
                  ) : (
                    <p className="inline-flex items-center gap-1">
                      Bring forward
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            aria-label="Previous city"
            onClick={() => go(-1, true)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-current/20 px-4"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div
            className="hidden items-center gap-2 md:flex"
            role="tablist"
            aria-label="Cities"
          >
            {collabCities.map((city, i) => (
              <button
                key={city.city}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={city.city}
                onClick={() => {
                  setIndex(i);
                  nudge();
                }}
                className={`h-2.5 w-8 ${i === index ? "bg-current" : "bg-current/25"}`}
              />
            ))}
          </div>
          <p className="text-sm md:hidden">
            {index + 1} / {n}
          </p>

          <button
            type="button"
            aria-label="Next city"
            onClick={() => go(1, true)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-current/20 px-4"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
