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
    <section className="mt-8">
      <h2 className="mb-5 text-xl font-semibold">
        All Opportunities
      </h2>

      {opportunities.length ===
      0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
          No opportunities yet.
        </div>
      ) : (
        <div className="space-y-5">
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