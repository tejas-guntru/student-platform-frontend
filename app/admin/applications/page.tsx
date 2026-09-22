"use client";

import axios from "axios";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  CheckCircle2,
  FileSearch,
  LoaderCircle,
  Send,
  Trophy,
  UsersRound,
} from "lucide-react";

import {
  downloadApplicationResume,
  getAdminApplications,
  updateApplicationStatus,
} from "@/services/adminService";

import type {
  AdminApplication,
} from "@/types/admin";

import type {
  ApplicationStatus,
} from "@/types/application";

import {
  formatAdminApplicationStatus,
} from "@/utils/adminApplicationUtils";

import ApplicationsHeader from "@/components/admin/applications/ApplicationsHeader";
import ApplicationsSummary from "@/components/admin/applications/ApplicationsSummary";
import ApplicationFilters from "@/components/admin/applications/ApplicationFilters";
import ApplicationsList from "@/components/admin/applications/ApplicationsList";

export default function AdminApplicationsPage() {
  // =========================================================
  // STATE
  // =========================================================

  const [
    applications,
    setApplications,
  ] = useState<AdminApplication[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    updatingId,
    setUpdatingId,
  ] = useState<string | null>(null);

  const [
    downloadingId,
    setDownloadingId,
  ] = useState<string | null>(null);

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<
    ApplicationStatus | "ALL"
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
  // LOAD
  // =========================================================

  useEffect(() => {
    const loadPage = async () => {
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

      await loadApplications();
    };

    loadPage();
  }, []);

  // =========================================================
  // LOAD APPLICATIONS
  // =========================================================

  const loadApplications =
    async () => {
      setError("");

      try {
        const response =
          await getAdminApplications();

        setApplications(
          Array.isArray(response)
            ? response
            : []
        );
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          "Unable to load applications."
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================================================
  // ERROR HANDLING
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
  // UPDATE STATUS
  // =========================================================

  const handleStatusUpdate =
    async (
      application:
        AdminApplication,

      newStatus:
        ApplicationStatus
    ) => {
      if (
        application.status ===
        newStatus
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          `Change ${application.studentName}'s application from ${formatAdminApplicationStatus(
            application.status
          )} to ${formatAdminApplicationStatus(
            newStatus
          )}?`
        );

      if (!confirmed) {
        return;
      }

      setError("");
      setSuccess("");

      setUpdatingId(
        application.applicationId
      );

      try {
        const updated =
          await updateApplicationStatus(
            application.applicationId,
            newStatus
          );

        setApplications(
          (current) =>
            current.map(
              (item) =>
                item.applicationId ===
                application.applicationId
                  ? {
                      ...item,
                      ...updated,
                    }
                  : item
            )
        );

        setSuccess(
          `${application.studentName}'s status changed to ${formatAdminApplicationStatus(
            newStatus
          )}.`
        );
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          "Unable to update application status."
        );
      } finally {
        setUpdatingId(
          null
        );
      }
    };

  // =========================================================
  // DOWNLOAD RESUME
  // =========================================================

  const handleResumeDownload =
    async (
      application:
        AdminApplication
    ) => {
      setError("");
      setSuccess("");

      setDownloadingId(
        application.applicationId
      );

      try {
        const blob =
          await downloadApplicationResume(
            application.applicationId
          );

        const url =
          window.URL.createObjectURL(
            blob
          );

        const anchor =
          document.createElement(
            "a"
          );

        anchor.href = url;

        const safeName =
          (
            application.studentName ||
            "student"
          ).replace(
            /[^a-zA-Z0-9-_]/g,
            "_"
          );

        anchor.download =
          `${safeName}_resume.pdf`;

        document.body.appendChild(
          anchor
        );

        anchor.click();

        anchor.remove();

        window.URL.revokeObjectURL(
          url
        );

        setSuccess(
          `Resume downloaded for ${application.studentName}.`
        );
      } catch (
        error: unknown
      ) {
        if (
          axios.isAxiosError(
            error
          ) &&
          error.response
            ?.status === 404
        ) {
          setError(
            "Resume has not been submitted for this application."
          );

          return;
        }

        handleError(
          error,
          "Unable to download resume."
        );
      } finally {
        setDownloadingId(
          null
        );
      }
    };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredApplications =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return applications.filter(
        (application) => {
          const matchesStatus =
            statusFilter ===
              "ALL" ||
            application.status ===
              statusFilter;

          const searchable = [
            application.studentName,
            application.studentEmail,
            application.collegeName,
            application.opportunityTitle,
            application.companyName,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesSearch =
            !normalizedSearch ||
            searchable.includes(
              normalizedSearch
            );

          return (
            matchesStatus &&
            matchesSearch
          );
        }
      );
    }, [
      applications,
      search,
      statusFilter,
    ]);

  // =========================================================
  // STATUS COUNT
  // =========================================================

  const countStatus = (
    status: ApplicationStatus
  ) => {
    return applications.filter(
      (application) =>
        application.status ===
        status
    ).length;
  };

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
            Loading applications
          </p>

          <p
            className="
              mt-1
              text-sm
              text-[#8095A8]
            "
          >
            Preparing candidate management...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // HERO COUNTS
  // =========================================================

  const reviewing =
    countStatus("APPLIED") +
    countStatus("UNDER_REVIEW");

  const shortlisted =
    countStatus("SHORTLISTED");

  const forwarded =
    countStatus(
      "FORWARDED_TO_EMPLOYER"
    );

  const selected =
    countStatus("SELECTED");

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

        <ApplicationsHeader />

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
                <UsersRound
                  size={14}
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
                  Candidate Management
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
                Applications
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
                Review student applications, move
                candidates through the hiring workflow
                and manage submitted resumes.
              </p>
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
                icon={FileSearch}
                label="Reviewing"
                value={reviewing}
              />

              <HeroMetric
                icon={UsersRound}
                label="Shortlisted"
                value={shortlisted}
              />

              <HeroMetric
                icon={Send}
                label="Forwarded"
                value={forwarded}
              />

              <HeroMetric
                icon={Trophy}
                label="Selected"
                value={selected}
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
          <ApplicationsSummary
            total={
              applications.length
            }
            applied={
              countStatus(
                "APPLIED"
              )
            }
            underReview={
              countStatus(
                "UNDER_REVIEW"
              )
            }
            shortlisted={
              countStatus(
                "SHORTLISTED"
              )
            }
            resumeRequested={
              countStatus(
                "RESUME_REQUESTED"
              )
            }
            resumeSubmitted={
              countStatus(
                "RESUME_SUBMITTED"
              )
            }
            forwarded={
              countStatus(
                "FORWARDED_TO_EMPLOYER"
              )
            }
            selected={
              countStatus(
                "SELECTED"
              )
            }
          />
        </div>

        {/* ===================================================
            FILTERS
        =================================================== */}

        <div className="mt-8">
          <ApplicationFilters
            search={
              search
            }
            statusFilter={
              statusFilter
            }
            onSearchChange={
              setSearch
            }
            onStatusFilterChange={
              setStatusFilter
            }
          />
        </div>

        {/* ===================================================
            RESULT COUNT
        =================================================== */}

        <div
          className="
            mt-5
            flex
            flex-col
            gap-2

            sm:flex-row
            sm:items-center
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
              Candidate Records
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
              Application Results
            </h2>
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
            "
          >
            {filteredApplications.length}{" "}
            {filteredApplications.length === 1
              ? "application"
              : "applications"}
          </div>
        </div>

        {/* ===================================================
            APPLICATIONS
        =================================================== */}

        <div className="mt-5">
          <ApplicationsList
            applications={
              filteredApplications
            }
            updatingId={
              updatingId
            }
            downloadingId={
              downloadingId
            }
            onStatusChange={
              handleStatusUpdate
            }
            onDownloadResume={
              handleResumeDownload
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
            Candidate Management
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
  icon: React.ElementType;
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