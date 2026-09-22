import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Sparkles,
  UserRound,
} from "lucide-react";

import type {
  MembershipResponse,
} from "@/types/membership";

interface DashboardHeroProps {
  membership: MembershipResponse | null;

  formatDate: (
    value: string | null
  ) => string;
}

export default function DashboardHero({
  membership,
  formatDate,
}: DashboardHeroProps) {
  const isActive =
    membership?.active === true ||
    membership?.status === "ACTIVE";

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_20px_60px_rgba(8,119,232,0.08)]
      "
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-28
          -top-32
          h-[430px]
          w-[430px]
          rounded-full
          bg-[#38BDF8]/15
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-48
          left-[25%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#0877E8]/8
          blur-[130px]
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
          backgroundSize: "48px 48px",
        }}
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          grid
          gap-8
          p-6

          sm:p-8

          lg:grid-cols-[minmax(0,1fr)_360px]
          lg:items-stretch
          lg:p-10
        "
      >
        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <div
          className="
            flex
            flex-col
            justify-center
            py-2

            lg:py-4
          "
        >
          {/* LABEL */}

          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-[#CBE5F8]
              bg-[#EFF8FF]
              px-3.5
              py-2
            "
          >
            <Sparkles
              size={14}
              className="text-[#0877E8]"
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#0877E8]
              "
            >
              Your Trailbliz Workspace
            </span>
          </div>

          {/* HEADING */}

          <h1
            className="
              mt-6
              max-w-3xl
              text-[34px]
              font-bold
              leading-[1.08]
              tracking-[-0.05em]
              text-[#102F51]

              sm:text-[42px]

              lg:text-[48px]
            "
          >
            Your progress deserves
            <span
              className="
                relative
                ml-2
                inline-block
              "
            >
              <span
                className="
                  bg-gradient-to-r
                  from-[#0877E8]
                  to-[#38BDF8]
                  bg-clip-text
                  text-transparent
                "
              >
                to be seen.
              </span>

              <span
                className="
                  absolute
                  -bottom-1
                  left-0
                  h-[5px]
                  w-full
                  rounded-full
                  bg-[#38BDF8]/15
                "
              />
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-[#607890]

              sm:text-base
            "
          >
            Build a profile that shows what
            you&apos;ve learned, what you&apos;ve
            built and where you&apos;re heading —
            then use it to discover the right
            opportunities.
          </p>

          {/* =================================================
              QUICK VALUE POINTS
          ================================================= */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-2.5
            "
          >
            <FeaturePill>
              Build your profile
            </FeaturePill>

            <FeaturePill>
              Track your progress
            </FeaturePill>

            <FeaturePill>
              Find opportunities
            </FeaturePill>
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-3
            "
          >
            <Link
              href="/profile"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-[#0877E8]
                to-[#1294F2]
                px-5
                py-3
                text-sm
                font-bold
                text-white
                shadow-[0_12px_28px_rgba(8,119,232,0.20)]
                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:shadow-[0_16px_34px_rgba(8,119,232,0.28)]
              "
            >
              <UserRound size={16} />

              Complete Profile

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </Link>

            <Link
              href="/opportunities"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#CFE3F1]
                bg-white
                px-5
                py-3
                text-sm
                font-bold
                text-[#456982]
                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:border-[#AED7F0]
                hover:bg-[#F3FAFF]
                hover:text-[#0877E8]
              "
            >
              <BriefcaseBusiness
                size={16}
              />

              Explore Opportunities

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>

        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[26px]
            bg-gradient-to-br
            from-[#076FD6]
            via-[#0789EA]
            to-[#32B9FA]
            p-5
            text-white
            shadow-[0_18px_45px_rgba(8,119,232,0.20)]

            sm:p-6
          "
        >
          {/* GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-20
              h-52
              w-52
              rounded-full
              bg-white/20
              blur-[70px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -left-14
              h-48
              w-48
              rounded-full
              bg-[#D8F5FF]/20
              blur-[70px]
            "
          />

          {/* GRID */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.12]
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,0.25) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.25) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "34px 34px",
            }}
          />

          <div
            className="
              relative
              flex
              h-full
              flex-col
            "
          >
            {/* TOP */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-3
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
                  border
                  border-white/20
                  bg-white/15
                  backdrop-blur
                "
              >
                <BadgeCheck size={19} />
              </div>

              <div
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-3
                  py-1.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  backdrop-blur

                  ${
                    isActive
                      ? `
                        border-emerald-200/30
                        bg-emerald-300/15
                        text-white
                      `
                      : `
                        border-white/20
                        bg-white/10
                        text-white/70
                      `
                  }
                `}
              >
                <span
                  className={`
                    h-1.5
                    w-1.5
                    rounded-full

                    ${
                      isActive
                        ? "bg-emerald-300"
                        : "bg-white/50"
                    }
                  `}
                />

                {isActive
                  ? "Active"
                  : "Inactive"}
              </div>
            </div>

            {/* MEMBERSHIP */}

            <div className="mt-8">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white/55
                "
              >
                Trailbliz Membership
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  tracking-[-0.04em]
                "
              >
                {isActive
                  ? "You’re ready to explore."
                  : "Unlock more opportunities."}
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-white/70
                "
              >
                {isActive
                  ? membership?.endsAt
                    ? `Your membership is active until ${formatDate(
                        membership.endsAt
                      )}.`
                    : "Your membership is currently active."
                  : membership?.status ===
                      "EXPIRED"
                    ? "Your previous membership has expired. Renew it to continue accessing eligible paid opportunities."
                    : "Activate membership when you’re ready to access eligible paid opportunities."}
              </p>
            </div>

            {/* MEMBERSHIP DATE */}

            {isActive &&
              membership?.endsAt && (
                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-3
                    rounded-[18px]
                    border
                    border-white/15
                    bg-white/10
                    p-4
                    backdrop-blur
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/15
                    "
                  >
                    <CalendarDays
                      size={15}
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-white/50
                      "
                    >
                      Membership valid until
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-bold
                        text-white
                      "
                    >
                      {formatDate(
                        membership.endsAt
                      )}
                    </p>
                  </div>
                </div>
              )}

            {/* PUSH LINK TO BOTTOM */}

            <div className="mt-auto pt-7">
              <Link
                href="/membership"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-[16px]
                  border
                  border-white/20
                  bg-white/12
                  px-4
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  backdrop-blur
                  transition-all
                  duration-200

                  hover:bg-white/18
                "
              >
                <span>
                  {isActive
                    ? "Manage Membership"
                    : "View Membership"}
                </span>

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/15
                  "
                >
                  <ArrowRight
                    size={15}
                    className="
                      transition-transform
                      duration-200
                      group-hover:translate-x-0.5
                    "
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}

      <div
        className="
          relative
          grid
          border-t
          border-[#E5EFF7]
          bg-[#FAFDFF]

          sm:grid-cols-3
        "
      >
        <BottomItem
          number="01"
          title="Build"
          text="Create your student profile"
        />

        <BottomItem
          number="02"
          title="Show"
          text="Show skills, projects and progress"
        />

        <BottomItem
          number="03"
          title="Discover"
          text="Find opportunities that fit"
          last
        />
      </div>
    </section>
  );
}

// =========================================================
// FEATURE PILL
// =========================================================

function FeaturePill({
  children,
}: {
  children: string;
}) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-[#DCEAF5]
        bg-[#F8FCFF]
        px-3
        py-1.5
        text-[10px]
        font-semibold
        text-[#607B91]
      "
    >
      <CheckCircle2
        size={12}
        className="text-[#0877E8]"
      />

      {children}
    </span>
  );
}

// =========================================================
// BOTTOM ITEM
// =========================================================

function BottomItem({
  number,
  title,
  text,
  last = false,
}: {
  number: string;
  title: string;
  text: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-start
        gap-3
        px-5
        py-4

        sm:px-6

        ${
          last
            ? ""
            : `
              border-b
              border-[#E5EFF7]

              sm:border-b-0
              sm:border-r
            `
        }
      `}
    >
      <span
        className="
          mt-0.5
          text-[9px]
          font-bold
          tracking-[0.12em]
          text-[#38A9EE]
        "
      >
        {number}
      </span>

      <div>
        <p
          className="
            text-xs
            font-bold
            text-[#274E70]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-[10px]
            leading-4
            text-[#899EAF]
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}