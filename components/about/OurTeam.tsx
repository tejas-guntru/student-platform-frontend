import Link from "next/link";

import {
  ArrowRight,
  Braces,
  Compass,
  HeartHandshake,
  Lightbulb,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";

const focusAreas = [
  {
    icon: Compass,
    title: "Student-first product",
    description:
      "Every feature starts with a simple question: does this make the student journey clearer or easier?",
  },
  {
    icon: Braces,
    title: "Built with technology",
    description:
      "Trailbliz is designed as a connected platform rather than a collection of disconnected career tools.",
  },
  {
    icon: Lightbulb,
    title: "Continuous improvement",
    description:
      "The platform keeps evolving around real student workflows, career preparation and opportunity discovery.",
  },
];

const principles = [
  {
    icon: Users,
    title: "Understand students",
    description:
      "Build around the actual decisions and challenges students face throughout college.",
  },
  {
    icon: Sparkles,
    title: "Keep it simple",
    description:
      "Complex career information should feel organized, understandable and easy to act on.",
  },
  {
    icon: HeartHandshake,
    title: "Create real value",
    description:
      "Every part of the platform should help students build, show or move forward.",
  },
  {
    icon: Rocket,
    title: "Keep building",
    description:
      "Trailbliz is designed to grow alongside students and the opportunities available to them.",
  },
];

export default function OurTeam() {
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-[#FAFAFA]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute
            -left-40
            top-20
            h-[380px]
            w-[380px]
            rounded-full
            bg-blue-50/70
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-sky-50/60
            blur-3xl
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-12
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto max-w-4xl text-center">
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
            <Users
              size={14}
              className="text-[#1256af]"
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
              Behind Trailbliz
            </span>
          </div>

          <h2
            className="
              mx-auto
              mt-6
              max-w-4xl
              text-4xl
              font-semibold
              leading-[1.08]
              tracking-tight
              text-gray-900
              sm:text-5xl
              lg:text-6xl
            "
          >
            Building for students,{" "}
            <span className="text-[#1256af]">
              not around them.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              font-light
              leading-7
              text-gray-600
              sm:text-lg
              sm:leading-8
            "
          >
            Trailbliz is being built around one idea: students should
            have a clearer way to understand, present and move forward
            with everything they build during college.
          </p>
        </div>

        {/* =====================================================
            MAIN STORY
        ===================================================== */}

        <div
          className="
            mt-14
            grid
            gap-6
            lg:mt-16
            lg:grid-cols-[1.1fr_0.9fr]
            lg:items-stretch
          "
        >
          {/* ===================================================
              LEFT — STORY
          =================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[30px]
              bg-[#1256af]
              p-7
              text-white
              shadow-[0_25px_60px_rgba(18,86,175,0.16)]
              sm:p-9
              lg:p-10
            "
          >
            {/* decorations */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-20
                -top-24
                h-72
                w-72
                rounded-full
                bg-white/10
                blur-3xl
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-28
                -left-20
                h-72
                w-72
                rounded-full
                bg-blue-300/10
                blur-3xl
              "
            />

            <div className="relative">
              {/* icon */}

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-[18px]
                  border
                  border-white/20
                  bg-white/10
                  text-white
                "
              >
                <Rocket size={25} />
              </div>

              {/* label */}

              <p
                className="
                  mt-8
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-white/60
                "
              >
                Why we&apos;re building Trailbliz
              </p>

              {/* heading */}

              <h3
                className="
                  mt-3
                  max-w-xl
                  text-3xl
                  font-semibold
                  leading-[1.08]
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                College creates a lot of progress.
                <span className="mt-1 block text-white/75">
                  Career profiles often show very little of it.
                </span>
              </h3>

              {/* content */}

              <div
                className="
                  mt-6
                  max-w-2xl
                  space-y-4
                  text-sm
                  leading-7
                  text-white/75
                  sm:text-base
                "
              >
                <p>
                  Students build projects, learn new technologies,
                  improve their coding profiles, complete internships
                  and develop skills across several years.
                </p>

                <p>
                  Yet when it is time to apply for an opportunity,
                  much of that progress is scattered across resumes,
                  documents, websites and separate accounts.
                </p>

                <p>
                  Trailbliz is being built to connect those pieces
                  into one evolving career story.
                </p>
              </div>

              {/* flow chips */}

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {["Build", "Show", "Discover", "Move"].map(
                  (item) => (
                    <span
                      key={item}
                      className="
                        rounded-full
                        border
                        border-white/20
                        bg-white/10
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-white/90
                      "
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT — FOCUS AREAS
          =================================================== */}

          <div className="grid gap-4">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.title}
                  className="
                    group
                    relative
                    flex
                    items-center
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-gray-200
                    bg-white
                    p-5
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-[#1256af]/20
                    hover:shadow-[0_16px_40px_rgba(18,86,175,0.08)]

                    sm:p-6
                  "
                >
                  <div
                    className="
                      flex
                      w-full
                      items-start
                      gap-4
                    "
                  >
                    {/* icon */}

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#1256af]/[0.07]
                        text-[#1256af]
                        transition-all
                        duration-300

                        group-hover:bg-[#1256af]
                        group-hover:text-white
                      "
                    >
                      <Icon size={21} />
                    </div>

                    {/* content */}

                    <div className="min-w-0 flex-1">
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-3
                        "
                      >
                        <h4
                          className="
                            text-lg
                            font-semibold
                            tracking-tight
                            text-gray-900
                          "
                        >
                          {area.title}
                        </h4>

                        <span
                          className="
                            text-xs
                            font-bold
                            tracking-[0.1em]
                            text-gray-300
                          "
                        >
                          0{index + 1}
                        </span>
                      </div>

                      <p
                        className="
                          mt-2
                          text-sm
                          leading-6
                          text-gray-500
                        "
                      >
                        {area.description}
                      </p>

                      <div
                        className="
                          mt-4
                          h-[2px]
                          w-8
                          rounded-full
                          bg-[#1256af]/20
                          transition-all
                          duration-300

                          group-hover:w-14
                          group-hover:bg-[#1256af]
                        "
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            HOW WE BUILD
        ===================================================== */}

        <div className="mt-24">
          <div
            className="
              flex
              flex-col
              gap-5

              sm:flex-row
              sm:items-end
              sm:justify-between
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
                  bg-[#1256af]/5
                  px-3.5
                  py-1.5
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#1256af]
                  "
                />

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#1256af]
                  "
                >
                  How we build
                </p>
              </div>

              <h3
                className="
                  mt-4
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-gray-900
                  sm:text-4xl
                "
              >
                Principles behind{" "}
                <span className="text-[#1256af]">
                  the product.
                </span>
              </h3>
            </div>

            <p
              className="
                max-w-md
                text-sm
                leading-6
                text-gray-500
              "
            >
              The product decisions behind Trailbliz are guided by
              usefulness, simplicity and student progress.
            </p>
          </div>

          {/* principles */}

          <div
            className="
              mt-10
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-gray-200
                    bg-white
                    p-5
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-[#1256af]/20
                    hover:shadow-[0_16px_38px_rgba(18,86,175,0.07)]
                  "
                >
                  {/* number */}

                  <span
                    className="
                      absolute
                      right-5
                      top-5
                      text-xs
                      font-bold
                      tracking-[0.1em]
                      text-gray-300
                    "
                  >
                    0{index + 1}
                  </span>

                  {/* icon */}

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#1256af]/[0.07]
                      text-[#1256af]
                      transition-all
                      duration-300

                      group-hover:bg-[#1256af]
                      group-hover:text-white
                    "
                  >
                    <Icon size={20} />
                  </div>

                  <h4
                    className="
                      mt-5
                      text-lg
                      font-semibold
                      tracking-tight
                      text-gray-900
                    "
                  >
                    {principle.title}
                  </h4>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-gray-500
                    "
                  >
                    {principle.description}
                  </p>

                  <div
                    className="
                      mt-5
                      h-[2px]
                      w-8
                      rounded-full
                      bg-[#1256af]/20
                      transition-all
                      duration-300

                      group-hover:w-14
                      group-hover:bg-[#1256af]
                    "
                  />
                </article>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            CTA
        ===================================================== */}

        <div
          className="
            relative
            mt-20
            overflow-hidden
            rounded-[30px]
            border
            border-[#1256af]/10
            bg-white
            px-6
            py-8
            shadow-[0_14px_42px_rgba(18,86,175,0.06)]

            sm:px-8
            sm:py-9

            lg:px-10
          "
        >
          {/* subtle CTA background */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-[#1256af]/[0.04]
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-6

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div className="max-w-2xl">
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#1256af]
                "
              >
                Built to evolve
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-gray-900
                  sm:text-3xl
                "
              >
                Trailbliz grows as the{" "}
                <span className="text-[#1256af]">
                  student journey grows.
                </span>
              </h3>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-6
                  text-gray-500
                "
              >
                The platform is being built step by step around the
                features students need to build stronger career
                profiles and move toward better opportunities.
              </p>
            </div>

            <Link
              href="/register"
              className="
                group
                inline-flex
                min-h-[52px]
                shrink-0
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-[#1256af]
                bg-[#1256af]
                px-7
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-[0_10px_24px_rgba(18,86,175,0.16)]
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-white
                hover:text-[#1256af]
                hover:shadow-[0_14px_30px_rgba(18,86,175,0.13)]

                focus:outline-none
                focus:ring-2
                focus:ring-[#1256af]/25
              "
            >
              Join Trailbliz

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}