import {
  BriefcaseBusiness,
  Inbox,
} from "lucide-react";

import type {
  Opportunity,
} from "@/types/opportunity";

import {
  getOpportunityId,
} from "@/utils/adminOpportunityUtils";

import OpportunityCard from "./OpportunityCard";

interface OpportunitiesListProps {
  opportunities: Opportunity[];

  closingId: string | null;

  onEdit: (
    opportunity: Opportunity
  ) => void;

  onClose: (
    opportunity: Opportunity
  ) => void;
}

export default function OpportunitiesList({
  opportunities,
  closingId,
  onEdit,
  onClose,
}: OpportunitiesListProps) {
  return (
    <section>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3

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
            <BriefcaseBusiness
              size={14}
              className="text-[#0877E8]"
            />

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-[#0877E8]
              "
            >
              Listings
            </p>
          </div>

          <h2
            className="
              mt-1.5
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-[#173B63]
            "
          >
            All Opportunities
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[#768D9F]
            "
          >
            Review and manage every job and internship
            currently stored in Trailbliz.
          </p>
        </div>

        {opportunities.length > 0 && (
          <div
            className="
              w-fit
              rounded-full
              border
              border-[#D9E9F5]
              bg-white
              px-3.5
              py-2
              text-xs
              font-semibold
              text-[#58778F]
              shadow-[0_5px_18px_rgba(8,119,232,0.04)]
            "
          >
            {opportunities.length}{" "}
            {opportunities.length === 1
              ? "listing"
              : "listings"}
          </div>
        )}
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {opportunities.length === 0 ? (
        <div
          className="
            mt-5
            flex
            flex-col
            items-center
            justify-center
            rounded-[26px]
            border
            border-dashed
            border-[#C9DFEF]
            bg-white/75
            px-6
            py-14
            text-center
            shadow-[0_8px_28px_rgba(8,119,232,0.035)]
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-[22px]
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <Inbox size={26} />
          </div>

          <h3
            className="
              mt-5
              text-lg
              font-bold
              text-[#173B63]
            "
          >
            No opportunities yet
          </h3>

          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-[#8196A8]
            "
          >
            Create your first job or internship and it
            will appear here for management.
          </p>

          <div
            className="
              mt-5
              rounded-full
              border
              border-[#D8E8F4]
              bg-[#F8FCFF]
              px-3.5
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-[#7891A4]
            "
          >
            Waiting for first listing
          </div>
        </div>
      ) : (
        /* ===================================================
            LIST
        =================================================== */

        <div
          className="
            mt-5
            space-y-4
          "
        >
          {opportunities.map(
            (
              opportunity,
              index
            ) => {
              const id =
                getOpportunityId(
                  opportunity
                );

              return (
                <OpportunityCard
                  key={
                    id ??
                    String(index)
                  }
                  opportunity={
                    opportunity
                  }
                  closingId={
                    closingId
                  }
                  onEdit={
                    onEdit
                  }
                  onClose={
                    onClose
                  }
                />
              );
            }
          )}
        </div>
      )}
    </section>
  );
}