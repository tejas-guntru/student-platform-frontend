import type {
  Opportunity,
} from "@/types/opportunity";

export function getOpportunityId(
  opportunity: Opportunity
) {
  return (
    opportunity.id ||
    opportunity.opportunityId
  );
}

export function isGraduationYearEligible(
  opportunity: Opportunity,
  studentYear: number | null
) {
  const min =
    opportunity.minGraduationYear;

  const max =
    opportunity.maxGraduationYear;

  if (
    min == null &&
    max == null
  ) {
    return true;
  }

  if (
    studentYear == null
  ) {
    return false;
  }

  if (
    min != null &&
    studentYear < min
  ) {
    return false;
  }

  if (
    max != null &&
    studentYear > max
  ) {
    return false;
  }

  return true;
}

export function getGraduationEligibilityLabel(
  opportunity: Opportunity,
  studentYear: number | null
) {
  const eligible =
    isGraduationYearEligible(
      opportunity,
      studentYear
    );

  if (eligible) {
    return "Graduation year eligible";
  }

  if (
    studentYear == null
  ) {
    return "Graduation year not added";
  }

  return `Graduation year ${studentYear} not eligible`;
}

export function isDeadlineOpen(
  value:
    | string
    | null
) {
  if (!value) {
    return true;
  }

  const deadline =
    new Date(value);

  if (
    Number.isNaN(
      deadline.getTime()
    )
  ) {
    return false;
  }

  return (
    deadline.getTime() >
    Date.now()
  );
}

export function formatGraduationYears(
  opportunity: Opportunity
) {
  const min =
    opportunity.minGraduationYear;

  const max =
    opportunity.maxGraduationYear;

  if (
    min &&
    max &&
    min === max
  ) {
    return String(min);
  }

  if (
    min &&
    max
  ) {
    return `${min} - ${max}`;
  }

  if (min) {
    return `${min}+`;
  }

  if (max) {
    return `Up to ${max}`;
  }

  return "All years";
}

export function formatStatus(
  value: string
) {
  return value
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

export function formatOpportunityDate(
  value:
    | string
    | null
) {
  if (!value) {
    return "No deadline";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Invalid date";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}