import {
  BadgeCheck,
  CalendarDays,
  CircleAlert,
  Clock3,
  Sparkles,
} from "lucide-react";

import type {
  MembershipResponse,
} from "@/types/membership";

import {
  formatDate,
} from "@/utils/membershipFormatters";

interface CurrentMembershipCardProps {
  membership:
    MembershipResponse | null;
}

export default function CurrentMembershipCard({
  membership,
}: CurrentMembershipCardProps) {
  const isActive =
    membership?.active === true ||
    membership?.status === "ACTIVE";

  return (
    <section
      className="
        group
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_12px_36px_rgba(8,119,232,0.045)]
        transition-all
        duration-300

        hover:border-[#B8DCF3]
        hover:shadow-[0_18px_44px_rgba(8,119,232,0.075)]

        sm:p-7
      "
    >
      {/* TOP ACCENT */}

      <div
        className={`
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r

          ${
            isActive
              ? "from-emerald-500 via-[#0877E8] to-[#38BDF8]"
              : "from-[#87C6EE] via-[#0877E8] to-violet-500"
          }
        `}
      />

      {/* BACKGROUND GLOW */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          blur-[95px]

          ${
            isActive
              ? "bg-emerald-500/8"
              : "bg-[#0877E8]/7"
          }
        `}
      />

      <div className="relative">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4

            sm:flex-row
            sm:items-start
            sm:justify-between
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
              className={`
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl

                ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-[#EAF6FF] text-[#0877E8]"
                }
              `}
            >
              {isActive ? (
                <BadgeCheck
                  size={20}
                />
              ) : (
                <CircleAlert
                  size={20}
                />
              )}
            </div>

            <div>
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-[#0877E8]
                  "
                >
                  Current Membership
                </p>

                <Sparkles
                  size={12}
                  className="text-[#38A9EE]"
                />
              </div>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  tracking-[-0.035em]
                  text-[#173B63]
                "
              >
                Membership Status
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-6
                  text-[#71899D]
                "
              >
                Review your current Trailbliz membership
                access and validity period.
              </p>
            </div>
          </div>

          {/* STATUS */}

          <span
            className={`
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.1em]

              ${
                isActive
                  ? `
                    border-emerald-200
                    bg-emerald-50
                    text-emerald-700
                  `
                  : `
                    border-[#CBE5F8]
                    bg-[#EFF8FF]
                    text-[#0877E8]
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
                    ? "bg-emerald-500"
                    : "bg-[#38A9EE]"
                }
              `}
            />

            {isActive
              ? "Active"
              : "Inactive"}
          </span>
        </div>

        {/* ===================================================
            ACTIVE MEMBERSHIP
        =================================================== */}

        {isActive ? (
          <>
            <div
              className="
                mt-6
                grid
                gap-4

                sm:grid-cols-2
              "
            >
              <Detail
                icon={CalendarDays}
                label="Starts"
                value={
                  formatDate(
                    membership?.startsAt
                  )
                }
                iconClass="
                  bg-[#EAF6FF]
                  text-[#0877E8]
                "
              />

              <Detail
                icon={Clock3}
                label="Valid Until"
                value={
                  formatDate(
                    membership?.endsAt
                  )
                }
                iconClass="
                  bg-emerald-50
                  text-emerald-600
                "
              />
            </div>

            <div
              className="
                mt-6
                flex
                items-start
                gap-3
                rounded-[18px]
                border
                border-emerald-200
                bg-emerald-50/70
                px-4
                py-4
              "
            >
              <BadgeCheck
                size={17}
                className="
                  mt-0.5
                  shrink-0
                  text-emerald-600
                "
              />

              <div>
                <p
                  className="
                    text-sm
                    font-bold
                    text-emerald-800
                  "
                >
                  Membership access is active
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-6
                    text-emerald-700/80
                  "
                >
                  You can apply to eligible jobs and
                  internships available through Trailbliz.
                </p>
              </div>
            </div>
          </>
        ) : (
          /* =================================================
              INACTIVE MEMBERSHIP
          ================================================= */

          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-[18px]
              border
              border-[#CBE5F8]
              bg-[#F4FAFF]
              px-4
              py-4
            "
          >
            <CircleAlert
              size={17}
              className="
                mt-0.5
                shrink-0
                text-[#0877E8]
              "
            />

            <div>
              <p
                className="
                  text-sm
                  font-bold
                  text-[#355E7A]
                "
              >
                Membership is inactive
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-[#71899D]
                "
              >
                Activate your membership to start applying
                for eligible opportunities on Trailbliz.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
  iconClass,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
  iconClass: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-[18px]
        border
        border-[#DCEAF5]
        bg-[#F8FCFF]
        p-4
      "
    >
      <div
        className={`
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${iconClass}
        `}
      >
        <Icon size={16} />
      </div>

      <div>
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-[#879CAD]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            font-bold
            text-[#173B63]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}