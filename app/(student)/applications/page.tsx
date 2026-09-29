"use client";

import {
  LoaderCircle,
} from "lucide-react";

import ApplicationsHeader from "@/components/applications/ApplicationsHeader";
import ApplicationsList from "@/components/applications/ApplicationsList";
import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useApplications,
} from "@/hooks/useApplications";

function ApplicationsLoading() {
  return (
    <main
      className="
        flex
        min-h-[65vh]
        items-center
        justify-center
        bg-[#F7F9FC]
        px-4
      "
    >
      <div className="text-center">
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-[#1256AF]
            shadow-sm
          "
        >
          <LoaderCircle
            size={21}
            className="animate-spin"
          />
        </div>

        <p
          role="status"
          className="
            mt-4
            text-sm
            font-semibold
            text-slate-700
          "
        >
          Loading applications
        </p>

        <p
          className="
            mt-1
            text-xs
            text-slate-500
          "
        >
          Preparing your application progress...
        </p>
      </div>
    </main>
  );
}

export default function ApplicationsPage() {
  const applications =
    useApplications();

  if (applications.loading) {
    return <ApplicationsLoading />;
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#F7F9FC]
        text-slate-900
      "
    >
      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          py-8

          sm:px-6
          sm:py-10

          lg:px-8
          lg:py-12
        "
      >
        <ApplicationsHeader
          count={
            applications.applications.length
          }
        />

        {(applications.error ||
          applications.success) && (
          <div className="mt-6">
            <ProfileAlerts
              error={applications.error}
              success={applications.success}
            />
          </div>
        )}

        <div className="mt-8">
          <ApplicationsList
            applications={
              applications.applications
            }
            selectedFiles={
              applications.selectedFiles
            }
            uploadingId={
              applications.uploadingId
            }
            onFileChange={
              applications.handleFileChange
            }
            onUpload={
              applications.handleResumeUpload
            }
          />
        </div>
      </div>
    </main>
  );
}