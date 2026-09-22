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
      applicationId:
        string,
      event:
        ChangeEvent<HTMLInputElement>
    ) => void;

  onUpload:
    (
      applicationId:
        string
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
        group
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_14px_40px_rgba(8,119,232,0.05)]
        transition-all
        duration-300

        hover:border-[#B8DCF3]
        hover:shadow-[0_20px_48px_rgba(8,119,232,0.08)]
      "
    >
      {/* TOP ACCENT */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          from-[#0877E8]
          via-violet-500
          to-[#38BDF8]
        "
      />

      {/* GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-violet-500/0
          blur-[90px]
          transition-all
          duration-300

          group-hover:bg-violet-500/7
        "
      />

      <div
        className="
          relative
          p-5

          sm:p-7
        "
      >
        {/* ===================================================
            TOP
        =================================================== */}

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
                rounded-2xl
                bg-[#EAF6FF]
                text-[#0877E8]
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
                "
              >
                <Building2
                  size={13}
                  className="
                    shrink-0
                    text-[#8BB9D6]
                  "
                />

                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-[#527087]
                  "
                >
                  {application.companyName}
                </p>
              </div>

              <h2
                className="
                  mt-1.5
                  break-words
                  text-2xl
                  font-bold
                  tracking-[-0.035em]
                  text-[#173B63]
                "
              >
                {application.opportunityTitle}
              </h2>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-[#8298AB]
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
            status={
              application.status
            }
          />
        </div>

        {/* ===================================================
            TIMELINE
        =================================================== */}

        <div
          className="
            mt-7
            border-t
            border-[#E7F0F7]
            pt-6
          "
        >
          <div
            className="
              mb-5
              flex
              items-center
              gap-2
            "
          >
            <FileText
              size={13}
              className="text-[#0877E8]"
            />

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#0877E8]
              "
            >
              Application Progress
            </p>
          </div>

          <ApplicationTimeline
            status={
              application.status
            }
          />
        </div>

        {/* ===================================================
            RESUME REQUEST
        =================================================== */}

        {application.status ===
          "RESUME_REQUESTED" && (
          <div className="mt-7">
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

        {/* ===================================================
            RESUME SUBMITTED
        =================================================== */}

        {resumeSubmitted && (
          <div
            className="
              mt-7
              flex
              items-start
              gap-3
              rounded-[18px]
              border
              border-emerald-200
              bg-emerald-50/70
              px-4
              py-4
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-emerald-100
                text-emerald-600
              "
            >
              <CheckCircle2
                size={16}
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
                  mt-1
                  text-sm
                  leading-6
                  text-emerald-700/80
                "
              >
                Your resume has been received for this
                application.
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            REJECTED
        =================================================== */}

        {application.status ===
          "REJECTED" && (
          <div
            className="
              mt-7
              flex
              items-start
              gap-3
              rounded-[18px]
              border
              border-red-200
              bg-red-50/70
              px-4
              py-4
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-100
                text-red-600
              "
            >
              <XCircle size={16} />
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
                  mt-1
                  text-sm
                  leading-6
                  text-red-700/75
                "
              >
                This application was not selected for
                further processing.
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}