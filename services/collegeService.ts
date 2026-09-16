import { api } from "@/lib/api";

import type {
  College,
} from "@/types/college";


export const getColleges =
  async (
    search?: string
  ): Promise<College[]> => {

    const response =
      await api.get<College[]>(
        "/api/v1/colleges",
        {
          params:
            search?.trim()
              ? {
                  search:
                    search.trim(),
                }
              : undefined,
        }
      );

    return response.data;
  };