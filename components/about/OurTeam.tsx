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
        bg-[#F5FAFF]
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
          top-12
          h-[480px]
          w-[480px]
          rounded-full
          bg-[#38BDF8]/13
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-56
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
          opacity-[0.2]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "52px 52px",
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
              bg-white/70
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <Users
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
              Behind Trailbliz
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
            Building for students,
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
              not around them.
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
            Trailbliz is being built around one idea: students should
            have a clearer way to understand, present and move forward
            with everything they build during college.
          </p>
        </div>

        {/* =====================================================
            MAIN TEAM STORY
        ===================================================== */}

        <div
          className="
            mt-16
            grid
            gap-8
            lg:grid-cols-[1.1fr_0.9fr]
            lg:items-stretch
          "
        >
          {/* ===================================================
              LEFT — STORY CARD
          =================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              bg-gradient-to-br
              from-[#0877E8]
              via-[#1294F2]
              to-[#38BDF8]
              p-7
              text-white
              shadow-[0_30px_70px_rgba(8,119,232,0.18)]

              sm:p-9
            "
          >
            {/* glows */}

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
                blur-[80px]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-28
                -left-20
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
                opacity-[0.16]
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
                backgroundSize: "42px 42px",
              }}
            />

            <div className="relative">
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
                  backdrop-blur-xl
                "
              >
                <Rocket size={25} />
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
                Why we&apos;re building Trailbliz
              </p>

              <h3
                className="
                  mt-3
                  max-w-xl
                  text-3xl
                  font-bold
                  leading-[1.05]
                  tracking-[-0.045em]

                  sm:text-4xl
                "
              >
                College creates a lot of progress.
                Career profiles often show very little of it.
              </h3>

              <div
                className="
                  mt-6
                  max-w-2xl
                  space-y-4
                  text-sm
                  leading-7
                  text-white/78

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

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {[
                  "Build",
                  "Show",
                  "Discover",
                  "Move",
                ].map((item) => (
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
                      backdrop-blur
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT — FOCUS AREAS
          =================================================== */}

          <div className="space-y-4">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.title}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[#DCEAF5]
                    bg-white
                    p-5
                    shadow-[0_10px_32px_rgba(8,119,232,0.045)]
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-[#B7DCF4]
                    hover:shadow-[0_18px_42px_rgba(8,119,232,0.09)]

                    sm:p-6
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-12
                      -top-12
                      h-32
                      w-32
                      rounded-full
                      bg-[#38BDF8]/0
                      blur-2xl
                      transition-all
                      duration-300

                      group-hover:bg-[#38BDF8]/10
                    "
                  />

                  <div
                    className="
                      relative
                      flex
                      items-start
                      gap-4
                    "
                  >
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#EAF6FF]
                        text-[#0877E8]
                        transition-all
                        duration-300

                        group-hover:bg-[#0877E8]
                        group-hover:text-white
                      "
                    >
                      <Icon size={21} />
                    </div>

                    <div className="flex-1">
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
                            font-bold
                            tracking-[-0.025em]
                            text-[#173B63]
                          "
                        >
                          {area.title}
                        </h4>

                        <span
                          className="
                            text-xs
                            font-bold
                            text-[#D1E5F3]
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
                          text-[#71879A]
                        "
                      >
                        {area.description}
                      </p>
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
              gap-4

              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.17em]
                  text-[#0877E8]
                "
              >
                How we build
              </p>

              <h3
                className="
                  mt-3
                  text-3xl
                  font-bold
                  tracking-[-0.04em]
                  text-[#173B63]

                  sm:text-4xl
                "
              >
                Principles behind the product.
              </h3>
            </div>

            <p
              className="
                max-w-md
                text-sm
                leading-6
                text-[#72889B]
              "
            >
              The product decisions behind Trailbliz are guided by
              usefulness, simplicity and student progress.
            </p>
          </div>

          <div
            className="
              mt-10
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <div
                  key={principle.title}
                  className="
                    group
                    rounded-[24px]
                    border
                    border-[#DCEAF5]
                    bg-white
                    p-5
                    shadow-[0_8px_28px_rgba(8,119,232,0.04)]
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-[#B4DAF3]
                    hover:shadow-[0_16px_38px_rgba(8,119,232,0.08)]
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#EAF6FF]
                      text-[#0877E8]
                      transition-all
                      duration-300

                      group-hover:bg-[#0877E8]
                      group-hover:text-white
                    "
                  >
                    <Icon size={20} />
                  </div>

                  <h4
                    className="
                      mt-5
                      text-lg
                      font-bold
                      tracking-[-0.025em]
                      text-[#173B63]
                    "
                  >
                    {principle.title}
                  </h4>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-[#72889B]
                    "
                  >
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            CTA
        ===================================================== */}

        <div
          className="
            mt-20
            overflow-hidden
            rounded-[30px]
            border
            border-[#D7E9F6]
            bg-white
            px-6
            py-8
            shadow-[0_14px_42px_rgba(8,119,232,0.055)]

            sm:px-8
            sm:py-9
          "
        >
          <div
            className="
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
                  font-bold
                  uppercase
                  tracking-[0.17em]
                  text-[#0877E8]
                "
              >
                Built to evolve
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-bold
                  tracking-[-0.035em]
                  text-[#173B63]

                  sm:text-3xl
                "
              >
                Trailbliz grows as the student journey grows.
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-[#6E8599]
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
                shrink-0
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-[#0877E8]
                to-[#25AEF5]
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-[0_12px_30px_rgba(8,119,232,0.20)]
                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:shadow-[0_16px_36px_rgba(8,119,232,0.26)]
              "
            >
              Join Trailbliz

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-200
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