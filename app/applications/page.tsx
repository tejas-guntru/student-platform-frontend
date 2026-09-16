    "use client";

import axios from "axios";
import Link from "next/link";

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
  ApplicationStatus,
} from "@/types/application";


const applicationFlow: ApplicationStatus[] = [
  "APPLIED",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "RESUME_REQUESTED",
  "RESUME_SUBMITTED",
  "FORWARDED_TO_EMPLOYER",
  "SELECTED",
];


export default function ApplicationsPage() {

  const [
    applications,
    setApplications,
  ] = useState<ApplicationResponse[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    uploadingId,
    setUploadingId,
  ] = useState<string | null>(
    null
  );

  const [
    selectedFiles,
    setSelectedFiles,
  ] = useState<
    Record<string, File | null>
  >({});

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


  // =========================================================
  // LOAD APPLICATIONS
  // =========================================================

  const loadApplications =
    async () => {

      setError("");

      try {

        const response =
          await getMyApplications();


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
        error.response
          ?.data?.message ||
          fallback
      );

      return;
    }


    setError(fallback);
  };


  // =========================================================
  // FILE SELECT
  // =========================================================

  const handleFileChange = (
    applicationId: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {

    setError("");
    setSuccess("");


    const file =
      event.target.files?.[0];


    if (!file) {

      setSelectedFiles(
        (current) => ({
          ...current,
          [applicationId]: null,
        })
      );

      return;
    }


    if (
      file.type !== "application/pdf" &&
      !file.name
        .toLowerCase()
        .endsWith(".pdf")
    ) {

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
        [applicationId]: file,
      })
    );
  };


  // =========================================================
  // UPLOAD RESUME
  // =========================================================

  const handleResumeUpload =
    async (
      applicationId: string
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
            [applicationId]: null,
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


  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-6xl px-6 py-8">


        {/* HEADER */}

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              APPLICATIONS
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              My Applications
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Track your applications,
              shortlist updates and resume
              requests.
            </p>

          </div>


          <div className="flex gap-3">

            <Link
              href="/opportunities"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:bg-zinc-900"
            >
              Opportunities
            </Link>

            <Link
              href="/dashboard"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:bg-zinc-900"
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


        {/* CONTENT */}

        {loading ? (

          <div className="py-20 text-center text-zinc-400">
            Loading applications...
          </div>

        ) : applications.length === 0 ? (

          <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">

            <h2 className="text-xl font-semibold">
              No applications yet
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Apply to an opportunity and
              it will appear here.
            </p>

            <Link
              href="/opportunities"
              className="mt-6 inline-block rounded-lg bg-white px-5 py-3 font-semibold text-black hover:bg-zinc-200"
            >
              Browse Opportunities
            </Link>

          </section>

        ) : (

          <section className="mt-8 space-y-6">

            {applications.map(
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
                  selectedFile={
                    selectedFiles[
                      application.applicationId
                    ] || null
                  }
                  uploading={
                    uploadingId ===
                    application.applicationId
                  }
                  onFileChange={
                    handleFileChange
                  }
                  onUpload={
                    handleResumeUpload
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
  selectedFile,
  uploading,
  onFileChange,
  onUpload,
}: {

  application:
    ApplicationResponse;

  selectedFile:
    File | null;

  uploading:
    boolean;

  onFileChange:
    (
      applicationId: string,
      event:
        ChangeEvent<HTMLInputElement>
    ) => void;

  onUpload:
    (
      applicationId: string
    ) => void;
}) {

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">


      {/* TOP */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        <div>

          <p className="text-sm text-zinc-500">
            {
              application.companyName
            }
          </p>

          <h2 className="mt-1 text-2xl font-bold">

            {
              application.opportunityTitle
            }

          </h2>

          <p className="mt-3 text-sm text-zinc-500">

            Applied{" "}

            {
              formatDate(
                application.appliedAt
              )
            }

          </p>

        </div>


        <StatusBadge
          status={
            application.status
          }
        />

      </div>


      {/* TIMELINE */}

      <div className="mt-8">

        <p className="mb-5 text-sm font-semibold text-zinc-300">
          Application Progress
        </p>

        <ApplicationTimeline
          status={
            application.status
          }
        />

      </div>


      {/* RESUME REQUEST */}

      {application.status ===
        "RESUME_REQUESTED" && (

        <div className="mt-8 rounded-xl border border-amber-900/60 bg-amber-950/20 p-5">

          <h3 className="font-semibold text-amber-300">
            Resume requested
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            You have been shortlisted.
            Upload a PDF resume tailored
            for this opportunity.
          </p>


          <div className="mt-5">

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(
                event
              ) =>
                onFileChange(
                  application.applicationId,
                  event
                )
              }
              className="block w-full text-sm text-zinc-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-zinc-200"
            />

          </div>


          {selectedFile && (

            <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950 p-4">

              <p className="text-sm font-medium">
                {
                  selectedFile.name
                }
              </p>

              <p className="mt-1 text-xs text-zinc-500">

                {
                  formatFileSize(
                    selectedFile.size
                  )
                }

              </p>

            </div>
          )}


          <button
            type="button"
            disabled={
              !selectedFile ||
              uploading
            }
            onClick={() =>
              onUpload(
                application.applicationId
              )
            }
            className="mt-5 rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {uploading
              ? "Uploading..."
              : "Upload Resume"}

          </button>

        </div>
      )}


      {/* RESUME SUBMITTED */}

      {(
        application.status ===
          "RESUME_SUBMITTED" ||
        application.status ===
          "FORWARDED_TO_EMPLOYER" ||
        application.status ===
          "SELECTED"
      ) && (

        <div className="mt-8 rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-5">

          <p className="font-semibold text-emerald-400">
            Resume submitted
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            Your resume has been received
            for this application.
          </p>

        </div>
      )}


      {/* REJECTED */}

      {application.status ===
        "REJECTED" && (

        <div className="mt-8 rounded-xl border border-red-900/50 bg-red-950/20 p-5">

          <p className="font-semibold text-red-400">
            Application closed
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            This application was not
            selected for further
            processing.
          </p>

        </div>
      )}

    </article>
  );
}


// =========================================================
// TIMELINE
// =========================================================

function ApplicationTimeline({
  status,
}: {
  status: ApplicationStatus;
}) {

  if (
    status === "REJECTED"
  ) {

    return (
      <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-4 text-sm text-red-300">
        Application rejected
      </div>
    );
  }


  const currentIndex =
    applicationFlow.indexOf(
      status
    );


  return (
    <div className="overflow-x-auto">

      <div className="flex min-w-[850px] items-start">

        {applicationFlow.map(
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
                key={step}
                className="relative flex flex-1 flex-col items-center"
              >

                {/* LINE */}

                {index <
                  applicationFlow.length -
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


                {/* CIRCLE */}

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
// STATUS BADGE
// =========================================================

function StatusBadge({
  status,
}: {
  status: ApplicationStatus;
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
  }


  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${style}`}
    >
      {formatStatus(status)}
    </span>
  );
}


// =========================================================
// STATUS FORMAT
// =========================================================

function formatStatus(
  status: ApplicationStatus
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
// DATE
// =========================================================

function formatDate(
  value: string
) {

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


// =========================================================
// FILE SIZE
// =========================================================

function formatFileSize(
  bytes: number
) {

  if (
    bytes < 1024
  ) {

    return `${bytes} bytes`;
  }


  if (
    bytes <
    1024 * 1024
  ) {

    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }


  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}