"use client";

import {
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import CodingAssessmentQuestion from "./CodingAssessmentQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import ShortAnswerQuestion from "./ShortAnswerQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";

import type {
  StudentAssessmentQuestionResponse,
} from "@/types/assessment";

export interface StudentLocalAnswer {
  selectedOptionId: string | null;
  booleanAnswer: boolean | null;
  textAnswer: string;
}

interface StudentAssessmentQuestionProps {
  index: number;
  question: StudentAssessmentQuestionResponse;
  answer: StudentLocalAnswer;
  attemptId: string;
  editable: boolean;
  saved: boolean;
  saving: boolean;

  onUpdate: (
    questionId: string,
    changes: Partial<StudentLocalAnswer>
  ) => void;

  onSave: (
    questionId: string
  ) => void;

  onCodingSubmitted: (
    questionId: string
  ) => void;
}

export default function StudentAssessmentQuestion({
  index,
  question,
  answer,
  attemptId,
  editable,
  saved,
  saving,
  onUpdate,
  onSave,
  onCodingSubmitted,
}: StudentAssessmentQuestionProps) {
  const isCoding =
    question.questionType === "CODING";

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
      {/* HEADER */}

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-3

          sm:flex-row
          sm:items-start
          sm:justify-between
          sm:gap-4
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
              text-[#1256AF]
            "
          >
            Question {index + 1}
          </p>

          <h3
            className="
              mt-2
              break-words
              text-base
              font-semibold
              leading-6
              text-slate-950

              sm:text-lg
              sm:leading-7
            "
          >
            {question.questionText}
          </h3>
        </div>

        {/* QUESTION METADATA */}

        <div
          className="
            flex
            min-w-0
            flex-wrap
            items-center
            gap-2

            sm:w-auto
            sm:shrink-0
            sm:justify-end
          "
        >
          <span
            className="
              inline-flex
              w-fit
              max-w-full
              items-center
              rounded-full
              bg-slate-100
              px-3
              py-1
              text-xs
              font-semibold
              text-slate-700
            "
          >
            <span className="truncate">
              {formatQuestionType(
                question.questionType
              )}
            </span>
          </span>

          <span
            className="
              inline-flex
              w-fit
              shrink-0
              items-center
              rounded-full
              bg-blue-50
              px-3
              py-1
              text-xs
              font-semibold
              text-[#1256AF]
            "
          >
            {question.marks}{" "}
            {question.marks === 1
              ? "mark"
              : "marks"}
          </span>

          {saved && (
            <span
              className="
                inline-flex
                w-fit
                shrink-0
                items-center
                gap-1
                rounded-full
                bg-green-50
                px-3
                py-1
                text-xs
                font-semibold
                text-green-700
              "
            >
              <CheckCircle2
                size={13}
                aria-hidden="true"
              />

              Saved
            </span>
          )}
        </div>
      </div>

      {/* MULTIPLE CHOICE */}

      {question.questionType ===
        "MULTIPLE_CHOICE" && (
        <MultipleChoiceQuestion
          question={question}
          selectedOptionId={
            answer.selectedOptionId
          }
          disabled={!editable}
          onChange={(optionId) =>
            onUpdate(question.id, {
              selectedOptionId:
                optionId,
              booleanAnswer: null,
              textAnswer: "",
            })
          }
        />
      )}

      {/* TRUE / FALSE */}

      {question.questionType ===
        "TRUE_FALSE" && (
        <TrueFalseQuestion
          questionId={question.id}
          value={
            answer.booleanAnswer
          }
          disabled={!editable}
          onChange={(value) =>
            onUpdate(question.id, {
              selectedOptionId: null,
              booleanAnswer: value,
              textAnswer: "",
            })
          }
        />
      )}

      {/* SHORT ANSWER */}

      {question.questionType ===
        "SHORT_ANSWER" && (
        <ShortAnswerQuestion
          value={answer.textAnswer}
          disabled={!editable}
          onChange={(value) =>
            onUpdate(question.id, {
              selectedOptionId: null,
              booleanAnswer: null,
              textAnswer: value,
            })
          }
        />
      )}

      {/* CODING */}

      {question.questionType ===
        "CODING" && (
        <div
          className="
            mt-5
            min-w-0
          "
        >
          <CodingAssessmentQuestion
            attemptId={attemptId}
            question={question}
            disabled={!editable}
            onSubmitted={() =>
              onCodingSubmitted(
                question.id
              )
            }
          />
        </div>
      )}

      {/* NORMAL ANSWER SAVE */}

      {editable && !isCoding && (
        <div
          className="
            mt-5
            flex
            min-w-0
            flex-col
            gap-2.5
            border-t
            border-slate-100
            pt-5

            sm:flex-row
            sm:items-center
            sm:gap-3
          "
        >
          <button
            type="button"
            disabled={saving}
            onClick={() =>
              onSave(question.id)
            }
            className="
              inline-flex
              min-h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-slate-900
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition

              hover:bg-slate-800

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-slate-400
              focus-visible:ring-offset-2

              disabled:cursor-not-allowed
              disabled:opacity-50

              sm:w-auto
            "
          >
            {saving && (
              <LoaderCircle
                size={16}
                className="animate-spin"
                aria-hidden="true"
              />
            )}

            {saving
              ? "Saving..."
              : saved
                ? "Save Again"
                : "Save Answer"}
          </button>

          {saved && (
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                text-sm
                font-medium
                text-green-600
              "
              role="status"
            >
              <CheckCircle2
                size={16}
                className="shrink-0"
                aria-hidden="true"
              />

              Answer saved
            </span>
          )}
        </div>
      )}

      {/* CODING SUBMISSION INDICATOR */}

      {isCoding && saved && (
        <div
          className="
            mt-4
            flex
            min-w-0
            items-center
            gap-2
            text-sm
            font-medium
            text-green-600
          "
          role="status"
        >
          <CheckCircle2
            size={16}
            className="shrink-0"
            aria-hidden="true"
          />

          <span className="break-words">
            Code submitted
          </span>
        </div>
      )}
    </article>
  );
}

function formatQuestionType(
  value: string
) {
  switch (value) {
    case "MULTIPLE_CHOICE":
      return "Multiple Choice";

    case "TRUE_FALSE":
      return "True / False";

    case "SHORT_ANSWER":
      return "Short Answer";

    case "CODING":
      return "Coding";

    default:
      return value;
  }
}