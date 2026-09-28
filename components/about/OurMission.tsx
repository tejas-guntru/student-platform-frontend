import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  Compass,
  FolderKanban,
  Route,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";

const principles = [
  {
    icon: Compass,
    number: "01",
    title: "Clarity",
    description:
      "Students should understand where they are, what they have built and what they should work on next.",
    points: [
      {
        title: "One connected profile",
        text: "Academics, skills and projects in one place.",
      },
      {
        title: "Visible progress",
        text: "See what is complete and what needs attention.",
      },
      {
        title: "Clear direction",
        text: "Move forward with less confusion.",
      },
    ],
  },
  {
    icon: BadgeCheck,
    number: "02",
    title: "Proof",
    description:
      "A career profile should show evidence of ability, not just a list of claims on a resume.",
    points: [
      {
        title: "Show your work",
        text: "Projects become visible proof of your skills.",
      },
      {
        title: "Build credibility",
        text: "Connect what you know with what you have done.",
      },
      {
        title: "Be opportunity-ready",
        text: "Keep your profile ready for what comes next.",
      },
    ],
  },
];

const actions = [
  {
    icon: UserRound,
    number: "01",
    title: "Build",
    description:
      "Create a student profile that grows with your academics, skills and career journey.",
  },
  {
    icon: FolderKanban,
    number: "02",
    title: "Show",
    description:
      "Turn projects and skills into visible proof of what you can actually do.",
  },
  {
    icon: Target,
    number: "03",
    title: "Discover",
    description:
      "Explore opportunities that align with your direction and growing profile.",
  },
  {
    icon: Route,
    number: "04",
    title: "Move",
    description:
      "Track your progress and keep taking the next meaningful step forward.",
  },
];

export default function OurMission() {
  return (
    <section
      id="how-trailbliz-works"
      className="
        relative
        isolate
        overflow-hidden
        bg-white
        py-20
        sm:py-24
        lg:py-28
      "
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
            -left-40
            top-32
            h-[360px]
            w-[360px]
            rounded-full
            bg-blue-50/70
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-32
            h-[400px]
            w-[400px]
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
            <Sparkles
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
              Our Mission
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
            Help students turn{" "}
            <span className="text-[#1256af]">
              progress into opportunity.
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
            Trailbliz is designed to make a student&apos;s journey
            easier to understand, easier to build and easier to present
            when the right opportunity appears.
          </p>
        </div>

        {/* =====================================================
            PRINCIPLES
        ===================================================== */}

        <div
          className="
            mt-14
            grid
            gap-5
            lg:mt-16
            lg:grid-cols-2
            lg:gap-6
          "
        >
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <article
                key={principle.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-gray-200
                  bg-[#FAFAFA]
                  p-6
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[#1256af]/20
                  hover:bg-white
                  hover:shadow-[0_20px_50px_rgba(18,86,175,0.08)]

                  sm:p-8
                  lg:p-9
                "
              >
                {/* top */}

                <div className="flex items-start justify-between gap-5">
                  <div
                    className="
                      flex
                      h-14
                      w-14
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
                    <Icon size={25} />
                  </div>

                  <span
                    className="
                      text-sm
                      font-bold
                      tracking-[0.12em]
                      text-[#1256af]/30
                    "
                  >
                    {principle.number}
                  </span>
                </div>

                {/* content */}

                <h3
                  className="
                    mt-7
                    text-3xl
                    font-semibold
                    tracking-tight
                    text-gray-900
                  "
                >
                  {principle.title}
                </h3>

                <p
                  className="
                    mt-3
                    max-w-xl
                    text-sm
                    leading-7
                    text-gray-600
                    sm:text-base
                  "
                >
                  {principle.description}
                </p>

                {/* points */}

                <div className="mt-7 space-y-3">
                  {principle.points.map((point) => (
                    <div
                      key={point.title}
                      className="
                        flex
                        items-start
                        gap-3
                        rounded-2xl
                        border
                        border-gray-200/80
                        bg-white
                        px-4
                        py-4
                      "
                    >
                      <div
                        className="
                          mt-0.5
                          flex
                          h-6
                          w-6
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#1256af]/[0.07]
                        "
                      >
                        <div
                          className="
                            h-2
                            w-2
                            rounded-full
                            bg-[#1256af]
                          "
                        />
                      </div>

                      <div>
                        <p
                          className="
                            text-sm
                            font-semibold
                            text-gray-800
                          "
                        >
                          {point.title}
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            leading-5
                            text-gray-500
                          "
                        >
                          {point.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* =====================================================
            MISSION IN ACTION
        ===================================================== */}

        <div className="mt-24">
          <div className="text-center">
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
                Mission in action
              </span>
            </div>

            <h3
              className="
                mt-6
                text-3xl
                font-semibold
                tracking-tight
                text-gray-900
                sm:text-4xl
                lg:text-5xl
              "
            >
              One journey.{" "}
              <span className="text-[#1256af]">
                Four connected steps.
              </span>
            </h3>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-base
                leading-7
                text-gray-600
              "
            >
              Trailbliz connects the pieces students normally manage
              separately into one continuous career journey.
            </p>
          </div>

          {/* ===================================================
              ACTION CARDS
          =================================================== */}

          <div
            className="
              relative
              mt-12
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {actions.map((action, index) => {
              const Icon = action.icon;

              return (
                <div
                  key={action.title}
                  className="relative"
                >
                  {/* desktop connector */}

                  {index < actions.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        left-[calc(100%-2px)]
                        top-[35px]
                        z-20
                        hidden
                        h-px
                        w-[20px]
                        bg-[#1256af]/15
                        lg:block
                      "
                    />
                  )}

                  <div
                    className="
                      group
                      relative
                      h-full
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
                    "
                  >
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
                      {action.number}
                    </span>

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
                        text-xl
                        font-semibold
                        tracking-tight
                        text-gray-900
                      "
                    >
                      {action.title}
                    </h4>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-gray-500
                      "
                    >
                      {action.description}
                    </p>

                    <div
                      className="
                        mt-6
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
              );
            })}
          </div>
        </div>

        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <div
          className="
            relative
            mt-20
            overflow-hidden
            rounded-[30px]
            bg-[#1256af]
            px-6
            py-8
            shadow-[0_22px_55px_rgba(18,86,175,0.16)]

            sm:px-9
            sm:py-10

            lg:px-12
          "
        >
          {/* subtle decoration */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-64
              w-64
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
              left-1/3
              h-56
              w-56
              rounded-full
              bg-blue-300/10
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-7

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div className="max-w-2xl">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-white/60
                "
              >
                Your trail starts here
              </p>

              <h3
                className="
                  mt-3
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-white

                  sm:text-3xl
                  lg:text-4xl
                "
              >
                Build a profile that grows as you do.
              </h3>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-6
                  text-white/75

                  sm:text-base
                "
              >
                Start with where you are today. Keep adding the work,
                skills and progress that move you forward.
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
                border-white
                bg-white
                px-7
                py-3.5
                text-sm
                font-bold
                text-[#1256af]
                shadow-lg
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-transparent
                hover:text-white
                hover:shadow-xl

                focus:outline-none
                focus:ring-2
                focus:ring-white/40
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