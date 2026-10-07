"use client";

import {
  useEffect,
  useState,
} from "react";

import type {
  CodingLanguage,
  InstructorCodingQuestionResponse,
} from "@/types/assessment";

interface CodingQuestionEditorProps {
  coding:
    InstructorCodingQuestionResponse | null;

  disabled: boolean;
  saving: boolean;

  onSave: (values: {
    language: CodingLanguage;
    starterCode: string | null;
    constraintsText: string | null;
  }) => void;
}

export default function CodingQuestionEditor({
  coding,
  disabled,
  saving,
  onSave,
}: CodingQuestionEditorProps) {
  const [language, setLanguage] =
    useState<CodingLanguage>(
      coding?.language ?? "JAVA"
    );

  const [
    starterCode,
    setStarterCode,
  ] = useState(
    coding?.starterCode ?? ""
  );

  const [
    constraintsText,
    setConstraintsText,
  ] = useState(
    coding?.constraintsText ?? ""
  );

  useEffect(() => {
    setLanguage(
      coding?.language ?? "JAVA"
    );

    setStarterCode(
      coding?.starterCode ?? ""
    );

    setConstraintsText(
      coding?.constraintsText ?? ""
    );
  }, [coding]);

  const handleSave = () => {
    onSave({
      language,

      starterCode:
        starterCode.trim()
          ? starterCode
          : null,

      constraintsText:
        constraintsText.trim()
          ? constraintsText
          : null,
    });
  };

  return (
    <div
      className="
        mt-5
        min-w-0
        overflow-hidden
        rounded-xl
        border
        border-blue-200
        bg-blue-50/40
        p-4

        sm:p-5
      "
    >
      {/* HEADER */}

      <div className="min-w-0">
        <h4
          className="
            break-words
            font-semibold
            text-slate-950
          "
        >
          Coding Configuration
        </h4>

        <p
          className="
            mt-1
            break-words
            text-sm
            leading-6
            text-slate-500
          "
        >
          Configure the language,
          starter code and constraints
          for this problem.
        </p>
      </div>

      {/* LANGUAGE */}

      <div
        className="
          mt-5
          min-w-0
        "
      >
        <label
          htmlFor="coding-language"
          className="
            text-sm
            font-semibold
            text-slate-700
          "
        >
          Language
        </label>

        <select
          id="coding-language"
          value={language}
          disabled={
            disabled || saving
          }
          onChange={(event) =>
            setLanguage(
              event.target
                .value as CodingLanguage
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
          <option value="JAVA">
            Java
          </option>

          <option value="PYTHON">
            Python
          </option>

          <option value="CPP">
            C++
          </option>

          <option value="JAVASCRIPT">
            JavaScript
          </option>
        </select>
      </div>

      {/* STARTER CODE */}

      <div
        className="
          mt-5
          min-w-0
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-wrap
            items-center
            justify-between
            gap-2
          "
        >
          <label
            htmlFor="coding-starter-code"
            className="
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Starter Code
          </label>

          <span
            className="
              text-xs
              text-slate-400
            "
          >
            Optional
          </span>
        </div>

        <textarea
          id="coding-starter-code"
          rows={10}
          value={starterCode}
          disabled={
            disabled || saving
          }
          onChange={(event) =>
            setStarterCode(
              event.target.value
            )
          }
          placeholder="Optional starter code..."
          spellCheck={false}
          className="
            mt-2
            min-w-0
            w-full
            max-w-full
            resize-y
            rounded-lg
            border
            border-slate-700
            bg-slate-950
            p-3
            font-mono
            text-sm
            leading-6
            text-slate-100
            outline-none
            transition

            placeholder:text-slate-500

            focus:border-blue-400
            focus:ring-4
            focus:ring-blue-500/10

            disabled:cursor-not-allowed
            disabled:opacity-70

            sm:p-4
          "
        />
      </div>

      {/* CONSTRAINTS */}

      <div
        className="
          mt-5
          min-w-0
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-wrap
            items-center
            justify-between
            gap-2
          "
        >
          <label
            htmlFor="coding-constraints"
            className="
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Constraints
          </label>

          <span
            className="
              text-xs
              text-slate-400
            "
          >
            Optional
          </span>
        </div>

        <textarea
          id="coding-constraints"
          rows={5}
          value={constraintsText}
          disabled={
            disabled || saving
          }
          onChange={(event) =>
            setConstraintsText(
              event.target.value
            )
          }
          placeholder={`Example:
1 <= n <= 100000
Input values fit within 32-bit integers.`}
          className="
            mt-2
            min-w-0
            w-full
            max-w-full
            resize-y
            rounded-lg
            border
            border-slate-300
            bg-white
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

      {/* SAVE */}

      {!disabled && (
        <div
          className="
            mt-5
            flex
            justify-stretch

            sm:justify-start
          "
        >
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="
              inline-flex
              min-h-11
              w-full
              items-center
              justify-center
              rounded-lg
              bg-[#1256AF]
              px-4
              py-2.5
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
            {saving
              ? "Saving..."
              : coding
                ? "Update Configuration"
                : "Create Configuration"}
          </button>
        </div>
      )}
    </div>
  );
}