import { api } from "@/lib/api";

import type {
  ApplicationResponse,
  ResumeResponse,
} from "@/types/application";


export const getMyApplications =
  async (): Promise<ApplicationResponse[]> => {

    const response =
      await api.get<ApplicationResponse[]>(
        "/api/v1/applications/me"
      );

    return response.data;
  };


export const uploadResume =
  async (
    applicationId: string,
    file: File
  ): Promise<ResumeResponse> => {

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await api.post<ResumeResponse>(
        `/api/v1/applications/${applicationId}/resume`,
        formData
      );

    return response.data;
  };


export const getApplicationResume =
  async (
    applicationId: string
  ): Promise<ResumeResponse> => {

    const response =
      await api.get<ResumeResponse>(
        `/api/v1/applications/${applicationId}/resume`
      );

    return response.data;
  };