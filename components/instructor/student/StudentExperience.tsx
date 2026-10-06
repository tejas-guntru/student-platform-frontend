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
        scroll-mt-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        sm:p-6
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div className="flex items-start gap-3">
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
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Experience
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Internships and professional
              experience.
            </p>
          </div>
        </div>

        <Count value={experiences.length} />
      </div>

      {experiences.length === 0 ? (
        <EmptyState text="No experience added by this student." />
      ) : (
        <div className="mt-5 space-y-4">
          {experiences.map(
            (experience) => (
              <article
                key={
                  experience.experienceId
                }
                className="
                  rounded-xl
                  border
                  border-slate-200
                  p-4
                  sm:p-5
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                  "
                >
                  <div>
                    <h3
                      className="
                        font-bold
                        text-slate-950
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
                        text-[#1256AF]
                      "
                    >
                      {
                        experience.companyName
                      }
                    </p>
                  </div>

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-xs
                      text-slate-400
                    "
                  >
                    <CalendarDays
                      size={13}
                    />

                    {formatDate(
                      experience.startDate
                    )}{" "}
                    →{" "}
                    {experience.currentlyWorking
                      ? "Present"
                      : formatDate(
                          experience.endDate
                        )}
                  </div>
                </div>

                <div
                  className="
                    mt-4
                    flex
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
                      <MapPin size={12} />
                      {experience.location}
                    </Tag>
                  )}
                </div>

                {experience.description && (
                  <p
                    className="
                      mt-4
                      whitespace-pre-wrap
                      text-sm
                      leading-6
                      text-slate-600
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
        items-center
        gap-1
        rounded-full
        bg-slate-100
        px-2.5
        py-1
        text-xs
        font-medium
        text-slate-600
      "
    >
      {children}
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
        rounded-full
        bg-amber-50
        px-2.5
        py-1
        text-xs
        font-bold
        text-amber-700
      "
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
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        p-6
        text-center
        text-sm
        text-slate-500
      "
    >
      {text}
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

  return new Date(
    value
  ).toLocaleDateString();
}