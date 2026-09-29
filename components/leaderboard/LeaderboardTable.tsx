"use client";

import {
  Building2,
  GraduationCap,
  LoaderCircle,
  Trophy,
  UserRound,
} from "lucide-react";

import type {
  LeaderboardEntry,
} from "@/types/leaderboard";

import {
  formatRank,
  formatScore,
} from "@/utils/leaderboardFormatters";

type ViewMode =
  | "GLOBAL"
  | "COLLEGE"
  | "YEAR";

interface LeaderboardTableProps {
  leaderboard:
    LeaderboardEntry[];

  myRank:
    LeaderboardEntry | null;

  viewMode:
    ViewMode;

  selectedYear:
    number | null;

  collegeName:
    string | null;

  tableLoading:
    boolean;

  tableTitle:
    string;

  getEntryRank:
    (
      entry: LeaderboardEntry
    ) => number | null;
}

export default function LeaderboardTable({
  leaderboard,
  myRank,
  viewMode,
  selectedYear,
  collegeName,
  tableLoading,
  tableTitle,
  getEntryRank,
}: LeaderboardTableProps) {
  /*
   * UI LIMIT ONLY.
   *
   * This keeps the interface compact, but the backend
   * should ultimately return only these contextual
   * entries instead of sending a large leaderboard.
   */
  const visibleEntries =
    getNearbyEntries(
      leaderboard,
      myRank,
      getEntryRank
    );

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-slate-200
          px-5
          py-5

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        <div>
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#1256AF]
            "
          >
            Your ranking context
          </p>

          <h2
            className="
              mt-1
              text-lg
              font-bold
              tracking-[-0.025em]
              text-slate-950
            "
          >
            {tableTitle}
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            Students ranked closest to
            your current position.
          </p>
        </div>

        <ContextBadge
          viewMode={viewMode}
          collegeName={collegeName}
          selectedYear={selectedYear}
        />
      </div>

      {/* CONTENT */}

      {tableLoading ? (
        <LeaderboardLoading />
      ) : visibleEntries.length === 0 ? (
        <EmptyLeaderboard />
      ) : (
        <div>
          {/* HEAD */}

          <div
            className="
              grid
              grid-cols-[70px_minmax(0,1fr)_110px]
              border-b
              border-slate-200
              bg-slate-50
              px-5
              py-3

              sm:grid-cols-[90px_minmax(0,1fr)_140px]
              sm:px-6
            "
          >
            <Heading>
              Rank
            </Heading>

            <Heading>
              Student
            </Heading>

            <Heading right>
              Score
            </Heading>
          </div>

          {/* ROWS */}

          {visibleEntries.map(
            (entry) => {
              const isMe =
                Boolean(
                  myRank &&
                    entry.studentId ===
                      myRank.studentId
                );

              const rank =
                getEntryRank(entry);

              return (
                <div
                  key={entry.studentId}
                  className={`
                    grid
                    grid-cols-[70px_minmax(0,1fr)_110px]
                    items-center
                    border-b
                    border-slate-100
                    px-5
                    py-4
                    last:border-b-0

                    sm:grid-cols-[90px_minmax(0,1fr)_140px]
                    sm:px-6

                    ${
                      isMe
                        ? "bg-blue-50/70"
                        : "bg-white"
                    }
                  `}
                >
                  {/* RANK */}

                  <div>
                    <span
                      className={`
                        text-base
                        font-bold
                        tabular-nums

                        ${
                          isMe
                            ? "text-[#1256AF]"
                            : "text-slate-800"
                        }
                      `}
                    >
                      {formatRank(rank)}
                    </span>
                  </div>

                  {/* STUDENT */}

                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg

                        ${
                          isMe
                            ? "bg-[#1256AF] text-white"
                            : "bg-slate-100 text-slate-500"
                        }
                      `}
                    >
                      <UserRound
                        size={15}
                      />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm
                          font-bold
                          text-slate-900
                        "
                      >
                        {isMe
                          ? "You"
                          : getPeerDisplayName(
                              entry.fullName
                            )}
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[10px]
                          font-semibold
                          text-slate-400
                        "
                      >
                        {isMe
                          ? "Your position"
                          : "Trailbliz student"}
                      </p>
                    </div>
                  </div>

                  {/* SCORE */}

                  <div className="text-right">
                    <span
                      className={`
                        text-sm
                        font-bold
                        tabular-nums

                        ${
                          isMe
                            ? "text-[#1256AF]"
                            : "text-slate-700"
                        }
                      `}
                    >
                      {formatScore(
                        entry.overallScore
                      )}
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}

/*
 * Temporary frontend neighborhood.
 *
 * Keep the current student plus the nearest
 * two students above and two below.
 *
 * The API should eventually perform this
 * selection server-side.
 */
function getNearbyEntries(
  leaderboard:
    LeaderboardEntry[],
  myRank:
    LeaderboardEntry | null,
  getEntryRank:
    (
      entry: LeaderboardEntry
    ) => number | null
) {
  if (leaderboard.length === 0) {
    return [];
  }

  const sorted =
    [...leaderboard].sort(
      (a, b) => {
        const rankA =
          getEntryRank(a) ??
          Number.MAX_SAFE_INTEGER;

        const rankB =
          getEntryRank(b) ??
          Number.MAX_SAFE_INTEGER;

        return rankA - rankB;
      }
    );

  if (!myRank) {
    /*
     * Until the backend provides a contextual
     * endpoint, avoid exposing the entire list.
     */
    return sorted.slice(0, 5);
  }

  const myIndex =
    sorted.findIndex(
      (entry) =>
        entry.studentId ===
        myRank.studentId
    );

  if (myIndex === -1) {
    return sorted.slice(0, 5);
  }

  let start =
    Math.max(
      0,
      myIndex - 2
    );

  let end =
    Math.min(
      sorted.length,
      myIndex + 3
    );

  /*
   * Keep approximately five rows when the
   * student is near either end.
   */
  if (end - start < 5) {
    if (start === 0) {
      end = Math.min(
        sorted.length,
        5
      );
    } else if (
      end === sorted.length
    ) {
      start = Math.max(
        0,
        sorted.length - 5
      );
    }
  }

  return sorted.slice(
    start,
    end
  );
}

/*
 * Do not show the complete peer name.
 *
 * Example:
 * "Tejas Guntru" -> "Tejas G."
 */
function getPeerDisplayName(
  fullName:
    | string
    | null
    | undefined
) {
  if (!fullName?.trim()) {
    return "Student";
  }

  const parts =
    fullName
      .trim()
      .split(/\s+/);

  if (parts.length === 1) {
    return parts[0];
  }

  return `${parts[0]} ${
    parts[
      parts.length - 1
    ][0]
  }.`;
}

function Heading({
  children,
  right = false,
}: {
  children: React.ReactNode;
  right?: boolean;
}) {
  return (
    <p
      className={`
        text-[9px]
        font-bold
        uppercase
        tracking-[0.1em]
        text-slate-400

        ${
          right
            ? "text-right"
            : ""
        }
      `}
    >
      {children}
    </p>
  );
}

function ContextBadge({
  viewMode,
  collegeName,
  selectedYear,
}: {
  viewMode: ViewMode;
  collegeName: string | null;
  selectedYear: number | null;
}) {
  if (
    viewMode === "COLLEGE"
  ) {
    return (
      <span
        className="
          inline-flex
          w-fit
          items-center
          gap-2
          rounded-lg
          bg-slate-100
          px-3
          py-2
          text-xs
          font-semibold
          text-slate-600
        "
      >
        <Building2 size={13} />

        {collegeName ||
          "My College"}
      </span>
    );
  }

  if (
    viewMode === "YEAR"
  ) {
    return (
      <span
        className="
          inline-flex
          w-fit
          items-center
          gap-2
          rounded-lg
          bg-slate-100
          px-3
          py-2
          text-xs
          font-semibold
          text-slate-600
        "
      >
        <GraduationCap
          size={13}
        />

        {selectedYear
          ? `Class of ${selectedYear}`
          : "My Batch"}
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        w-fit
        items-center
        gap-2
        rounded-lg
        bg-slate-100
        px-3
        py-2
        text-xs
        font-semibold
        text-slate-600
      "
    >
      <Trophy size={13} />

      Global
    </span>
  );
}

function LeaderboardLoading() {
  return (
    <div
      className="
        flex
        min-h-[230px]
        flex-col
        items-center
        justify-center
        px-6
        text-center
      "
    >
      <LoaderCircle
        size={20}
        className="
          animate-spin
          text-[#1256AF]
        "
      />

      <p
        className="
          mt-3
          text-sm
          font-semibold
          text-slate-600
        "
      >
        Updating rankings...
      </p>
    </div>
  );
}

function EmptyLeaderboard() {
  return (
    <div
      className="
        px-6
        py-12
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-slate-100
          text-slate-500
        "
      >
        <Trophy size={18} />
      </div>

      <h3
        className="
          mt-4
          text-sm
          font-bold
          text-slate-900
        "
      >
        No ranking available
      </h3>

      <p
        className="
          mx-auto
          mt-1
          max-w-sm
          text-xs
          leading-5
          text-slate-500
        "
      >
        There are not enough verified
        students to show ranking context
        yet.
      </p>
    </div>
  );
}