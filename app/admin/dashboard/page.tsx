"use client";

import axios from "axios";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  getAdminApplications,
  getAdminOpportunities,
} from "@/services/adminService";

import type {
  Opportunity,
} from "@/types/opportunity";

import type {
  AdminApplication,
} from "@/types/admin";


export default function AdminDashboardPage() {

  const [
    opportunities,
    setOpportunities,
  ] = useState<Opportunity[]>([]);

  const [
    applications,
    setApplications,
  ] = useState<AdminApplication[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  // =========================================================
  // LOAD ADMIN DASHBOARD
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


        if (
          !token ||
          role !== "ADMIN"
        ) {

          window.location.href =
            "/login";

          return;
        }


        try {

          const [
            opportunityData,
            applicationData,
          ] =
            await Promise.all([
              getAdminOpportunities(),
              getAdminApplications(),
            ]);


          setOpportunities(
            Array.isArray(
              opportunityData
            )
              ? opportunityData
              : []
          );


          setApplications(
            Array.isArray(
              applicationData
            )
              ? applicationData
              : []
          );

        } catch (
          error: unknown
        ) {

          console.error(
            "ADMIN DASHBOARD ERROR:",
            error
          );


          if (
            axios.isAxiosError(
              error
            )
          ) {

            if (
              error.response?.status ===
                401 ||
              error.response?.status ===
                403
            ) {

              localStorage.clear();

              window.location.href =
                "/login";

              return;
            }


            setError(
              error.response
                ?.data?.message ||
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

    window.location.href =
      "/login";
  };


  // =========================================================
  // COUNTS
  // =========================================================

  const activeOpportunities =
    opportunities.filter(
      (opportunity) =>
        opportunity.status ===
        "ACTIVE"
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


        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              ADMIN PANEL
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Manage opportunities,
              candidates, coding verification
              and application progress.
            </p>

          </div>


          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:bg-zinc-900"
          >
            Logout
          </button>

        </header>


        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (

          <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-300">

            {error}

          </div>

        )}


        {/* ===================================================
            MAIN STATISTICS
        =================================================== */}

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          <StatCard
            label="Opportunities"
            value={
              opportunities.length
            }
          />

          <StatCard
            label="Active"
            value={
              activeOpportunities
            }
          />

          <StatCard
            label="Applications"
            value={
              applications.length
            }
          />

          <StatCard
            label="Shortlisted"
            value={
              shortlisted
            }
          />

          <StatCard
            label="Selected"
            value={
              selected
            }
          />

          <StatCard
            label="Rejected"
            value={
              rejected
            }
          />

        </section>


        {/* ===================================================
            ADMIN MANAGEMENT CARDS
        =================================================== */}

        <section className="mt-8 grid gap-6 lg:grid-cols-3">


          {/* OPPORTUNITIES */}

          <Link
            href="/admin/opportunities"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-7 transition hover:border-zinc-700 hover:bg-zinc-900/80"
          >

            <p className="text-sm text-zinc-500">
              Opportunity Management
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Jobs & Internships
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Create new opportunities,
              edit listings and close
              applications when required.
            </p>


            <div className="mt-7 flex items-center justify-between">

              <div>

                <p className="text-xs text-zinc-500">
                  Active listings
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {
                    activeOpportunities
                  }
                </p>

              </div>


              <span className="text-sm font-semibold transition group-hover:translate-x-1">
                Manage →
              </span>

            </div>

          </Link>


          {/* APPLICATIONS */}

          <Link
            href="/admin/applications"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-7 transition hover:border-zinc-700 hover:bg-zinc-900/80"
          >

            <p className="text-sm text-zinc-500">
              Candidate Management
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Applications
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Review candidates,
              shortlist students,
              request resumes and
              update final decisions.
            </p>


            <div className="mt-7 flex items-center justify-between">

              <div>

                <p className="text-xs text-zinc-500">
                  Total applications
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {
                    applications.length
                  }
                </p>

              </div>


              <span className="text-sm font-semibold transition group-hover:translate-x-1">
                Review →
              </span>

            </div>

          </Link>


          {/* CODING VERIFICATION */}

          <Link
            href="/admin/coding-verification"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-7 transition hover:border-zinc-700 hover:bg-zinc-900/80"
          >

            <p className="text-sm text-zinc-500">
              Coding Profiles
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Verification
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Verify student Codeforces,
              LeetCode and CodeChef
              accounts before including
              them in rankings.
            </p>


            <div className="mt-7 flex items-center justify-between">

              <div>

                <p className="text-xs text-zinc-500">
                  Rankings
                </p>

                <p className="mt-1 text-sm font-semibold text-zinc-300">
                  Verify & rebuild
                </p>

              </div>


              <span className="text-sm font-semibold transition group-hover:translate-x-1">
                Verify Profiles →
              </span>

            </div>

          </Link>

        </section>


        {/* ===================================================
            APPLICATION PIPELINE
        =================================================== */}

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-7">

          <div>

            <p className="text-sm text-zinc-500">
              Candidate Pipeline
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Current Application Status
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Overview of candidates across
              the hiring workflow.
            </p>

          </div>


          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            <PipelineCard
              label="New / Reviewing"
              value={
                reviewing
              }
            />


            <PipelineCard
              label="Shortlisted"
              value={
                shortlisted
              }
            />


            <PipelineCard
              label="Resume Stage"
              value={
                resumeRequested
              }
            />


            <PipelineCard
              label="Forwarded"
              value={
                forwarded
              }
            />


            <PipelineCard
              label="Selected"
              value={
                selected
              }
            />

          </div>

        </section>


        {/* ===================================================
            QUICK ACTIONS
        =================================================== */}

        <section className="mt-8">

          <div>

            <p className="text-sm text-zinc-500">
              Quick Actions
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Administration
            </h2>

          </div>


          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <QuickAction
              href="/admin/opportunities"
              title="Create Opportunity"
              description="Add a new internship or job listing."
            />

            <QuickAction
              href="/admin/applications"
              title="Review Applications"
              description="Process student applications and resumes."
            />

            <QuickAction
              href="/admin/coding-verification"
              title="Verify Coding Profiles"
              description="Approve coding accounts and rebuild rankings."
            />

          </div>

        </section>


        {/* ===================================================
            RECENT APPLICATIONS
        =================================================== */}

        <section className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

          <div className="flex flex-col gap-3 border-b border-zinc-800 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Candidates
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Recent Applications
              </h2>

            </div>


            <Link
              href="/admin/applications"
              className="text-sm font-medium text-zinc-300 hover:text-white"
            >
              View all →
            </Link>

          </div>


          {applications.length ===
          0 ? (

            <div className="p-10 text-center">

              <p className="text-zinc-400">
                No applications yet.
              </p>

              <p className="mt-2 text-sm text-zinc-600">
                Student applications will
                appear here.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px]">

                <thead className="bg-zinc-950/60">

                  <tr className="text-left text-xs uppercase tracking-wider text-zinc-500">

                    <th className="px-6 py-4">
                      Student
                    </th>

                    <th className="px-6 py-4">
                      Opportunity
                    </th>

                    <th className="px-6 py-4">
                      Year
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Applied
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {applications
                    .slice(
                      0,
                      5
                    )
                    .map(
                      (
                        application
                      ) => (

                        <tr
                          key={
                            application.applicationId
                          }
                          className="border-t border-zinc-800 transition hover:bg-zinc-800/30"
                        >

                          {/* STUDENT */}

                          <td className="px-6 py-4">

                            <p className="font-medium">
                              {
                                application.studentName ||
                                "Student"
                              }
                            </p>

                            <p className="mt-1 text-xs text-zinc-500">
                              {
                                application.studentEmail ||
                                "-"
                              }
                            </p>

                          </td>


                          {/* OPPORTUNITY */}

                          <td className="px-6 py-4">

                            <p className="text-sm font-medium">
                              {
                                application.opportunityTitle
                              }
                            </p>

                            <p className="mt-1 text-xs text-zinc-500">
                              {
                                application.companyName
                              }
                            </p>

                          </td>


                          {/* YEAR */}

                          <td className="px-6 py-4 text-sm text-zinc-400">

                            {
                              application.graduationYear ||
                              "-"
                            }

                          </td>


                          {/* STATUS */}

                          <td className="px-6 py-4">

                            <StatusBadge
                              status={
                                application.status
                              }
                            />

                          </td>


                          {/* DATE */}

                          <td className="px-6 py-4 text-sm text-zinc-400">

                            {
                              formatDate(
                                application.appliedAt
                              )
                            }

                          </td>

                        </tr>

                      )
                    )}

                </tbody>

              </table>

            </div>
          )}

        </section>


        {/* ===================================================
            FOOTER STATUS
        =================================================== */}

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Platform Status
              </p>

              <p className="mt-1 font-semibold">
                Admin tools are connected
                to the backend.
              </p>

            </div>


            <div className="flex flex-wrap gap-2 text-xs">

              <StatusPill>
                Opportunities
              </StatusPill>

              <StatusPill>
                Applications
              </StatusPill>

              <StatusPill>
                Coding Verification
              </StatusPill>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}


// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}


// =========================================================
// PIPELINE CARD
// =========================================================

function PipelineCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}


// =========================================================
// QUICK ACTION
// =========================================================

function QuickAction({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {

  return (
    <Link
      href={href}
      className="group rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700"
    >

      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>

      <p className="mt-4 text-sm font-medium text-zinc-300 transition group-hover:text-white">
        Open →
      </p>

    </Link>
  );
}


// =========================================================
// STATUS PILL
// =========================================================

function StatusPill({
  children,
}: {
  children:
    React.ReactNode;
}) {

  return (
    <span className="rounded-full border border-emerald-900 bg-emerald-950/30 px-3 py-1 font-medium text-emerald-400">

      ✓ {children}

    </span>
  );
}


// =========================================================
// STATUS BADGE
// =========================================================

function StatusBadge({
  status,
}: {
  status:
    AdminApplication["status"];
}) {

  let style =
    "border-zinc-700 bg-zinc-950 text-zinc-300";


  if (
    status === "SELECTED"
  ) {

    style =
      "border-emerald-900 bg-emerald-950/40 text-emerald-400";

  } else if (
    status === "REJECTED"
  ) {

    style =
      "border-red-900 bg-red-950/40 text-red-400";

  } else if (
    status === "RESUME_REQUESTED"
  ) {

    style =
      "border-amber-900 bg-amber-950/40 text-amber-400";

  } else if (
    status === "RESUME_SUBMITTED"
  ) {

    style =
      "border-blue-900 bg-blue-950/40 text-blue-400";

  } else if (
    status === "FORWARDED_TO_EMPLOYER"
  ) {

    style =
      "border-purple-900 bg-purple-950/40 text-purple-400";

  } else if (
    status === "SHORTLISTED"
  ) {

    style =
      "border-cyan-900 bg-cyan-950/40 text-cyan-400";
  }


  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${style}`}
    >
      {
        formatStatus(
          status
        )
      }
    </span>
  );
}


// =========================================================
// FORMAT STATUS
// =========================================================

function formatStatus(
  status: string
) {

  return status
    .split("_")
    .map(
      (word) =>
        word.charAt(0) +
        word
          .slice(1)
          .toLowerCase()
    )
    .join(" ");
}


// =========================================================
// FORMAT DATE
// =========================================================

function formatDate(
  value: string
) {

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
}