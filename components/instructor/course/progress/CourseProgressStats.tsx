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
        gap-4
        sm:grid-cols-3
      "
    >
      <StatCard
        icon={<Users size={19} />}
        label="Students"
        value={studentCount.toString()}
        description="Students in progress"
      />

      <StatCard
        icon={<TrendingUp size={19} />}
        label="Average Progress"
        value={`${Math.round(
          averageProgress
        )}%`}
        description="Across this batch"
      />

      <StatCard
        icon={
          <CheckCircle2 size={19} />
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
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-[#1256AF]
        "
      >
        {icon}
      </div>

      <p
        className="
          mt-5
          text-sm
          font-medium
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-3xl
          font-bold
          tracking-tight
          text-slate-950
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1
          text-xs
          text-slate-400
        "
      >
        {description}
      </p>
    </article>
  );
}