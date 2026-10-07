"use client";

import type {
  StudentAssessmentQuestionResponse,
} from "@/types/assessment";

interface MultipleChoiceQuestionProps {
  question: StudentAssessmentQuestionResponse;
  selectedOptionId: string | null;
  disabled: boolean;
  onChange: (optionId: string) => void;
}

export default function MultipleChoiceQuestion({
  question,
  selectedOptionId,
  disabled,
  onChange,
}: MultipleChoiceQuestionProps) {
  return (
    <div
      className="
        mt-5
        min-w-0
        space-y-3
      "
      role="radiogroup"
      aria-label="Answer options"
    >
      {question.options.map(
        (option, index) => {
          const selected =
            selectedOptionId ===
            option.id;

          return (
            <label
              key={option.id}
              className={`
                flex
                min-w-0
                items-start
                gap-3
                rounded-xl
                border
                p-3.5
                transition-colors

                sm:p-4

                ${
                  selected
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white"
                }

                ${
                  disabled
                    ? "cursor-default opacity-80"
                    : "cursor-pointer hover:border-blue-300 hover:bg-blue-50/30"
                }

                focus-within:ring-2
                focus-within:ring-[#1256AF]/20
                focus-within:ring-offset-1
              `}
            >
              <input
                type="radio"
                name={question.id}
                value={option.id}
                disabled={disabled}
                checked={selected}
                onChange={() =>
                  onChange(option.id)
                }
                className="
                  mt-0.5
                  h-5
                  w-5
                  shrink-0
                  cursor-pointer
                  accent-[#1256AF]

                  disabled:cursor-default
                "
              />

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
                  className={`
                    inline-flex
                    h-6
                    min-w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    px-1
                    text-xs
                    font-bold

                    ${
                      selected
                        ? "bg-[#1256AF] text-white"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                  aria-hidden="true"
                >
                  {String.fromCharCode(
                    65 + index
                  )}
                </span>

                <span
                  className="
                    min-w-0
                    break-words
                    text-sm
                    leading-6
                    text-slate-800
                  "
                >
                  {option.optionText}
                </span>
              </div>
            </label>
          );
        }
      )}
    </div>
  );
}