"use client";

import type {
  ReactNode,
} from "react";

import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  LoaderCircle,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

import type {
  StudentExperience,
} from "@/types/studentExperience";

import {
  formatEmploymentType,
  formatMonth,
} from "@/utils/experienceFormatters";

interface ExperienceCardProps {
  experience:
    StudentExperience;

  deleting: boolean;

  onEdit:
    (
      experience:
        StudentExperience
    ) => void;

  onDelete:
    (
      experience:
        StudentExperience
    ) => void;
}

export default function ExperienceCard({
  experience,
  deleting,
  onEdit,
  onDelete,
}: ExperienceCardProps) {
  return (
    <article
      className="
        group
        rounded-[22px]
        border
        border-slate-200
        bg-white
        p-5
        transition
        duration-300

        hover:border-[#1256AF]/20
        hover:shadow-[0_16px_45px_rgba(15,23,42,0.06)]

        sm:p-6
      "
    >
      {/* HEADER */}

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
              bg-[#1256AF]/[0.07]
              text-[#1256AF]
            "
          >
            <BriefcaseBusiness
              size={18}
            />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-slate-400
              "
            >
              Professional experience
            </p>

            <h3
              className="
                mt-1.5
                break-words
                text-xl
                font-bold
                tracking-[-0.03em]
                text-slate-900
              "
            >
              {experience.roleTitle}
            </h3>

            <div
              className="
                mt-1.5
                flex
                items-center
                gap-2
              "
            >
              <Building2
                size={13}
                className="
                  shrink-0
                  text-slate-400
                "
              />

              <p
                className="
                  break-words
                  text-sm
                  font-semibold
                  text-slate-600
                "
              >
                {experience.companyName}
              </p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
          "
        >
          <button
            type="button"
            onClick={() =>
              onEdit(experience)
            }
            disabled={deleting}
            className="
              inline-flex
              min-h-9
              items-center
              justify-center
              gap-1.5
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              text-xs
              font-semibold
              text-slate-600
              transition

              hover:border-[#1256AF]/20
              hover:bg-[#1256AF]/[0.03]
              hover:text-[#1256AF]

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Pencil size={12} />

            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(experience)
            }
            disabled={deleting}
            className="
              inline-flex
              min-h-9
              items-center
              justify-center
              gap-1.5
              rounded-lg
              border
              border-red-100
              bg-white
              px-3
              text-xs
              font-semibold
              text-red-600
              transition

              hover:border-red-200
              hover:bg-red-50

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {deleting ? (
              <>
                <LoaderCircle
                  size={12}
                  className="animate-spin"
                />

                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={12} />

                Delete
              </>
            )}
          </button>
        </div>
      </div>

      {/* META */}

      <div
        className="
          mt-5
          flex
          flex-wrap
          gap-2
        "
      >
        <Badge>
          <BriefcaseBusiness
            size={10}
            className="text-[#1256AF]"
          />

          {formatEmploymentType(
            experience.employmentType
          )}
        </Badge>

        {experience.location && (
          <Badge>
            <MapPin
              size={10}
              className="text-[#1256AF]"
            />

            {experience.location}
          </Badge>
        )}

        {experience.currentlyWorking && (
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-emerald-200
              bg-emerald-50
              px-2.5
              py-1
              text-[10px]
              font-bold
              text-emerald-700
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-500
              "
            />

            Current
          </span>
        )}
      </div>

      {/* TIMELINE */}

      <div
        className="
          mt-4
          flex
          items-center
          gap-2
          text-xs
          font-medium
          text-slate-500
        "
      >
        <CalendarDays
          size={13}
          className="
            shrink-0
            text-[#1256AF]
          "
        />

        <span>
          {formatMonth(
            experience.startDate
          )}

          {" → "}

          {experience.currentlyWorking
            ? "Present"
            : experience.endDate
              ? formatMonth(
                  experience.endDate
                )
              : "-"}
        </span>
      </div>

      {/* DESCRIPTION */}

      {experience.description && (
        <p
          className="
            mt-5
            whitespace-pre-line
            border-t
            border-slate-100
            pt-5
            text-sm
            leading-6
            text-slate-600
          "
        >
          {experience.description}
        </p>
      )}
    </article>
  );
}

function Badge({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-slate-200
        bg-slate-50
        px-2.5
        py-1
        text-[10px]
        font-semibold
        text-slate-600
      "
    >
      {children}
    </span>
  );
}