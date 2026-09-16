import axios from "axios";

import { api } from "@/lib/api";

import type {
  LeaderboardEntry,
  LeaderboardPageResponse,
} from "@/types/leaderboard";


// =========================================================
// GLOBAL
// =========================================================

export const getGlobalLeaderboard =
  async (
    page = 0,
    size = 100
  ): Promise<LeaderboardPageResponse> => {

    const response =
      await api.get<LeaderboardPageResponse>(
        "/api/v1/leaderboard/global",
        {
          params: {
            page,
            size,
          },
        }
      );

    return response.data;
  };


// =========================================================
// COLLEGE
// =========================================================

export const getCollegeLeaderboard =
  async (
    collegeId: string,
    page = 0,
    size = 100
  ): Promise<LeaderboardPageResponse> => {

    const response =
      await api.get<LeaderboardPageResponse>(
        `/api/v1/leaderboard/college/${collegeId}`,
        {
          params: {
            page,
            size,
          },
        }
      );

    return response.data;
  };


// =========================================================
// GRADUATION YEAR
// =========================================================

export const getGraduationYearLeaderboard =
  async (
    year: number,
    page = 0,
    size = 100
  ): Promise<LeaderboardPageResponse> => {

    const response =
      await api.get<LeaderboardPageResponse>(
        `/api/v1/leaderboard/graduation-year/${year}`,
        {
          params: {
            page,
            size,
          },
        }
      );

    return response.data;
  };


// =========================================================
// MY RANK
// =========================================================

export const getMyLeaderboardRank =
  async (): Promise<LeaderboardEntry | null> => {

    try {

      const response =
        await api.get<LeaderboardEntry>(
          "/api/v1/leaderboard/me"
        );

      return response.data;

    } catch (error: unknown) {

      if (
        axios.isAxiosError(error) &&
        error.response?.status === 404
      ) {

        return null;
      }

      throw error;
    }
  };