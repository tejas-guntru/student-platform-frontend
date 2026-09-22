"use client";

import type {
  ReactNode,
} from "react";

import {
  Building2,
  GraduationCap,
  LoaderCircle,
  Sparkles,
  Trophy,
  UserRound,
  Users,
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
      entry:
        LeaderboardEntry
    ) =>
      | number
      | null;
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
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_14px_40px_rgba(8,119,232,0.05)]
      "
    >
      {/* =====================================================
          TOP ACCENT
      ===================================================== */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          from-violet-500
          via-[#0877E8]
          to-[#38BDF8]
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[#E7F0F7]
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
              rounded-xl
              bg-violet-50
              text-violet-600
            "
          >
            <Trophy size={17} />
          </div>

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
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-violet-600
                "
              >
                Rankings
              </p>

              <Sparkles
                size={11}
                className="text-[#38A9EE]"
              />
            </div>

            <h2
              className="
                mt-1
                text-lg
                font-bold
                tracking-[-0.025em]
                text-[#173B63]
              "
            >
              {tableTitle}
            </h2>

            <div
              className="
                mt-1.5
                flex
                items-center
                gap-1.5
                text-xs
                text-[#879CAD]
              "
            >
              <Users size={12} />

              <span>
                {leaderboard.length}

                {leaderboard.length === 1
                  ? " ranked student"
                  : " ranked students"}
              </span>
            </div>
          </div>
        </div>

        {/* CONTEXT */}

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          {viewMode ===
            "COLLEGE" &&
            collegeName && (
              <ContextBadge
                icon={
                  <Building2
                    size={12}
                  />
                }
              >
                {collegeName}
              </ContextBadge>
            )}

          {viewMode ===
            "YEAR" &&
            selectedYear && (
              <ContextBadge
                icon={
                  <GraduationCap
                    size={13}
                  />
                }
              >
                Class of{" "}
                {selectedYear}
              </ContextBadge>
            )}
        </div>
      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {tableLoading ? (
        <div
          className="
            flex
            min-h-[280px]
            flex-col
            items-center
            justify-center
            px-6
            py-12
            text-center
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <LoaderCircle
              size={22}
              className="animate-spin"
            />
          </div>

          <p
            className="
              mt-4
              text-sm
              font-semibold
              text-[#527087]
            "
          >
            Loading leaderboard...
          </p>

          <p
            className="
              mt-1
              text-xs
              text-[#8AA0B2]
            "
          >
            Fetching the latest rankings.
          </p>
        </div>
      ) : leaderboard.length ===
        0 ? (
        <EmptyLeaderboard
          viewMode={
            viewMode
          }
          selectedYear={
            selectedYear
          }
        />
      ) : (
        /* ===================================================
            TABLE
        =================================================== */

        <div
          className="
            overflow-x-auto
          "
        >
          <table
            className="
              w-full
              min-w-[900px]
              border-collapse
            "
          >
            {/* TABLE HEAD */}

            <thead>
              <tr
                className="
                  border-b
                  border-[#E7F0F7]
                  bg-[#F7FBFE]
                  text-left
                "
              >
                <TableHeading>
                  Rank
                </TableHeading>

                <TableHeading>
                  Student
                </TableHeading>

                <TableHeading>
                  College
                </TableHeading>

                <TableHeading>
                  Year
                </TableHeading>

                <TableHeading>
                  CF
                </TableHeading>

                <TableHeading>
                  LC
                </TableHeading>

                <TableHeading>
                  CC
                </TableHeading>

                <TableHeading>
                  Score
                </TableHeading>
              </tr>
            </thead>

            {/* TABLE BODY */}

            <tbody>
              {leaderboard.map(
                (
                  entry,
                  index
                ) => {
                  const isMe =
                    Boolean(
                      myRank &&
                        entry.studentId ===
                          myRank.studentId
                    );

                  const rank =
                    getEntryRank(
                      entry
                    );

                  return (
                    <tr
                      key={
                        entry.studentId
                      }
                      className={`
                        border-b
                        border-[#EDF3F8]
                        transition-colors
                        duration-200
                        last:border-b-0

                        ${
                          isMe
                            ? "bg-[#F1FAFF]"
                            : "bg-white hover:bg-[#F8FCFF]"
                        }
                      `}
                    >
                      {/* RANK */}

                      <td
                        className="
                          px-6
                          py-4
                        "
                      >
                        <RankDisplay
                          rank={
                            rank
                          }
                          index={
                            index
                          }
                        />
                      </td>

                      {/* STUDENT */}

                      <td
                        className="
                          px-6
                          py-4
                        "
                      >
                        <div
                          className="
                            flex
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
                              rounded-xl

                              ${
                                isMe
                                  ? "bg-[#0877E8] text-white"
                                  : "bg-[#EAF6FF] text-[#0877E8]"
                              }
                            `}
                          >
                            <UserRound
                              size={15}
                            />
                          </div>

                          <div>
                            <p
                              className="
                                font-bold
                                text-[#173B63]
                              "
                            >
                              {entry.fullName ||
                                "Student"}
                            </p>

                            {isMe && (
                              <span
                                className="
                                  mt-1
                                  inline-flex
                                  items-center
                                  rounded-full
                                  border
                                  border-[#B9DCF2]
                                  bg-white
                                  px-2
                                  py-0.5
                                  text-[9px]
                                  font-bold
                                  uppercase
                                  tracking-[0.08em]
                                  text-[#0877E8]
                                "
                              >
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* COLLEGE */}

                      <td
                        className="
                          max-w-[230px]
                          px-6
                          py-4
                        "
                      >
                        <div
                          className="
                            flex
                            items-start
                            gap-2
                            text-sm
                            text-[#607C91]
                          "
                        >
                          <Building2
                            size={13}
                            className="
                              mt-0.5
                              shrink-0
                              text-[#9AB4C6]
                            "
                          />

                          <span
                            className="
                              line-clamp-2
                            "
                          >
                            {entry.collegeName ||
                              "-"}
                          </span>
                        </div>
                      </td>

                      {/* YEAR */}

                      <td
                        className="
                          px-6
                          py-4
                          text-sm
                          font-semibold
                          text-[#607C91]
                        "
                      >
                        {entry.graduationYear ||
                          "-"}
                      </td>

                      {/* CODEFORCES */}

                      <td
                        className="
                          px-6
                          py-4
                        "
                      >
                        <ScoreValue
                          value={
                            entry.codeforcesScore
                          }
                        />
                      </td>

                      {/* LEETCODE */}

                      <td
                        className="
                          px-6
                          py-4
                        "
                      >
                        <ScoreValue
                          value={
                            entry.leetcodeScore
                          }
                        />
                      </td>

                      {/* CODECHEF */}

                      <td
                        className="
                          px-6
                          py-4
                        "
                      >
                        <ScoreValue
                          value={
                            entry.codechefScore
                          }
                        />
                      </td>

                      {/* OVERALL SCORE */}

                      <td
                        className="
                          px-6
                          py-4
                        "
                      >
                        <span
                          className="
                            inline-flex
                            min-w-[72px]
                            justify-center
                            rounded-xl
                            bg-gradient-to-r
                            from-[#0877E8]
                            to-[#1294F2]
                            px-3
                            py-2
                            text-sm
                            font-bold
                            text-white
                            shadow-[0_6px_15px_rgba(8,119,232,0.15)]
                          "
                        >
                          {formatScore(
                            entry.overallScore
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

// =========================================================
// TABLE HEADING
// =========================================================

function TableHeading({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <th
      className="
        whitespace-nowrap
        px-6
        py-4
        text-[9px]
        font-bold
        uppercase
        tracking-[0.13em]
        text-[#8298AA]
      "
    >
      {children}
    </th>
  );
}

// =========================================================
// RANK
// =========================================================

function RankDisplay({
  rank,
  index,
}: {
  rank:
    | number
    | null;
  index: number;
}) {
  const topThree =
    index < 3;

  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      {topThree && (
        <div
          className={`
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg

            ${
              index === 0
                ? "bg-amber-50 text-amber-600"
                : index === 1
                  ? "bg-slate-100 text-slate-500"
                  : "bg-orange-50 text-orange-600"
            }
          `}
        >
          <Trophy size={13} />
        </div>
      )}

      <span
        className="
          whitespace-nowrap
          text-lg
          font-bold
          tracking-[-0.025em]
          text-[#173B63]
        "
      >
        {formatRank(
          rank
        )}
      </span>
    </div>
  );
}

// =========================================================
// SCORE
// =========================================================

function ScoreValue({
  value,
}: {
  value:
    | number
    | null;
}) {
  return (
    <span
      className="
        text-sm
        font-bold
        text-[#355E7A]
      "
    >
      {formatScore(
        value
      )}
    </span>
  );
}

// =========================================================
// CONTEXT BADGE
// =========================================================

function ContextBadge({
  icon,
  children,
}: {
  icon: ReactNode;
  children:
    ReactNode;
}) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-[#CBE5F8]
        bg-[#EFF8FF]
        px-3
        py-1.5
        text-[10px]
        font-bold
        text-[#52748D]
      "
    >
      <span className="text-[#0877E8]">
        {icon}
      </span>

      {children}
    </span>
  );
}

// =========================================================
// EMPTY
// =========================================================

function EmptyLeaderboard({
  viewMode,
  selectedYear,
}: {
  viewMode:
    ViewMode;

  selectedYear:
    number | null;
}) {
  let message =
    "No verified students are currently ranked.";

  if (
    viewMode === "COLLEGE"
  ) {
    message =
      "No verified students from this college are currently ranked.";
  }

  if (
    viewMode === "YEAR"
  ) {
    message =
      `No verified students from the ${selectedYear} batch are currently ranked.`;
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        px-6
        py-14
        text-center
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
          bg-violet-500/8
          blur-[70px]
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
            bg-violet-50
            text-violet-600
          "
        >
          <Trophy size={22} />
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
          No ranked students found
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
          {message}
        </p>
      </div>
    </div>
  );
}