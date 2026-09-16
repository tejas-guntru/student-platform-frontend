import { api } from "@/lib/api";

import type {
  StudentProfile,
  UpdateStudentProfileRequest,
} from "@/types/student";

export const getMyProfile =
  async (): Promise<StudentProfile> => {

    const response =
      await api.get<StudentProfile>(
        "/api/v1/students/me"
      );

    return response.data;
  };


export const updateMyProfile =
  async (
    request: UpdateStudentProfileRequest
  ): Promise<StudentProfile> => {

    const response =
      await api.put<StudentProfile>(
        "/api/v1/students/me",
        request
      );

    return response.data;
  };