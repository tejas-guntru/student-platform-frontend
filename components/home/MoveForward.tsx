"use client";

import { useEffect, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Apply",
    description: "Put yourself forward.",
  },
  {
    number: "02",
    title: "Review",
    description: "See where you stand.",
  },
  {
    number: "03",
    title: "Shortlisted",
    description: "Move to the next stage.",
  },
  {
    number: "04",
    title: "Selected",
    description: "Take the next step.",
  },
];

export default function MoveForward() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden border-y border-[#E3E1DA] bg-[#F1F0EB] px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
              Move forward
            </p>

            <h2 className="mt-5 text-5xl font-bold leading-[0.88] tracking-[-0.065em] text-[#14213D] sm:text-6xl lg:text-7xl">
              Keep
              <br />
              moving.
            </h2>
          </div>

          <p className="max-w-md text-lg leading-8 text-[#5F6470]">
            From the moment you apply, every step of your opportunity
            journey stays connected.
          </p>
        </div>

        {/* Main journey */}
        <div className="relative mt-24 lg:mt-28">

          {/* Giant number */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-20 select-none text-[180px] font-bold leading-none tracking-[-0.1em] text-[#E7E5DD] sm:text-[240px] lg:-top-28 lg:text-[320px]"
          >
            04
          </div>

          {/* Trail */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-5 hidden h-[2px] bg-[#D2CFC5] md:block"
          />

          <div
            aria-hidden="true"
            className="absolute left-0 top-5 hidden h-[2px] bg-[#C9A227] transition-all duration-700 ease-out md:block"
            style={{
              width: `${(active / (steps.length - 1)) * 100}%`,
            }}
          />

          {/* Steps */}
          <div className="relative grid gap-12 md:grid-cols-4 md:gap-0">

            {steps.map((step, index) => {
              const isActive = active === index;
              const isPassed = index < active;

              return (
                <div
                  key={step.number}
                  className="relative md:pr-10"
                >

                  {/* Node */}
                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-[#F1F0EB] text-xs font-bold transition-all duration-500 ${
                      isActive
                        ? "border-[#C9A227] text-[#14213D] shadow-[0_0_0_6px_rgba(201,162,39,0.12)]"
                        : isPassed
                          ? "border-[#14213D] bg-[#14213D] text-white"
                          : "border-[#C8C5BC] text-[#858994]"
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Text */}
                  <div className="mt-8">

                    <h3
                      className={`text-2xl font-bold tracking-[-0.04em] transition-colors duration-500 ${
                        isActive
                          ? "text-[#14213D]"
                          : "text-[#5F6470]"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={`mt-2 max-w-[180px] text-sm leading-6 transition-colors duration-500 ${
                        isActive
                          ? "text-[#5F6470]"
                          : "text-[#858994]"
                      }`}
                    >
                      {step.description}
                    </p>

                  </div>

                  {/* Active marker */}
                  {isActive && (
                    <div className="mt-7 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C9A227]">
                        You&apos;re here
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-20 flex flex-col gap-5 border-t border-[#D2CFC5] pt-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-2xl font-semibold tracking-[-0.03em] text-[#14213D] sm:text-3xl">
            Apply.
            <span className="text-[#C9A227]"> Move.</span>
            <span> Repeat.</span>
          </p>

          <p className="text-sm font-medium text-[#6B707B]">
            Your next step is always ahead.
          </p>

        </div>

      </div>
    </section>
  );
}