"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getMyMembership } from "@/services/membershipService";
import type { MembershipResponse } from "@/types/membership";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardHero from "@/components/dashboard/DashboardHero";
import ProfileCard from "@/components/dashboard/ProfileCard";
import MembershipCard from "@/components/dashboard/MembershipCard";
import OpportunitiesCard from "@/components/dashboard/OpportunitiesCard";
import TrackingCards from "@/components/dashboard/TrackingCards";
import AccountStatus from "@/components/dashboard/AccountStatus";

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [membership, setMembership] =
    useState<MembershipResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD DASHBOARD
  // =========================================================

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const storedEmail = localStorage.getItem("email");

      if (!token || role !== "STUDENT") {
        router.replace("/login");
        return;
      }

      setEmail(storedEmail || "");

      try {
        const membershipData = await getMyMembership();

        setMembership(membershipData);
      } catch (error: unknown) {
        console.error("DASHBOARD ERROR:", error);

        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 401 ||
            error.response?.status === 403
          ) {
            localStorage.clear();

            router.replace("/login");
            return;
          }

          setError(
            error.response?.data?.message ||
              "Unable to load dashboard."
          );
        } else {
          setError("Something went wrong.");
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
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    router.push("/login");
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (value: string | null) => {
    if (!value) {
      return "-";
    }

    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // MEMBERSHIP STATUS
  // =========================================================

  const membershipActive = membership?.active === true;

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f7f3]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#e3e1da] border-t-[#14213d]" />

          <p className="mt-4 text-sm font-medium text-[#5f6470]">
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-[#f8f7f3] text-[#14213d]">
      {/* HEADER */}
      <DashboardHeader
        email={email}
        onLogout={logout}
      />

      {/* CONTENT */}
      <div className="mx-auto max-w-[1280px] px-6 py-8 sm:px-8 lg:py-10">
        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-[10px] border border-[#f0c7c7] bg-[#fff5f5] px-5 py-4 text-sm font-medium text-[#a33a3a]">
            {error}
          </div>
        )}

        {/* HERO */}
        <DashboardHero
          membership={membership}
          formatDate={formatDate}
        />

        {/* MAIN CARDS */}
        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <ProfileCard email={email} />

          <MembershipCard
            membership={membership}
            formatDate={formatDate}
          />

          <OpportunitiesCard
            membershipActive={membershipActive}
          />
        </section>

        {/* TRACKING */}
        <section className="mt-6">
          <TrackingCards />
        </section>

        {/* ACCOUNT STATUS */}
        <section className="mt-6">
          <AccountStatus
            email={email}
            membershipActive={membershipActive}
          />
        </section>
      </div>
    </main>
  );
}
