export type EmploymentType =
  | "INTERNSHIP"
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "FREELANCE";


export interface StudentExperience {

  experienceId: string;

  companyName: string;

  roleTitle: string;

  employmentType: EmploymentType;

  location: string | null;

  description: string | null;

  startDate: string;

  endDate: string | null;

  currentlyWorking: boolean;

  createdAt: string;

  updatedAt: string;
}


export interface StudentExperienceRequest {

  companyName: string;

  roleTitle: string;

  employmentType: EmploymentType;

  location: string | null;

  description: string | null;

  startDate: string;

  endDate: string | null;

  currentlyWorking: boolean;
}