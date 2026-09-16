import { api } from "@/lib/api";

import type {
  CreateOpportunityRequest,
  Opportunity,
  UpdateOpportunityRequest,
} from "@/types/opportunity";

import type {
  AdminApplication,
} from "@/types/admin";


// =========================================================
// OPPORTUNITIES
// =========================================================

export const getAdminOpportunities =
  async (): Promise<Opportunity[]> => {

    const response =
      await api.get<Opportunity[]>(
        "/api/v1/admin/opportunities"
      );

    return response.data;
  };


export const createAdminOpportunity =
  async (
    request: CreateOpportunityRequest
  ): Promise<Opportunity> => {

    const response =
      await api.post<Opportunity>(
        "/api/v1/admin/opportunities",
        request
      );

    return response.data;
  };


export const updateAdminOpportunity =
  async (
    opportunityId: string,
    request: UpdateOpportunityRequest
  ): Promise<Opportunity> => {

    const response =
      await api.put<Opportunity>(
        `/api/v1/admin/opportunities/${opportunityId}`,
        request
      );

    return response.data;
  };


export const closeAdminOpportunity =
  async (
    opportunityId: string
  ): Promise<Opportunity> => {

    const response =
      await api.post<Opportunity>(
        `/api/v1/admin/opportunities/${opportunityId}/close`
      );

    return response.data;
  };


// =========================================================
// APPLICATIONS
// =========================================================

export const getAdminApplications =
  async (): Promise<AdminApplication[]> => {

    const response =
      await api.get<AdminApplication[]>(
        "/api/v1/admin/applications"
      );

    return response.data;
  };


export const getApplicationsByOpportunity =
  async (
    opportunityId: string
  ): Promise<AdminApplication[]> => {

    const response =
      await api.get<AdminApplication[]>(
        `/api/v1/admin/applications/opportunity/${opportunityId}`
      );

    return response.data;
  };


export const updateApplicationStatus =
  async (
    applicationId: string,
    status: AdminApplication["status"]
  ): Promise<AdminApplication> => {

    const response =
      await api.put<AdminApplication>(
        `/api/v1/admin/applications/${applicationId}/status`,
        {
          status,
        }
      );

    return response.data;
  };


// =========================================================
// RESUME
// =========================================================

export const downloadApplicationResume =
  async (
    applicationId: string
  ): Promise<Blob> => {

    const response =
      await api.get(
        `/api/v1/admin/applications/${applicationId}/resume/download`,
        {
          responseType: "blob",
        }
      );

    return response.data;
  };