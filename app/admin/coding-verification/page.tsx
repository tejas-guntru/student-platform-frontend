"use client";

import axios from "axios";
import Link from "next/link";

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


type FilterStatus =
  | "ALL"
  | "VERIFIED"
  | "UNVERIFIED";


export default function AdminCodingVerificationPage() {

  const [
    profiles,
    setProfiles,
  ] = useState<AdminCodingProfile[]>([]);

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
  ] = useState<FilterStatus>(
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
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {

        localStorage.clear();

        window.location.href =
          "/login";

        return;
      }


      setError(
        error.response?.data?.message ||
        fallback
      );

      return;
    }


    setError(fallback);
  };


  // =========================================================
  // GET ID
  // =========================================================

  const getProfileId = (
    profile:
      AdminCodingProfile
  ) => {

    return (
      profile.profileId ||
      profile.id ||
      null
    );
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
        getProfileId(profile);


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
                  getProfileId(item);


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

        setWorkingId(
          null
        );
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
        getProfileId(profile);


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
                  getProfileId(item);


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

        setWorkingId(
          null
        );
      }
    };


  // =========================================================
  // REBUILD
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

      setRebuilding(
        true
      );


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

        setRebuilding(
          false
        );
      }
    };


  // =========================================================
  // FILTERING
  // =========================================================

  const filteredProfiles =
    useMemo(
      () => {

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


            const searchable =
              [
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

      },
      [
        profiles,
        filter,
        platformFilter,
        search,
      ]
    );


  // =========================================================
  // COUNTS
  // =========================================================

  const verifiedCount =
    profiles.filter(
      (profile) =>
        profile.verificationStatus ===
        "VERIFIED"
    ).length;


  const unverifiedCount =
    profiles.filter(
      (profile) =>
        profile.verificationStatus ===
        "UNVERIFIED"
    ).length;


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


        {/* HEADER */}

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              ADMIN
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Coding Verification
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Verify student coding accounts
              before including them in rankings.
            </p>

          </div>


          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              disabled={
                rebuilding
              }
              onClick={
                handleRebuild
              }
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
            >

              {rebuilding
                ? "Rebuilding..."
                : "Rebuild Leaderboard"}

            </button>


            <Link
              href="/admin/dashboard"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-900"
            >
              ← Dashboard
            </Link>

          </div>

        </header>


        {/* ERROR */}

        {error && (

          <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-300">

            {error}

          </div>
        )}


        {/* SUCCESS */}

        {success && (

          <div className="mt-6 rounded-xl border border-emerald-900/60 bg-emerald-950/30 px-5 py-4 text-sm text-emerald-300">

            {success}

          </div>
        )}


        {/* SUMMARY */}

        <section className="mt-8 grid gap-4 sm:grid-cols-3">

          <SummaryCard
            label="Total Profiles"
            value={
              profiles.length
            }
          />

          <SummaryCard
            label="Verified"
            value={
              verifiedCount
            }
          />

          <SummaryCard
            label="Pending Verification"
            value={
              unverifiedCount
            }
          />

        </section>


        {/* FILTERS */}

        <section className="mt-8 grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 lg:grid-cols-[1fr_220px_220px]">

          <input
            type="text"
            value={
              search
            }
            onChange={(
              event
            ) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search student, email or username..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
          />


          <select
            value={
              platformFilter
            }
            onChange={(
              event
            ) =>
              setPlatformFilter(
                event.target.value as
                  AdminCodingPlatform |
                  "ALL"
              )
            }
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
          >

            <option value="ALL">
              All platforms
            </option>

            <option value="CODEFORCES">
              Codeforces
            </option>

            <option value="LEETCODE">
              LeetCode
            </option>

            <option value="CODECHEF">
              CodeChef
            </option>

          </select>


          <select
            value={
              filter
            }
            onChange={(
              event
            ) =>
              setFilter(
                event.target.value as
                  FilterStatus
              )
            }
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
          >

            <option value="ALL">
              All verification
            </option>

            <option value="UNVERIFIED">
              Unverified
            </option>

            <option value="VERIFIED">
              Verified
            </option>

          </select>

        </section>


        {/* LIST */}

        {filteredProfiles.length ===
        0 ? (

          <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">

            <p className="text-zinc-400">
              No coding profiles found.
            </p>

          </section>

        ) : (

          <section className="mt-8 space-y-5">

            {filteredProfiles.map(
              (
                profile,
                index
              ) => {

                const id =
                  getProfileId(
                    profile
                  ) ||
                  String(index);


                const working =
                  workingId === id;


                return (

                  <article
                    key={id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                  >

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">


                      {/* STUDENT */}

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <h2 className="text-xl font-bold">

                            {
                              getStudentName(
                                profile
                              )
                            }

                          </h2>


                          <VerificationBadge
                            status={
                              profile.verificationStatus
                            }
                          />

                        </div>


                        <p className="mt-2 text-sm text-zinc-500">

                          {
                            profile.studentEmail ||
                            profile.email ||
                            ""
                          }

                        </p>


                        <div className="mt-5 flex flex-wrap gap-4 text-sm">

                          <div>

                            <p className="text-xs text-zinc-500">
                              Platform
                            </p>

                            <p className="mt-1 font-semibold">
                              {
                                formatPlatform(
                                  profile.platform
                                )
                              }
                            </p>

                          </div>


                          <div>

                            <p className="text-xs text-zinc-500">
                              Username
                            </p>

                            <p className="mt-1 font-semibold">
                              {
                                profile.username
                              }
                            </p>

                          </div>


                          {profile.graduationYear && (

                            <div>

                              <p className="text-xs text-zinc-500">
                                Graduation
                              </p>

                              <p className="mt-1 font-semibold">
                                {
                                  profile.graduationYear
                                }
                              </p>

                            </div>

                          )}

                        </div>

                      </div>


                      {/* ACTION */}

                      <div className="flex flex-wrap gap-3">

                        {profile.profileUrl && (

                          <a
                            href={
                              profile.profileUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold transition hover:bg-zinc-800"
                          >
                            Open Profile
                          </a>

                        )}


                        {profile.verificationStatus ===
                          "UNVERIFIED" ? (

                          <button
                            type="button"
                            disabled={
                              working
                            }
                            onClick={() =>
                              handleVerify(
                                profile
                              )
                            }
                            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
                          >

                            {working
                              ? "Verifying..."
                              : "Verify"}

                          </button>

                        ) : (

                          <button
                            type="button"
                            disabled={
                              working
                            }
                            onClick={() =>
                              handleUnverify(
                                profile
                              )
                            }
                            className="rounded-lg border border-red-900 bg-red-950/30 px-5 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-950/60 disabled:opacity-50"
                          >

                            {working
                              ? "Updating..."
                              : "Unverify"}

                          </button>
                        )}

                      </div>

                    </div>


                    {/* STATS */}

                    <div className="mt-6 grid gap-4 border-t border-zinc-800 pt-6 sm:grid-cols-2 lg:grid-cols-5">

                      <StatCard
                        label="Current Rating"
                        value={
                          profile.currentRating
                        }
                      />

                      <StatCard
                        label="Max Rating"
                        value={
                          profile.maxRating
                        }
                      />

                      <StatCard
                        label="Problems"
                        value={
                          profile.problemsSolved
                        }
                      />

                      <StatCard
                        label="Contests"
                        value={
                          profile.contestCount
                        }
                      />

                      <StatCard
                        label="Sync"
                        value={
                          profile.syncStatus ||
                          "-"
                        }
                      />

                    </div>

                  </article>
                );
              }
            )}

          </section>
        )}

      </div>

    </main>
  );
}


// =========================================================
// HELPERS
// =========================================================

function getProfileId(
  profile:
    AdminCodingProfile
) {

  return (
    profile.profileId ||
    profile.id ||
    null
  );
}


function getStudentName(
  profile:
    AdminCodingProfile
) {

  return (
    profile.studentName ||
    profile.fullName ||
    "Student"
  );
}


function formatPlatform(
  platform:
    AdminCodingPlatform
) {

  switch (platform) {

    case "CODEFORCES":
      return "Codeforces";

    case "LEETCODE":
      return "LeetCode";

    case "CODECHEF":
      return "CodeChef";
  }
}


function VerificationBadge({
  status,
}: {
  status:
    "VERIFIED" |
    "UNVERIFIED";
}) {

  if (
    status === "VERIFIED"
  ) {

    return (
      <span className="rounded-full border border-emerald-900 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
        VERIFIED
      </span>
    );
  }


  return (
    <span className="rounded-full border border-amber-900 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-400">
      UNVERIFIED
    </span>
  );
}


function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}


function StatCard({
  label,
  value,
}: {
  label: string;

  value:
    | string
    | number
    | null
    | undefined;
}) {

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-2 font-semibold">
        {value ?? "-"}
      </p>

    </div>
  );
}