import { api } from "@/lib/api";

import type {
  BatchJoinRequestResponse,
  JoinBatchRequest,
  StudentBatchDetailResponse,
  StudentBatchResponse,
} from "@/types/batch";

// =========================================================
// GET MY BATCHES
// =========================================================

export const getMyBatches = async (): Promise<
  StudentBatchResponse[]
> => {
  const response = await api.get<StudentBatchResponse[]>(
    "/api/v1/student/batches"
  );

  return response.data;
};

// =========================================================
// GET BATCH DETAILS
// =========================================================

export const getBatchDetails = async (
  batchId: string
): Promise<StudentBatchDetailResponse> => {
  const response =
    await api.get<StudentBatchDetailResponse>(
      `/api/v1/student/batches/${batchId}`
    );

  return response.data;
};

// =========================================================
// REQUEST TO JOIN BATCH
// =========================================================

export const joinBatch = async (
  request: JoinBatchRequest
): Promise<BatchJoinRequestResponse> => {
  const response =
    await api.post<BatchJoinRequestResponse>(
      "/api/v1/student/batches/join",
      request
    );

  return response.data;
};