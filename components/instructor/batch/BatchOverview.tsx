import {
  BookOpen,
  ClipboardCheck,
  ListTodo,
  UserPlus,
  UsersRound,
} from "lucide-react";

interface BatchOverviewProps {
  memberCount: number;
  pendingRequestCount: number;
  taskCount: number;
  assessmentCount: number;
  courseCount: number;
}

export default function BatchOverview({
  memberCount,
  pendingRequestCount,
  taskCount,
  assessmentCount,
  courseCount,
}: BatchOverviewProps) {
  return (
    <section
      aria-label="Batch overview"
      className="
        mt-6
        grid
        min-w-0
        grid-cols-2
        gap-3

        md:grid-cols-3

        lg:grid-cols-5
      "
    >
      <OverviewCard
        icon={UsersRound}
        label="Students"
        value={memberCount}
        href="#students"
      />

      <OverviewCard
        icon={UserPlus}
        label="Pending"
        value={pendingRequestCount}
        href="#join-requests"
        attention={
          pendingRequestCount > 0
        }
      />

      <OverviewCard
        icon={ListTodo}
        label="Tasks"
        value={taskCount}
        href="#tasks"
      />

      <OverviewCard
        icon={ClipboardCheck}
        label="Assessments"
        value={assessmentCount}
        href="#assessments"
      />

      <OverviewCard
        icon={BookOpen}
        label="Courses"
        value={courseCount}
        href="#courses"
      />
    </section>
  );
}

function OverviewCard({
  icon: Icon,
  label,
  value,
  href,
  attention = false,
}: {
  icon: typeof UsersRound;
  label: string;
  value: number;
  href: string;
  attention?: boolean;
}) {
  return (
    <a
      href={href}
      className={`
        group
        flex
        min-w-0
        flex-col
        items-start
        gap-3
        rounded-2xl
        border
        bg-white
        p-3.5
        transition-all

        hover:-translate-y-0.5
        hover:shadow-sm

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#1256AF]/30
        focus-visible:ring-offset-2

        sm:flex-row
        sm:items-center
        sm:p-4

        ${
          attention
            ? `
                border-amber-200
                hover:border-amber-300
              `
            : `
                border-slate-200
                hover:border-blue-200
              `
        }
      `}
    >
      <div
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl

          sm:h-10
          sm:w-10

          ${
            attention
              ? `
                  bg-amber-50
                  text-amber-700
                `
              : `
                  bg-blue-50
                  text-[#1256AF]
                `
          }
        `}
      >
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p
          className="
            text-lg
            font-bold
            leading-none
            text-slate-950

            sm:text-xl
            sm:leading-normal
          "
        >
          {value}
        </p>

        <p
          className="
            mt-1
            break-words
            text-[11px]
            font-medium
            leading-4
            text-slate-500

            sm:mt-0
            sm:text-xs
          "
        >
          {label}
        </p>
      </div>
    </a>
  );
}