import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

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
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          border
          border-emerald-200
          bg-emerald-50
          px-3
          py-1.5
          text-[10px]
          font-bold
          uppercase
          tracking-[0.08em]
          text-emerald-700
        "
      >
        <CheckCircle2 size={12} />

        Active
      </span>
    );
  }

  if (status === "CLOSED") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          border
          border-red-200
          bg-red-50
          px-3
          py-1.5
          text-[10px]
          font-bold
          uppercase
          tracking-[0.08em]
          text-red-600
        "
      >
        <XCircle size={12} />

        Closed
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-amber-200
        bg-amber-50
        px-3
        py-1.5
        text-[10px]
        font-bold
        uppercase
        tracking-[0.08em]
        text-amber-700
      "
    >
      <Clock3 size={12} />

      Draft
    </span>
  );
}