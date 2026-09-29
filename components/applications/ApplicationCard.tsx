"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileUp,
} from "lucide-react";

import type {
  ApplicationResponse,
} from "@/types/application";

import ApplicationStatusBadge from "@/components/applications/ApplicationStatusBadge";

import {
  formatApplicationDate,
} from "@/utils/applicationUtils";

interface ApplicationCardProps {
  application: ApplicationResponse;

  onSelect: (
    application: ApplicationResponse
  ) => void;
}

export default function ApplicationCard({
  application,
  onSelect,
}: ApplicationCardProps) {
  const needsResume =
    application.status ===
    "RESUME_REQUESTED";

  const resumeSubmitted =
    application.status ===
      "RESUME_SUBMITTED" ||
    application.status ===
      "FORWARDED_TO_EMPLOYER" ||
    application.status ===
      "SELECTED";

  return (
    <button
      type="button"
      onClick={() =>
        onSelect(application)
      }
      className="
        group
        flex
        min-h-[270px]
        w-full
        flex-col
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        text-left
        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:border-slate-300
        hover:shadow-[0_14px_35px_rgba(15,23,42,0.07)]

        focus:outline-none
        focus:ring-4
        focus:ring-[#1256AF]/10

        sm:p-6
      "
    >
      {/* TOP */}

      <div
        className="
          flex
          items-start
          justify-between
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

        <ApplicationStatusBadge
          status={application.status}
        />
      </div>

      {/* ROLE */}

      <div className="mt-5">
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

        <h3
          className="
            mt-2
            line-clamp-2
            text-xl
            font-bold
            tracking-[-0.03em]
            text-slate-950
          "
        >
          {application.opportunityTitle}
        </h3>
      </div>

      {/* APPLIED DATE */}

      <div
        className="
          mt-5
          flex
          items-center
          gap-2
          border-t
          border-slate-100
          pt-4
        "
      >
        <CalendarDays
          size={14}
          className="text-[#1256AF]"
        />

        <div>
          <p
            className="
              text-[8px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-slate-400
            "
          >
            Applied
          </p>

          <p
            className="
              mt-0.5
              text-xs
              font-semibold
              text-slate-600
            "
          >
            {formatApplicationDate(
              application.appliedAt
            )}
          </p>
        </div>
      </div>

      {/* IMPORTANT STATE */}

      {needsResume && (
        <div
          className="
            mt-4
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-amber-200
            bg-amber-50
            px-3.5
            py-3
          "
        >
          <FileUp
            size={15}
            className="
              shrink-0
              text-amber-600
            "
          />

          <div>
            <p
              className="
                text-xs
                font-bold
                text-amber-800
              "
            >
              Resume requested
            </p>

            <p
              className="
                mt-0.5
                text-[11px]
                text-amber-700
              "
            >
              Action required
            </p>
          </div>
        </div>
      )}

      {resumeSubmitted && (
        <div
          className="
            mt-4
            flex
            items-center
            gap-3
            rounded-xl
            bg-emerald-50
            px-3.5
            py-3
          "
        >
          <CheckCircle2
            size={15}
            className="
              shrink-0
              text-emerald-600
            "
          />

          <div>
            <p
              className="
                text-xs
                font-bold
                text-emerald-800
              "
            >
              Resume submitted
            </p>

            <p
              className="
                mt-0.5
                text-[11px]
                text-emerald-700
              "
            >
              No action needed
            </p>
          </div>
        </div>
      )}

      {/* BOTTOM */}

      <div
        className="
          mt-auto
          flex
          items-center
          justify-between
          pt-6
        "
      >
        <span
          className="
            text-xs
            font-semibold
            text-slate-400
            transition-colors

            group-hover:text-[#1256AF]
          "
        >
          View application
        </span>

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            text-slate-500
            transition-all

            group-hover:border-[#1256AF]
            group-hover:bg-[#1256AF]
            group-hover:text-white
          "
        >
          <ArrowUpRight
            size={15}
          />
        </div>
      </div>
    </button>
  );
}