import type {
  Opportunity,
  OpportunityStatus,
  OpportunityType,
  WorkMode,
} from "@/types/opportunity";

export interface OpportunityFormData {
  title: string;
  companyName: string;
  opportunityType: OpportunityType;
  workMode: WorkMode;
  location: string;
  description: string;
  eligibility: string;
  minGraduationYear: string;
  maxGraduationYear: string;
  deadline: string;
  status: OpportunityStatus;
}

export const initialOpportunityFormData: OpportunityFormData = {
  title: "",
  companyName: "",
  opportunityType: "INTERNSHIP",
  workMode: "HYBRID",
  location: "",
  description: "",
  eligibility: "",
  minGraduationYear: "",
  maxGraduationYear: "",
  deadline: "",
  status: "ACTIVE",
};

export function getOpportunityId(
  opportunity: Opportunity
) {
  return (
    opportunity.id ||
    opportunity.opportunityId ||
    null
  );
}

export function toDateTimeLocal(
  value: string | null
) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset =
    date.getTimezoneOffset();

  const localDate = new Date(
    date.getTime() -
      offset * 60 * 1000
  );

  return localDate
    .toISOString()
    .slice(0, 16);
}

export function formatOpportunityYears(
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

  if (min && max) {
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

export function formatOpportunityDate(
  value: string | null
) {
  if (!value) {
    return "No deadline";
  }

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