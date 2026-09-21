"use client";

import { useEffect, useState } from "react";

const journey = [
  {
    number: "01",
    title: "Academics",
    text: "Where you started.",
  },
  {
    number: "02",
    title: "Skills",
    text: "What you learned.",
  },
  {
    number: "03",
    title: "Projects",
    text: "What you built.",
  },
  {
    number: "04",
    title: "Experience",
    text: "What you applied.",
  },
  {
    number: "05",
    title: "Progress",
    text: "Where you're going.",
  },
];

export default function YourTrail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % journey.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="your-trail"
      className="border-y border-[#E3E1DA] bg-[#F1F0EB] px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Intro */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
              Your trail
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#14213D] sm:text-5xl lg:text-6xl">
              Your journey
              <br />
              isn&apos;t one thing.
            </h2>
          </div>

          <p className="max-w-xl text-lg leading-8 text-[#5F6470] lg:justify-self-end">
            It&apos;s everything you&apos;ve learned, built, experienced,
            and the progress you&apos;re making along the way.
          </p>

        </div>

        {/* Desktop trail */}
        <div className="relative mt-20 hidden lg:block">

          {/* Base line */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-3 h-px bg-[#D2CFC5]"
          />

          {/* Moving progress line */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-3 h-px bg-[#C9A227] transition-all duration-700 ease-out"
            style={{
              width: `${(active / (journey.length - 1)) * 100}%`,
            }}
          />

          {/* Moving dot */}
          <div
            aria-hidden="true"
            className="absolute top-3 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#F1F0EB] bg-[#C9A227] shadow-[0_0_0_1px_#C9A227] transition-all duration-700 ease-out"
            style={{
              left: `${(active / (journey.length - 1)) * 100}%`,
            }}
          />

          <div className="relative grid grid-cols-5 gap-6">
            {journey.map((item, index) => {
              const isActive = active === index;
              const isPassed = index <= active;

              return (
                <div key={item.number}>

                  {/* Station */}
                  <div className="relative h-7">
                    <div
                      className={`absolute left-0 top-0 h-7 w-7 rounded-full border-2 transition-all duration-500 ${
                        isActive
                          ? "border-[#C9A227] bg-[#C9A227]"
                          : isPassed
                            ? "border-[#14213D] bg-[#14213D]"
                            : "border-[#C8C5BC] bg-[#F1F0EB]"
                      }`}
                    />

                    {isActive && (
                      <div className="absolute left-[9px] top-[9px] h-2 w-2 rounded-full bg-[#14213D]" />
                    )}
                  </div>

                  <p
                    className={`mt-7 text-xs font-bold tracking-[0.14em] transition-colors duration-500 ${
                      isActive
                        ? "text-[#C9A227]"
                        : "text-[#858994]"
                    }`}
                  >
                    {item.number}
                  </p>

                  <h3
                    className={`mt-3 text-xl font-bold tracking-[-0.025em] transition-colors duration-500 ${
                      isActive
                        ? "text-[#14213D]"
                        : "text-[#5F6470]"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#6B707B]">
                    {item.text}
                  </p>

                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile trail */}
        <div className="relative mt-16 lg:hidden">

          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-[#D2CFC5]" />

          <div
            className="absolute left-[7px] top-0 w-px bg-[#C9A227] transition-all duration-700 ease-out"
            style={{
              height: `${(active / (journey.length - 1)) * 100}%`,
            }}
          />

          <div className="space-y-10">
            {journey.map((item, index) => {
              const isActive = active === index;

              return (
                <div
                  key={item.number}
                  className="relative flex gap-7"
                >
                  <div
                    className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-[#F1F0EB] transition-all duration-500 ${
                      isActive
                        ? "bg-[#C9A227] shadow-[0_0_0_1px_#C9A227]"
                        : index < active
                          ? "bg-[#14213D]"
                          : "bg-[#F1F0EB] shadow-[0_0_0_1px_#C8C5BC]"
                    }`}
                  />

                  <div>
                    <p
                      className={`text-xs font-bold tracking-[0.14em] ${
                        isActive
                          ? "text-[#C9A227]"
                          : "text-[#858994]"
                      }`}
                    >
                      {item.number}
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-[#14213D]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#6B707B]">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-20 flex flex-col gap-4 border-t border-[#D2CFC5] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-[#5F6470]">
            Every step becomes part of your story.
          </p>

          <span className="text-sm font-bold text-[#C9A227]">
            Keep moving →
          </span>
        </div>

      </div>
    </section>
  );
}