"use client";

import type {
  ChangeEvent,
} from "react";

import {
  ArrowLeft,
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

interface ApplicationDetailsProps {
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

  onBack:
    () => void;
}

export default function ApplicationDetails({
  application,
  selectedFile,
  uploading,
  onFileChange,
  onUpload,
  onBack,
}: ApplicationDetailsProps) {
  const resumeSubmitted =
    application.status ===
      "RESUME_SUBMITTED" ||
    application.status ===
      "FORWARDED_TO_EMPLOYER" ||
    application.status ===
      "SELECTED";

  return (
    <section>
      {/* BACK */}

      <button
        type="button"
        onClick={onBack}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-slate-500
          transition-colors

          hover:text-slate-950
        "
      >
        <ArrowLeft size={16} />

        Back to applications
      </button>

      {/* MAIN CARD */}

      <article
        className="
          mt-5
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
        "
      >
        {/* HEADER */}

        <div
          className="
            border-b
            border-slate-200
            p-5

            sm:p-7
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
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#EAF2FF]
                  text-[#1256AF]
                "
              >
                <BriefcaseBusiness
                  size={20}
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
                    size={14}
                    className="shrink-0"
                  />

                  <span>
                    {application.companyName}
                  </span>
                </div>

                <h1
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    tracking-[-0.04em]
                    text-slate-950

                    sm:text-3xl
                  "
                >
                  {application.opportunityTitle}
                </h1>

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-slate-400
                  "
                >
                  <CalendarDays
                    size={13}
                  />

                  Applied{" "}
                  {formatApplicationDate(
                    application.appliedAt
                  )}
                </div>
              </div>
            </div>

            <ApplicationStatusBadge
              status={application.status}
            />
          </div>
        </div>

        {/* BODY */}

        <div
          className="
            p-5

            sm:p-7
          "
        >
          {/* APPLICATION PROGRESS */}

          <section>
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#EAF2FF]
                  text-[#1256AF]
                "
              >
                <FileText size={15} />
              </div>

              <div>
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-[#1256AF]
                  "
                >
                  Application progress
                </p>

                <h2
                  className="
                    mt-0.5
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  Hiring journey
                </h2>
              </div>
            </div>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
              "
            >
              Follow your application as it moves
              through each stage of the hiring
              process.
            </p>

            <div
              className="
                mt-6
                rounded-xl
                border
                border-slate-200
                bg-[#FAFBFC]
                p-4

                sm:p-5
              "
            >
              <ApplicationTimeline
                status={
                  application.status
                }
              />
            </div>
          </section>

          {/* RESUME REQUEST */}

          {application.status ===
            "RESUME_REQUESTED" && (
            <section
              className="
                mt-7
                border-t
                border-slate-100
                pt-7
              "
            >
              <div
                className="
                  mb-4
                  max-w-2xl
                "
              >
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-amber-600
                  "
                >
                  Action required
                </p>

                <h2
                  className="
                    mt-1
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  Submit your resume
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  You have been asked to
                  provide your resume for the
                  next stage of this application.
                </p>
              </div>

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
            </section>
          )}

          {/* RESUME SUBMITTED */}

          {resumeSubmitted && (
            <section
              className="
                mt-7
                border-t
                border-slate-100
                pt-7
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-emerald-200
                  bg-emerald-50
                  p-4
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
                    rounded-lg
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
                      max-w-xl
                      text-xs
                      leading-5
                      text-emerald-700
                    "
                  >
                    Your resume has been received
                    for this application. No further
                    action is required right now.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* REJECTED */}

          {application.status ===
            "REJECTED" && (
            <section
              className="
                mt-7
                border-t
                border-slate-100
                pt-7
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  p-4
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
                    rounded-lg
                    bg-red-100
                    text-red-600
                  "
                >
                  <XCircle
                    size={16}
                  />
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
                      max-w-xl
                      text-xs
                      leading-5
                      text-red-600
                    "
                  >
                    This application was not
                    selected for further
                    processing.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </article>
    </section>
  );
}