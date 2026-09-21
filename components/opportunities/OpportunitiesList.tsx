"use client";

import type {
  Opportunity,
} from "@/types/opportunity";

import type {
  ApplicationResponse,
} from "@/types/application";

import OpportunityCard from "@/components/opportunities/OpportunityCard";

import {
  getOpportunityId,
} from "@/utils/opportunityUtils";

interface OpportunitiesListProps {
  opportunities:
    Opportunity[];

  applications:
    ApplicationResponse[];

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

export default function OpportunitiesList({
  opportunities,
  applications,

  membershipEligible,
  profilePercentage,
  studentGraduationYear,

  applyingId,
  onApply,
}: OpportunitiesListProps) {
  const findApplication = (
    opportunityId:
      string | undefined
  ) => {
    if (!opportunityId) {
      return null;
    }

    return (
      applications.find(
        (application) =>
          application.opportunityId ===
          opportunityId
      ) || null
    );
  };

  if (
    opportunities.length === 0
  ) {
    return (
      <section className="mt-8 rounded-[24px] border border-dashed border-[#D8D5CC] bg-white/70 p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F0CF] text-xl font-bold text-[#A98616]">
          +
        </div>

        <h2 className="mt-4 text-xl font-bold text-[#14213D]">
          No active opportunities
        </h2>

        <p className="mt-2 text-sm text-[#6B707B]">
          New opportunities will appear
          here when they are published.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 grid gap-6">
      {opportunities.map(
        (
          opportunity,
          index
        ) => {
          const opportunityId =
            getOpportunityId(
              opportunity
            );

          const key =
            opportunityId ||
            String(index);

          return (
            <OpportunityCard
              key={key}
              opportunity={
                opportunity
              }
              application={
                findApplication(
                  opportunityId
                )
              }
              membershipEligible={
                membershipEligible
              }
              profilePercentage={
                profilePercentage
              }
              studentGraduationYear={
                studentGraduationYear
              }
              applyingId={
                applyingId
              }
              onApply={
                onApply
              }
            />
          );
        }
      )}
    </section>
  );
}