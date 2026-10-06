import { api } from "@/lib/api";

import type {
  SubmitTaskRequest,
  TaskResponse,
  TaskSubmissionResponse,
} from "@/types/task";

export async function getStudentBatchTasks(
  batchId: string
): Promise<TaskResponse[]> {
  const response = await api.get<TaskResponse[]>(
    `/api/v1/student/batches/${batchId}/tasks`
  );

  return response.data;
}

export async function getStudentTask(
  batchId: string,
  taskId: string
): Promise<TaskResponse> {
  const response = await api.get<TaskResponse>(
    `/api/v1/student/batches/${batchId}/tasks/${taskId}`
  );

  return response.data;
}

export async function submitTask(
  taskId: string,
  request: SubmitTaskRequest
): Promise<TaskSubmissionResponse> {
  const response =
    await api.post<TaskSubmissionResponse>(
      `/api/v1/student/tasks/${taskId}/submission`,
      request
    );

  return response.data;
}

export async function getOwnTaskSubmission(
  taskId: string
): Promise<TaskSubmissionResponse> {
  const response =
    await api.get<TaskSubmissionResponse>(
      `/api/v1/student/tasks/${taskId}/submission`
    );

  return response.data;
}

export async function updateTaskSubmission(
  taskId: string,
  request: SubmitTaskRequest
): Promise<TaskSubmissionResponse> {
  const response =
    await api.put<TaskSubmissionResponse>(
      `/api/v1/student/tasks/${taskId}/submission`,
      request
    );

  return response.data;
}