"use client";

import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  AlertCircle,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import {
  getMyMembership,
} from "@/services/membershipService";

import type {
  MembershipResponse,
} from "@/types/membership";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardHero from "@/components/dashboard/DashboardHero";
import ProfileCard from "@/components/dashboard/ProfileCard";
import MembershipCard from "@/components/dashboard/MembershipCard";
import OpportunitiesCard from "@/components/dashboard/OpportunitiesCard";
import TrackingCards from "@/components/dashboard/TrackingCards";
import AccountStatus from "@/components/dashboard/AccountStatus";

export default function DashboardPage() {
  const router = useRouter();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    membership,
    setMembership,
  ] =
    useState<MembershipResponse | null>(
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

  // =========================================================
  // LOAD DASHBOARD
  // =========================================================

  useEffect(() => {
    const loadDashboard =
      async () => {
        const token =
          localStorage.getItem(
            "token"
          );

        const role =
          localStorage.getItem(
            "role"
          );

        const storedEmail =
          localStorage.getItem(
            "email"
          );

        if (
          !token ||
          role !== "STUDENT"
        ) {
          router.replace(
            "/login"
          );

          return;
        }

        setEmail(
          storedEmail || ""
        );

        try {
          const membershipData =
            await getMyMembership();

          setMembership(
            membershipData
          );
        } catch (
          error: unknown
        ) {
          console.error(
            "DASHBOARD ERROR:",
            error
          );

          if (
            axios.isAxiosError(
              error
            )
          ) {
            if (
              error.response
                ?.status ===
                401 ||
              error.response
                ?.status ===
                403
            ) {
              localStorage.clear();

              router.replace(
                "/login"
              );

              return;
            }

            setError(
              error.response?.data
                ?.message ||
                "Unable to load dashboard."
            );
          } else {
            setError(
              "Something went wrong."
            );
          }
        } finally {
          setLoading(false);
        }
      };

    loadDashboard();
  }, [router]);

  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "email"
    );

    localStorage.removeItem(
      "role"
    );

    router.push("/login");
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (
    value: string | null
  ) => {
    if (!value) {
      return "-";
    }

    return new Date(
      value
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // MEMBERSHIP STATUS
  // =========================================================

  const membershipActive =
    membership?.active === true;

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
            h-[420px]
            w-[420px]
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
            h-[460px]
            w-[460px]
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
            Loading your dashboard
          </p>

          <p
            className="
              mt-1
              text-sm
              text-[#8095A8]
            "
          >
            Preparing your Trailbliz workspace...
          </p>
        </div>
      </main>
    );
  }

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
          top-32
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#38BDF8]/10
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-56
          top-[680px]
          h-[580px]
          w-[580px]
          rounded-full
          bg-[#0877E8]/8
          blur-[160px]
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
          HEADER
      ===================================================== */}

      <div className="relative z-20">
        <DashboardHeader
          email={email}
          onLogout={logout}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1280px]
          px-4
          py-6

          sm:px-6
          sm:py-8

          lg:px-8
          lg:py-10
        "
      >
        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div
            className="
              mb-6
              flex
              items-start
              gap-3
              rounded-[20px]
              border
              border-red-200
              bg-white
              px-5
              py-4
              text-sm
              text-red-700
              shadow-[0_10px_30px_rgba(239,68,68,0.05)]
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-50
                text-red-600
              "
            >
              <AlertCircle
                size={17}
              />
            </div>

            <div>
              <p className="font-semibold">
                Unable to load everything
              </p>

              <p
                className="
                  mt-1
                  leading-5
                  text-red-600/80
                "
              >
                {error}
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            HERO
        =================================================== */}

        <DashboardHero
          membership={
            membership
          }
          formatDate={
            formatDate
          }
        />

        {/* ===================================================
            WORKSPACE
        =================================================== */}

        <section className="mt-8">
          <div
            className="
              flex
              flex-col
              gap-3

              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Sparkles
                  size={14}
                  className="text-[#0877E8]"
                />

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.17em]
                    text-[#0877E8]
                  "
                >
                  Student Workspace
                </p>
              </div>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  tracking-[-0.035em]
                  text-[#173B63]
                "
              >
                Your Trailbliz
                workspace
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-6
                  text-[#768D9F]
                "
              >
                Keep your profile ready,
                manage membership and
                discover opportunities from
                one place.
              </p>
            </div>

            <div
              className="
                w-fit
                rounded-full
                border
                border-[#D4E7F4]
                bg-white/80
                px-3.5
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#69859A]
                shadow-[0_6px_20px_rgba(8,119,232,0.04)]
                backdrop-blur
              "
            >
              Student Dashboard
            </div>
          </div>

          {/* MAIN CARDS */}

          <div
            className="
              mt-5
              grid
              gap-5

              lg:grid-cols-3
            "
          >
            <ProfileCard
              email={email}
            />

            <MembershipCard
              membership={
                membership
              }
              formatDate={
                formatDate
              }
            />

            <OpportunitiesCard
              membershipActive={
                membershipActive
              }
            />
          </div>
        </section>

        {/* ===================================================
            TRACKING
        =================================================== */}

        <section className="mt-8">
          <TrackingCards />
        </section>

        {/* ===================================================
            ACCOUNT STATUS
        =================================================== */}

        <section className="mt-8">
          <AccountStatus
            email={email}
            membershipActive={
              membershipActive
            }
          />
        </section>

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
            Trailbliz
            <span
              className="
                mx-2
                text-[#C1D4E2]
              "
            >
              •
            </span>
            Build your profile.
            Show your progress.
            Discover opportunities.
          </p>
        </footer>
      </div>
    </main>
  );
}