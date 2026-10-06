"use client";

import InstructorCodingQuestion from "./InstructorCodingQuestion";
import MultipleChoiceOptionManager from "./MultipleChoiceOptionManager";

import type {
  AssessmentQuestionResponse,
  InstructorAssessmentQuestionOptionResponse,
} from "@/types/assessment";

interface InstructorAssessmentQuestionCardProps {
  index: number;

  question:
    AssessmentQuestionResponse;

  batchId: string;
  assessmentId: string;

  options:
    InstructorAssessmentQuestionOptionResponse[];

  optionText: string;
  optionCorrect: boolean;

  creatingOption: boolean;

  disabled: boolean;

  onOptionTextChange: (
    value: string
  ) => void;

  onOptionCorrectChange: (
    value: boolean
  ) => void;

  onCreateOption: () => void;

  onError: (
    message: string
  ) => void;

  onMessage: (
    message: string
  ) => void;

  onAuthFailure: () => void;
}

export default function InstructorAssessmentQuestionCard({
  index,
  question,
  batchId,
  assessmentId,
  options,
  optionText,
  optionCorrect,
  creatingOption,
  disabled,
  onOptionTextChange,
  onOptionCorrectChange,
  onCreateOption,
  onError,
  onMessage,
  onAuthFailure,
}: InstructorAssessmentQuestionCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
            Question {index + 1}
          </p>

          <h3 className="mt-2 font-semibold text-slate-950">
            {question.questionText}
          </h3>
        </div>

        <div className="flex h-fit flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {formatQuestionType(
              question.questionType
            )}
          </span>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {question.marks}{" "}
            {question.marks === 1
              ? "mark"
              : "marks"}
          </span>
        </div>
      </div>

      {question.questionType ===
        "TRUE_FALSE" && (
        <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
          Correct answer:{" "}
          <strong>
            {question.correctBooleanAnswer
              ? "True"
              : "False"}
          </strong>
        </div>
      )}

      {question.questionType ===
        "SHORT_ANSWER" && (
        <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          This answer requires
          instructor grading after
          submission.
        </div>
      )}

      {question.questionType ===
        "MULTIPLE_CHOICE" && (
        <MultipleChoiceOptionManager
          options={options}
          optionText={optionText}
          correct={optionCorrect}
          creating={
            creatingOption
          }
          disabled={disabled}
          onTextChange={
            onOptionTextChange
          }
          onCorrectChange={
            onOptionCorrectChange
          }
          onCreate={
            onCreateOption
          }
        />
      )}

      {question.questionType ===
        "CODING" && (
        <InstructorCodingQuestion
          batchId={batchId}
          assessmentId={
            assessmentId
          }
          questionId={
            question.id
          }
          disabled={disabled}
          onError={onError}
          onMessage={onMessage}
          onAuthFailure={
            onAuthFailure
          }
        />
      )}
    </article>
  );
}

function formatQuestionType(
  type: string
) {
  switch (type) {
    case "MULTIPLE_CHOICE":
      return "Multiple Choice";

    case "TRUE_FALSE":
      return "True / False";

    case "SHORT_ANSWER":
      return "Short Answer";

    case "CODING":
      return "Coding";

    default:
      return type;
  }
}