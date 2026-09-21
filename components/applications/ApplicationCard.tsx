"use client";

import type {
  ChangeEvent,
} from "react";

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
    <article className="rounded-[24px] border border-[#D8D5CC] bg-white p-6 shadow-[0_16px_45px_rgba(20,33,61,0.05)] transition-all hover:border-[#C9A227] sm:p-8">
      {/* TOP */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#6B707B]">
            {application.companyName}
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-[#14213D]">
            {application.opportunityTitle}
          </h2>

          <p className="mt-3 text-sm text-[#858994]">
            Applied{" "}
            {formatApplicationDate(
              application.appliedAt
            )}
          </p>
        </div>

        <ApplicationStatusBadge
          status={
            application.status
          }
        />
      </div>

      {/* TIMELINE */}
      <div className="mt-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-7 bg-[#C9A227]" />

          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C9A227]">
            Application Progress
          </p>
        </div>

        <ApplicationTimeline
          status={
            application.status
          }
        />
      </div>

      {/* RESUME REQUEST */}
      {application.status ===
        "RESUME_REQUESTED" && (
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
      )}

      {/* RESUME SUBMITTED */}
      {resumeSubmitted && (
        <div className="mt-8 rounded-[18px] border border-[#BFD7C3] bg-[#F1F8F2] p-5">
          <p className="font-bold text-[#347A3A]">
            ✓ Resume submitted
          </p>

          <p className="mt-1 text-sm leading-6 text-[#5F6470]">
            Your resume has been received
            for this application.
          </p>
        </div>
      )}

      {/* REJECTED */}
      {application.status ===
        "REJECTED" && (
        <div className="mt-8 rounded-[18px] border border-[#E4C7C7] bg-[#FBF1F1] p-5">
          <p className="font-bold text-[#A43F3F]">
            Application closed
          </p>

          <p className="mt-1 text-sm leading-6 text-[#5F6470]">
            This application was not
            selected for further
            processing.
          </p>
        </div>
      )}
    </article>
  );
}