"use client";

import {
  LoaderCircle,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import OpportunitiesHeader from "@/components/opportunities/OpportunitiesHeader";
import OpportunitiesAccountSummary from "@/components/opportunities/OpportunitiesAccountSummary";
import OpportunitiesAlerts from "@/components/opportunities/OpportunitiesAlerts";
import OpportunitiesList from "@/components/opportunities/OpportunitiesList";
import OpportunityDetails from "@/components/opportunities/OpportunityDetails";

import {
  useOpportunities,
} from "@/hooks/useOpportunities";

import type {
  Opportunity,
} from "@/types/opportunity";

import {
  getOpportunityId,
} from "@/utils/opportunityUtils";

function OpportunitiesLoading() {
  return (
    <main
      className="
        flex
        min-h-[70vh]
        items-center
        justify-center
        bg-[#F7F9FC]
      "
    >
      <div className="text-center">
        <div
          className="
            mx-auto
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-[#1256AF]
            text-white
          "
        >
          <LoaderCircle
            size={20}
            className="animate-spin"
          />
        </div>

        <p
          role="status"
          className="
            mt-4
            text-sm
            font-semibold
            text-slate-800
          "
        >
          Loading opportunities
        </p>

        <p
          className="
            mt-1
            text-xs
            text-slate-500
          "
        >
          Checking available jobs and internships...
        </p>
      </div>
    </main>
  );
}

export default function OpportunitiesPage() {
  const opportunities =
    useOpportunities();

  const [
    selectedOpportunity,
    setSelectedOpportunity,
  ] =
    useState<Opportunity | null>(
      null
    );

  /*
   * If the opportunities refresh after an application,
   * keep the selected card synced with the latest
   * opportunity object.
   */
  useEffect(() => {
    if (!selectedOpportunity) {
      return;
    }

    const selectedId =
      getOpportunityId(
        selectedOpportunity
      );

    if (!selectedId) {
      return;
    }

    const updated =
      opportunities.opportunities.find(
        (opportunity) =>
          getOpportunityId(
            opportunity
          ) === selectedId
      );

    if (updated) {
      setSelectedOpportunity(
        updated
      );
    }
  }, [
    opportunities.opportunities,
    selectedOpportunity,
  ]);

  if (opportunities.loading) {
    return <OpportunitiesLoading />;
  }

  const membershipEligible =
    opportunities.membership?.active ===
      true ||
    opportunities.membership?.status ===
      "ACTIVE";

  const profilePercentage =
    opportunities.completion
      ?.percentage ?? 0;

  const selectedOpportunityId =
    selectedOpportunity
      ? getOpportunityId(
          selectedOpportunity
        )
      : undefined;

  const selectedApplication =
    selectedOpportunityId
      ? opportunities.applications.find(
          (application) =>
            application.opportunityId ===
            selectedOpportunityId
        ) || null
      : null;

  const handleSelect = (
    opportunity: Opportunity
  ) => {
    setSelectedOpportunity(
      opportunity
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBack = () => {
    setSelectedOpportunity(
      null
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#F7F9FC]
        text-slate-900
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          py-8

          sm:px-6
          sm:py-10

          lg:px-8
          lg:py-12
        "
      >
        {!selectedOpportunity && (
          <>
            <OpportunitiesHeader
              membership={
                opportunities.membership
              }
            />

            <div className="mt-6">
              <OpportunitiesAccountSummary
                membership={
                  opportunities.membership
                }
                completion={
                  opportunities.completion
                }
              />
            </div>
          </>
        )}

        {(opportunities.error ||
          opportunities.success) && (
          <div
            className={
              selectedOpportunity
                ? "mb-6"
                : "mt-6"
            }
          >
            <OpportunitiesAlerts
              error={
                opportunities.error
              }
              success={
                opportunities.success
              }
            />
          </div>
        )}

        <div
          className={
            selectedOpportunity
              ? ""
              : "mt-10"
          }
        >
          {selectedOpportunity ? (
            <OpportunityDetails
              opportunity={
                selectedOpportunity
              }
              application={
                selectedApplication
              }
              membershipEligible={
                membershipEligible
              }
              profilePercentage={
                profilePercentage
              }
              studentGraduationYear={
                opportunities.studentGraduationYear
              }
              applyingId={
                opportunities.applyingId
              }
              onApply={
                opportunities.handleApply
              }
              onBack={
                handleBack
              }
            />
          ) : (
            <OpportunitiesList
              opportunities={
                opportunities.opportunities
              }
              applications={
                opportunities.applications
              }
              studentGraduationYear={
                opportunities.studentGraduationYear
              }
              onSelect={
                handleSelect
              }
            />
          )}
        </div>
      </div>
    </main>
  );
}