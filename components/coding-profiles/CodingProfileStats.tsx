import type {
  ElementType,
} from "react";

import {
  Activity,
  CheckCircle2,
  Code2,
  Trophy,
} from "lucide-react";

import type {
  CodingProfile,
} from "@/types/codingProfile";

interface CodingProfileStatsProps {
  profile:
    CodingProfile;
}

export default function CodingProfileStats({
  profile,
}: CodingProfileStatsProps) {
  return (
    <div
      className="
        grid
        gap-3

        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      <Stat
        icon={Activity}
        label="Current Rating"
        value={
          profile.currentRating
        }
        iconClass="
          bg-[#EAF6FF]
          text-[#0877E8]
        "
      />

      <Stat
        icon={Trophy}
        label="Max Rating"
        value={
          profile.maxRating
        }
        iconClass="
          bg-violet-50
          text-violet-600
        "
      />

      <Stat
        icon={CheckCircle2}
        label="Problems Solved"
        value={
          profile.problemsSolved
        }
        iconClass="
          bg-emerald-50
          text-emerald-600
        "
      />

      <Stat
        icon={Code2}
        label="Contests"
        value={
          profile.contestCount
        }
        iconClass="
          bg-cyan-50
          text-cyan-600
        "
      />
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  iconClass,
}: {
  icon: ElementType;
  label: string;
  value:
    | number
    | null;
  iconClass: string;
}) {
  return (
    <div
      className="
        group/stat
        relative
        overflow-hidden
        rounded-[18px]
        border
        border-[#DCEAF5]
        bg-[#F8FCFF]
        p-4
        transition-all
        duration-200

        hover:border-[#B9DCF2]
        hover:bg-white
        hover:shadow-[0_8px_22px_rgba(8,119,232,0.05)]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div>
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.11em]
              text-[#879CAD]
            "
          >
            {label}
          </p>

          <p
            className="
              mt-2
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-[#173B63]
            "
          >
            {value ?? "-"}
          </p>
        </div>

        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${iconClass}
          `}
        >
          <Icon size={15} />
        </div>
      </div>
    </div>
  );
}