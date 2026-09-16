export type ApplicationStatus =
  | "APPLIED"
  | "UNDER_REVIEW"
  | "SHORTLISTED"
  | "RESUME_REQUESTED"
  | "RESUME_SUBMITTED"
  | "FORWARDED_TO_EMPLOYER"
  | "SELECTED"
  | "REJECTED";

export interface ApplicationResponse {
  applicationId: string;

  opportunityId: string;

  opportunityTitle: string;

  companyName: string;

  status: ApplicationStatus;

  appliedAt: string;

  updatedAt: string;
}

export interface ResumeResponse {
  resumeId: string;

  applicationId: string;

  originalFileName: string;

  contentType: string;

  fileSize: number;

  uploadedAt: string;
}