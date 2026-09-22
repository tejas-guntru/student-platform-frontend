import type {
  ElementType,
} from "react";

import {
  CheckCircle2,
  Clock3,
  FileText,
  Send,
  Sparkles,
  XCircle,
} from "lucide-react";

import type {
  ApplicationStatus,
} from "@/types/application";

import {
  formatApplicationStatus,
} from "@/utils/applicationUtils";

interface ApplicationStatusBadgeProps {
  status:
    ApplicationStatus;
}

export default function ApplicationStatusBadge({
  status,
}: ApplicationStatusBadgeProps) {
  const config =
    getStatusConfig(
      status
    );

  const Icon =
    config.icon;

  return (
    <span
      className={`
        inline-flex
        w-fit
        shrink-0
        items-center
        gap-1.5
        rounded-full
        border
        px-3
        py-1.5
        text-[9px]
        font-bold
        uppercase
        tracking-[0.08em]
        ${config.className}
      `}
    >
      <Icon
        size={12}
        strokeWidth={2.3}
      />

      {formatApplicationStatus(
        status
      )}
    </span>
  );
}

function getStatusConfig(
  status:
    ApplicationStatus
): {
  icon: ElementType;
  className: string;
} {
  if (
    status === "SELECTED"
  ) {
    return {
      icon: CheckCircle2,
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }

  if (
    status === "REJECTED"
  ) {
    return {
      icon: XCircle,
      className:
        "border-red-200 bg-red-50 text-red-600",
    };
  }

  if (
    status ===
    "RESUME_REQUESTED"
  ) {
    return {
      icon: FileText,
      className:
        "border-amber-200 bg-amber-50 text-amber-700",
    };
  }

  if (
    status ===
    "RESUME_SUBMITTED"
  ) {
    return {
      icon: CheckCircle2,
      className:
        "border-cyan-200 bg-cyan-50 text-cyan-700",
    };
  }

  if (
    status ===
    "FORWARDED_TO_EMPLOYER"
  ) {
    return {
      icon: Send,
      className:
        "border-violet-200 bg-violet-50 text-violet-700",
    };
  }

  if (
    status === "SHORTLISTED"
  ) {
    return {
      icon: Sparkles,
      className:
        "border-[#B9DCF2] bg-[#EFF8FF] text-[#0877E8]",
    };
  }

  return {
    icon: Clock3,
    className:
      "border-[#D5E7F3] bg-[#F8FCFF] text-[#58748B]",
  };
}