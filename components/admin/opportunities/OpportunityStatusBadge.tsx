import type {
  OpportunityStatus,
} from "@/types/opportunity";

interface OpportunityStatusBadgeProps {
  status: OpportunityStatus;
}

export default function OpportunityStatusBadge({
  status,
}: OpportunityStatusBadgeProps) {
  if (status === "ACTIVE") {
    return (
      <span className="rounded-full border border-emerald-900 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
        ACTIVE
      </span>
    );
  }

  if (status === "CLOSED") {
    return (
      <span className="rounded-full border border-red-900 bg-red-950/40 px-3 py-1 text-xs font-semibold text-red-400">
        CLOSED
      </span>
    );
  }

  return (
    <span className="rounded-full border border-amber-900 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-400">
      DRAFT
    </span>
  );
}