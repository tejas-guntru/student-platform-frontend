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
    <div className="mt-5 border-t border-slate-100 pt-5">
      <h4 className="font-semibold text-slate-900">
        Options
      </h4>

      {options.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">
          No options added yet.
        </p>
      ) : (
        <div className="mt-3 space-y-2">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
            >
              <span className="text-sm text-slate-800">
                {option.optionText}
              </span>

              {option.correct && (
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                  Correct
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {!disabled && (
        <div className="mt-4 rounded-lg bg-slate-50 p-4">
          <input
            type="text"
            value={optionText}
            onChange={(event) =>
              onTextChange(
                event.target.value
              )
            }
            placeholder="Option text"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
          />

          <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={correct}
              onChange={(event) =>
                onCorrectChange(
                  event.target.checked
                )
              }
            />

            Correct option
          </label>

          <button
            type="button"
            disabled={creating}
            onClick={onCreate}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
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