import type {
  ApplicationStatus,
} from "@/types/application";

export const applicationFlow:
  ApplicationStatus[] = [
    "APPLIED",
    "UNDER_REVIEW",
    "SHORTLISTED",
    "RESUME_REQUESTED",
    "RESUME_SUBMITTED",
    "FORWARDED_TO_EMPLOYER",
    "SELECTED",
  ];

export function formatApplicationStatus(
  status: ApplicationStatus
) {
  return status
    .split("_")
    .map(
      (word) =>
        word.charAt(0) +
        word
          .slice(1)
          .toLowerCase()
    )
    .join(" ");
}

export function formatApplicationDate(
  value: string
) {
  return new Date(
    value
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export function formatFileSize(
  bytes: number
) {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  }

  if (
    bytes <
    1024 * 1024
  ) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}