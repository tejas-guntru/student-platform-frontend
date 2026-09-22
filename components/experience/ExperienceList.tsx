"use client";

import {
  BriefcaseBusiness,
  Plus,
  Sparkles,
} from "lucide-react";

import type {
  StudentExperience,
} from "@/types/studentExperience";

import ExperienceCard from "@/components/experience/ExperienceCard";

interface ExperienceListProps {
  experiences:
    StudentExperience[];

  deletingId:
    string | null;

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

export default function ExperienceList({
  experiences,
  deletingId,
  onEdit,
  onDelete,
}: ExperienceListProps) {
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
                text-emerald-600
              "
            >
              Career History
            </p>

            <Sparkles
              size={12}
              className="text-[#38A9EE]"
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
            My Experience
          </h2>

          <p
            className="
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-[#71899D]
            "
          >
            Add internships, jobs, freelance work and
            other experiences that demonstrate how you
            have applied your skills in real situations.
          </p>
        </div>

        {experiences.length > 0 && (
          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-[#D6E7F3]
              bg-[#F8FCFF]
              px-3
              py-1.5
            "
          >
            <BriefcaseBusiness
              size={12}
              className="text-emerald-600"
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.1em]
                text-[#68849A]
              "
            >
              {experiences.length}{" "}
              {experiences.length === 1
                ? "experience"
                : "experiences"}
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {experiences.length === 0 ? (
        <div
          className="
            relative
            mt-5
            overflow-hidden
            rounded-[24px]
            border
            border-dashed
            border-[#C8DEED]
            bg-white/80
            px-6
            py-12
            text-center
            shadow-[0_10px_30px_rgba(8,119,232,0.035)]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-40
              w-40
              -translate-x-1/2
              rounded-full
              bg-emerald-500/10
              blur-[65px]
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
                bg-emerald-50
                text-emerald-600
              "
            >
              <Plus size={22} />
            </div>

            <h3
              className="
                mt-4
                text-lg
                font-bold
                tracking-[-0.02em]
                text-[#173B63]
              "
            >
              No experience added yet
            </h3>

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
              Internships count too. Add your first
              professional experience using the form above.
            </p>
          </div>
        </div>
      ) : (
        /* ===================================================
            EXPERIENCE LIST
        =================================================== */

        <div
          className="
            mt-5
            space-y-5
          "
        >
          {experiences.map(
            (experience) => (
              <ExperienceCard
                key={
                  experience.experienceId
                }
                experience={
                  experience
                }
                deleting={
                  deletingId ===
                  experience.experienceId
                }
                onEdit={onEdit}
                onDelete={
                  onDelete
                }
              />
            )
          )}
        </div>
      )}
    </section>
  );
}