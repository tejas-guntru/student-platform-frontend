"use client";

import axios from "axios";
import { useEffect, useState } from "react";

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

      if (!token || role !== "ADMIN") {
        window.location.href = "/login";
        return;
      }

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
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">
          Loading admin dashboard...
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
        <AdminHeader
          onLogout={logout}
        />

        {error && (
          <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

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
    </main>
  );
}