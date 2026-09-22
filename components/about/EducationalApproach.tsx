"use client";

import { useEffect, useState } from "react";

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Route,
  Sparkles,
  Target,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Build your foundation",
    shortTitle: "Build",
    description:
      "Start with the information that shapes your student journey — academics, college, degree, graduation year and career direction.",
    icon: GraduationCap,
    items: [
      "Academic profile",
      "College & degree",
      "Graduation details",
      "Career preferences",
    ],
  },
  {
    number: "02",
    title: "Add proof of your skills",
    shortTitle: "Show",
    description:
      "Go beyond saying what you know. Add skills, projects, experience and coding profiles that show what you have actually built.",
    icon: FolderKanban,
    items: [
      "Technical skills",
      "Projects",
      "Experience",
      "Coding profiles",
    ],
  },
  {
    number: "03",
    title: "Understand your progress",
    shortTitle: "Grow",
    description:
      "See the different parts of your profile together so you can understand what is strong and what still needs attention.",
    icon: Target,
    items: [
      "Profile progress",
      "Skill visibility",
      "Project proof",
      "Career readiness",
    ],
  },
  {
    number: "04",
    title: "Move toward opportunities",
    shortTitle: "Move",
    description:
      "Use the profile you have built to discover opportunities and keep moving toward internships, jobs and your next career step.",
    icon: BriefcaseBusiness,
    items: [
      "Discover opportunities",
      "Check eligibility",
      "Apply with context",
      "Track your journey",
    ],
  },
];

