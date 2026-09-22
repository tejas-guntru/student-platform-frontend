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
        accent="from-emerald-500 to-cyan-400"
        iconClass="bg-emerald-50 text-emerald-600"
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
        accent="from-[#0877E8] to-[#38BDF8]"
        iconClass="bg-[#EAF6FF] text-[#0877E8]"
      />
    </section>
  );
}

function ContextCard({
  icon: Icon,
  label,
  value,
  accent,
  iconClass,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
  accent: string;
  iconClass: string;
}) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(8,119,232,0.04)]
        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-[#B8DCF3]
        hover:shadow-[0_16px_38px_rgba(8,119,232,0.08)]
      "
    >
      {/* TOP ACCENT */}

      <div
        className={`
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          ${accent}
        `}
      />

      {/* GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-[#38BDF8]/0
          blur-[70px]
          transition-all
          duration-300

          group-hover:bg-[#38BDF8]/8
        "
      />

      <div
        className="
          relative
          flex
          items-start
          gap-4
        "
      >
        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            ${iconClass}
          `}
        >
          <Icon size={18} />
        </div>

        <div className="min-w-0">
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-[#879CAD]
            "
          >
            {label}
          </p>

          <p
            className="
              mt-1.5
              break-words
              text-base
              font-bold
              leading-6
              text-[#173B63]
            "
          >
            {value}
          </p>
        </div>
      </div>
    </article>
  );
}