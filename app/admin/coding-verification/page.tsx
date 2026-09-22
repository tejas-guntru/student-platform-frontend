"use client";

import axios from "axios";

import {
  useEffect,
  useMemo,
  useState,
  type ElementType,
} from "react";

import {
  AlertCircle,
  CheckCircle2,
  Code2,
  LoaderCircle,
  RefreshCcw,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

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
  ] = useState<AdminCodingProfile[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    workingId,
    setWorkingId,
  ] = useState<string | null>(null);

  const [
    rebuilding,
    setRebuilding,
  ] = useState(false);

  const [
    filter,
    setFilter,
  ] = useState<CodingVerificationFilter>(
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
    const load = async () => {
      const token =
        localStorage.getItem("token");

      const role =
        localStorage.getItem("role");

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
      <main
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          bg-[#F4F9FF]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -left-32
            top-10
            h-[400px]
            w-[400px]
            rounded-full
            bg-[#38BDF8]/15
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            bottom-10
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#0877E8]/12
            blur-[130px]
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            items-center
            text-center
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-[#0877E8]
              to-[#38BDF8]
              text-white
              shadow-[0_14px_35px_rgba(8,119,232,0.25)]
            "
          >
            <LoaderCircle
              size={25}
              className="animate-spin"
            />
          </div>

          <p
            className="
              mt-5
              font-semibold
              text-[#173B63]
            "
          >
            Loading coding profiles
          </p>

          <p
            className="
              mt-1
              text-sm
              text-[#8095A8]
            "
          >
            Preparing verification management...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // COUNTS
  // =========================================================

  const verifiedCount =
    profiles.filter(
      (profile) =>
        profile.verificationStatus ===
        "VERIFIED"
    ).length;

  const notVerifiedCount =
    profiles.length -
    verifiedCount;

  const platformCount =
    new Set(
      profiles.map(
        (profile) =>
          profile.platform
      )
    ).size;

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F4F9FF]
        text-[#173B63]
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-52
          top-24
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#38BDF8]/10
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-56
          top-[520px]
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#0877E8]/8
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.18]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          py-6

          sm:px-6

          lg:px-8
          lg:py-8
        "
      >
        {/* HEADER */}

        <CodingVerificationHeader
          rebuilding={
            rebuilding
          }
          onRebuild={
            handleRebuild
          }
        />

        {/* ===================================================
            HERO
        =================================================== */}

        <section
          className="
            relative
            mt-6
            overflow-hidden
            rounded-[30px]
            bg-gradient-to-r
            from-[#0877E8]
            via-[#1294F2]
            to-[#38BDF8]
            px-6
            py-8
            text-white
            shadow-[0_22px_60px_rgba(8,119,232,0.18)]

            sm:px-8
            sm:py-9
          "
        >
          {/* GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-28
              h-72
              w-72
              rounded-full
              bg-white/18
              blur-[80px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-28
              left-[30%]
              h-72
              w-72
              rounded-full
              bg-[#C9F0FF]/20
              blur-[90px]
            "
          />

          {/* GRID */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.14]
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,0.2) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.2) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "40px 40px",
            }}
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-7

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* LEFT */}

            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  px-3.5
                  py-2
                  backdrop-blur-xl
                "
              >
                <Code2 size={14} />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-white/80
                  "
                >
                  Coding Profile Verification
                </span>
              </div>

              <h1
                className="
                  mt-5
                  text-3xl
                  font-bold
                  tracking-[-0.04em]

                  sm:text-4xl
                "
              >
                Verify Coding Profiles
              </h1>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-6
                  text-white/75

                  sm:text-base
                "
              >
                Review connected coding accounts,
                verify student profiles and rebuild
                leaderboard rankings when verification
                data changes.
              </p>

              {rebuilding && (
                <div
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    bg-white/10
                    px-3.5
                    py-2
                    text-xs
                    font-semibold
                    text-white/85
                    backdrop-blur
                  "
                >
                  <LoaderCircle
                    size={14}
                    className="animate-spin"
                  />

                  Rebuilding leaderboard...
                </div>
              )}
            </div>

            {/* METRICS */}

            <div
              className="
                grid
                w-full
                grid-cols-2
                gap-3

                sm:grid-cols-4

                lg:max-w-2xl
              "
            >
              <HeroMetric
                icon={UsersRound}
                label="Profiles"
                value={
                  profiles.length
                }
              />

              <HeroMetric
                icon={ShieldCheck}
                label="Verified"
                value={
                  verifiedCount
                }
              />

              <HeroMetric
                icon={Code2}
                label="Not Verified"
                value={
                  notVerifiedCount
                }
              />

              <HeroMetric
                icon={RefreshCcw}
                label="Platforms"
                value={
                  platformCount
                }
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-5
              py-4
              text-sm
              text-red-700
              shadow-[0_8px_24px_rgba(239,68,68,0.05)]
            "
          >
            <AlertCircle
              size={18}
              className="
                mt-0.5
                shrink-0
              "
            />

            <div>
              <p className="font-semibold">
                Something needs attention
              </p>

              <p className="mt-1">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            SUCCESS
        =================================================== */}

        {success && (
          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-emerald-200
              bg-emerald-50
              px-5
              py-4
              text-sm
              text-emerald-700
              shadow-[0_8px_24px_rgba(16,185,129,0.05)]
            "
          >
            <CheckCircle2
              size={18}
              className="
                mt-0.5
                shrink-0
              "
            />

            <div>
              <p className="font-semibold">
                Success
              </p>

              <p className="mt-1">
                {success}
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            SUMMARY
        =================================================== */}

        <div className="mt-8">
          <CodingVerificationSummary
            profiles={
              profiles
            }
          />
        </div>

        {/* ===================================================
            FILTERS
        =================================================== */}

        <div className="mt-8">
          <CodingVerificationFilters
            search={
              search
            }
            platformFilter={
              platformFilter
            }
            filter={
              filter
            }
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
        </div>

        {/* ===================================================
            RESULT HEADER
        =================================================== */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-2

            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-[#0877E8]
              "
            >
              Coding Accounts
            </p>

            <h2
              className="
                mt-1
                text-xl
                font-bold
                tracking-[-0.03em]
                text-[#173B63]
              "
            >
              Verification Results
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-[#8095A8]
              "
            >
              Review matching student coding profiles.
            </p>
          </div>

          <div
            className="
              w-fit
              rounded-full
              border
              border-[#D9E9F5]
              bg-white
              px-3.5
              py-2
              text-xs
              font-semibold
              text-[#58778F]
              shadow-[0_5px_18px_rgba(8,119,232,0.04)]
            "
          >
            {filteredProfiles.length}{" "}
            {filteredProfiles.length === 1
              ? "profile"
              : "profiles"}
          </div>
        </div>

        {/* ===================================================
            PROFILES
        =================================================== */}

        <div className="mt-5">
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

        {/* ===================================================
            FOOTER
        =================================================== */}

        <footer
          className="
            mt-12
            border-t
            border-[#DCEAF5]
            py-6
            text-center
          "
        >
          <p
            className="
              text-xs
              text-[#8298AB]
            "
          >
            Trailbliz Administration
            <span
              className="
                mx-2
                text-[#C1D4E2]
              "
            >
              •
            </span>
            Coding Verification
          </p>
        </footer>
      </div>
    </main>
  );
}

// =========================================================
// HERO METRIC
// =========================================================

function HeroMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: number;
}) {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-white/15
        bg-white/10
        p-4
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-xl
          bg-white/15
          text-white
        "
      >
        <Icon size={15} />
      </div>

      <p
        className="
          mt-3
          text-2xl
          font-bold
          tracking-[-0.04em]
          text-white

          sm:text-3xl
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1
          text-[9px]
          font-bold
          uppercase
          tracking-[0.12em]
          text-white/60
        "
      >
        {label}
      </p>
    </div>
  );
}