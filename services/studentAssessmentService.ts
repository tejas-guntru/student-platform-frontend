import { api } from "@/lib/api";

import type {
  AssessmentAnswerResponse,
  AssessmentAttemptResponse,
  CodingSubmissionResponse,
  RunCodeRequest,
  RunCodeResponse,
  SaveAssessmentAnswerRequest,
  StudentAssessmentDetailResponse,
  StudentAssessmentResultResponse,
  StudentAssessmentSummaryResponse,
  SubmitCodeRequest,
} from "@/types/assessment";

// =========================================================
// ASSESSMENTS
// =========================================================

export const getAvailableAssessments =
  async (): Promise<StudentAssessmentSummaryResponse[]> => {
    const response = await api.get<StudentAssessmentSummaryResponse[]>(
      "/api/v1/student/assessments"
    );

    return response.data;
  };

export const getStudentAssessment = async (
  assessmentId: string
): Promise<StudentAssessmentDetailResponse> => {
  const response = await api.get<StudentAssessmentDetailResponse>(
    `/api/v1/student/assessments/${assessmentId}`
  );

  return response.data;
};

// =========================================================
// ATTEMPTS
// =========================================================

export const startAssessmentAttempt = async (
  assessmentId: string
): Promise<AssessmentAttemptResponse> => {
  const response = await api.post<AssessmentAttemptResponse>(
    `/api/v1/student/assessments/${assessmentId}/attempt`
  );

  return response.data;
};

export const getMyAssessmentAttempts =
  async (): Promise<AssessmentAttemptResponse[]> => {
    const response = await api.get<AssessmentAttemptResponse[]>(
      "/api/v1/student/assessments/attempts"
    );

    return response.data;
  };

export const getAssessmentAttempt = async (
  attemptId: string
): Promise<AssessmentAttemptResponse> => {
  const response = await api.get<AssessmentAttemptResponse>(
    `/api/v1/student/assessments/attempts/${attemptId}`
  );

  return response.data;
};

// =========================================================
// NORMAL ANSWERS
// =========================================================

export const saveAssessmentAnswer = async (
  attemptId: string,
  questionId: string,
  request: SaveAssessmentAnswerRequest
): Promise<AssessmentAnswerResponse> => {
  const response = await api.put<AssessmentAnswerResponse>(
    `/api/v1/student/assessments/attempts/${attemptId}/questions/${questionId}/answer`,
    request
  );

  return response.data;
};

export const getAssessmentAttemptAnswers = async (
  attemptId: string
): Promise<AssessmentAnswerResponse[]> => {
  const response = await api.get<AssessmentAnswerResponse[]>(
    `/api/v1/student/assessments/attempts/${attemptId}/answers`
  );

  return response.data;
};

// =========================================================
// CODING
// =========================================================

export const runAssessmentCode = async (
  attemptId: string,
  questionId: string,
  request: RunCodeRequest
): Promise<RunCodeResponse> => {
  const response = await api.post<RunCodeResponse>(
    `/api/v1/student/assessments/attempts/${attemptId}/questions/${questionId}/coding/run`,
    request
  );

  return response.data;
};

export const submitAssessmentCode = async (
  attemptId: string,
  questionId: string,
  request: SubmitCodeRequest
): Promise<CodingSubmissionResponse> => {
  const response = await api.post<CodingSubmissionResponse>(
    `/api/v1/student/assessments/attempts/${attemptId}/questions/${questionId}/coding/submit`,
    request
  );

  return response.data;
};

// =========================================================
// FINAL SUBMISSION
// =========================================================

export const submitAssessmentAttempt = async (
  attemptId: string
): Promise<AssessmentAttemptResponse> => {
  const response = await api.post<AssessmentAttemptResponse>(
    `/api/v1/student/assessments/attempts/${attemptId}/submit`
  );

  return response.data;
};

// =========================================================
// RESULT
// =========================================================

export const getAssessmentResult = async (
  attemptId: string
): Promise<StudentAssessmentResultResponse> => {
  const response = await api.get<StudentAssessmentResultResponse>(
    `/api/v1/student/assessments/attempts/${attemptId}/result`
  );

  return response.data;
};