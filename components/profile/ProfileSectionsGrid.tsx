import Link from "next/link";

const sections = [
  {
    title: "Basic Profile",
    description:
      "Update personal, academic and college details.",
    href: "#basic-profile",
    action: "Edit Profile",
  },
  {
    title: "Skills",
    description:
      "Add technical skills and proficiency levels.",
    href: "/profile/skills",
    action: "Manage Skills",
  },
  {
    title: "Projects",
    description:
      "Showcase academic and personal projects.",
    href: "/profile/projects",
    action: "Manage Projects",
  },
  {
    title: "Experience",
    description:
      "Add internships and professional experience.",
    href: "/profile/experience",
    action: "Manage Experience",
  },
  {
    title: "Coding Profiles",
    description:
      "Manage Codeforces, LeetCode and CodeChef.",
    href: "/coding-profiles",
    action: "Coding Accounts",
  },
  {
    title: "Leaderboard",
    description:
      "See global, college and batch rankings.",
    href: "/leaderboard",
    action: "View Ranking",
  },
];

export default function ProfileSectionsGrid() {
  return (
    <section className="mt-8">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A227]" />

        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
          Profile Sections
        </p>
      </div>

      <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#14213D]">
        Build Your Student Profile
      </h2>

      <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B707B]">
        Complete each section to build a stronger candidate profile.
      </p>

      {/* CARDS */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <ProfileCard
            key={section.title}
            {...section}
          />
        ))}
      </div>
    </section>
  );
}

function ProfileCard({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        flex
        min-h-[190px]
        flex-col
        justify-between
        rounded-[20px]
        border
        border-[#D8D5CC]
        bg-white
        p-6
        shadow-[0_12px_35px_rgba(20,33,61,0.04)]
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-[#C9A227]
        hover:shadow-[0_18px_45px_rgba(20,33,61,0.08)]
      "
    >
      <div>
        {/* ICON MARKER */}
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F0CF] text-[#A98616] transition-colors group-hover:bg-[#C9A227] group-hover:text-[#14213D]">
          <span className="text-sm font-bold">
            →
          </span>
        </div>

        <h3 className="text-lg font-bold tracking-[-0.02em] text-[#14213D]">
          {title}
        </h3>

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#6B707B]">
          {description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#EEECE6] pt-4">
        <span className="text-sm font-bold text-[#14213D] transition-colors group-hover:text-[#A98616]">
          {action}
        </span>

        <span className="text-[#C9A227] transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}