import type {
  ApplicationStatus,
} from "@/types/application";

import {
  adminApplicationStatuses,
  formatAdminApplicationStatus,
} from "@/utils/adminApplicationUtils";

interface ApplicationFiltersProps {
  search: string;

  statusFilter:
    | ApplicationStatus
    | "ALL";

  onSearchChange: (
    value: string
  ) => void;

  onStatusFilterChange: (
    value:
      | ApplicationStatus
      | "ALL"
  ) => void;
}

export default function ApplicationFilters({
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}: ApplicationFiltersProps) {
  return (
    <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
          placeholder="Search student, email, college, company or opportunity..."
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500"
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            onStatusFilterChange(
              event.target.value as
                | ApplicationStatus
                | "ALL"
            )
          }
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
        >
          <option value="ALL">
            All statuses
          </option>

          {adminApplicationStatuses.map(
            (status) => (
              <option
                key={status}
                value={status}
              >
                {formatAdminApplicationStatus(
                  status
                )}
              </option>
            )
          )}
        </select>
      </div>
    </section>
  );
}