"use client";

import {
  Building2,
  GraduationCap,
  Globe2,
} from "lucide-react";

type ViewMode =
  | "GLOBAL"
  | "COLLEGE"
  | "YEAR";

interface LeaderboardFiltersProps {
  viewMode: ViewMode;

  collegeId: string | null;

  graduationYear: number | null;

  onGlobal: () => void;

  onCollege: () => void;

  onYear: (year: number) => void;
}

export default function LeaderboardFilters({
  viewMode,
  collegeId,
  graduationYear,
  onGlobal,
  onCollege,
  onYear,
}: LeaderboardFiltersProps) {
  return (
    <div
      className="
        inline-flex
        flex-wrap
        gap-2
        rounded-xl
        border
        border-slate-200
        bg-white
        p-1.5
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
        title={
          collegeId
            ? "View students from your college"
            : "Add your college to your profile first"
        }
        className={
          viewMode === "COLLEGE"
            ? activeButton
            : inactiveButton
        }
      >
        <Building2 size={14} />

        My College
      </button>

      <button
        type="button"
        disabled={!graduationYear}
        onClick={() => {
          if (graduationYear) {
            onYear(graduationYear);
          }
        }}
        title={
          graduationYear
            ? `View your ${graduationYear} batch`
            : "Add your graduation year to your profile first"
        }
        className={
          viewMode === "YEAR"
            ? activeButton
            : inactiveButton
        }
      >
        <GraduationCap size={14} />

        My Batch
      </button>
    </div>
  );
}

const activeButton = `
  inline-flex
  min-h-[38px]
  items-center
  justify-center
  gap-2
  rounded-lg
  bg-[#1256AF]
  px-3.5
  py-2
  text-xs
  font-bold
  text-white
  transition

  hover:bg-[#0E4C9D]
`;

const inactiveButton = `
  inline-flex
  min-h-[38px]
  items-center
  justify-center
  gap-2
  rounded-lg
  px-3.5
  py-2
  text-xs
  font-bold
  text-slate-500
  transition

  hover:bg-slate-50
  hover:text-slate-900

  disabled:cursor-not-allowed
  disabled:opacity-35
`;