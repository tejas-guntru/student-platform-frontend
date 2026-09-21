"use client";

type ViewMode = "GLOBAL" | "COLLEGE" | "YEAR";

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
    <section className="mt-8 rounded-[20px] border border-[#D8D5CC] bg-white p-4 shadow-[0_10px_30px_rgba(20,33,61,0.04)]">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={
            onGlobal
          }
          className={
            viewMode ===
            "GLOBAL"
              ? activeButton
              : inactiveButton
          }
        >
          Global
        </button>

        <button
          type="button"
          onClick={
            onCollege
          }
          disabled={
            !collegeId
          }
          className={
            viewMode ===
            "COLLEGE"
              ? activeButton
              : inactiveButton
          }
        >
          My College
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#6B707B]">
            Batch
          </span>

          <select
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

              onYear(year);
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
    </section>
  );
}

const activeButton =
  "rounded-xl bg-[#C9A227] px-4 py-2.5 text-sm font-bold text-[#14213D] transition hover:bg-[#E0C766]";

const inactiveButton =
  "rounded-xl border border-[#D8D5CC] bg-[#F8F7F3] px-4 py-2.5 text-sm font-bold text-[#14213D] transition hover:border-[#C9A227] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40";

const activeSelect =
  "rounded-xl border border-[#C9A227] bg-[#FBF7E8] px-4 py-2.5 text-sm font-bold text-[#14213D] outline-none";

const inactiveSelect =
  "rounded-xl border border-[#D8D5CC] bg-[#F8F7F3] px-4 py-2.5 text-sm font-semibold text-[#14213D] outline-none transition hover:border-[#C9A227]";