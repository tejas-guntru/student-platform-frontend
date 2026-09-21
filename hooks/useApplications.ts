"use client";

import axios from "axios";

import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";

import {
  getMyApplications,
  uploadResume,
} from "@/services/applicationService";

import type {
  ApplicationResponse,
} from "@/types/application";

export function useApplications() {
  const [
    applications,
    setApplications,
  ] =
    useState<ApplicationResponse[]>(
      []
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    uploadingId,
    setUploadingId,
  ] =
    useState<string | null>(
      null
    );

  const [
    selectedFiles,
    setSelectedFiles,
  ] =
    useState<
      Record<
        string,
        File | null
      >
    >({});

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  // =========================================
  // ERROR
  // =========================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {
    console.error(error);

    if (
      axios.isAxiosError(error)
    ) {
      if (
        error.response?.status ===
          401 ||
        error.response?.status ===
          403
      ) {
        localStorage.clear();

        window.location.href =
          "/login";

        return;
      }

      setError(
        error.response
          ?.data?.message ||
          fallback
      );

      return;
    }

    setError(fallback);
  };

  // =========================================
  // LOAD APPLICATIONS
  // =========================================

  const loadApplications =
    async () => {
      setError("");

      try {
        const response =
          await getMyApplications();

        setApplications(
          Array.isArray(
            response
          )
            ? response
            : []
        );
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          "Unable to load applications."
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================================
  // INITIAL LOAD
  // =========================================

  useEffect(() => {
    const load =
      async () => {
        const token =
          localStorage.getItem(
            "token"
          );

        const role =
          localStorage.getItem(
            "role"
          );

        if (
          !token ||
          role !== "STUDENT"
        ) {
          window.location.href =
            "/login";

          return;
        }

        await loadApplications();
      };

    load();
  }, []);

  // =========================================
  // FILE SELECT
  // =========================================

  const handleFileChange = (
    applicationId: string,
    event:
      ChangeEvent<HTMLInputElement>
  ) => {
    setError("");
    setSuccess("");

    const file =
      event.target
        .files?.[0];

    if (!file) {
      setSelectedFiles(
        (current) => ({
          ...current,
          [applicationId]:
            null,
        })
      );

      return;
    }

    const isPdf =
      file.type ===
        "application/pdf" ||
      file.name
        .toLowerCase()
        .endsWith(".pdf");

    if (!isPdf) {
      setError(
        "Please select a PDF resume."
      );

      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (
      file.size > maxSize
    ) {
      setError(
        "Resume must be 5 MB or smaller."
      );

      return;
    }

    setSelectedFiles(
      (current) => ({
        ...current,
        [applicationId]:
          file,
      })
    );
  };

  // =========================================
  // UPLOAD RESUME
  // =========================================

  const handleResumeUpload =
    async (
      applicationId:
        string
    ) => {
      setError("");
      setSuccess("");

      const file =
        selectedFiles[
          applicationId
        ];

      if (!file) {
        setError(
          "Select a PDF resume first."
        );

        return;
      }

      setUploadingId(
        applicationId
      );

      try {
        const uploaded =
          await uploadResume(
            applicationId,
            file
          );

        setSuccess(
          `${uploaded.originalFileName} uploaded successfully.`
        );

        setSelectedFiles(
          (current) => ({
            ...current,
            [applicationId]:
              null,
          })
        );

        await loadApplications();
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          "Unable to upload resume."
        );
      } finally {
        setUploadingId(
          null
        );
      }
    };

  return {
    applications,

    loading,
    uploadingId,
    selectedFiles,

    error,
    success,

    handleFileChange,
    handleResumeUpload,
  };
}