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

import type {
  ElementType,
} from "react";

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
    <section
      className="min-w-0"
      aria-labelledby="profile-sections-title"
    >
      {/* HEADING */}

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-3

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div className="min-w-0">
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#1256AF]
            "
          >
            Your profile
          </p>

          <h2
            id="profile-sections-title"
            className="
              mt-2
              break-words
              text-xl
              font-bold
              tracking-[-0.035em]
              text-slate-950

              sm:text-2xl
            "
          >
            Build your career identity
          </h2>

          <p
            className="
              mt-2
              max-w-2xl
              break-words
              text-sm
              leading-6
              text-slate-500
            "
          >
            Each section contributes to the
            profile you build on Trailbliz.
          </p>
        </div>
      </div>

      {/* SECTIONS */}

      <div
        className="
          mt-5
          min-w-0
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white

          sm:mt-6
          sm:rounded-[24px]
        "
      >
        {sections.map(
          (section, index) => (
            <ProfileSection
              key={section.title}
              {...section}
              last={
                index ===
                sections.length - 1
              }
            />
          )
        )}
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
        min-w-0
        flex-col
        gap-4
        p-4
        transition-colors

        hover:bg-[#1256AF]/[0.025]

        focus-visible:relative
        focus-visible:z-10
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-inset
        focus-visible:ring-[#1256AF]/25

        sm:flex-row
        sm:items-center
        sm:p-5

        ${
          !last
            ? "border-b border-slate-100"
            : ""
        }
      `}
    >
      {/* INFORMATION */}

      <div
        className="
          flex
          min-w-0
          flex-1
          items-start
          gap-3

          sm:gap-4
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
            bg-[#1256AF]/[0.07]
            text-[#1256AF]

            sm:h-11
            sm:w-11
          "
        >
          <Icon
            size={18}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <h3
            className="
              break-words
              font-bold
              text-slate-900

              [overflow-wrap:anywhere]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              max-w-2xl
              break-words
              text-sm
              leading-6
              text-slate-500

              [overflow-wrap:anywhere]
            "
          >
            {description}
          </p>
        </div>
      </div>

      {/* ACTION */}

      <div
        className="
          flex
          min-h-10
          shrink-0
          items-center
          gap-2
          self-start
          rounded-lg
          text-sm
          font-semibold
          text-[#1256AF]

          sm:self-auto
        "
      >
        <Pencil
          size={14}
          className="shrink-0"
          aria-hidden="true"
        />

        <span>
          {action}
        </span>

        <ArrowRight
          size={14}
          className="
            shrink-0
            transition-transform

            group-hover:translate-x-1
          "
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}