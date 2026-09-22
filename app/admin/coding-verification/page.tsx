"use client";

import axios from "axios";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAdminCodingProfiles,
  rebuildLeaderboard,
  unverifyCodingProfile,
  verifyCodingProfile,
} from "@/services/adminCodingProfileService";

import type {
  AdminCodingPlatform,
  AdminCodingProfile,
} from "@/types/adminCodingProfile";

import {
  getCodingProfileId,
  type CodingVerificationFilter,
} from "@/utils/adminCodingProfileUtils";

import CodingVerificationHeader from "@/components/admin/coding-verification/CodingVerificationHeader";
import CodingVerificationSummary from "@/components/admin/coding-verification/CodingVerificationSummary";
import CodingVerificationFilters from "@/components/admin/coding-verification/CodingVerificationFilters";
import CodingProfilesList from "@/components/admin/coding-verification/CodingProfilesList";

export default function AdminCodingVerificationPage() {
  const [
    profiles,
    setProfiles,
  ] = useState<
    AdminCodingProfile[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    workingId,
    setWorkingId,
  ] = useState<string | null>(
    null
  );

  const [
    rebuilding,
    setRebuilding,
  ] = useState(false);

  const [
    filter,
    setFilter,
  ] =
    useState<CodingVerificationFilter>(
      "ALL"
    );

  const [
    platformFilter,
    setPlatformFilter,
  ] = useState<
    AdminCodingPlatform | "ALL"
  >("ALL");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

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
          role !== "ADMIN"
        ) {
          window.location.href =
            "/login";

          return;
        }

        await loadProfiles();
      };

    load();
  }, []);

  // =========================================================
  // LOAD PROFILES
  // =========================================================

  const loadProfiles =
    async () => {
      setError("");

      try {
        const data =
          await getAdminCodingProfiles();

        setProfiles(
          Array.isArray(data)
            ? data
            : []
        );
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

  // =========================================================
  // ERROR
  // =========================================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {
    console.error(error);

    if (
      axios.isAxiosError(
        error
      )
    ) {
      if (
        error.response
          ?.status === 401 ||
        error.response
          ?.status === 403
      ) {
        localStorage.clear();

        window.location.href =
          "/login";

        return;
      }

      setError(
        error.response?.data
          ?.message ||
          fallback
      );

      return;
    }

    setError(fallback);
  };

  // =========================================================
  // VERIFY
  // =========================================================

  const handleVerify =
    async (
      profile:
        AdminCodingProfile
    ) => {
      const id =
        getCodingProfileId(
          profile
        );

      if (!id) {
        setError(
          "Coding profile ID is missing."
        );

        return;
      }

      const confirmed =
        window.confirm(
          `Verify ${profile.platform} account "${profile.username}"?`
        );

      if (!confirmed) {
        return;
      }

      setError("");
      setSuccess("");
      setWorkingId(id);

      try {
        const updated =
          await verifyCodingProfile(
            id
          );

        setProfiles(
          (current) =>
            current.map(
              (item) => {
                const itemId =
                  getCodingProfileId(
                    item
                  );

                return itemId === id
                  ? {
                      ...item,
                      ...updated,
                    }
                  : item;
              }
            )
        );

        setSuccess(
          `${profile.platform} profile ${profile.username} verified successfully. Rebuild the leaderboard to calculate ranking.`
        );
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          "Unable to verify coding profile."
        );
      } finally {
        setWorkingId(null);
      }
    };

  // =========================================================
  // UNVERIFY
  // =========================================================

  const handleUnverify =
    async (
      profile:
        AdminCodingProfile
    ) => {
      const id =
        getCodingProfileId(
          profile
        );

      if (!id) {
        setError(
          "Coding profile ID is missing."
        );

        return;
      }

      const confirmed =
        window.confirm(
          `Remove verification from ${profile.platform} account "${profile.username}"?`
        );

      if (!confirmed) {
        return;
      }

      setError("");
      setSuccess("");
      setWorkingId(id);

      try {
        const updated =
          await unverifyCodingProfile(
            id
          );

        setProfiles(
          (current) =>
            current.map(
              (item) => {
                const itemId =
                  getCodingProfileId(
                    item
                  );

                return itemId === id
                  ? {
                      ...item,
                      ...updated,
                    }
                  : item;
              }
            )
        );

        setSuccess(
          `${profile.platform} profile ${profile.username} is now unverified.`
        );
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          "Unable to unverify coding profile."
        );
      } finally {
        setWorkingId(null);
      }
    };

  // =========================================================
  // REBUILD LEADERBOARD
  // =========================================================

  const handleRebuild =
    async () => {
      const confirmed =
        window.confirm(
          "Rebuild leaderboard scores now?"
        );

      if (!confirmed) {
        return;
      }

      setError("");
      setSuccess("");
      setRebuilding(true);

      try {
        await rebuildLeaderboard();

        setSuccess(
          "Leaderboard rebuilt successfully. Verified students should now receive updated rankings."
        );
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          "Unable to rebuild leaderboard."
        );
      } finally {
        setRebuilding(false);
      }
    };

  // =========================================================
  // FILTERING
  // =========================================================

  const filteredProfiles =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return profiles.filter(
        (profile) => {
          const matchesStatus =
            filter === "ALL" ||
            profile.verificationStatus ===
              filter;

          const matchesPlatform =
            platformFilter ===
              "ALL" ||
            profile.platform ===
              platformFilter;

          const searchable = [
            profile.studentName,
            profile.fullName,
            profile.studentEmail,
            profile.email,
            profile.collegeName,
            profile.username,
            profile.platform,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesSearch =
            !query ||
            searchable.includes(
              query
            );

          return (
            matchesStatus &&
            matchesPlatform &&
            matchesSearch
          );
        }
      );
    }, [
      profiles,
      filter,
      platformFilter,
      search,
    ]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">
          Loading coding profiles...
        </p>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <CodingVerificationHeader
          rebuilding={rebuilding}
          onRebuild={
            handleRebuild
          }
        />

        {error && (
          <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl border border-emerald-900/60 bg-emerald-950/30 px-5 py-4 text-sm text-emerald-300">
            {success}
          </div>
        )}

        <CodingVerificationSummary
          profiles={profiles}
        />

        <CodingVerificationFilters
          search={search}
          platformFilter={
            platformFilter
          }
          filter={filter}
          onSearchChange={
            setSearch
          }
          onPlatformFilterChange={
            setPlatformFilter
          }
          onFilterChange={
            setFilter
          }
        />

        <CodingProfilesList
          profiles={
            filteredProfiles
          }
          workingId={
            workingId
          }
          onVerify={
            handleVerify
          }
          onUnverify={
            handleUnverify
          }
        />
      </div>
    </main>
  );
}