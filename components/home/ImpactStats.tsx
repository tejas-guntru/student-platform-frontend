"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const stats = [
  {
    value: 50000,
    suffix: "+",
    label: "Trained",
  },
  {
    value: 17645,
    suffix: "+",
    label: "Placed",
  },
  {
    value: 368,
    suffix: "+",
    label: "Companies",
  },
];

function Counter({
  value,
  suffix = "",
  duration = 1800,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] =
    useState(0);

  const ref =
    useRef<HTMLSpanElement>(null);

  const started = useRef(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            !entry.isIntersecting ||
            started.current
          ) {
            return;
          }

          started.current = true;

          const startTime =
            performance.now();

          const animate = (
            currentTime: number
          ) => {
            const progress = Math.min(
              (currentTime - startTime) /
                duration,
              1
            );

            // Smooth ease-out
            const eased =
              1 -
              Math.pow(
                1 - progress,
                3
              );

            setCount(
              Math.floor(
                value * eased
              )
            );

            if (progress < 1) {
              requestAnimationFrame(
                animate
              );
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(
            animate
          );

          observer.disconnect();
        },
        {
          threshold: 0.35,
        }
      );

    observer.observe(element);

    return () =>
      observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ImpactStats() {
  return (
    <section className="border-y border-gray-200 bg-white px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1256af]">
            Our Impact
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Proving Potential,{" "}
            <span className="text-[#1256af]">
              Placing Pride
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Trailbliz graduates are now
            building at some of the
            world&apos;s most innovative
            companies.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 divide-y divide-gray-200 border-y border-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-9 text-center sm:py-10"
            >
              <div className="text-4xl font-bold tracking-tight text-[#1256af] sm:text-5xl lg:text-6xl">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </div>

              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}