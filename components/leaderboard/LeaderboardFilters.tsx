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
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(8,119,232,0.04)]

        sm:p-6
      "
    >
      {/* TOP ACCENT */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          from-[#0877E8]
          via-violet-500
          to-[#38BDF8]
        "
      />

      {/* HEADER */}

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
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#EAF6FF]
            text-[#0877E8]
          "
        >
          <SlidersHorizontal
            size={17}
          />
        </div>

        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-[#0877E8]
            "
          >
            Leaderboard View
          </p>

          <h2
            className="
              mt-1
              text-lg
              font-bold
              tracking-[-0.025em]
              text-[#173B63]
            "
          >
            Compare Rankings
          </h2>

          <p
            className="
              mt-1
              text-sm
              leading-6
              text-[#71899D]
            "
          >
            Switch between global,
            college and graduation batch
            rankings.
          </p>
        </div>
      </div>

      {/* FILTER CONTROLS */}

      <div
        className="
          mt-5
          flex
          flex-col
          gap-3

          sm:flex-row
          sm:flex-wrap
          sm:items-center
        "
      >
        {/* GLOBAL */}

        <button
          type="button"
          onClick={
            onGlobal
          }
          className={
            viewMode === "GLOBAL"
              ? activeButton
              : inactiveButton
          }
        >
          <Globe2
            size={14}
          />

          Global
        </button>

        {/* COLLEGE */}

        <button
          type="button"
          onClick={
            onCollege
          }
          disabled={
            !collegeId
          }
          className={
            viewMode === "COLLEGE"
              ? activeButton
              : inactiveButton
          }
        >
          <Building2
            size={14}
          />

          My College
        </button>

        {/* BATCH */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-3

            sm:ml-auto
            sm:max-w-[280px]
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
              rounded-xl
              bg-violet-50
              text-violet-600
            "
          >
            <GraduationCap
              size={16}
            />
          </div>

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <label
              htmlFor="leaderboard-batch"
              className="
                mb-1.5
                block
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#879CAD]
              "
            >
              Graduation Batch
            </label>

            <select
              id="leaderboard-batch"
              value={
                selectedYear ||
                ""
              }
              onChange={(event) => {
                const year =
                  Number(
                    event.target.value
                  );

                if (!year) {
                  return;
                }

                onYear(
                  year
                );
              }}
              className={
                viewMode === "YEAR"
                  ? activeSelect
                  : inactiveSelect
              }
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
      </div>

      {!collegeId && (
        <p
          className="
            mt-4
            text-xs
            leading-5
            text-[#8AA0B2]
          "
        >
          Add your college in your
          profile to enable the college
          leaderboard.
        </p>
      )}
    </section>
  );
}

const activeButton =
  `
    inline-flex
    min-h-[42px]
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-gradient-to-r
    from-[#0877E8]
    to-[#1294F2]
    px-4
    py-2.5
    text-sm
    font-bold
    text-white
    shadow-[0_8px_20px_rgba(8,119,232,0.17)]
    transition-all
    duration-200

    hover:-translate-y-0.5
    hover:shadow-[0_11px_24px_rgba(8,119,232,0.22)]
  `;

const inactiveButton =
  `
    inline-flex
    min-h-[42px]
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-[#D5E7F3]
    bg-[#F8FCFF]
    px-4
    py-2.5
    text-sm
    font-bold
    text-[#58748B]
    transition-all
    duration-200

    hover:border-[#B9DCF2]
    hover:bg-white
    hover:text-[#0877E8]

    disabled:cursor-not-allowed
    disabled:opacity-40
    disabled:hover:border-[#D5E7F3]
    disabled:hover:bg-[#F8FCFF]
    disabled:hover:text-[#58748B]
  `;

const activeSelect =
  `
    w-full
    rounded-xl
    border
    border-[#87C6EE]
    bg-[#F0F9FF]
    px-3
    py-2.5
    text-sm
    font-bold
    text-[#173B63]
    outline-none
    transition-all

    focus:border-[#0877E8]
    focus:ring-4
    focus:ring-[#0877E8]/10
  `;

const inactiveSelect =
  `
    w-full
    rounded-xl
    border
    border-[#D5E7F3]
    bg-[#F8FCFF]
    px-3
    py-2.5
    text-sm
    font-semibold
    text-[#173B63]
    outline-none
    transition-all

    hover:border-[#B9DCF2]

    focus:border-[#0877E8]
    focus:bg-white
    focus:ring-4
    focus:ring-[#0877E8]/10
  `;