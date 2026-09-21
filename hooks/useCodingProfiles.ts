"use client";

import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

import {
  connectCodingProfile,
  getMyCodingProfiles,
  refreshCodingProfile,
  updateCodingProfile,
} from "@/services/codingProfileService";

import type {
  CodingPlatform,
  CodingProfile,
} from "@/types/codingProfile";

import {
  platformName,
} from "@/utils/codingProfileUtils";

export function useCodingProfiles() {
  const [
    profiles,
    setProfiles,
  ] = useState<CodingProfile[]>([]);

  const [
    usernames,
    setUsernames,
  ] = useState<
    Record<CodingPlatform, string>
  >({
    CODEFORCES: "",
    LEETCODE: "",
    CODECHEF: "",
  });

  const [
    editingPlatform,
    setEditingPlatform,
  ] = useState<CodingPlatform | null>(
    null
  );

  const [
    workingPlatform,
    setWorkingPlatform,
  ] = useState<CodingPlatform | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  // =========================================================
  // ERROR
  // =========================================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {
    console.error(error);

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

  // =========================================================
  // RELOAD
  // =========================================================

  const reloadProfiles =
    async () => {
      const data =
        await getMyCodingProfiles();

      const list =
        Array.isArray(data)
          ? data
          : [];

      setProfiles(list);

      setUsernames(
        (current) => {
          const next = {
            ...current,
          };

          list.forEach(
            (profile) => {
              next[
                profile.platform
              ] =
                profile.username;
            }
          );

          return next;
        }
      );
    };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    const load =
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
          await reloadProfiles();
        } catch (
          error: unknown
        ) {
          handleError(
            error,
            "Unable to load coding profiles."
          );
        } finally {
          setLoading(false);
        }
      };

    load();
  }, []);

  // =========================================================
  // USERNAME
  // =========================================================

  const updateUsername = (
    platform: CodingPlatform,
    value: string
  ) => {
    setUsernames(
      (current) => ({
        ...current,
        [platform]: value,
      })
    );
  };

  // =========================================================
  // CONNECT
  // =========================================================

  const handleConnect =
    async (
      platform:
        CodingPlatform
    ) => {
      const username =
        usernames[
          platform
        ].trim();

      setError("");
      setSuccess("");

      if (!username) {
        setError(
          "Enter a username."
        );

        return;
      }

      setWorkingPlatform(
        platform
      );

      try {
        await connectCodingProfile(
          platform,
          username
        );

        await reloadProfiles();

        setSuccess(
          `${platformName(
            platform
          )} connected successfully.`
        );
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          `Unable to connect ${platformName(
            platform
          )}.`
        );
      } finally {
        setWorkingPlatform(
          null
        );
      }
    };

  // =========================================================
  // EDIT
  // =========================================================

  const startEdit = (
    profile:
      CodingProfile
  ) => {
    setError("");
    setSuccess("");

    setUsernames(
      (current) => ({
        ...current,
        [profile.platform]:
          profile.username,
      })
    );

    setEditingPlatform(
      profile.platform
    );
  };

  const cancelEdit = (
    profile:
      CodingProfile
  ) => {
    setUsernames(
      (current) => ({
        ...current,
        [profile.platform]:
          profile.username,
      })
    );

    setEditingPlatform(
      null
    );

    setError("");
  };

  // =========================================================
  // UPDATE
  // =========================================================

  const handleUpdate =
    async (
      profile:
        CodingProfile
    ) => {
      const platform =
        profile.platform;

      const username =
        usernames[
          platform
        ].trim();

      setError("");
      setSuccess("");

      if (!username) {
        setError(
          "Username cannot be empty."
        );

        return;
      }

      if (
        username.toLowerCase() ===
        profile.username.toLowerCase()
      ) {
        setEditingPlatform(
          null
        );

        return;
      }

      setWorkingPlatform(
        platform
      );

      try {
        const updated =
          await updateCodingProfile(
            platform,
            username
          );

        await reloadProfiles();

        setEditingPlatform(
          null
        );

        setSuccess(
          `${platformName(
            platform
          )} username changed to ${updated.username}. Verification has been reset.`
        );
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          `Unable to update ${platformName(
            platform
          )} username.`
        );
      } finally {
        setWorkingPlatform(
          null
        );
      }
    };

  // =========================================================
  // REFRESH
  // =========================================================

  const handleRefresh =
    async (
      platform:
        CodingPlatform
    ) => {
      setError("");
      setSuccess("");

      setWorkingPlatform(
        platform
      );

      try {
        await refreshCodingProfile(
          platform
        );

        await reloadProfiles();

        setSuccess(
          `${platformName(
            platform
          )} stats refreshed successfully.`
        );
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          `Unable to refresh ${platformName(
            platform
          )}.`
        );
      } finally {
        setWorkingPlatform(
          null
        );
      }
    };

  // =========================================================
  // GET PROFILE
  // =========================================================

  const getProfile = (
    platform:
      CodingPlatform
  ) =>
    profiles.find(
      (profile) =>
        profile.platform ===
        platform
    );

  return {
    profiles,
    usernames,

    editingPlatform,
    workingPlatform,

    loading,

    error,
    success,

    updateUsername,

    handleConnect,

    startEdit,
    cancelEdit,

    handleUpdate,
    handleRefresh,

    getProfile,
  };
}