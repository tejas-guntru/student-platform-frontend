"use client";

import {
  LoaderCircle,
} from "lucide-react";

import OpportunitiesHeader from "@/components/opportunities/OpportunitiesHeader";
import OpportunitiesAccountSummary from "@/components/opportunities/OpportunitiesAccountSummary";
import OpportunitiesAlerts from "@/components/opportunities/OpportunitiesAlerts";
import OpportunitiesList from "@/components/opportunities/OpportunitiesList";

import {
  useOpportunities,
} from "@/hooks/useOpportunities";

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

  if (opportunities.loading) {
    return <OpportunitiesLoading />;
  }

  const membershipEligible =
    opportunities.membership?.active === true ||
    opportunities.membership?.status === "ACTIVE";

  const profilePercentage =
    opportunities.completion?.percentage ?? 0;

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

        {(opportunities.error ||
          opportunities.success) && (
          <div className="mt-6">
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

        <div className="mt-10">
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
              opportunities.studentGraduationYear
            }
            applyingId={
              opportunities.applyingId
            }
            onApply={
              opportunities.handleApply
            }
          />
        </div>
      </div>
    </main>
  );
}