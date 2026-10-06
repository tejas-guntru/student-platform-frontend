import {
  Building2,
  CalendarDays,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import type {
  InstructorProfileResponse,
} from "@/types/instructorProfile";

interface InstructorProfileOverviewProps {
  profile: InstructorProfileResponse;
}

function formatMemberSince(
  value: string
) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "—";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      month: "long",
      year: "numeric",
    }
  );
}

export default function InstructorProfileOverview({
  profile,
}: InstructorProfileOverviewProps) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >
      <div>
        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.12em]
            text-[#1256AF]
          "
        >
          Overview
        </p>

        <h2
          className="
            mt-1
            text-lg
            font-bold
            text-slate-950
          "
        >
          Instructor information
        </h2>

        <p
          className="
            mt-1
            text-sm
            leading-6
            text-slate-500
          "
        >
          Your account and professional
          information on Trailbliz.
        </p>
      </div>

      <div
        className="
          mt-6
          space-y-1
        "
      >
        <InfoRow
          icon={UserRound}
          label="Full name"
          value={profile.fullName}
        />

        <InfoRow
          icon={Mail}
          label="Email"
          value={profile.email}
        />

        <InfoRow
          icon={Phone}
          label="Phone"
          value={
            profile.phone ||
            "Not provided"
          }
        />

        <InfoRow
          icon={Building2}
          label="Organization"
          value={
            profile.organization ||
            "Not provided"
          }
        />

        <InfoRow
          icon={CalendarDays}
          label="Member since"
          value={formatMemberSince(
            profile.createdAt
          )}
        />
      </div>
    </section>
  );
}

interface InfoRowProps {
  icon: typeof UserRound;
  label: string;
  value: string;
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        rounded-xl
        px-2
        py-3
      "
    >
      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-blue-50
          text-[#1256AF]
        "
      >
        <Icon size={16} />
      </span>

      <div className="min-w-0">
        <p
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-wide
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            break-words
            text-sm
            font-semibold
            text-slate-800
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}