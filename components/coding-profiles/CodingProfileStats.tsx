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
    <div className="mt-7 grid gap-4 border-t border-[#EEECE6] pt-6 sm:grid-cols-2 lg:grid-cols-4">
      <Stat
        label="Current Rating"
        value={
          profile.currentRating
        }
      />

      <Stat
        label="Max Rating"
        value={
          profile.maxRating
        }
      />

      <Stat
        label="Problems Solved"
        value={
          profile.problemsSolved
        }
      />

      <Stat
        label="Contests"
        value={
          profile.contestCount
        }
      />
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value:
    | number
    | null;
}) {
  return (
    <div className="rounded-xl border border-[#E3DFD5] bg-[#F8F7F3] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#858994]">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-[#14213D]">
        {value ?? "-"}
      </p>
    </div>
  );
}