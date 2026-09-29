"use client";

import {
  Building2,
  GraduationCap,
  Globe2,
  SlidersHorizontal,
} from "lucide-react";

type ViewMode =
  | "GLOBAL"
  | "COLLEGE"
  | "YEAR";

const batchYears = [
  2025,
  2026,
  2027,
  2028,
  2029,
  2030,
  2031,
  2032,
];

interface LeaderboardFiltersProps {
  viewMode:
    ViewMode;

  collegeId:
    string | null;

  selectedYear:
    number | null;

  onGlobal:
    () => void;

  onCollege:
    () => void;

  onYear:
    (year: number) => void;
}

export default function LeaderboardFilters({
  viewMode,
  collegeId,
  selectedYear,
  onGlobal,
  onCollege,
  onYear,
}: LeaderboardFiltersProps) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm

        sm:p-6
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-blue-50
            text-[#1256AF]
          "
        >
          <SlidersHorizontal
            size={16}
          />
        </div>

        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#1256AF]
            "
          >
            Leaderboard view
          </p>

          <h2
            className="
              mt-1
              text-lg
              font-bold
              text-slate-900
            "
          >
            Compare Rankings
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-600
            "
          >
            Switch between global, college and
            graduation batch rankings.
          </p>
        </div>
      </div>

      <div
        className="
          mt-5
          flex
          flex-col
          gap-3

          sm:flex-row
          sm:flex-wrap
          sm:items-end
        "
      >
        <button
          type="button"
          onClick={onGlobal}
          className={
            viewMode === "GLOBAL"
              ? activeButton
              : inactiveButton
          }
        >
          <Globe2 size={14} />
          Global
        </button>

        <button
          type="button"
          onClick={onCollege}
          disabled={!collegeId}
          className={
            viewMode === "COLLEGE"
              ? activeButton
              : inactiveButton
          }
        >
          <Building2 size={14} />
          My College
        </button>

        <div
          className="
            min-w-0
            flex-1

            sm:ml-auto
            sm:max-w-[250px]
          "
        >
          <label
            htmlFor="leaderboard-batch"
            className="
              mb-1.5
              flex
              items-center
              gap-1.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-slate-500
            "
          >
            <GraduationCap
              size={12}
            />

            Graduation Batch
          </label>

          <select
            id="leaderboard-batch"
            value={
              selectedYear || ""
            }
            onChange={(event) => {
              const year =
                Number(
                  event.target.value
                );

              if (!year) {
                return;
              }

              onYear(year);
            }}
            className="
              w-full
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              py-2.5
              text-sm
              font-semibold
              text-slate-800
              outline-none
              transition

              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-50
            "
          >
            <option value="">
              Select Batch
            </option>

            {batchYears.map(
              (year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {!collegeId && (
        <p
          className="
            mt-4
            text-xs
            leading-5
            text-slate-500
          "
        >
          Add your college in your profile to enable
          the college leaderboard.
        </p>
      )}
    </section>
  );
}

const activeButton = `
  inline-flex
  min-h-[42px]
  items-center
  justify-center
  gap-2
  rounded-lg
  bg-[#1256AF]
  px-4
  py-2.5
  text-sm
  font-bold
  text-white
  transition

  hover:bg-[#0E4C9D]
`;

const inactiveButton = `
  inline-flex
  min-h-[42px]
  items-center
  justify-center
  gap-2
  rounded-lg
  border
  border-slate-200
  bg-white
  px-4
  py-2.5
  text-sm
  font-bold
  text-slate-600
  transition

  hover:border-blue-200
  hover:bg-blue-50/40
  hover:text-[#1256AF]

  disabled:cursor-not-allowed
  disabled:opacity-40
`;