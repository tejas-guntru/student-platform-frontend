"use client";

import type {
  InstructorCodingTestCaseResponse,
} from "@/types/assessment";

interface CodingTestCaseListProps {
  testCases:
    InstructorCodingTestCaseResponse[];

  disabled: boolean;
  deletingId: string | null;

  onEdit: (
    testCase:
      InstructorCodingTestCaseResponse
  ) => void;

  onDelete: (
    testCaseId: string
  ) => void;
}

export default function CodingTestCaseList({
  testCases,
  disabled,
  deletingId,
  onEdit,
  onDelete,
}: CodingTestCaseListProps) {
  if (testCases.length === 0) {
    return (
      <div className="mt-5 rounded-lg border border-dashed border-slate-300 p-5 text-sm text-slate-500">
        No test cases have been added
        yet.
      </div>
    );
  }

  const sorted = [
    ...testCases,
  ].sort(
    (a, b) =>
      a.position - b.position
  );

  return (
    <div className="mt-5 space-y-3">
      {sorted.map(
        (testCase, index) => (
          <div
            key={testCase.id}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-900">
                  Test {index + 1}
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    testCase.sample
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {testCase.sample
                    ? "Sample"
                    : "Hidden"}
                </span>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {testCase.marks}{" "}
                  {testCase.marks === 1
                    ? "mark"
                    : "marks"}
                </span>
              </div>

              {!disabled && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onEdit(
                        testCase
                      )
                    }
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={
                      deletingId ===
                      testCase.id
                    }
                    onClick={() =>
                      onDelete(
                        testCase.id
                      )
                    }
                    className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 disabled:opacity-50"
                  >
                    {deletingId ===
                    testCase.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              <CodeBox
                label="Input"
                value={
                  testCase.inputData ??
                  "(empty)"
                }
              />

              <CodeBox
                label="Expected Output"
                value={
                  testCase.expectedOutput
                }
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}

function CodeBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg bg-slate-950 p-3 text-xs text-slate-100">
        {value}
      </pre>
    </div>
  );
}