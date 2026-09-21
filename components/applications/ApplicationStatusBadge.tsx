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
  let style =
    "border-[#D8D5CC] bg-[#F8F7F3] text-[#5F6470]";

  if (
    status === "SELECTED"
  ) {
    style =
      "border-[#BFD7C3] bg-[#F1F8F2] text-[#347A3A]";
  } else if (
    status ===
    "REJECTED"
  ) {
    style =
      "border-[#E4C7C7] bg-[#FBF1F1] text-[#A43F3F]";
  } else if (
    status ===
    "RESUME_REQUESTED"
  ) {
    style =
      "border-[#E8DCA9] bg-[#FBF7E8] text-[#806E30]";
  } else if (
    status ===
      "SHORTLISTED" ||
    status ===
      "RESUME_SUBMITTED" ||
    status ===
      "FORWARDED_TO_EMPLOYER"
  ) {
    style =
      "border-[#C7D7EA] bg-[#F1F6FC] text-[#476486]";
  }

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${style}`}
    >
      {formatApplicationStatus(
        status
      )}
    </span>
  );
}