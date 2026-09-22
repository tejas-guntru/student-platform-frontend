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
        className="
          pointer-events-none
          absolute
          -left-52
          bottom-20
          h-[440px]
          w-[440px]
          rounded-full
          bg-[#38BDF8]/10
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-52
          top-10
          h-[520px]
          w-[520px]
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
            "radial-gradient(rgba(8,119,232,0.16) 1px, transparent 1px)",
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

        <div className="mx-auto max-w-3xl text-center">
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
            <LayoutDashboard
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
              The platform
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
            Everything that matters.
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
              One student workspace.
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
            mt-16
            grid
            gap-8
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-stretch
          "
        >
          {/* ===================================================
              DASHBOARD MOCKUP
          =================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-[#CFE4F4]
              bg-[#F6FBFF]
              p-3
              shadow-[0_30px_80px_rgba(8,119,232,0.10)]

              sm:p-4
            "
          >
            {/* blue top glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-28
                h-72
                w-72
                rounded-full
                bg-[#38BDF8]/20
                blur-[80px]
              "
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-[26px]
                border
                border-[#DCEBF6]
                bg-white
              "
            >
              {/* =================================================
                  WINDOW HEADER
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#E3EEF6]
                  bg-[#FBFDFF]
                  px-5
                  py-4
                "
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#BFDDF1]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8FCDF3]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#1689F5]" />
                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-[#DCEBF6]
                    bg-white
                    px-3
                    py-1.5
                    text-[10px]
                    font-semibold
                    text-[#6A8399]
                  "
                >
                  Student workspace
                </div>
              </div>

              {/* =================================================
                  DASHBOARD
              ================================================= */}

              <div className="p-5 sm:p-6">
                {/* greeting */}

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
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-[#8AA0B4]
                      "
                    >
                      Dashboard
                    </p>

                    <h3
                      className="
                        mt-1
                        text-xl
                        font-bold
                        tracking-[-0.03em]
                        text-[#173B63]

                        sm:text-2xl
                      "
                    >
                      Your Trailbliz profile
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#758BA0]
                      "
                    >
                      Keep building your career story.
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      self-start
                      rounded-full
                      border
                      border-[#CDE6F7]
                      bg-[#EFF8FF]
                      px-3
                      py-2
                      text-xs
                      font-semibold
                      text-[#0877E8]
                    "
                  >
                    <BadgeCheck size={15} />
                    Profile active
                  </div>
                </div>

                {/* =================================================
                    PROFILE SUMMARY
                ================================================= */}

                <div
                  className="
                    mt-6
                    rounded-[22px]
                    bg-gradient-to-r
                    from-[#0877E8]
                    via-[#1294F2]
                    to-[#38BDF8]
                    p-5
                    text-white
                    shadow-[0_16px_36px_rgba(8,119,232,0.18)]
                  "
                >
                  <div
                    className="
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
                          font-bold
                          uppercase
                          tracking-[0.15em]
                          text-white/65
                        "
                      >
                        Your profile
                      </p>

                      <p
                        className="
                          mt-2
                          text-xl
                          font-bold
                          tracking-[-0.025em]
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
                        bg-white/15
                      "
                    >
                      <UserRound size={20} />
                    </div>
                  </div>

                  <div
                    className="
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
                            backdrop-blur
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

                {/* =================================================
                    DASHBOARD CARDS
                ================================================= */}

                <div
                  className="
                    mt-4
                    grid
                    gap-3
                    sm:grid-cols-2
                  "
                >
                  {/* projects */}

                  <div
                    className="
                      rounded-[20px]
                      border
                      border-[#E0EDF6]
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
                          bg-[#EAF6FF]
                          text-[#0877E8]
                        "
                      >
                        <FolderKanban size={17} />
                      </div>

                      <div>
                        <p
                          className="
                            text-sm
                            font-semibold
                            text-[#173B63]
                          "
                        >
                          Projects
                        </p>

                        <p
                          className="
                            text-[10px]
                            text-[#8297AA]
                          "
                        >
                          Show what you&apos;ve built
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div
                        className="
                          h-2
                          w-[82%]
                          rounded-full
                          bg-[#D9EBF8]
                        "
                      />

                      <div
                        className="
                          h-2
                          w-[58%]
                          rounded-full
                          bg-[#E7F2FA]
                        "
                      />

                      <div
                        className="
                          h-2
                          w-[70%]
                          rounded-full
                          bg-[#EEF6FB]
                        "
                      />
                    </div>
                  </div>

                  {/* opportunities */}

                  <div
                    className="
                      rounded-[20px]
                      border
                      border-[#E0EDF6]
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
                          bg-[#EAF6FF]
                          text-[#0877E8]
                        "
                      >
                        <BriefcaseBusiness size={17} />
                      </div>

                      <div>
                        <p
                          className="
                            text-sm
                            font-semibold
                            text-[#173B63]
                          "
                        >
                          Opportunities
                        </p>

                        <p
                          className="
                            text-[10px]
                            text-[#8297AA]
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
                        bg-[#F4FAFF]
                        px-3
                        py-2.5
                      "
                    >
                      <span
                        className="
                          text-[10px]
                          font-medium
                          text-[#617D95]
                        "
                      >
                        Internship
                      </span>

                      <ArrowRight
                        size={14}
                        className="text-[#0877E8]"
                      />
                    </div>
                  </div>

                  {/* coding */}

                  <div
                    className="
                      rounded-[20px]
                      border
                      border-[#E0EDF6]
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
                          bg-[#EAF6FF]
                          text-[#0877E8]
                        "
                      >
                        <Code2 size={17} />
                      </div>

                      <div>
                        <p
                          className="
                            text-sm
                            font-semibold
                            text-[#173B63]
                          "
                        >
                          Coding
                        </p>

                        <p
                          className="
                            text-[10px]
                            text-[#8297AA]
                          "
                        >
                          Connect your profiles
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                        mt-4
                        flex
                        gap-2
                      "
                    >
                      {["LC", "CF", "CC"].map(
                        (platform) => (
                          <span
                            key={platform}
                            className="
                              rounded-lg
                              border
                              border-[#D9EAF6]
                              bg-[#F7FBFF]
                              px-2.5
                              py-1.5
                              text-[9px]
                              font-bold
                              text-[#4F7899]
                            "
                          >
                            {platform}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* leaderboard */}

                  <div
                    className="
                      rounded-[20px]
                      border
                      border-[#E0EDF6]
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
                          bg-[#EAF6FF]
                          text-[#0877E8]
                        "
                      >
                        <Trophy size={17} />
                      </div>

                      <div>
                        <p
                          className="
                            text-sm
                            font-semibold
                            text-[#173B63]
                          "
                        >
                          Leaderboard
                        </p>

                        <p
                          className="
                            text-[10px]
                            text-[#8297AA]
                          "
                        >
                          See your progress
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >
                        {[1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="
                              h-7
                              w-7
                              rounded-full
                              border-2
                              border-white
                              bg-gradient-to-br
                              from-[#D9EEFB]
                              to-[#A9D9F6]
                            "
                          />
                        ))}

                        <div
                          className="
                            ml-1
                            h-2
                            w-16
                            rounded-full
                            bg-[#E5F1F9]
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              CONTENT
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
                border-[#CDE5F6]
                bg-[#F4FAFF]
                px-3.5
                py-1.5
              "
            >
              <ShieldCheck
                size={14}
                className="text-[#0877E8]"
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-[#5982A3]
                "
              >
                Built around the student
              </span>
            </div>

            <h3
              className="
                mt-6
                text-3xl
                font-bold
                leading-[1.05]
                tracking-[-0.045em]
                text-[#173B63]

                sm:text-4xl
                lg:text-5xl
              "
            >
              Your profile shouldn&apos;t
              live in six different places.
            </h3>

            <p
              className="
                mt-5
                text-base
                leading-7
                text-[#687F95]
              "
            >
              Trailbliz gives students a central place to build,
              organize and understand the information that matters
              throughout their career journey.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Keep your student information connected",
                "Build visible proof through projects and skills",
                "Connect coding progress with your profile",
                "Move from profile building to opportunities",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-[#E0EDF6]
                    bg-[#FAFDFF]
                    px-4
                    py-3.5
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
                      bg-[#E5F4FF]
                    "
                  >
                    <BadgeCheck
                      size={15}
                      className="text-[#0877E8]"
                    />
                  </div>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-[#526F87]
                    "
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="
                group
                mt-8
                inline-flex
                w-fit
                items-center
                gap-3
                rounded-2xl
                bg-[#0877E8]
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-[0_12px_28px_rgba(8,119,232,0.20)]
                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#076AD1]
                hover:shadow-[0_16px_34px_rgba(8,119,232,0.25)]
              "
            >
              Explore Trailbliz

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

        {/* =====================================================
            CAPABILITIES
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
                Connected capabilities
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
                Built around the whole journey.
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
            {capabilities.map((capability) => {
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
                    border-[#DDEBF5]
                    bg-white
                    p-5
                    shadow-[0_8px_28px_rgba(8,119,232,0.04)]
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-[#B3DAF3]
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
                      relative
                      mt-5
                      text-lg
                      font-bold
                      tracking-[-0.025em]
                      text-[#173B63]
                    "
                  >
                    {capability.title}
                  </h4>

                  <p
                    className="
                      relative
                      mt-2
                      text-sm
                      leading-6
                      text-[#71879A]
                    "
                  >
                    {capability.description}
                  </p>
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
            mt-20
            rounded-[30px]
            border
            border-[#D9EAF6]
            bg-[#F5FAFF]
            px-6
            py-9
            text-center

            sm:px-10
            sm:py-11
          "
        >
          <BarChart3
            size={25}
            className="
              mx-auto
              text-[#0877E8]
            "
          />

          <h3
            className="
              mt-4
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-[#173B63]

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
              text-[#6D8498]
            "
          >
            Your Trailbliz profile is designed to evolve throughout
            college — from your first skill and project to the
            opportunities you pursue next.
          </p>
        </div>
      </div>
    </section>
  );
}