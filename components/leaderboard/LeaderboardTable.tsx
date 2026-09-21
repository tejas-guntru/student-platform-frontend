"use client";

import type {
  LeaderboardEntry,
} from "@/types/leaderboard";

type ViewMode =
  | "GLOBAL"
  | "COLLEGE"
  | "YEAR";

import {
  formatRank,
  formatScore,
  
} from "@/utils/leaderboardFormatters";

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
    <section className="mt-5 overflow-hidden rounded-[24px] border border-[#D8D5CC] bg-white shadow-[0_16px_45px_rgba(20,33,61,0.05)]">
      {/* HEADER */}
      <div className="flex flex-col gap-2 border-b border-[#EEECE6] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#14213D]">
            {tableTitle}
          </h2>

          <p className="mt-1 text-xs text-[#858994]">
            {leaderboard.length}

            {leaderboard.length === 1
              ? " ranked student"
              : " ranked students"}
          </p>
        </div>

        {viewMode ===
          "COLLEGE" &&
          collegeName && (
            <ContextBadge>
              {collegeName}
            </ContextBadge>
          )}

        {viewMode ===
          "YEAR" &&
          selectedYear && (
            <ContextBadge>
              Class of{" "}
              {selectedYear}
            </ContextBadge>
          )}
      </div>

      {/* LOADING */}
      {tableLoading ? (
        <div className="flex flex-col items-center p-12">
          <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#E3E1DA] border-t-[#C9A227]" />

          <p className="mt-3 text-sm text-[#6B707B]">
            Loading leaderboard...
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-[#F8F7F3]">
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-[#858994]">
                <th className="px-6 py-4">
                  Rank
                </th>

                <th className="px-6 py-4">
                  Student
                </th>

                <th className="px-6 py-4">
                  College
                </th>

                <th className="px-6 py-4">
                  Year
                </th>

                <th className="px-6 py-4">
                  CF
                </th>

                <th className="px-6 py-4">
                  LC
                </th>

                <th className="px-6 py-4">
                  CC
                </th>

                <th className="px-6 py-4">
                  Score
                </th>
              </tr>
            </thead>

            <tbody>
              {leaderboard.map(
                (entry) => {
                  const isMe =
                    Boolean(
                      myRank &&
                        entry.studentId ===
                          myRank.studentId
                    );

                  return (
                    <tr
                      key={
                        entry.studentId
                      }
                      className={
                        isMe
                          ? "border-t border-[#EEECE6] bg-[#F1F8F2]"
                          : "border-t border-[#EEECE6] transition-colors hover:bg-[#FBFAF6]"
                      }
                    >
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-[#14213D]">
                          {formatRank(
                            getEntryRank(
                              entry
                            )
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-bold text-[#14213D]">
                          {entry.fullName ||
                            "Student"}
                        </p>

                        {isMe && (
                          <span className="mt-1 inline-block rounded-full border border-[#BFD7C3] bg-white px-2 py-0.5 text-[10px] font-bold text-[#347A3A]">
                            YOU
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#6B707B]">
                        {entry.collegeName ||
                          "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#6B707B]">
                        {entry.graduationYear ||
                          "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#14213D]">
                        {formatScore(
                          entry.codeforcesScore
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#14213D]">
                        {formatScore(
                          entry.leetcodeScore
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#14213D]">
                        {formatScore(
                          entry.codechefScore
                        )}
                      </td>

                      <td className="px-6 py-4 font-bold text-[#14213D]">
                        {formatScore(
                          entry.overallScore
                        )}
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

function ContextBadge({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <span className="rounded-full border border-[#E8DCA9] bg-[#FBF7E8] px-3 py-1 text-xs font-semibold text-[#806E30]">
      {children}
    </span>
  );
}

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
    viewMode ===
    "COLLEGE"
  ) {
    message =
      "No verified students from this college are currently ranked.";
  }

  if (
    viewMode ===
    "YEAR"
  ) {
    message =
      `No verified students from the ${selectedYear} batch are currently ranked.`;
  }

  return (
    <div className="p-12 text-center">
      <h3 className="font-bold text-[#14213D]">
        No ranked students found
      </h3>

      <p className="mt-2 text-sm text-[#6B707B]">
        {message}
      </p>
    </div>
  );
}