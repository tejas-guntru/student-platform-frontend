"use client";

import Link from "next/link";

import type {
  ReactNode,
} from "react";

import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  LoaderCircle,
  MapPin,
} from "lucide-react";

import type {
  Opportunity,
} from "@/types/opportunity";

import type {
  ApplicationResponse,
} from "@/types/application";

import OpportunityEligibility from "@/components/opportunities/OpportunityEligibility";
import BlockedAction from "@/components/opportunities/BlockedAction";

import {
  formatGraduationYears,
  formatOpportunityDate,
  formatStatus,
  getOpportunityId,
  isDeadlineOpen,
  isGraduationYearEligible,
} from "@/utils/opportunityUtils";

interface OpportunityCardProps {
  opportunity:
    Opportunity;

  application:
    ApplicationResponse | null;

  membershipEligible:
    boolean;

  profilePercentage:
    number;

  studentGraduationYear:
    number | null;

  applyingId:
    string | null;

  onApply:
    (
      opportunity:
        Opportunity
    ) => void;
}

export default function OpportunityCard({
  opportunity,
  application,

  membershipEligible,
  profilePercentage,
  studentGraduationYear,

  applyingId,
  onApply,
}: OpportunityCardProps) {
  const opportunityId =
    getOpportunityId(
      opportunity
    );

  const profileEligible =
    profilePercentage === 100;

  const graduationEligible =
    isGraduationYearEligible(
      opportunity,
      studentGraduationYear
    );

  const deadlineOpen =
    isDeadlineOpen(
      opportunity
        .applicationDeadline
    );

  const opportunityActive =
    opportunity.status ===
    "ACTIVE";

  const canApply =
    !application &&
    membershipEligible &&
    profileEligible &&
    graduationEligible &&
    deadlineOpen &&
    opportunityActive;

  const applying =
    opportunityId != null &&
    applyingId ===
      opportunityId;

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_14px_40px_rgba(8,119,232,0.05)]
        transition-all
        duration-300

        hover:border-[#B8DCF3]
        hover:shadow-[0_20px_48px_rgba(8,119,232,0.085)]
      "
    >
      {/* =====================================================
          TOP ACCENT
      ===================================================== */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          from-[#0877E8]
          via-[#1294F2]
          to-[#38BDF8]
        "
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-28
          -top-28
          h-72
          w-72
          rounded-full
          bg-[#38BDF8]/0
          blur-[100px]
          transition-all
          duration-300

          group-hover:bg-[#38BDF8]/8
        "
      />

      <div
        className="
          relative
          p-5

          sm:p-7
        "
      >
        <div
          className="
            grid
            gap-8

            lg:grid-cols-[minmax(0,1fr)_360px]
          "
        >
          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="min-w-0">
            {/* BADGES */}

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              <Badge>
                <BriefcaseBusiness
                  size={11}
                  className="text-[#0877E8]"
                />

                {opportunity.opportunityType}
              </Badge>

              <Badge>
                {opportunity.workMode}
              </Badge>

              {opportunity.location && (
                <Badge>
                  <MapPin
                    size={11}
                    className="text-[#0877E8]"
                  />

                  {opportunity.location}
                </Badge>
              )}

              {application && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-emerald-200
                    bg-emerald-50
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-emerald-700
                  "
                >
                  <CheckCircle2
                    size={11}
                  />

                  Applied
                </span>
              )}
            </div>

            {/* TITLE */}

            <div
              className="
                mt-5
                flex
                items-start
                gap-4
              "
            >
              <div
                className="
                  hidden
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#EAF6FF]
                  text-[#0877E8]

                  sm:flex
                "
              >
                <BriefcaseBusiness
                  size={18}
                />
              </div>

              <div className="min-w-0">
                <h2
                  className="
                    break-words
                    text-2xl
                    font-bold
                    tracking-[-0.035em]
                    text-[#173B63]

                    sm:text-[26px]
                  "
                >
                  {opportunity.title}
                </h2>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Building2
                    size={14}
                    className="
                      shrink-0
                      text-[#8BB9D6]
                    "
                  />

                  <p
                    className="
                      break-words
                      text-base
                      font-semibold
                      text-[#527087]
                    "
                  >
                    {opportunity.companyName}
                  </p>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}

            <div
              className="
                mt-6
                rounded-[18px]
                border
                border-[#E3EDF5]
                bg-[#F8FCFF]
                px-4
                py-4
              "
            >
              <p
                className="
                  whitespace-pre-line
                  text-sm
                  leading-7
                  text-[#607C91]
                "
              >
                {opportunity.description}
              </p>
            </div>

            {/* COMPANY ELIGIBILITY */}

            {opportunity.eligibility && (
              <div
                className="
                  mt-6
                  rounded-[18px]
                  border
                  border-[#DCEAF5]
                  bg-white
                  px-4
                  py-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <GraduationCap
                    size={14}
                    className="text-[#0877E8]"
                  />

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.13em]
                      text-[#0877E8]
                    "
                  >
                    Company Eligibility
                  </p>
                </div>

                <p
                  className="
                    mt-2
                    whitespace-pre-line
                    text-sm
                    leading-6
                    text-[#607C91]
                  "
                >
                  {opportunity.eligibility}
                </p>
              </div>
            )}
          </div>

          {/* =================================================
              SIDE PANEL
          ================================================= */}

          <aside
            className="
              space-y-4
            "
          >
            {/* OPPORTUNITY DETAILS */}

            <div
              className="
                rounded-[20px]
                border
                border-[#DCEAF5]
                bg-[#F8FCFF]
                p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <BriefcaseBusiness
                  size={14}
                  className="text-[#0877E8]"
                />

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.13em]
                    text-[#0877E8]
                  "
                >
                  Opportunity Details
                </p>
              </div>

              <div
                className="
                  mt-4
                  space-y-4
                "
              >
                <OpportunityDetail
                  icon={
                    <GraduationCap
                      size={14}
                    />
                  }
                  label="Graduation Year"
                  value={
                    formatGraduationYears(
                      opportunity
                    )
                  }
                />

                <OpportunityDetail
                  icon={
                    <GraduationCap
                      size={14}
                    />
                  }
                  label="Your Graduation Year"
                  value={
                    studentGraduationYear
                      ? String(
                          studentGraduationYear
                        )
                      : "Not added"
                  }
                />

                <OpportunityDetail
                  icon={
                    <CalendarDays
                      size={14}
                    />
                  }
                  label="Deadline"
                  value={
                    formatOpportunityDate(
                      opportunity
                        .applicationDeadline
                    )
                  }
                />

                <OpportunityDetail
                  icon={
                    <BriefcaseBusiness
                      size={14}
                    />
                  }
                  label="Status"
                  value={
                    opportunity.status
                  }
                />
              </div>
            </div>

            {/* ELIGIBILITY */}

            <div
              className="
                rounded-[20px]
                border
                border-[#DCEAF5]
                bg-white
                p-5
                shadow-[0_8px_24px_rgba(8,119,232,0.035)]
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.13em]
                    text-[#0877E8]
                  "
                >
                  Your Eligibility
                </p>

                <h3
                  className="
                    mt-1
                    font-bold
                    text-[#173B63]
                  "
                >
                  Application Readiness
                </h3>
              </div>

              <div className="mt-4">
                <OpportunityEligibility
                  opportunity={
                    opportunity
                  }
                  application={
                    application
                  }
                  membershipEligible={
                    membershipEligible
                  }
                  profileEligible={
                    profileEligible
                  }
                  graduationEligible={
                    graduationEligible
                  }
                  deadlineOpen={
                    deadlineOpen
                  }
                  opportunityActive={
                    opportunityActive
                  }
                  profilePercentage={
                    profilePercentage
                  }
                  studentGraduationYear={
                    studentGraduationYear
                  }
                />
              </div>

              {/* =============================================
                  EXISTING APPLICATION
              ============================================= */}

              {application ? (
                <div className="mt-6">
                  <div
                    className="
                      rounded-[16px]
                      border
                      border-[#CBE5F8]
                      bg-[#EFF8FF]
                      p-4
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.11em]
                        text-[#71899D]
                      "
                    >
                      Application Status
                    </p>

                    <p
                      className="
                        mt-1.5
                        font-bold
                        text-[#0877E8]
                      "
                    >
                      {formatStatus(
                        application.status
                      )}
                    </p>
                  </div>

                  <Link
                    href="/applications"
                    className="
                      group
                      mt-3
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-[#CBE5F8]
                      bg-white
                      px-5
                      py-3
                      text-sm
                      font-bold
                      text-[#0877E8]
                      transition-all
                      duration-200

                      hover:border-[#9FD2F1]
                      hover:bg-[#F4FAFF]
                    "
                  >
                    View Application

                    <ArrowRight
                      size={14}
                      className="
                        transition-transform
                        duration-200
                        group-hover:translate-x-0.5
                      "
                    />
                  </Link>
                </div>
              ) : canApply ? (
                /* ===========================================
                    APPLY
                =========================================== */

                <button
                  type="button"
                  disabled={applying}
                  onClick={() =>
                    onApply(
                      opportunity
                    )
                  }
                  className="
                    mt-6
                    inline-flex
                    w-full
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
                    shadow-[0_9px_22px_rgba(8,119,232,0.2)]
                    transition-all
                    duration-200

                    hover:-translate-y-0.5
                    hover:shadow-[0_13px_28px_rgba(8,119,232,0.26)]

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    disabled:hover:translate-y-0
                  "
                >
                  {applying ? (
                    <>
                      <LoaderCircle
                        size={16}
                        className="animate-spin"
                      />

                      Applying...
                    </>
                  ) : (
                    <>
                      Apply Now

                      <ArrowRight
                        size={15}
                      />
                    </>
                  )}
                </button>
              ) : (
                /* ===========================================
                    BLOCKED
                =========================================== */

                <div className="mt-6">
                  <BlockedAction
                    membershipEligible={
                      membershipEligible
                    }
                    profileEligible={
                      profileEligible
                    }
                    graduationEligible={
                      graduationEligible
                    }
                    deadlineOpen={
                      deadlineOpen
                    }
                    opportunityActive={
                      opportunityActive
                    }
                  />
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

function Badge({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-[#D5E7F3]
        bg-[#F5FAFE]
        px-3
        py-1.5
        text-[10px]
        font-bold
        text-[#52748D]
      "
    >
      {children}
    </span>
  );
}

function OpportunityDetail({
  icon,
  label,
  value,
}: {
  icon:
    ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
      "
    >
      <div
        className="
          mt-0.5
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-[#EAF6FF]
          text-[#0877E8]
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.1em]
            text-[#879CAD]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            break-words
            text-sm
            font-bold
            text-[#355E7A]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}