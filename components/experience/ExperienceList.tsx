"use client";

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
    <section className="mt-8">
      {/* HEADER */}
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C9A227]" />

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
              Career History
            </p>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#14213D]">
            My Experience
          </h2>
        </div>

        <span className="rounded-full border border-[#D8D5CC] bg-white px-3 py-1.5 text-xs font-bold text-[#6B707B]">
          {experiences.length}{" "}
          {experiences.length === 1
            ? "experience"
            : "experiences"}
        </span>
      </div>

      {/* EMPTY */}
      {experiences.length === 0 ? (
        <div className="rounded-[20px] border border-dashed border-[#D8D5CC] bg-white/70 p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F0CF] text-xl font-bold text-[#A98616]">
            +
          </div>

          <h3 className="mt-4 font-bold text-[#14213D]">
            No experience added yet
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#6B707B]">
            Internships count too. Add
            your first experience above.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
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