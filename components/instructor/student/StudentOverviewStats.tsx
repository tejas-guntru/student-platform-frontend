import {
  BookOpen,
  BriefcaseBusiness,
  ClipboardCheck,
  Code2,
  FolderKanban,
  ListTodo,
} from "lucide-react";

import type {
  InstructorStudentOverviewResponse,
} from "@/types/instructorStudent";

interface StudentOverviewStatsProps {
  student: InstructorStudentOverviewResponse;
}

export default function StudentOverviewStats({
  student,
}: StudentOverviewStatsProps) {
  return (
    <section
      className="
        mt-6
        grid
        gap-3

        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-6
      "
    >
      <StatCard
        label="Projects"
        value={student.projects.length}
        icon={FolderKanban}
        href="#projects"
      />

      <StatCard
        label="Experience"
        value={student.experiences.length}
        icon={BriefcaseBusiness}
        href="#experience"
      />

      <StatCard
        label="Coding"
        value={student.codingProfiles.length}
        icon={Code2}
        href="#coding"
      />

      <StatCard
        label="Assessments"
        value={student.assessments.length}
        icon={ClipboardCheck}
        href="#assessments"
      />

      <StatCard
        label="Tasks"
        value={student.tasks.length}
        icon={ListTodo}
        href="#tasks"
      />

      <StatCard
        label="Courses"
        value={student.courses.length}
        icon={BookOpen}
        href="#courses"
      />
    </section>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  href,
}: {
  label: string;
  value: number;
  icon: typeof BookOpen;
  href: string;
}) {
  return (
    <a
      href={href}
      className="
        group
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        transition-all

        hover:-translate-y-0.5
        hover:border-blue-200
        hover:shadow-sm
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
          bg-blue-50
          text-[#1256AF]
        "
      >
        <Icon size={18} />
      </div>

      <div>
        <p
          className="
            text-xl
            font-bold
            text-slate-950
          "
        >
          {value}
        </p>

        <p
          className="
            text-xs
            font-medium
            text-slate-500
          "
        >
          {label}
        </p>
      </div>
    </a>
  );
}