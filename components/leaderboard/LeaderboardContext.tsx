import {
  Building2,
  GraduationCap,
} from "lucide-react";

interface LeaderboardContextProps {
  collegeName:
    string | null;

  graduationYear:
    number | null;
}

export default function LeaderboardContext({
  collegeName,
  graduationYear,
}: LeaderboardContextProps) {
  return (
    <section
      className="
        grid
        gap-4

        sm:grid-cols-2
      "
    >
      <ContextCard
        icon={Building2}
        label="My College"
        value={
          collegeName ||
          "College not selected"
        }
      />

      <ContextCard
        icon={GraduationCap}
        label="My Graduation Batch"
        value={
          graduationYear
            ? String(
                graduationYear
              )
            : "Not added"
        }
      />
    </section>
  );
}

function ContextCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <article
      className="
        flex
        items-start
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
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
          bg-slate-100
          text-slate-600
        "
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-slate-500
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1.5
            break-words
            text-sm
            font-bold
            leading-6
            text-slate-900
          "
        >
          {value}
        </p>
      </div>
    </article>
  );
}