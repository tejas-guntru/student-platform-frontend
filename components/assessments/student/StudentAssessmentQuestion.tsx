"use client";

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
    <article className="rounded-xl border border-slate-200 bg-white p-6">
      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
            Question {index + 1}
          </p>

          <h3 className="mt-2 text-base font-semibold text-slate-950">
            {question.questionText}
          </h3>
        </div>

        <div className="flex h-fit gap-2">
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
        <div className="mt-5">
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
        <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            disabled={saving}
            onClick={() =>
              onSave(question.id)
            }
            className="
              rounded-lg
              bg-slate-900
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              disabled:opacity-50
            "
          >
            {saving
              ? "Saving..."
              : saved
                ? "Saved ✓"
                : "Save Answer"}
          </button>

          {saved && (
            <span className="text-sm font-medium text-green-600">
              Saved
            </span>
          )}
        </div>
      )}

      {/* CODING SAVED INDICATOR */}

      {isCoding && saved && (
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600">
          Code submitted
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