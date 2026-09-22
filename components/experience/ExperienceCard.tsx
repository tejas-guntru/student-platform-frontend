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
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_12px_34px_rgba(8,119,232,0.045)]
        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-[#B8DCF3]
        hover:shadow-[0_18px_42px_rgba(8,119,232,0.085)]
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
          from-emerald-500
          via-[#0877E8]
          to-[#38BDF8]
        "
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-emerald-500/0
          blur-[90px]
          transition-all
          duration-300

          group-hover:bg-emerald-500/8
        "
      />

      <div
        className="
          relative
          p-5

          sm:p-6
        "
      >
        {/* ===================================================
            HEADER
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
                bg-emerald-50
                text-emerald-600
              "
            >
              <BriefcaseBusiness
                size={19}
              />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-[#8A9FAF]
                "
              >
                Professional Experience
              </p>

              <h3
                className="
                  mt-1.5
                  break-words
                  text-xl
                  font-bold
                  tracking-[-0.03em]
                  text-[#173B63]

                  sm:text-[22px]
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
                  size={14}
                  className="
                    shrink-0
                    text-[#8BB9D6]
                  "
                />

                <p
                  className="
                    break-words
                    text-sm
                    font-semibold
                    text-[#527087]
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
                onEdit(
                  experience
                )
              }
              disabled={deleting}
              className="
                inline-flex
                items-center
                justify-center
                gap-1.5
                rounded-xl
                border
                border-[#D5E7F3]
                bg-[#F8FCFF]
                px-3
                py-2
                text-xs
                font-bold
                text-[#58748B]
                transition-all
                duration-200

                hover:border-[#B9DCF2]
                hover:bg-white
                hover:text-[#0877E8]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Pencil size={13} />

              Edit
            </button>

            <button
              type="button"
              disabled={deleting}
              onClick={() =>
                onDelete(
                  experience
                )
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-1.5
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-3
                py-2
                text-xs
                font-bold
                text-red-600
                transition-all
                duration-200

                hover:border-red-300
                hover:bg-red-100

                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {deleting ? (
                <>
                  <LoaderCircle
                    size={13}
                    className="animate-spin"
                  />

                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={13} />

                  Delete
                </>
              )}
            </button>
          </div>
        </div>

        {/* ===================================================
            BADGES
        =================================================== */}

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
              size={11}
              className="text-[#0877E8]"
            />

            {formatEmploymentType(
              experience.employmentType
            )}
          </Badge>

          {experience.location && (
            <Badge>
              <MapPin
                size={11}
                className="text-[#0877E8]"
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
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.08em]
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

        {/* ===================================================
            TIMELINE
        =================================================== */}

        <div
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-[#E0ECF5]
            bg-[#F8FCFF]
            px-3.5
            py-2.5
          "
        >
          <CalendarDays
            size={13}
            className="
              shrink-0
              text-[#8BB9D6]
            "
          />

          <span
            className="
              text-xs
              font-semibold
              text-[#68849A]
            "
          >
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

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        {experience.description && (
          <div
            className="
              mt-5
              rounded-[18px]
              border
              border-[#E1ECF5]
              bg-[#F8FCFF]
              px-4
              py-4
            "
          >
            <p
              className="
                whitespace-pre-line
                text-sm
                leading-6
                text-[#607C91]
              "
            >
              {experience.description}
            </p>
          </div>
        )}
      </div>
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
        border-[#D5E7F3]
        bg-[#F5FAFE]
        px-3
        py-1.5
        text-[10px]
        font-bold
        text-[#52748D]
      "
    >
      {children}
    </span>
  );
}