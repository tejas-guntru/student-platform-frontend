"use client";

import {
  LoaderCircle,
} from "lucide-react";

import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader";
import MyRankingSection from "@/components/leaderboard/MyRankingSection";
import LeaderboardContext from "@/components/leaderboard/LeaderboardContext";
import PlatformScores from "@/components/leaderboard/PlatformScores";
import LeaderboardFilters from "@/components/leaderboard/LeaderboardFilters";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import LeaderboardLinks from "@/components/leaderboard/LeaderboardLinks";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useLeaderboard,
} from "@/hooks/useLeaderboard";

function LeaderboardLoading() {
  return (
    <main
      className="
        flex
        min-h-[70vh]
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
            text-slate-800
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
          Preparing rankings and coding scores...
        </p>
      </div>
    </main>
  );
}

export default function LeaderboardPage() {
  const leaderboard =
    useLeaderboard();

  if (leaderboard.loading) {
    return <LeaderboardLoading />;
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
          max-w-7xl
          px-4
          py-8

          sm:px-6
          sm:py-10

          lg:px-8
        "
      >
        <LeaderboardHeader
          myRank={
            leaderboard.myRank
          }
        />

        <div className="mt-6">
          <ProfileAlerts
            error={
              leaderboard.error
            }
            success=""
          />
        </div>

        <div className="mt-8">
          <MyRankingSection
            myRank={
              leaderboard.myRank
            }
          />
        </div>

        <div className="mt-8">
          <LeaderboardContext
            collegeName={
              leaderboard.collegeName
            }
            graduationYear={
              leaderboard.graduationYear
            }
          />
        </div>

        <div className="mt-8">
          <PlatformScores
            myRank={
              leaderboard.myRank
            }
          />
        </div>

        <div className="mt-8">
          <LeaderboardFilters
            viewMode={
              leaderboard.viewMode
            }
            collegeId={
              leaderboard.collegeId
            }
            selectedYear={
              leaderboard.selectedYear
            }
            onGlobal={
              leaderboard.showGlobal
            }
            onCollege={
              leaderboard.showCollege
            }
            onYear={
              leaderboard.showGraduationYear
            }
          />
        </div>

        <div className="mt-6">
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

        <div className="mt-8">
          <LeaderboardLinks />
        </div>
      </div>
    </main>
  );
}