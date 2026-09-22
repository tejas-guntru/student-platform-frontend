import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  FileSearch,
  GraduationCap,
  UserRound,
} from "lucide-react";

import type { AdminApplication } from "@/types/admin";

import StatusBadge from "@/components/admin/shared/StatusBadge";

interface RecentApplicationsProps {
  applications: AdminApplication[];
}

export default function RecentApplications({
  applications,
}: RecentApplicationsProps) {
  const recentApplications =
    applications.slice(0, 5);

  return (
    <section
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_10px_34px_rgba(8,119,232,0.05)]
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[#E3EEF6]
          bg-[#FBFDFF]
          px-6
          py-5

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-start gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <FileSearch size={18} />
          </div>

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
              Candidates
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
              Recent Applications
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-[#8095A8]
              "
            >
              Latest student applications across Trailbliz.
            </p>
          </div>
        </div>

        <Link
          href="/admin/applications"
          className="
            group
            inline-flex
            items-center
            gap-2
            self-start
            rounded-xl
            border
            border-[#D9EAF6]
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-[#0877E8]
            transition-all
            duration-200

            hover:border-[#B7DCF4]
            hover:bg-[#F2FAFF]
            hover:shadow-[0_8px_22px_rgba(8,119,232,0.07)]

            sm:self-auto
          "
        >
          View all

          <ArrowRight
            size={15}
            className="
              transition-transform
              duration-200
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {recentApplications.length === 0 ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            px-6
            py-14
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
              rounded-[20px]
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <FileSearch size={24} />
          </div>

          <h3
            className="
              mt-5
              text-lg
              font-bold
              text-[#173B63]
            "
          >
            No applications yet
          </h3>

          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-[#8095A8]
            "
          >
            Student applications will appear here once candidates
            begin applying to Trailbliz opportunities.
          </p>
        </div>
      ) : (
        <>
          {/* ===================================================
              DESKTOP TABLE
          =================================================== */}

          <div
            className="
              hidden
              overflow-x-auto

              md:block
            "
          >
            <table
              className="
                w-full
                min-w-[850px]
              "
            >
              <thead
                className="
                  bg-[#F7FBFF]
                "
              >
                <tr
                  className="
                    text-left
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-[#8197AA]
                  "
                >
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
                {recentApplications.map(
                  (application) => (
                    <tr
                      key={
                        application.applicationId
                      }
                      className="
                        border-t
                        border-[#E6F0F7]
                        transition-colors
                        duration-200

                        hover:bg-[#F8FCFF]
                      "
                    >
                      {/* STUDENT */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-gradient-to-br
                              from-[#E4F4FF]
                              to-[#C7E9FF]
                              text-[#0877E8]
                            "
                          >
                            <UserRound size={17} />
                          </div>

                          <div>
                            <p
                              className="
                                text-sm
                                font-semibold
                                text-[#173B63]
                              "
                            >
                              {application.studentName ||
                                "Student"}
                            </p>

                            <p
                              className="
                                mt-1
                                max-w-[210px]
                                truncate
                                text-xs
                                text-[#899EAF]
                              "
                            >
                              {application.studentEmail ||
                                "-"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* OPPORTUNITY */}

                      <td className="px-6 py-4">
                        <p
                          className="
                            max-w-[240px]
                            truncate
                            text-sm
                            font-semibold
                            text-[#456985]
                          "
                        >
                          {
                            application.opportunityTitle
                          }
                        </p>

                        <p
                          className="
                            mt-1
                            max-w-[240px]
                            truncate
                            text-xs
                            text-[#91A4B4]
                          "
                        >
                          {application.companyName}
                        </p>
                      </td>

                      {/* YEAR */}

                      <td className="px-6 py-4">
                        <div
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-[#DDEBF5]
                            bg-[#F8FCFF]
                            px-3
                            py-2
                          "
                        >
                          <GraduationCap
                            size={14}
                            className="text-[#0877E8]"
                          />

                          <span
                            className="
                              text-xs
                              font-semibold
                              text-[#58768E]
                            "
                          >
                            {application.graduationYear ||
                              "-"}
                          </span>
                        </div>
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

                      <td className="px-6 py-4">
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-[#6F879A]
                          "
                        >
                          <CalendarDays
                            size={14}
                            className="text-[#9AB1C3]"
                          />

                          {formatDate(
                            application.appliedAt
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* ===================================================
              MOBILE CARDS
          =================================================== */}

          <div
            className="
              divide-y
              divide-[#E6F0F7]

              md:hidden
            "
          >
            {recentApplications.map(
              (application) => (
                <article
                  key={
                    application.applicationId
                  }
                  className="
                    p-5
                    transition-colors
                    hover:bg-[#F8FCFF]
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#EAF6FF]
                          text-[#0877E8]
                        "
                      >
                        <UserRound size={17} />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            text-sm
                            font-semibold
                            text-[#173B63]
                          "
                        >
                          {application.studentName ||
                            "Student"}
                        </p>

                        <p
                          className="
                            mt-1
                            truncate
                            text-xs
                            text-[#899EAF]
                          "
                        >
                          {application.studentEmail ||
                            "-"}
                        </p>
                      </div>
                    </div>

                    <StatusBadge
                      status={application.status}
                    />
                  </div>

                  <div
                    className="
                      mt-4
                      rounded-2xl
                      border
                      border-[#E2EDF6]
                      bg-[#F8FCFF]
                      p-4
                    "
                  >
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-[#456985]
                      "
                    >
                      {application.opportunityTitle}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#91A4B4]
                      "
                    >
                      {application.companyName}
                    </p>
                  </div>

                  <div
                    className="
                      mt-4
                      flex
                      flex-wrap
                      items-center
                      justify-between
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-[#70889B]
                      "
                    >
                      <GraduationCap
                        size={14}
                        className="text-[#0877E8]"
                      />

                      {application.graduationYear ||
                        "-"}
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-[#70889B]
                      "
                    >
                      <CalendarDays
                        size={14}
                        className="text-[#0877E8]"
                      />

                      {formatDate(
                        application.appliedAt
                      )}
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        </>
      )}

      {/* =====================================================
          FOOTER
      ===================================================== */}

      {recentApplications.length > 0 && (
        <div
          className="
            border-t
            border-[#E4EFF7]
            bg-[#FBFDFF]
            px-6
            py-3.5
          "
        >
          <p
            className="
              text-xs
              text-[#8B9FAF]
            "
          >
            Showing latest{" "}
            <span
              className="
                font-semibold
                text-[#58758D]
              "
            >
              {recentApplications.length}
            </span>{" "}
            application
            {recentApplications.length === 1
              ? ""
              : "s"}
          </p>
        </div>
      )}
    </section>
  );
}

function formatDate(value: string) {
  if (!value) {
    return "-";
  }

  return new Date(
    value
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}