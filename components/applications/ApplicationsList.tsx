"use client";

import Link from "next/link";

import type {
  ChangeEvent,
} from "react";

import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
} from "lucide-react";

import type {
  ApplicationResponse,
} from "@/types/application";

import ApplicationCard from "@/components/applications/ApplicationCard";

interface ApplicationsListProps {
  applications:
    ApplicationResponse[];

  selectedFiles:
    Record<string, File | null>;

  uploadingId:
    string | null;

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

export default function ApplicationsList({
  applications,
  selectedFiles,
  uploadingId,
  onFileChange,
  onUpload,
}: ApplicationsListProps) {
  if (applications.length === 0) {
    return (
      <section
        className="
          rounded-2xl
          border
          border-dashed
          border-slate-300
          bg-white
          px-6
          py-14
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-500
          "
        >
          <FileText size={20} />
        </div>

        <h2
          className="
            mt-4
            text-lg
            font-bold
            text-slate-900
          "
        >
          No applications yet
        </h2>

        <p
          className="
            mx-auto
            mt-2
            max-w-md
            text-sm
            leading-6
            text-slate-500
          "
        >
          Once you apply for a job or internship,
          its progress will appear here.
        </p>

        <Link
          href="/opportunities"
          className="
            group
            mt-6
            inline-flex
            min-h-[44px]
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#1256AF]
            px-4
            text-sm
            font-bold
            text-white
            transition

            hover:bg-[#0E4C9D]
          "
        >
          <BriefcaseBusiness size={15} />

          Browse Opportunities

          <ArrowRight
            size={14}
            className="
              transition-transform
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div
        className="
          mb-5
          flex
          items-end
          justify-between
          gap-4
        "
      >
        <div>
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#1256AF]
            "
          >
            Application tracker
          </p>

          <h2
            className="
              mt-1
              text-xl
              font-bold
              tracking-[-0.025em]
              text-slate-900
            "
          >
            Application progress
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Follow each opportunity from application
            through the hiring process.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {applications.map(
          (application) => (
            <ApplicationCard
              key={
                application.applicationId
              }
              application={
                application
              }
              selectedFile={
                selectedFiles[
                  application.applicationId
                ] || null
              }
              uploading={
                uploadingId ===
                application.applicationId
              }
              onFileChange={
                onFileChange
              }
              onUpload={
                onUpload
              }
            />
          )
        )}
      </div>
    </section>
  );
}