import type {
  ApplicationStatus,
} from "@/types/application";

export const adminApplicationStatuses: ApplicationStatus[] = [
  "APPLIED",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "RESUME_REQUESTED",
  "RESUME_SUBMITTED",
  "FORWARDED_TO_EMPLOYER",
  "SELECTED",
  "REJECTED",
];

export function getAllowedNextStatuses(
  current: ApplicationStatus
): ApplicationStatus[] {
  switch (current) {
    case "APPLIED":
      return [
        "UNDER_REVIEW",
        "REJECTED",
      ];

    case "UNDER_REVIEW":
      return [
        "SHORTLISTED",
        "REJECTED",
      ];

    case "SHORTLISTED":
      return [
        "RESUME_REQUESTED",
        "REJECTED",
      ];

    case "RESUME_REQUESTED":
      return ["REJECTED"];

    case "RESUME_SUBMITTED":
      return [
        "FORWARDED_TO_EMPLOYER",
        "REJECTED",
      ];

    case "FORWARDED_TO_EMPLOYER":
      return [
        "SELECTED",
        "REJECTED",
      ];

    case "SELECTED":
    case "REJECTED":
      return [];

    default:
      return [];
  }
}

export function canDownloadResume(
  status: ApplicationStatus
) {
  return (
    status === "RESUME_SUBMITTED" ||
    status === "FORWARDED_TO_EMPLOYER" ||
    status === "SELECTED"
  );
}

export function getActionLabel(
  status: ApplicationStatus
) {
  switch (status) {
    case "UNDER_REVIEW":
      return "Start Review";

    case "SHORTLISTED":
      return "Shortlist";

    case "RESUME_REQUESTED":
      return "Request Resume";

    case "FORWARDED_TO_EMPLOYER":
      return "Forward to Employer";

    case "SELECTED":
      return "Mark Selected";

    case "REJECTED":
      return "Reject";

    default:
      return formatAdminApplicationStatus(
        status
      );
  }
}

export function getActionButtonClass(
  status: ApplicationStatus
) {
  if (status === "REJECTED") {
    return "rounded-lg border border-red-900 bg-red-950/30 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-950/60 disabled:opacity-50";
  }

  if (status === "SELECTED") {
    return "rounded-lg border border-emerald-800 bg-emerald-950/40 px-4 py-2.5 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-950/70 disabled:opacity-50";
  }

  return "rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50";
}

export function formatAdminApplicationStatus(
  status: ApplicationStatus
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

export function formatAdminApplicationDate(
  value: string
) {
  if (!value) {
    return "-";
  }

  return new Date(
    value
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}