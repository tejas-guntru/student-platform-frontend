import Link from "next/link";
import {
  ArrowLeft,
  Code2,
} from "lucide-react";

interface SkillsHeaderProps {
  count: number;
}

export default function SkillsHeader({
  count,
}: SkillsHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href="/profile"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#1256AF]"
        >
          <ArrowLeft
            size={15}
            className="transition-transform group-hover:-translate-x-1"
          />

          Back to profile
        </Link>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1256AF]/[0.07] text-[#1256AF]">
              <Code2 size={19} />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.17em] text-[#1256AF]">
              Profile · Skills
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Skills
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Add the technical skills that represent
              what you can work with and keep your
              proficiency current as you grow.
            </p>
          </div>

          <div className="w-fit rounded-2xl border border-slate-200 bg-[#F8FAFC] px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">
              Technical skills
            </p>

            <div className="mt-1 flex items-end gap-2">
              <span className="text-3xl font-bold tracking-[-0.05em] text-[#1256AF]">
                {count}
              </span>

              <span className="pb-1 text-xs font-semibold text-slate-500">
                {count === 1
                  ? "skill"
                  : "skills"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}