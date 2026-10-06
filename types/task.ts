export type TaskSubmissionStatus =
  | "SUBMITTED"
  | "REVIEWED";

export interface CreateTaskRequest {
  title: string;
  description: string | null;
  dueAt: string | null;
}

export interface UpdateTaskRequest {
  title: string;
  description: string | null;
  dueAt: string | null;
}

export interface TaskResponse {
  id: string;
  batchId: string;
  title: string;
  description: string | null;
  dueAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitTaskRequest {
  content: string | null;
  resourceUrl: string | null;
}

export interface ReviewTaskSubmissionRequest {
  feedback: string;
}

export interface TaskSubmissionResponse {
  id: string;
  taskId: string;
  studentId: string;
  content: string | null;
  resourceUrl: string | null;
  status: TaskSubmissionStatus;
  feedback: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  updatedAt: string;
}

export interface InstructorTaskSubmissionResponse {
  id: string;
  taskId: string;
  studentId: string;
  studentName: string;
  content: string | null;
  resourceUrl: string | null;
  status: TaskSubmissionStatus;
  feedback: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  updatedAt: string;
}