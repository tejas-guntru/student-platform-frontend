"use client";

import type {
  ReactNode,
} from "react";

import {
  Building2,
  GraduationCap,
  LoaderCircle,
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
      entry: LeaderboardEntry
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
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
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
              bg-blue-50
              text-[#1256AF]
            "
          >
            <Trophy size={17} />
          </div>

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
              Rankings
            </p>

            <h2
              className="
                mt-1
                text-lg
                font-bold
                tracking-[-0.02em]
                text-slate-900
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
                text-slate-500
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
          {viewMode === "COLLEGE" &&
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

          {viewMode === "YEAR" &&
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

      {/* CONTENT */}

      {tableLoading ? (
        <LeaderboardLoading />
      ) : leaderboard.length === 0 ? (
        <EmptyLeaderboard
          viewMode={
            viewMode
          }
          selectedYear={
            selectedYear
          }
        />
      ) : (
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
                  border-slate-200
                  bg-slate-50/80
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
                        border-slate-100
                        transition-colors
                        last:border-b-0

                        ${
                          isMe
                            ? "bg-blue-50/60"
                            : "bg-white hover:bg-slate-50/70"
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
                          rank={rank}
                          index={index}
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

                          <div>
                            <p
                              className="
                                whitespace-nowrap
                                text-sm
                                font-bold
                                text-slate-900
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
                                  border-blue-200
                                  bg-white
                                  px-2
                                  py-0.5
                                  text-[9px]
                                  font-bold
                                  uppercase
                                  tracking-[0.08em]
                                  text-[#1256AF]
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
                            text-slate-600
                          "
                        >
                          <Building2
                            size={13}
                            className="
                              mt-0.5
                              shrink-0
                              text-slate-400
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
                          text-slate-600
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

                      {/* OVERALL */}

                      <td
                        className="
                          px-6
                          py-4
                        "
                      >
                        <OverallScore
                          value={
                            entry.overallScore
                          }
                        />
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

/* =========================================================
   LOADING
========================================================= */

function LeaderboardLoading() {
  return (
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
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          text-[#1256AF]
        "
      >
        <LoaderCircle
          size={20}
          className="animate-spin"
        />
      </div>

      <p
        className="
          mt-4
          text-sm
          font-semibold
          text-slate-700
        "
      >
        Loading leaderboard...
      </p>

      <p
        className="
          mt-1
          text-xs
          text-slate-500
        "
      >
        Fetching the latest rankings.
      </p>
    </div>
  );
}

/* =========================================================
   TABLE HEADING
========================================================= */

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
        py-3.5
        text-[9px]
        font-bold
        uppercase
        tracking-[0.12em]
        text-slate-500
      "
    >
      {children}
    </th>
  );
}

/* =========================================================
   RANK
========================================================= */

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
          text-base
          font-bold
          tracking-[-0.02em]
          text-slate-900
        "
      >
        {formatRank(rank)}
      </span>
    </div>
  );
}

/* =========================================================
   PLATFORM SCORE
========================================================= */

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
        font-semibold
        tabular-nums
        text-slate-600
      "
    >
      {formatScore(value)}
    </span>
  );
}

/* =========================================================
   OVERALL SCORE
========================================================= */

function OverallScore({
  value,
}: {
  value:
    | number
    | null;
}) {
  return (
    <span
      className="
        inline-flex
        min-w-[68px]
        justify-center
        rounded-lg
        bg-blue-50
        px-3
        py-2
        text-sm
        font-bold
        tabular-nums
        text-[#1256AF]
      "
    >
      {formatScore(value)}
    </span>
  );
}

/* =========================================================
   CONTEXT BADGE
========================================================= */

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
        border-slate-200
        bg-slate-50
        px-3
        py-1.5
        text-[10px]
        font-bold
        text-slate-600
      "
    >
      <span
        className="
          text-[#1256AF]
        "
      >
        {icon}
      </span>

      {children}
    </span>
  );
}

/* =========================================================
   EMPTY
========================================================= */

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
      selectedYear
        ? `No verified students from the ${selectedYear} batch are currently ranked.`
        : "No verified students from this graduation batch are currently ranked.";
  }

  return (
    <div
      className="
        px-6
        py-14
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
          rounded-xl
          bg-slate-100
          text-slate-500
        "
      >
        <Trophy size={20} />
      </div>

      <h3
        className="
          mt-4
          text-base
          font-bold
          text-slate-900
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
          text-slate-600
        "
      >
        {message}
      </p>
    </div>
  );
}