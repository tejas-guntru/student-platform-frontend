import { api } from "@/lib/api";

import type {
  CodingPlatform,
  CodingProfile,
  CodingUsernameRequest,
} from "@/types/codingProfile";


export const getMyCodingProfiles =
  async (): Promise<CodingProfile[]> => {

    const response =
      await api.get<CodingProfile[]>(
        "/api/v1/coding-profiles/me"
      );

    return response.data;
  };


export const connectCodingProfile =
  async (
    platform: CodingPlatform,
    username: string
  ): Promise<CodingProfile> => {

    const request: CodingUsernameRequest = {
      username: username.trim(),
    };

    const endpoint =
      getEndpoint(platform);

    const response =
      await api.post<CodingProfile>(
        `/api/v1/coding-profiles/${endpoint}`,
        request
      );

    return response.data;
  };


export const updateCodingProfile =
  async (
    platform: CodingPlatform,
    username: string
  ): Promise<CodingProfile> => {

    const request: CodingUsernameRequest = {
      username: username.trim(),
    };

    const endpoint =
      getEndpoint(platform);

    const response =
      await api.put<CodingProfile>(
        `/api/v1/coding-profiles/${endpoint}`,
        request
      );

    return response.data;
  };


export const refreshCodingProfile =
  async (
    platform: CodingPlatform
  ): Promise<CodingProfile> => {

    const endpoint =
      getEndpoint(platform);

    const response =
      await api.post<CodingProfile>(
        `/api/v1/coding-profiles/${endpoint}/refresh`
      );

    return response.data;
  };


function getEndpoint(
  platform: CodingPlatform
): string {

  switch (platform) {

    case "CODEFORCES":
      return "codeforces";

    case "LEETCODE":
      return "leetcode";

    case "CODECHEF":
      return "codechef";
  }
}