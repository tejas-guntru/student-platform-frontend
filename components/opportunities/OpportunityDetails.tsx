"use client";

import Link from "next/link";

import type { ReactNode } from "react";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  LoaderCircle,
  MapPin,
} from "lucide-react";

import type { Opportunity } from "@/types/opportunity";
import type { ApplicationResponse } from "@/types/application";

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

interface OpportunityDetailsProps {
  opportunity: Opportunity;
  application: ApplicationResponse | null;

  membershipEligible: boolean;
  profilePercentage: number;
  studentGraduationYear: number | null;

  applyingId: string | null;

  onApply: (opportunity: Opportunity) => void;
  onBack: () => void;
}

export default function OpportunityDetails({
  opportunity,
  application,

  membershipEligible,
  profilePercentage,
  studentGraduationYear,

  applyingId,

  onApply,
  onBack,
}: OpportunityDetailsProps) {
  const opportunityId =
    getOpportunityId(opportunity);

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
    <section>
      {/* BACK */}

      <button
        type="button"
        onClick={onBack}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-slate-500
          transition-colors

          hover:text-slate-950
        "
      >
        <ArrowLeft size={16} />

        Back to opportunities
      </button>

      {/* MAIN DETAIL CARD */}

      <article
        className="
          mt-5
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
        "
      >
        {/* HERO */}

        <div
          className="
            border-b
            border-slate-200
            px-5
            py-6

            sm:px-7
            sm:py-7
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5

              md:flex-row
              md:items-start
              md:justify-between
            "
          >
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
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
                    <CheckCircle2 size={11} />

                    Applied
                  </span>
                )}
              </div>

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
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#1256AF]/[0.07]
                    text-[#1256AF]

                    sm:flex
                  "
                >
                  <BriefcaseBusiness size={20} />
                </div>

                <div className="min-w-0">
                  <h1
                    className="
                      text-2xl
                      font-bold
                      tracking-[-0.04em]
                      text-slate-950

                      sm:text-3xl
                    "
                  >
                    {opportunity.title}
                  </h1>

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <Building2
                      size={15}
                      className="text-slate-400"
                    />

                    <p
                      className="
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
            </div>

            <div
              className="
                shrink-0
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
              "
            >
              <p
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-slate-400
                "
              >
                Status
              </p>

              <div
                className="
                  mt-1
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className={`
                    h-2
                    w-2
                    rounded-full
                    ${
                      opportunityActive
                        ? "bg-emerald-500"
                        : "bg-slate-400"
                    }
                  `}
                />

                <span
                  className="
                    text-sm
                    font-bold
                    text-slate-700
                  "
                >
                  {opportunity.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div
          className="
            grid

            lg:grid-cols-[minmax(0,1fr)_360px]
          "
        >
          {/* LEFT */}

          <div
            className="
              min-w-0
              p-5

              sm:p-7
            "
          >
            {/* QUICK INFORMATION */}

            <div
              className="
                grid
                gap-3

                sm:grid-cols-2
              "
            >
              <DetailCard
                icon={
                  <GraduationCap size={16} />
                }
                label="Eligible graduation"
                value={formatGraduationYears(
                  opportunity
                )}
              />

              <DetailCard
                icon={
                  <GraduationCap size={16} />
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

              <DetailCard
                icon={
                  <CalendarDays size={16} />
                }
                label="Application deadline"
                value={formatOpportunityDate(
                  opportunity.applicationDeadline
                )}
              />

              <DetailCard
                icon={
                  <BriefcaseBusiness size={16} />
                }
                label="Work mode"
                value={
                  opportunity.workMode
                }
              />
            </div>

            {/* ABOUT */}

            <ContentSection
              title="About the opportunity"
            >
              <p
                className="
                  whitespace-pre-line
                  text-sm
                  leading-7
                  text-slate-600
                "
              >
                {opportunity.description ||
                  "No additional description has been provided for this opportunity."}
              </p>
            </ContentSection>

            {/* ELIGIBILITY */}

            {opportunity.eligibility && (
              <ContentSection
                title="Company eligibility"
              >
                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
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
                      size={15}
                      className="text-[#1256AF]"
                    />

                    <p
                      className="
                        text-xs
                        font-bold
                        text-slate-800
                      "
                    >
                      Eligibility requirements
                    </p>
                  </div>

                  <p
                    className="
                      mt-3
                      whitespace-pre-line
                      text-sm
                      leading-7
                      text-slate-600
                    "
                  >
                    {opportunity.eligibility}
                  </p>
                </div>
              </ContentSection>
            )}
          </div>

          {/* RIGHT */}

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

            <h2
              className="
                mt-1
                text-lg
                font-bold
                tracking-[-0.025em]
                text-slate-950
              "
            >
              Application readiness
            </h2>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-slate-500
              "
            >
              Check the requirements before
              applying.
            </p>

            <div className="mt-5">
              <OpportunityEligibility
                opportunity={opportunity}
                application={application}
                membershipEligible={
                  membershipEligible
                }
                profileEligible={
                  profileEligible
                }
                graduationEligible={
                  graduationEligible
                }
                deadlineOpen={deadlineOpen}
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

            {/* APPLICATION */}

            {application ? (
              <div className="mt-5">
                <div
                  className="
                    rounded-xl
                    border
                    border-emerald-200
                    bg-emerald-50
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
                        tracking-[0.1em]
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
                    min-h-[44px]
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
              <button
                type="button"
                disabled={applying}
                onClick={() =>
                  onApply(opportunity)
                }
                className="
                  mt-5
                  inline-flex
                  min-h-[46px]
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
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            ) : (
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
          </aside>
        </div>
      </article>
    </section>
  );
}

function Badge({
  children,
}: {
  children: ReactNode;
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
        uppercase
        tracking-[0.06em]
        text-slate-600
      "
    >
      {children}
    </span>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
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
          rounded-lg
          bg-[#1256AF]/[0.07]
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

function ContentSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="
        mt-7
        border-t
        border-slate-100
        pt-6
      "
    >
      <h2
        className="
          text-base
          font-bold
          text-slate-900
        "
      >
        {title}
      </h2>

      <div className="mt-3">
        {children}
      </div>
    </section>
  );
}