import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  ClipboardList,
  Crown,
  Trophy,
} from "lucide-react";

const careerLinks = [
  {
    title: "Opportunities",
    description:
      "Discover internships and roles available through Trailbliz.",
    href: "/opportunities",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applications",
    description:
      "Track your applications and their current status.",
    href: "/applications",
    icon: ClipboardList,
  },
  {
    title: "Leaderboard",
    description:
      "See your progress across college and global rankings.",
    href: "/leaderboard",
    icon: Trophy,
  },
];

export default function ProfileCareer() {
  return (
    <section>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1256af]">
          Career
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
          Move forward
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Your career tools live here and use the
          profile you've built on Trailbliz.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {careerLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-h-[190px] flex-col rounded-[22px] border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#1256af]/20 hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1256af]/[0.07] text-[#1256af]">
                <Icon size={19} />
              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
                {item.description}
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#1256af]">
                Open

                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* membership */}

      <Link
        href="/membership"
        className="group mt-4 flex flex-col gap-4 rounded-[22px] border border-slate-200 bg-white p-5 transition hover:border-[#1256af]/20 sm:flex-row sm:items-center"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <Crown size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900">
            Membership
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            View your Trailbliz membership and account
            access.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-[#1256af]">
          Manage membership

          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </Link>
    </section>
  );
}