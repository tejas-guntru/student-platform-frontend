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
      {/* =====================================================
          INDIAN TRICOLOR INSPIRED BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* -----------------------------------------
            SAFFRON - TOP LEFT
        ----------------------------------------- */}

        <div
          className="
            absolute
            -left-[180px]
            -top-[190px]
            h-[520px]
            w-[620px]
            rounded-full
            bg-[#FF9933]/10
            blur-[90px]
          "
        />

        <div
          className="
            absolute
            -left-[260px]
            top-[180px]
            h-[330px]
            w-[720px]
            -rotate-[14deg]
            rounded-[50%]
            border
            border-[#FF9933]/20
          "
        />

        <div
          className="
            absolute
            -left-[220px]
            top-[235px]
            h-[280px]
            w-[690px]
            -rotate-[14deg]
            rounded-[50%]
            border
            border-[#FF9933]/10
          "
        />

        {/* Soft saffron wave */}
        <div
          className="
            absolute
            -left-[230px]
            top-[230px]
            h-[130px]
            w-[720px]
            -rotate-[12deg]
            rounded-[50%]
            bg-gradient-to-r
            from-[#FF9933]/10
            via-[#FF9933]/5
            to-transparent
            blur-2xl
          "
        />

        {/* Saffron dots */}
        <div
          className="
            absolute
            left-8
            top-16
            h-[230px]
            w-[260px]
            opacity-40
          "
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,153,51,0.55) 1.2px, transparent 1.2px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* Small saffron orbital dot */}
        <div
          className="
            absolute
            left-[25%]
            top-[125px]
            hidden
            h-3
            w-3
            rounded-full
            bg-[#FF9933]/55
            lg:block
          "
        />

        {/* -----------------------------------------
            GREEN - BOTTOM RIGHT
        ----------------------------------------- */}

        <div
          className="
            absolute
            -bottom-[220px]
            -right-[170px]
            h-[620px]
            w-[700px]
            rounded-full
            bg-[#138808]/10
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            -right-[270px]
            bottom-[80px]
            h-[360px]
            w-[760px]
            rotate-[-17deg]
            rounded-[50%]
            border
            border-[#138808]/20
          "
        />

        <div
          className="
            absolute
            -right-[220px]
            bottom-[135px]
            h-[290px]
            w-[700px]
            rotate-[-17deg]
            rounded-[50%]
            border
            border-[#138808]/10
          "
        />

        {/* Green wave */}
        <div
          className="
            absolute
            -bottom-[20px]
            -right-[230px]
            h-[150px]
            w-[760px]
            rotate-[-12deg]
            rounded-[50%]
            bg-gradient-to-l
            from-[#138808]/10
            via-[#138808]/5
            to-transparent
            blur-2xl
          "
        />

        {/* Green dots */}
        <div
          className="
            absolute
            right-5
            top-[150px]
            h-[250px]
            w-[260px]
            opacity-30
          "
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(19,136,8,0.5) 1.2px, transparent 1.2px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* Small green orbital dot */}
        <div
          className="
            absolute
            bottom-[28%]
            right-[13%]
            hidden
            h-3
            w-3
            rounded-full
            bg-[#138808]/45
            lg:block
          "
        />

        {/* -----------------------------------------
            VERY LIGHT CENTER GLOW
        ----------------------------------------- */}

        <div
          className="
            absolute
            left-1/2
            top-[45%]
            h-[650px]
            w-[850px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/90
            blur-[80px]
          "
        />
      </div>

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
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
          {/* =================================================
              INTRO BADGE
          ================================================= */}

          <div className="mb-5 sm:mb-6">
            <span
              className="
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-[#FF9933]/15
                bg-white/75
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.14em]
                text-gray-700
                shadow-sm
                backdrop-blur-md

                sm:text-sm
              "
            >
              <span className="h-2 w-2 rounded-full bg-[#FF9933]" />

              Learn • Build • Get Ready
            </span>
          </div>

          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <h1
            className="
              mx-auto
              max-w-6xl
              text-4xl
              font-semibold
              leading-[1.07]
              tracking-[-0.04em]
              text-gray-950

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

          {/* =================================================
              SECONDARY HEADING
          ================================================= */}

          <h2
            className="
              mt-4
              text-xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-700

              sm:mt-5
              sm:text-2xl
              md:text-3xl
              lg:text-4xl
            "
          >
            Learn. Build.{" "}
            <span className="relative inline-block text-[#1256af]">
              Get Ready.

              {/* Tricolor underline */}

              <svg
                aria-hidden="true"
                className="
                  absolute
                  -bottom-3
                  left-0
                  h-3
                  w-full
                  sm:h-4
                "
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="url(#tricolor-underline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <defs>
                  <linearGradient
                    id="tricolor-underline"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#FF9933"
                    />

                    <stop
                      offset="48%"
                      stopColor="#FF9933"
                    />

                    <stop
                      offset="52%"
                      stopColor="#138808"
                    />

                    <stop
                      offset="100%"
                      stopColor="#138808"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

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
              , hands-on projects, regular assessments, and
              career-focused mentorship designed for today&apos;s
              job market.
            </p>
          </div>

          {/* =================================================
              CTA
          ================================================= */}

          <div
            className="
              mt-9
              flex
              flex-col
              items-center
              justify-center
              gap-3

              sm:mt-10
              sm:flex-row
            "
          >
            {/* Primary */}

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
                bg-[#1256af]
                px-7
                py-3
                text-base
                font-bold
                text-white
                shadow-[0_12px_30px_rgba(18,86,175,0.18)]
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-[#0F4994]
                hover:shadow-[0_16px_35px_rgba(18,86,175,0.25)]

                focus:outline-none
                focus:ring-2
                focus:ring-[#1256af]/30

                active:translate-y-0

                sm:w-auto
                sm:px-9
                sm:py-4
                sm:text-lg
              "
            >
              <span>Join Trailbliz Today</span>

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
            </Link>

            {/* Secondary */}

            <Link
              href="/courses"
              className="
                inline-flex
                min-h-[54px]
                w-full
                max-w-sm
                items-center
                justify-center
                rounded-2xl
                border
                border-[#1256af]/25
                bg-white/70
                px-7
                py-3
                text-base
                font-bold
                text-[#1256af]
                backdrop-blur-md
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:border-[#1256af]/45
                hover:bg-white

                sm:w-auto
                sm:px-8
                sm:py-4
                sm:text-lg
              "
            >
              Explore Courses
            </Link>
          </div>

          {/* =================================================
              FEATURES
          ================================================= */}

          <div className="mt-12 sm:mt-14">
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-5
                gap-y-4
                text-sm
                font-medium
                text-gray-600

                sm:gap-x-7
                sm:text-base
              "
            >
              {features.map((item, index) => (
                <React.Fragment key={item}>
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <span
                      className={`
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        text-[10px]
                        font-black

                        ${
                          index % 2 === 0
                            ? "bg-[#FF9933]/10 text-[#E87917]"
                            : "bg-[#138808]/10 text-[#138808]"
                        }
                      `}
                    >
                      ✓
                    </span>

                    {item}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM TRANSITION
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-10
          h-20
          bg-gradient-to-t
          from-[#FAFAFA]
          to-transparent
        "
      />
    </section>
  );
}