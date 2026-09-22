"use client";

import Link from "next/link";

import type {
  ChangeEvent,
} from "react";

import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  Plus,
  Sparkles,
} from "lucide-react";

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
  // =======================================================
  // EMPTY STATE
  // =======================================================

  if (
    applications.length === 0
  ) {
    return (
      <section
        className="
          relative
          overflow-hidden
          rounded-[26px]
          border
          border-dashed
          border-[#C8DEED]
          bg-white/80
          px-6
          py-14
          text-center
          shadow-[0_10px_30px_rgba(8,119,232,0.035)]
        "
      >
        {/* BACKGROUND GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-44
            w-44
            -translate-x-1/2
            rounded-full
            bg-[#38BDF8]/10
            blur-[70px]
          "
        />

        <div className="relative">
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <Plus size={22} />
          </div>

          <div
            className="
              mt-4
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#0877E8]
              "
            >
              Applications
            </p>

            <Sparkles
              size={12}
              className="text-violet-500"
            />
          </div>

          <h2
            className="
              mt-2
              text-xl
              font-bold
              tracking-[-0.03em]
              text-[#173B63]
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
              text-[#71899D]
            "
          >
            Apply to a job or internship and your
            application progress will appear here.
          </p>

          <Link
            href="/opportunities"
            className="
              group
              mt-6
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#0877E8]
              to-[#1294F2]
              px-5
              py-3
              text-sm
              font-bold
              text-white
              shadow-[0_9px_22px_rgba(8,119,232,0.18)]
              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:shadow-[0_13px_28px_rgba(8,119,232,0.24)]
            "
          >
            <BriefcaseBusiness
              size={15}
            />

            Browse Opportunities

            <ArrowRight
              size={14}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </section>
    );
  }

  // =======================================================
  // APPLICATIONS
  // =======================================================

  return (
    <section>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#0877E8]
              "
            >
              Application Tracker
            </p>

            <Sparkles
              size={12}
              className="text-violet-500"
            />
          </div>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-[#173B63]
            "
          >
            Your Applications
          </h2>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-[#71899D]
            "
          >
            Follow each application from submission to
            review, shortlist, resume request and final
            decision.
          </p>
        </div>

        {/* COUNT */}

        <div
          className="
            inline-flex
            w-fit
            items-center
            gap-3
            rounded-[16px]
            border
            border-[#D6E7F3]
            bg-white
            px-4
            py-3
            shadow-[0_8px_22px_rgba(8,119,232,0.04)]
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <FileText size={16} />
          </div>

          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#8A9FAF]
              "
            >
              Total
            </p>

            <p
              className="
                mt-0.5
                text-sm
                font-bold
                text-[#173B63]
              "
            >
              {applications.length}{" "}
              {applications.length === 1
                ? "application"
                : "applications"}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          APPLICATION CARDS
      ===================================================== */}

      <div
        className="
          mt-5
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
      </div>
    </section>
  );
}