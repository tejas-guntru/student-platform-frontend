"use client";

import type {
  InstructorAssessmentQuestionOptionResponse,
} from "@/types/assessment";

interface MultipleChoiceOptionManagerProps {
  options:
    InstructorAssessmentQuestionOptionResponse[];

  optionText: string;
  correct: boolean;
  creating: boolean;
  disabled: boolean;

  onTextChange: (
    value: string
  ) => void;

  onCorrectChange: (
    value: boolean
  ) => void;

  onCreate: () => void;
}

export default function MultipleChoiceOptionManager({
  options,
  optionText,
  correct,
  creating,
  disabled,
  onTextChange,
  onCorrectChange,
  onCreate,
}: MultipleChoiceOptionManagerProps) {
  return (
    <div
      className="
        mt-5
        min-w-0
        border-t
        border-slate-100
        pt-5
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          min-w-0
          items-center
          justify-between
          gap-3
        "
      >
        <h4
          className="
            min-w-0
            break-words
            font-semibold
            text-slate-900
          "
        >
          Options
        </h4>

        {options.length > 0 && (
          <span
            className="
              shrink-0
              rounded-full
              bg-slate-100
              px-2.5
              py-1
              text-xs
              font-semibold
              text-slate-600
            "
            aria-label={`${options.length} options`}
          >
            {options.length}
          </span>
        )}
      </div>

      {/* EXISTING OPTIONS */}

      {options.length === 0 ? (
        <p
          className="
            mt-3
            text-sm
            leading-6
            text-slate-500
          "
        >
          No options added yet.
        </p>
      ) : (
        <div
          className="
            mt-3
            min-w-0
            space-y-2
          "
        >
          {options.map((option, index) => (
            <div
              key={option.id}
              className="
                flex
                min-w-0
                flex-col
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-white
                p-3

                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:gap-3
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  flex-1
                  items-start
                  gap-2.5
                "
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    text-[11px]
                    font-bold
                    text-slate-500
                  "
                  aria-hidden="true"
                >
                  {index + 1}
                </span>

                <span
                  className="
                    min-w-0
                    flex-1
                    break-words
                    text-sm
                    leading-6
                    text-slate-800
                  "
                >
                  {option.optionText}
                </span>
              </div>

              {option.correct && (
                <span
                  className="
                    w-fit
                    shrink-0
                    rounded-full
                    bg-green-100
                    px-2.5
                    py-1
                    text-xs
                    font-semibold
                    text-green-700
                  "
                >
                  Correct
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ADD OPTION */}

      {!disabled && (
        <div
          className="
            mt-4
            min-w-0
            rounded-lg
            bg-slate-50
            p-3.5

            sm:p-4
          "
        >
          <div className="min-w-0">
            <label
              htmlFor="multiple-choice-option"
              className="
                text-xs
                font-semibold
                text-slate-700
              "
            >
              Option text
            </label>

            <input
              id="multiple-choice-option"
              type="text"
              value={optionText}
              disabled={creating}
              onChange={(event) =>
                onTextChange(
                  event.target.value
                )
              }
              placeholder="Enter option text"
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
                py-2.5
                text-sm
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

          <label
            className="
              mt-3
              flex
              min-h-10
              w-fit
              cursor-pointer
              items-center
              gap-2.5
              rounded-lg
              text-sm
              text-slate-700
            "
          >
            <input
              type="checkbox"
              checked={correct}
              disabled={creating}
              onChange={(event) =>
                onCorrectChange(
                  event.target.checked
                )
              }
              className="
                h-4
                w-4
                shrink-0
                accent-[#1256AF]
              "
            />

            <span>Correct option</span>
          </label>

          <button
            type="button"
            disabled={
              creating ||
              !optionText.trim()
            }
            onClick={onCreate}
            className="
              mt-4
              inline-flex
              min-h-11
              w-full
              items-center
              justify-center
              rounded-lg
              bg-slate-900
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition-colors

              hover:bg-slate-800

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-slate-300
              focus-visible:ring-offset-2

              disabled:cursor-not-allowed
              disabled:opacity-50

              sm:w-auto
            "
          >
            {creating
              ? "Adding..."
              : "Add Option"}
          </button>
        </div>
      )}
    </div>
  );
}