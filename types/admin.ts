export interface AdminApplication {
  applicationId: string;

  studentId: string;

  studentName: string;

  studentEmail: string;

  collegeName: string | null;

  graduationYear: number | null;

  opportunityId: string;

  opportunityTitle: string;

  companyName: string;

  status:
    | "APPLIED"
    | "UNDER_REVIEW"
    | "SHORTLISTED"
    | "RESUME_REQUESTED"
    | "RESUME_SUBMITTED"
    | "FORWARDED_TO_EMPLOYER"
    | "SELECTED"
    | "REJECTED";

  appliedAt: string;

  updatedAt: string;
}