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
    <textarea
      rows={5}
      disabled={disabled}
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      placeholder="Enter your answer..."
      className="
        mt-5
        w-full
        resize-none
        rounded-lg
        border
        border-slate-300
        px-4
        py-3
        text-sm
        text-slate-800
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/10
        disabled:cursor-not-allowed
        disabled:bg-slate-50
      "
    />
  );
}