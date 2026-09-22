import {
  BadgeCheck,
  CircleX,
  Clock3,
  FileCheck2,
  FileText,
  Send,
  UserCheck,
} from "lucide-react";

import type { AdminApplication } from "@/types/admin";

interface StatusBadgeProps {
  status: AdminApplication["status"];
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const config = getStatusConfig(status);

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-3
        py-1.5
        text-[10px]
        font-bold
        tracking-[0.02em]
        whitespace-nowrap
        ${config.style}
      `}
    >
      <Icon size={12} />

      {formatStatus(status)}
    </span>
  );
}

function getStatusConfig(
  status: AdminApplication["status"]
) {
  if (status === "SELECTED") {
    return {
      icon: BadgeCheck,
      style:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }

  if (status === "REJECTED") {
    return {
      icon: CircleX,
      style:
        "border-red-200 bg-red-50 text-red-600",
    };
  }

  if (status === "RESUME_REQUESTED") {
    return {
      icon: FileText,
      style:
        "border-amber-200 bg-amber-50 text-amber-700",
    };
  }

  if (status === "RESUME_SUBMITTED") {
    return {
      icon: FileCheck2,
      style:
        "border-blue-200 bg-blue-50 text-blue-700",
    };
  }

  if (
    status ===
    "FORWARDED_TO_EMPLOYER"
  ) {
    return {
      icon: Send,
      style:
        "border-violet-200 bg-violet-50 text-violet-700",
    };
  }

  if (status === "SHORTLISTED") {
    return {
      icon: UserCheck,
      style:
        "border-cyan-200 bg-cyan-50 text-cyan-700",
    };
  }

  if (status === "UNDER_REVIEW") {
    return {
      icon: Clock3,
      style:
        "border-[#BFDDF4] bg-[#EEF8FF] text-[#0877E8]",
    };
  }

  return {
    icon: FileText,
    style:
      "border-[#D8E8F4] bg-[#F7FBFF] text-[#607D94]",
  };
}

function formatStatus(
  status: string
) {
  return status
    .split("_")
    .map(
      (word) =>
        word.charAt(0) +
        word.slice(1).toLowerCase()
    )
    .join(" ");
}