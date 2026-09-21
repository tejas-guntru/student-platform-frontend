"use client";

import Link from "next/link";

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
    <article className="rounded-[24px] border border-[#D8D5CC] bg-white p-6 shadow-[0_16px_45px_rgba(20,33,61,0.05)] transition-all hover:border-[#C9A227] sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* MAIN */}
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>
              {opportunity.opportunityType}
            </Badge>

            <Badge>
              {opportunity.workMode}
            </Badge>

            {opportunity.location && (
              <Badge>
                {opportunity.location}
              </Badge>
            )}

            {application && (
              <span className="rounded-full border border-[#C7D7EA] bg-[#F1F6FC] px-3 py-1 text-xs font-bold text-[#476486]">
                APPLIED
              </span>
            )}
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-[#14213D]">
            {opportunity.title}
          </h2>

          <p className="mt-1 text-lg font-semibold text-[#5F6470]">
            {opportunity.companyName}
          </p>

          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-[#5F6470]">
            {opportunity.description}
          </p>

          {opportunity.eligibility && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C9A227]">
                Company Eligibility
              </p>

              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#5F6470]">
                {opportunity.eligibility}
              </p>
            </div>
          )}
        </div>

        {/* SIDE */}
        <div>
          <div className="rounded-[18px] border border-[#E3DFD5] bg-[#F8F7F3] p-5">
            <OpportunityDetail
              label="Graduation Year"
              value={
                formatGraduationYears(
                  opportunity
                )
              }
            />

            <OpportunityDetail
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
              label="Deadline"
              value={
                formatOpportunityDate(
                  opportunity
                    .applicationDeadline
                )
              }
            />

            <OpportunityDetail
              label="Status"
              value={
                opportunity.status
              }
            />
          </div>

          <div className="mt-4 rounded-[18px] border border-[#E3DFD5] bg-[#F8F7F3] p-5">
            <p className="font-bold text-[#14213D]">
              Your Eligibility
            </p>

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

            {application ? (
              <div className="mt-6">
                <div className="rounded-xl border border-[#C7D7EA] bg-[#F1F6FC] p-3">
                  <p className="text-xs font-semibold text-[#476486]">
                    Application Status
                  </p>

                  <p className="mt-1 font-bold text-[#365777]">
                    {formatStatus(
                      application.status
                    )}
                  </p>
                </div>

                <Link
                  href="/applications"
                  className="mt-3 block w-full rounded-xl border border-[#C7D7EA] bg-white px-5 py-3 text-center font-bold text-[#476486] transition hover:bg-[#F1F6FC]"
                >
                  View Application
                </Link>
              </div>
            ) : canApply ? (
              <button
                type="button"
                disabled={
                  applying
                }
                onClick={() =>
                  onApply(
                    opportunity
                  )
                }
                className="mt-6 w-full rounded-xl bg-[#C9A227] px-5 py-3 font-bold text-[#14213D] transition hover:bg-[#E0C766] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {applying
                  ? "Applying..."
                  : "Apply Now"}
              </button>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Badge({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <span className="rounded-full border border-[#E3DFD5] bg-[#F8F7F3] px-3 py-1 text-xs font-semibold text-[#5F6470]">
      {children}
    </span>
  );
}

function OpportunityDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#858994]">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-[#14213D]">
        {value}
      </p>
    </div>
  );
}