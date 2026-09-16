import { api } from "@/lib/api";

import type {
  AdminCandidate,
} from "@/types/adminCandidate";


export const getAdminCandidate =
  async (
    studentId: string
  ): Promise<AdminCandidate> => {

    const response =
      await api.get<AdminCandidate>(
        `/api/v1/admin/candidates/${studentId}`
      );

    return response.data;
  };