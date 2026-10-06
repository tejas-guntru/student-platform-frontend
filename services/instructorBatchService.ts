import { api } from "@/lib/api";

import type {
  BatchJoinApprovalResponse,
  BatchJoinRejectionResponse,
  BatchMemberResponse,
  BatchResponse,
  CreateBatchRequest,
  PendingBatchJoinRequestResponse,
} from "@/types/batch";

// =========================================================
// CREATE BATCH
// =========================================================

export const createBatch = async (
  request: CreateBatchRequest
): Promise<BatchResponse> => {
  const response = await api.post<BatchResponse>(
    "/api/v1/instructor/batches",
    request
  );

  return response.data;
};

// =========================================================
// GET MY BATCHES
// =========================================================

export const getInstructorBatches = async (): Promise<
  BatchResponse[]
> => {
  const response = await api.get<BatchResponse[]>(
    "/api/v1/instructor/batches"
  );

  return response.data;
};

// =========================================================
// GET PENDING JOIN REQUESTS
// =========================================================

export const getPendingJoinRequests = async (
  batchId: string
): Promise<PendingBatchJoinRequestResponse[]> => {
  const response = await api.get<
    PendingBatchJoinRequestResponse[]
  >(
    `/api/v1/instructor/batches/${batchId}/join-requests/pending`
  );

  return response.data;
};

// =========================================================
// APPROVE JOIN REQUEST
// =========================================================

export const approveJoinRequest = async (
  batchId: string,
  requestId: string
): Promise<BatchJoinApprovalResponse> => {
  const response =
    await api.post<BatchJoinApprovalResponse>(
      `/api/v1/instructor/batches/${batchId}/join-requests/${requestId}/approve`
    );

  return response.data;
};

// =========================================================
// REJECT JOIN REQUEST
// =========================================================

export const rejectJoinRequest = async (
  batchId: string,
  requestId: string
): Promise<BatchJoinRejectionResponse> => {
  const response =
    await api.post<BatchJoinRejectionResponse>(
      `/api/v1/instructor/batches/${batchId}/join-requests/${requestId}/reject`
    );

  return response.data;
};

// =========================================================
// GET MEMBERS
// =========================================================

export const getBatchMembers = async (
  batchId: string
): Promise<BatchMemberResponse[]> => {
  const response = await api.get<
    BatchMemberResponse[]
  >(
    `/api/v1/instructor/batches/${batchId}/members`
  );

  return response.data;
};

// =========================================================
// COMPLETE BATCH
// =========================================================

export const completeBatch = async (
  batchId: string
): Promise<BatchResponse> => {
  const response = await api.post<BatchResponse>(
    `/api/v1/instructor/batches/${batchId}/complete`
  );

  return response.data;
};

// =========================================================
// ARCHIVE BATCH
// =========================================================

export const archiveBatch = async (
  batchId: string
): Promise<BatchResponse> => {
  const response = await api.post<BatchResponse>(
    `/api/v1/instructor/batches/${batchId}/archive`
  );

  return response.data;
};
// =========================================================
// GET INSTRUCTOR BATCH
// =========================================================

export const getInstructorBatch = async (
  batchId: string
): Promise<BatchResponse> => {
  const batches =
    await getInstructorBatches();

  const batch = batches.find(
    (item) => item.id === batchId
  );

  if (!batch) {
    throw new Error(
      "Batch not found."
    );
  }

  return batch;
};