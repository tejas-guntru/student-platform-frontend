"use client";

import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Apply",
    short: "Application submitted",
    description:
      "Put yourself forward for an opportunity that matches your skills and career direction.",
  },
  {
    number: "02",
    title: "Review",
    short: "Application under review",
    description:
      "Keep track as your application moves into the review process.",
  },
  {
    number: "03",
    title: "Shortlisted",
    short: "Moving to the next stage",
    description:
      "See when your application progresses and prepare for the next stage of the process.",
  },
  {
    number: "04",
    title: "Selected",
    short: "Opportunity unlocked",
    description:
      "Complete the journey and take the next step toward your career.",
  },
];

export default function MoveForward() {
  const [active, setActive] = useState(0);

  const activeStep = steps[active];

  const progress = ((active + 1) / steps.length) * 100;

  return (
    <section
      id="move-forward"
      className="
        relative
        overflow-hidden
        bg-[#FAFAFA]
        px-4
        py-16
        sm:px-6
        sm:py-20
        lg:px-12
        lg:py-28
      "
    >
      {/* =========================================================
          SUBTLE BACKGROUND
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute
            -left-40
            top-20
            h-80
            w-80
            rounded-full
            bg-[#1256af]/[0.035]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-10
            h-96
            w-96
            rounded-full
            bg-blue-100/25
            blur-3xl
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =========================================================
            HEADER
        ========================================================= */}

        <div
          className="
            grid
            gap-6
            lg:grid-cols-[1fr_0.72fr]
            lg:items-end
            lg:gap-12
          "
        >
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#1256af]/15
                bg-white
                px-4
                py-2
                shadow-sm
              "
            >
              <span className="h-2 w-2 rounded-full bg-[#1256af]" />

              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#1256af]
                "
              >
                Move forward
              </span>
            </div>

            <h2
              className="
                mt-6
                max-w-4xl
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-gray-900
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              From application{" "}
              <span className="text-[#1256af]">
                to opportunity.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-xl
              text-base
              leading-7
              text-gray-600
              sm:text-lg
              sm:leading-8
              lg:justify-self-end
            "
          >
            Follow every stage of your application journey in one place, from
            the moment you apply to the moment you move ahead.
          </p>
        </div>

        {/* =========================================================
            DESKTOP JOURNEY
        ========================================================= */}

        <div
          className="
            relative
            mt-14
            hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-7
            shadow-sm
            md:block
            lg:mt-20
            lg:p-10
          "
        >
          {/* Progress line */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-[calc(12.5%+27px)]
              right-[calc(12.5%+27px)]
              top-[67px]
              h-[2px]
              bg-gray-200
              lg:top-[79px]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              left-[calc(12.5%+27px)]
              top-[67px]
              h-[2px]
              bg-[#1256af]
              transition-all
              duration-500
              ease-out
              lg:top-[79px]
            "
            style={{
              width:
                active === 0
                  ? "0%"
                  : `calc(${(active / (steps.length - 1)) * 75}% - ${
                      active === steps.length - 1 ? "54px" : "20px"
                    })`,
            }}
          />

          <div className="relative grid grid-cols-4 gap-5 lg:gap-7">
            {steps.map((step, index) => {
              const isActive = index === active;
              const isPassed = index < active;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActive(index)}
                  className="
                    group
                    relative
                    text-left
                  "
                >
                  {/* Number */}

                  <div className="flex justify-center">
                    <div
                      className={`
                        relative
                        z-10
                        flex
                        h-[54px]
                        w-[54px]
                        items-center
                        justify-center
                        rounded-xl
                        border
                        text-xs
                        font-bold
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? `
                                border-[#1256af]
                                bg-[#1256af]
                                text-white
                                shadow-md
                              `
                            : isPassed
                              ? `
                                  border-[#1256af]/30
                                  bg-[#1256af]/10
                                  text-[#1256af]
                                `
                              : `
                                  border-gray-200
                                  bg-white
                                  text-gray-400
                                  group-hover:border-[#1256af]/30
                                  group-hover:text-[#1256af]
                                `
                        }
                      `}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Card */}

                  <div
                    className={`
                      mt-6
                      min-h-[180px]
                      rounded-2xl
                      border
                      p-5
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? `
                              -translate-y-1
                              border-[#1256af]/30
                              bg-[#1256af]/[0.035]
                              shadow-md
                            `
                          : `
                              border-gray-200
                              bg-white
                              group-hover:border-[#1256af]/20
                              group-hover:shadow-sm
                            `
                      }
                    `}
                  >
                    <p
                      className={`
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]

                        ${
                          isActive
                            ? "text-[#1256af]"
                            : "text-gray-400"
                        }
                      `}
                    >
                      Stage {step.number}
                    </p>

                    <h3
                      className="
                        mt-3
                        text-xl
                        font-bold
                        text-gray-900
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-gray-500
                      "
                    >
                      {step.description}
                    </p>

                    {isActive && (
                      <div
                        className="
                          mt-5
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          bg-[#1256af]/[0.07]
                          px-3
                          py-1.5
                        "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1256af]" />

                        <span
                          className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-[#1256af]
                          "
                        >
                          Current stage
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            MOBILE JOURNEY
        ========================================================= */}

        <div className="relative mt-12 md:hidden">
          {/* Base rail */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-7
              left-[23px]
              top-7
              w-px
              bg-gray-200
            "
          />

          {/* Active rail */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-[23px]
              top-7
              w-px
              bg-[#1256af]
              transition-all
              duration-500
            "
            style={{
              height:
                active === 0
                  ? "0%"
                  : `${(active / (steps.length - 1)) * 88}%`,
            }}
          />

          <div className="relative space-y-5">
            {steps.map((step, index) => {
              const isActive = index === active;
              const isPassed = index < active;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActive(index)}
                  className="
                    relative
                    flex
                    w-full
                    gap-4
                    text-left
                  "
                >
                  <div
                    className={`
                      relative
                      z-10
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      text-xs
                      font-bold
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? `
                              border-[#1256af]
                              bg-[#1256af]
                              text-white
                              shadow-md
                            `
                          : isPassed
                            ? `
                                border-[#1256af]/30
                                bg-[#1256af]/10
                                text-[#1256af]
                              `
                            : `
                                border-gray-200
                                bg-white
                                text-gray-400
                              `
                      }
                    `}
                  >
                    {step.number}
                  </div>

                  <div
                    className={`
                      flex-1
                      rounded-2xl
                      border
                      p-5
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? `
                              border-[#1256af]/30
                              bg-white
                              shadow-md
                            `
                          : `
                              border-gray-200
                              bg-white
                              shadow-sm
                            `
                      }
                    `}
                  >
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-gray-400
                      "
                    >
                      Stage {step.number}
                    </p>

                    <h3
                      className="
                        mt-2
                        text-xl
                        font-bold
                        text-gray-900
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-gray-600
                      "
                    >
                      {step.description}
                    </p>

                    {isActive && (
                      <p
                        className="
                          mt-4
                          text-xs
                          font-semibold
                          text-[#1256af]
                        "
                      >
                        Current stage →
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            ACTIVE STAGE SUMMARY
        ========================================================= */}

        <div
          className="
            mt-10
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-sm
          "
        >
          <div
            className="
              grid
              gap-0
              lg:grid-cols-[0.7fr_1.3fr]
            "
          >
            {/* Left */}

            <div
              className="
                bg-[#1256af]
                p-6
                text-white
                sm:p-8
                lg:p-10
              "
            >
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-white/65
                "
              >
                Application journey
              </p>

              <div
                className="
                  mt-7
                  flex
                  items-end
                  gap-4
                "
              >
                <span
                  className="
                    text-6xl
                    font-bold
                    leading-none
                    text-white
                    sm:text-7xl
                  "
                >
                  {activeStep.number}
                </span>

                <span
                  className="
                    pb-1
                    text-sm
                    font-medium
                    text-white/60
                  "
                >
                  of {steps.length.toString().padStart(2, "0")}
                </span>
              </div>

              <h3
                className="
                  mt-6
                  text-2xl
                  font-bold
                  sm:text-3xl
                "
              >
                {activeStep.title}
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  font-medium
                  text-white/70
                "
              >
                {activeStep.short}
              </p>
            </div>

            {/* Right */}

            <div
              className="
                flex
                flex-col
                justify-between
                p-6
                sm:p-8
                lg:p-10
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#1256af]
                  "
                >
                  Keep your next step visible
                </p>

                <h3
                  className="
                    mt-3
                    max-w-xl
                    text-2xl
                    font-bold
                    tracking-tight
                    text-gray-900
                    sm:text-3xl
                  "
                >
                  Know where your application stands.
                </h3>

                <p
                  className="
                    mt-4
                    max-w-2xl
                    text-sm
                    leading-6
                    text-gray-600
                    sm:text-base
                    sm:leading-7
                  "
                >
                  {activeStep.description} Keeping each stage visible makes it
                  easier to understand what has happened and what comes next.
                </p>
              </div>

              {/* Progress */}

              <div className="mt-8">
                <div
                  className="
                    mb-3
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-xs
                      font-semibold
                      text-gray-500
                    "
                  >
                    Journey stage
                  </span>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-[#1256af]
                    "
                  >
                    {active + 1} of {steps.length}
                  </span>
                </div>

                <div
                  className="
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-gray-100
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-[#1256af]
                      transition-all
                      duration-500
                      ease-out
                    "
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div
                  className="
                    mt-6
                    flex
                    flex-wrap
                    gap-3
                  "
                >
                  {active > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setActive((current) =>
                          Math.max(0, current - 1)
                        )
                      }
                      className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-gray-200
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-gray-600
                        transition-all
                        duration-300
                        hover:border-[#1256af]
                        hover:text-[#1256af]
                      "
                    >
                      ← Previous
                    </button>
                  )}

                  {active < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setActive((current) =>
                          Math.min(
                            steps.length - 1,
                            current + 1
                          )
                        )
                      }
                      className="
                        group
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#1256af]
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:bg-[#0f4b99]
                      "
                    >
                      Next stage

                      <span
                        aria-hidden="true"
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      >
                        →
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActive(0)}
                      className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#1256af]
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition-colors
                        duration-300
                        hover:bg-[#0f4b99]
                      "
                    >
                      View journey again
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM
        ========================================================= */}

        <div
          className="
            mt-14
            flex
            flex-col
            gap-3
            border-t
            border-gray-200
            pt-8
            sm:mt-16
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-lg
              font-semibold
              text-gray-700
              sm:text-xl
            "
          >
            Apply.
            <span className="text-[#1256af]">
              {" "}
              Move.
            </span>{" "}
            Grow.
          </p>

          <p className="text-sm font-medium text-gray-500">
            Your next step stays visible.
          </p>
        </div>
      </div>
    </section>
  );
}