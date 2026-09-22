import {
  Inbox,
  SearchX,
} from "lucide-react";

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
  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (
    applications.length === 0
  ) {
    return (
      <section
        className="
          flex
          flex-col
          items-center
          justify-center
          rounded-[26px]
          border
          border-dashed
          border-[#C9DFEF]
          bg-white/80
          px-6
          py-14
          text-center
          shadow-[0_8px_28px_rgba(8,119,232,0.035)]
        "
      >
        <div
          className="
            relative
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-[22px]
            bg-[#EAF6FF]
            text-[#0877E8]
          "
        >
          <Inbox size={27} />

          <div
            className="
              absolute
              -bottom-1
              -right-1
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border-2
              border-white
              bg-[#F8FCFF]
              text-[#6B879D]
            "
          >
            <SearchX size={13} />
          </div>
        </div>

        <h2
          className="
            mt-5
            text-lg
            font-bold
            tracking-[-0.025em]
            text-[#173B63]
          "
        >
          No applications found
        </h2>

        <p
          className="
            mt-2
            max-w-md
            text-sm
            leading-6
            text-[#8196A8]
          "
        >
          No candidate applications match the current
          search or status filter.
        </p>

        <div
          className="
            mt-5
            rounded-full
            border
            border-[#D8E8F4]
            bg-[#F8FCFF]
            px-3.5
            py-1.5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.13em]
            text-[#7891A4]
          "
        >
          Try changing your filters
        </div>
      </section>
    );
  }

  // =========================================================
  // LIST
  // =========================================================

  return (
    <section
      className="
        space-y-5
      "
    >
      {applications.map(
        (application) => (
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