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

  onApply: (
    opportunity: Opportunity
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
      opportunity.applicationDeadline
    );

  const opportunityActive =
    opportunity.status === "ACTIVE";

  const canApply =
    !application &&
    membershipEligible &&
    profileEligible &&
    graduationEligible &&
    deadlineOpen &&
    opportunityActive;

  const applying =
    opportunityId != null &&
    applyingId === opportunityId;

  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        transition
        duration-300

        hover:border-slate-300
        hover:shadow-[0_14px_38px_rgba(15,23,42,0.055)]
      "
    >
      <div
        className="
          grid

          lg:grid-cols-[minmax(0,1fr)_340px]
        "
      >
        {/* =========================================
            MAIN OPPORTUNITY INFORMATION
        ========================================= */}

        <div
          className="
            min-w-0
            p-5

            sm:p-6

            lg:p-7
          "
        >
          {/* BADGES */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <Badge>
              <BriefcaseBusiness
                size={11}
                className="text-[#1256AF]"
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
                  className="text-[#1256AF]"
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
                  bg-emerald-50
                  px-2.5
                  py-1.5
                  text-[9px]
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
                rounded-xl
                bg-[#1256AF]/[0.07]
                text-[#1256AF]

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
                  text-xl
                  font-bold
                  tracking-[-0.03em]
                  text-slate-950

                  sm:text-2xl
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
                    text-slate-400
                  "
                />

                <p
                  className="
                    break-words
                    text-sm
                    font-semibold
                    text-slate-600
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
              border-t
              border-slate-100
              pt-5
            "
          >
            <p
              className="
                mb-2
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-slate-400
              "
            >
              About the opportunity
            </p>

            <p
              className="
                whitespace-pre-line
                text-sm
                leading-7
                text-slate-600
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
                rounded-xl
                border
                border-slate-200
                bg-[#F8FAFC]
                p-4
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
                  className="text-[#1256AF]"
                />

                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.13em]
                    text-[#1256AF]
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
                  text-slate-600
                "
              >
                {opportunity.eligibility}
              </p>
            </div>
          )}
        </div>

        {/* =========================================
            APPLICATION PANEL
        ========================================= */}

        <aside
          className="
            border-t
            border-slate-200
            bg-[#FAFBFC]
            p-5

            sm:p-6

            lg:border-l
            lg:border-t-0
          "
        >
          {/* OPPORTUNITY DETAILS */}

          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-slate-400
              "
            >
              Opportunity details
            </p>

            <div
              className="
                mt-4
                grid
                gap-4
              "
            >
              <OpportunityDetail
                icon={
                  <GraduationCap
                    size={14}
                  />
                }
                label="Eligible graduation"
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
                label="Your graduation year"
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
                label="Application deadline"
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
                label="Opportunity status"
                value={
                  opportunity.status
                }
              />
            </div>
          </div>

          {/* READINESS */}

          <div
            className="
              mt-6
              border-t
              border-slate-200
              pt-5
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[#1256AF]
                "
              >
                Your eligibility
              </p>

              <h3
                className="
                  mt-1
                  text-sm
                  font-bold
                  text-slate-900
                "
              >
                Application readiness
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

            {/* EXISTING APPLICATION */}

            {application ? (
              <div className="mt-5">
                <div
                  className="
                    rounded-xl
                    border
                    border-emerald-200
                    bg-emerald-50/60
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <CheckCircle2
                      size={15}
                      className="text-emerald-600"
                    />

                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.11em]
                        text-emerald-700
                      "
                    >
                      Application submitted
                    </p>
                  </div>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-bold
                      text-emerald-800
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
                    min-h-[42px]
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-sm
                    font-semibold
                    text-slate-700
                    transition

                    hover:border-slate-300
                    hover:bg-slate-50
                    hover:text-slate-950
                  "
                >
                  View Application

                  <ArrowRight
                    size={14}
                    className="
                      transition-transform
                      group-hover:translate-x-0.5
                    "
                  />
                </Link>
              </div>
            ) : canApply ? (
              /* APPLY */

              <button
                type="button"
                disabled={applying}
                onClick={() =>
                  onApply(
                    opportunity
                  )
                }
                className="
                  mt-5
                  inline-flex
                  min-h-[44px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#1256AF]
                  px-5
                  text-sm
                  font-bold
                  text-white
                  transition

                  hover:bg-[#0E4C9D]

                  disabled:cursor-not-allowed
                  disabled:opacity-60
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
              /* BLOCKED */

              <div className="mt-5">
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
        border-slate-200
        bg-slate-50
        px-2.5
        py-1.5
        text-[9px]
        font-bold
        text-slate-600
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

  label:
    string;

  value:
    string;
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
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-slate-200
          bg-white
          text-[#1256AF]
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[8px]
            font-bold
            uppercase
            tracking-[0.1em]
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            break-words
            text-sm
            font-semibold
            text-slate-700
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}