"use client";

import {
  LoaderCircle,
} from "lucide-react";

import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader";
import MyRankingSection from "@/components/leaderboard/MyRankingSection";
import LeaderboardFilters from "@/components/leaderboard/LeaderboardFilters";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useLeaderboard,
} from "@/hooks/useLeaderboard";

function LeaderboardLoading() {
  return (
    <main
      className="
        flex
        min-h-[65vh]
        items-center
        justify-center
        bg-[#F7F9FC]
        px-4
      "
    >
      <div className="text-center">
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-[#1256AF]
            shadow-sm
          "
        >
          <LoaderCircle
            size={21}
            className="animate-spin"
          />
        </div>

        <p
          role="status"
          className="
            mt-4
            text-sm
            font-semibold
            text-slate-700
          "
        >
          Loading leaderboard
        </p>

        <p
          className="
            mt-1
            text-xs
            text-slate-500
          "
        >
          Preparing your ranking...
        </p>
      </div>
    </main>
  );
}

export default function LeaderboardPage() {
  const leaderboard =
    useLeaderboard();

  if (leaderboard.loading) {
    return (
      <LeaderboardLoading />
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#F7F9FC]
        text-slate-900
      "
    >
      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          py-8

          sm:px-6
          sm:py-10

          lg:px-8
          lg:py-12
        "
      >
        {/* =========================
            PAGE HEADER
        ========================== */}

        <LeaderboardHeader
          myRank={
            leaderboard.myRank
          }
        />

        {/* =========================
            ERROR
        ========================== */}

        {leaderboard.error && (
          <div className="mt-6">
            <ProfileAlerts
              error={
                leaderboard.error
              }
              success=""
            />
          </div>
        )}

        {/* =========================
            MY RANKING
        ========================== */}

        <div className="mt-7">
          <MyRankingSection
            myRank={
              leaderboard.myRank
            }
          />
        </div>

        {/* =========================
            RANKING CONTEXT
        ========================== */}

        {leaderboard.myRank && (
          <section className="mt-10">
            <div
              className="
                flex
                flex-col
                gap-5

                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >
              {/* TITLE */}

              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-[#1256AF]
                  "
                >
                  Ranking Context
                </p>

                <h2
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    tracking-[-0.035em]
                    text-slate-950
                  "
                >
                  See where you stand
                </h2>

                <p
                  className="
                    mt-2
                    max-w-xl
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  Compare your position
                  with students ranked
                  closest to you.
                </p>
              </div>

              {/* FILTERS */}

              <LeaderboardFilters
                viewMode={
                  leaderboard.viewMode
                }
                collegeId={
                  leaderboard.collegeId
                }
                graduationYear={
                  leaderboard.graduationYear
                }
                onGlobal={
                  leaderboard.showGlobal
                }
                onCollege={
                  leaderboard.showCollege
                }
                onYear={
                  leaderboard
                    .showGraduationYear
                }
              />
            </div>

            {/* TABLE */}

            <div className="mt-5">
              <LeaderboardTable
                leaderboard={
                  leaderboard.leaderboard
                }
                myRank={
                  leaderboard.myRank
                }
                viewMode={
                  leaderboard.viewMode
                }
                selectedYear={
                  leaderboard.selectedYear
                }
                collegeName={
                  leaderboard.collegeName
                }
                tableLoading={
                  leaderboard.tableLoading
                }
                tableTitle={
                  leaderboard.getTableTitle()
                }
                getEntryRank={
                  leaderboard.getEntryRank
                }
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}