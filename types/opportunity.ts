export type OpportunityType =
  | "INTERNSHIP"
  | "JOB";

export type WorkMode =
  | "ONSITE"
  | "REMOTE"
  | "HYBRID";

export type OpportunityStatus =
  | "DRAFT"
  | "ACTIVE"
  | "CLOSED";


export interface Opportunity {
  id?: string;
  opportunityId?: string;

  title: string;

  companyName: string;

  opportunityType: OpportunityType;

  workMode: WorkMode;

  location: string | null;

  description: string;

  eligibility: string | null;

  minGraduationYear: number | null;

  maxGraduationYear: number | null;

  applicationDeadline: string | null;

  status: OpportunityStatus;

  createdAt?: string | null;

  updatedAt?: string | null;
}


export interface CreateOpportunityRequest {
  title: string;

  companyName: string;

  opportunityType: OpportunityType;

  workMode: WorkMode;

  location: string | null;

  description: string;

  eligibility: string | null;

  minGraduationYear: number | null;

  maxGraduationYear: number | null;

  applicationDeadline: string | null;

  status: OpportunityStatus;
}


export interface UpdateOpportunityRequest {
  title: string;

  companyName: string;

  opportunityType: OpportunityType;

  workMode: WorkMode;

  location: string | null;

  description: string;

  eligibility: string | null;

  minGraduationYear: number | null;

  maxGraduationYear: number | null;

  applicationDeadline: string | null;

  status: OpportunityStatus;
}


export interface ApplicationResponse {
  applicationId: string;

  opportunityId: string;

  opportunityTitle: string;

  companyName: string;

  status: string;

  appliedAt: string;

  updatedAt: string;
}