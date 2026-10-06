import { api } from "@/lib/api";

import type {
  InstructorProfileResponse,
  UpdateInstructorProfileRequest,
} from "@/types/instructorProfile";

const BASE_URL =
  "/api/v1/instructor/profile";

// =========================================================
// GET INSTRUCTOR PROFILE
// =========================================================

export async function getInstructorProfile():
  Promise<InstructorProfileResponse> {

  const response =
    await api.get<InstructorProfileResponse>(
      BASE_URL
    );

  return response.data;
}

// =========================================================
// UPDATE INSTRUCTOR PROFILE
// =========================================================

export async function updateInstructorProfile(
  request: UpdateInstructorProfileRequest
): Promise<InstructorProfileResponse> {

  const response =
    await api.put<InstructorProfileResponse>(
      BASE_URL,
      request
    );

  return response.data;
}