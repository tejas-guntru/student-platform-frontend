"use client";

import OpportunitiesHeader from "@/components/opportunities/OpportunitiesHeader";
import OpportunitiesAccountSummary from "@/components/opportunities/OpportunitiesAccountSummary";
import OpportunitiesAlerts from "@/components/opportunities/OpportunitiesAlerts";
import OpportunitiesList from "@/components/opportunities/OpportunitiesList";

import {
  useOpportunities,
} from "@/hooks/useOpportunities";

export default function OpportunitiesPage() {
  const opportunities =
    useOpportunities();

  if (
    opportunities.loading
  ) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F3] text-[#14213D]">
        <div className="flex flex-col items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#E3E1DA] border-t-[#C9A227]" />

          <p className="mt-4 text-sm font-medium text-[#6B707B]">
            Loading opportunities...
          </p>
        </div>
      </main>
    );
  }

  const membershipEligible =
    opportunities.membership
      ?.active === true ||
    opportunities.membership
      ?.status === "ACTIVE";

  const profilePercentage =
    opportunities.completion
      ?.percentage ?? 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7F3] text-[#14213D]">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 sm:py-10 lg:py-12">
        <OpportunitiesHeader
          membership={
            opportunities.membership
          }
        />

        <OpportunitiesAccountSummary
          membership={
            opportunities.membership
          }
          completion={
            opportunities.completion
          }
        />

        <OpportunitiesAlerts
          error={
            opportunities.error
          }
          success={
            opportunities.success
          }
        />

        <OpportunitiesList
          opportunities={
            opportunities.opportunities
          }
          applications={
            opportunities.applications
          }
          membershipEligible={
            membershipEligible
          }
          profilePercentage={
            profilePercentage
          }
          studentGraduationYear={
            opportunities
              .studentGraduationYear
          }
          applyingId={
            opportunities.applyingId
          }
          onApply={
            opportunities.handleApply
          }
        />

      </div>
    </main>
  );
}