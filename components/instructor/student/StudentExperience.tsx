import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
} from "lucide-react";

import type {
  InstructorStudentOverviewResponse,
} from "@/types/instructorStudent";

interface StudentExperienceProps {
  experiences:
    InstructorStudentOverviewResponse["experiences"];
}

export default function StudentExperience({
  experiences,
}: StudentExperienceProps) {
  return (
    <section
      id="experience"
      className="
        min-w-0
        scroll-mt-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4

        sm:p-6
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          min-w-0
          items-start
          justify-between
          gap-3

          sm:gap-4
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-1
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
              rounded-xl
              bg-amber-50
              text-amber-700
            "
          >
            <BriefcaseBusiness
              size={18}
              aria-hidden="true"
            />
          </div>

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <h2
              className="
                break-words
                text-lg
                font-bold
                text-slate-950
              "
            >
              Experience
            </h2>

            <p
              className="
                mt-1
                max-w-2xl
                break-words
                text-sm
                leading-6
                text-slate-500
              "
            >
              Internships and professional
              experience.
            </p>
          </div>
        </div>

        <Count value={experiences.length} />
      </div>

      {/* EXPERIENCE LIST */}

      {experiences.length === 0 ? (
        <EmptyState text="No experience added by this student." />
      ) : (
        <div
          className="
            mt-5
            min-w-0
            space-y-4
          "
        >
          {experiences.map(
            (experience) => (
              <article
                key={
                  experience.experienceId
                }
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-slate-200
                  p-4

                  sm:p-5
                "
              >
                {/* ROLE / COMPANY / DATES */}

                <div
                  className="
                    flex
                    min-w-0
                    flex-col
                    gap-3

                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                    sm:gap-4
                  "
                >
                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <h3
                      className="
                        break-words
                        font-bold
                        leading-6
                        text-slate-950

                        [overflow-wrap:anywhere]
                      "
                    >
                      {
                        experience.roleTitle
                      }
                    </h3>

                    <p
                      className="
                        mt-1
                        break-words
                        text-sm
                        font-semibold
                        leading-6
                        text-[#1256AF]

                        [overflow-wrap:anywhere]
                      "
                    >
                      {
                        experience.companyName
                      }
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      min-w-0
                      items-start
                      gap-1.5
                      text-xs
                      leading-5
                      text-slate-400

                      sm:shrink-0
                      sm:items-center
                      sm:text-right
                    "
                  >
                    <CalendarDays
                      size={13}
                      className="
                        mt-0.5
                        shrink-0

                        sm:mt-0
                      "
                      aria-hidden="true"
                    />

                    <span className="break-words">
                      {formatDate(
                        experience.startDate
                      )}{" "}
                      <span aria-hidden="true">
                        →
                      </span>{" "}
                      {experience.currentlyWorking
                        ? "Present"
                        : formatDate(
                            experience.endDate
                          )}
                    </span>
                  </div>
                </div>

                {/* META */}

                {(experience.employmentType ||
                  experience.location) && (
                  <div
                    className="
                      mt-4
                      flex
                      min-w-0
                      flex-wrap
                      gap-2
                    "
                  >
                    {experience.employmentType && (
                      <Tag>
                        {formatEnum(
                          experience.employmentType
                        )}
                      </Tag>
                    )}

                    {experience.location && (
                      <Tag>
                        <MapPin
                          size={12}
                          className="shrink-0"
                          aria-hidden="true"
                        />

                        {
                          experience.location
                        }
                      </Tag>
                    )}
                  </div>
                )}

                {/* DESCRIPTION */}

                {experience.description && (
                  <p
                    className="
                      mt-4
                      max-w-full
                      whitespace-pre-wrap
                      break-words
                      text-sm
                      leading-6
                      text-slate-600

                      [overflow-wrap:anywhere]
                    "
                  >
                    {
                      experience.description
                    }
                  </p>
                )}
              </article>
            )
          )}
        </div>
      )}
    </section>
  );
}

function Tag({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        inline-flex
        min-w-0
        max-w-full
        items-center
        gap-1
        rounded-full
        bg-slate-100
        px-2.5
        py-1
        text-xs
        font-medium
        leading-5
        text-slate-600
      "
    >
      <span
        className="
          min-w-0
          max-w-full
          break-words

          [overflow-wrap:anywhere]
        "
      >
        {children}
      </span>
    </span>
  );
}

function Count({
  value,
}: {
  value: number;
}) {
  return (
    <span
      className="
        inline-flex
        min-w-7
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-amber-50
        px-2.5
        py-1
        text-xs
        font-bold
        text-amber-700
      "
      aria-label={`${value} experience entries`}
    >
      {value}
    </span>
  );
}

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div
      className="
        mt-5
        min-w-0
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        px-4
        py-6
        text-center

        sm:px-6
      "
    >
      <p
        className="
          break-words
          text-sm
          font-medium
          leading-6
          text-slate-500
        "
      >
        {text}
      </p>
    </div>
  );
}

function formatEnum(
  value: string
) {
  return value
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

function formatDate(
  value: string | null
) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString();
}