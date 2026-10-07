import {
  Code2,
  ExternalLink,
} from "lucide-react";

import type {
  InstructorStudentOverviewResponse,
} from "@/types/instructorStudent";

interface StudentCodingProfilesProps {
  profiles:
    InstructorStudentOverviewResponse["codingProfiles"];
}

export default function StudentCodingProfiles({
  profiles,
}: StudentCodingProfilesProps) {
  return (
    <section
      id="coding"
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
              bg-cyan-50
              text-cyan-700
            "
          >
            <Code2
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
              Coding Profiles
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
              Competitive programming and
              problem-solving activity.
            </p>
          </div>
        </div>

        <span
          className="
            inline-flex
            min-w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-cyan-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-cyan-700
          "
          aria-label={`${profiles.length} coding profiles`}
        >
          {profiles.length}
        </span>
      </div>

      {/* PROFILES */}

      {profiles.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          className="
            mt-5
            grid
            min-w-0
            grid-cols-1
            gap-4

            lg:grid-cols-2
          "
        >
          {profiles.map((profile) => (
            <article
              key={profile.id}
              className="
                min-w-0
                rounded-xl
                border
                border-slate-200
                p-4

                sm:p-5
              "
            >
              {/* PROFILE HEADER */}

              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-3

                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                "
              >
                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <p
                    className="
                      break-words
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    {formatEnum(
                      profile.platform
                    )}
                  </p>

                  <h3
                    className="
                      mt-1
                      break-words
                      font-bold
                      leading-6
                      text-slate-950

                      [overflow-wrap:anywhere]
                    "
                  >
                    {profile.username}
                  </h3>
                </div>

                <span
                  className="
                    inline-flex
                    w-fit
                    max-w-full
                    shrink-0
                    items-center
                    rounded-full
                    bg-slate-100
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    uppercase
                    leading-4
                    text-slate-600
                  "
                >
                  <span
                    className="
                      break-words

                      [overflow-wrap:anywhere]
                    "
                  >
                    {formatEnum(
                      profile.verificationStatus
                    )}
                  </span>
                </span>
              </div>

              {/* METRICS */}

              <div
                className="
                  mt-5
                  grid
                  min-w-0
                  grid-cols-2
                  gap-2

                  sm:gap-3
                "
              >
                <Metric
                  label="Rating"
                  value={
                    profile.currentRating
                  }
                />

                <Metric
                  label="Max Rating"
                  value={
                    profile.maxRating
                  }
                />

                <Metric
                  label="Problems"
                  value={
                    profile.problemsSolved
                  }
                />

                <Metric
                  label="Contests"
                  value={
                    profile.contestCount
                  }
                />
              </div>

              {/* PLATFORM TITLE / RANK */}

              {(profile.platformTitle ||
                profile.platformRank) && (
                <p
                  className="
                    mt-4
                    break-words
                    text-xs
                    font-medium
                    leading-5
                    text-slate-500

                    [overflow-wrap:anywhere]
                  "
                >
                  {profile.platformTitle ||
                    profile.platformRank}
                </p>
              )}

              {/* EXTERNAL PROFILE */}

              {profile.profileUrl && (
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-4
                    inline-flex
                    min-h-10
                    max-w-full
                    items-center
                    justify-center
                    gap-1.5
                    rounded-lg
                    text-xs
                    font-semibold
                    text-[#1256AF]
                    transition

                    hover:underline

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#1256AF]/25
                    focus-visible:ring-offset-2
                  "
                >
                  <span>Open Profile</span>

                  <ExternalLink
                    size={13}
                    className="shrink-0"
                    aria-hidden="true"
                  />

                  <span className="sr-only">
                    {" "}
                    {profile.username} on{" "}
                    {formatEnum(
                      profile.platform
                    )}
                    {" "}
                    (opens in a new tab)
                  </span>
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: number | null;
}) {
  return (
    <div
      className="
        min-w-0
        rounded-lg
        bg-slate-50
        p-3
      "
    >
      <p
        className="
          break-words
          text-[11px]
          leading-4
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          break-words
          text-lg
          font-bold
          leading-6
          text-slate-950
        "
      >
        {value ?? "—"}
      </p>
    </div>
  );
}

function EmptyState() {
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
        No coding profiles connected.
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