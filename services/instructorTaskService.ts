import { api } from "@/lib/api";
import type {
  CreateTaskRequest,
  InstructorTaskSubmissionResponse,
  ReviewTaskSubmissionRequest,
  TaskResponse,
  UpdateTaskRequest,
} from "@/types/task";

const getTaskBaseUrl = (
  batchId: string
) =>
  `/api/v1/instructor/batches/${batchId}/tasks`;

export async function createTask(
  batchId: string,
  request: CreateTaskRequest
): Promise<TaskResponse> {
  const response =
    await api.post<TaskResponse>(
      getTaskBaseUrl(batchId),
      request
    );

  return response.data;
}

export async function getBatchTasks(
  batchId: string
): Promise<TaskResponse[]> {
  const response =
    await api.get<TaskResponse[]>(
      getTaskBaseUrl(batchId)
    );

  return response.data;
}

export async function getTask(
  batchId: string,
  taskId: string
): Promise<TaskResponse> {
  const response =
    await api.get<TaskResponse>(
      `${getTaskBaseUrl(batchId)}/${taskId}`
    );

  return response.data;
}

export async function updateTask(
  batchId: string,
  taskId: string,
  request: UpdateTaskRequest
): Promise<TaskResponse> {
  const response =
    await api.put<TaskResponse>(
      `${getTaskBaseUrl(batchId)}/${taskId}`,
      request
    );

  return response.data;
}

export async function deleteTask(
  batchId: string,
  taskId: string
): Promise<void> {
  await api.delete(
    `${getTaskBaseUrl(batchId)}/${taskId}`
  );
}

export async function getTaskSubmissions(
  batchId: string,
  taskId: string
): Promise<
  InstructorTaskSubmissionResponse[]
> {
  const response =
    await api.get<
      InstructorTaskSubmissionResponse[]
    >(
      `${getTaskBaseUrl(
        batchId
      )}/${taskId}/submissions`
    );

  return response.data;
}

export async function reviewTaskSubmission(
  batchId: string,
  taskId: string,
  submissionId: string,
  request: ReviewTaskSubmissionRequest
): Promise<InstructorTaskSubmissionResponse> {
  const response =
    await api.put<InstructorTaskSubmissionResponse>(
      `${getTaskBaseUrl(
        batchId
      )}/${taskId}/submissions/${submissionId}/review`,
      request
    );

  return response.data;
}