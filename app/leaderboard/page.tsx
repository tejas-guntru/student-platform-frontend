"use client";

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

export default function LeaderboardPage() {
  const leaderboard =
    useLeaderboard();

  if (leaderboard.loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F3] text-[#14213D]">
        <div className="flex flex-col items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#E3E1DA] border-t-[#C9A227]" />

          <p className="mt-4 text-sm font-medium text-[#6B707B]">
            Loading leaderboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7F3] text-[#14213D]">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 sm:py-10 lg:py-12">
        <LeaderboardHeader />

        <ProfileAlerts
          error={
            leaderboard.error
          }
          success=""
        />

        <MyRankingSection
          myRank={
            leaderboard.myRank
          }
        />

        <LeaderboardContext
          collegeName={
            leaderboard.collegeName
          }
          graduationYear={
            leaderboard.graduationYear
          }
        />

        <PlatformScores
          myRank={
            leaderboard.myRank
          }
        />

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

        <LeaderboardLinks />
      </div>
    </main>
  );
}