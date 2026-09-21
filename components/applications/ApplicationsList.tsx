"use client";

import Link from "next/link";

import type {
  ChangeEvent,
} from "react";

import type {
  ApplicationResponse,
} from "@/types/application";

import ApplicationCard from "@/components/applications/ApplicationCard";

interface ApplicationsListProps {
  applications:
    ApplicationResponse[];

  selectedFiles:
    Record<
      string,
      File | null
    >;

  uploadingId:
    string | null;

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

export default function ApplicationsList({
  applications,
  selectedFiles,
  uploadingId,
  onFileChange,
  onUpload,
}: ApplicationsListProps) {
  if (
    applications.length === 0
  ) {
    return (
      <section className="mt-8 rounded-[24px] border border-dashed border-[#D8D5CC] bg-white/70 p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F0CF] text-xl font-bold text-[#A98616]">
          +
        </div>

        <h2 className="mt-4 text-xl font-bold text-[#14213D]">
          No applications yet
        </h2>

        <p className="mt-2 text-sm text-[#6B707B]">
          Apply to an opportunity and
          it will appear here.
        </p>

        <Link
          href="/opportunities"
          className="mt-6 inline-flex rounded-xl bg-[#C9A227] px-5 py-3 font-bold text-[#14213D] transition hover:bg-[#E0C766]"
        >
          Browse Opportunities
        </Link>
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
            application={
              application
            }
            selectedFile={
              selectedFiles[
                application
                  .applicationId
              ] || null
            }
            uploading={
              uploadingId ===
              application
                .applicationId
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
    </section>
  );
}