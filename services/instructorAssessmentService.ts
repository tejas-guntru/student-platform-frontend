import { api } from "@/lib/api";

import type {
  AssessmentResponse,
  AssessmentQuestionResponse,
  CreateAssessmentRequest,
  CreateAssessmentQuestionRequest,
  CreateAssessmentQuestionOptionRequest,
  InstructorAssessmentQuestionOptionResponse,
  InstructorAssessmentAnswerResponse,
InstructorAssessmentAttemptResponse,
GradeAssessmentAnswerRequest,
AssessmentAttemptResponse,
CreateCodingQuestionRequest,
CreateCodingTestCaseRequest,
InstructorCodingQuestionResponse,
InstructorCodingTestCaseResponse,
UpdateCodingQuestionRequest,
UpdateCodingTestCaseRequest,

} from "@/types/assessment";

// =========================================================
// ASSESSMENTS
// =========================================================

export const getBatchAssessments = async (
  batchId: string
): Promise<AssessmentResponse[]> => {
  const response =
    await api.get<AssessmentResponse[]>(
      `/api/v1/instructor/batches/${batchId}/assessments`
    );

  return response.data;
};

export const getAssessment = async (
  batchId: string,
  assessmentId: string
): Promise<AssessmentResponse> => {
  const response =
    await api.get<AssessmentResponse>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}`
    );

  return response.data;
};

export const createAssessment = async (
  batchId: string,
  request: CreateAssessmentRequest
): Promise<AssessmentResponse> => {
  const response =
    await api.post<AssessmentResponse>(
      `/api/v1/instructor/batches/${batchId}/assessments`,
      request
    );

  return response.data;
};

export const publishAssessment = async (
  batchId: string,
  assessmentId: string
): Promise<AssessmentResponse> => {
  const response =
    await api.put<AssessmentResponse>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/publish`
    );

  return response.data;
};

// =========================================================
// QUESTIONS
// =========================================================

export const getAssessmentQuestions = async (
  batchId: string,
  assessmentId: string
): Promise<AssessmentQuestionResponse[]> => {
  const response =
    await api.get<AssessmentQuestionResponse[]>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/questions`
    );

  return response.data;
};

export const createAssessmentQuestion = async (
  batchId: string,
  assessmentId: string,
  request: CreateAssessmentQuestionRequest
): Promise<AssessmentQuestionResponse> => {
  const response =
    await api.post<AssessmentQuestionResponse>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/questions`,
      request
    );

  return response.data;
};

// =========================================================
// OPTIONS
// =========================================================

export const getQuestionOptions = async (
  batchId: string,
  assessmentId: string,
  questionId: string
): Promise<
  InstructorAssessmentQuestionOptionResponse[]
> => {
  const response =
    await api.get<
      InstructorAssessmentQuestionOptionResponse[]
    >(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/questions/${questionId}/options`
    );

  return response.data;
};

export const createQuestionOption = async (
  batchId: string,
  assessmentId: string,
  questionId: string,
  request: CreateAssessmentQuestionOptionRequest
): Promise<InstructorAssessmentQuestionOptionResponse> => {
  const response =
    await api.post<InstructorAssessmentQuestionOptionResponse>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/questions/${questionId}/options`,
      request
    );

  return response.data;
};
// =========================================================
// ATTEMPTS
// =========================================================

export const getAssessmentAttempts = async (
  batchId: string,
  assessmentId: string
): Promise<InstructorAssessmentAttemptResponse[]> => {
  const response =
    await api.get<InstructorAssessmentAttemptResponse[]>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/attempts`
    );

  return response.data;
};

export const getInstructorAssessmentAttempt = async (
  batchId: string,
  assessmentId: string,
  attemptId: string
): Promise<AssessmentAttemptResponse> => {
  const response =
    await api.get<AssessmentAttemptResponse>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/attempts/${attemptId}`
    );

  return response.data;
};

export const getInstructorAttemptAnswers = async (
  batchId: string,
  assessmentId: string,
  attemptId: string
): Promise<InstructorAssessmentAnswerResponse[]> => {
  const response =
    await api.get<InstructorAssessmentAnswerResponse[]>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/attempts/${attemptId}/answers`
    );

  return response.data;
};

export const gradeAssessmentAnswer = async (
  batchId: string,
  assessmentId: string,
  attemptId: string,
  answerId: string,
  request: GradeAssessmentAnswerRequest
): Promise<InstructorAssessmentAnswerResponse> => {
  const response =
    await api.put<InstructorAssessmentAnswerResponse>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/attempts/${attemptId}/answers/${answerId}/grade`,
      request
    );

  return response.data;
};
// =========================================================
// CODING QUESTIONS
// =========================================================

export const createCodingQuestion = async (
  batchId: string,
  assessmentId: string,
  questionId: string,
  request: CreateCodingQuestionRequest
): Promise<InstructorCodingQuestionResponse> => {
  const response =
    await api.post<InstructorCodingQuestionResponse>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/questions/${questionId}/coding`,
      request
    );

  return response.data;
};

export const getCodingQuestion = async (
  batchId: string,
  assessmentId: string,
  questionId: string
): Promise<InstructorCodingQuestionResponse> => {
  const response =
    await api.get<InstructorCodingQuestionResponse>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/questions/${questionId}/coding`
    );

  return response.data;
};

export const updateCodingQuestion = async (
  batchId: string,
  assessmentId: string,
  questionId: string,
  request: UpdateCodingQuestionRequest
): Promise<InstructorCodingQuestionResponse> => {
  const response =
    await api.put<InstructorCodingQuestionResponse>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/questions/${questionId}/coding`,
      request
    );

  return response.data;
};

// =========================================================
// CODING TEST CASES
// =========================================================

export const createCodingTestCase = async (
  batchId: string,
  assessmentId: string,
  questionId: string,
  request: CreateCodingTestCaseRequest
): Promise<InstructorCodingTestCaseResponse> => {
  const response =
    await api.post<InstructorCodingTestCaseResponse>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/questions/${questionId}/coding/test-cases`,
      request
    );

  return response.data;
};

export const updateCodingTestCase = async (
  batchId: string,
  assessmentId: string,
  questionId: string,
  testCaseId: string,
  request: UpdateCodingTestCaseRequest
): Promise<InstructorCodingTestCaseResponse> => {
  const response =
    await api.put<InstructorCodingTestCaseResponse>(
      `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/questions/${questionId}/coding/test-cases/${testCaseId}`,
      request
    );

  return response.data;
};

export const deleteCodingTestCase = async (
  batchId: string,
  assessmentId: string,
  questionId: string,
  testCaseId: string
): Promise<void> => {
  await api.delete(
    `/api/v1/instructor/batches/${batchId}/assessments/${assessmentId}/questions/${questionId}/coding/test-cases/${testCaseId}`
  );
};