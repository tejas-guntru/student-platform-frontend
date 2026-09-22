"use client";

import {
  BriefcaseBusiness,
  Plus,
  Sparkles,
} from "lucide-react";

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
      <section
        className="
          relative
          overflow-hidden
          rounded-[26px]
          border
          border-dashed
          border-[#C8DEED]
          bg-white/80
          px-6
          py-14
          text-center
          shadow-[0_10px_30px_rgba(8,119,232,0.035)]
        "
      >
        {/* BACKGROUND GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-44
            w-44
            -translate-x-1/2
            rounded-full
            bg-[#38BDF8]/10
            blur-[70px]
          "
        />

        <div className="relative">
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <Plus size={22} />
          </div>

          <div
            className="
              mt-4
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#0877E8]
              "
            >
              Opportunities
            </p>

            <Sparkles
              size={12}
              className="text-[#38A9EE]"
            />
          </div>

          <h2
            className="
              mt-2
              text-xl
              font-bold
              tracking-[-0.03em]
              text-[#173B63]
            "
          >
            No active opportunities
          </h2>

          <p
            className="
              mx-auto
              mt-2
              max-w-md
              text-sm
              leading-6
              text-[#71899D]
            "
          >
            New jobs and internships will appear here when
            they are published on Trailbliz.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#0877E8]
              "
            >
              Available Now
            </p>

            <Sparkles
              size={12}
              className="text-[#38A9EE]"
            />
          </div>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-[#173B63]
            "
          >
            Explore Opportunities
          </h2>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-[#71899D]
            "
          >
            Review active jobs and internships, check your
            eligibility and apply directly from your
            Trailbliz workspace.
          </p>
        </div>

        {/* COUNT */}

        <div
          className="
            inline-flex
            w-fit
            items-center
            gap-3
            rounded-[16px]
            border
            border-[#D6E7F3]
            bg-white
            px-4
            py-3
            shadow-[0_8px_22px_rgba(8,119,232,0.04)]
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <BriefcaseBusiness
              size={16}
            />
          </div>

          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#8A9FAF]
              "
            >
              Active
            </p>

            <p
              className="
                mt-0.5
                text-sm
                font-bold
                text-[#173B63]
              "
            >
              {opportunities.length}{" "}
              {opportunities.length === 1
                ? "opportunity"
                : "opportunities"}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          OPPORTUNITY CARDS
      ===================================================== */}

      <div
        className="
          mt-5
          grid
          gap-5
        "
      >
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
      </div>
    </section>
  );
}