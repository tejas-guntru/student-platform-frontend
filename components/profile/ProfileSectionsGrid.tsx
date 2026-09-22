import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  FolderGit2,
  GraduationCap,
  Trophy,
  UserRound,
} from "lucide-react";

import type {
  ElementType,
} from "react";

const sections = [
  {
    title: "Basic Profile",
    description:
      "Update personal, academic and college details.",
    href: "#basic-profile",
    action: "Edit Profile",
    icon: UserRound,
    iconClass:
      "bg-[#EAF6FF] text-[#0877E8]",
    accent:
      "from-[#0877E8] to-[#38BDF8]",
  },
  {
    title: "Skills",
    description:
      "Add technical skills and proficiency levels.",
    href: "/profile/skills",
    action: "Manage Skills",
    icon: GraduationCap,
    iconClass:
      "bg-cyan-50 text-cyan-600",
    accent:
      "from-cyan-500 to-[#38BDF8]",
  },
  {
    title: "Projects",
    description:
      "Showcase academic and personal projects.",
    href: "/profile/projects",
    action: "Manage Projects",
    icon: FolderGit2,
    iconClass:
      "bg-violet-50 text-violet-600",
    accent:
      "from-violet-500 to-[#0877E8]",
  },
  {
    title: "Experience",
    description:
      "Add internships and professional experience.",
    href: "/profile/experience",
    action: "Manage Experience",
    icon: BriefcaseBusiness,
    iconClass:
      "bg-emerald-50 text-emerald-600",
    accent:
      "from-emerald-500 to-cyan-400",
  },
  {
    title: "Coding Profiles",
    description:
      "Manage Codeforces, LeetCode and CodeChef.",
    href: "/coding-profiles",
    action: "Coding Accounts",
    icon: Code2,
    iconClass:
      "bg-[#EAF6FF] text-[#0877E8]",
    accent:
      "from-[#1294F2] to-[#38BDF8]",
  },
  {
    title: "Leaderboard",
    description:
      "See global, college and batch rankings.",
    href: "/leaderboard",
    action: "View Ranking",
    icon: Trophy,
    iconClass:
      "bg-amber-50 text-amber-600",
    accent:
      "from-amber-500 to-orange-400",
  },
];

export default function ProfileSectionsGrid() {
  return (
    <section>
      {/* HEADER */}

      <div>
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.17em]
            text-[#0877E8]
          "
        >
          Profile Sections
        </p>

        <h2
          className="
            mt-2
            text-2xl
            font-bold
            tracking-[-0.035em]
            text-[#173B63]
          "
        >
          Build Your Student Profile
        </h2>

        <p
          className="
            mt-2
            max-w-xl
            text-sm
            leading-6
            text-[#71899D]
          "
        >
          Complete each section to build a stronger
          candidate profile and keep your progress ready
          for opportunities.
        </p>
      </div>

      {/* CARDS */}

      <div
        className="
          mt-5
          grid
          gap-5

          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {sections.map(
          (section) => (
            <ProfileCard
              key={section.title}
              {...section}
            />
          )
        )}
      </div>
    </section>
  );
}

function ProfileCard({
  title,
  description,
  href,
  action,
  icon: Icon,
  iconClass,
  accent,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
  icon: ElementType;
  iconClass: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        flex
        min-h-[200px]
        flex-col
        justify-between
        overflow-hidden
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(8,119,232,0.045)]
        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#B8DCF3]
        hover:shadow-[0_18px_40px_rgba(8,119,232,0.09)]

        sm:p-6
      "
    >
      {/* TOP ACCENT */}

      <div
        className={`
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          ${accent}
        `}
      />

      {/* GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-14
          -top-14
          h-36
          w-36
          rounded-full
          bg-[#38BDF8]/0
          blur-3xl
          transition-all
          duration-300

          group-hover:bg-[#38BDF8]/8
        "
      />

      <div className="relative">
        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            ${iconClass}
          `}
        >
          <Icon size={19} />
        </div>

        <h3
          className="
            mt-5
            text-lg
            font-bold
            tracking-[-0.025em]
            text-[#173B63]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2
            min-h-[48px]
            text-sm
            leading-6
            text-[#6F879A]
          "
        >
          {description}
        </p>
      </div>

      {/* ACTION */}

      <div
        className="
          relative
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-[#E7F0F7]
          pt-4
        "
      >
        <span
          className="
            text-sm
            font-bold
            text-[#0877E8]
            transition-colors

            group-hover:text-[#1294F2]
          "
        >
          {action}
        </span>

        <span
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-xl
            bg-[#EAF6FF]
            text-[#0877E8]
            transition-all
            duration-200

            group-hover:translate-x-0.5
            group-hover:bg-[#0877E8]
            group-hover:text-white
          "
        >
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}