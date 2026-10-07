import {
  CheckCircle2,
  TrendingUp,
  Users,
} from "lucide-react";

interface CourseProgressStatsProps {
  studentCount: number;
  averageProgress: number;
  completedCount: number;
}

export default function CourseProgressStats({
  studentCount,
  averageProgress,
  completedCount,
}: CourseProgressStatsProps) {
  return (
    <section
      className="
        grid
        min-w-0
        grid-cols-1
        gap-3

        sm:grid-cols-3
        sm:gap-4
      "
    >
      <StatCard
        icon={
          <Users
            size={19}
            aria-hidden="true"
          />
        }
        label="Students"
        value={studentCount.toString()}
        description="Students in progress"
      />

      <StatCard
        icon={
          <TrendingUp
            size={19}
            aria-hidden="true"
          />
        }
        label="Average Progress"
        value={`${Math.round(
          averageProgress
        )}%`}
        description="Across this batch"
      />

      <StatCard
        icon={
          <CheckCircle2
            size={19}
            aria-hidden="true"
          />
        }
        label="Completed"
        value={completedCount.toString()}
        description="Finished all lessons"
      />
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <article
      className="
        min-w-0
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4

        sm:p-5
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
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className="
            mt-4
            break-words
            text-sm
            font-medium
            text-slate-500

            sm:mt-5
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            break-words
            text-2xl
            font-bold
            tracking-tight
            text-slate-950

            sm:text-3xl
          "
        >
          {value}
        </p>

        <p
          className="
            mt-1
            break-words
            text-xs
            leading-5
            text-slate-400
          "
        >
          {description}
        </p>
      </div>
    </article>
  );
}