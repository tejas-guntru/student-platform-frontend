import { api } from "@/lib/api";

import type {
  StudentProject,
  StudentProjectRequest,
} from "@/types/studentProject";


export const getMyProjects =
  async (): Promise<StudentProject[]> => {

    const response =
      await api.get<StudentProject[]>(
        "/api/v1/students/me/projects"
      );

    return response.data;
  };


export const createProject =
  async (
    request: StudentProjectRequest
  ): Promise<StudentProject> => {

    const response =
      await api.post<StudentProject>(
        "/api/v1/students/me/projects",
        request
      );

    return response.data;
  };


export const updateProject =
  async (
    projectId: string,
    request: StudentProjectRequest
  ): Promise<StudentProject> => {

    const response =
      await api.put<StudentProject>(
        `/api/v1/students/me/projects/${projectId}`,
        request
      );

    return response.data;
  };


export const deleteProject =
  async (
    projectId: string
  ): Promise<void> => {

    await api.delete(
      `/api/v1/students/me/projects/${projectId}`
    );
  };