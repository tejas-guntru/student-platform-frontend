import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
} from "lucide-react";

const capabilities = [
  {
    icon: UserRound,
    title: "Student Profile",
    description:
      "Keep academics, college details, career preferences and personal information connected.",
  },
  {
    icon: FolderKanban,
    title: "Projects & Experience",
    description:
      "Show the work you have built and the experience you have gained along the way.",
  },
  {
    icon: Code2,
    title: "Coding Profiles",
    description:
      "Connect competitive programming profiles and bring coding progress into your career story.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Opportunities",
    description:
      "Explore internships and jobs while understanding how they connect with your profile.",
  },
  {
    icon: Trophy,
    title: "Leaderboard",
    description:
      "See your position across relevant student rankings as your verified profile grows.",
  },
  {
    icon: BadgeCheck,
    title: "Profile Readiness",
    description:
      "Understand which parts of your profile are complete and what still needs attention.",
  },
];

const profileFeatures = [
  "Keep your student information connected",
  "Build visible proof through projects and skills",
  "Connect coding progress with your profile",
  "Move from profile building to opportunities",
];

export default function TechnologyPlatform() {
  return (
    <section
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
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute
            -left-40
            bottom-20
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
            top-10
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
            <LayoutDashboard
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
              The Platform
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
            Everything that matters.{" "}
            <span className="text-[#1256af]">
              One student workspace.
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
            Trailbliz brings the different parts of a student&apos;s
            career journey together instead of leaving them scattered
            across different places.
          </p>
        </div>

        {/* =====================================================
            PRODUCT SHOWCASE
        ===================================================== */}

        <div
          className="
            mt-14
            grid
            gap-10
            lg:mt-16
            lg:grid-cols-[1.1fr_0.9fr]
            lg:items-center
            lg:gap-14
          "
        >
          {/* ===================================================
              DASHBOARD MOCKUP
          =================================================== */}

          <div className="relative">
            {/* background glow */}

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

            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-gray-200
                bg-[#FAFAFA]
                p-3
                shadow-[0_25px_65px_rgba(18,86,175,0.10)]
                sm:p-4
              "
            >
              <div
                className="
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-gray-200
                  bg-white
                "
              >
                {/* =============================================
                    WINDOW HEADER
                ============================================= */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-gray-200
                    bg-[#FAFAFA]
                    px-4
                    py-3.5
                    sm:px-5
                  "
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#1256af]" />
                  </div>

                  <div
                    className="
                      rounded-full
                      border
                      border-gray-200
                      bg-white
                      px-3
                      py-1.5
                      text-[10px]
                      font-semibold
                      text-gray-500
                    "
                  >
                    Student workspace
                  </div>
                </div>

                {/* =============================================
                    DASHBOARD BODY
                ============================================= */}

                <div className="p-4 sm:p-6">
                  {/* dashboard heading */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.14em]
                          text-gray-400
                        "
                      >
                        Dashboard
                      </p>

                      <h3
                        className="
                          mt-1
                          text-xl
                          font-semibold
                          tracking-tight
                          text-gray-900
                          sm:text-2xl
                        "
                      >
                        Your Trailbliz profile
                      </h3>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-gray-500
                        "
                      >
                        Keep building your career story.
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        w-fit
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-[#1256af]/15
                        bg-[#1256af]/5
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-[#1256af]
                      "
                    >
                      <BadgeCheck size={15} />
                      Profile active
                    </div>
                  </div>

                  {/* ===========================================
                      PROFILE SUMMARY
                  =========================================== */}

                  <div
                    className="
                      relative
                      mt-6
                      overflow-hidden
                      rounded-[22px]
                      bg-[#1256af]
                      p-5
                      text-white
                      shadow-[0_15px_35px_rgba(18,86,175,0.16)]
                    "
                  >
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -right-12
                        -top-16
                        h-44
                        w-44
                        rounded-full
                        bg-white/10
                        blur-3xl
                      "
                    />

                    <div
                      className="
                        relative
                        flex
                        items-start
                        justify-between
                        gap-5
                      "
                    >
                      <div>
                        <p
                          className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.14em]
                            text-white/60
                          "
                        >
                          Your profile
                        </p>

                        <p
                          className="
                            mt-2
                            text-xl
                            font-semibold
                            tracking-tight
                          "
                        >
                          Keep your journey moving.
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
                          border
                          border-white/20
                          bg-white/10
                        "
                      >
                        <UserRound size={20} />
                      </div>
                    </div>

                    <div
                      className="
                        relative
                        mt-5
                        grid
                        grid-cols-3
                        gap-2
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
                      ].map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.label}
                            className="
                              rounded-xl
                              border
                              border-white/15
                              bg-white/10
                              px-2
                              py-3
                              text-center
                            "
                          >
                            <Icon
                              size={16}
                              className="mx-auto"
                            />

                            <p
                              className="
                                mt-2
                                text-[10px]
                                font-medium
                                text-white/85
                              "
                            >
                              {item.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ===========================================
                      DASHBOARD CARDS
                  =========================================== */}

                  <div
                    className="
                      mt-4
                      grid
                      gap-3
                      sm:grid-cols-2
                    "
                  >
                    {/* PROJECTS */}

                    <div
                      className="
                        rounded-[18px]
                        border
                        border-gray-200
                        bg-white
                        p-4
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#1256af]/[0.07]
                            text-[#1256af]
                          "
                        >
                          <FolderKanban size={17} />
                        </div>

                        <div>
                          <p
                            className="
                              text-sm
                              font-semibold
                              text-gray-800
                            "
                          >
                            Projects
                          </p>

                          <p
                            className="
                              text-[10px]
                              text-gray-400
                            "
                          >
                            Show what you&apos;ve built
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="h-2 w-[82%] rounded-full bg-[#1256af]/15" />
                        <div className="h-2 w-[58%] rounded-full bg-gray-100" />
                        <div className="h-2 w-[70%] rounded-full bg-gray-100" />
                      </div>
                    </div>

                    {/* OPPORTUNITIES */}

                    <div
                      className="
                        rounded-[18px]
                        border
                        border-gray-200
                        bg-white
                        p-4
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#1256af]/[0.07]
                            text-[#1256af]
                          "
                        >
                          <BriefcaseBusiness size={17} />
                        </div>

                        <div>
                          <p
                            className="
                              text-sm
                              font-semibold
                              text-gray-800
                            "
                          >
                            Opportunities
                          </p>

                          <p
                            className="
                              text-[10px]
                              text-gray-400
                            "
                          >
                            Discover what&apos;s next
                          </p>
                        </div>
                      </div>

                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          bg-[#1256af]/[0.04]
                          px-3
                          py-2.5
                        "
                      >
                        <span
                          className="
                            text-[10px]
                            font-medium
                            text-gray-500
                          "
                        >
                          Internship
                        </span>

                        <ArrowRight
                          size={14}
                          className="text-[#1256af]"
                        />
                      </div>
                    </div>

                    {/* CODING */}

                    <div
                      className="
                        rounded-[18px]
                        border
                        border-gray-200
                        bg-white
                        p-4
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#1256af]/[0.07]
                            text-[#1256af]
                          "
                        >
                          <Code2 size={17} />
                        </div>

                        <div>
                          <p
                            className="
                              text-sm
                              font-semibold
                              text-gray-800
                            "
                          >
                            Coding
                          </p>

                          <p
                            className="
                              text-[10px]
                              text-gray-400
                            "
                          >
                            Connect your profiles
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        {["LC", "CF", "CC"].map(
                          (platform) => (
                            <span
                              key={platform}
                              className="
                                rounded-lg
                                border
                                border-gray-200
                                bg-[#FAFAFA]
                                px-2.5
                                py-1.5
                                text-[9px]
                                font-bold
                                text-gray-500
                              "
                            >
                              {platform}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* LEADERBOARD */}

                    <div
                      className="
                        rounded-[18px]
                        border
                        border-gray-200
                        bg-white
                        p-4
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#1256af]/[0.07]
                            text-[#1256af]
                          "
                        >
                          <Trophy size={17} />
                        </div>

                        <div>
                          <p
                            className="
                              text-sm
                              font-semibold
                              text-gray-800
                            "
                          >
                            Leaderboard
                          </p>

                          <p
                            className="
                              text-[10px]
                              text-gray-400
                            "
                          >
                            See your progress
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center gap-2">
                          {[1, 2, 3].map((item) => (
                            <div
                              key={item}
                              className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[#1256af]/10
                                bg-[#1256af]/[0.07]
                              "
                            >
                              <UserRound
                                size={11}
                                className="text-[#1256af]"
                              />
                            </div>
                          ))}

                          <div
                            className="
                              ml-1
                              h-2
                              w-16
                              rounded-full
                              bg-gray-100
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT CONTENT
          =================================================== */}

          <div
            className="
              flex
              flex-col
              justify-center
            "
          >
            <div
              className="
                inline-flex
                w-fit
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
              <ShieldCheck
                size={14}
                className="text-[#1256af]"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#1256af]
                "
              >
                Built around the student
              </span>
            </div>

            <h3
              className="
                mt-6
                text-3xl
                font-semibold
                leading-[1.08]
                tracking-tight
                text-gray-900
                sm:text-4xl
                lg:text-5xl
              "
            >
              Your profile shouldn&apos;t live in{" "}
              <span className="text-[#1256af]">
                six different places.
              </span>
            </h3>

            <p
              className="
                mt-5
                max-w-xl
                text-base
                leading-7
                text-gray-600
              "
            >
              Trailbliz gives students a central place to build,
              organize and understand the information that matters
              throughout their career journey.
            </p>

            {/* checklist */}

            <div className="mt-8 space-y-3">
              {profileFeatures.map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-gray-200
                    bg-[#FAFAFA]
                    px-4
                    py-3.5
                    transition-all
                    duration-300

                    hover:border-[#1256af]/15
                    hover:bg-white
                  "
                >
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#1256af]/[0.07]
                    "
                  >
                    <BadgeCheck
                      size={15}
                      className="text-[#1256af]"
                    />
                  </div>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-gray-600
                    "
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}

            <Link
              href="/register"
              className="
                group
                mt-8
                inline-flex
                min-h-[52px]
                w-fit
                items-center
                gap-3
                rounded-2xl
                border
                border-[#1256af]
                bg-white
                px-6
                py-3.5
                text-sm
                font-bold
                text-[#1256af]
                shadow-[0_10px_24px_rgba(18,86,175,0.08)]
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-[#1256af]
                hover:text-white
                hover:shadow-[0_14px_30px_rgba(18,86,175,0.16)]

                focus:outline-none
                focus:ring-2
                focus:ring-[#1256af]/25
              "
            >
              Explore Trailbliz

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

        {/* =====================================================
            CAPABILITIES
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
                  Connected capabilities
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
                Built around the{" "}
                <span className="text-[#1256af]">
                  whole journey.
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
              Every part of Trailbliz contributes to one evolving
              student profile instead of becoming another disconnected
              tool.
            </p>
          </div>

          <div
            className="
              mt-10
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;

              return (
                <article
                  key={capability.title}
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
                    hover:shadow-[0_16px_40px_rgba(18,86,175,0.08)]

                    sm:p-6
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
                    {capability.title}
                  </h4>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-gray-500
                    "
                  >
                    {capability.description}
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
            BOTTOM STATEMENT
        ===================================================== */}

        <div
          className="
            relative
            mt-20
            overflow-hidden
            rounded-[30px]
            bg-[#1256af]
            px-6
            py-10
            text-center
            shadow-[0_22px_55px_rgba(18,86,175,0.16)]
            sm:px-10
            sm:py-12
          "
        >
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
              -left-16
              h-64
              w-64
              rounded-full
              bg-blue-300/10
              blur-3xl
            "
          />

          <div className="relative">
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/20
                bg-white/10
                text-white
              "
            >
              <BarChart3 size={21} />
            </div>

            <p
              className="
                mt-6
                text-xs
                font-semibold
                uppercase
                tracking-[0.14em]
                text-white/60
              "
            >
              One profile. Continuous progress.
            </p>

            <h3
              className="
                mt-3
                text-2xl
                font-semibold
                tracking-tight
                text-white
                sm:text-3xl
              "
            >
              Build once. Keep growing.
            </h3>

            <p
              className="
                mx-auto
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-white/75
                sm:text-base
              "
            >
              Your Trailbliz profile is designed to evolve throughout
              college — from your first skill and project to the
              opportunities you pursue next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}