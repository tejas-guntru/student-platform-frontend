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
      <div
        className="
          mt-5
          min-w-0
          rounded-lg
          border
          border-dashed
          border-slate-300
          bg-white
          p-4
          text-center
          text-sm
          leading-6
          text-slate-500

          sm:p-5
        "
      >
        No test cases have been added yet.
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
    <div
      className="
        mt-5
        min-w-0
        space-y-3
      "
    >
      {sorted.map(
        (testCase, index) => {
          const deleting =
            deletingId === testCase.id;

          return (
            <div
              key={testCase.id}
              className="
                min-w-0
                overflow-hidden
                rounded-lg
                border
                border-slate-200
                bg-white
                p-3.5

                sm:p-4
              "
            >
              {/* TEST HEADER */}

              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-3

                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                "
              >
                {/* META */}

                <div
                  className="
                    flex
                    min-w-0
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      font-semibold
                      text-slate-900
                    "
                  >
                    Test {index + 1}
                  </span>

                  <span
                    className={`
                      shrink-0
                      rounded-full
                      px-2.5
                      py-1
                      text-xs
                      font-semibold

                      ${
                        testCase.sample
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }
                    `}
                  >
                    {testCase.sample
                      ? "Sample"
                      : "Hidden"}
                  </span>

                  <span
                    className="
                      shrink-0
                      rounded-full
                      bg-slate-100
                      px-2.5
                      py-1
                      text-xs
                      font-semibold
                      text-slate-700
                    "
                  >
                    {testCase.marks}{" "}
                    {testCase.marks === 1
                      ? "mark"
                      : "marks"}
                  </span>
                </div>

                {/* ACTIONS */}

                {!disabled && (
                  <div
                    className="
                      flex
                      w-full
                      min-w-0
                      gap-2

                      sm:w-auto
                      sm:shrink-0
                    "
                  >
                    <button
                      type="button"
                      disabled={deleting}
                      onClick={() =>
                        onEdit(testCase)
                      }
                      className="
                        inline-flex
                        min-h-10
                        flex-1
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-300
                        bg-white
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-slate-700
                        transition-colors

                        hover:bg-slate-50

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-slate-300
                        focus-visible:ring-offset-2

                        disabled:cursor-not-allowed
                        disabled:opacity-50

                        sm:flex-none
                      "
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={deleting}
                      onClick={() =>
                        onDelete(
                          testCase.id
                        )
                      }
                      className="
                        inline-flex
                        min-h-10
                        flex-1
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-red-200
                        bg-white
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-red-600
                        transition-colors

                        hover:bg-red-50

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-red-200
                        focus-visible:ring-offset-2

                        disabled:cursor-not-allowed
                        disabled:opacity-50

                        sm:flex-none
                      "
                    >
                      {deleting
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                )}
              </div>

              {/* TEST DATA */}

              <div
                className="
                  mt-4
                  grid
                  min-w-0
                  gap-3

                  lg:grid-cols-2
                "
              >
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
          );
        }
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
    <div className="min-w-0">
      <p
        className="
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-slate-400
        "
      >
        {label}
      </p>

      <pre
        className="
          mt-2
          max-w-full
          overflow-x-auto
          whitespace-pre-wrap
          break-words
          rounded-lg
          bg-slate-950
          p-3
          font-mono
          text-xs
          leading-5
          text-slate-100
        "
      >
        {value}
      </pre>
    </div>
  );
}