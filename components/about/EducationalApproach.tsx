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

const connectedFlow = [
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
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-40 top-20 h-[380px] w-[380px] rounded-full bg-blue-50/70 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-sky-50/60 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1256af]/15 bg-[#1256af]/5 px-4 py-2">
            <Route size={14} className="text-[#1256af]" />

            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1256af] sm:text-sm">
              The Trailbliz Approach
            </span>
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Your career story is{" "}
            <span className="text-[#1256af]">
              built one step at a time.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Trailbliz connects the things students build throughout college and
            turns them into a clear, growing career profile.
          </p>
        </div>

        {/* Journey */}
        <div className="mt-14 grid gap-7 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-8">
          {/* Left */}
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
                    group relative w-full overflow-hidden rounded-[22px]
                    border p-4 text-left transition-all duration-300 sm:p-5
                    ${
                      active
                        ? "border-[#1256af]/25 bg-white shadow-[0_16px_40px_rgba(18,86,175,0.09)]"
                        : "border-gray-200 bg-[#FAFAFA] hover:border-[#1256af]/15 hover:bg-white"
                    }
                  `}
                >
                  {active && (
                    <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#1256af]" />
                  )}

                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        flex h-12 w-12 shrink-0 items-center justify-center
                        rounded-2xl transition-all duration-300
                        ${
                          active
                            ? "bg-[#1256af] text-white shadow-[0_8px_20px_rgba(18,86,175,0.18)]"
                            : "bg-[#1256af]/[0.07] text-[#1256af]"
                        }
                      `}
                    >
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                          Step {step.number}
                        </p>

                        {active && (
                          <span className="rounded-full bg-[#1256af]/[0.07] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#1256af]">
                            Active
                          </span>
                        )}
                      </div>

                      <h3
                        className={`mt-1 text-base font-semibold tracking-tight transition-colors ${
                          active ? "text-[#1256af]" : "text-gray-800"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <ArrowRight
                      size={18}
                      className={`shrink-0 transition-all duration-300 ${
                        active
                          ? "translate-x-0 text-[#1256af]"
                          : "-translate-x-1 text-gray-300 group-hover:translate-x-0 group-hover:text-[#1256af]"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active step */}
          <div className="relative min-h-[500px] overflow-hidden rounded-[30px] bg-[#1256af] p-6 shadow-[0_25px_60px_rgba(18,86,175,0.16)] sm:p-8 lg:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl"
            />

            <div key={activeStep} className="relative animate-[fadeStep_400ms_ease-out]">
              <div className="flex items-start justify-between gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-white/20 bg-white/10 text-white">
                  <CurrentIcon size={25} />
                </div>

                <span className="text-6xl font-semibold tracking-[-0.06em] text-white/10 sm:text-7xl">
                  {currentStep.number}
                </span>
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                {currentStep.shortTitle}
              </p>

              <h3 className="mt-2 max-w-lg text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {currentStep.title}
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                {currentStep.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {currentStep.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5"
                  >
                    <BadgeCheck
                      size={18}
                      className="shrink-0 text-white"
                    />

                    <span className="text-sm font-medium text-white/90">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-9">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    Journey progress
                  </span>

                  <span className="text-xs font-semibold text-white/75">
                    {activeStep + 1} / {steps.length}
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{
                      width: `${((activeStep + 1) / steps.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connected flow */}
        <div className="mt-14 overflow-hidden rounded-[28px] border border-gray-200 bg-[#FAFAFA] px-5 py-7 sm:px-7 sm:py-8 lg:mt-16">
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1256af]">
              One connected career journey
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-2">
            {connectedFlow.map((item, index, array) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex w-full items-center justify-center gap-2 md:w-auto"
                >
                  <div className="flex min-w-[145px] items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 transition-all duration-300 hover:border-[#1256af]/20 hover:shadow-sm">
                    <Icon size={16} className="text-[#1256af]" />

                    <span className="text-sm font-semibold text-gray-700">
                      {item.label}
                    </span>
                  </div>

                  {index < array.length - 1 && (
                    <ArrowRight
                      size={17}
                      className="hidden shrink-0 text-[#1256af]/35 md:block"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-gray-500">
            Instead of treating each part of a student&apos;s journey
            separately, Trailbliz connects them into one evolving career story.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeStep {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}