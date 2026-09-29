import Link from "next/link";
import {
  ArrowLeft,
  Home,
  UserRound,
} from "lucide-react";

interface ProfileHeaderProps {
  fullName: string;
  preferredRole: string;
  collegeName: string;
  degree: string;
  branch: string;
  graduationYear: string;
  city: string;
  percentage?: number;
}

function getInitials(name: string) {
  if (!name.trim()) return "ST";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function ProfileHeader({
  fullName,
  preferredRole,
  collegeName,
  degree,
  branch,
  graduationYear,
  city,
  percentage,
}: ProfileHeaderProps) {
  const initials = getInitials(fullName);

  const academic = [
    degree,
    branch,
    graduationYear,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white">
      {/* background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1256af]/[0.06] blur-3xl" />

        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#1256af] via-[#2783d9] to-[#60a5fa]" />
      </div>

      <div className="relative p-5 sm:p-7 lg:p-8">
        {/* top */}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/student"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#1256af]"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />

            Student home
          </Link>

          <Link
            href="/student"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-[#1256af]/30 hover:text-[#1256af]"
            aria-label="Student home"
          >
            <Home size={17} />
          </Link>
        </div>

        {/* identity */}

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-[#1256af] text-xl font-bold tracking-tight text-white shadow-[0_14px_30px_rgba(18,86,175,0.20)]">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1256af]/[0.07] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1256af]">
                <UserRound size={11} />

                Student profile
              </span>

              {city && (
                <span className="text-xs font-medium text-slate-400">
                  {city}
                </span>
              )}
            </div>

            <h1 className="mt-3 break-words text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {fullName || "Your Profile"}
            </h1>

            <p className="mt-2 text-sm font-medium text-slate-600 sm:text-base">
              {preferredRole ||
                "Add your preferred career role"}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              {collegeName ||
                "Add your college"}

              {academic && (
                <>
                  <span className="mx-2">•</span>
                  {academic}
                </>
              )}
            </p>
          </div>

          {/* completion */}

          <div className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:w-[210px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Profile strength
              </span>

              <span className="text-sm font-bold text-[#1256af]">
                {percentage ?? 0}%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#1256af] transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, percentage ?? 0)
                  )}%`,
                }}
              />
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-400">
              Complete your profile to strengthen your
              Trailbliz identity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}