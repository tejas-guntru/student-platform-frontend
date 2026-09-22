import type {
  AdminApplication,
} from "@/types/admin";

import type {
  ApplicationStatus,
} from "@/types/application";

import ApplicationCard from "./ApplicationCard";

interface ApplicationsListProps {
  applications:
    AdminApplication[];

  updatingId:
    string | null;

  downloadingId:
    string | null;

  onStatusChange: (
    application: AdminApplication,
    status: ApplicationStatus
  ) => void;

  onDownloadResume: (
    application: AdminApplication
  ) => void;
}

export default function ApplicationsList({
  applications,
  updatingId,
  downloadingId,
  onStatusChange,
  onDownloadResume,
}: ApplicationsListProps) {
  if (
    applications.length === 0
  ) {
    return (
      <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
        <h2 className="text-xl font-semibold">
          No applications found
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Try changing your search or
          status filter.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 space-y-6">
      {applications.map(
        (application) => (
          <ApplicationCard
            key={
              application.applicationId
            }
            application={application}
            updating={
              updatingId ===
              application.applicationId
            }
            downloading={
              downloadingId ===
              application.applicationId
            }
            onStatusChange={
              onStatusChange
            }
            onDownloadResume={
              onDownloadResume
            }
          />
        )
      )}
    </section>
  );
}