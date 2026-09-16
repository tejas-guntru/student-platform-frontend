"use client";

import axios from "axios";
import Link from "next/link";

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


type ApplicationStatus =
  AdminApplication["status"];


const statuses: ApplicationStatus[] = [
  "APPLIED",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "RESUME_REQUESTED",
  "RESUME_SUBMITTED",
  "FORWARDED_TO_EMPLOYER",
  "SELECTED",
  "REJECTED",
];


export default function AdminApplicationsPage() {

  const [
    applications,
    setApplications,
  ] = useState<AdminApplication[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    updatingId,
    setUpdatingId,
  ] = useState<string | null>(
    null
  );

  const [
    downloadingId,
    setDownloadingId,
  ] = useState<string | null>(
    null
  );

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
  // ERROR
  // =========================================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {

    console.error(error);


    if (
      axios.isAxiosError(error)
    ) {

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {

        localStorage.clear();

        window.location.href =
          "/login";

        return;
      }


      setError(
        error.response?.data?.message ||
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
          `Change ${application.studentName}'s application from ${formatStatus(
            application.status
          )} to ${formatStatus(
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
          `${application.studentName}'s status changed to ${formatStatus(
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


        anchor.href =
          url;


        const safeName =
          (
            application.studentName ||
            "student"
          )
            .replace(
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
          )
        ) {

          if (
            error.response?.status ===
            404
          ) {

            setError(
              "Resume has not been submitted for this application."
            );

            return;
          }
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
    useMemo(
      () => {

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


            const searchable =
              [
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

      },
      [
        applications,
        search,
        statusFilter,
      ]
    );


  // =========================================================
  // COUNTS
  // =========================================================

  const countStatus = (
    status:
      ApplicationStatus
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


        {/* HEADER */}

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              ADMIN
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Applications
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Review candidates and manage
              the complete hiring pipeline.
            </p>

          </div>


          <div className="flex gap-3">

            <Link
              href="/admin/opportunities"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-900"
            >
              Opportunities
            </Link>

            <Link
              href="/admin/dashboard"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-900"
            >
              ← Dashboard
            </Link>

          </div>

        </header>


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

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">

          <SummaryCard
            label="Total"
            value={
              applications.length
            }
          />

          <SummaryCard
            label="Applied"
            value={
              countStatus(
                "APPLIED"
              )
            }
          />

          <SummaryCard
            label="Review"
            value={
              countStatus(
                "UNDER_REVIEW"
              )
            }
          />

          <SummaryCard
            label="Shortlisted"
            value={
              countStatus(
                "SHORTLISTED"
              )
            }
          />

          <SummaryCard
            label="Resume Req."
            value={
              countStatus(
                "RESUME_REQUESTED"
              )
            }
          />

          <SummaryCard
            label="Resume In"
            value={
              countStatus(
                "RESUME_SUBMITTED"
              )
            }
          />

          <SummaryCard
            label="Forwarded"
            value={
              countStatus(
                "FORWARDED_TO_EMPLOYER"
              )
            }
          />

          <SummaryCard
            label="Selected"
            value={
              countStatus(
                "SELECTED"
              )
            }
          />

        </section>


        {/* FILTERS */}

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">


            <input
              type="text"
              value={
                search
              }
              onChange={(
                event
              ) =>
                setSearch(
                  event.target
                    .value
                )
              }
              placeholder="Search student, email, college, company or opportunity..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500"
            />


            <select
              value={
                statusFilter
              }
              onChange={(
                event
              ) =>
                setStatusFilter(
                  event.target
                    .value as
                    ApplicationStatus |
                    "ALL"
                )
              }
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
            >

              <option value="ALL">
                All statuses
              </option>

              {statuses.map(
                (status) => (

                  <option
                    key={
                      status
                    }
                    value={
                      status
                    }
                  >
                    {
                      formatStatus(
                        status
                      )
                    }
                  </option>

                )
              )}

            </select>

          </div>

        </section>


        {/* APPLICATIONS */}

        {filteredApplications.length ===
        0 ? (

          <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">

            <h2 className="text-xl font-semibold">
              No applications found
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Try changing your search
              or status filter.
            </p>

          </section>

        ) : (

          <section className="mt-8 space-y-6">

            {filteredApplications.map(
              (
                application
              ) => (

                <ApplicationCard
                  key={
                    application.applicationId
                  }
                  application={
                    application
                  }
                  updating={
                    updatingId ===
                    application.applicationId
                  }
                  downloading={
                    downloadingId ===
                    application.applicationId
                  }
                  onStatusChange={
                    handleStatusUpdate
                  }
                  onDownloadResume={
                    handleResumeDownload
                  }
                />

              )
            )}

          </section>
        )}

      </div>

    </main>
  );
}


// =========================================================
// APPLICATION CARD
// =========================================================

function ApplicationCard({
  application,
  updating,
  downloading,
  onStatusChange,
  onDownloadResume,
}: {

  application:
    AdminApplication;

  updating:
    boolean;

  downloading:
    boolean;

  onStatusChange:
    (
      application:
        AdminApplication,
      status:
        ApplicationStatus
    ) => void;

  onDownloadResume:
    (
      application:
        AdminApplication
    ) => void;
}) {

  const nextStatuses =
    getAllowedNextStatuses(
      application.status
    );


  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">


      {/* HEADER */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">


        <div>

          <div className="flex flex-wrap items-center gap-3">

            <h2 className="text-2xl font-bold">
              {
                application.studentName
              }
            </h2>

            <StatusBadge
              status={
                application.status
              }
            />

          </div>


          <p className="mt-2 text-sm text-zinc-400">
            {
              application.studentEmail
            }
          </p>


          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500">

            <span>
              College:{" "}
              <strong className="font-medium text-zinc-300">
                {
                  application.collegeName ||
                  "-"
                }
              </strong>
            </span>


            <span>
              Graduation:{" "}
              <strong className="font-medium text-zinc-300">
                {
                  application.graduationYear ||
                  "-"
                }
              </strong>
            </span>


            <span>
              Applied:{" "}
              <strong className="font-medium text-zinc-300">
                {
                  formatDate(
                    application.appliedAt
                  )
                }
              </strong>
            </span>

          </div>

        </div>


        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 lg:min-w-80">

          <p className="text-xs text-zinc-500">
            Applied for
          </p>

          <p className="mt-2 font-semibold">
            {
              application.opportunityTitle
            }
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            {
              application.companyName
            }
          </p>

        </div>

      </div>


      {/* PIPELINE */}

      <div className="mt-8 border-t border-zinc-800 pt-6">

        <p className="text-sm font-semibold text-zinc-300">
          Application Progress
        </p>


        <ApplicationProgress
          status={
            application.status
          }
        />

      </div>


      {/* ACTIONS */}

      <div className="mt-8 flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-5 lg:flex-row lg:items-center lg:justify-between">


        <div>

          <p className="text-sm font-semibold">
            Admin Actions
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Move the candidate to the
            next stage.
          </p>

        </div>


        <div className="flex flex-wrap gap-3">


  {/* ================================================
      VIEW CANDIDATE
  ================================================ */}

  <Link
    href={`/admin/candidates/${application.studentId}`}
    className="rounded-lg border border-blue-800 bg-blue-950/30 px-4 py-2.5 text-sm font-semibold text-blue-300 transition hover:bg-blue-950/60"
  >
    View Candidate
  </Link>


  {/* ================================================
      RESUME
  ================================================ */}

  {canDownloadResume(
    application.status
  ) && (

    <button
      type="button"
      disabled={
        downloading
      }
      onClick={() =>
        onDownloadResume(
          application
        )
      }
      className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold transition hover:bg-zinc-800 disabled:opacity-50"
    >

      {downloading
        ? "Downloading..."
        : "Download Resume"}

    </button>
  )}


  {/* ================================================
      NEXT STATUS ACTIONS
  ================================================ */}

  {nextStatuses.map(
    (status) => (

      <button
        key={
          status
        }
        type="button"
        disabled={
          updating
        }
        onClick={() =>
          onStatusChange(
            application,
            status
          )
        }
        className={
          getActionButtonClass(
            status
          )
        }
      >

        {updating
          ? "Updating..."
          : getActionLabel(
              status
            )}

      </button>

    )
  )}


  {/* ================================================
      TERMINAL STATUS
  ================================================ */}

  {nextStatuses.length ===
    0 && (

    <span className="rounded-lg border border-zinc-800 px-4 py-2.5 text-sm text-zinc-500">

      No further actions

    </span>
  )}

</div>

      </div>

    </article>
  );
}


// =========================================================
// ALLOWED TRANSITIONS
// =========================================================

function getAllowedNextStatuses(
  current:
    ApplicationStatus
): ApplicationStatus[] {

  switch (current) {

    case "APPLIED":
      return [
        "UNDER_REVIEW",
        "REJECTED",
      ];


    case "UNDER_REVIEW":
      return [
        "SHORTLISTED",
        "REJECTED",
      ];


    case "SHORTLISTED":
      return [
        "RESUME_REQUESTED",
        "REJECTED",
      ];


    case "RESUME_REQUESTED":
      /*
       * Student should upload resume.
       * Admin should normally NOT manually
       * mark RESUME_SUBMITTED.
       */
      return [
        "REJECTED",
      ];


    case "RESUME_SUBMITTED":
      return [
        "FORWARDED_TO_EMPLOYER",
        "REJECTED",
      ];


    case "FORWARDED_TO_EMPLOYER":
      return [
        "SELECTED",
        "REJECTED",
      ];


    case "SELECTED":
    case "REJECTED":
      return [];
  }
}


// =========================================================
// PROGRESS
// =========================================================

function ApplicationProgress({
  status,
}: {
  status:
    ApplicationStatus;
}) {

  if (
    status === "REJECTED"
  ) {

    return (
      <div className="mt-4 rounded-lg border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-300">

        Application rejected

      </div>
    );
  }


  const flow:
    ApplicationStatus[] = [
      "APPLIED",
      "UNDER_REVIEW",
      "SHORTLISTED",
      "RESUME_REQUESTED",
      "RESUME_SUBMITTED",
      "FORWARDED_TO_EMPLOYER",
      "SELECTED",
    ];


  const currentIndex =
    flow.indexOf(
      status
    );


  return (
    <div className="mt-5 overflow-x-auto">

      <div className="flex min-w-[900px] items-start">

        {flow.map(
          (
            step,
            index
          ) => {

            const complete =
              index <=
              currentIndex;


            const current =
              step ===
              status;


            return (

              <div
                key={
                  step
                }
                className="relative flex flex-1 flex-col items-center"
              >

                {index <
                  flow.length -
                    1 && (

                  <div
                    className={`absolute left-1/2 top-4 h-[2px] w-full ${
                      index <
                      currentIndex
                        ? "bg-emerald-600"
                        : "bg-zinc-700"
                    }`}
                  />

                )}


                <div
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${
                    complete
                      ? "border-emerald-600 bg-emerald-950 text-emerald-400"
                      : "border-zinc-700 bg-zinc-950 text-zinc-600"
                  } ${
                    current
                      ? "ring-4 ring-emerald-950"
                      : ""
                  }`}
                >

                  {complete
                    ? "✓"
                    : index + 1}

                </div>


                <p
                  className={`mt-3 max-w-28 text-center text-xs ${
                    current
                      ? "font-semibold text-white"
                      : complete
                      ? "text-zinc-300"
                      : "text-zinc-600"
                  }`}
                >

                  {
                    formatStatus(
                      step
                    )
                  }

                </p>

              </div>

            );
          }
        )}

      </div>

    </div>
  );
}


// =========================================================
// SUMMARY
// =========================================================

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">

      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}


// =========================================================
// STATUS BADGE
// =========================================================

function StatusBadge({
  status,
}: {
  status:
    ApplicationStatus;
}) {

  let style =
    "border-zinc-700 bg-zinc-950 text-zinc-300";


  if (
    status === "SELECTED"
  ) {

    style =
      "border-emerald-900 bg-emerald-950/40 text-emerald-400";

  } else if (
    status === "REJECTED"
  ) {

    style =
      "border-red-900 bg-red-950/40 text-red-400";

  } else if (
    status ===
    "RESUME_REQUESTED"
  ) {

    style =
      "border-amber-900 bg-amber-950/40 text-amber-400";

  } else if (
    status ===
    "RESUME_SUBMITTED"
  ) {

    style =
      "border-blue-900 bg-blue-950/40 text-blue-400";
  }


  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${style}`}
    >

      {
        formatStatus(
          status
        )
      }

    </span>
  );
}


// =========================================================
// RESUME AVAILABILITY
// =========================================================

function canDownloadResume(
  status:
    ApplicationStatus
) {

  return (
    status ===
      "RESUME_SUBMITTED" ||
    status ===
      "FORWARDED_TO_EMPLOYER" ||
    status ===
      "SELECTED"
  );
}


// =========================================================
// ACTION LABEL
// =========================================================

function getActionLabel(
  status:
    ApplicationStatus
) {

  switch (status) {

    case "UNDER_REVIEW":
      return "Start Review";

    case "SHORTLISTED":
      return "Shortlist";

    case "RESUME_REQUESTED":
      return "Request Resume";

    case "FORWARDED_TO_EMPLOYER":
      return "Forward to Employer";

    case "SELECTED":
      return "Mark Selected";

    case "REJECTED":
      return "Reject";

    default:
      return formatStatus(
        status
      );
  }
}


// =========================================================
// BUTTON CLASS
// =========================================================

function getActionButtonClass(
  status:
    ApplicationStatus
) {

  if (
    status === "REJECTED"
  ) {

    return "rounded-lg border border-red-900 bg-red-950/30 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-950/60 disabled:opacity-50";
  }


  if (
    status === "SELECTED"
  ) {

    return "rounded-lg border border-emerald-800 bg-emerald-950/40 px-4 py-2.5 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-950/70 disabled:opacity-50";
  }


  return "rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50";
}


// =========================================================
// FORMAT STATUS
// =========================================================

function formatStatus(
  status: string
) {

  return status
    .split("_")
    .map(
      (word) =>
        word.charAt(0) +
        word
          .slice(1)
          .toLowerCase()
    )
    .join(" ");
}


// =========================================================
// FORMAT DATE
// =========================================================

function formatDate(
  value: string
) {

  if (!value) {
    return "-";
  }


  return new Date(
    value
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}