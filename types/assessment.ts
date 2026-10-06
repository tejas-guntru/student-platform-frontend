export type AssessmentStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "CLOSED";

export type QuestionType =
  | "MULTIPLE_CHOICE"
  | "TRUE_FALSE"
  | "SHORT_ANSWER"
  | "CODING";

export type AssessmentAnswerType =
  | "MULTIPLE_CHOICE"
  | "TRUE_FALSE"
  | "SHORT_ANSWER"
  | "CODING";

export type AssessmentAttemptStatus =
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "GRADED";

export type CodingLanguage =
  | "JAVA"
  | "PYTHON"
  | "CPP"
  | "JAVASCRIPT";

export type CodingExecutionStatus =
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "COMPILATION_ERROR"
  | "RUNTIME_ERROR"
  | "TIME_LIMIT_EXCEEDED"
  | "EXECUTION_ERROR"
  | "EXECUTION_UNAVAILABLE";

export type CodingSubmissionStatus =
  | "PENDING"
  | "RUNNING"
  | "ACCEPTED"
  | "PARTIALLY_ACCEPTED"
  | "WRONG_ANSWER"
  | "COMPILATION_ERROR"
  | "RUNTIME_ERROR"
  | "TIME_LIMIT_EXCEEDED"
  | "EXECUTION_ERROR";

// =========================================================
// ASSESSMENT
// =========================================================

