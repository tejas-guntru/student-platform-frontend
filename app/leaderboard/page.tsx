"use client";

import axios from "axios";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  getCollegeLeaderboard,
  getGlobalLeaderboard,
  getGraduationYearLeaderboard,
  getMyLeaderboardRank,
} from "@/services/leaderboardService";

import {
  getMyProfile,
} from "@/services/studentService";

import type {
  LeaderboardEntry,
} from "@/types/leaderboard";


type ViewMode =
  | "GLOBAL"
  | "COLLEGE"
  | "YEAR";


const batchYears = [
  2025,
  2026,
  2027,
  2028,
  2029,
  2030,
  2031,
  2032,
];


export default function LeaderboardPage() {

  const [
    leaderboard,
    setLeaderboard,
  ] =
    useState<LeaderboardEntry[]>([]);


  const [
    myRank,
    setMyRank,
  ] =
    useState<LeaderboardEntry | null>(
      null
    );


  const [
    collegeId,
    setCollegeId,
  ] =
    useState<string | null>(
      null
    );


  const [
    collegeName,
    setCollegeName,
  ] =
    useState<string | null>(
      null
    );


  const [
    graduationYear,
    setGraduationYear,
  ] =
    useState<number | null>(
      null
    );


  const [
    selectedYear,
    setSelectedYear,
  ] =
    useState<number | null>(
      null
    );


  const [
    viewMode,
    setViewMode,
  ] =
    useState<ViewMode>(
      "GLOBAL"
    );


  const [
    loading,
    setLoading,
  ] =
    useState(true);


  const [
    tableLoading,
    setTableLoading,
  ] =
    useState(false);


  const [
    error,
    setError,
  ] =
    useState("");


  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {

    const load =
      async () => {

        const token =
          localStorage.getItem(
            "token"
          );

        const role =
          localStorage.getItem(
            "role"
          );


        if (
          !token ||
          role !== "STUDENT"
        ) {

          window.location.href =
            "/login";

          return;
        }


        try {

          const [
            globalData,
            myData,
            profile,
          ] =
            await Promise.all([
              getGlobalLeaderboard(
                0,
                100
              ),

              getMyLeaderboardRank(),

              getMyProfile(),
            ]);


          setLeaderboard(
            Array.isArray(
              globalData.content
            )
              ? globalData.content
              : []
          );


          setMyRank(
            myData
          );


          setCollegeId(
            profile.collegeId ||
            null
          );


          setCollegeName(
            profile.collegeName ||
            null
          );


          const year =
            profile.graduationYear ||
            null;


          setGraduationYear(
            year
          );


          setSelectedYear(
            year
          );

        } catch (
          error: unknown
        ) {

          handleError(
            error,
            "Unable to load leaderboard."
          );

        } finally {

          setLoading(
            false
          );
        }
      };


    load();

  }, []);


  // =========================================================
  // ERROR
  // =========================================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {

    console.error(
      "LEADERBOARD ERROR:",
      error
    );


    if (
      axios.isAxiosError(
        error
      )
    ) {

      if (
        error.response?.status ===
          401 ||
        error.response?.status ===
          403
      ) {

        localStorage.clear();

        window.location.href =
          "/login";

        return;
      }


      setError(
        error.response
          ?.data?.message ||
          fallback
      );

      return;
    }


    setError(
      fallback
    );
  };


  // =========================================================
  // GLOBAL
  // =========================================================

  const showGlobal =
    async () => {

      setViewMode(
        "GLOBAL"
      );

      setTableLoading(
        true
      );

      setError("");


      try {

        const data =
          await getGlobalLeaderboard(
            0,
            100
          );


        setLeaderboard(
          Array.isArray(
            data.content
          )
            ? data.content
            : []
        );

      } catch (
        error: unknown
      ) {

        handleError(
          error,
          "Unable to load global leaderboard."
        );

      } finally {

        setTableLoading(
          false
        );
      }
    };


  // =========================================================
  // COLLEGE
  // =========================================================

  const showCollege =
    async () => {

      if (!collegeId) {

        setError(
          "Select your college in your profile first."
        );

        return;
      }


      setViewMode(
        "COLLEGE"
      );

      setTableLoading(
        true
      );

      setError("");


      try {

        const data =
          await getCollegeLeaderboard(
            collegeId,
            0,
            100
          );


        setLeaderboard(
          Array.isArray(
            data.content
          )
            ? data.content
            : []
        );

      } catch (
        error: unknown
      ) {

        handleError(
          error,
          "Unable to load college leaderboard."
        );

      } finally {

        setTableLoading(
          false
        );
      }
    };


  // =========================================================
  // YEAR
  // =========================================================

  const showGraduationYear =
    async (
      year: number
    ) => {

      setSelectedYear(
        year
      );

      setViewMode(
        "YEAR"
      );

      setTableLoading(
        true
      );

      setError("");


      try {

        const data =
          await getGraduationYearLeaderboard(
            year,
            0,
            100
          );


        setLeaderboard(
          Array.isArray(
            data.content
          )
            ? data.content
            : []
        );

      } catch (
        error: unknown
      ) {

        handleError(
          error,
          "Unable to load graduation-year leaderboard."
        );

      } finally {

        setTableLoading(
          false
        );
      }
    };


  // =========================================================
  // TITLE
  // =========================================================

  const getTableTitle =
    () => {

      if (
        viewMode ===
        "COLLEGE"
      ) {

        return collegeName
          ? `${collegeName} Leaderboard`
          : "College Leaderboard";
      }


      if (
        viewMode ===
        "YEAR"
      ) {

        return selectedYear
          ? `${selectedYear} Batch Leaderboard`
          : "Graduation Year Leaderboard";
      }


      return "Global Leaderboard";
    };


  // =========================================================
  // TABLE RANK
  // =========================================================

  const getEntryRank =
    (
      entry:
        LeaderboardEntry
    ) => {

      if (
        viewMode ===
        "COLLEGE"
      ) {

        return entry.collegeRank;
      }


      if (
        viewMode ===
        "YEAR"
      ) {

        return entry.graduationYearRank;
      }


      return entry.globalRank;
    };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">

        <p className="text-zinc-400">
          Loading leaderboard...
        </p>

      </main>
    );
  }


  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-8">


        {/* HEADER */}

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              CODING RANKINGS
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Leaderboard
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Compare verified coding
              performance globally,
              by college and by batch.
            </p>

          </div>


          <Link
            href="/dashboard"
            className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium hover:bg-zinc-900"
          >
            ← Dashboard
          </Link>

        </header>


        {/* ERROR */}

        {error && (

          <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-300">

            {error}

          </div>

        )}


        {/* MY RANK */}

        <section className="mt-8">

          <p className="mb-4 text-sm text-zinc-500">
            My Ranking
          </p>


          {!myRank ? (

            <div className="rounded-2xl border border-amber-900/50 bg-amber-950/20 p-6">

              <h2 className="font-semibold text-amber-300">
                You are not ranked yet
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Connect your coding profiles
                and get them verified before
                your score appears.
              </p>


              <Link
                href="/coding-profiles"
                className="mt-4 inline-block rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
              >
                Coding Profiles →
              </Link>

            </div>

          ) : (

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <RankCard
                label="Global Rank"
                value={
                  myRank.globalRank
                }
                rank
              />


              <RankCard
                label="College Rank"
                value={
                  myRank.collegeRank
                }
                rank
              />


              <RankCard
                label="Year Rank"
                value={
                  myRank.graduationYearRank
                }
                rank
              />


              <RankCard
                label="Overall Score"
                value={
                  myRank.overallScore
                }
              />

            </div>

          )}

        </section>


        {/* MY PROFILE CONTEXT */}

        <section className="mt-5 grid gap-4 sm:grid-cols-2">

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

            <p className="text-xs text-zinc-500">
              My College
            </p>

            <p className="mt-2 font-semibold">

              {collegeName ||
                "College not selected"}

            </p>

          </div>


          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

            <p className="text-xs text-zinc-500">
              My Graduation Batch
            </p>

            <p className="mt-2 font-semibold">

              {graduationYear ||
                "Not added"}

            </p>

          </div>

        </section>


        {/* PLATFORM SCORES */}

        {myRank && (

          <section className="mt-5 grid gap-4 sm:grid-cols-3">

            <ScoreCard
              label="Codeforces"
              score={
                myRank.codeforcesScore
              }
            />


            <ScoreCard
              label="LeetCode"
              score={
                myRank.leetcodeScore
              }
            />


            <ScoreCard
              label="CodeChef"
              score={
                myRank.codechefScore
              }
            />

          </section>

        )}


        {/* FILTERS */}

        <section className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-4">

          <div className="flex flex-wrap items-center gap-3">


            {/* GLOBAL */}

            <button
              type="button"
              onClick={
                showGlobal
              }
              className={
                viewMode ===
                "GLOBAL"
                  ? activeButton
                  : inactiveButton
              }
            >
              Global
            </button>


            {/* COLLEGE */}

            <button
              type="button"
              onClick={
                showCollege
              }
              disabled={
                !collegeId
              }
              className={
                viewMode ===
                "COLLEGE"
                  ? activeButton
                  : inactiveButton
              }
            >
              My College
            </button>


            {/* BATCH DROPDOWN */}

            <div className="flex items-center gap-2">

              <span className="text-sm text-zinc-500">
                Batch
              </span>


              <select
                value={
                  selectedYear ||
                  ""
                }
                onChange={(
                  event
                ) => {

                  const year =
                    Number(
                      event.target.value
                    );


                  if (!year) {
                    return;
                  }


                  showGraduationYear(
                    year
                  );
                }}
                className={
                  viewMode ===
                  "YEAR"
                    ? "rounded-lg border border-white bg-white px-4 py-2 text-sm font-semibold text-black outline-none"
                    : "rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 outline-none hover:bg-zinc-800"
                }
              >

                <option value="">
                  Select Batch
                </option>


                {batchYears.map(
                  (year) => (

                    <option
                      key={
                        year
                      }
                      value={
                        year
                      }
                    >
                      {year}
                    </option>

                  )
                )}

              </select>

            </div>

          </div>

        </section>


        {/* TABLE */}

        <section className="mt-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

          <div className="flex flex-col gap-2 border-b border-zinc-800 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-lg font-semibold">
                {getTableTitle()}
              </h2>

              <p className="mt-1 text-xs text-zinc-500">

                {leaderboard.length}

                {leaderboard.length === 1
                  ? " ranked student"
                  : " ranked students"}

              </p>

            </div>


            {viewMode ===
              "COLLEGE" &&
              collegeName && (

                <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs text-zinc-400">
                  {collegeName}
                </span>

              )}


            {viewMode ===
              "YEAR" &&
              selectedYear && (

                <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs text-zinc-400">
                  Class of {selectedYear}
                </span>

              )}

          </div>


          {tableLoading ? (

            <div className="p-10 text-center text-zinc-500">
              Loading leaderboard...
            </div>

          ) : leaderboard.length ===
            0 ? (

            <div className="p-10 text-center">

              <h3 className="font-semibold">
                No ranked students found
              </h3>

              <p className="mt-2 text-sm text-zinc-500">

                {viewMode ===
                "COLLEGE"
                  ? "No verified students from this college are currently ranked."
                  : viewMode ===
                    "YEAR"
                  ? `No verified students from the ${selectedYear} batch are currently ranked.`
                  : "No verified students are currently ranked."}

              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead className="bg-zinc-950/60">

                  <tr className="text-left text-xs uppercase tracking-wider text-zinc-500">

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
                    (
                      entry
                    ) => {

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
                              ? "border-t border-zinc-800 bg-emerald-950/10"
                              : "border-t border-zinc-800 hover:bg-zinc-800/30"
                          }
                        >

                          <td className="px-6 py-4">

                            <span className="text-lg font-bold">

                              {
                                formatRank(
                                  getEntryRank(
                                    entry
                                  )
                                )
                              }

                            </span>

                          </td>


                          <td className="px-6 py-4">

                            <p className="font-medium">

                              {entry.fullName ||
                                "Student"}

                            </p>


                            {isMe && (

                              <span className="mt-1 inline-block rounded-full border border-emerald-900 bg-emerald-950/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                                YOU
                              </span>

                            )}

                          </td>


                          <td className="px-6 py-4 text-sm text-zinc-400">

                            {entry.collegeName ||
                              "-"}

                          </td>


                          <td className="px-6 py-4 text-sm text-zinc-400">

                            {entry.graduationYear ||
                              "-"}

                          </td>


                          <td className="px-6 py-4 text-sm">

                            {formatScore(
                              entry.codeforcesScore
                            )}

                          </td>


                          <td className="px-6 py-4 text-sm">

                            {formatScore(
                              entry.leetcodeScore
                            )}

                          </td>


                          <td className="px-6 py-4 text-sm">

                            {formatScore(
                              entry.codechefScore
                            )}

                          </td>


                          <td className="px-6 py-4 font-bold">

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


        {/* FOOTER */}

        <section className="mt-8 flex flex-wrap gap-3">

          <Link
            href="/coding-profiles"
            className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm hover:bg-zinc-900"
          >
            Coding Profiles
          </Link>


          <Link
            href="/profile"
            className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm hover:bg-zinc-900"
          >
            My Profile
          </Link>

        </section>

      </div>

    </main>
  );
}


// =========================================================
// RANK CARD
// =========================================================

function RankCard({
  label,
  value,
  rank = false,
}: {
  label: string;

  value:
    | number
    | null;

  rank?: boolean;
}) {

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">

        {rank
          ? formatRank(
              value
            )
          : formatScore(
              value
            )}

      </p>

    </div>
  );
}


// =========================================================
// SCORE CARD
// =========================================================

function ScoreCard({
  label,
  score,
}: {
  label: string;

  score:
    | number
    | null;
}) {

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">

      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold">

        {formatScore(
          score
        )}

      </p>

    </div>
  );
}


// =========================================================
// FORMAT RANK
// =========================================================

function formatRank(
  value:
    | number
    | null
) {

  if (
    value === null ||
    value === undefined ||
    value <= 0
  ) {

    return "-";
  }


  return `#${value}`;
}


// =========================================================
// FORMAT SCORE
// =========================================================

function formatScore(
  value:
    | number
    | null
) {

  if (
    value === null ||
    value === undefined
  ) {

    return "-";
  }


  return value.toFixed(
    2
  );
}


// =========================================================
// BUTTON STYLES
// =========================================================

const activeButton =
  "rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black";


const inactiveButton =
  "rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40";