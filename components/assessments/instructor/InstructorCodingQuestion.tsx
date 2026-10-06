"use client";

import axios from "axios";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import CodingQuestionEditor from "./CodingQuestionEditor";
import CodingTestCaseForm from "./CodingTestCaseForm";
import CodingTestCaseList from "./CodingTestCaseList";

import {
  createCodingQuestion,
  createCodingTestCase,
  deleteCodingTestCase,
  getCodingQuestion,
  updateCodingQuestion,
  updateCodingTestCase,
} from "@/services/instructorAssessmentService";

import type {
  CodingLanguage,
  InstructorCodingQuestionResponse,
  InstructorCodingTestCaseResponse,
} from "@/types/assessment";

interface InstructorCodingQuestionProps {
  batchId: string;
  assessmentId: string;
  questionId: string;
  disabled: boolean;

  onError: (
    message: string
  ) => void;

  onMessage: (
    message: string
  ) => void;

  onAuthFailure: () => void;
}

export default function InstructorCodingQuestion({
  batchId,
  assessmentId,
  questionId,
  disabled,
  onError,
  onMessage,
  onAuthFailure,
}: InstructorCodingQuestionProps) {
  const [coding, setCoding] =
    useState<InstructorCodingQuestionResponse | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [
    savingConfiguration,
    setSavingConfiguration,
  ] = useState(false);

  const [
    savingTestCase,
    setSavingTestCase,
  ] = useState(false);

  const [
    deletingTestCaseId,
    setDeletingTestCaseId,
  ] = useState<string | null>(
    null
  );

  const [
    editingTestCase,
    setEditingTestCase,
  ] =
    useState<InstructorCodingTestCaseResponse | null>(
      null
    );

  const loadCoding =
    useCallback(async () => {
      setLoading(true);

      try {
        const response =
          await getCodingQuestion(
            batchId,
            assessmentId,
            questionId
          );

        setCoding(response);
      } catch (error: unknown) {
        if (
          axios.isAxiosError(error)
        ) {
          if (
            error.response?.status ===
              401 ||
            error.response?.status ===
              403
          ) {
            onAuthFailure();
            return;
          }

          // A coding question may exist
          // before its coding configuration
          // has been created.
          if (
            error.response?.status ===
            404
          ) {
            setCoding(null);
            return;
          }

          onError(
            error.response?.data
              ?.message ||
              "Could not load coding configuration."
          );

          return;
        }

        onError(
          "Could not load coding configuration."
        );
      } finally {
        setLoading(false);
      }
    }, [
      assessmentId,
      batchId,
      onAuthFailure,
      onError,
      questionId,
    ]);

  useEffect(() => {
    loadCoding();
  }, [loadCoding]);

  const handleSaveConfiguration =
    async (values: {
      language: CodingLanguage;
      starterCode: string | null;
      constraintsText:
        | string
        | null;
    }) => {
      setSavingConfiguration(true);

      onError("");
      onMessage("");

      try {
        const response = coding
          ? await updateCodingQuestion(
              batchId,
              assessmentId,
              questionId,
              values
            )
          : await createCodingQuestion(
              batchId,
              assessmentId,
              questionId,
              values
            );

        setCoding(response);

        onMessage(
          coding
            ? "Coding configuration updated."
            : "Coding configuration created."
        );
      } catch (error: unknown) {
        handleRequestError(
          error,
          "Could not save coding configuration."
        );
      } finally {
        setSavingConfiguration(
          false
        );
      }
    };

  const handleSaveTestCase =
    async (values: {
      inputData: string | null;
      expectedOutput: string;
      sample: boolean;
      marks: number;
    }) => {
      if (!coding) {
        onError(
          "Create the coding configuration before adding test cases."
        );
        return;
      }

      setSavingTestCase(true);

      onError("");
      onMessage("");

      try {
        if (editingTestCase) {
          await updateCodingTestCase(
            batchId,
            assessmentId,
            questionId,
            editingTestCase.id,
            values
          );

          onMessage(
            "Test case updated."
          );
        } else {
          await createCodingTestCase(
            batchId,
            assessmentId,
            questionId,
            values
          );

          onMessage(
            "Test case added."
          );
        }

        setEditingTestCase(null);

        await loadCoding();
      } catch (error: unknown) {
        handleRequestError(
          error,
          "Could not save test case."
        );
      } finally {
        setSavingTestCase(false);
      }
    };

  const handleDeleteTestCase =
    async (
      testCaseId: string
    ) => {
      const confirmed =
        window.confirm(
          "Delete this test case?"
        );

      if (!confirmed) {
        return;
      }

      setDeletingTestCaseId(
        testCaseId
      );

      onError("");
      onMessage("");

      try {
        await deleteCodingTestCase(
          batchId,
          assessmentId,
          questionId,
          testCaseId
        );

        if (
          editingTestCase?.id ===
          testCaseId
        ) {
          setEditingTestCase(
            null
          );
        }

        await loadCoding();

        onMessage(
          "Test case deleted."
        );
      } catch (error: unknown) {
        handleRequestError(
          error,
          "Could not delete test case."
        );
      } finally {
        setDeletingTestCaseId(
          null
        );
      }
    };

  const handleRequestError = (
    error: unknown,
    fallback: string
  ) => {
    console.error(
      "CODING ASSESSMENT ERROR:",
      error
    );

    if (
      axios.isAxiosError(error)
    ) {
      if (
        error.response?.status ===
          401 ||
        error.response?.status ===
          403
      ) {
        onAuthFailure();
        return;
      }

      onError(
        error.response?.data
          ?.message || fallback
      );

      return;
    }

    onError(fallback);
  };

  if (loading) {
    return (
      <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
        Loading coding
        configuration...
      </div>
    );
  }

  return (
    <div className="mt-5">
      <CodingQuestionEditor
        coding={coding}
        disabled={disabled}
        saving={
          savingConfiguration
        }
        onSave={
          handleSaveConfiguration
        }
      />

      {coding && (
        <div className="mt-5 rounded-xl border border-slate-200 p-5">
          <div>
            <h4 className="font-semibold text-slate-950">
              Test Cases
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              Sample tests are visible
              to students. Hidden tests
              are used only during final
              code submission.
            </p>
          </div>

          <CodingTestCaseList
            testCases={
              coding.testCases
            }
            disabled={disabled}
            deletingId={
              deletingTestCaseId
            }
            onEdit={
              setEditingTestCase
            }
            onDelete={
              handleDeleteTestCase
            }
          />

          {!disabled && (
            <CodingTestCaseForm
              editing={
                editingTestCase
              }
              saving={
                savingTestCase
              }
              onSave={
                handleSaveTestCase
              }
              onCancelEdit={() =>
                setEditingTestCase(
                  null
                )
              }
            />
          )}
        </div>
      )}
    </div>
  );
}