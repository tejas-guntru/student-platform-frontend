"use client";

import axios from "axios";
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

import type {
  ViewMode,
} from "@/types/leaderboardView";

export function useLeaderboard() {
  const [
    leaderboard,
    setLeaderboard,
  ] = useState<LeaderboardEntry[]>([]);

  const [
    myRank,
    setMyRank,
  ] = useState<LeaderboardEntry | null>(
    null
  );

  const [
    collegeId,
    setCollegeId,
  ] = useState<string | null>(
    null
  );

  const [
    collegeName,
    setCollegeName,
  ] = useState<string | null>(
    null
  );

  const [
    graduationYear,
    setGraduationYear,
  ] = useState<number | null>(
    null
  );

  const [
    selectedYear,
    setSelectedYear,
  ] = useState<number | null>(
    null
  );

  const [
    viewMode,
    setViewMode,
  ] = useState<ViewMode>(
    "GLOBAL"
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    tableLoading,
    setTableLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  // =========================================
  // ERROR
  // =========================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {
    console.error(
      "LEADERBOARD ERROR:",
      error
    );

    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 ||
        error.response?.status === 403
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

    setError(fallback);
  };

  // =========================================
  // INITIAL LOAD
  // =========================================

  useEffect(() => {
    const load = async () => {
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
        setLoading(false);
      }
    };

    load();
  }, []);

  // =========================================
  // GLOBAL
  // =========================================

  const showGlobal =
    async () => {
      setViewMode(
        "GLOBAL"
      );

      setTableLoading(true);
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
        setTableLoading(false);
      }
    };

  // =========================================
  // COLLEGE
  // =========================================

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

      setTableLoading(true);
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
        setTableLoading(false);
      }
    };

  // =========================================
  // YEAR
  // =========================================

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

      setTableLoading(true);
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
        setTableLoading(false);
      }
    };

  // =========================================
  // TABLE TITLE
  // =========================================

  const getTableTitle = () => {
    if (
      viewMode === "COLLEGE"
    ) {
      return collegeName
        ? `${collegeName} Leaderboard`
        : "College Leaderboard";
    }

    if (
      viewMode === "YEAR"
    ) {
      return selectedYear
        ? `${selectedYear} Batch Leaderboard`
        : "Graduation Year Leaderboard";
    }

    return "Global Leaderboard";
  };

  // =========================================
  // ENTRY RANK
  // =========================================

  const getEntryRank = (
    entry: LeaderboardEntry
  ) => {
    if (
      viewMode === "COLLEGE"
    ) {
      return entry.collegeRank;
    }

    if (
      viewMode === "YEAR"
    ) {
      return entry.graduationYearRank;
    }

    return entry.globalRank;
  };

  return {
    leaderboard,
    myRank,

    collegeId,
    collegeName,

    graduationYear,

    selectedYear,

    viewMode,

    loading,
    tableLoading,

    error,

    showGlobal,
    showCollege,
    showGraduationYear,

    getTableTitle,
    getEntryRank,
  };
}