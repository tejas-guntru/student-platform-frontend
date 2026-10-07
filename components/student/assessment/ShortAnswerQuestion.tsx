"use client";

interface ShortAnswerQuestionProps {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

export default function ShortAnswerQuestion({
  value,
  disabled,
  onChange,
}: ShortAnswerQuestionProps) {
  return (
    <div
      className="
        mt-5
        min-w-0
      "
    >
      <label
        htmlFor="short-answer"
        className="
          text-sm
          font-semibold
          text-slate-700
        "
      >
        Your answer
      </label>

      <textarea
        id="short-answer"
        rows={5}
        disabled={disabled}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Enter your answer..."
        className="
          mt-2
          min-h-[140px]
          min-w-0
          w-full
          max-w-full
          resize-y
          rounded-xl
          border
          border-slate-300
          bg-white
          px-3.5
          py-3
          text-sm
          leading-6
          text-slate-800
          outline-none
          transition

          placeholder:text-slate-400

          focus:border-[#1256AF]
          focus:ring-2
          focus:ring-[#1256AF]/10

          disabled:cursor-not-allowed
          disabled:bg-slate-50
          disabled:text-slate-500

          sm:min-h-[150px]
          sm:px-4
        "
      />

      {!disabled && (
        <p
          className="
            mt-1.5
            text-xs
            leading-5
            text-slate-400
          "
        >
          Write a clear and complete
          response before saving your
          answer.
        </p>
      )}
    </div>
  );
}