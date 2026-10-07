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
        mt-5
        grid
        min-w-0
        grid-cols-1
        gap-3

        sm:mt-6
        sm:grid-cols-2

        lg:grid-cols-3

        xl:grid-cols-6
      "
      aria-label="Student overview statistics"
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
        min-h-16
        min-w-0
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

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#1256AF]/25
        focus-visible:ring-offset-2
      "
      aria-label={`${value} ${label}. Go to ${label} section`}
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
        <Icon
          size={18}
          aria-hidden="true"
        />
      </div>

      <div
        className="
          min-w-0
          flex-1
        "
      >
        <p
          className="
            text-xl
            font-bold
            leading-none
            text-slate-950
          "
        >
          {value}
        </p>

        <p
          className="
            mt-1
            break-words
            text-xs
            font-medium
            leading-4
            text-slate-500
          "
        >
          {label}
        </p>
      </div>
    </a>
  );
}