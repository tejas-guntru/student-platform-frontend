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
    title: "Build",
    description:
      "Create a student profile that grows with your academics, skills and career journey.",
  },
  {
    icon: FolderKanban,
    title: "Show",
    description:
      "Turn projects and skills into visible proof of what you can actually do.",
  },
  {
    icon: Target,
    title: "Discover",
    description:
      "Explore opportunities that align with your direction and growing profile.",
  },
  {
    icon: Route,
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
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-52
          top-24
          h-[430px]
          w-[430px]
          rounded-full
          bg-[#38BDF8]/10
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-52
          bottom-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#0877E8]/10
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.18]
        "
        style={{
          backgroundImage:
            "radial-gradient(rgba(8,119,232,0.18) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
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

        <div
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#CBE5F8]
              bg-[#EFF8FF]
              px-4
              py-2
            "
          >
            <Sparkles
              size={14}
              className="text-[#0877E8]"
            />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-[#4C7DA7]
              "
            >
              Our mission
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
            Help students turn
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
              progress into opportunity.
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
            Trailbliz is designed to make a student&apos;s journey easier
            to understand, easier to build and easier to present when the
            right opportunity appears.
          </p>
        </div>

        {/* =====================================================
            PRINCIPLES
        ===================================================== */}

        <div
          className="
            relative
            mt-16
            grid
            gap-6
            lg:grid-cols-2
            lg:gap-8
          "
        >
          {/* center divider */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-10
              left-1/2
              top-10
              hidden
              w-px
              -translate-x-1/2
              bg-gradient-to-b
              from-transparent
              via-[#D7E9F6]
              to-transparent

              lg:block
            "
          />

          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <article
                key={principle.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-[#DCEAF5]
                  bg-[#F9FCFF]
                  p-6
                  shadow-[0_12px_40px_rgba(8,119,232,0.05)]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[#B9DCF4]
                  hover:shadow-[0_22px_55px_rgba(8,119,232,0.09)]

                  sm:p-8
                "
              >
                {/* decorative glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-52
                    w-52
                    rounded-full
                    bg-[#38BDF8]/10
                    blur-3xl
                  "
                />

                {/* top */}

                <div
                  className="
                    relative
                    flex
                    items-start
                    justify-between
                    gap-5
                  "
                >
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-[#0877E8]
                      to-[#38BDF8]
                      text-white
                      shadow-[0_12px_28px_rgba(8,119,232,0.20)]
                    "
                  >
                    <Icon size={25} />
                  </div>

                  <span
                    className="
                      text-5xl
                      font-bold
                      tracking-[-0.06em]
                      text-[#DCECF7]
                    "
                  >
                    {principle.number}
                  </span>
                </div>

                <h3
                  className="
                    relative
                    mt-7
                    text-3xl
                    font-bold
                    tracking-[-0.04em]
                    text-[#173B63]
                  "
                >
                  {principle.title}
                </h3>

                <p
                  className="
                    relative
                    mt-4
                    max-w-xl
                    text-sm
                    leading-7
                    text-[#647E95]

                    sm:text-base
                  "
                >
                  {principle.description}
                </p>

                {/* points */}

                <div className="relative mt-7 space-y-3">
                  {principle.points.map((point) => (
                    <div
                      key={point.title}
                      className="
                        flex
                        items-start
                        gap-3
                        rounded-2xl
                        border
                        border-[#E2EDF6]
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
                          bg-[#E7F5FF]
                        "
                      >
                        <div
                          className="
                            h-2
                            w-2
                            rounded-full
                            bg-[#0877E8]
                          "
                        />
                      </div>

                      <div>
                        <p
                          className="
                            text-sm
                            font-semibold
                            text-[#173B63]
                          "
                        >
                          {point.title}
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            leading-5
                            text-[#7890A5]
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
            VALUES IN ACTION
        ===================================================== */}

        <div className="mt-24">
          <div className="text-center">
            <div
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[#D5E8F6]
                bg-white
                px-5
                py-2.5
                shadow-[0_8px_24px_rgba(8,119,232,0.05)]
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#0877E8]
                "
              />

              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#607F9A]
                "
              >
                Mission in action
              </span>

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#38BDF8]
                "
              />
            </div>

            <h3
              className="
                mt-6
                text-3xl
                font-bold
                tracking-[-0.04em]
                text-[#173B63]

                sm:text-4xl
              "
            >
              One journey.
              <span className="text-[#0877E8]">
                {" "}
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
                text-[#687F95]
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
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[#DDEBF5]
                    bg-white
                    p-5
                    shadow-[0_8px_30px_rgba(8,119,232,0.045)]
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-[#B5DAF3]
                    hover:shadow-[0_16px_38px_rgba(8,119,232,0.09)]
                  "
                >
                  <div
                    className="
                      absolute
                      right-4
                      top-4
                      text-xs
                      font-bold
                      text-[#D0E5F4]
                    "
                  >
                    0{index + 1}
                  </div>

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
                      transition-colors
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
                      text-xl
                      font-bold
                      tracking-[-0.025em]
                      text-[#173B63]
                    "
                  >
                    {action.title}
                  </h4>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-[#70879C]
                    "
                  >
                    {action.description}
                  </p>
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
            bg-gradient-to-r
            from-[#0877E8]
            via-[#1294F2]
            to-[#38BDF8]
            px-6
            py-8
            shadow-[0_24px_60px_rgba(8,119,232,0.18)]

            sm:px-9
            sm:py-10
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-24
              h-64
              w-64
              rounded-full
              bg-white/15
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              left-1/3
              h-56
              w-56
              rounded-full
              bg-[#BDEBFF]/20
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
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.17em]
                  text-white/65
                "
              >
                Your trail starts here
              </p>

              <h3
                className="
                  mt-3
                  text-2xl
                  font-bold
                  tracking-[-0.035em]
                  text-white

                  sm:text-3xl
                "
              >
                Build a profile that grows as you do.
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-white/75
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
                shrink-0
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-white
                px-6
                py-3.5
                text-sm
                font-semibold
                text-[#0877E8]
                shadow-[0_10px_30px_rgba(0,67,145,0.16)]
                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:shadow-[0_14px_36px_rgba(0,67,145,0.22)]
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