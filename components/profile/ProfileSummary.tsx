import {
  GraduationCap,
  MapPin,
  School,
  UserRound,
} from "lucide-react";

interface ProfileSummaryProps {
  fullName: string;
  preferredRole: string;
  collegeName: string;
  degree: string;
  branch: string;
  graduationYear: string;
  city: string;
}

export default function ProfileSummary({
  fullName,
  preferredRole,
  collegeName,
  degree,
  branch,
  graduationYear,
  city,
}: ProfileSummaryProps) {
  return (
    <section
      className="
        grid
        gap-5

        md:grid-cols-3
      "
    >
      <SummaryCard
        icon={UserRound}
        label="Student"
        title={
          fullName || "Student"
        }
        description={
          preferredRole ||
          "Preferred role not added"
        }
        accent="from-[#0877E8] to-[#38BDF8]"
        iconClass="bg-[#EAF6FF] text-[#0877E8]"
      />

      <SummaryCard
        icon={School}
        label="College"
        title={
          collegeName ||
          "College not selected"
        }
        description={
          degree
            ? `${degree}${
                branch
                  ? ` • ${branch}`
                  : ""
              }`
            : "Degree not added"
        }
        accent="from-violet-500 to-[#0877E8]"
        iconClass="bg-violet-50 text-violet-600"
      />

      <SummaryCard
        icon={GraduationCap}
        label="Graduation"
        title={
          graduationYear ||
          "Not added"
        }
        description={
          city ||
          "City not added"
        }
        accent="from-cyan-500 to-[#38BDF8]"
        iconClass="bg-cyan-50 text-cyan-600"
        descriptionIcon={MapPin}
      />
    </section>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  title,
  description,
  accent,
  iconClass,
  descriptionIcon:
    DescriptionIcon,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
  description: string;
  accent: string;
  iconClass: string;
  descriptionIcon?: React.ElementType;
}) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(8,119,232,0.045)]
        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#B8DCF3]
        hover:shadow-[0_18px_40px_rgba(8,119,232,0.09)]

        sm:p-6
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
          -right-14
          -top-14
          h-36
          w-36
          rounded-full
          bg-[#38BDF8]/0
          blur-3xl
          transition-all
          duration-300

          group-hover:bg-[#38BDF8]/8
        "
      />

      <div className="relative">
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div
            className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              ${iconClass}
            `}
          >
            <Icon size={19} />
          </div>

          <span
            className="
              rounded-full
              border
              border-[#DCEAF5]
              bg-[#F8FCFF]
              px-2.5
              py-1
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#879CAD]
            "
          >
            {label}
          </span>
        </div>

        <h2
          className="
            mt-5
            break-words
            text-xl
            font-bold
            tracking-[-0.03em]
            text-[#173B63]
          "
        >
          {title}
        </h2>

        <div
          className="
            mt-2
            flex
            items-start
            gap-2
          "
        >
          {DescriptionIcon && (
            <DescriptionIcon
              size={13}
              className="
                mt-1
                shrink-0
                text-[#8CB8D4]
              "
            />
          )}

          <p
            className="
              text-sm
              leading-6
              text-[#6F879A]
            "
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}