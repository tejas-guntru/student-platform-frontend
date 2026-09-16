import { api } from "@/lib/api";


export interface ProfileCompletion {
  percentage: number;

  fullNameComplete: boolean;

  contactComplete: boolean;

  academicsComplete: boolean;

  collegeComplete: boolean;

  careerComplete: boolean;

  skillsComplete: boolean;

  projectsComplete: boolean;

  codingProfilesComplete: boolean;

  missingItems: string[];
}


export const getProfileCompletion =
  async (): Promise<ProfileCompletion> => {

    const response =
      await api.get<ProfileCompletion>(
        "/api/v1/students/me/profile-completion"
      );

    return response.data;
  };