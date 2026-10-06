"use client";

import type {
  FormEvent,
} from "react";

import type {
  QuestionType,
} from "@/types/assessment";

interface AssessmentQuestionFormProps {
  questionText: string;
  questionType: QuestionType;
  marks: string;
  correctBooleanAnswer: boolean;
  creating: boolean;
  disabled: boolean;

  onQuestionTextChange: (
    value: string
  ) => void;

  onQuestionTypeChange: (
    value: QuestionType
  ) => void;

  onMarksChange: (
    value: string
  ) => void;

  onCorrectBooleanAnswerChange: (
    value: boolean
  ) => void;

  onSubmit: (
    event: FormEvent<HTMLFormElement>
  ) => void;
}

export default function AssessmentQuestionForm({
  questionText,
  questionType,
  marks,
  correctBooleanAnswer,
  creating,
  disabled,
  onQuestionTextChange,
  onQuestionTypeChange,
  onMarksChange,
  onCorrectBooleanAnswerChange,
  onSubmit,
}: AssessmentQuestionFormProps) {
  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          Add Question
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add objective, written, or
          coding questions to this
          assessment.
        </p>
      </div>

      {disabled ? (
        <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          Questions can only be added
          while the assessment is in
          DRAFT status.
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-6 space-y-5"
        >
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Question
            </label>

            <textarea
              rows={4}
              value={questionText}
              onChange={(event) =>
                onQuestionTextChange(
                  event.target.value
                )
              }
              placeholder="Enter the question..."
              className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Question Type
              </label>

              <select
                value={questionType}
                onChange={(event) =>
                  onQuestionTypeChange(
                    event.target
                      .value as QuestionType
                  )
                }
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="MULTIPLE_CHOICE">
                  Multiple Choice
                </option>

                <option value="TRUE_FALSE">
                  True / False
                </option>

                <option value="SHORT_ANSWER">
                  Short Answer
                </option>

                <option value="CODING">
                  Coding
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Marks
              </label>

              <input
                type="number"
                min={1}
                value={marks}
                onChange={(event) =>
                  onMarksChange(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {questionType ===
            "TRUE_FALSE" && (
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Correct Answer
              </p>

              <div className="mt-3 flex gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                  <input
                    type="radio"
                    checked={
                      correctBooleanAnswer
                    }
                    onChange={() =>
                      onCorrectBooleanAnswerChange(
                        true
                      )
                    }
                  />

                  True
                </label>

                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                  <input
                    type="radio"
                    checked={
                      !correctBooleanAnswer
                    }
                    onChange={() =>
                      onCorrectBooleanAnswerChange(
                        false
                      )
                    }
                  />

                  False
                </label>
              </div>
            </div>
          )}

          {questionType === "CODING" && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
              Create the coding question
              first. After creation, you
              can configure its language,
              starter code, constraints,
              sample tests, and hidden
              tests below.
            </div>
          )}

          <button
            type="submit"
            disabled={creating}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {creating
              ? "Creating..."
              : "Add Question"}
          </button>
        </form>
      )}
    </section>
  );
}