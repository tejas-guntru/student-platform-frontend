import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  MapPin,
} from "lucide-react";

import type {
  AdminCandidate,
} from "@/types/adminCandidate";

import {
  formatCandidateDate,
  formatCandidateText,
} from "@/utils/adminCandidateUtils";

import SectionHeader from "./shared/SectionHeader";
import EmptyCard from "./shared/EmptyCard";
import Tag from "./shared/Tag";

interface CandidateExperienceSectionProps {
  candidate: AdminCandidate;
}

export default function CandidateExperienceSection({
  candidate,
}: CandidateExperienceSectionProps) {
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
            <BriefcaseBusiness size={18} />
          </div>

          <SectionHeader
            title="Experience"
            subtitle={`${candidate.experiences.length} ${
              candidate.experiences.length === 1
                ? "entry"
                : "entries"
            }`}
          />
        </div>

        {candidate.experiences.length > 0 && (
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
            <BriefcaseBusiness
              size={13}
              className="text-[#0877E8]"
            />

            {candidate.experiences.length} total
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
        {candidate.experiences.length === 0 ? (
          <EmptyCard>
            Candidate has not added experience.
          </EmptyCard>
        ) : (
          <div className="space-y-5">
            {candidate.experiences.map(
              (experience) => (
                <article
                  key={
                    experience.experienceId
                  }
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-[#DCEAF5]
                    bg-[#FBFDFF]
                    p-5
                    transition-all
                    duration-300

                    hover:border-[#B9DDF3]
                    hover:bg-white
                    hover:shadow-[0_16px_38px_rgba(8,119,232,0.07)]

                    sm:p-6
                  "
                >
                  {/* LEFT ACCENT */}

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

                  {/* ROLE + COMPANY */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-4

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
                        gap-3
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
                          bg-[#EAF6FF]
                          text-[#0877E8]
                        "
                      >
                        <Building2 size={18} />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.14em]
                            text-[#8BA0B1]
                          "
                        >
                          Work Experience
                        </p>

                        <h3
                          className="
                            mt-1
                            text-xl
                            font-bold
                            tracking-[-0.025em]
                            text-[#274E70]
                          "
                        >
                          {
                            experience.roleTitle
                          }
                        </h3>

                        <p
                          className="
                            mt-1
                            text-sm
                            font-semibold
                            text-[#607A90]
                          "
                        >
                          {
                            experience.companyName
                          }
                        </p>
                      </div>
                    </div>

                    {experience.currentlyWorking && (
                      <span
                        className="
                          inline-flex
                          w-fit
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-emerald-200
                          bg-emerald-50
                          px-3
                          py-1.5
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.1em]
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

                  {/* META */}

                  <div
                    className="
                      mt-5
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    <Tag>
                      {formatCandidateText(
                        experience.employmentType
                      )}
                    </Tag>

                    {experience.location && (
                      <Tag>
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                          "
                        >
                          <MapPin size={11} />

                          {experience.location}
                        </span>
                      </Tag>
                    )}
                  </div>

                  {/* DATE RANGE */}

                  <div
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-[#DEEAF3]
                      bg-white
                      px-3.5
                      py-2.5
                      text-xs
                      font-medium
                      text-[#71899D]
                    "
                  >
                    <CalendarDays
                      size={14}
                      className="text-[#87B8D6]"
                    />

                    <span>
                      {formatCandidateDate(
                        experience.startDate
                      )}

                      {" → "}

                      {experience.currentlyWorking
                        ? "Present"
                        : experience.endDate
                          ? formatCandidateDate(
                              experience.endDate
                            )
                          : "-"}
                    </span>
                  </div>

                  {/* DESCRIPTION */}

                  {experience.description && (
                    <div
                      className="
                        mt-5
                        rounded-[18px]
                        border
                        border-[#E1ECF5]
                        bg-white
                        p-4
                      "
                    >
                      <p
                        className="
                          whitespace-pre-line
                          text-sm
                          leading-7
                          text-[#607A90]
                        "
                      >
                        {
                          experience.description
                        }
                      </p>
                    </div>
                  )}
                </article>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}