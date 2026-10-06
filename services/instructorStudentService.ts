import { api } from "@/lib/api";

import type {
  InstructorStudentOverviewResponse,
} from "@/types/instructorStudent";

export async function getInstructorStudentOverview(
  batchId: string,
  studentId: string
): Promise<InstructorStudentOverviewResponse> {
  const response =
    await api.get<InstructorStudentOverviewResponse>(
      `/api/v1/instructor/batches/${batchId}/students/${studentId}`
    );

  return response.data;
}