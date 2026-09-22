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
  return (
    <section className="mt-8 grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 lg:grid-cols-[1fr_220px_220px]">
      <input
        type="text"
        value={search}
        onChange={(event) =>
          onSearchChange(
            event.target.value
          )
        }
        placeholder="Search student, email or username..."
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
      />

      <select
        value={platformFilter}
        onChange={(event) =>
          onPlatformFilterChange(
            event.target.value as
              | AdminCodingPlatform
              | "ALL"
          )
        }
        className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
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

      <select
        value={filter}
        onChange={(event) =>
          onFilterChange(
            event.target
              .value as CodingVerificationFilter
          )
        }
        className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
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
    </section>
  );
}