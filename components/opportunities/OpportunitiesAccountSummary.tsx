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
    <section>
      <div
        className="
          mb-3
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-slate-400
            "
          >
            Application readiness
          </p>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Requirements checked before you apply.
          </p>
        </div>
      </div>

      <div
        className="
          grid
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white

          md:grid-cols-2
        "
      >
        <SummaryItem
          icon={
            membershipActive
              ? BadgeCheck
              : CircleAlert
          }
          label="Membership"
          title={
            membershipActive
              ? "Membership active"
              : "Membership required"
          }
          description={
            membershipActive
              ? "You can apply to opportunities you are eligible for."
              : "Activate your membership before submitting applications."
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
                mt-3
                inline-flex
                items-center
                gap-1.5
                text-xs
                font-bold
                text-[#1256AF]
              "
            >
              View Membership

              <ArrowRight
                size={13}
                className="
                  transition-transform
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          )}
        </SummaryItem>

        <SummaryItem
          icon={
            profileComplete
              ? BadgeCheck
              : UserRound
          }
          label="Profile"
          title={
            profileComplete
              ? "Profile complete"
              : `${profilePercentage}% complete`
          }
          description={
            profileComplete
              ? "Your profile is ready for eligibility checks."
              : "Complete your profile before applying to opportunities."
          }
          complete={
            profileComplete
          }
          bordered
        >
          <div
            className="
              mt-3
              h-1.5
              overflow-hidden
              rounded-full
              bg-slate-100
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
                    : "bg-[#1256AF]"
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
                mt-3
                inline-flex
                items-center
                gap-1.5
                text-xs
                font-bold
                text-[#1256AF]
              "
            >
              Complete Profile

              <ArrowRight
                size={13}
                className="
                  transition-transform
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          )}
        </SummaryItem>
      </div>
    </section>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  title,
  description,
  complete,
  bordered = false,
  children,
}: {
  icon: typeof BadgeCheck;
  label: string;
  title: string;
  description: string;
  complete: boolean;
  bordered?: boolean;
  children: ReactNode;
}) {
  return (
    <article
      className={`
        p-5

        sm:p-6

        ${
          bordered
            ? "border-t border-slate-200 md:border-l md:border-t-0"
            : ""
        }
      `}
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg

            ${
              complete
                ? "bg-emerald-50 text-emerald-600"
                : "bg-amber-50 text-amber-600"
            }
          `}
        >
          <Icon size={16} />
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              {label}
            </p>

            <span
              className={`
                rounded-full
                px-2
                py-0.5
                text-[8px]
                font-bold
                uppercase
                tracking-[0.08em]

                ${
                  complete
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }
              `}
            >
              {complete
                ? "Ready"
                : "Required"}
            </span>
          </div>

          <h3
            className="
              mt-1.5
              text-sm
              font-bold
              text-slate-900
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-slate-500
            "
          >
            {description}
          </p>

          {children}
        </div>
      </div>
    </article>
  );
}