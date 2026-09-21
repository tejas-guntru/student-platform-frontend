"use client";

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
    <article className="rounded-[20px] border border-[#D8D5CC] bg-white p-6 shadow-[0_12px_35px_rgba(20,33,61,0.04)] transition-all duration-200 hover:border-[#C9A227] hover:shadow-[0_18px_45px_rgba(20,33,61,0.07)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          {/* ROLE */}
          <h3 className="text-xl font-bold tracking-[-0.02em] text-[#14213D]">
            {experience.roleTitle}
          </h3>

          {/* COMPANY */}
          <p className="mt-1 font-semibold text-[#4C5568]">
            {experience.companyName}
          </p>

          {/* BADGES */}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>
              {formatEmploymentType(
                experience.employmentType
              )}
            </Badge>

            {experience.location && (
              <Badge>
                {experience.location}
              </Badge>
            )}

            {experience.currentlyWorking && (
              <span className="rounded-full border border-[#BFD7C3] bg-[#F1F8F2] px-3 py-1 text-xs font-semibold text-[#347A3A]">
                Current
              </span>
            )}
          </div>

          {/* DATE */}
          <p className="mt-4 text-sm font-medium text-[#858994]">
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
          </p>

          {/* DESCRIPTION */}
          {experience.description && (
            <p className="mt-5 whitespace-pre-line text-sm leading-6 text-[#6B707B]">
              {experience.description}
            </p>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() =>
              onEdit(
                experience
              )
            }
            className="
              rounded-xl
              border
              border-[#D8D5CC]
              bg-[#F8F7F3]
              px-4
              py-2
              text-sm
              font-bold
              text-[#14213D]
              transition-all
              hover:border-[#C9A227]
              hover:bg-white
              hover:text-[#A98616]
            "
          >
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
              rounded-xl
              border
              border-[#E4C7C7]
              bg-[#FBF1F1]
              px-4
              py-2
              text-sm
              font-bold
              text-[#A43F3F]
              transition-all
              hover:border-[#D9AFAF]
              hover:bg-[#F7E7E7]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {deleting
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}

function Badge({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <span className="rounded-full border border-[#E3DFD5] bg-[#F8F7F3] px-3 py-1 text-xs font-semibold text-[#5F6470]">
      {children}
    </span>
  );
}