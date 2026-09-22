"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import {
  Activity,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  getAdminApplications,
  getAdminOpportunities,
} from "@/services/adminService";

import type { Opportunity } from "@/types/opportunity";
import type { AdminApplication } from "@/types/admin";

import AdminHeader from "@/components/admin/AdminHeader";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import ManagementCards from "@/components/admin/dashboard/ManagementCards";
import ApplicationPipeline from "@/components/admin/dashboard/ApplicationPipeline";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import RecentApplications from "@/components/admin/dashboard/RecentApplications";
import PlatformStatus from "@/components/admin/dashboard/PlatformStatus";

export default function AdminDashboardPage() {
  const [opportunities, setOpportunities] =
    useState<Opportunity[]>([]);

  const [applications, setApplications] =
    useState<AdminApplication[]>([]);

  const [adminEmail, setAdminEmail] =
    useState("");

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

      const email =
        localStorage.getItem("email");

      if (!token || role !== "ADMIN") {
        window.location.href = "/login";
        return;
      }

      setAdminEmail(email || "");

      try {
        const [
          opportunityData,
          applicationData,
        ] = await Promise.all([
          getAdminOpportunities(),
          getAdminApplications(),
        ]);

        setOpportunities(
          Array.isArray(opportunityData)
            ? opportunityData
            : []
        );

        setApplications(
          Array.isArray(applicationData)
            ? applicationData
            : []
        );
      } catch (error: unknown) {
        console.error(
          "ADMIN DASHBOARD ERROR:",
          error
        );

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
            error.response?.data?.message ||
              "Unable to load admin dashboard."
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
  }, []);

  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {
    localStorage.clear();

    window.location.href = "/login";
  };

  // =========================================================
  // DASHBOARD COUNTS
  // =========================================================

  const activeOpportunities =
    opportunities.filter(
      (opportunity) =>
        opportunity.status === "ACTIVE"
    ).length;

  const shortlisted =
    applications.filter(
      (application) =>
        application.status ===
        "SHORTLISTED"
    ).length;

  const resumeRequested =
    applications.filter(
      (application) =>
        application.status ===
          "RESUME_REQUESTED" ||
        application.status ===
          "RESUME_SUBMITTED"
    ).length;

  const selected =
    applications.filter(
      (application) =>
        application.status ===
        "SELECTED"
    ).length;

  const rejected =
    applications.filter(
      (application) =>
        application.status ===
        "REJECTED"
    ).length;

  const forwarded =
    applications.filter(
      (application) =>
        application.status ===
        "FORWARDED_TO_EMPLOYER"
    ).length;

  const reviewing =
    applications.filter(
      (application) =>
        application.status ===
          "APPLIED" ||
        application.status ===
          "UNDER_REVIEW"
    ).length;

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
        {/* Background glow */}

        <div
          className="
            pointer-events-none
            absolute
            -left-32
            top-10
            h-[380px]
            w-[380px]
            rounded-full
            bg-[#38BDF8]/15
            blur-[110px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            bottom-10
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#0877E8]/12
            blur-[120px]
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            items-center
            gap-4
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
              shadow-[0_14px_35px_rgba(8,119,232,0.25)]
            "
          >
            <Activity
              size={24}
              className="
                animate-pulse
                text-white
              "
            />
          </div>

          <div className="text-center">
            <p
              className="
                text-base
                font-semibold
                text-[#173B63]
              "
            >
              Loading admin dashboard
            </p>

            <p
              className="
                mt-1
                text-sm
                text-[#7890A5]
              "
            >
              Preparing your Trailbliz workspace...
            </p>
          </div>
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
          PAGE BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-48
          top-20
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
          top-[420px]
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
          opacity-[0.20]
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
          py-5

          sm:px-6
          sm:py-7

          lg:px-8
        "
      >
        {/* ===================================================
            ADMIN HEADER
        =================================================== */}

        <AdminHeader
          onLogout={logout}
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
            shadow-[0_22px_60px_rgba(8,119,232,0.18)]

            sm:px-8
            sm:py-10

            lg:px-10
          "
        >
          {/* glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
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
              left-[35%]
              h-72
              w-72
              rounded-full
              bg-[#C9F0FF]/20
              blur-[90px]
            "
          />

          {/* subtle grid */}

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
            {/* left */}

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
                <ShieldCheck
                  size={14}
                  className="text-white"
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-white/80
                  "
                >
                  Trailbliz Administration
                </span>
              </div>

              <h1
                className="
                  mt-5
                  text-3xl
                  font-bold
                  tracking-[-0.04em]
                  text-white

                  sm:text-4xl

                  lg:text-5xl
                "
              >
                Admin Dashboard
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
                Manage opportunities, review student
                applications and keep the Trailbliz
                platform moving forward.
              </p>

              {adminEmail && (
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
                    backdrop-blur
                  "
                >
                  <div
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-[#BDF4D5]
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-medium
                      text-white/80
                    "
                  >
                    Signed in as {adminEmail}
                  </span>
                </div>
              )}
            </div>

            {/* right summary */}

            <div
              className="
                grid
                w-full
                grid-cols-2
                gap-3

                sm:max-w-md
              "
            >
              <div
                className="
                  rounded-[20px]
                  border
                  border-white/15
                  bg-white/10
                  p-4
                  backdrop-blur-xl
                "
              >
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-white/55
                  "
                >
                  Active opportunities
                </p>

                <p
                  className="
                    mt-2
                    text-3xl
                    font-bold
                    tracking-[-0.04em]
                    text-white
                  "
                >
                  {activeOpportunities}
                </p>
              </div>

              <div
                className="
                  rounded-[20px]
                  border
                  border-white/15
                  bg-white/10
                  p-4
                  backdrop-blur-xl
                "
              >
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-white/55
                  "
                >
                  Applications
                </p>

                <p
                  className="
                    mt-2
                    text-3xl
                    font-bold
                    tracking-[-0.04em]
                    text-white
                  "
                >
                  {applications.length}
                </p>
              </div>

              <div
                className="
                  col-span-2
                  flex
                  items-center
                  gap-3
                  rounded-[20px]
                  border
                  border-white/15
                  bg-white/10
                  px-4
                  py-3.5
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/15
                  "
                >
                  <Sparkles
                    size={17}
                    className="text-white"
                  />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-white
                    "
                  >
                    Platform overview
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      text-white/60
                    "
                  >
                    Live application and opportunity data
                  </p>
                </div>
              </div>
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
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-5
              py-4
              text-sm
              font-medium
              text-red-700
              shadow-[0_8px_24px_rgba(239,68,68,0.06)]
            "
          >
            {error}
          </div>
        )}

        {/* ===================================================
            DASHBOARD SECTIONS
        =================================================== */}

        <div className="mt-8 space-y-8">
          <DashboardStats
            totalOpportunities={
              opportunities.length
            }
            activeOpportunities={
              activeOpportunities
            }
            totalApplications={
              applications.length
            }
            shortlisted={shortlisted}
            selected={selected}
            rejected={rejected}
          />

          <ManagementCards
            activeOpportunities={
              activeOpportunities
            }
            totalApplications={
              applications.length
            }
          />

          <ApplicationPipeline
            reviewing={reviewing}
            shortlisted={shortlisted}
            resumeRequested={
              resumeRequested
            }
            forwarded={forwarded}
            selected={selected}
          />

          <QuickActions />

          <RecentApplications
            applications={applications}
          />

          <PlatformStatus />
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
            <span className="mx-2 text-[#C1D4E2]">
              •
            </span>
            Student Career & Opportunity Platform
          </p>
        </footer>
      </div>
    </main>
  );
}