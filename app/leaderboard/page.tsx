"use client";

import {
  LoaderCircle,
  Sparkles,
  Trophy,
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

// =========================================================
// LOADING
// =========================================================

function LeaderboardLoading() {
  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#F4F9FF]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-10
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#38BDF8]/15
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-10
          h-[460px]
          w-[460px]
          rounded-full
          bg-violet-500/10
          blur-[130px]
        "
      />

      <div
        className="
          relative
          flex
          flex-col
          items-center
          text-center
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-[#0877E8]
            via-[#1294F2]
            to-violet-500
            text-white
            shadow-[0_14px_35px_rgba(8,119,232,0.25)]
          "
        >
          <LoaderCircle
            size={25}
            className="animate-spin"
          />
        </div>

        <p
          role="status"
          className="
            mt-5
            font-semibold
            text-[#173B63]
          "
        >
          Loading leaderboard
        </p>

        <p
          className="
            mt-1
            text-sm
            text-[#8095A8]
          "
        >
          Preparing rankings and coding scores...
        </p>
      </div>
    </main>
  );
}

// =========================================================
// BACKGROUND
// =========================================================

function LeaderboardBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-52
          top-16
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#38BDF8]/10
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-56
          top-[520px]
          h-[620px]
          w-[620px]
          rounded-full
          bg-violet-500/7
          blur-[170px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/3
          top-[1150px]
          h-[480px]
          w-[480px]
          rounded-full
          bg-cyan-400/6
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.18]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "56px 56px",
        }}
      />
    </>
  );
}

// =========================================================
// FOOTER
// =========================================================

function LeaderboardFooter() {
  return (
    <footer
      className="
        mt-12
        border-t
        border-[#DCEAF5]
        py-6
        text-center
      "
    >
      <div
        className="
          inline-flex
          items-center
          gap-2
          text-xs
          text-[#8298AB]
        "
      >
        <Trophy
          size={13}
          className="text-violet-600"
        />

        <span>
          Keep improving your profile and coding progress.
        </span>

        <Sparkles
          size={12}
          className="text-[#38A9EE]"
        />
      </div>
    </footer>
  );
}

// =========================================================
// PAGE
// =========================================================

export default function LeaderboardPage() {
  const leaderboard =
    useLeaderboard();

  if (leaderboard.loading) {
    return <LeaderboardLoading />;
  }

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F4F9FF]
        text-[#173B63]
      "
    >
      <LeaderboardBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          py-6

          sm:px-6
          sm:py-8

          lg:px-8
          lg:py-10
        "
      >
        {/* HEADER */}

        <LeaderboardHeader />

        {/* ALERTS */}

        <div className="mt-6">
          <ProfileAlerts
            error={
              leaderboard.error
            }
            success=""
          />
        </div>

        {/* MY RANKING */}

        <div className="mt-8">
          <MyRankingSection
            myRank={
              leaderboard.myRank
            }
          />
        </div>

        {/* LEADERBOARD CONTEXT */}

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

        {/* PLATFORM SCORES */}

        <div className="mt-8">
          <PlatformScores
            myRank={
              leaderboard.myRank
            }
          />
        </div>

        {/* FILTERS */}

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

        {/* TABLE */}

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

        {/* LINKS */}

        <div className="mt-8">
          <LeaderboardLinks />
        </div>

        <LeaderboardFooter />
      </div>
    </main>
  );
}