"use client";

import axios from "axios";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  downloadApplicationResume,
  getAdminApplications,
  updateApplicationStatus,
} from "@/services/adminService";

import type {
  AdminApplication,
} from "@/types/admin";

import type {
  ApplicationStatus,
} from "@/types/application";

import {
  formatAdminApplicationStatus,
} from "@/utils/adminApplicationUtils";

import ApplicationsHeader from "@/components/admin/applications/ApplicationsHeader";

import ApplicationsSummary from "@/components/admin/applications/ApplicationsSummary";

import ApplicationFilters from "@/components/admin/applications/ApplicationFilters";

import ApplicationsList from "@/components/admin/applications/ApplicationsList";

export default function AdminApplicationsPage() {
  // =========================================================
  // STATE
  // =========================================================

  const [
    applications,
    setApplications,
  ] = useState<
    AdminApplication[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    updatingId,
    setUpdatingId,
  ] = useState<
    string | null
  >(null);

  const [
    downloadingId,
    setDownloadingId,
  ] = useState<
    string | null
  >(null);

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<
    ApplicationStatus | "ALL"
  >("ALL");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  // =========================================================
  // LOAD
  // =========================================================

  useEffect(() => {
    const loadPage =
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
          role !== "ADMIN"
        ) {
          window.location.href =
            "/login";

          return;
        }

        await loadApplications();
      };

    loadPage();
  }, []);

  // =========================================================
  // LOAD APPLICATIONS
  // =========================================================

  const loadApplications =
    async () => {
      setError("");

      try {
        const response =
          await getAdminApplications();

        setApplications(
          Array.isArray(response)
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

  // =========================================================
  // ERROR HANDLING
  // =========================================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {
    console.error(error);

    if (
      axios.isAxiosError(
        error
      )
    ) {
      if (
        error.response
          ?.status === 401 ||
        error.response
          ?.status === 403
      ) {
        localStorage.clear();

        window.location.href =
          "/login";

        return;
      }

      setError(
        error.response?.data
          ?.message ||
          fallback
      );

      return;
    }

    setError(fallback);
  };

  // =========================================================
  // UPDATE STATUS
  // =========================================================

  const handleStatusUpdate =
    async (
      application:
        AdminApplication,

      newStatus:
        ApplicationStatus
    ) => {
      if (
        application.status ===
        newStatus
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          `Change ${application.studentName}'s application from ${formatAdminApplicationStatus(
            application.status
          )} to ${formatAdminApplicationStatus(
            newStatus
          )}?`
        );

      if (!confirmed) {
        return;
      }

      setError("");
      setSuccess("");

      setUpdatingId(
        application.applicationId
      );

      try {
        const updated =
          await updateApplicationStatus(
            application.applicationId,
            newStatus
          );

        setApplications(
          (current) =>
            current.map(
              (item) =>
                item.applicationId ===
                application.applicationId
                  ? {
                      ...item,
                      ...updated,
                    }
                  : item
            )
        );

        setSuccess(
          `${application.studentName}'s status changed to ${formatAdminApplicationStatus(
            newStatus
          )}.`
        );
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          "Unable to update application status."
        );
      } finally {
        setUpdatingId(
          null
        );
      }
    };

  // =========================================================
  // DOWNLOAD RESUME
  // =========================================================

  const handleResumeDownload =
    async (
      application:
        AdminApplication
    ) => {
      setError("");
      setSuccess("");

      setDownloadingId(
        application.applicationId
      );

      try {
        const blob =
          await downloadApplicationResume(
            application.applicationId
          );

        const url =
          window.URL.createObjectURL(
            blob
          );

        const anchor =
          document.createElement(
            "a"
          );

        anchor.href = url;

        const safeName =
          (
            application.studentName ||
            "student"
          ).replace(
            /[^a-zA-Z0-9-_]/g,
            "_"
          );

        anchor.download =
          `${safeName}_resume.pdf`;

        document.body.appendChild(
          anchor
        );

        anchor.click();

        anchor.remove();

        window.URL.revokeObjectURL(
          url
        );

        setSuccess(
          `Resume downloaded for ${application.studentName}.`
        );
      } catch (
        error: unknown
      ) {
        if (
          axios.isAxiosError(
            error
          ) &&
          error.response
            ?.status === 404
        ) {
          setError(
            "Resume has not been submitted for this application."
          );

          return;
        }

        handleError(
          error,
          "Unable to download resume."
        );
      } finally {
        setDownloadingId(
          null
        );
      }
    };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredApplications =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return applications.filter(
        (application) => {
          const matchesStatus =
            statusFilter ===
              "ALL" ||
            application.status ===
              statusFilter;

          const searchable = [
            application.studentName,
            application.studentEmail,
            application.collegeName,
            application.opportunityTitle,
            application.companyName,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesSearch =
            !normalizedSearch ||
            searchable.includes(
              normalizedSearch
            );

          return (
            matchesStatus &&
            matchesSearch
          );
        }
      );
    }, [
      applications,
      search,
      statusFilter,
    ]);

  // =========================================================
  // STATUS COUNT
  // =========================================================

  const countStatus = (
    status: ApplicationStatus
  ) => {
    return applications.filter(
      (application) =>
        application.status ===
        status
    ).length;
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">
          Loading applications...
        </p>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <ApplicationsHeader />

        {/* ERROR */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mt-6 rounded-xl border border-emerald-900/60 bg-emerald-950/30 px-5 py-4 text-sm text-emerald-300">
            {success}
          </div>
        )}

        {/* SUMMARY */}

        <ApplicationsSummary
          total={
            applications.length
          }
          applied={countStatus(
            "APPLIED"
          )}
          underReview={countStatus(
            "UNDER_REVIEW"
          )}
          shortlisted={countStatus(
            "SHORTLISTED"
          )}
          resumeRequested={countStatus(
            "RESUME_REQUESTED"
          )}
          resumeSubmitted={countStatus(
            "RESUME_SUBMITTED"
          )}
          forwarded={countStatus(
            "FORWARDED_TO_EMPLOYER"
          )}
          selected={countStatus(
            "SELECTED"
          )}
        />

        {/* FILTERS */}

        <ApplicationFilters
          search={search}
          statusFilter={
            statusFilter
          }
          onSearchChange={
            setSearch
          }
          onStatusFilterChange={
            setStatusFilter
          }
        />

        {/* APPLICATIONS */}

        <ApplicationsList
          applications={
            filteredApplications
          }
          updatingId={
            updatingId
          }
          downloadingId={
            downloadingId
          }
          onStatusChange={
            handleStatusUpdate
          }
          onDownloadResume={
            handleResumeDownload
          }
        />
      </div>
    </main>
  );
}