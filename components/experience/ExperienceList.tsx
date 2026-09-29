"use client";

import {
  BriefcaseBusiness,
  Plus,
} from "lucide-react";

import type {
  StudentExperience,
} from "@/types/studentExperience";

import ExperienceCard from "@/components/experience/ExperienceCard";

interface ExperienceListProps {
  experiences: StudentExperience[];

  deletingId:
    string | null;

  onEdit:
    (
      experience: StudentExperience
    ) => void;

  onDelete:
    (
      experience: StudentExperience
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
      <div>
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.17em]
            text-[#1256AF]
          "
        >
          Career history
        </p>

        <h2
          className="
            mt-2
            text-2xl
            font-bold
            tracking-[-0.035em]
            text-slate-950
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
            text-slate-500
          "
        >
          Keep your internships, jobs,
          freelance work and other professional
          experience up to date.
        </p>
      </div>

      {experiences.length === 0 ? (
        <div
          className="
            mt-6
            rounded-[22px]
            border
            border-dashed
            border-slate-300
            bg-white
            px-6
            py-12
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
              rounded-2xl
              bg-[#1256AF]/[0.07]
              text-[#1256AF]
            "
          >
            <Plus size={20} />
          </div>

          <h3
            className="
              mt-4
              text-base
              font-bold
              text-slate-900
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
              text-slate-500
            "
          >
            Internships count too. Add your first
            professional experience above to start
            building your career history.
          </p>
        </div>
      ) : (
        <>
          <div
            className="
              mt-5
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-slate-500
            "
          >
            <BriefcaseBusiness
              size={14}
              className="text-[#1256AF]"
            />

            {experiences.length}{" "}
            {experiences.length === 1
              ? "experience"
              : "experiences"}{" "}
            added
          </div>

          <div className="mt-4 space-y-5">
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
                  onDelete={onDelete}
                />
              )
            )}
          </div>
        </>
      )}
    </section>
  );
}