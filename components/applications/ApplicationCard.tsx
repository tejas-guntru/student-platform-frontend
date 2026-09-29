"use client";

import type {
  ChangeEvent,
} from "react";

import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  XCircle,
} from "lucide-react";

import type {
  ApplicationResponse,
} from "@/types/application";

import ApplicationStatusBadge from "@/components/applications/ApplicationStatusBadge";
import ApplicationTimeline from "@/components/applications/ApplicationTimeline";
import ResumeUploadSection from "@/components/applications/ResumeUploadSection";

import {
  formatApplicationDate,
} from "@/utils/applicationUtils";

interface ApplicationCardProps {
  application:
    ApplicationResponse;

  selectedFile:
    File | null;

  uploading:
    boolean;

  onFileChange:
    (
      applicationId: string,
      event: ChangeEvent<HTMLInputElement>
    ) => void;

  onUpload:
    (
      applicationId: string
    ) => void;
}

export default function ApplicationCard({
  application,
  selectedFile,
  uploading,
  onFileChange,
  onUpload,
}: ApplicationCardProps) {
  const resumeSubmitted =
    application.status ===
      "RESUME_SUBMITTED" ||
    application.status ===
      "FORWARDED_TO_EMPLOYER" ||
    application.status ===
      "SELECTED";

  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      <div
        className="
          p-5

          sm:p-6
        "
      >
        <div
          className="
            flex
            flex-col
            gap-5

            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          <div
            className="
              flex
              min-w-0
              items-start
              gap-4
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#EAF2FF]
                text-[#1256AF]
              "
            >
              <BriefcaseBusiness
                size={18}
              />
            </div>

            <div className="min-w-0">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-500
                "
              >
                <Building2
                  size={13}
                  className="shrink-0"
                />

                <span className="truncate">
                  {application.companyName}
                </span>
              </div>

              <h2
                className="
                  mt-1.5
                  break-words
                  text-xl
                  font-bold
                  tracking-[-0.025em]
                  text-slate-900
                "
              >
                {application.opportunityTitle}
              </h2>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-400
                "
              >
                <CalendarDays
                  size={13}
                  className="shrink-0"
                />

                <span>
                  Applied{" "}
                  {formatApplicationDate(
                    application.appliedAt
                  )}
                </span>
              </div>
            </div>
          </div>

          <ApplicationStatusBadge
            status={application.status}
          />
        </div>

        <div
          className="
            mt-6
            border-t
            border-slate-100
            pt-5
          "
        >
          <div
            className="
              mb-4
              flex
              items-center
              gap-2
            "
          >
            <FileText
              size={13}
              className="text-[#1256AF]"
            />

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#1256AF]
              "
            >
              Application progress
            </p>
          </div>

          <ApplicationTimeline
            status={application.status}
          />
        </div>

        {application.status ===
          "RESUME_REQUESTED" && (
          <div
            className="
              mt-6
              border-t
              border-slate-100
              pt-6
            "
          >
            <ResumeUploadSection
              applicationId={
                application.applicationId
              }
              selectedFile={
                selectedFile
              }
              uploading={
                uploading
              }
              onFileChange={
                onFileChange
              }
              onUpload={
                onUpload
              }
            />
          </div>
        )}

        {resumeSubmitted && (
          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-emerald-200
              bg-emerald-50
              px-4
              py-3.5
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-emerald-100
                text-emerald-600
              "
            >
              <CheckCircle2
                size={15}
              />
            </div>

            <div>
              <p
                className="
                  text-sm
                  font-bold
                  text-emerald-800
                "
              >
                Resume submitted
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  leading-5
                  text-emerald-700
                "
              >
                Your resume has been received for
                this application.
              </p>
            </div>
          </div>
        )}

        {application.status ===
          "REJECTED" && (
          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3.5
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-red-100
                text-red-600
              "
            >
              <XCircle size={15} />
            </div>

            <div>
              <p
                className="
                  text-sm
                  font-bold
                  text-red-700
                "
              >
                Application closed
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  leading-5
                  text-red-600
                "
              >
                This application was not selected
                for further processing.
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}