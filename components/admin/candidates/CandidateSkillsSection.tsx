import {
  BadgeCheck,
  Braces,
} from "lucide-react";

import type {
  AdminCandidate,
} from "@/types/adminCandidate";

import {
  formatCandidateText,
} from "@/utils/adminCandidateUtils";

import SectionHeader from "./shared/SectionHeader";
import EmptyCard from "./shared/EmptyCard";

interface CandidateSkillsSectionProps {
  candidate: AdminCandidate;
}

export default function CandidateSkillsSection({
  candidate,
}: CandidateSkillsSectionProps) {
  return (
    <section
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_10px_34px_rgba(8,119,232,0.045)]
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[#E5EFF7]
          bg-[#FBFDFF]
          px-5
          py-5

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <Braces size={18} />
          </div>

          <SectionHeader
            title="Skills"
            subtitle={`${candidate.skills.length} ${
              candidate.skills.length === 1
                ? "skill"
                : "skills"
            } added`}
          />
        </div>

        {candidate.skills.length > 0 && (
          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-[#D7E8F4]
              bg-white
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#67839A]
            "
          >
            <BadgeCheck
              size={13}
              className="text-[#0877E8]"
            />

            {candidate.skills.length} total
          </div>
        )}
      </div>

      {/* CONTENT */}

      <div
        className="
          p-5

          sm:p-6
        "
      >
        {candidate.skills.length === 0 ? (
          <EmptyCard>
            Candidate has not added skills.
          </EmptyCard>
        ) : (
          <div
            className="
              grid
              gap-3

              sm:grid-cols-2

              lg:grid-cols-3

              xl:grid-cols-4
            "
          >
            {candidate.skills.map(
              (skill) => (
                <article
                  key={skill.skillId}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[18px]
                    border
                    border-[#E0EBF4]
                    bg-[#FBFDFF]
                    p-4
                    transition-all
                    duration-200

                    hover:-translate-y-0.5
                    hover:border-[#BEDFF3]
                    hover:bg-white
                    hover:shadow-[0_10px_28px_rgba(8,119,232,0.07)]
                  "
                >
                  {/* ACCENT */}

                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-full
                      w-[3px]
                      bg-gradient-to-b
                      from-[#0877E8]
                      to-[#38BDF8]
                      opacity-0
                      transition-opacity
                      duration-200

                      group-hover:opacity-100
                    "
                  />

                  <div
                    className="
                      flex
                      items-start
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#EAF6FF]
                        text-[#0877E8]
                      "
                    >
                      <Braces size={15} />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm
                          font-bold
                          text-[#274E70]
                        "
                      >
                        {skill.skillName}
                      </p>

                      <span
                        className="
                          mt-2
                          inline-flex
                          rounded-full
                          border
                          border-[#D5E7F3]
                          bg-white
                          px-2.5
                          py-1
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.1em]
                          text-[#6C879C]
                        "
                      >
                        {formatCandidateText(
                          skill.proficiency
                        )}
                      </span>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}