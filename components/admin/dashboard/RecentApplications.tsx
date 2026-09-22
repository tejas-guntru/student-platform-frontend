import Link from "next/link";

import type { AdminApplication } from "@/types/admin";

import StatusBadge from "@/components/admin/shared/StatusBadge";

interface RecentApplicationsProps {
  applications: AdminApplication[];
}

export default function RecentApplications({
  applications,
}: RecentApplicationsProps) {
  return (
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

      {applications.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-zinc-400">
            No applications yet.
          </p>

          <p className="mt-2 text-sm text-zinc-600">
            Student applications will appear here.
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
                .slice(0, 5)
                .map((application) => (
                  <tr
                    key={application.applicationId}
                    className="border-t border-zinc-800 transition hover:bg-zinc-800/30"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium">
                        {application.studentName ||
                          "Student"}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        {application.studentEmail ||
                          "-"}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">
                        {application.opportunityTitle}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        {application.companyName}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {application.graduationYear ||
                        "-"}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge
                        status={application.status}
                      />
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {formatDate(
                        application.appliedAt
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function formatDate(value: string) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}