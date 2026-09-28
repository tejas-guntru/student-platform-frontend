"use client";

import Link from "next/link";
import React from "react";

export default function HeroSection() {
  const features = [
    "Expert Mentorship",
    "Regular Assessments",
    "Real-World Projects",
    "Career Focused",
    "Vibrant Community",
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Very subtle brand background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-blue-50/70 blur-3xl" />

        <div className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-sky-50/60 blur-3xl" />
      </div>

      <div
        className="
          relative z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-7xl
          items-center
          justify-center
          px-4
          pb-16
          pt-28
          sm:px-6
          sm:pb-20
          sm:pt-32
          lg:px-12
          lg:pb-24
          lg:pt-32
        "
      >
        <div className="mx-auto w-full max-w-6xl text-center">
          {/* Small introduction */}
          <div className="mb-5 sm:mb-6">
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#1256af]/15
                bg-[#1256af]/5
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#1256af]
                sm:text-sm
              "
            >
              <span className="h-2 w-2 rounded-full bg-[#1256af]" />

              Learn • Build • Get Ready
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="
              mx-auto
              max-w-6xl
              text-4xl
              font-semibold
              leading-[1.08]
              tracking-tight
              text-gray-900
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-8xl
            "
          >
            Build{" "}
            <span className="text-[#1256af]">
              job-ready skills
            </span>{" "}
            that matter.
          </h1>

          {/* Secondary heading */}
          <h2
            className="
              mt-4
              text-2xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-700
              sm:mt-5
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              xl:text-6xl
            "
          >
            Learn. Build.{" "}
            <span className="relative inline-block text-[#1256af]">
              Get Ready.

              {/* Original Trailbliz-style underline */}
              <svg
                aria-hidden="true"
                className="
                  absolute
                  -bottom-2
                  left-0
                  h-3
                  w-full
                  sm:-bottom-3
                  sm:h-4
                "
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="url(#hero-underline-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <defs>
                  <linearGradient
                    id="hero-underline-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          {/* Description */}
          <div className="mx-auto mt-9 max-w-4xl sm:mt-10">
            <p
              className="
                px-2
                text-base
                font-light
                leading-relaxed
                text-gray-600
                sm:px-0
                sm:text-lg
                md:text-xl
                lg:text-2xl
              "
            >
              Build real-world software skills through{" "}
              <span className="font-semibold text-gray-800">
                expert-led coding courses
              </span>
              , hands-on projects, regular assessments, and career-focused
              mentorship designed for today&apos;s job market.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="mt-9 flex justify-center sm:mt-10">
            <Link
              href="/login"
              className="
                group
                inline-flex
                min-h-[54px]
                w-full
                max-w-sm
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-[#1256af]
                bg-white
                px-7
                py-3
                text-base
                font-bold
                text-[#1256af]
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#1256af]
                hover:text-white
                hover:shadow-xl
                focus:outline-none
                focus:ring-2
                focus:ring-[#1256af]/30
                active:translate-y-0
                sm:w-auto
                sm:px-9
                sm:py-4
                sm:text-lg
                md:text-xl
              "
            >
              <span>Join Trailbliz Today</span>

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          {/* Feature strip */}
          <div className="mt-12 overflow-hidden sm:mt-14">
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-3
                gap-y-3
                text-sm
                font-medium
                text-gray-500
                sm:gap-x-5
                sm:text-base
                md:text-lg
              "
            >
              {features.map((item, index) => (
                <React.Fragment key={item}>
                  <span className="whitespace-nowrap">
                    {item}
                  </span>

                  {index < features.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="text-[#1256af]"
                    >
                      •
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Soft transition into next section */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-20
          bg-gradient-to-t
          from-[#FAFAFA]
          to-transparent
        "
      />
    </section>
  );
}