import Link from "next/link";

import type {
  AdminApplication,
} from "@/types/admin";

import type {
  ApplicationStatus,
} from "@/types/application";

import StatusBadge from "@/components/admin/shared/StatusBadge";
import ApplicationProgress from "./ApplicationProgress";

import {
  canDownloadResume,
  formatAdminApplicationDate,
  getActionButtonClass,
  getActionLabel,
  getAllowedNextStatuses,
} from "@/utils/adminApplicationUtils";

interface ApplicationCardProps {
  application: AdminApplication;

  updating: boolean;

  downloading: boolean;

  onStatusChange: (
    application: AdminApplication,
    status: ApplicationStatus
  ) => void;

  onDownloadResume: (
    application: AdminApplication
  ) => void;
}

export default function ApplicationCard({
  application,
  updating,
  downloading,
  onStatusChange,
  onDownloadResume,
}: ApplicationCardProps) {
  const nextStatuses =
    getAllowedNextStatuses(
      application.status
    );

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      {/* CANDIDATE HEADER */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold">
              {application.studentName}
            </h2>

            <StatusBadge
              status={
                application.status
              }
            />
          </div>

          <p className="mt-2 text-sm text-zinc-400">
            {application.studentEmail}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500">
            <span>
              College:{" "}
              <strong className="font-medium text-zinc-300">
                {application.collegeName ||
                  "-"}
              </strong>
            </span>

            <span>
              Graduation:{" "}
              <strong className="font-medium text-zinc-300">
                {application.graduationYear ||
                  "-"}
              </strong>
            </span>

            <span>
              Applied:{" "}
              <strong className="font-medium text-zinc-300">
                {formatAdminApplicationDate(
                  application.appliedAt
                )}
              </strong>
            </span>
          </div>
        </div>

        {/* OPPORTUNITY */}

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
            {application.companyName}
          </p>
        </div>
      </div>

      {/* APPLICATION PROGRESS */}

      <div className="mt-8 border-t border-zinc-800 pt-6">
        <p className="text-sm font-semibold text-zinc-300">
          Application Progress
        </p>

        <ApplicationProgress
          status={application.status}
        />
      </div>

      {/* ADMIN ACTIONS */}

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
          {/* VIEW CANDIDATE */}

          <Link
            href={`/admin/candidates/${application.studentId}`}
            className="rounded-lg border border-blue-800 bg-blue-950/30 px-4 py-2.5 text-sm font-semibold text-blue-300 transition hover:bg-blue-950/60"
          >
            View Candidate
          </Link>

          {/* DOWNLOAD RESUME */}

          {canDownloadResume(
            application.status
          ) && (
            <button
              type="button"
              disabled={downloading}
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

          {/* STATUS ACTIONS */}

          {nextStatuses.map(
            (status) => (
              <button
                key={status}
                type="button"
                disabled={updating}
                onClick={() =>
                  onStatusChange(
                    application,
                    status
                  )
                }
                className={getActionButtonClass(
                  status
                )}
              >
                {updating
                  ? "Updating..."
                  : getActionLabel(
                      status
                    )}
              </button>
            )
          )}

          {/* TERMINAL STATUS */}

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