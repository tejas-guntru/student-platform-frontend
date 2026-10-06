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

  const handleSave = () => {
    const parsedMarks =
      Number(marks);

    if (
      !expectedOutput.trim() ||
      !Number.isInteger(
        parsedMarks
      ) ||
      parsedMarks < 0
    ) {
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
    <div className="mt-5 rounded-lg bg-slate-50 p-4">
      <h5 className="font-semibold text-slate-900">
        {editing
          ? "Edit Test Case"
          : "Add Test Case"}
      </h5>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Input
          </label>

          <textarea
            rows={5}
            value={inputData}
            onChange={(event) =>
              setInputData(
                event.target.value
              )
            }
            placeholder="Input passed to the program..."
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white p-3 font-mono text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Expected Output
          </label>

          <textarea
            rows={5}
            value={expectedOutput}
            onChange={(event) =>
              setExpectedOutput(
                event.target.value
              )
            }
            placeholder="Expected program output..."
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white p-3 font-mono text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Marks
          </label>

          <input
            type="number"
            min={0}
            value={marks}
            onChange={(event) =>
              setMarks(
                event.target.value
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700">
            Visibility
          </p>

          <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={sample}
              onChange={(event) =>
                setSample(
                  event.target.checked
                )
              }
            />

            Sample / visible to
            student
          </label>
        </div>
      </div>

      {!sample && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          This is a hidden test. Its
          input and expected output must
          never be shown to students.
        </div>
      )}

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          disabled={saving}
          onClick={handleSave}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
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
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}