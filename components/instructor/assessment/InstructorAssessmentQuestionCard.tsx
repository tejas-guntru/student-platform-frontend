"use client";

import InstructorCodingQuestion from "./coding/InstructorCodingQuestion";
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
    <article
      className="
        min-w-0
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4

        sm:p-6
      "
    >
      {/* QUESTION HEADER */}

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-4

          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div
          className="
            min-w-0
            flex-1
          "
        >
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-blue-600
            "
          >
            Question {index + 1}
          </p>

          <h3
            className="
              mt-2
              break-words
              font-semibold
              leading-6
              text-slate-950
            "
          >
            {question.questionText}
          </h3>
        </div>

        {/* QUESTION META */}

        <div
          className="
            flex
            h-fit
            min-w-0
            flex-wrap
            items-center
            gap-2

            sm:shrink-0
            sm:justify-end
          "
        >
          <span
            className="
              max-w-full
              rounded-full
              bg-slate-100
              px-3
              py-1
              text-xs
              font-semibold
              text-slate-700
            "
          >
            {formatQuestionType(
              question.questionType
            )}
          </span>

          <span
            className="
              shrink-0
              rounded-full
              bg-blue-50
              px-3
              py-1
              text-xs
              font-semibold
              text-blue-700
            "
          >
            {question.marks}{" "}
            {question.marks === 1
              ? "mark"
              : "marks"}
          </span>
        </div>
      </div>

      {/* TRUE / FALSE */}

      {question.questionType ===
        "TRUE_FALSE" && (
        <div
          className="
            mt-5
            min-w-0
            rounded-lg
            bg-slate-50
            p-3.5
            text-sm
            leading-6
            text-slate-700

            sm:p-4
          "
        >
          Correct answer:{" "}
          <strong>
            {question.correctBooleanAnswer
              ? "True"
              : "False"}
          </strong>
        </div>
      )}

      {/* SHORT ANSWER */}

      {question.questionType ===
        "SHORT_ANSWER" && (
        <div
          className="
            mt-5
            min-w-0
            rounded-lg
            bg-slate-50
            p-3.5
            text-sm
            leading-6
            text-slate-600

            sm:p-4
          "
        >
          This answer requires instructor
          grading after submission.
        </div>
      )}

      {/* MULTIPLE CHOICE */}

      {question.questionType ===
        "MULTIPLE_CHOICE" && (
        <div className="min-w-0">
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
        </div>
      )}

      {/* CODING */}

      {question.questionType ===
        "CODING" && (
        <div className="min-w-0">
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
        </div>
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