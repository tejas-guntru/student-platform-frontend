import { api } from "@/lib/api";

import type {
  ApplicationResponse,
  Opportunity,
} from "@/types/opportunity";


export const getOpportunities =
  async (): Promise<Opportunity[]> => {

    const response =
      await api.get<Opportunity[]>(
        "/api/v1/opportunities"
      );

    return response.data;
  };


export const applyToOpportunity =
  async (
    opportunityId: string
  ): Promise<ApplicationResponse> => {

    const response =
      await api.post<ApplicationResponse>(
        `/api/v1/applications/opportunities/${opportunityId}`
      );

    return response.data;
  };