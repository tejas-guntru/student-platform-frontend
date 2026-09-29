"use client";

import {
  LoaderCircle,
} from "lucide-react";

import {
  useState,
} from "react";

import ApplicationsHeader from "@/components/applications/ApplicationsHeader";
import ApplicationsList from "@/components/applications/ApplicationsList";
import ApplicationDetails from "@/components/applications/ApplicationDetails";
import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useApplications,
} from "@/hooks/useApplications";

import type {
  ApplicationResponse,
} from "@/types/application";

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
          Preparing your application
          progress...
        </p>
      </div>
    </main>
  );
}

export default function ApplicationsPage() {
  const applications =
    useApplications();

  const [
    selectedApplicationId,
    setSelectedApplicationId,
  ] =
    useState<string | null>(
      null
    );

  if (applications.loading) {
    return <ApplicationsLoading />;
  }

  /*
   * Find from the hook's latest data instead
   * of storing the complete object.
   *
   * This is important after resume upload:
   * when the hook refreshes the application,
   * the detail view automatically receives
   * the newest status.
   */
  const selectedApplication =
    selectedApplicationId
      ? applications.applications.find(
          (application) =>
            application.applicationId ===
            selectedApplicationId
        ) || null
      : null;

  const handleSelect = (
    application:
      ApplicationResponse
  ) => {
    setSelectedApplicationId(
      application.applicationId
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBack = () => {
    setSelectedApplicationId(
      null
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
        {!selectedApplication && (
          <ApplicationsHeader
            count={
              applications
                .applications
                .length
            }
          />
        )}

        {(applications.error ||
          applications.success) && (
          <div
            className={
              selectedApplication
                ? "mb-6"
                : "mt-6"
            }
          >
            <ProfileAlerts
              error={
                applications.error
              }
              success={
                applications.success
              }
            />
          </div>
        )}

        <div
          className={
            selectedApplication
              ? ""
              : "mt-8"
          }
        >
          {selectedApplication ? (
            <ApplicationDetails
              application={
                selectedApplication
              }
              selectedFile={
                applications
                  .selectedFiles[
                    selectedApplication
                      .applicationId
                  ] || null
              }
              uploading={
                applications
                  .uploadingId ===
                selectedApplication
                  .applicationId
              }
              onFileChange={
                applications
                  .handleFileChange
              }
              onUpload={
                applications
                  .handleResumeUpload
              }
              onBack={
                handleBack
              }
            />
          ) : (
            <ApplicationsList
              applications={
                applications.applications
              }
              onSelect={
                handleSelect
              }
            />
          )}
        </div>
      </div>
    </main>
  );
}