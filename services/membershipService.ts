import { api } from "@/lib/api";
import type { MembershipResponse } from "@/types/membership";

export const getMyMembership =
  async (): Promise<MembershipResponse> => {
    const response =
      await api.get<MembershipResponse>(
        "/api/v1/membership/me"
      );

    return response.data;
  };