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
              bg-cyan-50
              text-cyan-700
            "
          >
            <Code2 size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Coding Profiles
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Competitive programming and
              problem-solving activity.
            </p>
          </div>
        </div>

        <span
          className="
            rounded-full
            bg-cyan-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-cyan-700
          "
        >
          {profiles.length}
        </span>
      </div>

      {profiles.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          className="
            mt-5
            grid
            gap-4
            lg:grid-cols-2
          "
        >
          {profiles.map((profile) => (
            <article
              key={profile.id}
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
                  items-start
                  justify-between
                  gap-3
                "
              >
                <div className="min-w-0">
                  <p
                    className="
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
                      truncate
                      font-bold
                      text-slate-950
                    "
                  >
                    {profile.username}
                  </h3>
                </div>

                <span
                  className="
                    rounded-full
                    bg-slate-100
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    uppercase
                    text-slate-600
                  "
                >
                  {formatEnum(
                    profile.verificationStatus
                  )}
                </span>
              </div>

              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
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

              {(profile.platformTitle ||
                profile.platformRank) && (
                <p
                  className="
                    mt-4
                    text-xs
                    font-medium
                    text-slate-500
                  "
                >
                  {profile.platformTitle ||
                    profile.platformRank}
                </p>
              )}

              {profile.profileUrl && (
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-4
                    inline-flex
                    items-center
                    gap-1.5
                    text-xs
                    font-semibold
                    text-[#1256AF]
                  "
                >
                  Open Profile
                  <ExternalLink
                    size={13}
                  />
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
        rounded-lg
        bg-slate-50
        p-3
      "
    >
      <p className="text-[11px] text-slate-400">
        {label}
      </p>

      <p
        className="
          mt-1
          text-lg
          font-bold
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
      No coding profiles connected.
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