"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FolderKanban,
  GraduationCap,
  Sparkles,
  UserRound,
} from "lucide-react";

const profileItems = [
  {
    title: "Academics",
    description: "Your education and foundation",
    icon: GraduationCap,
  },
  {
    title: "Skills",
    description: "What you know and can do",
    icon: Sparkles,
  },
  {
    title: "Projects",
    description: "Proof of your real work",
    icon: FolderKanban,
  },
  {
    title: "Opportunities",
    description: "Where your journey goes next",
    icon: BriefcaseBusiness,
  },
];

export default function AboutHeader() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute
            -right-40
            top-10
            h-[420px]
            w-[420px]
            rounded-full
            bg-blue-50/70
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -left-40
            bottom-0
            h-[360px]
            w-[360px]
            rounded-full
            bg-sky-50/60
            blur-3xl
          "
        />
      </div>

      {/* =====================================================
          HERO
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
          px-4
          pb-20
          pt-28

          sm:px-6
          sm:pb-24
          sm:pt-32

          lg:px-12
          lg:pt-32
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-14

            lg:grid-cols-[1fr_0.9fr]
            lg:gap-20
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div>
            {/* Eyebrow */}

            <div
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
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#1256af]
                "
              />

              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#1256af]

                  sm:text-sm
                "
              >
                About Trailbliz
              </span>
            </div>

            {/* Main heading */}

            <h1
              className="
                mt-6
                max-w-3xl
                text-4xl
                font-semibold
                leading-[1.05]
                tracking-tight
                text-gray-900

                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Built for the journey{" "}
              <span className="text-[#1256af]">
                between college and career.
              </span>
            </h1>

            {/* Secondary statement */}

            <h2
              className="
                mt-5
                text-xl
                font-bold
                leading-tight
                tracking-tight
                text-gray-700

                sm:text-2xl
                md:text-3xl
              "
            >
              Build. Show. Discover.{" "}
              <span className="relative inline-block text-[#1256af]">
                Move Forward.

                {/* Trailbliz signature underline */}

                <svg
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-2
                    left-0
                    h-3
                    w-full
                  "
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8C50 2 150 2 198 8"
                    stroke="url(#about-underline-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <defs>
                    <linearGradient
                      id="about-underline-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#3B82F6"
                      />

                      <stop
                        offset="50%"
                        stopColor="#8B5CF6"
                      />

                      <stop
                        offset="100%"
                        stopColor="#06B6D4"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-8
                max-w-2xl
                text-base
                font-light
                leading-7
                text-gray-600

                sm:text-lg
                sm:leading-8

                lg:text-xl
              "
            >
              Trailbliz brings your academics, skills, projects and
              opportunities together so your growth is{" "}
              <span className="font-semibold text-gray-800">
                visible, organized and ready for what comes next.
              </span>
            </p>

            {/* CTA */}

            <div
              className="
                mt-9
                flex
                flex-col
                gap-3

                sm:flex-row
              "
            >
              <Link
                href="/register"
                className="
                  group
                  inline-flex
                  min-h-[52px]
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
                "
              >
                Start your Trailbliz

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <Link
                href="#how-trailbliz-works"
                className="
                  inline-flex
                  min-h-[52px]
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  px-7
                  py-3
                  text-base
                  font-semibold
                  text-gray-700
                  transition-all
                  duration-300

                  hover:border-[#1256af]/25
                  hover:bg-[#1256af]/5
                  hover:text-[#1256af]
                "
              >
                How Trailbliz works
              </Link>
            </div>

            {/* Small trust points */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-x-6
                gap-y-3
              "
            >
              {[
                "Student-first",
                "Proof-driven",
                "Career-focused",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-gray-500
                  "
                >
                  <CheckCircle2
                    size={16}
                    className="text-[#1256af]"
                  />

                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              RIGHT VISUAL
          ================================================= */}

          <div className="relative mx-auto w-full max-w-xl">
            {/* Very subtle visual glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-8
                rounded-[40px]
                bg-blue-50/80
                blur-3xl
              "
            />

            {/* Main card */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-gray-200/80
                bg-white
                p-4
                shadow-[0_25px_70px_rgba(18,86,175,0.10)]

                sm:p-5
              "
            >
              {/* Card header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-[22px]
                  border
                  border-[#1256af]/10
                  bg-[#1256af]/[0.035]
                  px-4
                  py-4

                  sm:px-5
                "
              >
                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-gray-400
                    "
                  >
                    Trailbliz
                  </p>

                  <p
                    className="
                      mt-1
                      text-base
                      font-bold
                      text-gray-800
                    "
                  >
                    Your career profile
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#1256af]
                    text-white
                    shadow-[0_8px_22px_rgba(18,86,175,0.20)]
                  "
                >
                  <UserRound size={19} />
                </div>
              </div>

              {/* Profile items */}

              <div className="mt-4 space-y-3">
                {profileItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="
                        group
                        flex
                        items-center
                        gap-4
                        rounded-2xl
                        border
                        border-gray-200/80
                        bg-white
                        px-4
                        py-3.5
                        transition-all
                        duration-300

                        hover:border-[#1256af]/20
                        hover:bg-[#1256af]/[0.025]
                      "
                    >
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#1256af]/[0.07]
                          text-[#1256af]
                        "
                      >
                        <Icon size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className="
                            text-sm
                            font-bold
                            text-gray-800
                          "
                        >
                          {item.title}
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-xs
                            text-gray-500
                          "
                        >
                          {item.description}
                        </p>
                      </div>

                      <div
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          bg-[#1256af]/5
                        "
                      >
                        <CheckCircle2
                          size={15}
                          className="text-[#1256af]"
                        />
                      </div>

                      {/* Connection line */}

                      {index < profileItems.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="
                            absolute
                            hidden
                          "
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Journey strip */}

              <div
                className="
                  mt-4
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-[#1256af]/10
                  bg-[#1256af]
                  p-5
                  text-white
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/20
                      bg-white/10
                    "
                  >
                    <ArrowRight size={19} />
                  </div>

                  <div>
                    <p
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-white/65
                      "
                    >
                      One connected journey
                    </p>

                    <h3
                      className="
                        mt-1
                        text-lg
                        font-bold
                      "
                    >
                      From college to what comes next.
                    </h3>

                    <p
                      className="
                        mt-2
                        max-w-sm
                        text-sm
                        leading-6
                        text-white/75
                      "
                    >
                      Build your profile, show your work and
                      discover opportunities from one place.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating label */}

            <div
              className="
                absolute
                -bottom-6
                -right-3
                hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-4
                py-3
                shadow-[0_12px_35px_rgba(18,86,175,0.10)]

                sm:block
                lg:-right-8
              "
            >
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-gray-400
                "
              >
                One profile
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  font-bold
                  text-[#1256af]
                "
              >
                Your whole journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM STRIP
      ===================================================== */}

      <div
        className="
          relative
          z-10
          border-y
          border-gray-200/70
          bg-[#FAFAFA]
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-8

            sm:px-6
            lg:px-12
          "
        >
          <div
            className="
              grid
              grid-cols-2
              gap-x-4
              gap-y-6

              md:grid-cols-4
            "
          >
            {[
              {
                title: "Academics",
                text: "Your foundation",
              },
              {
                title: "Skills",
                text: "What you can do",
              },
              {
                title: "Projects",
                text: "Proof of your work",
              },
              {
                title: "Opportunities",
                text: "Where you go next",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`
                  relative
                  px-2
                  sm:px-4

                  ${
                    index !== 0
                      ? "md:border-l md:border-gray-200"
                      : ""
                  }
                `}
              >
                <p
                  className="
                    text-base
                    font-bold
                    text-gray-800

                    sm:text-lg
                  "
                >
                  {item.title}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500

                    sm:text-sm
                  "
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transition */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-16
          bg-gradient-to-t
          from-[#FAFAFA]
          to-transparent
        "
      />
    </section>
  );
}