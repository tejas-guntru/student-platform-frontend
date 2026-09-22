import type {
  Opportunity,
} from "@/types/opportunity";

import {
  formatOpportunityDate,
  formatOpportunityYears,
  getOpportunityId,
} from "@/utils/adminOpportunityUtils";

import OpportunityBadge from "./OpportunityBadge";
import OpportunityStatusBadge from "./OpportunityStatusBadge";

interface OpportunityCardProps {
  opportunity: Opportunity;
  closingId: string | null;

  onEdit: (
    opportunity: Opportunity
  ) => void;

  onClose: (
    opportunity: Opportunity
  ) => void;
}

export default function OpportunityCard({
  opportunity,
  closingId,
  onEdit,
  onClose,
}: OpportunityCardProps) {
  const id =
    getOpportunityId(
      opportunity
    );

  const closing =
    id !== null &&
    closingId === id;

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2">
            <OpportunityBadge>
              {
                opportunity.opportunityType
              }
            </OpportunityBadge>

            <OpportunityBadge>
              {opportunity.workMode}
            </OpportunityBadge>

            <OpportunityStatusBadge
              status={
                opportunity.status
              }
            />
          </div>

          <h3 className="mt-4 text-xl font-bold">
            {opportunity.title}
          </h3>

          <p className="mt-1 text-zinc-400">
            {
              opportunity.companyName
            }
          </p>

          <p className="mt-3 text-sm text-zinc-500">
            {opportunity.location ||
              "Location not specified"}
          </p>

          <p className="mt-5 whitespace-pre-line text-sm leading-6 text-zinc-400">
            {
              opportunity.description
            }
          </p>
        </div>

        <div className="w-full lg:max-w-xs">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-xs text-zinc-500">
              Graduation Years
            </p>

            <p className="mt-1 font-semibold">
              {formatOpportunityYears(
                opportunity
              )}
            </p>

            <p className="mt-4 text-xs text-zinc-500">
              Deadline
            </p>

            <p className="mt-1 text-sm font-medium">
              {formatOpportunityDate(
                opportunity.applicationDeadline
              )}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                onEdit(
                  opportunity
                )
              }
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold transition hover:bg-zinc-800"
            >
              Edit
            </button>

            <button
              type="button"
              disabled={
                opportunity.status ===
                  "CLOSED" ||
                closing
              }
              onClick={() =>
                onClose(
                  opportunity
                )
              }
              className="rounded-lg border border-red-900 bg-red-950/30 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-950/60 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {opportunity.status ===
              "CLOSED"
                ? "Closed"
                : closing
                  ? "Closing..."
                  : "Close"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}