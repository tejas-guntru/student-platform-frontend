"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getMyMembership } from "@/services/membershipService";
import type { MembershipResponse } from "@/types/membership";

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [membership, setMembership] =
    useState<MembershipResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================================================
  // LOAD DASHBOARD
  // =========================================================

  useEffect(() => {
    const loadDashboard = async () => {
      const token =
        localStorage.getItem("token");

      const role =
        localStorage.getItem("role");

      const storedEmail =
        localStorage.getItem("email");

      if (
        !token ||
        role !== "STUDENT"
      ) {
        router.replace("/login");
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
      } catch (error: unknown) {
        console.error(
          "DASHBOARD ERROR:",
          error
        );

        if (
          axios.isAxiosError(error)
        ) {
          if (
            error.response?.status === 401 ||
            error.response?.status === 403
          ) {
            localStorage.clear();

            router.replace(
              "/login"
            );

            return;
          }

          setError(
            error.response?.data?.message ||
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

    router.push(
      "/login"
    );
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
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">
          Loading dashboard...
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

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              STUDENT PLATFORM
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              {email}
            </p>
          </div>


          <button
            onClick={logout}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:bg-zinc-900"
          >
            Logout
          </button>

        </header>


        {/* ERROR */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-900/50 bg-red-950/30 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}


        {/* WELCOME */}

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-7">

          <p className="text-sm text-zinc-500">
            Welcome back
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Continue building your career profile.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Connect coding profiles, check your leaderboard
            position, discover internships and jobs, and
            track your applications.
          </p>

        </section>


        {/* MAIN CARDS */}

        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">


          {/* MEMBERSHIP */}

          <Link
            href="/membership"
            className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/80"
          >

            <p className="text-sm text-zinc-500">
              Membership
            </p>


            <div className="mt-4">

              {membership?.active ? (
                <>
                  <span className="inline-flex rounded-full border border-emerald-900 bg-emerald-950/40 px-3 py-1 text-sm font-medium text-emerald-400">
                    ACTIVE
                  </span>

                  <p className="mt-4 text-sm text-zinc-400">
                    Valid until
                  </p>

                  <p className="mt-1 font-semibold">
                    {formatDate(
                      membership.endsAt
                    )}
                  </p>

                  <p className="mt-4 text-sm font-medium text-white">
                    Manage Membership →
                  </p>
                </>
              ) : (
                <>
                  <span className="inline-flex rounded-full border border-amber-900 bg-amber-950/40 px-3 py-1 text-sm font-medium text-amber-400">
                    INACTIVE
                  </span>

                  <p className="mt-4 text-sm leading-6 text-zinc-400">
                    Membership is required
                    to apply for opportunities.
                  </p>

                  <p className="mt-4 text-sm font-medium text-white">
                    Get Membership →
                  </p>
                </>
              )}

            </div>

          </Link>


          {/* PROFILE */}

          <Link
            href="/profile"
            className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/80"
          >

            <p className="text-sm text-zinc-500">
              Profile
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              Student Profile
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Manage your college,
              graduation year and career
              information.
            </p>

            <p className="mt-4 text-sm font-medium text-white">
              View Profile →
            </p>

          </Link>


          {/* CODING PROFILES */}

          <Link
            href="/coding-profiles"
            className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/80"
          >

            <p className="text-sm text-zinc-500">
              Coding
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              Coding Profiles
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Connect Codeforces,
              LeetCode and CodeChef
              accounts.
            </p>

            <p className="mt-4 text-sm font-medium text-white">
              Manage Profiles →
            </p>

          </Link>


          {/* OPPORTUNITIES */}

          <Link
            href="/opportunities"
            className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/80"
          >

            <p className="text-sm text-zinc-500">
              Opportunities
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              Jobs & Internships
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Discover opportunities
              matching your graduation
              year.
            </p>

            <p className="mt-4 text-sm font-medium text-white">
              Browse Opportunities →
            </p>

          </Link>

        </section>


        {/* SECOND ROW */}

        <section className="mt-6 grid gap-6 md:grid-cols-2">


          {/* LEADERBOARD */}

          <Link
            href="/leaderboard"
            className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/80"
          >

            <p className="text-sm text-zinc-500">
              Rankings
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Leaderboard
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              View your global, college
              and graduation-year rankings.
            </p>

            <p className="mt-4 text-sm font-medium text-white">
              View Leaderboard →
            </p>

          </Link>


          {/* APPLICATIONS */}

          <Link
            href="/applications"
            className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/80"
          >

            <p className="text-sm text-zinc-500">
              Tracking
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              My Applications
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Follow application status,
              shortlist updates and resume
              requests.
            </p>

            <p className="mt-4 text-sm font-medium text-white">
              Track Applications →
            </p>

          </Link>

        </section>


        {/* QUICK STATUS */}

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Account Status
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                {membership?.active
                  ? "You can apply to opportunities"
                  : "Activate membership to apply"}
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                {membership?.active
                  ? "Your paid membership is currently active."
                  : "Profile, coding stats and leaderboards remain available without membership."}
              </p>

            </div>


            {membership?.active ? (
              <Link
                href="/opportunities"
                className="rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Find Opportunities
              </Link>
            ) : (
              <Link
                href="/membership"
                className="rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Get Membership
              </Link>
            )}

          </div>

        </section>

      </div>

    </main>
  );
}