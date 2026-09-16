import { api } from "@/lib/api";

import type {
  StudentExperience,
  StudentExperienceRequest,
} from "@/types/studentExperience";


export const getMyExperiences =
  async (): Promise<StudentExperience[]> => {

    const response =
      await api.get<StudentExperience[]>(
        "/api/v1/students/me/experiences"
      );

    return response.data;
  };


export const createExperience =
  async (
    request: StudentExperienceRequest
  ): Promise<StudentExperience> => {

    const response =
      await api.post<StudentExperience>(
        "/api/v1/students/me/experiences",
        request
      );

    return response.data;
  };


export const updateExperience =
  async (
    experienceId: string,
    request: StudentExperienceRequest
  ): Promise<StudentExperience> => {

    const response =
      await api.put<StudentExperience>(
        `/api/v1/students/me/experiences/${experienceId}`,
        request
      );

    return response.data;
  };


export const deleteExperience =
  async (
    experienceId: string
  ): Promise<void> => {

    await api.delete(
      `/api/v1/students/me/experiences/${experienceId}`
    );
  };