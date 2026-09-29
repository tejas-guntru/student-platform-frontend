import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  FolderGit2,
  GraduationCap,
  Pencil,
  UserRound,
} from "lucide-react";

import type { ElementType } from "react";

const sections = [
  {
    title: "Basic Information",
    description:
      "Personal, academic, college and career information.",
    href: "#basic-profile",
    action: "Edit details",
    icon: UserRound,
  },
  {
    title: "Skills",
    description:
      "Technical skills and your proficiency levels.",
    href: "/profile/skills",
    action: "Edit skills",
    icon: GraduationCap,
  },
  {
    title: "Projects",
    description:
      "Projects that demonstrate what you can build.",
    href: "/profile/projects",
    action: "Edit projects",
    icon: FolderGit2,
  },
  {
    title: "Experience",
    description:
      "Internships, work and professional experience.",
    href: "/profile/experience",
    action: "Edit experience",
    icon: BriefcaseBusiness,
  },
  {
    title: "Coding Profiles",
    description:
      "Your competitive programming and coding accounts.",
    href: "/coding-profiles",
    action: "Edit accounts",
    icon: Code2,
  },
];

export default function ProfileSectionsGrid() {
  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1256af]">
            Your profile
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
            Build your career identity
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Each section contributes to the profile you
            build on Trailbliz.
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
        {sections.map((section, index) => (
          <ProfileSection
            key={section.title}
            {...section}
            last={index === sections.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function ProfileSection({
  title,
  description,
  href,
  action,
  icon: Icon,
  last,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
  icon: ElementType;
  last: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        group
        flex
        flex-col
        gap-4
        p-5
        transition
        hover:bg-[#1256af]/[0.025]

        sm:flex-row
        sm:items-center

        ${!last ? "border-b border-slate-100" : ""}
      `}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1256af]/[0.07] text-[#1256af]">
          <Icon size={19} />
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start text-sm font-semibold text-[#1256af] sm:self-auto">
        <Pencil size={14} />

        {action}

        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}