"use client";

import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

import {
  applyToOpportunity,
  getOpportunities,
} from "@/services/opportunityService";

import {
  getMyMembership,
} from "@/services/membershipService";

import {
  getMyProfile,
} from "@/services/studentService";

import {
  getProfileCompletion,
} from "@/services/profileCompletionService";

import {
  getMyApplications,
} from "@/services/applicationService";

import type {
  ProfileCompletion,
} from "@/services/profileCompletionService";

import type {
  Opportunity,
} from "@/types/opportunity";

import type {
  MembershipResponse,
} from "@/types/membership";

import type {
  ApplicationResponse,
} from "@/types/application";

import {
  getOpportunityId,
  isDeadlineOpen,
  isGraduationYearEligible,
} from "@/utils/opportunityUtils";

export function useOpportunities() {
  const [
    opportunities,
    setOpportunities,
  ] =
    useState<Opportunity[]>([]);

  const [
    applications,
    setApplications,
  ] =
    useState<ApplicationResponse[]>([]);

  const [
    membership,
    setMembership,
  ] =
    useState<MembershipResponse | null>(
      null
    );

  const [
    completion,
    setCompletion,
  ] =
    useState<ProfileCompletion | null>(
      null
    );

  const [
    studentGraduationYear,
    setStudentGraduationYear,
  ] =
    useState<number | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    applyingId,
    setApplyingId,
  ] =
    useState<string | null>(
      null
    );

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  // =========================================
  // ERROR
  // =========================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {
    console.error(error);

    if (
      axios.isAxiosError(error)
    ) {
      if (
        error.response?.status ===
          401 ||
        error.response?.status ===
          403
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
  // LOAD
  // =========================================

  useEffect(() => {
    const loadPage =
      async () => {
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
            opportunitiesData,
            membershipData,
            completionData,
            profileData,
            applicationsData,
          ] =
            await Promise.all([
              getOpportunities(),
              getMyMembership(),
              getProfileCompletion(),
              getMyProfile(),
              getMyApplications(),
            ]);

          setOpportunities(
            Array.isArray(
              opportunitiesData
            )
              ? opportunitiesData
              : []
          );

          setMembership(
            membershipData
          );

          setCompletion(
            completionData
          );

          setStudentGraduationYear(
            profileData
              .graduationYear ||
              null
          );

          setApplications(
            Array.isArray(
              applicationsData
            )
              ? applicationsData
              : []
          );
        } catch (
          error: unknown
        ) {
          handleError(
            error,
            "Unable to load opportunities."
          );
        } finally {
          setLoading(false);
        }
      };

    loadPage();
  }, []);

  // =========================================
  // APPLICATION
  // =========================================

  const findApplication = (
    opportunityId:
      string | undefined
  ) => {
    if (!opportunityId) {
      return null;
    }

    return (
      applications.find(
        (application) =>
          application.opportunityId ===
          opportunityId
      ) || null
    );
  };

  // =========================================
  // APPLY
  // =========================================

  const handleApply =
    async (
      opportunity:
        Opportunity
    ) => {
      setError("");
      setSuccess("");

      const opportunityId =
        getOpportunityId(
          opportunity
        );

      if (!opportunityId) {
        setError(
          "Opportunity ID is missing."
        );

        return;
      }

      const existingApplication =
        findApplication(
          opportunityId
        );

      if (
        existingApplication
      ) {
        setError(
          "You have already applied to this opportunity."
        );

        return;
      }

      const membershipActive =
        membership?.active ===
          true ||
        membership?.status ===
          "ACTIVE";

      if (!membershipActive) {
        setError(
          "Active membership is required to apply."
        );

        return;
      }

      if (
        !completion ||
        completion.percentage <
          100
      ) {
        setError(
          `Complete your profile before applying. Current completion: ${
            completion
              ?.percentage ?? 0
          }%.`
        );

        return;
      }

      if (
        !isGraduationYearEligible(
          opportunity,
          studentGraduationYear
        )
      ) {
        setError(
          studentGraduationYear
            ? `Your graduation year (${studentGraduationYear}) is not eligible for this opportunity.`
            : "Add your graduation year before applying."
        );

        return;
      }

      if (
        !isDeadlineOpen(
          opportunity
            .applicationDeadline
        )
      ) {
        setError(
          "Application deadline has passed."
        );

        return;
      }

      if (
        opportunity.status !==
        "ACTIVE"
      ) {
        setError(
          "This opportunity is not accepting applications."
        );

        return;
      }

      const confirmed =
        window.confirm(
          `Apply for ${opportunity.title} at ${opportunity.companyName}?`
        );

      if (!confirmed) {
        return;
      }

      setApplyingId(
        opportunityId
      );

      try {
        const application =
          await applyToOpportunity(
            opportunityId
          );

        setApplications(
          (current) => [
            application,
            ...current,
          ]
        );

        setSuccess(
          `Application submitted successfully for ${application.opportunityTitle}.`
        );

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (
        error: unknown
      ) {
        if (
          axios.isAxiosError(
            error
          )
        ) {
          if (
            error.response
              ?.status === 409
          ) {
            setError(
              "You have already applied to this opportunity."
            );

            try {
              const latest =
                await getMyApplications();

              setApplications(
                Array.isArray(
                  latest
                )
                  ? latest
                  : []
              );
            } catch (
              refreshError
            ) {
              console.error(
                refreshError
              );
            }

            return;
          }

          if (
            error.response
              ?.status === 400 ||
            error.response
              ?.status === 403
          ) {
            setError(
              error.response
                ?.data?.message ||
                "You are not eligible to apply."
            );

            return;
          }
        }

        handleError(
          error,
          "Unable to submit application."
        );
      } finally {
        setApplyingId(null);
      }
    };

  return {
    opportunities,
    applications,

    membership,
    completion,

    studentGraduationYear,

    loading,
    applyingId,

    error,
    success,

    findApplication,
    handleApply,
  };
}