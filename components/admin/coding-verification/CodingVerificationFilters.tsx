import {
  Filter,
  Search,
  X,
} from "lucide-react";

import type {
  AdminCodingPlatform,
} from "@/types/adminCodingProfile";

import type {
  CodingVerificationFilter,
} from "@/utils/adminCodingProfileUtils";

interface CodingVerificationFiltersProps {
  search: string;

  platformFilter:
    | AdminCodingPlatform
    | "ALL";

  filter:
    CodingVerificationFilter;

  onSearchChange: (
    value: string
  ) => void;

  onPlatformFilterChange: (
    value:
      | AdminCodingPlatform
      | "ALL"
  ) => void;

  onFilterChange: (
    value: CodingVerificationFilter
  ) => void;
}

export default function CodingVerificationFilters({
  search,
  platformFilter,
  filter,
  onSearchChange,
  onPlatformFilterChange,
  onFilterChange,
}: CodingVerificationFiltersProps) {
  const filtersActive =
    Boolean(search.trim()) ||
    platformFilter !== "ALL" ||
    filter !== "ALL";

  const clearFilters = () => {
    onSearchChange("");
    onPlatformFilterChange("ALL");
    onFilterChange("ALL");
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
      {/* HEADER */}

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
              Filter Coding Profiles
            </p>

            <p
              className="
                mt-0.5
                text-xs
                text-[#8499AA]
              "
            >
              Search profiles and filter by platform or verification status.
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

      {/* FILTERS */}

      <div
        className="
          grid
          gap-4
          p-5

          lg:grid-cols-[1fr_220px_220px]
        "
      >
        {/* SEARCH */}

        <div>
          <label
            htmlFor="coding-profile-search"
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
              id="coding-profile-search"
              type="text"
              value={search}
              onChange={(event) =>
                onSearchChange(
                  event.target.value
                )
              }
              placeholder="Search student, email or username..."
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

        {/* PLATFORM */}

        <div>
          <label
            htmlFor="coding-platform-filter"
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
            Platform
          </label>

          <select
            id="coding-platform-filter"
            value={platformFilter}
            onChange={(event) =>
              onPlatformFilterChange(
                event.target.value as
                  | AdminCodingPlatform
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
              All platforms
            </option>

            <option value="CODEFORCES">
              Codeforces
            </option>

            <option value="LEETCODE">
              LeetCode
            </option>

            <option value="CODECHEF">
              CodeChef
            </option>
          </select>
        </div>

        {/* VERIFICATION */}

        <div>
          <label
            htmlFor="coding-verification-filter"
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
            Verification
          </label>

          <select
            id="coding-verification-filter"
            value={filter}
            onChange={(event) =>
              onFilterChange(
                event.target
                  .value as CodingVerificationFilter
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
              All verification
            </option>

            <option value="UNVERIFIED">
              Unverified
            </option>

            <option value="VERIFIED">
              Verified
            </option>
          </select>
        </div>
      </div>

      {/* ACTIVE FILTERS */}

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

          {platformFilter !== "ALL" && (
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
              Platform:{" "}
              {formatPlatform(
                platformFilter
              )}
            </span>
          )}

          {filter !== "ALL" && (
            <span
              className={`
                rounded-full
                border
                px-3
                py-1
                text-[10px]
                font-semibold

                ${
                  filter === "VERIFIED"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }
              `}
            >
              Status:{" "}
              {filter === "VERIFIED"
                ? "Verified"
                : "Unverified"}
            </span>
          )}
        </div>
      )}
    </section>
  );
}

function formatPlatform(
  platform: AdminCodingPlatform
) {
  if (platform === "CODEFORCES") {
    return "Codeforces";
  }

  if (platform === "LEETCODE") {
    return "LeetCode";
  }

  if (platform === "CODECHEF") {
    return "CodeChef";
  }

  return platform;
}