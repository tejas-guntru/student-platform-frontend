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

  return (
    <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50/40 p-5">
      <div>
        <h4 className="font-semibold text-slate-950">
          Coding Configuration
        </h4>

        <p className="mt-1 text-sm text-slate-500">
          Configure the language,
          starter code and constraints
          for this problem.
        </p>
      </div>

      <div className="mt-5">
        <label className="text-sm font-semibold text-slate-700">
          Language
        </label>

        <select
          value={language}
          disabled={disabled}
          onChange={(event) =>
            setLanguage(
              event.target
                .value as CodingLanguage
            )
          }
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 disabled:bg-slate-100"
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

      <div className="mt-5">
        <label className="text-sm font-semibold text-slate-700">
          Starter Code
        </label>

        <textarea
          rows={10}
          value={starterCode}
          disabled={disabled}
          onChange={(event) =>
            setStarterCode(
              event.target.value
            )
          }
          placeholder="Optional starter code..."
          spellCheck={false}
          className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-slate-950 p-4 font-mono text-sm text-slate-100 outline-none focus:border-blue-500 disabled:opacity-70"
        />
      </div>

      <div className="mt-5">
        <label className="text-sm font-semibold text-slate-700">
          Constraints
        </label>

        <textarea
          rows={5}
          value={constraintsText}
          disabled={disabled}
          onChange={(event) =>
            setConstraintsText(
              event.target.value
            )
          }
          placeholder={`Example:
1 <= n <= 100000
Input values fit within 32-bit integers.`}
          className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 disabled:bg-slate-100"
        />
      </div>

      {!disabled && (
        <button
          type="button"
          disabled={saving}
          onClick={() =>
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
            })
          }
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : coding
              ? "Update Configuration"
              : "Create Configuration"}
        </button>
      )}
    </div>
  );
}