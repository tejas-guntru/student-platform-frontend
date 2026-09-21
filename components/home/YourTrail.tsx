"use client";

import { useEffect, useState } from "react";

const journey = [
  {
    number: "01",
    title: "Academics",
    text: "Your foundation and where your journey begins.",
  },
  {
    number: "02",
    title: "Skills",
    text: "The abilities you learn and continue improving.",
  },
  {
    number: "03",
    title: "Projects",
    text: "Real proof of what you can build and create.",
  },
  {
    number: "04",
    title: "Experience",
    text: "Where your knowledge becomes real-world work.",
  },
  {
    number: "05",
    title: "Progress",
    text: "Everything coming together for your next move.",
  },
];

export default function YourTrail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % journey.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="your-trail"
      className="
        relative
        overflow-hidden
        bg-[#F5FAFF]
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
          -left-40
          top-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#CDEAFF]/60
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-48
          bottom-10
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#B9E4FF]/50
          blur-[140px]
        "
      />

      {/* Grid effect */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.35]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(8,119,232,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,119,232,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            INTRO
        ===================================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[1fr_0.8fr]
            lg:items-end
          "
        >
          <div>
            {/* Label */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#CFE6FA]
                bg-white/80
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
                  bg-[#0B82EF]
                  shadow-[0_0_12px_rgba(11,130,239,0.55)]
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
                Your Trail
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                mt-6
                max-w-3xl
                text-[clamp(2.8rem,6vw,5.8rem)]
                font-bold
                leading-[0.92]
                tracking-[-0.06em]
                text-[#102F51]
              "
            >
              Every step
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
                builds your story.
              </span>
            </h2>
          </div>

          {/* Supporting copy */}

          <div className="max-w-xl lg:justify-self-end">
            <p
              className="
                text-base
                leading-7
                text-[#58708B]

                sm:text-lg
                sm:leading-8
              "
            >
              Your academics, skills, projects and experience are not
              separate pieces. Trailbliz brings them together into one
              clear career journey.
            </p>
          </div>
        </div>

        {/* =====================================================
            DESKTOP JOURNEY
        ===================================================== */}

        <div className="relative mt-20 hidden lg:block">
          {/* Main rail */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-0
              right-0
              top-[27px]
              h-[3px]
              rounded-full
              bg-[#D9EAF8]
            "
          />

          {/* Active progress rail */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-0
              top-[27px]
              h-[3px]
              rounded-full
              bg-gradient-to-r
              from-[#0877E8]
              to-[#43C7FF]
              transition-all
              duration-700
              ease-out
            "
            style={{
              width: `${(active / (journey.length - 1)) * 100}%`,
            }}
          />

          {/* Progress glow */}

          <div
            aria-hidden="true"
            className="
              absolute
              top-[22px]
              h-[13px]
              rounded-full
              bg-[#3ABEFF]/30
              blur-md
              transition-all
              duration-700
              ease-out
            "
            style={{
              width: `${(active / (journey.length - 1)) * 100}%`,
            }}
          />

          <div className="relative grid grid-cols-5 gap-4">
            {journey.map((item, index) => {
              const isActive = active === index;
              const isPassed = index < active;

              return (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => setActive(index)}
                  className="
                    group
                    relative
                    text-left
                  "
                >
                  {/* Station */}

                  <div
                    className={`
                      relative
                      z-10
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      transition-all
                      duration-500

                      ${
                        isActive
                          ? `
                            border-[#1689F5]
                            bg-gradient-to-br
                            from-[#0877E8]
                            to-[#3BC3FF]
                            shadow-[0_12px_30px_rgba(8,119,232,0.30)]
                          `
                          : isPassed
                            ? `
                              border-[#A8D5F5]
                              bg-[#E3F4FF]
                              shadow-[0_5px_14px_rgba(8,119,232,0.10)]
                            `
                            : `
                              border-[#D4E7F6]
                              bg-white
                              shadow-sm
                            `
                      }
                    `}
                  >
                    <span
                      className={`
                        text-xs
                        font-bold
                        tracking-[0.08em]
                        transition-colors
                        duration-500

                        ${
                          isActive
                            ? "text-white"
                            : isPassed
                              ? "text-[#0877E8]"
                              : "text-[#8DA3B8]"
                        }
                      `}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Card */}

                  <div
                    className={`
                      mt-7
                      min-h-[180px]
                      rounded-[24px]
                      border
                      p-5
                      transition-all
                      duration-500

                      ${
                        isActive
                          ? `
                            -translate-y-1
                            border-[#B9DDF8]
                            bg-white
                            shadow-[0_18px_50px_rgba(8,119,232,0.13)]
                          `
                          : `
                            border-[#DBEAF6]
                            bg-white/60
                            shadow-[0_5px_20px_rgba(23,59,99,0.04)]
                          `
                      }
                    `}
                  >
                    {/* Number */}

                    <p
                      className={`
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]

                        ${
                          isActive
                            ? "text-[#1689F5]"
                            : "text-[#8EA2B6]"
                        }
                      `}
                    >
                      Step {item.number}
                    </p>

                    {/* Title */}

                    <h3
                      className={`
                        mt-3
                        text-xl
                        font-bold
                        tracking-[-0.025em]
                        transition-colors
                        duration-500

                        ${
                          isActive
                            ? "text-[#102F51]"
                            : "text-[#36516D]"
                        }
                      `}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-[#6A8096]
                      "
                    >
                      {item.text}
                    </p>

                    {/* Active indicator */}

                    <div
                      className={`
                        mt-5
                        h-1
                        rounded-full
                        transition-all
                        duration-500

                        ${
                          isActive
                            ? "w-12 bg-[#1689F5]"
                            : "w-5 bg-[#D8E6F1]"
                        }
                      `}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            MOBILE / TABLET JOURNEY
        ===================================================== */}

        <div className="relative mt-14 lg:hidden">
          {/* Vertical line */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-[23px]
              top-0
              w-[2px]
              bg-[#D6E8F6]
            "
          />

          {/* Active line */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-[23px]
              top-0
              w-[2px]
              bg-gradient-to-b
              from-[#0877E8]
              to-[#42C7FF]
              transition-all
              duration-700
              ease-out
            "
            style={{
              height: `${(active / (journey.length - 1)) * 100}%`,
            }}
          />

          <div className="space-y-5">
            {journey.map((item, index) => {
              const isActive = active === index;
              const isPassed = index < active;

              return (
                <button
                  key={item.number}
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
                  {/* Station */}

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
                      transition-all
                      duration-500

                      ${
                        isActive
                          ? `
                            border-[#1689F5]
                            bg-gradient-to-br
                            from-[#0877E8]
                            to-[#3BC3FF]
                            text-white
                            shadow-[0_10px_24px_rgba(8,119,232,0.25)]
                          `
                          : isPassed
                            ? `
                              border-[#B5DAF5]
                              bg-[#E5F4FF]
                              text-[#0877E8]
                            `
                            : `
                              border-[#D7E7F3]
                              bg-white
                              text-[#8EA2B6]
                            `
                      }
                    `}
                  >
                    <span
                      className="
                        text-xs
                        font-bold
                        tracking-[0.08em]
                      "
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Card */}

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
                            border-[#B9DCF7]
                            bg-white
                            shadow-[0_14px_36px_rgba(8,119,232,0.12)]
                          `
                          : `
                            border-[#DCEAF6]
                            bg-white/70
                          `
                      }
                    `}
                  >
                    <p
                      className={`
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.13em]

                        ${
                          isActive
                            ? "text-[#1689F5]"
                            : "text-[#8FA4B7]"
                        }
                      `}
                    >
                      Step {item.number}
                    </p>

                    <h3
                      className="
                        mt-2
                        text-xl
                        font-bold
                        tracking-[-0.025em]
                        text-[#173B63]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-[#647B91]
                      "
                    >
                      {item.text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <div
          className="
            mt-20
            overflow-hidden
            rounded-[28px]
            bg-gradient-to-r
            from-[#0877E8]
            via-[#1294F2]
            to-[#35B9FF]
            p-[1px]
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              rounded-[27px]
              bg-white/95
              px-6
              py-6
              backdrop-blur-xl

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-8
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#1689F5]
                "
              >
                One connected journey
              </p>

              <p
                className="
                  mt-2
                  text-lg
                  font-semibold
                  tracking-[-0.02em]
                  text-[#173B63]
                "
              >
                Every step becomes part of your career story.
              </p>
            </div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-[#0877E8]
              "
            >
              Keep moving

              <span aria-hidden="true">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}