export type BatchStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "ARCHIVED";

export type BatchJoinRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

// =========================================================
// STUDENT
// =========================================================

export interface StudentBatchResponse {
  id: string;
  name: string;
  description: string | null;
  status: BatchStatus;
  instructorName: string;
  joinedAt: string;
}

export interface StudentBatchDetailResponse {
  id: string;
  name: string;
  description: string | null;
  status: BatchStatus;
  instructorName: string;
  joinedAt: string;
}

export interface JoinBatchRequest {
  joinCode: string;
}

export interface BatchJoinRequestResponse {
  requestId: string;
  batchId: string;
  batchName: string;
  status: BatchJoinRequestStatus;
  createdAt: string;
  reviewedAt: string | null;
}

// =========================================================
// INSTRUCTOR
// =========================================================

export interface CreateBatchRequest {
  name: string;
  description?: string;
}

export interface BatchResponse {
  id: string;
  name: string;
  description: string | null;
  joinCode: string;
  status: BatchStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PendingBatchJoinRequestResponse {
  requestId: string;
  batchId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  requestedAt: string;
}

export interface BatchJoinApprovalResponse {
  requestId: string;
  batchId: string;
  studentId: string;
  studentName: string;
  status: BatchJoinRequestStatus;
  reviewedAt: string;
  joinedAt: string;
}

export interface BatchJoinRejectionResponse {
  requestId: string;
  batchId: string;
  studentId: string;
  studentName: string;
  status: BatchJoinRequestStatus;
  reviewedAt: string;
}

export interface BatchMemberResponse {
  membershipId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  joinedAt: string;
}