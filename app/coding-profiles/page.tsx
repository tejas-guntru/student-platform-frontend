"use client";

import axios from "axios";
import Link from "next/link";

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


interface PlatformConfig {
  platform: CodingPlatform;
  name: string;
  description: string;
  placeholder: string;
}


const platforms: PlatformConfig[] = [
  {
    platform: "CODEFORCES",
    name: "Codeforces",
    description:
      "Connect your Codeforces account and sync competitive programming statistics.",
    placeholder:
      "Codeforces username",
  },
  {
    platform: "LEETCODE",
    name: "LeetCode",
    description:
      "Connect your LeetCode account and sync contest and problem-solving statistics.",
    placeholder:
      "LeetCode username",
  },
  {
    platform: "CODECHEF",
    name: "CodeChef",
    description:
      "Connect your CodeChef account and sync competitive programming statistics.",
    placeholder:
      "CodeChef username",
  },
];


export default function CodingProfilesPage() {

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
  ] =
    useState<CodingPlatform | null>(
      null
    );

  const [
    workingPlatform,
    setWorkingPlatform,
  ] =
    useState<CodingPlatform | null>(
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
  // LOAD
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
  // ERROR
  // =========================================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {

    console.error(error);

    if (
      axios.isAxiosError(error)
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
  // CONNECT
  // =========================================================

  const handleConnect =
    async (
      platform: CodingPlatform
    ) => {

      const username =
        usernames[platform].trim();

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
          `${platformName(platform)} connected successfully.`
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
  // START EDIT
  // =========================================================

  const startEdit = (
    profile: CodingProfile
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


  // =========================================================
  // CANCEL EDIT
  // =========================================================

  const cancelEdit = (
    profile: CodingProfile
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
  // SAVE EDIT
  // =========================================================

  const handleUpdate =
    async (
      profile: CodingProfile
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
      platform: CodingPlatform
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
    platform: CodingPlatform
  ) =>
    profiles.find(
      (profile) =>
        profile.platform ===
        platform
    );


  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">

        <p className="text-zinc-400">
          Loading coding profiles...
        </p>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-6xl px-6 py-8">


        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              CODING PROFILES
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Coding Accounts
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Connect and manage your
              competitive programming accounts.
            </p>

          </div>

          <Link
            href="/dashboard"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
          >
            ← Dashboard
          </Link>

        </header>


        {error && (

          <div className="mt-6 rounded-xl border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
            {error}
          </div>

        )}


        {success && (

          <div className="mt-6 rounded-xl border border-emerald-900 bg-emerald-950/30 p-4 text-sm text-emerald-300">
            {success}
          </div>

        )}


        <section className="mt-8 space-y-6">

          {platforms.map(
            (config) => {

              const profile =
                getProfile(
                  config.platform
                );

              const editing =
                editingPlatform ===
                config.platform;

              const working =
                workingPlatform ===
                config.platform;


              return (

                <article
                  key={config.platform}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"
                >

                  <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">


                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="text-2xl font-semibold">
                          {config.name}
                        </h2>


                        {profile && (

                          <VerificationBadge
                            status={
                              profile.verificationStatus
                            }
                          />

                        )}

                      </div>


                      <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
                        {config.description}
                      </p>


                      {profile && (

                        <div className="mt-5">

                          <p className="text-xs text-zinc-500">
                            Connected account
                          </p>

                          <p className="mt-1 font-semibold">
                            {profile.username}
                          </p>

                        </div>

                      )}

                    </div>


                    <div className="w-full lg:max-w-md">

                      <input
                        type="text"
                        value={
                          usernames[
                            config.platform
                          ]
                        }
                        disabled={
                          Boolean(profile) &&
                          !editing
                        }
                        onChange={(
                          event
                        ) =>
                          setUsernames(
                            (current) => ({
                              ...current,

                              [config.platform]:
                                event.target.value,
                            })
                          )
                        }
                        placeholder={
                          config.placeholder
                        }
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none disabled:cursor-not-allowed disabled:text-zinc-500"
                      />


                      <div className="mt-3 flex flex-wrap gap-3">


                        {!profile && (

                          <button
                            type="button"
                            disabled={
                              working
                            }
                            onClick={() =>
                              handleConnect(
                                config.platform
                              )
                            }
                            className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
                          >
                            {working
                              ? "Connecting..."
                              : "Connect"}
                          </button>

                        )}


                        {profile &&
                          !editing && (
                            <>

                              <button
                                type="button"
                                onClick={() =>
                                  startEdit(
                                    profile
                                  )
                                }
                                className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-800"
                              >
                                Edit Username
                              </button>


                              <button
                                type="button"
                                disabled={
                                  working
                                }
                                onClick={() =>
                                  handleRefresh(
                                    config.platform
                                  )
                                }
                                className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
                              >
                                {working
                                  ? "Refreshing..."
                                  : "Refresh Stats"}
                              </button>

                            </>
                          )}


                        {profile &&
                          editing && (
                            <>

                              <button
                                type="button"
                                disabled={
                                  working
                                }
                                onClick={() =>
                                  handleUpdate(
                                    profile
                                  )
                                }
                                className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
                              >
                                {working
                                  ? "Saving..."
                                  : "Save Username"}
                              </button>


                              <button
                                type="button"
                                disabled={
                                  working
                                }
                                onClick={() =>
                                  cancelEdit(
                                    profile
                                  )
                                }
                                className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm hover:bg-zinc-800 disabled:opacity-50"
                              >
                                Cancel
                              </button>

                            </>
                          )}

                      </div>

                    </div>

                  </div>


                  {profile && (

                    <div className="mt-7 grid gap-4 border-t border-zinc-800 pt-6 sm:grid-cols-2 lg:grid-cols-4">

                      <Stat
                        label="Current Rating"
                        value={
                          profile.currentRating
                        }
                      />

                      <Stat
                        label="Max Rating"
                        value={
                          profile.maxRating
                        }
                      />

                      <Stat
                        label="Problems Solved"
                        value={
                          profile.problemsSolved
                        }
                      />

                      <Stat
                        label="Contests"
                        value={
                          profile.contestCount
                        }
                      />

                    </div>

                  )}

                </article>
              );
            }
          )}

        </section>

      </div>

    </main>
  );
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


function Stat({
  label,
  value,
}: {
  label: string;
  value:
    | number
    | null;
}) {

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold">
        {value ?? "-"}
      </p>

    </div>
  );
}


function platformName(
  platform:
    CodingPlatform
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