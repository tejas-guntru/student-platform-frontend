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
    <div className="mt-5 space-y-3">
      {question.options.map((option) => {
        const selected =
          selectedOptionId === option.id;

        return (
          <label
            key={option.id}
            className={`
              flex items-center gap-3 rounded-lg border p-4
              ${
                selected
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white"
              }
              ${
                disabled
                  ? "cursor-default opacity-80"
                  : "cursor-pointer hover:border-slate-300"
              }
            `}
          >
            <input
              type="radio"
              name={question.id}
              disabled={disabled}
              checked={selected}
              onChange={() =>
                onChange(option.id)
              }
              className="h-4 w-4"
            />

            <span className="text-sm text-slate-800">
              {option.optionText}
            </span>
          </label>
        );
      })}
    </div>
  );
}