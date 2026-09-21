"use client";

import ApplicationsHeader from "@/components/applications/ApplicationsHeader";
import ApplicationsList from "@/components/applications/ApplicationsList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useApplications,
} from "@/hooks/useApplications";

export default function ApplicationsPage() {
  const applications =
    useApplications();

  if (
    applications.loading
  ) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F3] text-[#14213D]">
        <div className="flex flex-col items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#E3E1DA] border-t-[#C9A227]" />

          <p className="mt-4 text-sm font-medium text-[#6B707B]">
            Loading applications...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7F3] text-[#14213D]">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:py-10 lg:py-12">
        <ApplicationsHeader />

        <ProfileAlerts
          error={
            applications.error
          }
          success={
            applications.success
          }
        />

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
    </main>
  );
}