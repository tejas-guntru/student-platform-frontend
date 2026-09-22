import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CalendarDays,
  Download,
  GraduationCap,
  LoaderCircle,
  Mail,
  School,
  UserRound,
} from "lucide-react";

import type {
  AdminApplication,
} from "@/types/admin";

import type {
  ApplicationStatus,
} from "@/types/application";

import StatusBadge from "@/components/admin/shared/StatusBadge";
import ApplicationProgress from "./ApplicationProgress";

import {
  canDownloadResume,
  formatAdminApplicationDate,
  getActionLabel,
  getAllowedNextStatuses,
} from "@/utils/adminApplicationUtils";

interface ApplicationCardProps {
  application: AdminApplication;

  updating: boolean;

  downloading: boolean;

  onStatusChange: (
    application: AdminApplication,
    status: ApplicationStatus
  ) => void;

  onDownloadResume: (
    application: AdminApplication
  ) => void;
}

export default function ApplicationCard({
  application,
  updating,
  downloading,
  onStatusChange,
  onDownloadResume,
}: ApplicationCardProps) {
  const nextStatuses =
    getAllowedNextStatuses(
      application.status
    );

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_10px_34px_rgba(8,119,232,0.05)]
        transition-all
        duration-300

        hover:border-[#B7DCF4]
        hover:shadow-[0_20px_46px_rgba(8,119,232,0.09)]
      "
    >
      {/* =====================================================
          TOP ACCENT
      ===================================================== */}

      <div
        className="
          h-[3px]
          w-full
          bg-gradient-to-r
          from-[#0877E8]
          via-[#1294F2]
          to-[#38BDF8]
        "
      />

      <div
        className="
          p-5

          sm:p-7
        "
      >
        {/* ===================================================
            CANDIDATE HEADER
        =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-6

            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          {/* CANDIDATE */}

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <div
              className="
                flex
                items-start
                gap-4
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#E5F5FF]
                  to-[#CBEAFF]
                  text-[#0877E8]
                "
              >
                <UserRound size={21} />
              </div>

              <div className="min-w-0">
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  "
                >
                  <h2
                    className="
                      text-xl
                      font-bold
                      tracking-[-0.03em]
                      text-[#173B63]

                      sm:text-2xl
                    "
                  >
                    {application.studentName ||
                      "Student"}
                  </h2>

                  <StatusBadge
                    status={
                      application.status
                    }
                  />
                </div>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-[#71899D]
                  "
                >
                  <Mail
                    size={14}
                    className="text-[#8CBBD8]"
                  />

                  <span
                    className="
                      truncate
                    "
                  >
                    {application.studentEmail ||
                      "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                STUDENT DETAILS
            ================================================= */}

            <div
              className="
                mt-5
                grid
                gap-3

                sm:grid-cols-3
              "
            >
              <InfoItem
                icon={School}
                label="College"
                value={
                  application.collegeName ||
                  "-"
                }
              />

              <InfoItem
                icon={GraduationCap}
                label="Graduation"
                value={
                  application.graduationYear
                    ? String(
                        application.graduationYear
                      )
                    : "-"
                }
              />

              <InfoItem
                icon={CalendarDays}
                label="Applied"
                value={
                  formatAdminApplicationDate(
                    application.appliedAt
                  )
                }
              />
            </div>
          </div>

          {/* =================================================
              OPPORTUNITY
          ================================================= */}

          <div
            className="
              w-full
              rounded-[22px]
              border
              border-[#DDEAF4]
              bg-[#F8FCFF]
              p-5

              lg:max-w-[340px]
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
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
                  bg-[#EAF6FF]
                  text-[#0877E8]
                "
              >
                <Building2 size={15} />
              </div>

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[#8BA0B1]
                "
              >
                Applied For
              </p>
            </div>

            <p
              className="
                mt-4
                text-base
                font-bold
                leading-6
                text-[#274E70]
              "
            >
              {
                application.opportunityTitle
              }
            </p>

            <p
              className="
                mt-1.5
                text-sm
                font-medium
                text-[#70899C]
              "
            >
              {application.companyName}
            </p>
          </div>
        </div>

        {/* ===================================================
            APPLICATION PROGRESS
        =================================================== */}

        <div
          className="
            mt-7
            border-t
            border-[#E5EFF7]
            pt-6
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#0877E8]
              "
            >
              Hiring Workflow
            </p>

            <h3
              className="
                mt-1
                text-base
                font-bold
                text-[#274E70]
              "
            >
              Application Progress
            </h3>
          </div>

          <ApplicationProgress
            status={application.status}
          />
        </div>

        {/* ===================================================
            ADMIN ACTIONS
        =================================================== */}

        <div
          className="
            mt-7
            rounded-[22px]
            border
            border-[#DFEBF4]
            bg-[#F9FCFF]
            p-5
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5

              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-bold
                  text-[#274E70]
                "
              >
                Admin Actions
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-[#8398A9]
                "
              >
                Review the candidate and move this
                application through the next stage.
              </p>
            </div>

            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >
              {/* =============================================
                  VIEW CANDIDATE
              ============================================= */}

              <Link
                href={`/admin/candidates/${application.studentId}`}
                className="
                  group/link
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#C9E1F2]
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-[#0877E8]
                  transition-all
                  duration-200

                  hover:border-[#A8D1EC]
                  hover:bg-[#EFF8FF]
                  hover:shadow-[0_8px_20px_rgba(8,119,232,0.07)]
                "
              >
                <UserRound size={15} />

                View Candidate

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    duration-200
                    group-hover/link:translate-x-0.5
                  "
                />
              </Link>

              {/* =============================================
                  DOWNLOAD RESUME
              ============================================= */}

              {canDownloadResume(
                application.status
              ) && (
                <button
                  type="button"
                  disabled={downloading}
                  onClick={() =>
                    onDownloadResume(
                      application
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#D4E5F1]
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-[#56748C]
                    transition-all
                    duration-200

                    hover:border-[#B6D8EE]
                    hover:bg-[#F4FAFF]
                    hover:text-[#0877E8]

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {downloading ? (
                    <>
                      <LoaderCircle
                        size={15}
                        className="animate-spin"
                      />

                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={15} />

                      Download Resume
                    </>
                  )}
                </button>
              )}

              {/* =============================================
                  STATUS ACTIONS
              ============================================= */}

              {nextStatuses.map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    disabled={updating}
                    onClick={() =>
                      onStatusChange(
                        application,
                        status
                      )
                    }
                    className={
                      getStatusActionClass(
                        status
                      )
                    }
                  >
                    {updating ? (
                      <>
                        <LoaderCircle
                          size={15}
                          className="animate-spin"
                        />

                        Updating...
                      </>
                    ) : (
                      <>
                        {getActionLabel(
                          status
                        )}

                        <ArrowRight
                          size={14}
                        />
                      </>
                    )}
                  </button>
                )
              )}

              {/* =============================================
                  TERMINAL STATUS
              ============================================= */}

              {nextStatuses.length ===
                0 && (
                <span
                  className="
                    inline-flex
                    items-center
                    rounded-xl
                    border
                    border-[#DEE9F1]
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-[#8296A6]
                  "
                >
                  No further actions
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// =========================================================
// INFO ITEM
// =========================================================

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-[16px]
        border
        border-[#E1ECF5]
        bg-[#FBFDFF]
        p-3.5
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <Icon
          size={14}
          className="text-[#87B8D6]"
        />

        <span
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-[#93A6B5]
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-2
          truncate
          text-xs
          font-semibold
          text-[#52718A]
        "
      >
        {value}
      </p>
    </div>
  );
}

// =========================================================
// STATUS ACTION STYLES
// =========================================================

function getStatusActionClass(
  status: ApplicationStatus
) {
  const base = `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    px-4
    py-2.5
    text-sm
    font-semibold
    transition-all
    duration-200

    disabled:cursor-not-allowed
    disabled:opacity-50
  `;

  if (status === "SELECTED") {
    return `
      ${base}
      border-emerald-200
      bg-emerald-50
      text-emerald-700

      hover:border-emerald-300
      hover:bg-emerald-100
    `;
  }

  if (status === "REJECTED") {
    return `
      ${base}
      border-red-200
      bg-red-50
      text-red-600

      hover:border-red-300
      hover:bg-red-100
    `;
  }

  if (
    status ===
    "RESUME_REQUESTED"
  ) {
    return `
      ${base}
      border-amber-200
      bg-amber-50
      text-amber-700

      hover:border-amber-300
      hover:bg-amber-100
    `;
  }

  if (
    status ===
    "FORWARDED_TO_EMPLOYER"
  ) {
    return `
      ${base}
      border-violet-200
      bg-violet-50
      text-violet-700

      hover:border-violet-300
      hover:bg-violet-100
    `;
  }

  if (
    status === "SHORTLISTED"
  ) {
    return `
      ${base}
      border-cyan-200
      bg-cyan-50
      text-cyan-700

      hover:border-cyan-300
      hover:bg-cyan-100
    `;
  }

  return `
    ${base}
    border-[#BFDFF4]
    bg-[#EEF8FF]
    text-[#0877E8]

    hover:border-[#9DCFEF]
    hover:bg-[#E4F5FF]
  `;
}