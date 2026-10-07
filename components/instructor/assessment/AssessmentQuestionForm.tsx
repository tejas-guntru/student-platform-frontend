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
    <section
      className="
        mt-8
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

      <div className="min-w-0">
        <h2
          className="
            break-words
            text-lg
            font-semibold
            text-slate-950

            sm:text-xl
          "
        >
          Add Question
        </h2>

        <p
          className="
            mt-1
            break-words
            text-sm
            leading-6
            text-slate-500
          "
        >
          Add objective, written, or coding
          questions to this assessment.
        </p>
      </div>

      {disabled ? (
        <div
          className="
            mt-5
            min-w-0
            rounded-lg
            bg-slate-50
            p-4
            text-sm
            leading-6
            text-slate-600
          "
        >
          Questions can only be added while
          the assessment is in DRAFT status.
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="
            mt-6
            min-w-0
            space-y-5
          "
        >
          {/* QUESTION */}

          <div className="min-w-0">
            <label
              htmlFor="assessment-question"
              className="
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Question
            </label>

            <textarea
              id="assessment-question"
              rows={4}
              value={questionText}
              disabled={creating}
              onChange={(event) =>
                onQuestionTextChange(
                  event.target.value
                )
              }
              placeholder="Enter the question..."
              className="
                mt-2
                min-w-0
                w-full
                resize-y
                rounded-lg
                border
                border-slate-300
                px-3.5
                py-3
                text-sm
                leading-6
                text-slate-950
                outline-none
                transition

                placeholder:text-slate-400

                focus:border-[#1256AF]
                focus:ring-4
                focus:ring-blue-50

                disabled:cursor-not-allowed
                disabled:bg-slate-100
                disabled:text-slate-500

                sm:px-4
              "
            />
          </div>

          {/* TYPE + MARKS */}

          <div
            className="
              grid
              min-w-0
              gap-5

              md:grid-cols-2
            "
          >
            <div className="min-w-0">
              <label
                htmlFor="question-type"
                className="
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Question Type
              </label>

              <select
                id="question-type"
                value={questionType}
                disabled={creating}
                onChange={(event) =>
                  onQuestionTypeChange(
                    event.target
                      .value as QuestionType
                  )
                }
                className="
                  mt-2
                  min-h-11
                  min-w-0
                  w-full
                  max-w-full
                  rounded-lg
                  border
                  border-slate-300
                  bg-white
                  px-3.5
                  py-3
                  text-sm
                  text-slate-950
                  outline-none
                  transition

                  focus:border-[#1256AF]
                  focus:ring-4
                  focus:ring-blue-50

                  disabled:cursor-not-allowed
                  disabled:bg-slate-100
                  disabled:text-slate-500

                  sm:px-4
                "
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

            <div className="min-w-0">
              <label
                htmlFor="question-marks"
                className="
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Marks
              </label>

              <input
                id="question-marks"
                type="number"
                min={1}
                value={marks}
                disabled={creating}
                onChange={(event) =>
                  onMarksChange(
                    event.target.value
                  )
                }
                className="
                  mt-2
                  min-h-11
                  min-w-0
                  w-full
                  max-w-full
                  rounded-lg
                  border
                  border-slate-300
                  px-3.5
                  py-3
                  text-sm
                  text-slate-950
                  outline-none
                  transition

                  focus:border-[#1256AF]
                  focus:ring-4
                  focus:ring-blue-50

                  disabled:cursor-not-allowed
                  disabled:bg-slate-100
                  disabled:text-slate-500

                  sm:px-4
                "
              />
            </div>
          </div>

          {/* TRUE / FALSE */}

          {questionType ===
            "TRUE_FALSE" && (
            <fieldset className="min-w-0">
              <legend
                className="
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Correct Answer
              </legend>

              <div
                className="
                  mt-3
                  grid
                  min-w-0
                  gap-3

                  sm:grid-cols-2
                "
              >
                <label
                  className={`
                    flex
                    min-h-11
                    min-w-0
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-lg
                    border
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition

                    ${
                      correctBooleanAnswer
                        ? "border-blue-300 bg-blue-50 text-blue-800"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="correct-boolean-answer"
                    checked={
                      correctBooleanAnswer
                    }
                    disabled={creating}
                    onChange={() =>
                      onCorrectBooleanAnswerChange(
                        true
                      )
                    }
                    className="
                      h-4
                      w-4
                      shrink-0
                      accent-[#1256AF]
                    "
                  />

                  <span>True</span>
                </label>

                <label
                  className={`
                    flex
                    min-h-11
                    min-w-0
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-lg
                    border
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition

                    ${
                      !correctBooleanAnswer
                        ? "border-blue-300 bg-blue-50 text-blue-800"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="correct-boolean-answer"
                    checked={
                      !correctBooleanAnswer
                    }
                    disabled={creating}
                    onChange={() =>
                      onCorrectBooleanAnswerChange(
                        false
                      )
                    }
                    className="
                      h-4
                      w-4
                      shrink-0
                      accent-[#1256AF]
                    "
                  />

                  <span>False</span>
                </label>
              </div>
            </fieldset>
          )}

          {/* CODING INFO */}

          {questionType === "CODING" && (
            <div
              className="
                min-w-0
                rounded-lg
                border
                border-blue-200
                bg-blue-50
                p-4
                text-sm
                leading-6
                text-blue-800
              "
            >
              Create the coding question
              first. After creation, you can
              configure its language, starter
              code, constraints, sample tests,
              and hidden tests below.
            </div>
          )}

          {/* SUBMIT */}

          <div
            className="
              flex
              justify-stretch

              sm:justify-start
            "
          >
            <button
              type="submit"
              disabled={
                creating ||
                !questionText.trim() ||
                !marks
              }
              className="
                inline-flex
                min-h-11
                w-full
                items-center
                justify-center
                rounded-lg
                bg-[#1256AF]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition-colors

                hover:bg-[#0F4B99]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#1256AF]/30
                focus-visible:ring-offset-2

                disabled:cursor-not-allowed
                disabled:opacity-50

                sm:w-auto
              "
            >
              {creating
                ? "Creating..."
                : "Add Question"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}