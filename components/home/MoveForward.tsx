"use client";

import { useEffect, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Apply",
    description: "Put yourself forward for the opportunity.",
  },
  {
    number: "02",
    title: "Review",
    description: "Your application moves into review.",
  },
  {
    number: "03",
    title: "Shortlisted",
    description: "Move forward to the next stage.",
  },
  {
    number: "04",
    title: "Selected",
    description: "Take the next step in your career.",
  },
];

export default function MoveForward() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F4FAFF]
        px-5
        py-20

        sm:px-8
        sm:py-24

        lg:px-12
        lg:py-32
      "
    >
      {/* =====================================================
          BACKGROUND EFFECTS
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-44
          top-16
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#CDEBFF]/70
          blur-[140px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-48
          bottom-0
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#B7E1FF]/55
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.3]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(8,119,232,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,119,232,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "54px 54px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[1fr_0.7fr]
            lg:items-end
          "
        >
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-[#CBE4F8]
                bg-white/85
                px-4
                py-2
                shadow-sm
                backdrop-blur-md
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#0877E8]
                  shadow-[0_0_12px_rgba(8,119,232,0.55)]
                "
              />

              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#3977AC]
                "
              >
                Move forward
              </span>
            </div>

            <h2
              className="
                mt-6
                max-w-4xl
                text-[clamp(3rem,6vw,6rem)]
                font-bold
                leading-[0.9]
                tracking-[-0.065em]
                text-[#102F51]
              "
            >
              From application
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#0877E8]
                  via-[#1294F2]
                  to-[#38BDF8]
                  bg-clip-text
                  text-transparent
                "
              >
                to opportunity.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-md
              text-base
              leading-7
              text-[#607890]

              sm:text-lg
              sm:leading-8

              lg:justify-self-end
            "
          >
            Follow every stage of your application journey in one place,
            from the moment you apply to the moment you move ahead.
          </p>
        </div>

        {/* =====================================================
            JOURNEY PANEL
        ===================================================== */}

        <div
          className="
            relative
            mt-16
            overflow-hidden
            rounded-[34px]
            border
            border-[#D2E7F7]
            bg-white/80
            p-6
            shadow-[0_24px_70px_rgba(8,119,232,0.09)]
            backdrop-blur-xl

            sm:p-8

            lg:mt-20
            lg:p-10
          "
        >
          {/* Panel glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-[320px]
              w-[320px]
              rounded-full
              bg-[#D9F1FF]
              blur-[80px]
            "
          />

          {/* ===================================================
              DESKTOP PROGRESS
          =================================================== */}

          <div className="relative hidden md:block">
            {/* Base line */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-[24px]
                right-[24px]
                top-[26px]
                h-[3px]
                rounded-full
                bg-[#DCECF8]
              "
            />

            {/* Active line */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-[24px]
                top-[26px]
                h-[3px]
                rounded-full
                bg-gradient-to-r
                from-[#0877E8]
                via-[#1498F2]
                to-[#40C6FF]
                transition-all
                duration-700
                ease-out
              "
              style={{
                width: `calc(${(active / (steps.length - 1)) * 100}% - ${
                  active === steps.length - 1 ? "48px" : "24px"
                })`,
              }}
            />

            <div className="relative grid grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const isActive = active === index;
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
                    {/* Node */}

                    <div
                      className={`
                        relative
                        z-10
                        flex
                        h-[54px]
                        w-[54px]
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        text-xs
                        font-bold
                        transition-all
                        duration-500

                        ${
                          isActive
                            ? `
                              border-[#1689F5]
                              bg-gradient-to-br
                              from-[#0877E8]
                              to-[#36BDF8]
                              text-white
                              shadow-[0_10px_28px_rgba(8,119,232,0.28)]
                            `
                            : isPassed
                              ? `
                                border-[#B2D9F5]
                                bg-[#E6F5FF]
                                text-[#0877E8]
                              `
                              : `
                                border-[#D6E7F4]
                                bg-white
                                text-[#8CA2B6]
                              `
                        }
                      `}
                    >
                      {step.number}
                    </div>

                    {/* Card */}

                    <div
                      className={`
                        mt-7
                        min-h-[170px]
                        rounded-[24px]
                        border
                        p-5
                        transition-all
                        duration-500

                        ${
                          isActive
                            ? `
                              -translate-y-1
                              border-[#B7DCF7]
                              bg-white
                              shadow-[0_16px_45px_rgba(8,119,232,0.12)]
                            `
                            : `
                              border-[#E0EDF7]
                              bg-[#F9FCFF]
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
                              ? "text-[#1689F5]"
                              : "text-[#91A5B7]"
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
                          tracking-[-0.03em]
                          text-[#173B63]
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          max-w-[200px]
                          text-sm
                          leading-6
                          text-[#6C8297]
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
                            bg-[#E9F6FF]
                            px-3
                            py-1.5
                          "
                        >
                          <span
                            className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-[#0877E8]
                              shadow-[0_0_8px_rgba(8,119,232,0.5)]
                            "
                          />

                          <span
                            className="
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-[0.12em]
                              text-[#0877E8]
                            "
                          >
                            You&apos;re here
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===================================================
              MOBILE JOURNEY
          =================================================== */}

          <div className="relative md:hidden">
            <div
              aria-hidden="true"
              className="
                absolute
                bottom-0
                left-[23px]
                top-0
                w-[2px]
                bg-[#DCECF8]
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                left-[23px]
                top-0
                w-[2px]
                bg-gradient-to-b
                from-[#0877E8]
                to-[#40C6FF]
                transition-all
                duration-700
                ease-out
              "
              style={{
                height: `${(active / (steps.length - 1)) * 100}%`,
              }}
            />

            <div className="space-y-5">
              {steps.map((step, index) => {
                const isActive = active === index;
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
                      gap-5
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
                        rounded-2xl
                        border
                        text-xs
                        font-bold
                        transition-all
                        duration-500

                        ${
                          isActive
                            ? `
                              border-[#1689F5]
                              bg-gradient-to-br
                              from-[#0877E8]
                              to-[#38BDF8]
                              text-white
                              shadow-[0_9px_24px_rgba(8,119,232,0.25)]
                            `
                            : isPassed
                              ? `
                                border-[#B5DBF5]
                                bg-[#E7F5FF]
                                text-[#0877E8]
                              `
                              : `
                                border-[#D7E8F4]
                                bg-white
                                text-[#8CA2B6]
                              `
                        }
                      `}
                    >
                      {step.number}
                    </div>

                    <div
                      className={`
                        flex-1
                        rounded-[22px]
                        border
                        p-5
                        transition-all
                        duration-500

                        ${
                          isActive
                            ? `
                              border-[#B8DCF7]
                              bg-white
                              shadow-[0_12px_34px_rgba(8,119,232,0.11)]
                            `
                            : `
                              border-[#DFEDF7]
                              bg-white/75
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
                          text-[#7B98B1]
                        "
                      >
                        Stage {step.number}
                      </p>

                      <h3
                        className="
                          mt-2
                          text-xl
                          font-bold
                          tracking-[-0.03em]
                          text-[#173B63]
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-sm
                          leading-6
                          text-[#6A8196]
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
                            text-[#0877E8]
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

          {/* ===================================================
              STATUS SUMMARY
          =================================================== */}

          <div
            className="
              relative
              mt-10
              overflow-hidden
              rounded-[24px]
              bg-gradient-to-r
              from-[#0877E8]
              via-[#1294F2]
              to-[#35BDF8]
              p-[1px]
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5
                rounded-[23px]
                bg-white
                px-6
                py-5

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#1689F5]
                  "
                >
                  Application journey
                </p>

                <p
                  className="
                    mt-1
                    text-lg
                    font-semibold
                    tracking-[-0.02em]
                    text-[#173B63]
                  "
                >
                  {steps[active].title}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="
                    text-sm
                    font-semibold
                    text-[#5D7891]
                  "
                >
                  {active + 1} of {steps.length}
                </span>

                <div
                  className="
                    h-2
                    w-24
                    overflow-hidden
                    rounded-full
                    bg-[#DDEEF9]
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-[#0877E8]
                      to-[#40C6FF]
                      transition-all
                      duration-700
                    "
                    style={{
                      width: `${((active + 1) / steps.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div
          className="
            mt-16
            flex
            flex-col
            gap-5
            border-t
            border-[#D7E8F5]
            pt-8

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-xl
              font-semibold
              tracking-[-0.03em]
              text-[#173B63]

              sm:text-2xl
              lg:text-3xl
            "
          >
            Apply.
            <span className="text-[#0877E8]">
              {" "}
              Move.
            </span>
            <span>
              {" "}
              Grow.
            </span>
          </p>

          <p
            className="
              text-sm
              font-medium
              text-[#6B8197]
            "
          >
            Your next step stays visible.
          </p>
        </div>
      </div>
    </section>
  );
}