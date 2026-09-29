"use client";

import {
  BriefcaseBusiness,
  Search,
} from "lucide-react";

import type { Opportunity } from "@/types/opportunity";
import type { ApplicationResponse } from "@/types/application";

import OpportunityCard from "@/components/opportunities/OpportunityCard";

import {
  getOpportunityId,
} from "@/utils/opportunityUtils";

interface OpportunitiesListProps {
  opportunities: Opportunity[];
  applications: ApplicationResponse[];

  studentGraduationYear: number | null;

  onSelect: (
    opportunity: Opportunity
  ) => void;
}

export default function OpportunitiesList({
  opportunities,
  applications,
  studentGraduationYear,
  onSelect,
}: OpportunitiesListProps) {
  const findApplication = (
    opportunityId:
      | string
      | undefined
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

  if (opportunities.length === 0) {
    return (
      <section
        className="
          rounded-2xl
          border
          border-dashed
          border-slate-300
          bg-white
          px-6
          py-14
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-500
          "
        >
          <Search size={19} />
        </div>

        <h2
          className="
            mt-4
            text-lg
            font-bold
            text-slate-900
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
            text-slate-500
          "
        >
          Jobs and internships will appear here when
          new opportunities are published on Trailbliz.
        </p>
      </section>
    );
  }

  return (
    <section>
      {/* SECTION HEADER */}

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
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-[#1256AF]
            "
          >
            Available now
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-slate-950
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
              text-slate-500
            "
          >
            Browse available roles and open one to
            review its requirements and application
            details.
          </p>
        </div>

        <div
          className="
            inline-flex
            w-fit
            items-center
            gap-3
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3.5
            py-2.5
          "
        >
          <BriefcaseBusiness
            size={15}
            className="text-[#1256AF]"
          />

          <div>
            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.1em]
                text-slate-400
              "
            >
              Active
            </p>

            <p
              className="
                text-xs
                font-bold
                text-slate-700
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

      {/* CARD GALLERY */}

      <div
        className="
          mt-6
          grid
          gap-4

          md:grid-cols-2
        "
      >
        {opportunities.map(
          (opportunity, index) => {
            const opportunityId =
              getOpportunityId(
                opportunity
              );

            return (
              <OpportunityCard
                key={
                  opportunityId ||
                  String(index)
                }
                opportunity={
                  opportunity
                }
                application={
                  findApplication(
                    opportunityId
                  )
                }
                studentGraduationYear={
                  studentGraduationYear
                }
                onSelect={onSelect}
              />
            );
          }
        )}
      </div>
    </section>
  );
}