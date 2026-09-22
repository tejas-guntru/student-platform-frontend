import Link from "next/link";

import type {
  ReactNode,
} from "react";

import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  UserRound,
} from "lucide-react";

import type {
  MembershipResponse,
} from "@/types/membership";

import type {
  ProfileCompletion,
} from "@/services/profileCompletionService";

interface OpportunitiesAccountSummaryProps {
  membership:
    MembershipResponse | null;

  completion:
    ProfileCompletion | null;
}

export default function OpportunitiesAccountSummary({
  membership,
  completion,
}: OpportunitiesAccountSummaryProps) {
  const membershipActive =
    membership?.active === true ||
    membership?.status === "ACTIVE";

  const profilePercentage =
    completion?.percentage ?? 0;

  const profileComplete =
    profilePercentage === 100;

  return (
    <section
      className="
        grid
        gap-4

        sm:grid-cols-2
      "
    >
      {/* =====================================================
          MEMBERSHIP
      ===================================================== */}

      <SummaryCard
        icon={
          membershipActive
            ? BadgeCheck
            : CircleAlert
        }
        label="Membership"
        title={
          membershipActive
            ? "Membership Active"
            : "Membership Required"
        }
        description={
          membershipActive
            ? "Your membership gives you access to eligible job and internship applications."
            : "Activate your membership before applying to available opportunities."
        }
        complete={
          membershipActive
        }
      >
        {!membershipActive && (
          <Link
            href="/membership"
            className="
              group
              mt-4
              inline-flex
              items-center
              gap-1.5
              text-sm
              font-bold
              text-[#0877E8]
              transition-colors

              hover:text-[#1294F2]
            "
          >
            Get Membership

            <ArrowRight
              size={14}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />
          </Link>
        )}
      </SummaryCard>

      {/* =====================================================
          PROFILE COMPLETION
      ===================================================== */}

      <SummaryCard
        icon={
          profileComplete
            ? BadgeCheck
            : UserRound
        }
        label="Profile"
        title={
          profileComplete
            ? "Profile Complete"
            : `${profilePercentage}% Complete`
        }
        description={
          profileComplete
            ? "Your profile is complete and ready for opportunity eligibility checks."
            : "Complete your profile so Trailbliz can evaluate your eligibility accurately."
        }
        complete={
          profileComplete
        }
      >
        {/* PROGRESS */}

        <div
          className="
            mt-4
            h-2
            overflow-hidden
            rounded-full
            bg-[#E7F1F8]
          "
        >
          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-500

              ${
                profileComplete
                  ? "bg-emerald-500"
                  : "bg-gradient-to-r from-[#0877E8] to-[#38BDF8]"
              }
            `}
            style={{
              width: `${Math.max(
                0,
                Math.min(
                  profilePercentage,
                  100
                )
              )}%`,
            }}
          />
        </div>

        {!profileComplete && (
          <Link
            href="/profile"
            className="
              group
              mt-4
              inline-flex
              items-center
              gap-1.5
              text-sm
              font-bold
              text-[#0877E8]
              transition-colors

              hover:text-[#1294F2]
            "
          >
            Complete Profile

            <ArrowRight
              size={14}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />
          </Link>
        )}
      </SummaryCard>
    </section>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  title,
  description,
  complete,
  children,
}: {
  icon: typeof BadgeCheck;
  label: string;
  title: string;
  description: string;
  complete: boolean;
  children:
    ReactNode;
}) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(8,119,232,0.04)]
        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-[#B8DCF3]
        hover:shadow-[0_16px_38px_rgba(8,119,232,0.075)]
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

          ${
            complete
              ? "bg-gradient-to-r from-emerald-500 to-[#38BDF8]"
              : "bg-gradient-to-r from-[#0877E8] to-violet-500"
          }
        `}
      />

      {/* GLOW */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          blur-[80px]

          ${
            complete
              ? "bg-emerald-500/7"
              : "bg-[#0877E8]/7"
          }
        `}
      />

      <div className="relative">
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
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl

              ${
                complete
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-[#EAF6FF] text-[#0877E8]"
              }
            `}
          >
            <Icon size={18} />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-[#879CAD]
              "
            >
              {label}
            </p>

            <div
              className="
                mt-1.5
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <h3
                className="
                  text-base
                  font-bold
                  text-[#173B63]
                "
              >
                {title}
              </h3>

              <span
                className={`
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  px-2
                  py-1
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.08em]

                  ${
                    complete
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
                      complete
                        ? "bg-emerald-500"
                        : "bg-[#38A9EE]"
                    }
                  `}
                />

                {complete
                  ? "Ready"
                  : "Action Needed"}
              </span>
            </div>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-[#71899D]
              "
            >
              {description}
            </p>
          </div>
        </div>

        {children}
      </div>
    </article>
  );
}