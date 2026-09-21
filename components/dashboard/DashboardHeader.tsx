"use client";

import Link from "next/link";

interface DashboardHeaderProps {
  email: string;
  onLogout: () => void;
}

export default function DashboardHeader({
  email,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-[#e3e1da] bg-white">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-6 sm:px-8">

        {/* BRAND */}

        <Link
          href="/dashboard"
          className="group flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#14213d] text-sm font-bold text-white transition group-hover:bg-[#1d2d4f]">
            T
          </div>

          <div>
            <p className="text-[15px] font-bold tracking-tight text-[#14213d]">
              Trailbliz
            </p>

            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#858994]">
              Student
            </p>
          </div>
        </Link>

        {/* ACCOUNT */}

        <div className="flex items-center gap-4">

          <div className="hidden text-right sm:block">
            <p className="max-w-[220px] truncate text-sm font-semibold text-[#14213d]">
              {email}
            </p>

            <p className="text-xs text-[#858994]">
              Student account
            </p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="
              rounded-[10px]
              border border-[#d2cfc5]
              bg-white
              px-4 py-2
              text-sm font-bold
              text-[#14213d]
              transition
              hover:border-[#14213d]
              hover:bg-[#f1f0eb]
            "
          >
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}
