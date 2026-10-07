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
  const options = [
    {
      label: "True",
      value: true,
    },
    {
      label: "False",
      value: false,
    },
  ];

  return (
    <fieldset
      className="
        mt-5
        min-w-0
      "
    >
      <legend className="sr-only">
        Select true or false
      </legend>

      <div
        className="
          grid
          min-w-0
          grid-cols-1
          gap-3

          sm:grid-cols-2
        "
      >
        {options.map((option) => {
          const selected =
            value === option.value;

          return (
            <label
              key={option.label}
              className={`
                flex
                min-h-12
                min-w-0
                items-center
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
                name={questionId}
                value={
                  option.value
                    ? "true"
                    : "false"
                }
                disabled={disabled}
                checked={selected}
                onChange={() =>
                  onChange(option.value)
                }
                className="
                  h-5
                  w-5
                  shrink-0
                  cursor-pointer
                  accent-[#1256AF]

                  disabled:cursor-default
                "
              />

              <span
                className="
                  min-w-0
                  break-words
                  text-sm
                  font-semibold
                  text-slate-800
                "
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}