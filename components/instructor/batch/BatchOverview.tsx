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
      className="
        mt-6
        grid
        gap-3

        sm:grid-cols-2

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
        items-center
        gap-3
        rounded-2xl
        border
        bg-white
        p-4
        transition-all

        hover:-translate-y-0.5
        hover:shadow-sm

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
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl

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
            text-xl
            font-bold
            text-slate-950
          "
        >
          {value}
        </p>

        <p
          className="
            truncate
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
