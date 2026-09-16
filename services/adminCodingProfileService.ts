import { api } from "@/lib/api";

import type {
  AdminCodingProfile,
} from "@/types/adminCodingProfile";


// =========================================================
// GET PROFILES
// =========================================================

export const getAdminCodingProfiles =
  async (): Promise<AdminCodingProfile[]> => {

    const response =
      await api.get<AdminCodingProfile[]>(
        "/api/v1/admin/coding-profiles"
      );

    return response.data;
  };


// =========================================================
// VERIFY
// =========================================================

export const verifyCodingProfile =
  async (
    profileId: string
  ): Promise<AdminCodingProfile> => {

    const response =
      await api.post<AdminCodingProfile>(
        `/api/v1/admin/coding-profiles/${profileId}/verify`
      );

    return response.data;
  };


// =========================================================
// UNVERIFY
// =========================================================

export const unverifyCodingProfile =
  async (
    profileId: string
  ): Promise<AdminCodingProfile> => {

    const response =
      await api.post<AdminCodingProfile>(
        `/api/v1/admin/coding-profiles/${profileId}/unverify`
      );

    return response.data;
  };


// =========================================================
// REBUILD LEADERBOARD
// =========================================================

export const rebuildLeaderboard =
  async (): Promise<void> => {

    await api.post(
      "/api/v1/leaderboard/rebuild"
    );
  };