export interface AssessmentResponse {
  id: string;
  batchId: string;
  title: string;
  description: string | null;
  status: AssessmentStatus;
  durationMinutes: number | null;
  totalMarks: number;
  startsAt: string | null;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssessmentRequest {
  title: string;
  description?: string | null;
  durationMinutes?: number | null;
  startsAt?: string | null;
  endsAt?: string | null;
}

export interface UpdateAssessmentRequest {
  title: string;
  description?: string | null;
  durationMinutes?: number | null;
  startsAt?: string | null;
  endsAt?: string | null;
}

// =========================================================
// QUESTIONS
// =========================================================

export interface AssessmentQuestionResponse {
  id: string;
  assessmentId: string;
  questionText: string;
  questionType: QuestionType;
  correctBooleanAnswer: boolean | null;
  marks: number;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssessmentQuestionRequest {
  questionText: string;
  questionType: QuestionType;
  marks: number;
  correctBooleanAnswer?: boolean | null;
}

export interface UpdateAssessmentQuestionRequest {
  questionText: string;
  questionType: QuestionType;
  marks: number;
  correctBooleanAnswer?: boolean | null;
}

// =========================================================
// OPTIONS
// =========================================================

export interface InstructorAssessmentQuestionOptionResponse {
  id: string;
  questionId: string;
  optionText: string;
  position: number;
  correct: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssessmentQuestionOptionRequest {
  optionText: string;
  correct: boolean;
}

// =========================================================
// CODING QUESTION AUTHORING
// =========================================================

export interface CreateCodingQuestionRequest {
  language: CodingLanguage;
  starterCode?: string | null;
  constraintsText?: string | null;
}

export interface UpdateCodingQuestionRequest {
  language: CodingLanguage;
  starterCode?: string | null;
  constraintsText?: string | null;
}

export interface CreateCodingTestCaseRequest {
  inputData?: string | null;
  expectedOutput: string;
  sample: boolean;
  marks: number;
}

export interface UpdateCodingTestCaseRequest {
  inputData?: string | null;
  expectedOutput: string;
  sample: boolean;
  marks: number;
}

export interface InstructorCodingTestCaseResponse {
  id: string;
  inputData: string | null;
  expectedOutput: string;
  sample: boolean;
  marks: number;
  position: number;
}

export interface InstructorCodingQuestionResponse {
  id: string;
  questionId: string;
  language: CodingLanguage;
  starterCode: string | null;
  constraintsText: string | null;
  testCases: InstructorCodingTestCaseResponse[];
}

// =========================================================
// STUDENT CODING QUESTION
// =========================================================

export interface StudentCodingTestCaseResponse {
  id: string;
  inputData: string | null;
  expectedOutput: string;
  position: number;
}

export interface StudentCodingQuestionResponse {
  questionId: string;
  language: CodingLanguage;
  starterCode: string | null;
  constraintsText: string | null;
  sampleTestCases: StudentCodingTestCaseResponse[];
}

// =========================================================
// STUDENT ASSESSMENTS
// =========================================================

export interface StudentAssessmentOptionResponse {
  id: string;
  optionText: string;
  position: number;
}

export interface StudentAssessmentQuestionResponse {
  id: string;
  questionText: string;
  questionType: QuestionType;
  marks: number;
  position: number;
  options: StudentAssessmentOptionResponse[];
  coding: StudentCodingQuestionResponse | null;
}

export interface StudentAssessmentSummaryResponse {
  id: string;
  batchId: string;
  title: string;
  description: string | null;
  status: AssessmentStatus;
  durationMinutes: number | null;
  totalMarks: number;
  startsAt: string | null;
  endsAt: string | null;
}

export interface StudentAssessmentDetailResponse {
  id: string;
  batchId: string;
  title: string;
  description: string | null;
  status: AssessmentStatus;
  durationMinutes: number | null;
  totalMarks: number;
  startsAt: string | null;
  endsAt: string | null;
  questions: StudentAssessmentQuestionResponse[];
}

// =========================================================
// ATTEMPTS / ANSWERS
// =========================================================

export interface AssessmentAttemptResponse {
  id: string;
  assessmentId: string;
  status: AssessmentAttemptStatus;
  score: number | null;
  startedAt: string;
  submittedAt: string | null;
  gradedAt: string | null;
}

export interface AssessmentAnswerResponse {
  id: string;
  attemptId: string;
  questionId: string;
  answerType: AssessmentAnswerType;
  selectedOptionId: string | null;
  booleanAnswer: boolean | null;
  textAnswer: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SaveAssessmentAnswerRequest {
  selectedOptionId?: string | null;
  booleanAnswer?: boolean | null;
  textAnswer?: string | null;
}

// =========================================================
// CODING EXECUTION
// =========================================================

export interface RunCodeRequest {
  sourceCode: string;
}

export interface SubmitCodeRequest {
  sourceCode: string;
}

export interface CodingTestResultResponse {
  testCaseId: string | null;
  position: number;
  sample: boolean;
  status: CodingExecutionStatus;
  passed: boolean;
  actualOutput: string | null;
  errorOutput: string | null;
  executionTimeMs: number | null;
  awardedMarks: number | null;
}

export interface RunCodeResponse {
  questionId: string;
  language: CodingLanguage;
  passedTestCases: number;
  totalTestCases: number;
  results: CodingTestResultResponse[];
}

export interface CodingSubmissionResponse {
  submissionId: string;
  answerId: string;
  questionId: string;
  language: CodingLanguage;
  status: CodingSubmissionStatus;
  passedTestCases: number;
  totalTestCases: number;
  awardedMarks: number;
  executionTimeMs: number | null;
  compilerOutput: string | null;
  errorOutput: string | null;
  submittedAt: string;
  results: CodingTestResultResponse[];
}

// =========================================================
// RESULTS
// =========================================================

export interface StudentAssessmentResultAnswerResponse {
  questionId: string;
  questionType: QuestionType;
  questionText: string;
  questionMarks: number;
  selectedOptionId: string | null;
  booleanAnswer: boolean | null;
  textAnswer: string | null;
  awardedMarks: number | null;
}

export interface StudentAssessmentResultResponse {
  attemptId: string;
  assessmentId: string;
  assessmentTitle: string;
  status: AssessmentAttemptStatus;
  score: number | null;
  totalMarks: number;
  startedAt: string;
  submittedAt: string | null;
  gradedAt: string | null;
  answers: StudentAssessmentResultAnswerResponse[];
}

// =========================================================
// INSTRUCTOR ATTEMPTS / GRADING
// =========================================================

export interface InstructorAssessmentAttemptResponse {
  id: string;
  assessmentId: string;
  studentId: string;
  studentName: string;
  status: AssessmentAttemptStatus;
  score: number | null;
  startedAt: string;
  submittedAt: string | null;
  gradedAt: string | null;
}

export interface InstructorAssessmentAnswerResponse {
  id: string;
  attemptId: string;
  questionId: string;
  questionType: QuestionType;
  questionText: string;
  questionMarks: number;
  selectedOptionId: string | null;
  booleanAnswer: boolean | null;
  textAnswer: string | null;
  awardedMarks: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface GradeAssessmentAnswerRequest {
  awardedMarks: number;
}