import {
  Filter,
  Search,
  X,
} from "lucide-react";

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
  const filtersActive =
    Boolean(search.trim()) ||
    statusFilter !== "ALL";

  const clearFilters = () => {
    onSearchChange("");
    onStatusFilterChange("ALL");
  };

  return (
    <section
      className="
        overflow-hidden
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_10px_30px_rgba(8,119,232,0.045)]
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          border-b
          border-[#E5EFF7]
          bg-[#FBFDFF]
          px-5
          py-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <Filter size={16} />
          </div>

          <div>
            <p
              className="
                text-sm
                font-bold
                text-[#173B63]
              "
            >
              Filter Applications
            </p>

            <p
              className="
                mt-0.5
                text-xs
                text-[#8499AA]
              "
            >
              Search candidates and narrow results by status.
            </p>
          </div>
        </div>

        {filtersActive && (
          <button
            type="button"
            onClick={clearFilters}
            className="
              inline-flex
              w-fit
              items-center
              gap-1.5
              rounded-lg
              px-3
              py-2
              text-xs
              font-semibold
              text-[#607B91]
              transition

              hover:bg-red-50
              hover:text-red-600
            "
          >
            <X size={14} />

            Clear filters
          </button>
        )}
      </div>

      {/* =====================================================
          FILTER CONTROLS
      ===================================================== */}

      <div
        className="
          grid
          gap-4
          p-5

          lg:grid-cols-[1fr_280px]
        "
      >
        {/* SEARCH */}

        <div>
          <label
            htmlFor="application-search"
            className="
              mb-2
              block
              text-[10px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-[#8095A7]
            "
          >
            Search
          </label>

          <div className="relative">
            <Search
              size={17}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#8CB8D4]
              "
            />

            <input
              id="application-search"
              type="text"
              value={search}
              onChange={(event) =>
                onSearchChange(
                  event.target.value
                )
              }
              placeholder="Search student, email, college, company or opportunity..."
              className="
                w-full
                rounded-xl
                border
                border-[#D6E7F3]
                bg-[#F9FCFF]
                py-3
                pl-11
                pr-10
                text-sm
                text-[#173B63]
                outline-none
                transition-all
                duration-200

                placeholder:text-[#9BADBC]

                hover:border-[#BDDDF2]

                focus:border-[#1689F5]
                focus:bg-white
                focus:ring-4
                focus:ring-[#1689F5]/10
              "
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  onSearchChange("")
                }
                aria-label="Clear search"
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  h-7
                  w-7
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-lg
                  text-[#8DA2B3]
                  transition

                  hover:bg-[#EAF6FF]
                  hover:text-[#0877E8]
                "
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* STATUS */}

        <div>
          <label
            htmlFor="application-status"
            className="
              mb-2
              block
              text-[10px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-[#8095A7]
            "
          >
            Application Status
          </label>

          <select
            id="application-status"
            value={statusFilter}
            onChange={(event) =>
              onStatusFilterChange(
                event.target.value as
                  | ApplicationStatus
                  | "ALL"
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-[#D6E7F3]
              bg-[#F9FCFF]
              px-4
              py-3
              text-sm
              font-semibold
              text-[#496B84]
              outline-none
              transition-all
              duration-200

              hover:border-[#BDDDF2]

              focus:border-[#1689F5]
              focus:bg-white
              focus:ring-4
              focus:ring-[#1689F5]/10
            "
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
      </div>

      {/* =====================================================
          ACTIVE FILTER
      ===================================================== */}

      {filtersActive && (
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
            border-t
            border-[#E7F0F7]
            bg-[#F8FCFF]
            px-5
            py-3
          "
        >
          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#8A9FAF]
            "
          >
            Active filters
          </span>

          {search.trim() && (
            <span
              className="
                rounded-full
                border
                border-[#CFE4F3]
                bg-white
                px-3
                py-1
                text-[10px]
                font-semibold
                text-[#52718A]
              "
            >
              Search: {search.trim()}
            </span>
          )}

          {statusFilter !== "ALL" && (
            <span
              className="
                rounded-full
                border
                border-[#CBE5F8]
                bg-[#EFF8FF]
                px-3
                py-1
                text-[10px]
                font-semibold
                text-[#0877E8]
              "
            >
              Status:{" "}
              {formatAdminApplicationStatus(
                statusFilter
              )}
            </span>
          )}
        </div>
      )}
    </section>
  );
}