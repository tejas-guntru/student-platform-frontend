"use client";

import {
  useEffect,
  useState,
} from "react";

import type {
  InstructorCodingTestCaseResponse,
} from "@/types/assessment";

interface CodingTestCaseFormProps {
  editing:
    InstructorCodingTestCaseResponse | null;

  saving: boolean;

  onSave: (values: {
    inputData: string | null;
    expectedOutput: string;
    sample: boolean;
    marks: number;
  }) => void;

  onCancelEdit: () => void;
}

export default function CodingTestCaseForm({
  editing,
  saving,
  onSave,
  onCancelEdit,
}: CodingTestCaseFormProps) {
  const [inputData, setInputData] =
    useState("");

  const [
    expectedOutput,
    setExpectedOutput,
  ] = useState("");

  const [sample, setSample] =
    useState(true);

  const [marks, setMarks] =
    useState("1");

  useEffect(() => {
    if (!editing) {
      setInputData("");
      setExpectedOutput("");
      setSample(true);
      setMarks("1");
      return;
    }

    setInputData(
      editing.inputData ?? ""
    );

    setExpectedOutput(
      editing.expectedOutput
    );

    setSample(editing.sample);

    setMarks(
      String(editing.marks)
    );
  }, [editing]);

  const parsedMarks =
    Number(marks);

  const validMarks =
    marks.trim() !== "" &&
    Number.isInteger(parsedMarks) &&
    parsedMarks >= 0;

  const canSave =
    expectedOutput.trim().length > 0 &&
    validMarks;

  const handleSave = () => {
    if (!canSave) {
      return;
    }

    onSave({
      inputData:
        inputData.length > 0
          ? inputData
          : null,

      expectedOutput,

      sample,

      marks: parsedMarks,
    });
  };

  return (
    <div
      className="
        mt-5
        min-w-0
        overflow-hidden
        rounded-lg
        bg-slate-50
        p-3.5

        sm:p-4
      "
    >
      {/* HEADER */}

      <div className="min-w-0">
        <h5
          className="
            break-words
            font-semibold
            text-slate-900
          "
        >
          {editing
            ? "Edit Test Case"
            : "Add Test Case"}
        </h5>

        <p
          className="
            mt-1
            text-sm
            leading-6
            text-slate-500
          "
        >
          Define the input, expected
          output, visibility, and marks
          for this test.
        </p>
      </div>

      {/* INPUT + EXPECTED OUTPUT */}

      <div
        className="
          mt-4
          grid
          min-w-0
          gap-4

          lg:grid-cols-2
        "
      >
        <div className="min-w-0">
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
              htmlFor="coding-test-input"
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              Input
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
            id="coding-test-input"
            rows={5}
            value={inputData}
            disabled={saving}
            onChange={(event) =>
              setInputData(
                event.target.value
              )
            }
            placeholder="Input passed to the program..."
            spellCheck={false}
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
              p-3
              font-mono
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
            "
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="coding-test-output"
            className="
              text-sm
              font-medium
              text-slate-700
            "
          >
            Expected Output
          </label>

          <textarea
            id="coding-test-output"
            rows={5}
            value={expectedOutput}
            disabled={saving}
            onChange={(event) =>
              setExpectedOutput(
                event.target.value
              )
            }
            placeholder="Expected program output..."
            spellCheck={false}
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
              p-3
              font-mono
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
            "
          />

          {!expectedOutput.trim() && (
            <p
              className="
                mt-1.5
                text-xs
                leading-5
                text-slate-500
              "
            >
              Expected output is required.
            </p>
          )}
        </div>
      </div>

      {/* MARKS + VISIBILITY */}

      <div
        className="
          mt-4
          grid
          min-w-0
          gap-4

          sm:grid-cols-2
        "
      >
        <div className="min-w-0">
          <label
            htmlFor="coding-test-marks"
            className="
              text-sm
              font-medium
              text-slate-700
            "
          >
            Marks
          </label>

          <input
            id="coding-test-marks"
            type="number"
            min={0}
            step={1}
            value={marks}
            disabled={saving}
            onChange={(event) =>
              setMarks(
                event.target.value
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
              py-2.5
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
          />

          {!validMarks && (
            <p
              className="
                mt-1.5
                text-xs
                leading-5
                text-slate-500
              "
            >
              Enter a whole number of
              zero or more.
            </p>
          )}
        </div>

        <fieldset
          className="
            min-w-0
            rounded-lg
            border
            border-slate-200
            bg-white
            p-3
          "
        >
          <legend
            className="
              px-1
              text-sm
              font-medium
              text-slate-700
            "
          >
            Visibility
          </legend>

          <label
            className="
              flex
              min-h-10
              min-w-0
              cursor-pointer
              items-start
              gap-2.5
              text-sm
              leading-6
              text-slate-700
            "
          >
            <input
              type="checkbox"
              checked={sample}
              disabled={saving}
              onChange={(event) =>
                setSample(
                  event.target.checked
                )
              }
              className="
                mt-1
                h-4
                w-4
                shrink-0
                accent-[#1256AF]
              "
            />

            <span className="min-w-0">
              Sample / visible to student
            </span>
          </label>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-slate-500
            "
          >
            Turn this off to use the test
            only during hidden evaluation.
          </p>
        </fieldset>
      </div>

      {/* HIDDEN TEST WARNING */}

      {!sample && (
        <div
          className="
            mt-4
            min-w-0
            rounded-lg
            border
            border-amber-200
            bg-amber-50
            p-3
            text-sm
            leading-6
            text-amber-800
          "
          role="note"
        >
          This is a hidden test. Its input
          and expected output must never be
          shown to students.
        </div>
      )}

      {/* ACTIONS */}

      <div
        className="
          mt-4
          flex
          min-w-0
          flex-col
          gap-2.5

          sm:flex-row
          sm:items-center
          sm:gap-3
        "
      >
        <button
          type="button"
          disabled={
            saving || !canSave
          }
          onClick={handleSave}
          className="
            inline-flex
            min-h-11
            w-full
            items-center
            justify-center
            rounded-lg
            bg-slate-900
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition-colors

            hover:bg-slate-800

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-slate-300
            focus-visible:ring-offset-2

            disabled:cursor-not-allowed
            disabled:opacity-50

            sm:w-auto
          "
        >
          {saving
            ? "Saving..."
            : editing
              ? "Update Test"
              : "Add Test"}
        </button>

        {editing && (
          <button
            type="button"
            disabled={saving}
            onClick={
              onCancelEdit
            }
            className="
              inline-flex
              min-h-11
              w-full
              items-center
              justify-center
              rounded-lg
              border
              border-slate-300
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              transition-colors

              hover:bg-slate-100

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-slate-300
              focus-visible:ring-offset-2

              disabled:cursor-not-allowed
              disabled:opacity-50

              sm:w-auto
            "
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}