"use client";

interface TrueFalseQuestionProps {
  questionId: string;
  value: boolean | null;
  disabled: boolean;
  onChange: (value: boolean) => void;
}

export default function TrueFalseQuestion({
  questionId,
  value,
  disabled,
  onChange,
}: TrueFalseQuestionProps) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <label
        className={`
          flex items-center gap-3 rounded-lg border p-4
          ${
            value === true
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
          name={questionId}
          disabled={disabled}
          checked={value === true}
          onChange={() => onChange(true)}
          className="h-4 w-4"
        />

        <span className="font-medium text-slate-800">
          True
        </span>
      </label>

      <label
        className={`
          flex items-center gap-3 rounded-lg border p-4
          ${
            value === false
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
          name={questionId}
          disabled={disabled}
          checked={value === false}
          onChange={() => onChange(false)}
          className="h-4 w-4"
        />

        <span className="font-medium text-slate-800">
          False
        </span>
      </label>
    </div>
  );
}