export default function EducationalApproach() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  const currentStep = steps[activeStep];
  const CurrentIcon = currentStep.icon;

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-[#F4FAFF]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-48
          top-20
          h-[460px]
          w-[460px]
          rounded-full
          bg-[#38BDF8]/14
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-48
          bottom-0
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#0877E8]/12
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.22]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(8,119,232,0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(8,119,232,0.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "54px 54px",
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          sm:px-6
          lg:px-8
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#CBE5F8]
              bg-white/75
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <Route
              size={14}
              className="text-[#0877E8]"
            />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-[#4D7FA8]
              "
            >
              The Trailbliz approach
            </span>
          </div>

          <h2
            className="
              mt-6
              text-4xl
              font-bold
              leading-[1]
              tracking-[-0.05em]
              text-[#143655]

              sm:text-5xl
              lg:text-6xl
            "
          >
            Your career story is
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
              built one step at a time.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-7
              text-[#607A92]

              sm:text-lg
              sm:leading-8
            "
          >
            Trailbliz connects the things students build throughout
            college and turns them into a clear, growing career profile.
          </p>
        </div>

        {/* =====================================================
            JOURNEY
        ===================================================== */}

        <div
          className="
            mt-16
            grid
            gap-8
            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-stretch
          "
        >
          {/* ===================================================
              LEFT — STEPS
          =================================================== */}

          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const active = activeStep === index;

              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`
                    group
                    relative
                    w-full
                    overflow-hidden
                    rounded-[22px]
                    border
                    p-4
                    text-left

                    transition-all
                    duration-300

                    sm:p-5

                    ${
                      active
                        ? `
                          border-[#9FD4F5]
                          bg-white
                          shadow-[0_16px_40px_rgba(8,119,232,0.10)]
                        `
                        : `
                          border-[#DCEAF5]
                          bg-white/55
                          hover:border-[#BADCF3]
                          hover:bg-white/85
                        `
                    }
                  `}
                >
                  {active && (
                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        top-0
                        w-1
                        bg-gradient-to-b
                        from-[#0877E8]
                        to-[#38BDF8]
                      "
                    />
                  )}

                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl

                        transition-all
                        duration-300

                        ${
                          active
                            ? `
                              bg-gradient-to-br
                              from-[#0877E8]
                              to-[#38BDF8]
                              text-white
                              shadow-[0_10px_24px_rgba(8,119,232,0.20)]
                            `
                            : `
                              bg-[#EAF6FF]
                              text-[#0877E8]
                            `
                        }
                      `}
                    >
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p
                          className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-[#8AA0B4]
                          "
                        >
                          Step {step.number}
                        </p>

                        {active && (
                          <span
                            className="
                              rounded-full
                              bg-[#E7F5FF]
                              px-2.5
                              py-1
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-[0.12em]
                              text-[#0877E8]
                            "
                          >
                            Active
                          </span>
                        )}
                      </div>

                      <h3
                        className={`
                          mt-1
                          text-base
                          font-bold
                          tracking-[-0.025em]

                          transition-colors

                          ${
                            active
                              ? "text-[#0877E8]"
                              : "text-[#173B63]"
                          }
                        `}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <ArrowRight
                      size={18}
                      className={`
                        shrink-0
                        transition-all
                        duration-300

                        ${
                          active
                            ? "translate-x-0 text-[#0877E8]"
                            : "-translate-x-1 text-[#A6B8C8] group-hover:translate-x-0"
                        }
                      `}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* ===================================================
              RIGHT — ACTIVE STEP
          =================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              bg-gradient-to-br
              from-[#0877E8]
              via-[#1192EF]
              to-[#36B9FF]
              p-6
              shadow-[0_30px_70px_rgba(8,119,232,0.20)]

              sm:p-8
              lg:p-9
            "
          >
            {/* glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-72
                w-72
                rounded-full
                bg-white/20
                blur-[70px]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-28
                -left-16
                h-72
                w-72
                rounded-full
                bg-[#AEEAFF]/20
                blur-[90px]
              "
            />

            {/* grid */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.18]
              "
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(255,255,255,0.18) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(255,255,255,0.18) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize: "38px 38px",
              }}
            />

            <div className="relative">
              {/* top */}

              <div className="flex items-start justify-between gap-6">
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-[20px]
                    border
                    border-white/20
                    bg-white/15
                    text-white
                    backdrop-blur-xl
                  "
                >
                  <CurrentIcon size={25} />
                </div>

                <div
                  className="
                    text-6xl
                    font-bold
                    tracking-[-0.07em]
                    text-white/15

                    sm:text-7xl
                  "
                >
                  {currentStep.number}
                </div>
              </div>

              <p
                className="
                  mt-8
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.17em]
                  text-white/65
                "
              >
                {currentStep.shortTitle}
              </p>

              <h3
                className="
                  mt-2
                  max-w-lg
                  text-3xl
                  font-bold
                  tracking-[-0.045em]
                  text-white

                  sm:text-4xl
                "
              >
                {currentStep.title}
              </h3>

              <p
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-7
                  text-white/78

                  sm:text-base
                "
              >
                {currentStep.description}
              </p>

              {/* items */}

              <div
                className="
                  mt-8
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >
                {currentStep.items.map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-white/15
                      bg-white/10
                      px-4
                      py-3.5
                      backdrop-blur-xl
                    "
                  >
                    <BadgeCheck
                      size={18}
                      className="
                        shrink-0
                        text-[#C7F0FF]
                      "
                    />

                    <span
                      className="
                        text-sm
                        font-medium
                        text-white/90
                      "
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* progress */}

              <div className="mt-9">
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
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-white/55
                    "
                  >
                    Journey progress
                  </span>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-white/75
                    "
                  >
                    {activeStep + 1} / {steps.length}
                  </span>
                </div>

                <div
                  className="
                    h-1.5
                    overflow-hidden
                    rounded-full
                    bg-white/15
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-white
                      transition-all
                      duration-500
                    "
                    style={{
                      width: `${
                        ((activeStep + 1) /
                          steps.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            CONNECTED FLOW
        ===================================================== */}

        <div
          className="
            mt-16
            overflow-hidden
            rounded-[28px]
            border
            border-[#D9EAF6]
            bg-white/80
            px-5
            py-7
            shadow-[0_12px_38px_rgba(8,119,232,0.05)]
            backdrop-blur-xl

            sm:px-7
            sm:py-8
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-3

              md:flex-row
              md:gap-2
            "
          >
            {[
              {
                label: "Academics",
                icon: GraduationCap,
              },
              {
                label: "Skills",
                icon: Sparkles,
              },
              {
                label: "Projects",
                icon: FolderKanban,
              },
              {
                label: "Readiness",
                icon: BadgeCheck,
              },
              {
                label: "Opportunities",
                icon: BriefcaseBusiness,
              },
            ].map((item, index, array) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2

                    md:w-auto
                  "
                >
                  <div
                    className="
                      flex
                      min-w-[145px]
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border
                      border-[#DCEBF6]
                      bg-[#F7FBFF]
                      px-4
                      py-3
                    "
                  >
                    <Icon
                      size={16}
                      className="text-[#0877E8]"
                    />

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-[#426581]
                      "
                    >
                      {item.label}
                    </span>
                  </div>

                  {index < array.length - 1 && (
                    <ArrowRight
                      size={17}
                      className="
                        hidden
                        shrink-0
                        text-[#8FC9EF]

                        md:block
                      "
                    />
                  )}
                </div>
              );
            })}
          </div>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-center
              text-sm
              leading-6
              text-[#71899E]
            "
          >
            Instead of treating each part of a student&apos;s journey
            separately, Trailbliz connects them into one evolving career
            story.
          </p>
        </div>
      </div>
    </section>
  );
}